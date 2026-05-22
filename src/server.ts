import app from './app';
import config from './config';
import { initDB } from './db';

const startServer = async () => {
  await initDB();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();