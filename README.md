# DB Work Experience Starter

This repository is a small starter app for students working with API-driven tasks and guides during the programme.

It is intentionally lightweight:

- React
- TypeScript
- Vite
- Tailwind CSS
- pnpm

## Prerequisites

To run the app locally you need:

- Node.js 22
- `corepack` enabled so pnpm is available

If you already have Node.js installed, enable pnpm with:

```bash
corepack enable
```

## Local Setup

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Vite will print the local URL in the terminal. By default it will usually be:

```text
http://localhost:5173
```

## Available Commands

Run the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Run ESLint:

```bash
pnpm lint
```

Preview the production build locally:

```bash
pnpm preview
```

## Dev Container

This project includes a `.devcontainer` configuration for a consistent setup in editors that support Development Containers.

Container workflow:

1. Open the repository in your editor.
2. Reopen the project in the container when prompted.
3. Wait for the container to finish `pnpm install`.
4. Start the app with `pnpm dev`.

The container forwards port `5173`, so the Vite app should be available from the editor's forwarded port view.

## App Structure

Key areas in the project:

- `src/pages` for route-level pages
- `src/components` for shared UI pieces
- `src/data` for starter task and guide data
- `src/content/guides` for markdown-based guide content

## Notes For Students

- Styling should stay in Tailwind utility classes.
- CSS files should only be used for Tailwind imports and entry styles.
- The app is meant to be extended, not treated as a finished product.
