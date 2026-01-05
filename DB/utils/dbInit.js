import { db } from '../config/db.js';
import bcrypt from 'bcrypt';

/**
 * Initialize database with test data
 * Run this once to set up admin and PWD users for testing
 */
export async function initializeDatabase() {
  try {
    const connection = await db.getConnection();

    // Check if test admin exists
    const [adminExists] = await connection.query(
      'SELECT person_id FROM person_in_charge WHERE username = ?',
      ['testadmin']
    );

    if (adminExists.length === 0) {
      // Create test admin
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      await connection.query(
        `INSERT INTO person_in_charge 
         (username, password_hash, fullname, contact_no, role, position) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        ['testadmin', hashedPassword, 'Test Administrator', '09123456789', 'admin', 'System Admin']
      );
      console.log('✓ Test admin created: testadmin / Admin@123');
    }

    // Check if test PWD user exists
    const [pwdExists] = await connection.query(
      'SELECT pwd_id FROM nangka_pwd_user WHERE firstname = ?',
      ['Juan']
    );

    if (pwdExists.length === 0) {
      // Get the person_id of test admin
      const [admin] = await connection.query(
        'SELECT person_id FROM person_in_charge WHERE username = ?',
        ['testadmin']
      );

      // Create test PWD user
      await connection.query(
        `INSERT INTO nangka_pwd_user 
         (person_id, barangay_id, firstname, middlename, lastname, suffix, 
          birthdate, age, sex, civil_status, address, contact_no)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          admin[0].person_id,
          'Bagong',
          'Juan',
          'Gonzales',
          'Dela Cruz',
          'Jr.',
          '1998-05-15',
          25,
          'Male',
          'Single',
          '123 Main Street, Barangay Bagong',
          '09987654321'
        ]
      );
      console.log('✓ Test PWD user created: PWD ID will be auto-generated');
    }

    connection.release();
    console.log('✓ Database initialization complete');
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}
