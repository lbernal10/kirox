export interface Usuario {
    id: number;
    nombre: string;
    organizacion: string;
    correo: string;
    password?: string;
    telefono: string;
    tokenPassword?: string;
    rol: Rol;
    estatus: number;
    avatar?: string;
    status?: string;
}

export interface Rol {
    id: number;
    nombre?: string;
    estatus?: number;
}