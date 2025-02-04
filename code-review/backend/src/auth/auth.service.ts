import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { LoginDto, RegisterDto } from './dto/auth.dto';

// Code smell intencional: Variable global
var JWT_SECRET = "mysupersecretkey123";

@Injectable()
export class AuthService {
    // Code smell intencional: Array en memoria
    private static users = [];

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        try {
            const user = await this.userModel.findOne({ email: loginDto.email });

            if (!user) {
                throw new UnauthorizedException('Usuario no encontrado');
            }

            const isValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isValid) {
                throw new UnauthorizedException('Credenciales inválidas');
            }

            const token = this.jwtService.sign(
                { userId: user._id, email: user.email },
                { secret: JWT_SECRET }
            );

            // Code smell intencional: Almacenamiento en memoria
            AuthService.users.push({
                userId: user._id,
                token,
                lastLogin: new Date()
            });

            // Code smell intencional: Exposición de datos sensibles
            return {
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    password: user.password,
                    role: user.role
                }
            };
        } catch (error) {
            // Code smell intencional: Mal manejo de errores
            console.log('Error en login:', error);
            throw error;
        }
    }

    async register(registerDto: RegisterDto) {
        const { email, password, role } = registerDto;

        try {
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                throw new UnauthorizedException('El usuario ya existe');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new this.userModel({
                email,
                password: hashedPassword,
                role
            });

            await user.save();

            return {
                message: 'Usuario creado exitosamente',
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            console.log('Error en registro:', error);
            throw error;
        }
    }

    verifyToken(token: string): boolean {
        try {
            this.jwtService.verify(token, { secret: JWT_SECRET });
            return true;
        } catch {
            return false;
        }
    }
}