# Architecture Documentation

## Overview

This project is an e-commerce web application for a hardware store named "Magwere Hardware". It follows a modern full-stack JavaScript architecture with a React frontend and an Express.js backend, both written in TypeScript. The application uses PostgreSQL for data storage with Drizzle ORM for database access.

The architecture follows a client-server model with shared types and schemas between the frontend and backend to ensure type safety across the entire application.

## System Architecture

The system is built using a layered architecture:

```
┌─────────────────┐
│  React Frontend │
│   (Client SPA)  │
└────────┬────────┘
         │
         │ HTTP/JSON
         ▼
┌─────────────────┐
│  Express.js API │
│    (Server)     │
└────────┬────────┘
         │
         │ Drizzle ORM
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
```

### Key Architecture Decisions

1. **Monorepo Structure**: The project uses a monorepo structure with a clear separation between client, server, and shared code to facilitate code sharing while maintaining separation of concerns.

2. **TypeScript Throughout**: TypeScript is used across the entire stack to provide type safety and better developer experience.

3. **Component-Based UI**: The frontend uses a component-based architecture with shadcn/ui components built on Radix UI primitives.

4. **API-First Backend**: The backend follows a RESTful API approach with structured routes and controllers.

5. **Schema-Driven Development**: Database schemas are defined in TypeScript using Drizzle ORM and shared between frontend and backend.

## Key Components

### Frontend

- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state, React context for UI state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with a custom theme
- **Build Tool**: Vite

The frontend follows a component-based architecture with the following structure:

- `/client/src/pages`: Page components corresponding to routes
- `/client/src/components`: Reusable UI components
  - `/client/src/components/ui`: Generic UI components from shadcn/ui
  - `/client/src/components/layout`: Layout components (header, footer, etc.)
  - `/client/src/components/home`: Components specific to the home page
- `/client/src/lib`: Utility functions and shared functionality
- `/client/src/hooks`: Custom React hooks

### Backend

- **Framework**: Express.js with TypeScript
- **ORM**: Drizzle ORM for PostgreSQL
- **API Style**: RESTful JSON API
- **File Structure**:
  - `/server/index.ts`: Server entry point
  - `/server/routes.ts`: API route definitions
  - `/server/storage.ts`: Data access layer
  - `/server/vite.ts`: Development server configuration

The backend is organized in a modular fashion:

1. **Routes Layer**: Defines API endpoints and handles HTTP requests/responses
2. **Storage Layer**: Abstracts database operations using the Repository pattern
3. **Shared Schemas**: Uses Drizzle ORM schemas for database operations

### Shared Code

- `/shared/schema.ts`: Contains database schema definitions using Drizzle ORM
- Type definitions shared between frontend and backend

## Data Flow

### Frontend to Backend Flow

1. User interacts with the UI
2. React component triggers a data fetch using React Query
3. HTTP request is sent to the Express.js backend
4. Express routes handle the request and delegate to storage functions
5. Response is sent back to the frontend
6. React Query updates the UI with the new data

### Data Persistence Flow

1. API endpoint receives data
2. Data is validated (using Zod schemas derived from Drizzle)
3. Storage layer performs database operations using Drizzle ORM
4. Results are returned to the client

## Database Schema

The application uses PostgreSQL with Drizzle ORM. The schema includes:

- **Products**: Store product information (name, description, price, etc.)
- **Categories**: Product categories with metadata
- **Cart Items**: Shopping cart items linked to session IDs
- **Contact Messages**: Customer inquiries and messages

The schema is defined in a type-safe manner using Drizzle ORM in `/shared/schema.ts`.

## External Dependencies

### Frontend Dependencies

- **@radix-ui/***: UI primitives for accessible components
- **@tanstack/react-query**: Data fetching and server state management
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **class-variance-authority**: For creating variant-based components
- **clsx**: For conditional class name joining
- **lucide-react**: Icon library

### Backend Dependencies

- **express**: Web server framework
- **drizzle-orm**: TypeScript ORM
- **@neondatabase/serverless**: Database client (likely for Neon PostgreSQL)
- **zod**: Schema validation

## API Structure

The application provides RESTful API endpoints:

- **Products API**:
  - `GET /api/products`: Get all products
  - `GET /api/products/:id`: Get product by ID
  - `GET /api/products/category/:category`: Get products by category

- **Cart API**:
  - `GET /api/cart`: Get cart items for the current session
  - `POST /api/cart`: Add item to cart
  - `PATCH /api/cart/:id`: Update cart item quantity
  - `DELETE /api/cart/:id`: Remove item from cart

- **Categories API**:
  - `GET /api/categories`: Get all categories

- **Contact API**:
  - `POST /api/contact`: Submit contact form

## Authentication and Authorization

The application currently appears to use session-based identification for cart functionality but doesn't implement a comprehensive authentication system. Cart items are linked to session IDs rather than user accounts.

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development Mode**: Uses Vite's dev server with HMR
2. **Production Build**:
   - Frontend: Built with Vite to static assets
   - Backend: Bundled with esbuild
   - Combined into a single deployable package

The deployment configuration in `.replit` indicates:
- Node.js 20 runtime
- PostgreSQL 16 database
- Automated build and deployment process

## Development Workflow

1. **Development**: `npm run dev` runs both frontend and backend in development mode
2. **Type Checking**: `npm run check` validates TypeScript types
3. **Database Schema Updates**: `npm run db:push` updates the database schema
4. **Production Build**: `npm run build` creates optimized production build
5. **Production Start**: `npm run start` runs the production build

## Future Considerations

1. **Authentication**: Implementing a proper authentication system
2. **Payment Integration**: Adding payment processing capabilities
3. **Order Management**: Extending the schema to handle orders and order history
4. **Admin Dashboard**: Creating an admin interface for product management