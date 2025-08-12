import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2.39.3'
import * as kv from './kv_store.tsx'

const app = new Hono()

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
app.use('*', logger(console.log))

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Helper function to generate membership number
function generateMembershipNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substr(2, 6).toUpperCase()
  return `MBR-${year}-${random}`
}

// Get cities for dropdown
app.get('/make-server-d2b0c44a/cities', async (c) => {
  try {
    const cities = [
      'Montréal', 'Québec', 'Laval', 'Gatineau', 'Longueuil', 
      'Sherbrooke', 'Trois-Rivières', 'Saguenay', 'Lévis', 'Terrebonne',
      'Saint-Jean-sur-Richelieu', 'Drummondville', 'Granby', 'Saint-Jérôme',
      'Chicoutimi', 'Beloeil', 'Shawinigan', 'Rimouski', 'Victoriaville'
    ]
    
    return c.json({ cities })
  } catch (error) {
    console.log('Error fetching cities:', error)
    return c.json({ error: 'Failed to fetch cities' }, 500)
  }
})

// Get sectors for dropdown
app.get('/make-server-d2b0c44a/sectors', async (c) => {
  try {
    const sectors = [
      { id: 'technologie', nom: 'Technologie', sousSecteurs: ['Développement logiciel', 'Intelligence artificielle', 'Cybersécurité', 'Fintech'] },
      { id: 'sante', nom: 'Santé', sousSecteurs: ['Biotechnologie', 'Dispositifs médicaux', 'Télémédecine', 'Pharmacie'] },
      { id: 'finance', nom: 'Finance', sousSecteurs: ['Banque', 'Assurance', 'Gestion de patrimoine', 'Services financiers'] },
      { id: 'education', nom: 'Éducation', sousSecteurs: ['Formation professionnelle', 'E-learning', 'Recherche', 'Édition'] },
      { id: 'commerce', nom: 'Commerce', sousSecteurs: ['Vente au détail', 'E-commerce', 'Distribution', 'Import-export'] },
      { id: 'industrie', nom: 'Industrie', sousSecteurs: ['Manufacturier', 'Aéronautique', 'Automobile', 'Métallurgie'] },
      { id: 'services', nom: 'Services', sousSecteurs: ['Conseil', 'Marketing', 'Ressources humaines', 'Juridique'] }
    ]
    
    return c.json({ sectors })
  } catch (error) {
    console.log('Error fetching sectors:', error)
    return c.json({ error: 'Failed to fetch sectors' }, 500)
  }
})

// Get membership types
app.get('/make-server-d2b0c44a/membership-types', async (c) => {
  try {
    const membershipTypes = [
      { id: 'associe', nom: 'Associé', prix: 150, description: 'Accès de base aux événements' },
      { id: 'grand-partenaire', nom: 'Grand-partenaire', prix: 500, description: 'Accès privilégié et avantages' },
      { id: 'actif', nom: 'Actif', prix: 300, description: 'Participation complète aux activités' }
    ]
    
    return c.json({ membershipTypes })
  } catch (error) {
    console.log('Error fetching membership types:', error)
    return c.json({ error: 'Failed to fetch membership types' }, 500)
  }
})

// Submit membership application
app.post('/make-server-d2b0c44a/membership', async (c) => {
  try {
    const membershipData = await c.req.json()
    
    // Generate unique membership number
    const membershipNumber = generateMembershipNumber()
    const timestamp = new Date().toISOString()
    
    // Calculate total amount
    const membershipTypes = [
      { id: 'associe', nom: 'Associé', prix: 150 },
      { id: 'grand-partenaire', nom: 'Grand-partenaire', prix: 500 },
      { id: 'actif', nom: 'Actif', prix: 300 }
    ]
    const commandites = [
      { id: 'bronze', nom: 'Bronze', prix: 100 },
      { id: 'argent', nom: 'Argent', prix: 250 },
      { id: 'or', nom: 'Or', prix: 500 },
      { id: 'platine', nom: 'Platine', prix: 1000 }
    ]
    
    const typePrice = membershipTypes.find(t => t.id === membershipData.adhesion.typeAdhesion)?.prix || 0
    const commanditePrice = membershipData.adhesion.commandites.reduce((sum: number, commandite: string) => {
      return sum + (commandites.find(c => c.id === commandite)?.prix || 0)
    }, 0)
    const totalAmount = typePrice + commanditePrice
    
    // Store the complete membership application
    const membershipApplication = {
      membershipNumber,
      submittedAt: timestamp,
      status: 'pending',
      organisation: membershipData.organisation,
      adhesion: membershipData.adhesion,
      contactPrincipal: membershipData.contactPrincipal,
      delegues: membershipData.delegues,
      paiement: {
        ...membershipData.paiement,
        // Remove sensitive card info, only store payment method
        numeroCarteTmp: undefined,
        cvv: undefined
      },
      totalAmount,
      calculatedPricing: {
        membershipType: membershipTypes.find(t => t.id === membershipData.adhesion.typeAdhesion),
        selectedCommandites: membershipData.adhesion.commandites.map((id: string) => 
          commandites.find(c => c.id === id)
        ).filter(Boolean),
        totalAmount
      }
    }
    
    // Store in KV store
    await kv.set(`membership:${membershipNumber}`, membershipApplication)
    
    // Also store by organization email for easy lookup
    await kv.set(`membership_by_email:${membershipData.organisation.courrielGeneral}`, membershipNumber)
    
    // Store contact reference
    await kv.set(`contact:${membershipData.contactPrincipal.courriel}`, {
      membershipNumber,
      contactInfo: membershipData.contactPrincipal,
      organisationNom: membershipData.organisation.nomOfficiel
    })
    
    console.log(`Membership application submitted successfully: ${membershipNumber}`)
    
    return c.json({
      success: true,
      membershipNumber,
      confirmationId: membershipNumber,
      totalAmount,
      status: 'pending',
      message: 'Demande d\'adhésion soumise avec succès'
    })
    
  } catch (error) {
    console.log('Error submitting membership application:', error)
    return c.json({ 
      success: false, 
      error: 'Erreur lors de la soumission de la demande d\'adhésion',
      details: error.message 
    }, 500)
  }
})

// Get membership by number
app.get('/make-server-d2b0c44a/membership/:membershipNumber', async (c) => {
  try {
    const membershipNumber = c.req.param('membershipNumber')
    
    const membership = await kv.get(`membership:${membershipNumber}`)
    
    if (!membership) {
      return c.json({ error: 'Membership not found' }, 404)
    }
    
    return c.json({ membership })
    
  } catch (error) {
    console.log('Error fetching membership:', error)
    return c.json({ error: 'Failed to fetch membership' }, 500)
  }
})

// Get membership by email
app.get('/make-server-d2b0c44a/membership-by-email/:email', async (c) => {
  try {
    const email = c.req.param('email')
    
    const membershipNumber = await kv.get(`membership_by_email:${email}`)
    
    if (!membershipNumber) {
      return c.json({ error: 'No membership found for this email' }, 404)
    }
    
    const membership = await kv.get(`membership:${membershipNumber}`)
    
    return c.json({ membership })
    
  } catch (error) {
    console.log('Error fetching membership by email:', error)
    return c.json({ error: 'Failed to fetch membership' }, 500)
  }
})

// Update membership status (for admin use)
app.put('/make-server-d2b0c44a/membership/:membershipNumber/status', async (c) => {
  try {
    const membershipNumber = c.req.param('membershipNumber')
    const { status, notes } = await c.req.json()
    
    const membership = await kv.get(`membership:${membershipNumber}`)
    
    if (!membership) {
      return c.json({ error: 'Membership not found' }, 404)
    }
    
    const updatedMembership = {
      ...membership,
      status,
      lastUpdated: new Date().toISOString(),
      adminNotes: notes
    }
    
    await kv.set(`membership:${membershipNumber}`, updatedMembership)
    
    console.log(`Membership status updated: ${membershipNumber} -> ${status}`)
    
    return c.json({ 
      success: true, 
      membership: updatedMembership,
      message: 'Statut mis à jour avec succès'
    })
    
  } catch (error) {
    console.log('Error updating membership status:', error)
    return c.json({ error: 'Failed to update membership status' }, 500)
  }
})

// List all memberships (for admin dashboard)
app.get('/make-server-d2b0c44a/memberships', async (c) => {
  try {
    const memberships = await kv.getByPrefix('membership:')
    
    // Sort by submission date (most recent first)
    const sortedMemberships = memberships.sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    })
    
    return c.json({ 
      memberships: sortedMemberships,
      total: sortedMemberships.length
    })
    
  } catch (error) {
    console.log('Error fetching memberships list:', error)
    return c.json({ error: 'Failed to fetch memberships' }, 500)
  }
})

// Health check
app.get('/make-server-d2b0c44a/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    service: 'membership-system',
    timestamp: new Date().toISOString()
  })
})

console.log('Membership system server starting...')

serve(app.fetch)