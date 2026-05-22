// Business logic and database operations for issues
import { pool } from '../../db';

export interface IIssuePayload {
  title?: string;
  description?: string;
  type?: string;
  status?: string;
}

// 1. Create Issue
const createIssue = async (payload: IIssuePayload, reporterId: number) => {
  const query = `
    INSERT INTO issues (title, description, type, reporter_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [payload.title, payload.description, payload.type, reporterId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 2. Get All Issues
const getAllIssues = async () => {
  const query = `SELECT * FROM issues ORDER BY created_at DESC`;
  const result = await pool.query(query);
  return result.rows;
};

// 3. Get Single Issue 
const getIssueById = async (id: number) => {
  const issueResult = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
  
  if (issueResult.rows.length === 0) {
    throw { statusCode: 404, message: 'Issue not found' };
  }

  const issue = issueResult.rows[0];

  const userResult = await pool.query('SELECT id, name, role FROM users WHERE id = $1', [issue.reporter_id]);
  const reporter = userResult.rows[0];

  const { reporter_id, ...issueData } = issue;

  return {
    ...issueData,
    reporter
  };
};

// 4. Update Issue 
const updateIssue = async (id: number, payload: Partial<IIssuePayload>) => {
  const checkResult = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
  if (checkResult.rows.length === 0) {
    throw { statusCode: 404, message: 'Issue not found' };
  }

  const existingIssue = checkResult.rows[0];

  let newStatus = payload.status || existingIssue.status;
  if (!payload.status && existingIssue.status === 'open') {
    newStatus = 'in-progress';
  }

  const fields = [];
  const values = [];
  let queryIndex = 1;

  if (payload.title) {
    fields.push(`title = $${queryIndex++}`);
    values.push(payload.title);
  }
  if (payload.description) {
    fields.push(`description = $${queryIndex++}`);
    values.push(payload.description);
  }
  if (payload.type) {
    fields.push(`type = $${queryIndex++}`);
    values.push(payload.type);
  }
  
  fields.push(`status = $${queryIndex++}`);
  values.push(newStatus);
  
  fields.push(`updated_at = NOW()`);

  values.push(id);

  const updateQuery = `
    UPDATE issues 
    SET ${fields.join(', ')} 
    WHERE id = $${queryIndex} 
    RETURNING *
  `;

  const result = await pool.query(updateQuery, values);
  return result.rows[0];
};

// 5. Delete Issue
const deleteIssue = async (id: number) => {
  const checkResult = await pool.query('SELECT * FROM issues WHERE id = $1', [id]);
  if (checkResult.rows.length === 0) {
    throw { statusCode: 404, message: 'Issue not found' };
  }

  const query = `DELETE FROM issues WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const issueService = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};