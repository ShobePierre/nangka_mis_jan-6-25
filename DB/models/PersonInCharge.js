import { db } from '../config/db.js';

export class PersonInCharge {
  static async findByUsername(username) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM person_in_charge WHERE username = ?',
        [username]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findById(personId) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query(
        'SELECT person_id, username, fullname, contact_no, role, position, last_login, created_at FROM person_in_charge WHERE person_id = ?',
        [personId]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async updateLastLogin(personId) {
    try {
      const connection = await db.getConnection();
      await connection.query(
        'UPDATE person_in_charge SET last_login = NOW() WHERE person_id = ?',
        [personId]
      );
      connection.release();
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}
