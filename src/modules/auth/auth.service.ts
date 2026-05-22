// Handles user registration and JWT token generation
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../../db';
import config from '../../config';

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role?: 'contributor' | 'maintainer';
}

export interface ILoginPayload {
  email: string;
  password: string;
}

const signup = async (payload: ISignupPayload) => {
  const { name, email, password, role } = payload;
  const userRole = role || 'contributor';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, userRole]
  );
  return result.rows[0];
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;
  
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  if (result.rows.length === 0) throw { statusCode: 401, message: 'Invalid credentials' };
  
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { statusCode: 401, message: 'Invalid credentials' };

  const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, config.jwt_secret as string, { expiresIn: '7d' });
  
  delete user.password;
  return { token, user };
};

export const authService = { signup, login };