import { blink } from '../blink/client'
import type { ContactFormData, AppointmentFormData } from '../types/requests'

// Générer un ID unique
const generateId = () => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// Soumettre une demande de contact
export async function submitContactRequest(data: ContactFormData) {
  try {
    const id = generateId()
    
    // Sauvegarder dans la base de données
    await blink.db.contactRequests.create({
      id,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      sujet: data.sujet,
      message: data.message,
      createdAt: new Date().toISOString(),
      status: 'nouveau'
    })

    // Envoyer email de notification au garage
    await blink.notifications.email({
      to: 'contact@garage-routhier.ch',
      subject: `Nouvelle demande de contact - ${data.sujet}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>De:</strong> ${data.prenom} ${data.nom}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Sujet:</strong> ${data.sujet}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
        <hr>
        <p><small>Demande reçue le ${new Date().toLocaleString('fr-CH')}</small></p>
      `,
      text: `
        Nouvelle demande de contact
        
        De: ${data.prenom} ${data.nom}
        Email: ${data.email}
        Téléphone: ${data.telephone}
        Sujet: ${data.sujet}
        
        Message:
        ${data.message}
        
        Demande reçue le ${new Date().toLocaleString('fr-CH')}
      `
    })

    // Envoyer email de confirmation au client
    await blink.notifications.email({
      to: data.email,
      subject: 'Confirmation de votre demande - Garage Routhier',
      html: `
        <h2>Merci pour votre demande</h2>
        <p>Bonjour ${data.prenom},</p>
        <p>Nous avons bien reçu votre demande concernant: <strong>${data.sujet}</strong></p>
        <p>Nous vous répondrons dans les plus brefs délais, généralement sous 24h.</p>
        <p>En cas d'urgence, n'hésitez pas à nous appeler au <strong>+41 22 369 17 57</strong></p>
        <hr>
        <p>Cordialement,<br>L'équipe du Garage Routhier</p>
        <p><small>Rte de Genolier 21, 1271 Givrins, Suisse</small></p>
      `,
      text: `
        Merci pour votre demande
        
        Bonjour ${data.prenom},
        
        Nous avons bien reçu votre demande concernant: ${data.sujet}
        
        Nous vous répondrons dans les plus brefs délais, généralement sous 24h.
        
        En cas d'urgence, n'hésitez pas à nous appeler au +41 22 369 17 57
        
        Cordialement,
        L'équipe du Garage Routhier
        Rte de Genolier 21, 1271 Givrins, Suisse
      `
    })

    return { success: true, id }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de contact:', error)
    throw new Error('Erreur lors de l\'envoi de votre demande. Veuillez réessayer.')
  }
}

// Soumettre une demande de rendez-vous
export async function submitAppointmentRequest(data: AppointmentFormData) {
  try {
    const id = generateId()
    
    // Sauvegarder dans la base de données
    await blink.db.appointmentRequests.create({
      id,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      telephone: data.telephone,
      service: data.service,
      message: data.message,
      createdAt: new Date().toISOString(),
      status: 'nouveau'
    })

    // Envoyer email de notification au garage
    await blink.notifications.email({
      to: 'contact@garage-routhier.ch',
      subject: `Nouvelle demande de rendez-vous - ${data.service}`,
      html: `
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Client:</strong> ${data.prenom} ${data.nom}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p><strong>Service demandé:</strong> ${data.service}</p>
        ${data.message ? `<p><strong>Message:</strong></p><p>${data.message}</p>` : ''}
        <hr>
        <p><small>Demande reçue le ${new Date().toLocaleString('fr-CH')}</small></p>
      `,
      text: `
        Nouvelle demande de rendez-vous
        
        Client: ${data.prenom} ${data.nom}
        Email: ${data.email}
        Téléphone: ${data.telephone}
        Service demandé: ${data.service}
        ${data.message ? `\nMessage:\n${data.message}` : ''}
        
        Demande reçue le ${new Date().toLocaleString('fr-CH')}
      `
    })

    // Envoyer email de confirmation au client
    await blink.notifications.email({
      to: data.email,
      subject: 'Confirmation de votre demande de rendez-vous - Garage Routhier',
      html: `
        <h2>Demande de rendez-vous reçue</h2>
        <p>Bonjour ${data.prenom},</p>
        <p>Nous avons bien reçu votre demande de rendez-vous pour: <strong>${data.service}</strong></p>
        <p>Nous vous contacterons rapidement au <strong>${data.telephone}</strong> pour convenir d'un créneau qui vous convient.</p>
        <p>En cas d'urgence, n'hésitez pas à nous appeler directement au <strong>+41 22 369 17 57</strong></p>
        <hr>
        <p>Cordialement,<br>L'équipe du Garage Routhier</p>
        <p><small>Rte de Genolier 21, 1271 Givrins, Suisse</small></p>
      `,
      text: `
        Demande de rendez-vous reçue
        
        Bonjour ${data.prenom},
        
        Nous avons bien reçu votre demande de rendez-vous pour: ${data.service}
        
        Nous vous contacterons rapidement au ${data.telephone} pour convenir d'un créneau qui vous convient.
        
        En cas d'urgence, n'hésitez pas à nous appeler directement au +41 22 369 17 57
        
        Cordialement,
        L'équipe du Garage Routhier
        Rte de Genolier 21, 1271 Givrins, Suisse
      `
    })

    return { success: true, id }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande de rendez-vous:', error)
    throw new Error('Erreur lors de l\'envoi de votre demande. Veuillez réessayer.')
  }
}