# Ticket System

> [!NOTE]
> This is an ongoing project currently in active development. Features are being added incrementally.

A comprehensive ticket management system built with a modern tech stack, featuring a separate client and server architecture within a monorepo.

## Tech Stack

### Client (`/client`)
- **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Language**: TypeScript
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query) & [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Backend Integration**: [Supabase Client](https://supabase.com/docs/reference/javascript/introduction)

### Server (`/server`)
- **Framework**: [Hono](https://hono.dev/)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Email**: Nodemailer

### Database
- **Supabase**: Used for database (PostgreSQL), authentication, and realtime subscriptions.

### Package Manager
- **pnpm**: Used for efficient dependency management in the monorepo.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for local development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

## Environment Variables

You will need to configure environment variables for both the client and server.

1. **Client**: Create a `.env` file in the `client` directory.
   ```bash
   cp client/.env.example client/.env # If .env.example exists
   ```
   Required variables typically include:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Server**: Create a `.env` file in the `server` directory.
   ```bash
   cp server/.env.example server/.env # If .env.example exists
   ```
   Required variables typically include:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables (see Environment Variables section)
# Then run the development servers
pnpm dev
```

The client will be available at `http://localhost:5173` and the server at `http://localhost:3000`.

## Features

- **Authentication System**: Comprehensive user authentication powered by Supabase Auth
  - Email/password sign-up and sign-in
  - Magic link authentication
  - Password recovery and reset
  - OTP verification
  - Session management
- **Modern UI**: Beautiful, responsive interface built with Radix UI and TailwindCSS
- **Type-safe**: End-to-end TypeScript for better developer experience
- **Clean Architecture**: Domain-driven design with clear separation of concerns

## Running the Project

This project uses `pnpm` workspaces. You can run commands from the root directory.

### Development

- **Run both Client and Server** (concurrently)
  ```bash
  pnpm dev
  ```

- **Run Client only**
  ```bash
  pnpm dev-client
  ```

- **Run Server only**
  ```bash
  pnpm dev-server
  ```

The client will typically run on `http://localhost:5173` and the server on `http://localhost:3000` (check terminal output for exact ports).

## Project Structure

```
ticket-system/
├── client/          # Frontend React application
├── server/          # Backend Hono API server
└── supabase/        # Database configuration and migrations
```

For detailed documentation on each component:
- **[Client Documentation](./client/README.md)** - Frontend application details
- **[Server Documentation](./server/README.md)** - Backend API details

### High-Level Structure

- **`client/`**: Frontend application code.
  - **`src/components/`**: Reusable UI components.
  - **`src/domain/`**: Feature-specific logic and components.
  - **`src/hooks/`**: Custom React hooks.
  - **`src/lib/`**: Utility functions and configurations.
  - **`src/routes/`**: Application routes (TanStack Router).
- **`server/`**: Backend API and server logic.
  - **`src/lib/`**: Shared utilities.
  - **`src/middlewares/`**: Hono middlewares.
  - **`src/routes/`**: API route definitions.
- **`supabase/`**: Supabase configuration, migrations, and seed data.

## Development Workflow

1. **Start Supabase** (if running locally with Supabase CLI)
   ```bash
   supabase start
   ```

2. **Run the development servers**
   ```bash
   pnpm dev
   ```

3. **Make your changes** - The dev servers will hot-reload automatically

4. **Format and lint your code**
   ```bash
   # In client directory
   cd client && pnpm format && pnpm lint
   
   # In server directory
   cd server && pnpm format && pnpm lint
   ```
