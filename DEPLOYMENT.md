# Marketa – Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        MARKETA PLATFORM                      │
├──────────────┬──────────────────┬───────────────────────────┤
│  Web App     │   Mobile App     │   Backend API              │
│  Next.js 14  │  React Native    │   Node.js + Express        │
│  Vercel      │  Expo EAS        │   Railway / Render          │
└──────────────┴──────────────────┴───────────────────────────┘
                                          │
                                  ┌───────┴────────┐
                                  │   PostgreSQL    │
                                  │ Supabase / RDS  │
                                  └────────────────┘
```

---

## 1. Database – PostgreSQL

### Option A: Supabase (Recommended for MVP)
1. Create project at https://supabase.com
2. Copy the connection string: `postgresql://...`
3. Set `DATABASE_URL` in your API environment

### Option B: Railway
1. Create a PostgreSQL plugin at https://railway.app
2. Copy the `DATABASE_URL` from the plugin dashboard

### Run Migrations
```bash
cd marketplace-api
cp .env.example .env       # Fill in values
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed            # Optional: seed demo data
```

---

## 2. Backend API – Railway / Render

### Railway (Recommended)
1. Connect your GitHub repo at https://railway.app
2. Select the `marketplace-api` folder as root directory
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables (see `.env.example`):
   - `DATABASE_URL`
   - `JWT_SECRET` (generate: `openssl rand -base64 32`)
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `CLIENT_URL` (your web app URL)
6. Railway auto-deploys on every push to `main`

### Render (Alternative)
1. New Web Service → connect repo → select `marketplace-api`
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Add same environment variables

---

## 3. Web App – Vercel

1. Import repo at https://vercel.com/new
2. Set root directory to `marketplace`
3. Framework: Next.js (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → your Railway/Render URL
   - `NEXT_PUBLIC_STRIPE_PK` → Stripe publishable key
5. Deploy — Vercel handles CI/CD automatically

---

## 4. Mobile App – Expo EAS

### Install EAS CLI
```bash
npm install -g eas-cli
eas login
```

### Configure
```bash
cd marketplace-mobile
npm install
eas build:configure
```

### Build for iOS & Android
```bash
# Development build
eas build --platform all --profile development

# Production build
eas build --platform all --profile production
```

### Submit to Stores
```bash
eas submit --platform ios      # App Store
eas submit --platform android  # Google Play
```

---

## 5. Stripe Setup

1. Create account at https://stripe.com
2. Copy **Secret Key** → `STRIPE_SECRET_KEY` in API `.env`
3. Copy **Publishable Key** → `NEXT_PUBLIC_STRIPE_PK` in web `.env`
4. Configure webhook:
   - URL: `https://your-api-url/api/payments/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`

---

## 6. Push Notifications (Mobile)

Using Expo Notifications + backend broadcasting:

```bash
# In marketplace-mobile
npx expo install expo-notifications expo-device
```

Store the Expo push token in the backend `User` model and use the Expo Push API to send notifications on events (new booking, new message, etc.).

---

## 7. Environment Variables Reference

### Backend (`marketplace-api/.env`)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret for signing JWTs (min 32 chars) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `CLIENT_URL` | Frontend URL for CORS |
| `PORT` | Server port (default 4000) |

### Web (`marketplace/.env.local`)
| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_STRIPE_PK` | Stripe publishable key |

---

## 8. Security Checklist

- [ ] `JWT_SECRET` is at least 32 random bytes, not committed to git
- [ ] `.env` files are in `.gitignore`
- [ ] Stripe webhook signature verification is active
- [ ] Rate limiting enabled on all API routes (`express-rate-limit`)
- [ ] Helmet middleware active for HTTP security headers
- [ ] CORS configured to allow only your frontend origin
- [ ] PostgreSQL connection uses SSL in production
- [ ] `isSuspended` check on login
- [ ] Admin routes protected by `requireAdmin` middleware
- [ ] Input validation with Zod on all POST/PATCH endpoints
- [ ] Images stored in cloud storage (Cloudinary/S3), not on server

---

## 9. Scaling Notes

- **Horizontal scaling**: API is stateless (JWT auth) — scale replicas freely
- **Database pooling**: Use PgBouncer or Supabase connection pooling at scale
- **File uploads**: Use Cloudinary or AWS S3 + pre-signed URLs
- **Real-time**: Socket.io works with sticky sessions; for multi-server use Redis adapter (`@socket.io/redis-adapter`)
- **CDN**: Vercel handles CDN for the web app automatically
