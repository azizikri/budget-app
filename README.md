# Budget App – Modern React, TypeScript, Vite

This project is a modern, accessible, and high-performance budgeting app built with:

- React 19
- TypeScript 5.7+
- Vite 6
- Mantine 7
- Zustand 5

## Features

- Strict TypeScript and ESLint configuration
- Accessibility-first UI (ARIA, alt text, keyboard navigation)
- Performance profiling and bundle analysis
- Modern state management with Zustand
- Custom theming with Mantine
- Automated linting, testing, and accessibility checks

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Type-check and build for production
- `npm run lint` – Run ESLint with type-aware and accessibility rules
- `npm run preview` – Preview production build
- `npm run analyze` – Build and open bundle analysis (see `stats.html`)
- `npm run test` – Run tests (add your test runner)
- `npm run a11y` – Run accessibility checks (add your a11y runner)

## Accessibility

- All interactive elements use ARIA roles and labels.
- All images and avatars must have descriptive `alt` text.
- Keyboard navigation is supported throughout the app.
- Use `eslint-plugin-jsx-a11y` and Mantine accessibility patterns.
- Test with screen readers and automated tools.

## Testing

- Add and maintain unit/integration tests for all critical logic and UI.
- Ensure accessibility tests are included in CI.
- Use your preferred test runner (e.g., Vitest, Jest).

## Performance

- Bundle analysis is available via `npm run analyze` (see `stats.html`).
- Code splitting and lazy loading are used for optimal performance.
- Profile and optimize as needed.

## Configuration

- TypeScript: strict mode, modern module syntax, ESNext target.
- ESLint: type-aware, accessibility, React, Mantine plugins.
- Vite: modern config, bundle analyzer, code splitting.

## Contributing

- Follow accessibility and testing best practices.
- Ensure all code passes lint, type, and a11y checks before PRs.

---
