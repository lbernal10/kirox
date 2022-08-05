import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InicioComponent } from 'app/modules/admin/inicio/inicio.component';
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


const inicioRoutes: Route[] = [
    {
        path     : '',
        component: InicioComponent
    }
];

@NgModule({
    declarations: [
        InicioComponent
    ],
    imports     : [
        RouterModule.forChild(inicioRoutes),
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
        MatCardModule
    ]
})
export class InicioModule
{
}
