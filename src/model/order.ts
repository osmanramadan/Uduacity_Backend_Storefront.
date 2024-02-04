// @ts-ignore
import pool from "../database_connection/db";
export type order = {
     id?: number;
     user_id?:number;
     order_status?:string

}
export type productorder = {
     id?: number;
     product_id?:number;
     quantity?:number;
     order_id?:number
}

export class Order {

  async show(userid: number): Promise<order> {
    try {
    const sql = 'SELECT * FROM  orders WHERE user_id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [userid]);
    const orders = result.rows;
    conn.release();

    return orders;
    } catch (err) {
        throw new Error(`Could not find order with ${userid}. Error: ${err}`);
    }
  }
  
  
  async create(o: order): Promise<order> {
      try {
    const sql = 'INSERT INTO orders (user_id,order_status) VALUES ($1, $2) RETURNING *';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn
        .query(sql, [ o.user_id, o.order_status]);

    const orders = result.rows[0];

    conn.release();

    return orders;
      } catch (err) {
          throw new Error(`can't add new order`);
      }
  }
  async addproductsto_order(o: productorder): Promise<productorder> {
      try {
    const sql = 'INSERT INTO orders_product (product_id,order_id,quantity) VALUES ($1, $2, $3) RETURNING *'
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [o.product_id,o.order_id,o.quantity]);
    const orderproduct = result.rows[0];
    conn.release();
    return orderproduct;
      } catch (err) {
        throw new Error(`${err}`);
      }
  }
  async deleteorder(id: number) {
    try {
    const sql = 'delete FROM orders WHERE id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows;
    } catch (err) {
        throw new Error(`Could not delete order with ${id}. Error: ${err}`);
    }
  }
  async updateorderstatus(orderstatus:string, id: number):Promise<order> {
    try {
    const sql = 
    'UPDATE orders SET order_status=($1) WHERE id=($2) RETURNING * ';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [orderstatus, id]);
    conn.release();
    return result.rows[0];
    } catch (err) {
        throw new Error(`${err}`);
    }
  }
  async updateproductsoforder(o:productorder):Promise<productorder> {
    try {
    const sql = 
    'UPDATE orders_product SET product_id=($1),order_id=($2),quantity=($3) WHERE id=($4) RETURNING *';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [o.product_id,o.order_id,o.quantity,o.id]);
    conn.release();
    return result.rows[0];
    } catch (err) {
        throw new Error(`${err}`);
    }
  }



}