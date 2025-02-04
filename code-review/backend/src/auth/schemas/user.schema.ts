import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    // Code smell intencional: Falta de validaciones
    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);