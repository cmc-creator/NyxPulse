<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

NyxPulse is a single Next.js 16 (App Router, Turbopack, React 19) marketing + LMS site for health & safety training. There is no separate backend; API routes under `src/app/api/**` are the backend. Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`); there is no test script or test framework in this repo.

- Run the app in development with `npm run dev` (serves on `http://localhost:3000`). Note: the Next.js middleware lives in `src/proxy.ts` (Next.js 16 renamed `middleware` → `proxy`), and it shows up as "Proxy (Middleware)" in build output.
- Auth is Clerk (`@clerk/nextjs`). No Clerk keys are required for local dev: it auto-runs in "keyless mode" and provisions a temporary dev instance on first request (a claim URL is printed to the dev log). `/dashboard*` and `/api/stripe/portal*` are protected and redirect unauthenticated users to `/sign-in`.
- Optional integrations degrade gracefully when their env vars are unset: Stripe checkout/portal/webhook, and SMTP email (nodemailer) simply skip/soft-fail in dev. Relevant env vars (all optional for dev): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_URL`, `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/`SMTP_PASS`/`SMTP_FROM_EMAIL`, `CONTACT_INBOX_EMAIL`, `CONTACT_LEADS_TOKEN`, `SMTP_TEST_TOKEN`. Contact-form leads are appended to `.data/contact-leads.ndjson` (do not commit this file).
- `npm run lint` currently reports pre-existing errors/warnings in application code; that is expected and unrelated to environment setup.
- Gotcha for `npm run build` only (not dev): `src/lib/stripe.ts` constructs the Stripe client at module load, and Stripe SDK v21 throws `Neither apiKey nor config.authenticator provided` during page-data collection if `STRIPE_SECRET_KEY` is empty. To run a production build, provide any non-empty value, e.g. `STRIPE_SECRET_KEY=sk_test_placeholder npm run build`. `npm run dev` does not need this.
