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
- SMTP vars for cert/invite emails
- `NYXPULSE_INSTRUCTOR_EMAILS` and/or `NYXPULSE_INSTRUCTOR_PIN`

After setting vars, redeploy. Check `GET /api/health` for `launchReady` (Firebase client + Admin present).

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
