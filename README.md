# EpyxDerma

Premium dermatology hospital website built with Next.js and TypeScript. The public experience is production-ready, while the codebase now includes a working admin area for clients, campaign drafts, media uploads, and WhatsApp dispatch integration.

## Scripts

- `npm run dev` starts the local web app.
- `npm run build` creates the production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run db:init` creates MongoDB collections and indexes for the admin layer.

## Environment

Copy `.env.example` to `.env.local` and adjust values for your environment.

Important admin defaults requested for this project:

- `ADMIN_USERNAME=epyxdermaadmin`
- `ADMIN_PASSWORD=Epyx@test`

For real WhatsApp sending through Meta WhatsApp Cloud API, also set:

- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_API_VERSION`

## MongoDB

You can run MongoDB either locally or through Docker:

```bash
docker compose up -d mongodb
```

After MongoDB is available:

```bash
npm run db:init
```

## Project Shape

- `src/app`: App Router pages, admin UI routes, API routes, and SEO
- `src/components`: reusable UI and admin building blocks
- `src/content`: brand and page content adapted from the current dermatology practice
- `src/lib`: environment, metadata, Mongo, auth, admin repositories, and WhatsApp service helpers
- `scripts`: local tooling like MongoDB bootstrap
