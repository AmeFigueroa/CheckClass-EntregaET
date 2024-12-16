import { Justificativo } from "./justificativoestudiante";

export interface UserEstudiante {
    correo: string;
    contrasena: string;
    nombre: string;
    apellido: string;
    rut: string;
    asignaturas: any[];
    justificativos: Justificativo[];
    qrgenerado: any[];
}