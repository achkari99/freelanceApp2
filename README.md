# Resonant Studio - Freelance Showcase

A production-ready marketing and case study site for a boutique freelancing collective. Built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and MDX-powered content. The project ships with rich case studies, a filterable work index, backstage notes, multi-step intake form, analytics wiring, accessibility defaults, and automated tests.

## Live Demo

📌 Visit the live site: [https://achkari99.github.io/freelanceApp2](https://achkari99.github.io/freelanceApp2)

This repository is published at https://github.com/achkari99/freelanceApp2.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, MDX)
- **Styling**: Tailwind CSS, shadcn/ui primitives, custom tokens
- **Animation**: Framer Motion with reduced-motion fallbacks
- **Content**: MDX for projects and backstage posts (Payload CMS-ready structure)
- **Forms**: React Hook Form + Zod validation, API route with email/Slack delivery
- **Testing**: Vitest + Testing Library + jest-dom
- **Tooling**: pnpm, ESLint, Prettier, Vercel Analytics hook

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to preview. Hot reload and Tailwind JIT are enabled.

### Required Environment Variables

Copy `.env.example` to `.env.local` and provide the following when wiring production integrations:

```
NEXT_PUBLIC_SITE_URL=https://resonant.studio
START_PROJECT_EMAIL_FROM=studio@example.com
START_PROJECT_EMAIL_TO=intake@example.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-secret
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

Without SMTP/Slack values the intake endpoint safely no-ops.

## Project Structure

```
content/             MDX case studies (+2 coming soon) and backstage posts
public/              Static assets, logos, gallery art, OG image
src/app/             App Router pages, API routes, metadata, layouts
src/components/      UI primitives, layout, forms, feature components
src/data/            Services, clients, testimonials, team seed data
src/lib/             Utilities, fonts, validation schema, site config
src/types/           Shared TypeScript models
tests/               Vitest suites for content & schema integrity
```

## Key Features

- Hero, services, testimonials, CTA-heavy home page
- `/our-work` filterable grid with search, status toggles, tags, and pagination
- Rich `/work/[slug]` pages (Problem -> Approach -> Outcome, KPIs, gallery, prev/next)
- `/services`, `/about`, `/backstage`, `/contact`, `/start-a-project`, `/search`
- Accessible, responsive navigation with dark mode toggle and command-style search page
- Multi-step project brief form with Zod validation, JSON-LD, email + Slack hooks
- SEO metadata, sitemap, robots, organization & case study JSON-LD
- Optimised SVG artwork with `next/image` sizing hints to minimize CLS
- prefers-reduced-motion handling and keyboard-first focus management

## Testing & Quality

Run the test suite:

```bash
pnpm test
```

Vitest validates content ordering, filter integrity, and Zod schemas. Add component tests under `tests/` or colocate with source files as needed.

Lint & format:

```bash
pnpm lint
pnpm format
```

## Deployment

The project targets Node.js runtime (required for Nodemailer). Deploy seamlessly to Vercel:

1. Push to GitHub
2. Create a new Vercel project and import the repo
3. Set environment variables from `.env.example`
4. Enable Web Analytics if desired (`@vercel/analytics` is already wired)

## Content & CMS

Current content lives in MDX (under `content/`) for portability. The file organization mirrors a Payload CMS collection--fields map 1:1 to a case-study type. Migrating to Payload only requires swapping the loaders in `content/work` and `content/backstage` with CMS queries.

## CI Ideas

- Add a GitHub Actions workflow to run `pnpm lint` and `pnpm test`
- Gate deployments on Lighthouse budgets (>=95 mobile, CLS < 0.05)

## Accessibility & Performance Targets

- Skip link, keyboard-friendly nav, focus-visible styling
- Dark mode support via `next-themes`
- prefers-reduced-motion adjustments for animated regions
- Optimised layout primitives to respect CLS < 0.05 and Lighthouse >=95 (mobile)

## Next Steps

- Connect Payload CMS or another headless source in place of MDX
- Pipe intake form submissions into CRM/PM tooling
- Expand backstage feed with RSS or newsletter automation
- Add more automated visual regression tests for hero/work pages
