# Agent Guidelines for Pistons Tracker

## Build/Lint/Test Commands
- **Client dev**: `cd client && npm run dev` (Vite dev server)
- **Client build**: `cd client && npm run build`
- **Client preview**: `cd client && npm run preview`
- **Server**: `cd server && npm start`
- **No tests configured** - tests are placeholders

## Code Style & Conventions
- **Module system**: ES modules (`type: "module"`) for server/functions; use `import/export` syntax
- **Formatting**: Prettier with Tailwind plugin (empty config, uses defaults)
- **React**: Functional components with hooks, React Query for data fetching
- **Imports**: Group by external libs, then internal components/api, alphabetize when practical
- **Naming**: camelCase for functions/variables, PascalCase for components, sanitize Firebase keys (no `.#$/[]`)
- **Error handling**: Always log errors with `console.error()`, return null/default on failures, never crash silently
- **Async**: Use async/await, add timeouts to external requests (10s for scraping, 5s for APIs)
- **Comments**: Explain non-obvious logic, especially scraping/data transformations

## Architecture Notes
- Vite + React + Tailwind + Firebase Realtime Database
- Server scrapes NBA.com roster page (parses __NEXT_DATA__ JSON), uses Azure/Bing for news
- Player data includes: name, number, position, height, weight, age, stats, headshot images
- Netlify Functions handle scheduled background updates
- No TypeScript - plain JavaScript with JSX for React components
- No external APIs for roster data - direct NBA.com scraping avoids rate limiting
