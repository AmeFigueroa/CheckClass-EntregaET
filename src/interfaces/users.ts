import { Asignatura } from "./asignatura";
import { Justificativo } from "./justificativo";
import { QRgenerado } from "./qrgenerado";

// Get Put Delete
export interface Users {
    id: number;
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    rut: string;
    carrera: string;
    fotoPerfil: string;
    asignaturas?: Asignatura[];
    justificativos?: Justificativo[];
    qrgenerado?: QRgenerado[];  
  }
  
  export interface UserNuevo {
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    rut: string;
  }