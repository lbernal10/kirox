import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { Usuario } from 'app/models/usuario.interface';
import { UsuarioService } from 'app/service/usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class UsuarioComponent implements OnInit {

  public ltsUsuarios: Usuario[];
 
  public loading: boolean;
  public totalRecords: number = 0;
  public paginaActual: number = 0;
  public rowsActuales: number = 10;
  public display: boolean = false;
 
  constructor(
    private _authService: AuthService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
     
  }
  
  cargarTabla(ev: any): void {
    this.rowsActuales = ev.rows;
    this.paginaActual = ev.first == 0 ? ev.first : ev.first / ev.rows;

    this.obtenerUsuarios();
}
  

  obtenerUsuarios(): void {
    this.loading = true;

        this.usuarioService
            .obtenerUsuariosPaginacionAdmin(
                this.paginaActual,
                this.rowsActuales
            )
            .subscribe((data) => {
              console.log(JSON.stringify(data))
                this.ltsUsuarios = data.usuario;
                this.totalRecords = data.totalRegistros;
                this.loading = false;
            });
}

eliminar(usu: Usuario): void {
  this.confirmationService.confirm({
      message: '¿Estás seguro que deseas dar de baja?',
      accept: () => {
          this.usuarioService.eliminar(usu.id).subscribe((data) => {
              this.obtenerUsuarios();
              this.display = false;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Confirmado',
                  detail: 'Cambios guardados con éxito.',
              });
           });
      },
  });
}

activar(usu: Usuario): void {
  this.confirmationService.confirm({
      message: '¿Estás seguro que deseas actviar el Usuario?',
      accept: () => {
          this.usuarioService.activar(usu.id).subscribe((data) => {
              this.obtenerUsuarios();
              this.display = false;
 
              this.messageService.add({
                  severity: 'success',
                  summary: 'Confirmado',
                  detail: 'Cambios guardados con éxito.',
              }); 
          });
      },
  });
}

}
