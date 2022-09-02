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
import { Taller1Component, viewDocument, DialogAnimationsExampleDialog } from './taller1.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';

const taller1Routes: Route[] = [
    {
        path     : '',
        component: Taller1Component
    }
];

@NgModule({
    declarations: [
        Taller1Component,
        viewDocument,
        DialogAnimationsExampleDialog
    ],
    imports     : [
        RouterModule.forChild(taller1Routes),
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
        MatDialogModule,
        MatExpansionModule
    ]
})
export class Taller1Module
{
}
