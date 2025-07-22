export interface ContactRequest {
  id: string
  nom: string
  prenom: string
  email: string
  telephone?: string
  sujet: string
  message: string
  createdAt: string
  status: 'nouveau' | 'en_cours' | 'traite'
  notes?: string
}

export interface AppointmentRequest {
  id: string
  nom: string
  prenom: string
  email: string
  telephone?: string
  service: string
  message?: string
  createdAt: string
  status: 'nouveau' | 'confirme' | 'annule'
  notes?: string
}

export interface ContactFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  sujet: string
  message: string
}

export interface AppointmentFormData {
  nom: string
  prenom: string
  email: string
  telephone: string
  service: string
  message: string
}