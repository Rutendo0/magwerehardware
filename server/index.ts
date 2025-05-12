import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from 'url'; // ADD THIS for ESM __dirname fix

const __filename = fileURLToPath(import.meta.url); // <-- Add this
const __dirname = path.dirname(__filename);

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (!isProduction) {
    // In development mode: setup Vite
    await setupVite(app, server);
  } else {
    // In production mode:
    // 1. Serve static frontend
    app.use(express.static(path.join(__dirname, 'client')));

    // 2. Serve index.html for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'index.html'));
    });

    // 3. Also serve static backend files
    serveStatic(app);
  }

  // Start server
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Serving on port ${port}`);
  });
})();
