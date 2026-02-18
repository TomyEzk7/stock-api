import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authController } from './auth.controller.js';
import { authMiddleware } from './auth.middleware.js'

// CONFIG 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRouter = express.Router();

// rutas publicas (no uso middleware de auth)
appRouter.get('/', (req, res) => {
    const loginPath = path.join(__dirname,'..', '..', 'public', 'login.html');
    res.sendFile(loginPath);
});

appRouter.post('/auth/register', authController.register);
appRouter.post('/auth/login', authController.login);

// rutas privadas (middleware de auth): utilizar prefijo /private

export default appRouter;