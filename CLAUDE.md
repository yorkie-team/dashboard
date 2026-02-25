# Yorkie Dashboard

Admin dashboard for managing Yorkie projects, documents, API keys, and schemas. React 18 + Vite + Redux Toolkit + ConnectRPC.

## Development Commands

```sh
npm install           # Install dependencies
npm run dev           # Vite dev server (http://localhost:3000/dashboard/)
npm run build         # TypeScript check + Vite build
npm run test          # Run Vitest tests
npm run build:proto   # Generate protobuf TypeScript via buf
```

## After Making Changes

Always run before submitting:
```sh
npm run build && npm run test
```

## Gotchas

- Base URL is `/dashboard` (set in Vite config) — all routes are nested under this path
- Apache 2.0 license header required on all source files
- Prettier: 120 chars, single quotes, trailing commas, 2-space indent
- ESLint includes spellcheck plugin — watch for false positives on domain terms
- Feature-based organization: each feature has its own Redux slice under `src/features/`
- Components use compound pattern (e.g., `Button.Box`)
- Generated protobuf code lives in `src/api/yorkie/v1/`
- Environment variables must be prefixed with `VITE_`
