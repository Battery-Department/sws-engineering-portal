# South West Steam Engineering Portal

A comprehensive engineering project management system for South West Steam Engineering Ltd, specializing in heritage steam locomotive restoration, CAD design services, and bespoke engineering solutions.

## 🚂 Overview

This portal provides a complete business management solution with separate interfaces for engineering teams and customers, featuring project tracking, document generation, material cost management, and real-time communication.

## ✨ Key Features

### Engineering Portal (`/portal`)
- **Project Management** - Track projects from enquiry to completion
- **Client Management** - Comprehensive CRM system
- **Financial Overview** - Revenue tracking and cost analysis
- **Material Cost Calculator** - Real-time pricing and supplier invoice management
- **Document Generation** - Professional invoices, reports, and certificates

### Customer Portal (`/customer`)
- **Document Access** - View and download project documents
- **Project Tracking** - Monitor project progress in real-time
- **Secure Messaging** - Direct communication with engineering team
- **Account Management** - Profile and preference settings

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with TypeScript
- **Database**: Prisma ORM (PostgreSQL/SQLite)
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based authentication
- **File Storage**: Vercel Blob
- **Real-time**: Socket.IO for live updates
- **Email**: Nodemailer for notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL (for production) or SQLite (for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/josephhawkins/sws-engineering-portal.git
cd sws-engineering-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/swse_db"
JWT_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

Visit:
- Engineering Portal: http://localhost:3000/portal
- Customer Portal: http://localhost:3000/customer

## 📁 Project Structure

```
src/
├── app/
│   ├── portal/          # Engineering portal pages
│   ├── customer/        # Customer portal pages
│   └── api/            # API routes
├── components/
│   └── documents/      # Document templates
├── lib/                # Utilities and services
├── config/             # Configuration files
└── prisma/             # Database schema
```

## 🔧 Key Integrations

### Document Generation System
- Professional PDF generation for invoices, reports, and certificates
- Email delivery with customizable templates
- Automated document triggers based on project events

### Material Cost Management
- Real-time material pricing database
- Supplier invoice upload and parsing
- Integration with project cost tracking

### Real-time Synchronization
- WebSocket-based updates between portals
- Instant document availability notifications
- Live project status updates

## 🚢 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 Features Implemented

- ✅ Phase 1: Core Dashboard & Navigation
- ✅ Phase 2: Project Management System
- ✅ Phase 3: Client Management (CRM)
- ✅ Phase 4: Financial Tracking
- ✅ Phase 5: Advanced Project Features
- ✅ Phase 6: Material Cost Management
- ✅ Document Generation & Email System
- ✅ Real-time Portal Synchronization

## 🔐 Security

- JWT-based authentication
- Role-based access control
- Secure document access
- Environment variable protection
- Input validation and sanitization

## 📝 Documentation

- [Project Context](./SWSE_PROJECT_CONTEXT.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Document System Guide](./DOCUMENT_SYSTEM_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_STATUS.md)

## 🤝 Contributing

This is a private repository for South West Steam Engineering Ltd. For access or contributions, please contact the development team.

## 📄 License

Proprietary - South West Steam Engineering Ltd. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: enquiries@swsteamengineering.co.uk
- Phone: +44 1209 123456

---

**South West Steam Engineering Ltd**  
*Heritage Steam Locomotive Specialists*  
Cornwall, England