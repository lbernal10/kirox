import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { TerminosPoliticasComponent } from './terminos-politicas.component';
import { terminosPoiliticasRoutes } from './terminos-politicas.routing';

@NgModule({
    declarations: [
        TerminosPoliticasComponent
    ],
    imports     : [
        RouterModule.forChild(terminosPoiliticasRoutes),
        MatButtonModule,
        FuseCardModule,
        SharedModule
    ]
})
export class TerminosPoliticasModule
{
}
