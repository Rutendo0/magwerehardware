import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/index'; // Make sure this imports the registerRoutes from your server file

const app = express();

// Initialize routes
registerRoutes(app);

// Export serverless handler
export default (req, res) => {
  app(req, res); // Pass the request and response to the Express app
};
