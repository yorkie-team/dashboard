# Yorkie Dashboard

Admin dashboard for managing Yorkie projects, documents, API keys, schemas, and monitoring usage.

## Tech Stack

- TypeScript ~5.5, React 18, Vite 5, Redux Toolkit, React Router 6
- ConnectRPC for Yorkie admin API, Sass for styling
- Vitest, ESLint + Prettier, Husky + lint-staged
- Recharts (charting), CodeMirror (document inspector), React Hook Form

## Development Commands

```sh
npm install           # Install dependencies
npm run dev           # Start Vite dev server (http://localhost:3000/dashboard/)
npm run build         # TypeScript check + Vite build
npm run test          # Run Vitest tests
npm run build:proto   # Generate protobuf TypeScript via buf
npm run serve         # Preview production build
npm run fetch:ui      # Fetch shared UI assets
```

## Project Structure

```
src/
  app/                # Redux store, hooks, middleware, thunks
  api/                # ConnectRPC admin client, converters, interceptors
    yorkie/v1/        # Generated protobuf code
  features/           # Feature modules (Redux slices + components)
    users/            # Auth (login, signup, password)
    projects/         # Project management, API keys, settings, charts
    documents/        # Document listing, search, inspection
    channels/         # Channel management
    schemas/          # Schema management
    members/          # Team member management
    globalError/      # Error handling
  pages/              # Route page components
  components/         # Reusable UI components (Button, Modal, Dropdown, etc.)
  hooks/              # Custom hooks (useAreaBlur, useOutsideClick, useClipboard)
  utils/              # Utilities (format, merge-refs, safe-context)
  assets/styles/      # Global SCSS styles
  App.tsx             # Root component with routing
  main.tsx            # Entry point with Redux Provider
```

## Code Conventions

- Apache 2.0 license header on all source files
- Prettier: 120 chars, single quotes, trailing commas, 2-space indent
- ESLint: react-app + react/recommended, spellcheck plugin
- Feature-based organization: each feature has its own Redux slice
- Components use compound pattern (e.g., `Button.Box`)
- Base URL: `/dashboard` (set in Vite config)
- Environment variables prefixed with `VITE_`
- Commit messages: subject max 70 chars, body at 80 chars

## Architecture Notes

- **State management**: Redux Toolkit with createSlice and createAsyncThunk
- **API layer**: ConnectRPC client with auth interceptor (cookie-based)
- **Auth**: Cookie-based sessions via Yorkie server's /auth endpoints
- **Proto types**: Shared with Yorkie server, generated via `buf generate`
- **Routing**: React Router v6 with nested routes under `/dashboard`
