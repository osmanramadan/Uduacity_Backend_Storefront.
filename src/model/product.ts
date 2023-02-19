// @ts-ignore
import pool from "../database_connection/db";
export type product = {
     id?: number;
     Pname?:string;
     price?:string;
     category?:string

}

export class Product {
  async index(): Promise<product[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows; 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [id]);

    conn.release();

    return result.rows[0];
    } catch (err) {
        throw new Error(`Could not find product with ${id}. Error: ${err}`);
    }
  }

  async deleteproduct(id: string) {
    try {
    const sql = 'delete FROM products WHERE id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows;
    } catch (err) {
        throw new Error(`Could not delete product with ${id}. Error: ${err}`);
    }
  }
  async updateproduct(productname:string, price:string, category:string, id: string) {
    try {
    const sql = 
    'UPDATE products SET pname=($1), price=($2),category=($3) WHERE id=($4)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [productname, price, category, id]);
    conn.release();
    return result.rows;
    } catch (err) {
        throw new Error(`Could not update product with ${id}. Error: ${err}`);
    }
  }



  async create(p: product): Promise<product> {
      try {
    const sql = 'INSERT INTO products (Pname,price,category) VALUES ($1, $2, $3) RETURNING *';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn
        .query(sql, [p.Pname, p.price, p.category]);

    const users = result.rows[0];

    conn.release();

    return users;
      } catch (err) {
          throw new Error(`Could not add new product`);
      }
  }


}