import { db } from '../config/db.js';

export const getAllPWDUsers = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM nangka_pwd_user'
    );
    connection.release();

    res.json({
      message: 'PWD users retrieved successfully',
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get PWD users error:', error);
    res.status(500).json({ error: 'Failed to retrieve PWD users' });
  }
};

export const getPWDUserById = async (req, res) => {
  try {
    const { pwdId } = req.params;
    const connection = await db.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM nangka_pwd_user WHERE pwd_id = ?',
      [pwdId]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ error: 'PWD user not found' });
    }

    res.json({
      message: 'PWD user retrieved successfully',
      data: users[0]
    });
  } catch (error) {
    console.error('Get PWD user error:', error);
    res.status(500).json({ error: 'Failed to retrieve PWD user' });
  }
};

export const getPWDUsersByBarangay = async (req, res) => {
  try {
    const { barangayId } = req.params;
    const connection = await db.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM nangka_pwd_user WHERE barangay_id = ? ORDER BY lastname, firstname',
      [barangayId]
    );
    connection.release();

    res.json({
      message: 'PWD users retrieved successfully',
      barangay: barangayId,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get PWD users by barangay error:', error);
    res.status(500).json({ error: 'Failed to retrieve PWD users by barangay' });
  }
};

export const createPWDUser = async (req, res) => {
  try {
    const {
      personId,
      barangayId,
      firstname,
      middlename,
      lastname,
      suffix,
      birthdate,
      age,
      sex,
      civilStatus,
      address,
      contactNo,
      guardianName,
      guardianContact
    } = req.body;

    // Validation
    if (!personId || !firstname || !lastname) {
      return res.status(400).json({ error: 'Required fields: personId, firstname, lastname' });
    }

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `INSERT INTO nangka_pwd_user 
       (person_id, barangay_id, firstname, middlename, lastname, suffix, 
        birthdate, age, sex, civil_status, address, contact_no, guardian_name, guardian_contact)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [personId, barangayId, firstname, middlename, lastname, suffix, birthdate, age, sex, civilStatus, address, contactNo, guardianName, guardianContact]
    );
    connection.release();

    res.status(201).json({
      message: 'PWD user created successfully',
      pwdId: result.insertId,
      data: {
        pwdId: result.insertId,
        personId,
        firstname,
        lastname,
        barangayId
      }
    });
  } catch (error) {
    console.error('Create PWD user error:', error);
    res.status(500).json({ error: 'Failed to create PWD user' });
  }
};

export const updatePWDUser = async (req, res) => {
  try {
    const { pwdId } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Build dynamic update query
    const allowedFields = [
      'barangay_id', 'firstname', 'middlename', 'lastname', 'suffix',
      'birthdate', 'age', 'sex', 'civil_status', 'address', 'contact_no',
      'guardian_name', 'guardian_contact'
    ];

    const updateFields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
      const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      if (allowedFields.includes(dbKey)) {
        updateFields.push(`${dbKey} = ?`);
        values.push(value);
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(pwdId);

    const connection = await db.getConnection();
    const [result] = await connection.query(
      `UPDATE nangka_pwd_user SET ${updateFields.join(', ')} WHERE pwd_id = ?`,
      values
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'PWD user not found' });
    }

    res.json({ message: 'PWD user updated successfully' });
  } catch (error) {
    console.error('Update PWD user error:', error);
    res.status(500).json({ error: 'Failed to update PWD user' });
  }
};

export const deletePWDUser = async (req, res) => {
  try {
    const { pwdId } = req.params;

    const connection = await db.getConnection();
    const [result] = await connection.query(
      'DELETE FROM nangka_pwd_user WHERE pwd_id = ?',
      [pwdId]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'PWD user not found' });
    }

    res.json({ message: 'PWD user deleted successfully' });
  } catch (error) {
    console.error('Delete PWD user error:', error);
    res.status(500).json({ error: 'Failed to delete PWD user' });
  }
};

export const searchPWDUsers = async (req, res) => {
  try {
    const { firstname, lastname, barangayId } = req.query;

    let query = 'SELECT * FROM nangka_pwd_user WHERE 1=1';
    const params = [];

    if (firstname) {
      query += ' AND firstname LIKE ?';
      params.push(`%${firstname}%`);
    }

    if (lastname) {
      query += ' AND lastname LIKE ?';
      params.push(`%${lastname}%`);
    }

    if (barangayId) {
      query += ' AND barangay_id = ?';
      params.push(barangayId);
    }

    query += ' ORDER BY lastname, firstname';

    const connection = await db.getConnection();
    const [users] = await connection.query(query, params);
    connection.release();

    res.json({
      message: 'PWD users found',
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Search PWD users error:', error);
    res.status(500).json({ error: 'Failed to search PWD users' });
  }
};
