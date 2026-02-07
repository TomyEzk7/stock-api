import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authController } from './auth.controller.js';

// CONFIG 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRouter = express.Router();

// RUTAS
appRouter.get('/', (req, res) => {
    const loginPath = path.join(__dirname,'..', '..', 'public', 'login.html');
    res.sendFile(loginPath);
});

appRouter.post('/auth/register', authController.register);
appRouter.post('/auth/login', authController.login);


export default appRouter;