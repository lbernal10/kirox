import { ComentarioCustom } from "./comentario.interface";

export interface DocumentoCustom {
    idDocumento: number;
    nombreDocumento: string;
    tamanio: string;
    url: string;
    fechaCreacion: string;
    formato: string;
    usuarioCreacion: string;
    fechaModificacion: string;
    tituloPresentacion: string;
    descripcionPresentacion: string;
    urlOpcional: string;
    totalMetadatos: number;
    totalDocumentos: number;
    taller: number;
    comentarios: ComentarioCustom[];
    totalComentarios: number;
}