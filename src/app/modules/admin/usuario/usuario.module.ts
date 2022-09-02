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
import { UsuarioComponent } from './usuario.component';

import { MatTableModule} from '@angular/material/table'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast'; 
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
const usuarioRoutes: Route[] = [
    {
        path     : '',
        component: UsuarioComponent
    }
];

@NgModule({
    declarations: [
        UsuarioComponent
    ],
    imports     : [
        RouterModule.forChild(usuarioRoutes),
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


        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatMenuModule,
        ButtonModule,
        DialogModule,
        TableModule,
        InputTextModule,
        InputMaskModule,
        InputNumberModule,  
        ToastModule,
        MessagesModule,
        ConfirmDialogModule, 
        TabViewModule,
        CalendarModule,
        DropdownModule
    ]
})
export class UsuarioModule
{
}
