import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { pool } from '../db';

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (!token) throw { statusCode: 401, message: 'Unauthorized access' };

      if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
      }

      const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
      
      if (userResult.rows.length === 0) {
        throw { statusCode: 401, message: 'User not found' };
      }

      const user = userResult.rows[0];

      if (roles.length && !roles.includes(user.role)) {
        throw { statusCode: 403, message: 'Forbidden access' };
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};