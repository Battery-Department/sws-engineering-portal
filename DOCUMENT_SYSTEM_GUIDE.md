# SWS Document Generation System - Complete Guide

## Overview

The South West Steam Engineering document generation system provides a comprehensive solution for creating, managing, and distributing professional documents including invoices, project reports, and certificates. The system features real-time synchronization between the engineering portal and customer portal, automated email delivery, and PDF generation capabilities.

## Key Features

### 1. Document Types Supported
- **Invoices** - Professional invoices with line items, VAT calculations, and payment terms
- **Project Reports** - Comprehensive progress reports with quality assurance sections
- **Certificates** - Completion certificates with compliance standards and digital verification
- **Quotes** - Project quotations (uses invoice template)

### 2. Core Capabilities
- ✅ PDF generation from React templates
- ✅ Automated email delivery with professional templates
- ✅ Real-time sync between portals via WebSocket
- ✅ Vercel Blob storage integration
- ✅ Document automation triggers
- ✅ Customer portal access with filtering
- ✅ Digital verification system
- ✅ Mobile-responsive document viewer

## Architecture

### Database Schema
```prisma
model DocumentGeneration {
  id            String   @id @default(uuid())
  documentId    String
  documentType  String   
  documentNumber String  @unique
  templateData  String   // JSON data
  status        String   @default("pending")
  generatedBy   String?
  autoSend      Boolean  @default(false)
  recipientEmail String?
  emailSent     Boolean  @default(false)
  emailSentAt   DateTime?
  fileUrl       String?
  generatedAt   DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  document      Document @relation(fields: [documentId], references: [id])
}
```

### File Structure
```
src/
├── components/documents/
│   ├── SWSInvoice.tsx         # Invoice template
│   ├── SWSProjectReport.tsx   # Report template
│   ├── SWSCertificate.tsx     # Certificate template
│   └── DocumentViewer.tsx     # Document preview component
├── lib/
│   ├── pdfGenerator.ts        # PDF generation service
│   ├── emailService.ts        # Email delivery service
│   ├── documentAutomation.ts  # Automation triggers
│   └── realtimeSync.ts        # WebSocket sync service
├── hooks/
│   └── useDocumentSync.ts     # React hook for real-time updates
└── app/api/
    ├── documents/
    │   ├── generate/route.ts   # Document generation endpoint
    │   └── [id]/
    │       └── download/route.ts # Download endpoint
    └── customer/
        └── documents/route.ts  # Customer document access
```

## Implementation Guide

### 1. Environment Setup

Add the following to your `.env` file:

```env
# Email Service
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_FROM="noreply@swsteamengineering.co.uk"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# WebSocket
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3001"
```

### 2. Generate Documents Programmatically

```typescript
// Generate an invoice
const response = await fetch('/api/documents/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    documentType: 'invoice',
    projectId: 'project-id',
    templateData: {
      client: {
        name: 'Client Name',
        address: ['123 Street', 'City, County', 'Postcode'],
        email: 'client@email.com',
        phone: '+44 1234 567890'
      },
      items: [
        {
          description: 'Engineering Services',
          quantity: 40,
          unit: 'hours',
          unitPrice: 85,
          totalPrice: 3400
        }
      ],
      terms: {
        paymentTerms: '30 days',
        warranty: '12 months',
        notes: 'Thank you for your business'
      }
    },
    autoSend: true,
    recipientEmail: 'client@email.com'
  })
})
```

### 3. Document Automation

The system automatically generates documents based on project events:

```typescript
// Trigger rules configured in documentAutomation.ts
const AUTOMATION_RULES = [
  {
    trigger: 'stage_complete',
    documentType: 'project_report',
    conditions: { stageId: 'manufacturing' },
    autoSend: true,
    recipientType: 'client'
  },
  {
    trigger: 'project_complete',
    documentType: 'certificate',
    conditions: { projectStatus: 'completed' },
    autoSend: true,
    recipientType: 'client'
  }
]

// Trigger document generation
await documentTriggers.onStageComplete(projectId, 'manufacturing')
await documentTriggers.onProjectComplete(projectId)
```

### 4. Real-time Sync in Customer Portal

```typescript
// Use the document sync hook in your React component
import { useCustomerDocuments } from '@/hooks/useDocumentSync'

export function CustomerDocumentsPage() {
  const { documents, loading, notifications } = useCustomerDocuments(userId)
  
  // Documents automatically refresh when new ones are generated
  // Notifications appear for new documents
  
  return (
    <div>
      {notifications.map(notif => (
        <Alert key={notif.id}>{notif.message}</Alert>
      ))}
      {documents.map(doc => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  )
}
```

### 5. Portal Integration

#### Engineering Portal - Generate Documents
Navigate to `/portal/projects/[id]/documents` to:
- View all project documents
- Generate new documents manually
- Filter by document type
- Download or preview documents

#### Customer Portal - Access Documents
Navigate to `/customer/documents` to:
- View all available documents
- Filter by type or project
- Download documents
- Receive real-time updates

## API Reference

### POST /api/documents/generate
Generate a new document

**Request Body:**
```json
{
  "documentType": "invoice|project_report|certificate|quote",
  "projectId": "string",
  "templateData": {
    // Document-specific data
  },
  "autoSend": true,
  "recipientEmail": "email@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "documentId": "string",
    "documentNumber": "INV-2024-0001",
    "fileUrl": "https://blob.vercel.com/...",
    "downloadUrl": "/api/documents/{id}/download"
  }
}
```

### GET /api/customer/documents
Get documents for the logged-in customer

**Query Parameters:**
- `projectId` - Filter by project
- `fileType` - Filter by document type
- `limit` - Number of documents
- `offset` - Pagination offset

### GET /api/documents/{id}/download
Download a specific document

## Testing the System

### 1. Manual Document Generation
1. Navigate to a project detail page
2. Click on "Documents" tab
3. Click "Generate Document"
4. Select document type
5. Verify document appears in list

### 2. Test Email Delivery
1. Ensure email credentials are configured
2. Generate a document with `autoSend: true`
3. Check recipient email for delivery

### 3. Test Real-time Sync
1. Open engineering portal in one browser
2. Open customer portal in another browser
3. Generate a document in engineering portal
4. Verify it appears instantly in customer portal

### 4. Test Automation
1. Update a project stage to "completed"
2. Verify automatic document generation
3. Check email delivery if configured

## Troubleshooting

### PDF Generation Issues
- Ensure `jspdf` and `html2canvas` are installed
- Check console for rendering errors
- Verify template data structure

### Email Not Sending
- Verify email credentials in .env
- Check email service logs
- Ensure recipient email is valid
- For Gmail, use app-specific password

### Real-time Sync Not Working
- Check WebSocket connection in browser console
- Verify NEXT_PUBLIC_WEBSOCKET_URL is set
- Ensure Socket.IO server is running
- Check network tab for WebSocket frames

### Documents Not Appearing in Customer Portal
- Verify document has `isPublic: true` or has generation record
- Check customer ID matches project client
- Verify API endpoint permissions

## Future Enhancements

1. **QuickBooks Integration** (Pending)
   - Automatic invoice sync
   - Payment tracking
   - Financial reporting

2. **Advanced Features**
   - Document versioning
   - Electronic signatures
   - Custom templates
   - Batch document generation
   - Document expiry dates

3. **Analytics**
   - Document view tracking
   - Download analytics
   - Email open rates
   - Customer engagement metrics

## Security Considerations

- All documents are access-controlled
- Customer portal only shows public documents
- Download URLs can be time-limited
- Email delivery uses secure SMTP
- Template data is sanitized before rendering
- WebSocket connections are authenticated

## Support

For issues or questions:
- Check the console for error messages
- Review API response codes
- Verify environment configuration
- Contact technical support with error details