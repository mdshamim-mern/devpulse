// Controller logic for issue management
import { Request, Response, NextFunction } from 'express';
import { issueService, IIssuePayload } from './issue.service';
import sendResponse from '../../utils/sendResponse';

interface CustomRequest extends Request {
  user?: {
    id: number;
    name: string;
    role: string;
  };
}

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest; 
    const result = await issueService.createIssue(req.body as IIssuePayload, customReq.user!.id);
    sendResponse(res, { statusCode: 201, success: true, message: 'Issue created successfully', data: result });
  } catch (error) { next(error); }
};

const getAllIssues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await issueService.getAllIssues();
    sendResponse(res, { statusCode: 200, success: true, message: 'Issues retrieved successfully', data: result });
  } catch (error) { next(error); }
};

const getSingleIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await issueService.getIssueById(Number(req.params.id));
    sendResponse(res, { statusCode: 200, success: true, message: 'Issue retrieved successfully', data: result });
  } catch (error) { next(error); }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await issueService.updateIssue(Number(req.params.id), req.body);
    sendResponse(res, { statusCode: 200, success: true, message: 'Issue updated successfully', data: result });
  } catch (error) { next(error); }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await issueService.deleteIssue(Number(req.params.id));
    res.status(200).json({ success: true, message: 'Issue deleted successfully' });
  } catch (error) { next(error); }
};

export const issueController = { createIssue, getAllIssues, getSingleIssue, updateIssue, deleteIssue };