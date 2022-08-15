import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styleUrls: ['./presentaciones.component.scss']
})
export class PresentacionesComponent implements OnInit {

  selected: Date | null;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(viewDocument);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'viewDocument',
  templateUrl: 'viewDocument.html',
})
export class viewDocument {}
