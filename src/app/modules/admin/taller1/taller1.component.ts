import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'app/core/auth/auth.service';
import { ComentarioSave } from 'app/models/comentarioSave.interface';
import { DocumentoCustom } from 'app/models/documento.interface';
import { FolderService } from 'app/service/folder.service';

@Component({
    selector: 'app-taller1',
    templateUrl: './taller1.component.html',
    styleUrls: ['./taller1.component.scss']
})
export class Taller1Component implements OnInit {
    public presentaciones: DocumentoCustom[];
    public comentario: ComentarioSave;
    tipoRol: string;
    selected: Date | null;

    constructor(public folderService: FolderService,
        public dialog: MatDialog,private _authService: AuthService) { }

    ngOnInit(): void {
        this.obtenerDocumentos();
        this.comentario = {
            comentario: '',
            fechaPublicacion: null,
            id: null,
            id_documento: null,
            secuencia: 0,
            usuario: ''
        }
        this.tipoRol = this._authService.tipoUsuario;
    }

    public obtenerDocumentos(): void {
        console.log("Consulto busqueda normal")

        this.folderService.obtenerDocumentos()
            .subscribe((data) => {
                this.presentaciones = data;
                console.log(this.presentaciones);
            });
    }

    openDialog(event, nombreD) {

        let diaslogRef = this.dialog.open(viewDocument);
        diaslogRef.componentInstance.url = event;
        diaslogRef.componentInstance.nombreD = nombreD;

        diaslogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
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
    templateUrl: '../presentaciones/viewDocument.html',
})
export class viewDocument {
    public urlDocumento: SafeResourceUrl;
    url;
    nombreD;

    constructor(
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit() {
        console.log(this.url);
        this.urlDocumento = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.url}&embedded=true`);
    }

}


@Component({
    selector: 'dialogDeleteComentario',
    templateUrl: '../presentaciones/dialogDeleteComentario.html',
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
