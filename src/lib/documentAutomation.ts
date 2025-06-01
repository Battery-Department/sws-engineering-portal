import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export interface AutoGenerationRule {
  trigger: 'stage_complete' | 'project_complete' | 'payment_received' | 'manual'
  documentType: 'invoice' | 'project_report' | 'certificate' | 'quote'
  conditions: {
    stageId?: string
    projectStatus?: string
    serviceType?: string[]
  }
  autoSend: boolean
  recipientType: 'client' | 'internal' | 'both'
  templateData: Record<string, any>
}

// Document automation rules configuration
export const AUTOMATION_RULES: AutoGenerationRule[] = [
  {
    trigger: 'stage_complete',
    documentType: 'project_report',
    conditions: {
      stageId: 'manufacturing'
    },
    autoSend: true,
    recipientType: 'client',
    templateData: {
      reportType: 'progress',
      includePhotos: true,
      includeQualityChecks: true
    }
  },
  {
    trigger: 'stage_complete',
    documentType: 'project_report',
    conditions: {
      stageId: 'quality_check'
    },
    autoSend: true,
    recipientType: 'client',
    templateData: {
      reportType: 'inspection',
      includeTestResults: true,
      includeCertifications: true
    }
  },
  {
    trigger: 'project_complete',
    documentType: 'certificate',
    conditions: {
      projectStatus: 'completed'
    },
    autoSend: true,
    recipientType: 'client',
    templateData: {
      certificateType: 'completion',
      includeWarranty: true,
      digitalSignature: true
    }
  },
  {
    trigger: 'project_complete',
    documentType: 'invoice',
    conditions: {
      projectStatus: 'completed'
    },
    autoSend: false,
    recipientType: 'internal',
    templateData: {
      includeAllCosts: true,
      paymentTerms: '30 days'
    }
  }
]

export class DocumentAutomationService {
  
  // Trigger document generation based on project events
  static async triggerDocumentGeneration(
    trigger: AutoGenerationRule['trigger'],
    projectId: string,
    additionalData: Record<string, any> = {}
  ) {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
          client: {
            include: {
              user: true
            }
          },
          stages: {
            orderBy: { order: 'asc' }
          },
          costs: {
            orderBy: { date: 'desc' }
          },
          documents: {
            orderBy: { uploadedAt: 'desc' }
          }
        }
      })

      if (!project) {
        throw new Error(`Project ${projectId} not found`)
      }

      // Find applicable automation rules
      const applicableRules = AUTOMATION_RULES.filter(rule => {
        if (rule.trigger !== trigger) return false
        
        // Check conditions
        if (rule.conditions.projectStatus && project.status !== rule.conditions.projectStatus) {
          return false
        }
        
        if (rule.conditions.serviceType && !rule.conditions.serviceType.includes(project.service)) {
          return false
        }
        
        if (rule.conditions.stageId && additionalData.stageId !== rule.conditions.stageId) {
          return false
        }
        
        return true
      })

      const generatedDocuments = []

      // Generate documents for each applicable rule
      for (const rule of applicableRules) {
        try {
          const documentData = await this.prepareDocumentData(project, rule, additionalData)
          const document = await this.generateDocument(project, rule, documentData)
          generatedDocuments.push(document)
          
          console.log(`Auto-generated ${rule.documentType} for project ${project.projectRef}`)
        } catch (error) {
          console.error(`Error generating ${rule.documentType} for project ${project.projectRef}:`, error)
        }
      }

      return generatedDocuments
      
    } catch (error) {
      console.error('Error in document automation:', error)
      throw error
    }
  }

  // Prepare document data based on project and rule
  private static async prepareDocumentData(
    project: any,
    rule: AutoGenerationRule,
    additionalData: Record<string, any>
  ) {
    const baseData = {
      projectRef: project.projectRef,
      projectName: project.name,
      generatedDate: new Date(),
      client: {
        name: project.client?.user?.name || 'Unknown Client',
        contact: 'Primary Contact',
        address: ['Address Line 1', 'Address Line 2', 'City, County', 'Postcode'],
        email: project.client?.user?.email,
        phone: '+44 1234 567890'
      },
      project: {
        description: project.description || '',
        location: project.location || 'Client Site',
        serviceType: project.service,
        startDate: project.startDate || new Date(),
        targetDate: project.targetDate || new Date(),
        completionDate: project.completedDate,
        currentStage: project.currentStage
      }
    }

    // Document type specific data
    switch (rule.documentType) {
      case 'invoice':
        return {
          ...baseData,
          invoiceNumber: '', // Will be generated
          issueDate: new Date(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          items: await this.generateInvoiceItems(project),
          terms: {
            paymentTerms: rule.templateData.paymentTerms || 'Payment due within 30 days of invoice date.',
            warranty: 'All work is guaranteed for 12 months from completion date.',
            notes: 'Thank you for choosing South West Steam Engineering.'
          },
          totals: await this.calculateInvoiceTotals(project)
        }

      case 'project_report':
        return {
          ...baseData,
          reportNumber: '', // Will be generated
          reportType: rule.templateData.reportType || 'progress',
          workCompleted: await this.generateWorkCompletedSummary(project),
          qualityAssurance: await this.generateQualityAssurance(project),
          nextSteps: project.status !== 'completed' ? await this.generateNextSteps(project) : undefined,
          attachments: {
            photos: rule.templateData.includePhotos ? await this.getProjectPhotos(project) : [],
            documents: await this.getProjectDocuments(project)
          },
          engineer: {
            name: 'Chief Engineer',
            qualification: 'Chartered Engineer, IMechE',
            signature: 'digital_signature_placeholder'
          }
        }

      case 'certificate':
        return {
          ...baseData,
          certificateNumber: '', // Will be generated
          certificateType: rule.templateData.certificateType || 'completion',
          issueDate: new Date(),
          validUntil: rule.templateData.includeWarranty ? 
            new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : undefined,
          compliance: {
            standards: ['BS EN 12952', 'PED 2014/68/EU', 'Railway Group Standards'],
            regulations: ['Health & Safety at Work Act 1974', 'Pressure Systems Safety Regulations'],
            testingCompleted: true,
            inspectionPassed: true
          },
          warranty: {
            period: '12 months',
            coverage: ['Materials and workmanship', 'Manufacturing defects', 'Design compliance'],
            conditions: ['Regular maintenance required', 'Excludes wear and tear', 'Original use only']
          },
          certification: {
            certifyingEngineer: 'Chief Engineer',
            engineerRegistration: 'CEng 1234567',
            qualifications: ['BEng Mechanical Engineering', 'Chartered Engineer (IMechE)', 'Heritage Railway Specialist'],
            signature: 'digital_signature_placeholder'
          },
          digitalVerification: {
            hash: this.generateVerificationHash(),
            timestamp: new Date(),
            verificationUrl: 'https://swsteamengineering.co.uk/verify'
          }
        }

      default:
        return baseData
    }
  }

  // Generate document using the API
  private static async generateDocument(
    project: any,
    rule: AutoGenerationRule,
    documentData: any
  ) {
    const response = await fetch('/api/documents/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentType: rule.documentType,
        projectId: project.id,
        templateData: documentData,
        autoSend: rule.autoSend,
        recipientEmail: rule.recipientType === 'client' ? project.client?.user?.email : undefined
      })
    })

    if (!response.ok) {
      throw new Error(`Failed to generate ${rule.documentType}`)
    }

    return response.json()
  }

  // Helper methods for data generation
  private static async generateInvoiceItems(project: any) {
    const costs = project.costs || []
    const items = []

    // Group costs by category
    const costsByCategory = costs.reduce((acc: any, cost: any) => {
      const category = cost.category || 'materials'
      if (!acc[category]) {
        acc[category] = { total: 0, items: [] }
      }
      acc[category].total += cost.totalCost
      acc[category].items.push(cost)
      return acc
    }, {})

    // Add labour estimate
    items.push({
      id: 'labour',
      description: 'Engineering Labour and Services',
      category: 'labour',
      quantity: project.estimatedHours || 40,
      unit: 'hours',
      unitPrice: 85,
      totalPrice: (project.estimatedHours || 40) * 85,
      notes: 'Specialist heritage engineering services'
    })

    // Add material costs
    Object.entries(costsByCategory).forEach(([category, data]: [string, any]) => {
      items.push({
        id: `materials-${category}`,
        description: `Materials and Components - ${category}`,
        category: 'materials',
        quantity: 1,
        unit: 'lot',
        unitPrice: data.total,
        totalPrice: data.total,
        notes: `${data.items.length} items`
      })
    })

    return items
  }

  private static async calculateInvoiceTotals(project: any) {
    const items = await this.generateInvoiceItems(project)
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const vat = subtotal * 0.20 // 20% VAT
    const total = subtotal + vat

    return { subtotal, vat, total }
  }

  private static async generateWorkCompletedSummary(project: any) {
    const stages = project.stages || []
    const completedStages = stages.filter((s: any) => s.status === 'completed')
    
    return {
      summary: `Progress update for ${project.name}. ${completedStages.length} of ${stages.length} stages completed.`,
      stages: stages.map((stage: any) => ({
        id: stage.id,
        name: stage.stageName,
        status: stage.status,
        completedDate: stage.completedAt,
        notes: stage.notes
      })),
      totalHours: project.actualHours || 0,
      materialsUsed: project.costs?.map((cost: any) => ({
        item: cost.material,
        quantity: cost.quantity,
        unit: 'units'
      })) || []
    }
  }

  private static async generateQualityAssurance(project: any) {
    return {
      checks: [
        {
          id: '1',
          checkType: 'Material Inspection',
          result: 'pass',
          date: new Date(),
          inspector: 'Quality Inspector',
          notes: 'All materials meet required specifications'
        },
        {
          id: '2',
          checkType: 'Workmanship Review',
          result: 'pass',
          date: new Date(),
          inspector: 'Chief Engineer',
          notes: 'Work completed to professional standards'
        }
      ],
      overallRating: 'excellent',
      certifications: ['CE Marking', 'Heritage Railway Approval']
    }
  }

  private static async generateNextSteps(project: any) {
    return {
      description: 'Continue with next phase of project as outlined in project plan.',
      estimatedCompletion: project.targetDate || new Date(),
      requiredMaterials: ['Specialty components', 'Testing equipment']
    }
  }

  private static async getProjectPhotos(project: any) {
    const photoDocuments = project.documents?.filter((d: any) => d.fileType === 'photo') || []
    return photoDocuments.map((doc: any) => ({
      filename: doc.filename,
      caption: 'Project progress photo',
      category: 'progress'
    }))
  }

  private static async getProjectDocuments(project: any) {
    const documents = project.documents?.filter((d: any) => 
      ['cad', 'certificate', 'specification'].includes(d.fileType)
    ) || []
    return documents.map((doc: any) => ({
      filename: doc.filename,
      type: doc.fileType
    }))
  }

  private static generateVerificationHash(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }
}

// Event handlers for triggering automation
export const documentTriggers = {
  
  // Called when a project stage is completed
  onStageComplete: async (projectId: string, stageId: string) => {
    return DocumentAutomationService.triggerDocumentGeneration(
      'stage_complete',
      projectId,
      { stageId }
    )
  },

  // Called when a project is marked as complete
  onProjectComplete: async (projectId: string) => {
    return DocumentAutomationService.triggerDocumentGeneration(
      'project_complete',
      projectId
    )
  },

  // Called when a payment is received
  onPaymentReceived: async (projectId: string, paymentAmount: number) => {
    return DocumentAutomationService.triggerDocumentGeneration(
      'payment_received',
      projectId,
      { paymentAmount }
    )
  },

  // Manual document generation
  generateManual: async (projectId: string, documentType: string, templateData: any) => {
    return DocumentAutomationService.triggerDocumentGeneration(
      'manual',
      projectId,
      { documentType, templateData }
    )
  }
}