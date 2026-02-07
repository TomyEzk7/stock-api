export const authController = {
    // REGISTRO DE USUARIO
    async register(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    ok: false, 
                    error: 'Missing username or password'
                });
            }

            const user = await authService.createUser(username, password); 

            return res.status(201).json({
                ok: true,
                message: 'User created!', 
                user: {
                    id: user.id,
                    username: user.username
                }
            });

        } catch (err) {
            console.log('Register error:', err);
            
            // ERROR P2002 --> USUARIO YA EXISTE
            if (err.code === 'P2002') { 
                return res.status(400).json({
                    ok: false,
                    error: 'User already exists'
                });
            }

            // Otros errores
            return res.status(500).json({
                ok: false, 
                error: 'Server error'
            });
        }
    },

    // LOGIN DE USUARIO
    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    ok: false, 
                    error: 'Missing username or password'
                });
            }

            const user = await authService.login(username, password);

            return res.json({
                ok: true, 
                message: 'Logged in successfully',
                user
            });

        } catch (err) {
            console.log('Login error:', err);
            
            return res.status(401).json({
                ok: false, 
                error: err.message
            });
        }
    }
};