# Ticket System - Client

The frontend application for the Ticket System, built with React, TypeScript, and modern web technologies.

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **State Management**: 
  - [TanStack Query](https://tanstack.com/query/latest) (Server state)
  - [Zustand](https://github.com/pmndrs/zustand) (Client state)
- **Routing**: [TanStack Router](https://tanstack.com/router/latest)
- **Forms**: [TanStack Form](https://tanstack.com/form/latest) with [Zod](https://zod.dev/) validation
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend Integration**: [Supabase Client](https://supabase.com/docs/reference/javascript/introduction)

## Project Structure

```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components (buttons, inputs, etc.)
│   │   └── ...          # Feature-specific components
│   ├── domain/          # Feature modules (domain-driven design)
│   │   └── auth/        # Authentication domain
│   │       ├── adapters/      # External service adapters
│   │       ├── repositories/  # Data access layer
│   │       ├── services/      # Business logic services
│   │       ├── types/         # TypeScript types and interfaces
│   │       ├── use-cases/     # Application use cases (login, signup, etc.)
│   │       └── view/          # UI components for auth features
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   │   ├── api/         # API client setup
│   │   ├── supabase/    # Supabase client configuration
│   │   └── utils/       # Helper functions
│   ├── routes/          # Application routes (TanStack Router)
│   ├── app.tsx          # Root application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/)

### Installation

From the **root directory** of the monorepo:

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can get these values from your [Supabase project settings](https://supabase.com/dashboard/project/_/settings/api).

### Running the Development Server

From the **root directory**:

```bash
# Run client only
pnpm dev-client

# Or run both client and server
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

All scripts should be run from the `client` directory:

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format
```

## Key Features

### Authentication
- User sign-up and sign-in
- Session management with Supabase Auth
- Protected routes
- Automatic token refresh

### Routing
- File-based routing with TanStack Router
- Type-safe route definitions
- Nested layouts
- Route-level code splitting

### State Management
- Server state managed by TanStack Query
- Client state managed by Zustand
- Optimistic updates
- Automatic cache invalidation

### UI/UX
- Dark mode support with `next-themes`
- Responsive design
- Accessible components with Radix UI
- Toast notifications with Sonner
- Loading states and error boundaries

## Architecture

### Domain-Driven Structure

The `src/domain/` directory contains feature modules organized by business domain:

- **auth/**: Authentication-related components, hooks, and logic
  - Components for login, signup, and session management
  - Auth-specific hooks and utilities

#### Auth Domain Architecture

The auth domain follows a **clean architecture** pattern with clear separation of concerns:

```
auth/
├── adapters/          # External service adapters
│   └── supabase-auth-adapter.ts  # Supabase authentication adapter
├── repositories/      # Data access layer
│   └── auth-repository.ts        # Authentication data operations
├── services/          # Business logic services
│   └── auth-service.ts           # Core authentication logic
├── types/             # TypeScript types and interfaces
│   └── auth.types.ts             # Auth-related type definitions
├── use-cases/         # Application use cases
│   ├── use-signin-form.ts        # Sign-in form logic
│   ├── use-signup-form.ts        # Sign-up form logic
│   ├── use-signout.ts            # Sign-out logic
│   ├── use-forgot-password.ts    # Password recovery
│   ├── use-reset-password.ts     # Password reset
│   ├── use-magic-link.ts         # Magic link authentication
│   └── use-verify-otp.ts         # OTP verification
└── view/              # UI components
    ├── components/               # Reusable auth UI components
    ├── signin-page.tsx          # Sign-in page
    ├── signup-page.tsx          # Sign-up page
    ├── reset-password-page.tsx  # Password reset page
    └── verify-otp-page.tsx      # OTP verification page
```

**Layer Responsibilities:**
- **Adapters**: Interface with external services (Supabase)
- **Repositories**: Abstract data access operations
- **Services**: Contain business logic and orchestration
- **Types**: Define TypeScript interfaces and types
- **Use Cases**: Encapsulate specific user actions (hooks)
- **View**: UI components and pages for authentication flows

### Component Organization

- **`components/ui/`**: Base UI components built on Radix UI
- **`components/`**: Shared, reusable components
- **Domain components**: Feature-specific components live in their respective domain folders

### API Integration

- API calls are centralized in `src/lib/api/`
- Supabase client is configured in `src/lib/supabase/`
- TanStack Query handles caching, refetching, and synchronization

## Development Guidelines

### Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run `pnpm format` before committing to ensure consistent code style.

### Adding New Routes

Routes are defined in `src/routes/`. TanStack Router uses file-based routing:

```
src/routes/
├── __root.tsx       # Root layout
├── index.tsx        # Home page (/)
└── tickets/
    ├── index.tsx    # Tickets list (/tickets)
    └── $id.tsx      # Ticket detail (/tickets/:id)
```

### Adding New Components

1. Create component in appropriate directory
2. Use TypeScript for props
3. Follow existing naming conventions
4. Add to domain folder if feature-specific

## Building for Production

```bash
pnpm build
```

This will:
1. Run TypeScript compiler
2. Build optimized production bundle
3. Output to `dist/` directory

Preview the production build:

```bash
pnpm preview
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port.

### Environment Variables Not Loading

Make sure your `.env` file is in the `client` directory and variables are prefixed with `VITE_`.

### Type Errors

Run TypeScript compiler to check for type errors:

```bash
pnpm build
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
