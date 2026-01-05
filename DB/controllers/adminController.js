import { db } from '../config/db.js';
import bcrypt from 'bcrypt';

export const getAllAdmins = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [admins] = await connection.query(
      'SELECT person_id, username, fullname, contact_no, role, position, last_login, created_at FROM person_in_charge'
    );
    connection.release();

    res.json({
      message: 'Admins retrieved successfully',
      count: admins.length,
      data: admins
    });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ error: 'Failed to retrieve admins' });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { personId } = req.params;
    const connection = await db.getConnection();
    const [admins] = await connection.query(
      'SELECT person_id, username, fullname, contact_no, role, position, last_login, created_at FROM person_in_charge WHERE person_id = ?',
      [personId]
    );
    connection.release();

    if (admins.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({
      message: 'Admin retrieved successfully',
      data: admins[0]
    });
  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ error: 'Failed to retrieve admin' });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { username, password, fullname, contactNo, role, position } = req.body;

    // Validation
    if (!username || !password || !fullname || !role) {
      return res.status(400).json({ error: 'Required fields: username, password, fullname, role' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `INSERT INTO person_in_charge (username, password_hash, fullname, contact_no, role, position)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, passwordHash, fullname, contactNo, role, position]
    );
    connection.release();

    res.status(201).json({
      message: 'Admin created successfully',
      personId: result.insertId,
      data: {
        personId: result.insertId,
        username,
        fullname,
        role,
        position
      }
    });
  } catch (error) {
    console.error('Create admin error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Failed to create admin' });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { personId } = req.params;
    const { fullname, contactNo, role, position } = req.body;

    if (!fullname && !contactNo && !role && !position) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    let updateFields = [];
    let values = [];

    if (fullname) {
      updateFields.push('fullname = ?');
      values.push(fullname);
    }
    if (contactNo) {
      updateFields.push('contact_no = ?');
      values.push(contactNo);
    }
    if (role) {
      updateFields.push('role = ?');
      values.push(role);
    }
    if (position) {
      updateFields.push('position = ?');
      values.push(position);
    }

    values.push(personId);

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `UPDATE person_in_charge SET ${updateFields.join(', ')} WHERE person_id = ?`,
      values
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({ error: 'Failed to update admin' });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { personId } = req.params;

    const connection = await db.getConnection();
    const [result] = await connection.query(
      'DELETE FROM person_in_charge WHERE person_id = ?',
      [personId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { personId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old password and new password are required' });
    }

    const connection = await db.getConnection();
    const [admins] = await connection.query(
      'SELECT password_hash FROM person_in_charge WHERE person_id = ?',
      [personId]
    );

    if (admins.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Admin not found' });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, admins[0].password_hash);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ error: 'Old password is incorrect' });
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await connection.query(
      'UPDATE person_in_charge SET password_hash = ? WHERE person_id = ?',
      [newPasswordHash, personId]
    );
    connection.release();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
};
