# Marketa

A modern full-stack marketplace — buy, sell, and book anything, anywhere.

## Stack

- **Web** — Next.js 14 (App Router), TypeScript, Tailwind CSS
- **API** — Node.js, Express, Prisma ORM, PostgreSQL, Socket.io, Stripe
- **Mobile** — React Native, Expo, Expo Router

## Features

- Browse and search listings with category and price filters
- Post items with multi-image upload
- Real-time chat between buyers and sellers
- Booking and scheduling system
- Stripe payments with buyer protection
- Verified reviews tied to real transactions
- User dashboard and admin panel
- iOS and Android mobile app

## Getting started

```bash
# Web app
cd marketplace && npm install && npm run dev

# API
cd marketplace-api && cp .env.example .env && npm install
npx prisma migrate dev && npm run dev

# Mobile
cd marketplace-mobile && npm install && npx expo start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup.
