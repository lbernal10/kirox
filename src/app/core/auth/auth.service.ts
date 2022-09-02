import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import jwt_decode from 'jwt-decode';
import { HmacSHA256 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import { Usuario } from 'app/models/usuario.interface';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    set usuario(usuario: string)
    {
        localStorage.setItem('usuario', usuario);
    }

    get usuario(): string
    {
        return localStorage.getItem('usuario') ?? '';
    }

    set tipoUsuario(tipoUsuario: string)
    {
        localStorage.setItem('tipoUsuario', tipoUsuario);
    }

    get tipoUsuario(): string
    {
        return localStorage.getItem('tipoUsuario') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('El usuario ya ha iniciado sesión.');
        }

        const credenciales = btoa(`${environment.secretClient}` + ':' + `${environment.secretPassword}`);
        const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                              'Authorization': 'Basic ' + credenciales});
    
        let params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', credentials.email);
        params.set('password', credentials.password);
    
        return this._httpClient.post(`${environment.backendURL}${environment.oauth}${environment.token}`, params.toString(), {headers: httpHeaders}).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.usuario = response.usuario;

                console.log(JSON.stringify(response.usuario))

                this.tipoUsuario = '3';

                this.usuario = 'David Perez Negrete';
                // Return a new observable with the response
                return of(response);
            })
        );

    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {

        if (this._verifyJWTToken(this.accessToken) ) {
            this._authenticated = true;

            const usuarioToken = JSON.parse(JSON.stringify(this.getDecodedAccessToken(this.accessToken)));

            this._userService.usuario =  usuarioToken.usuario as Usuario;

            return of(true);
        } else {
            localStorage.removeItem('accessToken');
            this._authenticated = false;
            return  of(false);
        } 
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(usuario: Usuario): Observable<any>
    {
        return this._httpClient.post('http://localhost:8080/usuarios/', usuario);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
    }

    /**
     * Verify the given token
     *
     * @param token
     * @private
     */
     private _verifyJWTToken(token: string): boolean
     {
         // Split the token into parts
         const parts = token.split('.');
         const header = parts[0];
         const payload = parts[1];
         const signature = parts[2];

         // Re-sign and encode the header and payload using the secret
         const signatureCheck = this._base64url(HmacSHA256(header + '.' + payload, `${environment.claveSecret}`));

         // Verify that the resulting signature is valid
         return (signature === signatureCheck);
     }

      /**
     * Return base64 encoded version of the given string
     *
     * @param source
     * @private
     */
    private _base64url(source: any): string
    {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        // Return the base64 encoded string
        return encodedSource;
    }
}
