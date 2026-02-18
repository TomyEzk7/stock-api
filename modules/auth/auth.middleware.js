import jwt from 'jsonwebtoken'; 
import { env } from '../../config/env.js';

const { JWT_SECRET } = env;


// middleware para autentificar el jwt a la hora de hacer solicitudes a rutas protegidas
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // verifica que haya jwt en la req y que comience con "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false, 
            message: 'Token required' 
        });
    }

    // aisla el token
    const token = authHeader.split(' ')[1];

    // verify compara el token y devuelve el objeto encriptado, lo guardo en req.user
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 

        // devuelvo control al controller
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false, 
            message: 'Invalid or expired token'
        });
    }
}
