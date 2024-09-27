import { Router } from 'express';
import {VentaController }from '../controllers/ventaController.js';

export const ventaRoutes = Router();

ventaRoutes.post('/', VentaController.crearVenta);


