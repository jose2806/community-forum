import cors from 'cors';
import express, { type Express } from 'express';

const configuredOrigins = process.env.FRONTEND_URL
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app: Express = express();

app.use(cors({ origin: configuredOrigins?.length ? configuredOrigins : true }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

export default app;
