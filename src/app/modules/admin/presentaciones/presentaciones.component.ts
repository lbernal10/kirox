import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DocumentoCustom } from 'app/models/documento.interface';
import { FolderService } from 'app/service/folder.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styleUrls: ['./presentaciones.component.scss']
})
export class PresentacionesComponent implements OnInit {

  selected: Date | null;
  public presentaciones: DocumentoCustom[];

  constructor(public dialog: MatDialog,
    public folderService: FolderService,) { }

  ngOnInit(): void {

    this.obtenerDocumentos();

  }

  openDialog(event,nombreD) {

    let diaslogRef = this.dialog.open(viewDocument);
    diaslogRef.componentInstance.url = event;
    diaslogRef.componentInstance.nombreD = nombreD;

    /*const dialogRef = this.dialog.open(viewDocument,{
      data: event
    });*/

    diaslogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public obtenerDocumentos(): void {
    console.log("Consulto busqueda normal")

    this.folderService.obtenerDocumentos()
      .subscribe((data) => {
        this.presentaciones = data;

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
    //console.log(this.url);

  }
}
