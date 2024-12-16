
// GET, PUT, DELETE
export interface Users {
    id: number;
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    rut: string;
    fotoPerfil: string;
}

// POST
export interface UserNuevo {
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    rut: string;
    fotoPerfil: string;
}