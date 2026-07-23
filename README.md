# NyxPulse

Emergency and safety training platform for healthcare teams — CPR/AED, BLS, de-escalation, emergency management, ICS/HICS, and OSHA.

## Stack

- Next.js 16 (App Router) + React 19
- Clerk authentication
- Stripe Checkout (one-time course and learning-path purchases)
- Nodemailer SMTP for transactional email
- Tailwind CSS 4

## Local setup

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in Clerk, Stripe, and SMTP values.
3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Important product flows

- **Purchase:** signed-in user → Stripe Checkout → webhook/session reconcile → Clerk `publicMetadata.courses`
- **Billing portal:** requires `privateMetadata.stripeCustomerId` (created at checkout)
- **Progress:** saved server-side in `privateMetadata.courseProgress`
- **Certificates:** `/api/courses/complete` only succeeds when all topics are complete

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

- Contact leads are stored in `.data/contact-leads.ndjson` by default (fine for local/dev; use durable storage in production).
- Team Portal / live session scheduling are sales-assisted; analytics UI is hidden until real data exists.
- HIPAA language describes readiness for covered deployments — do not submit clinical PHI without an active BAA engagement.
