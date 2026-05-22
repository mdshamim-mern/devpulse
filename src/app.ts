import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.route';
import { issueRoutes } from './modules/issues/issue.route';
import globalErrorHandler from './middleware/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);

app.get('/', (req, res) => {
  res.send('DevPulse API is running...');
});

app.use(globalErrorHandler);

export default app;