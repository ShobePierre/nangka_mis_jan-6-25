import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PersonInCharge } from '../models/PersonInCharge.js';
import { NangkaPWDUser } from '../models/NangkaPWDUser.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const TOKEN_EXPIRY = '24h';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = await PersonInCharge.findByUsername(username);

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    await PersonInCharge.updateLastLogin(admin.person_id);

    const token = jwt.sign(
      {
        personId: admin.person_id,
        username: admin.username,
        fullname: admin.fullname,
        role: admin.role,
        userType: 'admin'
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        personId: admin.person_id,
        username: admin.username,
        fullname: admin.fullname,
        role: admin.role,
        position: admin.position,
        contactNo: admin.contact_no
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const loginPWDUser = async (req, res) => {
  try {
    const { pwdId, password } = req.body;

    if (!pwdId || !password) {
      return res.status(400).json({ error: 'PWD ID and password are required' });
    }

    const pwdUser = await NangkaPWDUser.findByPwdId(pwdId);

    if (!pwdUser) {
      return res.status(401).json({ error: 'Invalid PWD ID or password' });
    }

    // Password is the surname (lastname)
    const isPasswordValid = password.toLowerCase() === pwdUser.lastname.toLowerCase();

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid PWD ID or password' });
    }

    const token = jwt.sign(
      {
        pwdId: pwdUser.pwd_id,
        personId: pwdUser.person_id,
        firstName: pwdUser.firstname,
        lastName: pwdUser.lastname,
        fullName: `${pwdUser.firstname} ${pwdUser.middlename || ''} ${pwdUser.lastname}`.trim(),
        userType: 'pwd'
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        pwdId: pwdUser.pwd_id,
        firstName: pwdUser.firstname,
        lastName: pwdUser.lastname,
        fullName: `${pwdUser.firstname} ${pwdUser.middlename || ''} ${pwdUser.lastname}`.trim(),
        age: pwdUser.age,
        sex: pwdUser.sex,
        barangay: pwdUser.barangay_id
      }
    });
  } catch (error) {
    console.error('PWD Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = (req, res) => {
  res.json({ message: 'Logout successful' });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    if (user.userType === 'admin') {
      const adminData = await PersonInCharge.findById(user.personId);
      return res.json({
        userType: 'admin',
        user: adminData
      });
    } else if (user.userType === 'pwd') {
      const pwdData = await NangkaPWDUser.findById(user.pwdId);
      return res.json({
        userType: 'pwd',
        user: pwdData
      });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
};
