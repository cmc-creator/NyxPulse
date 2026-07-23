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
- Team Portal / live session scheduling are sales-assisted; analytics UI is hidden until real data exists.
- HIPAA language describes readiness for covered deployments — do not submit clinical PHI without an active BAA engagement.
