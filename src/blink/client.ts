import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'auto-repair-shop-website-lyjm7ek4',
  authRequired: false // Pas besoin d'auth pour les formulaires publics
})