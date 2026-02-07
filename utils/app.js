import express from 'express';
import appRouter from '../modules/auth/auth.routes.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// CONFIG 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_PATH = path.join(__dirname, '..' ,'public');

export function createApp() {
    const app = express();

    // MIDDLEWARES
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // MANEJO DE RUTAS
    app.use('/', appRouter);

    // SERVIR ARCHIVOS ESTATICOS
    app.use(express.static(PUBLIC_PATH)); 

    return app;
}