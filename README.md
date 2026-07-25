# NyxPulse

Emergency and safety training platform for healthcare teams — CPR/AED, BLS, de-escalation, emergency management, ICS/HICS, and OSHA.

## Stack

- Next.js 16 (App Router) + React 19
- Clerk authentication
- Firebase Firestore (progress, certificates, contact leads) via Admin SDK
- Stripe Checkout (one-time course purchases)
- Nodemailer SMTP for transactional email
- Tailwind CSS 4

## Local setup

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in Clerk, Stripe, SMTP, and Firebase Admin values.
3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel environment variables (required after creating/recreating the project)

Deleting a Vercel project wipes env vars. Re-add these before the site will fully work:

**Required for the site to authenticate (without these, pages used to 500):**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**Strongly recommended:**
- `NEXT_PUBLIC_URL` = your production URL (e.g. `https://nyx-pulse.vercel.app` or custom domain)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `FIREBASE_SERVICE_ACCOUNT_JSON` (or the three `FIREBASE_*` vars)

**Email + instructor (for cert emails, invites, skill sign-off):**
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM_EMAIL`
- `NYXPULSE_INSTRUCTOR_EMAILS` and/or `NYXPULSE_INSTRUCTOR_PIN`
- `REFRESHERS_CRON_TOKEN` (for `POST /api/refreshers/notify`)

**Optional:** `NEXT_PUBLIC_FIREBASE_*` web config

After setting vars, redeploy. Check `GET /api/health` — it returns `launchReady`, `emailReady`, `instructorReady`, and `missingForLaunch` (booleans only; no secret values).

### Launch checklist

1. Clerk keys live + sign-in works
2. Stripe secret + webhook (`checkout.session.completed`) → enrollments land in Clerk
3. `FIREBASE_SERVICE_ACCOUNT_JSON` set → progress/certs/passport/verify persist
4. SMTP set → completion + invite + refresher emails send
5. Instructor emails/PIN set → `/dashboard/instructor` sign-offs work
6. Smoke: enroll → pass gates → claim cert → passport share → book skills session → team invite

## Important product flows

- **Purchase:** signed-in user → Stripe Checkout → webhook/session reconcile → Clerk `publicMetadata.courses`
- **Billing portal:** requires `privateMetadata.stripeCustomerId` (created at checkout)
- **Progress / certificates / leads:** stored in Firestore when Firebase Admin env vars are set; otherwise falls back to Clerk metadata / local `.data` file
- **Certificate verify:** `/verify/[certId]` (requires Firestore)
- **Certificates claim:** `/api/courses/complete` only succeeds when all topics are complete

## Firebase setup

1. In Firebase Console for project `nyxpulse`, create a **Firestore** database (production mode).
2. Deploy or paste the locked-down rules from `firestore.rules` (deny all client access; server uses Admin SDK).
3. Project settings → Service accounts → **Generate new private key**.
4. Put credentials in `.env.local` / Vercel using either:
   - `FIREBASE_SERVICE_ACCOUNT_JSON` = the full service-account JSON as one line, **or**
   - `FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` (`\n` escaped)
5. Optional: copy the web app config into the `NEXT_PUBLIC_FIREBASE_*` vars for Analytics later.
6. Never commit the service-account JSON file to git.

## Stripe webhook

Point Stripe to:

```text
POST /api/stripe/webhook
```

Events needed: `checkout.session.completed`.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint

## Notes

- Contact leads go to Firestore when Firebase Admin is configured; otherwise `.data/contact-leads.ndjson` (local/dev only).
- Team Portal supports roster invites, role packs, and course assignment (sandbox enable available for demos).
- Skills sessions are request-based via `/dashboard/sessions` (routes to contact/leads + email).
- Analytics UI stays light until real aggregate metrics exist.
- HIPAA language describes readiness for covered deployments — do not submit clinical PHI without an active BAA engagement.
