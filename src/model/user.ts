// @ts-ignore
import pool from "../database_connection/db";
import Cipher from "../authentication/bcrypt";
import dotenv from 'dotenv';

dotenv.config();


export type user = {
     id?: number;
     firstname?:string;
     lastname?:string;
     upassword?:string

}
const cipher = new Cipher();

export class User {
  async index(): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await pool.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();
      return result.rows; 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<user> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows[0];
    } catch (err) {
        throw new Error(`Could not find user with ${id}. Error: ${err}`);
    }
  }
  async deleteuser(id: string): Promise<[]> {
    try {
    const sql = 'delete FROM users WHERE id=($1)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [id]);
    conn.release();
    return result.rows;
    } catch (err) {
        throw new Error(`Could not delete user with ${id}. Error: ${err}`);
    }
  }
  async updateuser(firstname:string, lastname:string, password:string, id: string): Promise<[]> {
    try {
    const sql = 
    'UPDATE users SET firstname=($1), lastname=($2), upassword=($3) WHERE id=($4)';
    // @ts-ignore
    const conn = await pool.connect();

    const result = await conn.query(sql, [firstname, lastname, password, id]);
    conn.release();
    return result.rows;
    } catch (err) {
        throw new Error(`Could not update user with ${id}. Error: ${err}`);
    }
  }

  async getuserbycredentials(username: string, password:string):Promise<user|null> {
    try {
    // by consider that username in system is unique
    const sql = 'SELECT * FROM users WHERE firstName=($1)';
    // @ts-ignore
    const conn = await pool.connect();
    const result = await conn.query(sql, [username]);
    conn.release();
    if (result.rows.length) {
      const userdata:user = result.rows[0];

      if ((await cipher.decrypt(userdata.upassword as string, password))) {
        return userdata;
      }
    }
    return null;
    } catch (err) {
        throw new Error(` Error: ${err}`);
    }
  }
  
  async create(u: user): Promise<user> {
      try {
    const sql = 'INSERT INTO users (firstName,lastName,Upassword) VALUES ($1, $2, $3) RETURNING *';
    // @ts-ignore
    const conn = await pool.connect();
    const  hash = await cipher.encrypt(u);
    const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
    const user = result.rows[0];
    conn.release();
    return user;
    } catch (err) 
      {
          throw new Error(`Could not add new User`);
      }
  }


}