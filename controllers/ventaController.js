import {VentaModel }from '../models/ventaModel.js';

export class VentaController {
  static async crearVenta(req, res) {
    const { idcliente, total, detalles } = req.body;

    try {
      const result = await VentaModel.crearVenta(idcliente, total, detalles);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la venta' });
    }
  }
}

