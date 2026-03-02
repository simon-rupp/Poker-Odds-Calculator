# Poker Odds Calculator

Heads-up Texas Hold'em odds calculator built with React and Vite.

## Features

- Fast click-order input: cards fill Hand 1, Hand 2, then Board in sequence.
- Select two hole cards for each player and up to five board cards.
- Calculates win percentages when the board has 0, 3, 4, or 5 cards.
- Uses full card images for quick visual input.

## Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

To run on a specific port (for example `3001`):

```bash
npm run dev -- --port 3001
```

`npm start` is an alias for `npm run dev`.

## Scripts

- `npm run dev`: start local dev server
- `npm run build`: production build into `dist/`
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint
- `npm run deploy`: publish `dist/` to GitHub Pages

## Deployment Notes

- Static assets live in `public/` and are copied into `dist/` during build.
- `public/CNAME` is preserved during deploy for the custom domain.
