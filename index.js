import express from 'express';
import morgan from "morgan";  // Morgan sirve para ver las solicitudes que se hacen hacia el servidor
import bodyParser from 'body-parser';
import { ventaRoutes } from './routes/ventaRoutes.js';
import { pool } from './config/db.js';
import cors from "cors";


const app = express();
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'], // Múltiples orígenes permitidos
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
};
// Habilitar CORS
app.use(cors(corsOptions));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/api/ventas', ventaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} `);
}); 