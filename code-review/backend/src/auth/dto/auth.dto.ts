// Code smell intencional: Falta de validaciones
export class LoginDto {
    email: string;
    password: string;
}

export class RegisterDto {
    email: string;
    password: string;
    role: string;
}