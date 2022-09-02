import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocumentoCustom } from 'app/models/documento.interface';
import { FolderService } from 'app/service/folder.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { AuthService } from 'app/core/auth/auth.service';
import { ComentarioCustom } from 'app/models/comentario.interface';
import { ComentarioSave } from 'app/models/comentarioSave.interface';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styleUrls: ['./presentaciones.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PresentacionesComponent implements OnInit {

  selected: Date | null;
  public presentaciones: DocumentoCustom[];
  tipoRol: string;
  public comentario: ComentarioSave;
  panelOpenState = true;
  
  constructor(public dialog: MatDialog,
    public folderService: FolderService,
    private _authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) { }

  ngOnInit(): void {

    this.obtenerDocumentos();
    this.tipoRol = this._authService.tipoUsuario;
    console.log(this.tipoRol);
    this.comentario =  {
      comentario:'',
      fechaPublicacion: null,
      id: null,
      id_documento: null,
      secuencia: 0,
      usuario: ''
    }
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
      this.comentario.usuario = this._authService.usuario;
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
