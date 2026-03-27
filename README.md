# Hunger Station Gh Backend

A production-ready backend for Hunger Station Gh food delivery service.

## Features

- User authentication (JWT)
- Food management with image uploads
- Order management
- Payment integration (Paystack)
- Review system
- Email notifications
- Admin dashboard

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (images)
- Paystack (payments)
- Nodemailer (emails)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Start MongoDB
5. Run the server: `npm start` or `npm run dev` for development

## Environment Variables

- PORT: Server port
- MONGO_URI: MongoDB connection string
- JWT_SECRET: JWT secret key
- PAYSTACK_SECRET_KEY: Paystack secret key
- PAYSTACK_PUBLIC_KEY: Paystack public key
- CLOUDINARY_NAME: Cloudinary cloud name
- CLOUDINARY_KEY: Cloudinary API key
- CLOUDINARY_SECRET: Cloudinary API secret
- EMAIL_USER: Email for sending notifications
- EMAIL_PASS: Email password

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Foods
- GET /api/foods
- GET /api/foods/:id
- POST /api/foods (admin)
- PUT /api/foods/:id (admin)
- DELETE /api/foods/:id (admin)

### Orders
- POST /api/orders
- GET /api/orders/my
- GET /api/orders (admin)
- PUT /api/orders/:id/status (admin)

### Reviews
- GET /api/reviews
- POST /api/reviews

### Payments
- POST /api/payments/initialize
- POST /api/payments/verify
- POST /api/payments/webhook

### Admin
- GET /api/admin/stats

## Running Locally

1. Ensure MongoDB is running
2. `npm install`
3. `cp .env.example .env` and configure
4. `npm run dev`
