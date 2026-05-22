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
    const result = await issueService.getAllIssues(req.query);
    sendResponse(res, { statusCode: 200, success: true, message: 'Issues retrieved successfully', data: result });
  } catch (error) { next(error); }
};

const getSingleIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const result = await issueService.getSingleIssue(req.params.id as string);
    sendResponse(res, { statusCode: 200, success: true, message: 'Issue retrieved successfully', data: result });
  } catch (error) { next(error); }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customReq = req as CustomRequest; 
    const result = await issueService.updateIssue(req.params.id as string, req.body, customReq.user!);
    sendResponse(res, { statusCode: 200, success: true, message: 'Issue updated successfully', data: result });
  } catch (error) { next(error); }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await issueService.deleteIssue(req.params.id as string);
    res.status(200).json({ success: true, message: 'Issue deleted successfully' });
  } catch (error) { next(error); }
};

export const issueController = { createIssue, getAllIssues, getSingleIssue, updateIssue, deleteIssue };