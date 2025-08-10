import express from 'express';
import 'dotenv/config';
import router from './router';
import{connectDB} from './config/db'

connectDB()

const app = express();

//!LEER DATOS DEL FORMULARIO
app.use(express.json());
app.use('/', router);
export default app;

//OPA2d6EeJ1mlwqHj