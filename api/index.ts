import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

// Middleware
app.use(express.json());

// Test API route
app.get('/api/hello', (req, res) => {
  res.json({ message: "API is working!" });
});

// Vercel serverless handler
export default async (req: VercelRequest, res: VercelResponse) => {
  // Convert Vercel request to Express format
  const { method, headers, url, body } = req;
  
  const expressReq = {
    method,
    headers,
    url,
    body,
  } as any;

  const expressRes = {
    statusCode: 200,
    headers: {},
    setHeader: (name: string, value: string) => res.setHeader(name, value),
    end: (data: any) => res.send(data),
  } as any;

  // Forward to Express
  app(expressReq, expressRes);
};