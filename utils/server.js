import { createApp } from './app.js';
import { env } from '../config/env.js';

const app = createApp();
const { PORT } = env;

app.listen(PORT, () => {
    console.log(`✓ Server listening on:  http://localhost:${PORT}`)
})