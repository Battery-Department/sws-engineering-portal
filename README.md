# Battery Department E-Commerce Portal

A modern B2B e-commerce portal for battery management, built with Next.js 15, TypeScript, and the Vercel design system.

## Live Demo

🚀 **[View Live Demo](https://battery-dashboard-q8nh611au-battery-departments-projects.vercel.app)**

### Demo Credentials
- **Email**: demo@example.com
- **Password**: demo123

## Features

- 🔋 **Battery Management**: Track inventory, orders, and subscriptions
- 💳 **Billing System**: Manage invoices, payments, and financial data
- 📊 **Analytics Dashboard**: Real-time metrics and reporting
- 🎨 **Modern UI**: Vercel design system with dark mode support
- 🔒 **Authentication**: Secure JWT-based authentication
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Vercel design system
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Authentication**: JWT with HTTP-only cookies
- **UI Components**: Radix UI + Custom components

## Key Pages

- `/portal/dashboard` - Main dashboard with metrics
- `/portal/orders` - Order management
- `/portal/billing` - Billing and payment management
- `/portal/auth/login` - Login page

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Design System

The application uses the Vercel design system with:
- Clean, modern UI components
- Consistent spacing and typography
- Dark mode support
- Responsive layouts
- Smooth animations

## Known Issues

- Initial page load may show a dark background briefly
- Database is using SQLite for quick deployment (upgrade to PostgreSQL for production)

## Deployment

Deployed on Vercel. For production use, upgrade to PostgreSQL database.

## License

MIT License