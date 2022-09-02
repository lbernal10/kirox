import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { Usuario } from 'app/models/usuario.interface';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _usuario: ReplaySubject<Usuario> = new ReplaySubject<Usuario>(1);
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

     validarCorreo(correo: string): Observable<Usuario> {
        return this._httpClient.get<Usuario>(`${environment.backendURL}validar/${correo}/`);
    }
}
