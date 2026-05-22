// Controller for user authentication and login
import { Request, Response, NextFunction } from 'express';
import { authService, ISignupPayload, ILoginPayload } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signup(req.body as ISignupPayload);
    sendResponse(res, { statusCode: 201, success: true, message: 'User registered successfully', data: result });
  } catch (error) { next(error); }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body as ILoginPayload);
    sendResponse(res, { statusCode: 200, success: true, message: 'Login successful', data: result });
  } catch (error) { next(error); }
};

export const authController = { signup, login };