# NyxPulse

Emergency and safety training platform for healthcare teams — CPR/AED, BLS, de-escalation, emergency management, ICS/HICS, and OSHA.

## Stack

- Next.js 16 (App Router) + React 19
- **Firebase Authentication** (email/password + session cookies)
- Firebase Firestore (profiles, progress, certificates, leads) via Admin SDK
- Stripe Checkout (one-time course purchases)
- Nodemailer SMTP for transactional email
- Tailwind CSS 4

## Local setup

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in Firebase (client + Admin), Stripe, and SMTP values.
3. In Firebase Console → Authentication → Sign-in method, enable **Email/Password**.
4. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel environment variables

**Required for auth + learner data:**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT_JSON` (or the three `FIREBASE_*` Admin vars)

**Strongly recommended:**
- `NEXT_PUBLIC_URL` = `https://www.nyxpulse.com`
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

### Auth notes

- Sign-in/up uses Firebase Auth in the browser, then `POST /api/auth/session` creates an httpOnly session cookie verified by Firebase Admin.
- Enrollment, plan, org roster, and Stripe customer id live on the Firestore `learners/{uid}` profile document (not Clerk).

## Important product flows

- **Purchase:** signed-in user → Stripe Checkout → webhook → enroll into Firestore profile `courses`
- **Billing portal:** requires `stripeCustomerId` on the learner profile
- **Progress / certificates / leads:** Firestore via Admin SDK
- **Certificate verify:** `/verify/[certId]`
- **Certificates claim:** `/api/courses/complete` when topics + Advantage Gates are complete

## Stripe webhook

```text
POST https://www.nyxpulse.com/api/stripe/webhook
```

Event: `checkout.session.completed`.

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
