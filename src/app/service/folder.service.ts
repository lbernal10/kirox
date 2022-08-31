import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentoCustom } from 'app/models/documento.interface';
import { Folder } from 'app/models/folder.interface';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class FolderService {
 
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) {}

    subirArchivo(presentacion: any, titulo_presentacion: any, descripcion_presentacion: any, url_opcional: any, taller: any): Observable<any> {
        var formData: any = new FormData();
        formData.append("archivo", presentacion);
        console.log(JSON.stringify(formData))
        //return this.http.post<Folder>(`${environment.backendURL}/documento/subir/${idOrganizacion}/`, formData);
        return this.http.post<Folder>(`${environment.backendURL}/documento/subir/${titulo_presentacion}/${descripcion_presentacion}/${url_opcional}/${taller}/`, formData);
    }

    obtenerDocumentos(): Observable<DocumentoCustom[]> {
        return this.http.post<DocumentoCustom[]>(`${environment.backendURL}/documento/all/`, {
            headers: this.httpHeaders,
        });
    }

}
