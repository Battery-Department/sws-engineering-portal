import nodemailer from 'nodemailer'
import { PDFGenerator } from './pdfGenerator'

interface EmailOptions {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    path?: string
    content?: Buffer | string
  }>
}

interface DocumentEmailOptions {
  recipientEmail: string
  documentType: 'invoice' | 'project_report' | 'certificate' | 'quote'
  documentNumber: string
  projectName: string
  templateData: any
  pdfUrl?: string
}

export class EmailService {
  private static transporter: nodemailer.Transporter | null = null
  
  // Initialize email transporter
  private static getTransporter() {
    if (!this.transporter) {
      // Use environment variables for email configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
    }
    return this.transporter
  }
  
  // Send generic email
  static async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const transporter = this.getTransporter()
      
      const mailOptions = {
        from: {
          name: 'South West Steam Engineering',
          address: process.env.EMAIL_FROM || 'noreply@swsteamengineering.co.uk'
        },
        to: options.to,
        subject: options.subject,
        html: options.html,
        attachments: options.attachments
      }
      
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent:', info.messageId)
      
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }
  
  // Send document email with specific templates
  static async sendDocumentEmail(options: DocumentEmailOptions): Promise<boolean> {
    try {
      const emailContent = this.generateDocumentEmailContent(options)
      
      // Prepare attachments if PDF URL is provided
      const attachments = []
      if (options.pdfUrl) {
        attachments.push({
          filename: `${options.documentNumber}.pdf`,
          path: options.pdfUrl
        })
      }
      
      return await this.sendEmail({
        to: options.recipientEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        attachments
      })
      
    } catch (error) {
      console.error('Error sending document email:', error)
      return false
    }
  }
  
  // Generate email content based on document type
  private static generateDocumentEmailContent(options: DocumentEmailOptions) {
    const { documentType, documentNumber, projectName } = options
    
    const baseTemplate = (content: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(to right, #006FEE, #0050B3);
            color: white;
            padding: 32px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 800;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 16px;
            opacity: 0.9;
          }
          .content {
            padding: 32px;
          }
          .content h2 {
            color: #374151;
            font-size: 20px;
            margin-bottom: 16px;
          }
          .content p {
            color: #4b5563;
            margin-bottom: 16px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #006FEE;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 16px;
          }
          .button:hover {
            background-color: #0050B3;
          }
          .info-box {
            background-color: #f3f4f6;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 16px;
            margin: 24px 0;
          }
          .info-box h3 {
            margin: 0 0 8px;
            color: #374151;
            font-size: 16px;
          }
          .info-box p {
            margin: 4px 0;
            font-size: 14px;
          }
          .footer {
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            padding: 24px 32px;
            text-align: center;
            font-size: 14px;
            color: #6b7280;
          }
          .footer a {
            color: #006FEE;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>South West Steam Engineering</h1>
            <p>Heritage Steam Locomotive Specialists</p>
          </div>
          ${content}
          <div class="footer">
            <p>
              South West Steam Engineering Ltd.<br>
              📍 Cornwall, England | 📧 enquiries@swsteamengineering.co.uk | 📞 +44 1209 123456
            </p>
            <p style="margin-top: 16px; font-size: 12px;">
              This email and any attachments are confidential and intended solely for the addressee.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
    
    switch (documentType) {
      case 'invoice':
        return {
          subject: `Invoice ${documentNumber} - ${projectName}`,
          html: baseTemplate(`
            <div class="content">
              <h2>Invoice Ready for Download</h2>
              <p>Dear Client,</p>
              <p>Thank you for choosing South West Steam Engineering. We are pleased to provide you with the invoice for your project.</p>
              
              <div class="info-box">
                <h3>Invoice Details</h3>
                <p><strong>Invoice Number:</strong> ${documentNumber}</p>
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
              </div>
              
              <p>Please find your invoice attached to this email. You can also access it through your customer portal at any time.</p>
              
              <p>If you have any questions about this invoice, please don't hesitate to contact us.</p>
              
              <a href="${process.env.NEXTAUTH_URL}/customer/documents" class="button">
                View in Customer Portal
              </a>
              
              <p style="margin-top: 24px;">
                Best regards,<br>
                The South West Steam Engineering Team
              </p>
            </div>
          `)
        }
        
      case 'project_report':
        return {
          subject: `Project Report ${documentNumber} - ${projectName}`,
          html: baseTemplate(`
            <div class="content">
              <h2>Project Report Available</h2>
              <p>Dear Client,</p>
              <p>We're pleased to share the latest progress report for your project with South West Steam Engineering.</p>
              
              <div class="info-box">
                <h3>Report Details</h3>
                <p><strong>Report Number:</strong> ${documentNumber}</p>
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
              </div>
              
              <p>This report contains:</p>
              <ul style="color: #4b5563; margin-left: 20px;">
                <li>Current project status and progress</li>
                <li>Work completed to date</li>
                <li>Quality assurance results</li>
                <li>Next steps and timeline</li>
              </ul>
              
              <p>The full report is attached to this email and available in your customer portal.</p>
              
              <a href="${process.env.NEXTAUTH_URL}/customer/documents" class="button">
                View in Customer Portal
              </a>
              
              <p style="margin-top: 24px;">
                Kind regards,<br>
                The South West Steam Engineering Team
              </p>
            </div>
          `)
        }
        
      case 'certificate':
        return {
          subject: `Certificate ${documentNumber} - ${projectName}`,
          html: baseTemplate(`
            <div class="content">
              <h2>Certificate of Completion</h2>
              <p>Dear Client,</p>
              <p>Congratulations! We are delighted to confirm the successful completion of your project.</p>
              
              <div class="info-box">
                <h3>Certificate Details</h3>
                <p><strong>Certificate Number:</strong> ${documentNumber}</p>
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Issue Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
              </div>
              
              <p>This certificate confirms that all work has been completed to the highest standards and in compliance with all relevant regulations.</p>
              
              <p>Key compliance standards:</p>
              <ul style="color: #4b5563; margin-left: 20px;">
                <li>BS EN 12952 - Water-tube boilers</li>
                <li>PED 2014/68/EU - Pressure Equipment Directive</li>
                <li>Railway Group Standards</li>
              </ul>
              
              <p>Your certificate includes digital verification for authenticity. Please keep this document for your records.</p>
              
              <a href="${process.env.NEXTAUTH_URL}/customer/documents" class="button">
                Access Your Documents
              </a>
              
              <p style="margin-top: 24px;">
                Thank you for choosing South West Steam Engineering.<br><br>
                Best regards,<br>
                The South West Steam Engineering Team
              </p>
            </div>
          `)
        }
        
      case 'quote':
        return {
          subject: `Quote ${documentNumber} - ${projectName}`,
          html: baseTemplate(`
            <div class="content">
              <h2>Project Quote</h2>
              <p>Dear Client,</p>
              <p>Thank you for your interest in South West Steam Engineering. We're pleased to provide you with a detailed quote for your project.</p>
              
              <div class="info-box">
                <h3>Quote Details</h3>
                <p><strong>Quote Number:</strong> ${documentNumber}</p>
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Valid Until:</strong> ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</p>
              </div>
              
              <p>Our quote includes:</p>
              <ul style="color: #4b5563; margin-left: 20px;">
                <li>Detailed breakdown of all costs</li>
                <li>Project timeline and milestones</li>
                <li>Terms and conditions</li>
                <li>Warranty information</li>
              </ul>
              
              <p>Please review the attached quote. We're happy to discuss any questions you may have.</p>
              
              <a href="${process.env.NEXTAUTH_URL}/contact" class="button">
                Contact Us to Discuss
              </a>
              
              <p style="margin-top: 24px;">
                We look forward to working with you.<br><br>
                Best regards,<br>
                The South West Steam Engineering Team
              </p>
            </div>
          `)
        }
        
      default:
        return {
          subject: `Document ${documentNumber} - ${projectName}`,
          html: baseTemplate(`
            <div class="content">
              <h2>Document Available</h2>
              <p>A new document is available for your project.</p>
            </div>
          `)
        }
    }
  }
  
  // Send project update email
  static async sendProjectUpdateEmail(
    recipientEmail: string,
    projectName: string,
    updateType: 'stage_complete' | 'project_complete' | 'new_document',
    details: any
  ): Promise<boolean> {
    const subjects = {
      stage_complete: `Project Update: Stage Completed - ${projectName}`,
      project_complete: `Project Completed - ${projectName}`,
      new_document: `New Document Available - ${projectName}`
    }
    
    const content = {
      stage_complete: `
        <h2>Project Stage Completed</h2>
        <p>We're pleased to inform you that a project stage has been completed.</p>
        <div class="info-box">
          <h3>Stage Details</h3>
          <p><strong>Stage:</strong> ${details.stageName}</p>
          <p><strong>Completed:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
        </div>
      `,
      project_complete: `
        <h2>Project Completed Successfully</h2>
        <p>Congratulations! Your project has been completed successfully.</p>
        <p>All documentation including certificates and final reports are now available in your customer portal.</p>
      `,
      new_document: `
        <h2>New Document Available</h2>
        <p>A new document has been added to your project.</p>
        <div class="info-box">
          <h3>Document Details</h3>
          <p><strong>Type:</strong> ${details.documentType}</p>
          <p><strong>Reference:</strong> ${details.documentNumber}</p>
        </div>
      `
    }
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #006FEE; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .info-box { background-color: white; border: 1px solid #ddd; padding: 15px; margin: 15px 0; }
          .button { display: inline-block; padding: 10px 20px; background-color: #006FEE; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>South West Steam Engineering</h1>
          </div>
          <div class="content">
            ${content[updateType]}
            <p style="margin-top: 20px;">
              <a href="${process.env.NEXTAUTH_URL}/customer/projects" class="button">View in Portal</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
    
    return await this.sendEmail({
      to: recipientEmail,
      subject: subjects[updateType],
      html
    })
  }
}