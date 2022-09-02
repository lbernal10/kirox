import { Injectable } from '@angular/core';
import { Usuario, UsuarioPaginacion } from 'app/models/usuario.interface';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {
 
    private _usuario: ReplaySubject<Usuario> = new ReplaySubject<Usuario>(1);
    private url: string = 'http://localhost:8080/usuario/';
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });


    /**
     * Constructor
     */
     constructor(private _httpClient: HttpClient)
     {
     }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set usuario(value: Usuario)
    {
        // Store the value
        this._usuario.next(value);
    }

    get usuario$(): Observable<Usuario>
    {
        return this._usuario.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
     get(): Observable<Usuario>
     {
         return this._httpClient.get<Usuario>('api/common/user').pipe(
             tap((user) => {
                 this._usuario.next(user);
             })
         );
     }
 
     /**
      * Update the user
      *
      * @param user
      */
     update(usuario: Usuario): Observable<any>
     {
         return this._httpClient.patch<Usuario>('api/common/user', {usuario}).pipe(
             map((response) => {
                 this._usuario.next(response);
             })
         );
     }

     crear(usuario: Usuario): Observable<Usuario> {
        return this._httpClient.post<Usuario>(`${this.url}`, usuario, {
            headers: this.httpHeaders,
        });
    }

    actualizar(usuario: Usuario): Observable<Usuario> {
        return this._httpClient.put<Usuario>(`${this.url}`, usuario, {
            headers: this.httpHeaders,
        });
    }

    eliminar(id: number): Observable<Usuario> {
        return this._httpClient.put<Usuario>(`${environment.backendURL}/usuarios/delete/${id}/`, {
            headers: this.httpHeaders,
        });
    }

    activar(id: number): Observable<Usuario> {
        return this._httpClient.put<Usuario>(`${environment.backendURL}/usuarios/active/${id}/`, {
            headers: this.httpHeaders,
        });
    }

    validarCorreo(correo: string): Observable<Usuario> {
        return this._httpClient.get<Usuario>(`${this.url}validar/${correo}/`);
    }

    validarCorreoActualizar(correo: string, idUsuario: string): Observable<Usuario> {
        return this._httpClient.get<Usuario>(`${this.url}validar/update/${correo}/${idUsuario}/`);
    }
 
    obtenerUsuariosPaginacionAdmin(
        pageIndex: number,
        pageSize: number
    ): Observable<UsuarioPaginacion> {
        return this._httpClient.get<UsuarioPaginacion>(
            `${environment.backendURL}/usuarios/paginacion/admin/${pageIndex}/${pageSize}/`
        );
    }


}
