import { db } from '../config/db.js';

export class NangkaPWDUser {
  static async findByPwdId(pwdId) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM nangka_pwd_user WHERE pwd_id = ?',
        [pwdId]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findById(pwdId) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query(
        `SELECT pwd_id, person_id, barangay_id, firstname, middlename, lastname, 
                suffix, birthdate, age, sex, civil_status, address, contact_no, 
                guardian_name, guardian_contact, created_at FROM nangka_pwd_user WHERE pwd_id = ?`,
        [pwdId]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findByPersonId(personId) {
    try {
      const connection = await db.getConnection();
      const [rows] = await connection.query(
        'SELECT * FROM nangka_pwd_user WHERE person_id = ?',
        [personId]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}
