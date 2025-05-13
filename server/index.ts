import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from 'path';

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
    // Use a static path to your client build folder without relying on __dirname
    const clientDistPath = path.join(process.cwd(), 'client', 'dist');

    // 1. Serve static frontend files
    app.use(express.static(clientDistPath));

    // 2. Serve index.html for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });

    // 3. Serve backend static files if needed
    serveStatic(app);
  }

  // Start server
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`Server running in ${isProduction ? 'production' : 'development'} mode`);
    log(`Serving on port ${port}`);
  });
})();
