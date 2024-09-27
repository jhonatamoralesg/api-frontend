import {pool} from '../config/db.js';

export class VentaModel {
  static async crearVenta(idcliente, total, detalles) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'INSERT INTO ventas (idcliente, total) VALUES ($1, $2) RETURNING idventa',
        [idcliente, total]
      );

      const idventa = result.rows[0].idventa;

      for (const detalle of detalles) {
        await client.query(
          'INSERT INTO detallesventa (idventa, idproducto, cantidad, precio) VALUES ($1, $2, $3, $4)',
          [idventa, detalle.idproducto, detalle.cantidad, detalle.precio]
        );
      }

      await client.query('COMMIT');
      return { idventa };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

