import { put } from '@vercel/blob'

export interface PDFGenerationOptions {
  filename: string
  documentType: string
  projectId: string
  templateData: any
}

export class PDFGenerator {
  
  // Generate PDF from HTML content
  static async generateFromHTML(
    htmlContent: string,
    options: PDFGenerationOptions
  ): Promise<{ url: string; size: number }> {
    try {
      // Create complete HTML document with SWS styling
      const fullHtml = this.createFullHTMLDocument(htmlContent)
      
      // For now, we'll use a PDF-ready HTML approach
      // In production, you'd want to use puppeteer or similar
      const blob = await this.convertHTMLToPDFBlob(fullHtml, options)
      
      // Upload to Vercel Blob storage
      const { url } = await put(
        `documents/${options.projectId}/${options.filename}`,
        blob,
        {
          access: 'public',
          contentType: 'application/pdf'
        }
      )
      
      return {
        url,
        size: blob.size
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Failed to generate PDF document')
    }
  }
  
  // Create a complete HTML document with proper PDF styling
  private static createFullHTMLDocument(content: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SWS Document</title>
        <style>
          @page {
            margin: 20mm;
            size: A4;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #111827;
            background: white;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .no-break {
            page-break-inside: avoid;
          }
          
          .header {
            border-bottom: 2px solid #006FEE;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #006FEE;
            margin-bottom: 10px;
          }
          
          .company-info {
            font-size: 10px;
            color: #6B7280;
            line-height: 1.3;
          }
          
          .document-title {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin: 20px 0;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-title {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #E5E7EB;
          }
          
          .grid {
            display: grid;
            gap: 15px;
          }
          
          .grid-2 {
            grid-template-columns: 1fr 1fr;
          }
          
          .grid-3 {
            grid-template-columns: 1fr 1fr 1fr;
          }
          
          .card {
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 15px;
            background: #F9FAFB;
          }
          
          .table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          
          .table th,
          .table td {
            padding: 8px 12px;
            text-align: left;
            border-bottom: 1px solid #E5E7EB;
          }
          
          .table th {
            background: #F3F4F6;
            font-weight: 600;
            font-size: 11px;
            color: #374151;
          }
          
          .table tr:nth-child(even) {
            background: #F9FAFB;
          }
          
          .text-right {
            text-align: right;
          }
          
          .text-center {
            text-align: center;
          }
          
          .font-bold {
            font-weight: 600;
          }
          
          .text-primary {
            color: #006FEE;
          }
          
          .text-gray {
            color: #6B7280;
          }
          
          .mb-2 {
            margin-bottom: 8px;
          }
          
          .mb-4 {
            margin-bottom: 16px;
          }
          
          .footer {
            position: fixed;
            bottom: 20mm;
            left: 20mm;
            right: 20mm;
            font-size: 10px;
            color: #6B7280;
            text-align: center;
            border-top: 1px solid #E5E7EB;
            padding-top: 10px;
          }
          
          .signature-section {
            margin-top: 40px;
            border-top: 1px solid #E5E7EB;
            padding-top: 20px;
          }
          
          .signature-box {
            border: 1px solid #D1D5DB;
            height: 60px;
            margin-top: 10px;
            position: relative;
          }
          
          .signature-label {
            position: absolute;
            bottom: -20px;
            left: 0;
            font-size: 10px;
            color: #6B7280;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        ${content}
        <div class="footer">
          South West Steam Engineering Ltd. | Registered in England & Wales | Company No. 12345678
          <br>
          📍 Cornwall, England | 📧 enquiries@swsteamengineering.co.uk | 📞 +44 1209 123456
        </div>
      </body>
      </html>
    `
  }
  
  // Convert HTML to PDF blob (placeholder implementation)
  private static async convertHTMLToPDFBlob(
    html: string, 
    options: PDFGenerationOptions
  ): Promise<Blob> {
    // This is a simplified implementation
    // In production, you'd use puppeteer, playwright, or a PDF service
    
    // For now, create a mock PDF blob
    const pdfData = new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, // %PDF-
      // ... simplified PDF structure
    ])
    
    // In a real implementation:
    // const browser = await puppeteer.launch()
    // const page = await browser.newPage()
    // await page.setContent(html)
    // const pdf = await page.pdf({
    //   format: 'A4',
    //   printBackground: true,
    //   margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
    // })
    // await browser.close()
    // return new Blob([pdf], { type: 'application/pdf' })
    
    return new Blob([pdfData], { type: 'application/pdf' })
  }
  
  // Generate invoice PDF
  static async generateInvoicePDF(
    invoiceData: any,
    options: Omit<PDFGenerationOptions, 'documentType'>
  ) {
    const htmlContent = this.generateInvoiceHTML(invoiceData)
    const fullHtml = this.createFullHTMLDocument(htmlContent)
    
    const blob = await this.convertHTMLToPDFBlob(fullHtml, {
      ...options,
      documentType: 'invoice'
    })
    
    const { url } = await put(
      `documents/${options.projectId}/${options.filename}`,
      blob,
      { access: 'public', contentType: 'application/pdf' }
    )
    
    return { url, size: blob.size }
  }
  
  // Generate project report PDF
  static async generateProjectReportPDF(
    reportData: any,
    options: Omit<PDFGenerationOptions, 'documentType'>
  ) {
    const htmlContent = this.generateProjectReportHTML(reportData)
    const fullHtml = this.createFullHTMLDocument(htmlContent)
    
    const blob = await this.convertHTMLToPDFBlob(fullHtml, {
      ...options,
      documentType: 'project_report'
    })
    
    const { url } = await put(
      `documents/${options.projectId}/${options.filename}`,
      blob,
      { access: 'public', contentType: 'application/pdf' }
    )
    
    return { url, size: blob.size }
  }
  
  // Generate certificate PDF
  static async generateCertificatePDF(
    certificateData: any,
    options: Omit<PDFGenerationOptions, 'documentType'>
  ) {
    const htmlContent = this.generateCertificateHTML(certificateData)
    const fullHtml = this.createFullHTMLDocument(htmlContent)
    
    const blob = await this.convertHTMLToPDFBlob(fullHtml, {
      ...options,
      documentType: 'certificate'
    })
    
    const { url } = await put(
      `documents/${options.projectId}/${options.filename}`,
      blob,
      { access: 'public', contentType: 'application/pdf' }
    )
    
    return { url, size: blob.size }
  }
  
  // Generate invoice HTML
  private static generateInvoiceHTML(data: any): string {
    const formatCurrency = (amount: number) => 
      new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount)
    
    const formatDate = (date: string | Date) => 
      new Date(date).toLocaleDateString('en-GB', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      })
    
    return `
      <div class="header">
        <div class="grid grid-2">
          <div>
            <div class="logo">South West Steam Engineering</div>
            <div class="company-info">
              Heritage Steam Locomotive Specialists<br>
              Cornwall, England<br>
              enquiries@swsteamengineering.co.uk<br>
              +44 1209 123456
            </div>
          </div>
          <div style="text-align: right;">
            <div class="document-title">INVOICE</div>
            <div><strong>Invoice No:</strong> ${data.invoiceNumber}</div>
            <div><strong>Date:</strong> ${formatDate(data.issueDate)}</div>
            <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="grid grid-2">
          <div class="card">
            <div class="section-title">Bill To</div>
            <div class="font-bold">${data.client.name}</div>
            ${data.client.address.map((line: string) => `<div>${line}</div>`).join('')}
            <div class="mb-2"></div>
            <div>Email: ${data.client.email}</div>
            <div>Phone: ${data.client.phone}</div>
          </div>
          <div class="card">
            <div class="section-title">Project Details</div>
            <div><strong>Project:</strong> ${data.projectName}</div>
            <div><strong>Reference:</strong> ${data.projectRef}</div>
            <div><strong>Description:</strong> ${data.project.description}</div>
            <div><strong>Location:</strong> ${data.project.location}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Items</div>
        <table class="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item: any) => `
              <tr>
                <td>
                  <div class="font-bold">${item.description}</div>
                  ${item.notes ? `<div class="text-gray">${item.notes}</div>` : ''}
                </td>
                <td>${item.quantity}</td>
                <td>${item.unit}</td>
                <td>${formatCurrency(item.unitPrice)}</td>
                <td class="text-right font-bold">${formatCurrency(item.totalPrice)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <div class="section">
        <div class="grid grid-2">
          <div class="card">
            <div class="section-title">Terms & Conditions</div>
            <div class="mb-2"><strong>Payment Terms:</strong> ${data.terms.paymentTerms}</div>
            <div class="mb-2"><strong>Warranty:</strong> ${data.terms.warranty}</div>
            <div class="text-gray">${data.terms.notes}</div>
          </div>
          <div class="card">
            <div class="section-title">Total</div>
            <div class="grid" style="gap: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>${formatCurrency(data.totals.subtotal)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>VAT (20%):</span>
                <span>${formatCurrency(data.totals.vat)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-weight: 600; font-size: 14px; padding-top: 8px; border-top: 1px solid #E5E7EB;">
                <span>Total:</span>
                <span class="text-primary">${formatCurrency(data.totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="signature-section">
        <div class="grid grid-2">
          <div>
            <div class="font-bold mb-2">Authorized by:</div>
            <div class="signature-box">
              <div class="signature-label">Chief Engineer, South West Steam Engineering</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div class="font-bold mb-2">Date:</div>
            <div>${formatDate(new Date())}</div>
          </div>
        </div>
      </div>
    `
  }
  
  // Generate project report HTML
  private static generateProjectReportHTML(data: any): string {
    const formatDate = (date: string | Date) => 
      new Date(date).toLocaleDateString('en-GB', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      })
    
    return `
      <div class="header">
        <div class="grid grid-2">
          <div>
            <div class="logo">South West Steam Engineering</div>
            <div class="company-info">
              Heritage Steam Locomotive Specialists<br>
              Professional Engineering Services
            </div>
          </div>
          <div style="text-align: right;">
            <div class="document-title">PROJECT REPORT</div>
            <div><strong>Report No:</strong> ${data.reportNumber}</div>
            <div><strong>Date:</strong> ${formatDate(data.generatedDate)}</div>
            <div><strong>Type:</strong> ${data.reportType.toUpperCase()}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="grid grid-2">
          <div class="card">
            <div class="section-title">Project Information</div>
            <div><strong>Project:</strong> ${data.projectName}</div>
            <div><strong>Reference:</strong> ${data.projectRef}</div>
            <div><strong>Client:</strong> ${data.client.name}</div>
            <div><strong>Location:</strong> ${data.project.location}</div>
            <div><strong>Service Type:</strong> ${data.project.serviceType}</div>
          </div>
          <div class="card">
            <div class="section-title">Timeline</div>
            <div><strong>Start Date:</strong> ${formatDate(data.project.startDate)}</div>
            <div><strong>Target Date:</strong> ${formatDate(data.project.targetDate)}</div>
            ${data.project.completionDate ? `<div><strong>Completed:</strong> ${formatDate(data.project.completionDate)}</div>` : ''}
            <div><strong>Current Stage:</strong> ${data.project.currentStage}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Work Completed</div>
        <div class="card">
          <div class="mb-4">${data.workCompleted.summary}</div>
          
          <div class="section-title">Project Stages</div>
          <table class="table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Status</th>
                <th>Completed Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${data.workCompleted.stages.map((stage: any) => `
                <tr>
                  <td class="font-bold">${stage.name}</td>
                  <td>
                    <span class="text-${stage.status === 'completed' ? 'primary' : 'gray'}">
                      ${stage.status.toUpperCase()}
                    </span>
                  </td>
                  <td>${stage.completedDate ? formatDate(stage.completedDate) : '-'}</td>
                  <td class="text-gray">${stage.notes || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          ${data.workCompleted.materialsUsed.length > 0 ? `
            <div class="section-title">Materials Used</div>
            <div class="grid grid-3">
              ${data.workCompleted.materialsUsed.map((material: any) => `
                <div>• ${material.item} (${material.quantity} ${material.unit})</div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Quality Assurance</div>
        <div class="card">
          <div class="mb-4"><strong>Overall Rating:</strong> ${data.qualityAssurance.overallRating.toUpperCase()}</div>
          
          <table class="table">
            <thead>
              <tr>
                <th>Check Type</th>
                <th>Result</th>
                <th>Inspector</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${data.qualityAssurance.checks.map((check: any) => `
                <tr>
                  <td class="font-bold">${check.checkType}</td>
                  <td class="text-${check.result === 'pass' ? 'primary' : 'red'}">${check.result.toUpperCase()}</td>
                  <td>${check.inspector}</td>
                  <td>${formatDate(check.date)}</td>
                  <td class="text-gray">${check.notes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="section-title">Certifications</div>
          <div class="grid grid-3">
            ${data.qualityAssurance.certifications.map((cert: string) => `
              <div>✓ ${cert}</div>
            `).join('')}
          </div>
        </div>
      </div>
      
      ${data.nextSteps ? `
        <div class="section">
          <div class="section-title">Next Steps</div>
          <div class="card">
            <div class="mb-2">${data.nextSteps.description}</div>
            <div><strong>Estimated Completion:</strong> ${formatDate(data.nextSteps.estimatedCompletion)}</div>
            
            ${data.nextSteps.requiredMaterials.length > 0 ? `
              <div class="section-title">Required Materials</div>
              <div class="grid grid-2">
                ${data.nextSteps.requiredMaterials.map((material: string) => `
                  <div>• ${material}</div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}
      
      <div class="signature-section">
        <div class="grid grid-2">
          <div>
            <div class="font-bold mb-2">Engineer:</div>
            <div class="signature-box">
              <div class="signature-label">${data.engineer.name} - ${data.engineer.qualification}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div class="font-bold mb-2">Report Date:</div>
            <div>${formatDate(data.generatedDate)}</div>
          </div>
        </div>
      </div>
    `
  }
  
  // Generate certificate HTML
  private static generateCertificateHTML(data: any): string {
    const formatDate = (date: string | Date) => 
      new Date(date).toLocaleDateString('en-GB', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      })
    
    return `
      <div class="header" style="text-align: center; border: 3px solid #006FEE; padding: 30px; margin-bottom: 40px;">
        <div class="logo" style="font-size: 32px; margin-bottom: 10px;">CERTIFICATE OF COMPLETION</div>
        <div style="font-size: 18px; color: #006FEE; font-weight: 600;">South West Steam Engineering Ltd.</div>
        <div style="font-size: 14px; color: #6B7280; margin-top: 10px;">Heritage Steam Locomotive Specialists</div>
      </div>
      
      <div class="section text-center" style="margin: 40px 0;">
        <div style="font-size: 16px; margin-bottom: 20px;">This is to certify that</div>
        <div style="font-size: 24px; font-weight: 700; color: #006FEE; margin: 20px 0; padding: 10px; border-bottom: 2px solid #006FEE;">
          ${data.projectName}
        </div>
        <div style="font-size: 16px; margin-bottom: 20px;">has been completed in accordance with the highest standards of engineering excellence</div>
      </div>
      
      <div class="section">
        <div class="grid grid-2">
          <div class="card">
            <div class="section-title">Project Details</div>
            <div><strong>Certificate No:</strong> ${data.certificateNumber}</div>
            <div><strong>Project Reference:</strong> ${data.projectRef}</div>
            <div><strong>Client:</strong> ${data.client.name}</div>
            <div><strong>Service Type:</strong> ${data.project.serviceType}</div>
            <div><strong>Location:</strong> ${data.project.location}</div>
          </div>
          <div class="card">
            <div class="section-title">Certification Details</div>
            <div><strong>Issue Date:</strong> ${formatDate(data.issueDate)}</div>
            <div><strong>Certificate Type:</strong> ${data.certificateType.toUpperCase()}</div>
            ${data.validUntil ? `<div><strong>Valid Until:</strong> ${formatDate(data.validUntil)}</div>` : ''}
            <div><strong>Verification Hash:</strong> ${data.digitalVerification.hash}</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Compliance & Standards</div>
        <div class="card">
          <div class="grid grid-2">
            <div>
              <div class="font-bold mb-2">Standards Compliance:</div>
              ${data.compliance.standards.map((standard: string) => `
                <div>✓ ${standard}</div>
              `).join('')}
            </div>
            <div>
              <div class="font-bold mb-2">Regulatory Compliance:</div>
              ${data.compliance.regulations.map((regulation: string) => `
                <div>✓ ${regulation}</div>
              `).join('')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #F0F9FF; border: 1px solid #006FEE; border-radius: 8px;">
            <div class="grid grid-2">
              <div>
                <strong>Testing Completed:</strong> ${data.compliance.testingCompleted ? '✅ Yes' : '❌ No'}
              </div>
              <div>
                <strong>Inspection Passed:</strong> ${data.compliance.inspectionPassed ? '✅ Yes' : '❌ No'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      ${data.warranty ? `
        <div class="section">
          <div class="section-title">Warranty Information</div>
          <div class="card">
            <div><strong>Warranty Period:</strong> ${data.warranty.period}</div>
            
            <div class="grid grid-2" style="margin-top: 15px;">
              <div>
                <div class="font-bold mb-2">Coverage Includes:</div>
                ${data.warranty.coverage.map((item: string) => `
                  <div>• ${item}</div>
                `).join('')}
              </div>
              <div>
                <div class="font-bold mb-2">Warranty Conditions:</div>
                ${data.warranty.conditions.map((condition: string) => `
                  <div>• ${condition}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : ''}
      
      <div class="section">
        <div class="section-title">Digital Verification</div>
        <div class="card text-center">
          <div class="mb-4">This certificate can be verified online at:</div>
          <div style="font-family: monospace; background: #F3F4F6; padding: 10px; border-radius: 4px; margin: 10px 0;">
            ${data.digitalVerification.verificationUrl}?hash=${data.digitalVerification.hash}
          </div>
          <div class="text-gray">Verification timestamp: ${formatDate(data.digitalVerification.timestamp)}</div>
        </div>
      </div>
      
      <div class="signature-section" style="margin-top: 60px;">
        <div class="grid grid-2">
          <div>
            <div class="font-bold mb-2">Certified by:</div>
            <div class="signature-box">
              <div class="signature-label">
                ${data.certification.certifyingEngineer}<br>
                ${data.certification.engineerRegistration}<br>
                ${data.certification.qualifications.join(', ')}
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <div class="font-bold mb-2">Date of Certification:</div>
            <div style="font-size: 16px; font-weight: 600;">${formatDate(data.issueDate)}</div>
            
            <div style="margin-top: 30px; padding: 15px; border: 2px solid #006FEE; border-radius: 8px; background: #F0F9FF;">
              <div style="font-size: 12px; color: #006FEE; font-weight: 600;">OFFICIAL SEAL</div>
              <div style="font-size: 10px; color: #6B7280; margin-top: 5px;">South West Steam Engineering Ltd.</div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}