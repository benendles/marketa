# Marketa – Technical Documentation

## Project Structure

```
portfolio/
├── marketplace/              # Next.js 14 Web App
│   ├── app/
│   │   ├── layout.tsx        # Root layout (Navbar + Footer)
│   │   ├── page.tsx          # Landing page
│   │   ├── auth/
│   │   │   ├── login/        # Login page
│   │   │   └── register/     # Multi-step registration
│   │   ├── marketplace/      # Browse listings with filters
│   │   ├── listings/
│   │   │   ├── [id]/         # Listing detail + booking form
│   │   │   └── create/       # Create new listing
│   │   ├── dashboard/        # User dashboard
│   │   │   ├── layout.tsx    # Sidebar layout
│   │   │   ├── page.tsx      # Overview + stats
│   │   │   ├── bookings/     # Booking management
│   │   │   ├── messages/     # Real-time chat UI
│   │   │   └── listings/     # My listings management
│   │   └── admin/            # Admin panel
│   │       ├── layout.tsx    # Dark sidebar layout
│   │       ├── page.tsx      # KPIs + charts + tables
│   │       ├── users/        # User management + bulk actions
│   │       └── listings/     # Listing moderation
│   ├── components/
│   │   ├── layout/           # Navbar, Footer
│   │   ├── marketplace/      # ListingCard
│   │   └── ui/               # Button, Badge (reusable)
│   ├── lib/
│   │   ├── utils.ts          # cn(), formatCurrency(), etc.
│   │   └── mock-data.ts      # Demo data (replace with API calls)
│   └── types/index.ts        # Shared TypeScript types
│
├── marketplace-api/          # Node.js + Express + PostgreSQL API
│   ├── prisma/
│   │   └── schema.prisma     # Full database schema
│   └── src/
│       ├── index.ts          # Express app + Socket.io setup
│       ├── middleware/
│       │   └── auth.ts       # JWT authenticate + requireAdmin
│       └── routes/
│           ├── auth.ts       # Register, Login, Refresh
│           ├── listings.ts   # CRUD + search/filter
│           ├── bookings.ts   # Create, status updates
│           ├── users.ts      # Public profiles, edit own
│           ├── messages.ts   # Conversations + send
│           ├── payments.ts   # Stripe intents + webhooks
│           ├── notifications.ts
│           └── admin.ts      # Stats, user/listing management
│
└── marketplace-mobile/       # React Native + Expo mobile app
    └── app/
        ├── _layout.tsx       # Root layout (safe area, gestures)
        └── (tabs)/
            ├── _layout.tsx   # Tab bar with icons + badges
            ├── index.tsx     # Home: banner, categories, featured
            ├── marketplace.tsx # Browse with grid view + filters
            ├── create.tsx    # 3-step listing creation
            ├── messages.tsx  # Conversation list
            └── profile.tsx   # User profile + menu
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login, returns JWT |
| POST | `/api/auth/refresh` | — | Refresh JWT |

### Listings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/listings` | — | Browse (query, category, price, sort) |
| GET | `/api/listings/:id` | — | Get single listing (increments views) |
| POST | `/api/listings` | ✅ | Create listing |
| PATCH | `/api/listings/:id` | ✅ Owner | Update listing |
| DELETE | `/api/listings/:id` | ✅ Owner | Delete listing |

### Bookings
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/bookings/mine` | ✅ | My bookings (buyer + seller) |
| POST | `/api/bookings` | ✅ | Create booking request |
| PATCH | `/api/bookings/:id/status` | ✅ | Update status (confirm/cancel/complete) |

### Messages
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/messages/conversations` | ✅ | My conversations |
| GET | `/api/messages/conversations/:id` | ✅ | Messages in conversation |
| POST | `/api/messages` | ✅ | Send message (creates conversation if needed) |

### Payments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payments/intent` | ✅ | Create Stripe payment intent |
| POST | `/api/payments/webhook` | — | Stripe webhook handler |

### Users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/users/:id` | — | Public profile |
| PATCH | `/api/users/me` | ✅ | Update own profile |

### Admin (admin role required)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Platform KPIs |
| GET | `/api/admin/users` | Paginated user list |
| PATCH | `/api/admin/users/:id/suspend` | Suspend/unsuspend user |
| PATCH | `/api/admin/listings/:id/feature` | Toggle featured |
| DELETE | `/api/admin/listings/:id` | Remove listing |

---

## Database Schema (Key Relationships)

```
User ──< Listing (seller)
User ──< Booking (buyer, seller)
Listing ──< Booking
Booking ──1 Payment
User ──< ConversationParticipant >── Conversation ──< Message
Listing ──< Review
User ──< Notification
```

---

## Real-Time Chat (Socket.io)

Events emitted by **client**:
- `join_conversation(conversationId)` — join a chat room
- `send_message({ conversationId, message })` — send a message
- `typing({ conversationId, userId })` — typing indicator

Events emitted by **server**:
- `new_message(message)` — broadcast to conversation room
- `user_typing(userId)` — typing indicator to room

---

## Authentication Flow

1. Client sends POST `/api/auth/login` with `{ email, password }`
2. Server validates credentials, returns `{ user, token }` (JWT, 7d expiry)
3. Client stores token in `localStorage` (web) or `SecureStore` (mobile)
4. All protected requests include `Authorization: Bearer <token>`
5. `authenticate` middleware verifies JWT and attaches `userId` + `userRole` to request

---

## Payment Flow (Stripe)

1. Buyer creates booking → POST `/api/bookings`
2. Buyer initiates payment → POST `/api/payments/intent` returns `clientSecret`
3. Client uses Stripe.js / React Native Stripe SDK to confirm payment
4. Stripe fires `payment_intent.succeeded` webhook
5. API creates `Payment` record and updates booking status to `CONFIRMED`
6. Seller is notified via notification + Socket.io

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Web Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Mobile | React Native, Expo, Expo Router |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| Payments | Stripe |
| Real-time | Socket.io |
| Validation | Zod |
| Web Hosting | Vercel |
| API Hosting | Railway / Render |
| Mobile Build | Expo EAS |

---

## Future Phases

- **Phase 2**: Reviews & ratings system, seller analytics dashboard, email notifications (Resend/SendGrid)
- **Phase 3**: Advanced search (Elasticsearch/Algolia), AI-powered listing suggestions, in-app video calls
- **Phase 4**: Subscription plans for sellers, promoted listings, affiliate/referral program
