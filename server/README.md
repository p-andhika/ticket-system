# Ticket System - Server

The backend API server for the Ticket System, built with Hono and TypeScript.

## Tech Stack

- **Framework**: [Hono](https://hono.dev/) - Ultrafast web framework
- **Runtime**: [Node.js](https://nodejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Logging**: [Pino](https://getpino.io/) with [hono-pino](https://github.com/maou-shonen/hono-pino)
- **Validation**: [Zod](https://zod.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) with Hono plugins
- **Environment**: [@dotenvx/dotenvx](https://dotenvx.com/)

## Project Structure

```
server/
├── src/
│   ├── lib/             # Shared utilities and configurations
│   │   ├── supabase/    # Supabase client setup
│   │   └── ...          # Other utilities
│   ├── middlewares/     # Hono middleware functions
│   │   ├── auth.ts      # Authentication middleware
│   │   └── ...          # Other middlewares
│   ├── routes/          # API route definitions
│   │   └── auth.route.ts # Authentication routes
│   ├── env.ts           # Environment variable validation
│   └── index.ts         # Application entry point
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)
- [Supabase](https://supabase.com/) project

### Installation

From the **root directory** of the monorepo:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=your_database_connection_string

# Email Configuration (if using email features)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

You can get Supabase values from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api).

### Running the Development Server

From the **root directory**:

```bash
# Run server only
pnpm dev-server

# Or run both client and server
pnpm dev
```

The server will be available at `http://localhost:3000`.

## Available Scripts

All scripts should be run from the `server` directory:

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format
```

## API Documentation

### Authentication Routes

Base URL: `/api/auth`

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### POST `/api/auth/login`
Sign in an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### POST `/api/auth/logout`
Sign out the current user.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### GET `/api/auth/session`
Get the current user session.

**Headers:**
```
Authorization: Bearer <access_token>
```

## Architecture

### Middleware Stack

The server uses the following middleware:

1. **Logger**: Request/response logging with Pino
2. **CORS**: Cross-origin resource sharing
3. **Authentication**: JWT token validation (for protected routes)
4. **Error Handling**: Centralized error handling

### Route Organization

Routes are organized by feature/domain:

- **`auth.route.ts`**: Authentication endpoints (signup, login, logout, session)
- Additional routes can be added following the same pattern

### Database Integration

- **Supabase Client**: Configured in `src/lib/supabase/`
- **Row Level Security (RLS)**: Enforced at the database level
- **Type Safety**: Database types generated from Supabase schema

### Error Handling

The server uses consistent error responses:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Development Guidelines

### Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run `pnpm format` before committing to ensure consistent code style.

### Adding New Routes

1. Create a new route file in `src/routes/`:

```typescript
// src/routes/tickets.route.ts
import { Hono } from 'hono';

const ticketsRoute = new Hono();

ticketsRoute.get('/', async (c) => {
  // Handle GET /api/tickets
  return c.json({ tickets: [] });
});

export default ticketsRoute;
```

2. Register the route in `src/index.ts`:

```typescript
import ticketsRoute from './routes/tickets.route';

app.route('/api/tickets', ticketsRoute);
```

### Adding Middleware

Create middleware in `src/middlewares/`:

```typescript
// src/middlewares/example.ts
import { MiddlewareHandler } from 'hono';

export const exampleMiddleware: MiddlewareHandler = async (c, next) => {
  // Middleware logic
  await next();
};
```

### Environment Variables

Environment variables are validated using Zod in `src/env.ts`. Add new variables:

```typescript
const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  // Add new variables here
  NEW_VAR: z.string(),
});
```

## Building for Production

```bash
pnpm build
```

This will:
1. Build the client bundle (if needed)
2. Build the server bundle
3. Output to `dist/` directory

The production build uses:
- **[@hono/vite-build](https://www.npmjs.com/package/@hono/vite-build)** for building
- **[@hono/vite-dev-server](https://www.npmjs.com/package/@hono/vite-dev-server)** for development

## Deployment

The server can be deployed to various platforms:

- **Node.js**: Run the built server with `node dist/index.js`
- **Vercel**: Deploy as a serverless function
- **Cloudflare Workers**: Deploy to the edge (may require adapter changes)
- **Docker**: Containerize the application

## Troubleshooting

### Port Already in Use

Change the port in `src/index.ts`:

```typescript
const port = process.env.PORT || 3001;
```

### Database Connection Issues

Verify your `DATABASE_URL` and Supabase credentials in the `.env` file.

### CORS Errors

Ensure the client URL is allowed in CORS configuration:

```typescript
app.use('/*', cors({
  origin: ['http://localhost:5173'],
}));
```

## Learn More

- [Hono Documentation](https://hono.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Pino Logger](https://getpino.io/)
- [Zod Validation](https://zod.dev/)
- [Nodemailer](https://nodemailer.com/)
