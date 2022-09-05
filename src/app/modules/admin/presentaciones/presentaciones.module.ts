import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';

import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { PresentacionesComponent, viewDocument, DialogAnimationsExampleDialog, subirArchivo } from './presentaciones.component';

import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatDialogModule } from '@angular/material/dialog';

import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';

const presentacionesRoutes: Route[] = [
    {
        path     : '',
        component: PresentacionesComponent
    }
];

@NgModule({
    declarations: [
        PresentacionesComponent,
        viewDocument,
        DialogAnimationsExampleDialog,
        subirArchivo
    ],
    imports     : [
        RouterModule.forChild(presentacionesRoutes),
        MatIconModule,
        MatMenuModule,
        MatButtonModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        FuseCardModule,
        SharedModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,

        FuseConfirmationModule,
        MatDialogModule,
        MessagesModule,
        ConfirmDialogModule,
        DialogModule,
        MatExpansionModule,
        MatSelectModule
    ]
})
export class PresentacionesModule
{
}
