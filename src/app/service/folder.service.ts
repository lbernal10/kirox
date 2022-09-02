import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioCustom } from 'app/models/comentario.interface';
import { ComentarioSave } from 'app/models/comentarioSave.interface';
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

    subirArchivo(presentacion: any, titulo_presentacion: any, descripcion_presentacion: any, taller: any, usuario: any): Observable<any> {
        var formData: any = new FormData();
        formData.append("archivo", presentacion);
        console.log(JSON.stringify(formData))
        //return this.http.post<Folder>(`${environment.backendURL}/documento/subir/${idOrganizacion}/`, formData);
        return this.http.post<Folder>(`${environment.backendURL}/documento/subir/${titulo_presentacion}/${descripcion_presentacion}/${taller}/${usuario}/`, formData);
    }

    obtenerDocumentos(): Observable<DocumentoCustom[]> {
        return this.http.post<DocumentoCustom[]>(`${environment.backendURL}/documento/all/`, {
            headers: this.httpHeaders,
        });
    }

    guardarComentario(comentario: ComentarioSave): Observable<ComentarioSave>{
        return this.http.post<ComentarioSave>(`${environment.backendURL}/documento/comentario/`, comentario, {
            headers: this.httpHeaders,
        });
    }

    eliminar(id: number): Observable<ComentarioSave> {
        console.log(id);
        return this.http.put<ComentarioSave>(`${environment.backendURL}/documento/delete/${id}/`, {
            headers: this.httpHeaders,
        });
    }

}
