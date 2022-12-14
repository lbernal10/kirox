import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentoCustom } from 'app/models/documento.interface';
import { FolderService } from 'app/service/folder.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { AuthService } from 'app/core/auth/auth.service';
import { ComentarioCustom } from 'app/models/comentario.interface';
import { ComentarioSave } from 'app/models/comentarioSave.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Usuario } from 'app/models/usuario.interface';
import { map, Subject, Subscription, takeUntil, timer } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styleUrls: ['./presentaciones.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PresentacionesComponent implements OnInit {


 
timerSubscription: Subscription; 
  selected: Date | null;
  public presentaciones: DocumentoCustom[];
  tipoRol: number;
  public comentario: ComentarioSave;
  panelOpenState = true;
  user: Usuario;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(public dialog: MatDialog,
    public folderService: FolderService,
    private _userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {

    this.obtenerDocumentos();
    
    console.log(this.tipoRol);
    this.comentario =  {
      comentario:'',
      fechaPublicacion: null,
      id: null,
      id_documento: null,
      secuencia: 0,
      usuario: ''
    }

    // Subscribe to the user service
    this._userService.usuario$
    .pipe((takeUntil(this._unsubscribeAll)))
    .subscribe((user: Usuario) => {

        console.log("user: "  + JSON.stringify(user))

        this.user = user;
        this.tipoRol = this.user.rol.id;
    });

     // timer(0, 10000) call the function immediately and every 10 seconds 
     this.timerSubscription = timer(0, 60000).pipe( 
      map(() => { 
        this.obtenerDocumentos(); // load data contains the http request 
      }) 
    ).subscribe(); 
  }

  openDialog(event,nombreD) {

    let diaslogRef = this.dialog.open(viewDocument);
    diaslogRef.componentInstance.url = event;
    diaslogRef.componentInstance.nombreD = nombreD;

    diaslogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }

  public obtenerDocumentos(): void {
    console.log("Consulto busqueda normal")

    this.folderService.obtenerDocumentos()
      .subscribe((data) => {
        this.presentaciones = data;
        console.log(this.presentaciones);
      });
  }

  comentar(event){
    console.log(event);
    console.log((<HTMLInputElement>document.getElementById("txtarea_"+event)).value.toString().trim());
    if((<HTMLInputElement>document.getElementById("txtarea_"+event)).value.toString().trim() === ''){
      return false;
    }else{
      this.comentario.comentario = "" + (<HTMLInputElement>document.getElementById("txtarea_"+event)).value.toString();
      this.comentario.id_documento = event;
      this.comentario.usuario = this.user.nombre;
      this.folderService.guardarComentario(this.comentario).subscribe((data) => {
        this.obtenerDocumentos();
      });
    }
  }

  

  openDialogDeleteComentario(event): void {
    let diaslogRef = this.dialog.open(DialogAnimationsExampleDialog);
    diaslogRef.componentInstance.idComentario = event;
    diaslogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.obtenerDocumentos();
    });
  }

  openDialogSubirArchivo() {
    const dialogRef = this.dialog.open(subirArchivo);

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.obtenerDocumentos();
    });
}

}

@Component({
  selector: 'viewDocument',
  templateUrl: 'viewDocument.html',
})
export class viewDocument { 
  public urlDocumento: SafeResourceUrl;
  url;
  nombreD;

  constructor(
    private sanitizer: DomSanitizer
  ){

  }
  
  ngOnInit() {
    console.log(this.url);
    this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.url}&embedded=true`);
  }

}

@Component({
  selector: 'dialogDeleteComentario',
  templateUrl: 'dialogDeleteComentario.html',
})
export class DialogAnimationsExampleDialog {
  idComentario;
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public folderService: FolderService) {}

  eliminarComentario(event){
    console.log(event);
   
    this.folderService.eliminar(event).subscribe((data) => {
        alert('Comentario eliminado');
    });
  }

}


@Component({
  selector: 'subirArchivo',
  templateUrl: 'subirArchivos.html',
  styleUrls: ['subirArchivo.scss'],
  providers: [ConfirmationService, MessageService]
})
export class subirArchivo  {
  formTaller: FormGroup;

  talleres = [{
      id: 1,
      name: 'Taller 1',
      description: 'description 1'
  }, {
      id: 2,
      name: 'Taller 2',
      description: 'description 2'
  }]

  user: Usuario;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
      public folderService: FolderService,
      private messageService: MessageService,
      public dialog: MatDialog,
      private _userService: UserService
      ) { }

  ngOnInit() {

      this.formTaller = this.fb.group({
          tallerSelect: [null, Validators.required],
          nombrePresentacion: [null, Validators.required],
          descripcion: [null, Validators.required],
          archivo: [null, Validators.required]
      });

      const toSelect = this.talleres.find(c => c.id == 3);
      this.formTaller.get('tallerSelect').setValue(toSelect);
      
      // Subscribe to the user service
      this._userService.usuario$
          .pipe((takeUntil(this._unsubscribeAll)))
          .subscribe((user: Usuario) => {

              console.log("user: "  + JSON.stringify(user))

              this.user = user;
          });
  }

  selectedFile: any = null;
  private archivo: File = null;

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      this.archivo = event.target.files[0];
  }

  public subirArchivo() : void {
      
      console.log(this.archivo);
      console.log(this.formTaller.get('tallerSelect').value.id);
      this.folderService.subirArchivo(this.archivo, this.formTaller.get('nombrePresentacion').value, this.formTaller.get('descripcion').value, this.formTaller.get('tallerSelect').value.id, this.user.nombre).subscribe((data) => {
          this.messageService.add({
              severity: 'success',
              summary: 'Confirmado',
              detail: 'Se subio la presentaci??n.',
          });
          alert('Se subio la presentaci??n.');
          this.dialog.closeAll();
          
      });
  }

}
