import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InicioComponent } from 'app/modules/admin/inicio/inicio.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

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
        MatButtonModule
    ]
})
export class InicioModule
{
}
