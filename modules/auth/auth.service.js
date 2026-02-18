// HASHEAR CONTRASEÑAS, GENERAR TOKENS JWT
import prisma from '../../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';

const { JWT_SECRET } = env;


export const authService = {
    // FUNCION PARA CREAR USER
    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username, 
                password: hashedPassword
            }
        });
        return user;
    },

    // FUNCION PARA BUSCAR USUARIO POR NOMBRE
    async findUserByName(username) {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        return user;
    },

    async login(username, password) {
        const user = await this.findUserByName(username);

        if (!user) {
            throw new Error('User not found');
        }
        
        const isValid = await bcrypt.compare(password, user.password);

        // generar token jwt y devolverlo
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            {expiresIn: '1h'}
        )

        if (!isValid) {
            throw new Error('Incorrect password')
        }
        
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}