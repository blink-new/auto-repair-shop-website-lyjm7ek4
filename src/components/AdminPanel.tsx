import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { blink } from '../blink/client'
import type { ContactRequest, AppointmentRequest } from '../types/requests'

export function AdminPanel() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [appointmentRequests, setAppointmentRequests] = useState<AppointmentRequest[]>([])
  const [loading, setLoading] = useState(true)

  const loadRequests = async () => {
    try {
      setLoading(true)
      
      // Charger les demandes de contact
      const contacts = await blink.db.contactRequests.list({
        orderBy: { createdAt: 'desc' },
        limit: 100
      })
      
      // Charger les demandes de rendez-vous
      const appointments = await blink.db.appointmentRequests.list({
        orderBy: { createdAt: 'desc' },
        limit: 100
      })
      
      setContactRequests(contacts)
      setAppointmentRequests(appointments)
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const updateContactStatus = async (id: string, status: string, notes?: string) => {
    try {
      await blink.db.contactRequests.update(id, { status, notes })
      await loadRequests()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const updateAppointmentStatus = async (id: string, status: string, notes?: string) => {
    try {
      await blink.db.appointmentRequests.update(id, { status, notes })
      await loadRequests()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'nouveau':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Nouveau</Badge>
      case 'en_cours':
      case 'confirme':
        return <Badge variant="default"><Clock className="h-3 w-3 mr-1" />En cours</Badge>
      case 'traite':
        return <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" />Traité</Badge>
      case 'annule':
        return <Badge variant="outline"><XCircle className="h-3 w-3 mr-1" />Annulé</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des demandes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration - Garage Routhier</h1>
          <p className="text-gray-600">Gestion des demandes de contact et rendez-vous</p>
        </div>

        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contacts" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Demandes de Contact ({contactRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Demandes RDV ({appointmentRequests.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            {contactRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune demande de contact pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              contactRequests.map((request) => (
                <ContactRequestCard 
                  key={request.id} 
                  request={request} 
                  onUpdateStatus={updateContactStatus}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            {appointmentRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune demande de rendez-vous pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              appointmentRequests.map((request) => (
                <AppointmentRequestCard 
                  key={request.id} 
                  request={request} 
                  onUpdateStatus={updateAppointmentStatus}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ContactRequestCard({ 
  request, 
  onUpdateStatus 
}: { 
  request: ContactRequest
  onUpdateStatus: (id: string, status: string, notes?: string) => void 
}) {
  const [notes, setNotes] = useState(request.notes || '')
  const [status, setStatus] = useState(request.status)

  const handleSave = () => {
    onUpdateStatus(request.id, status, notes)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{request.prenom} {request.nom}</span>
            </CardTitle>
            <CardDescription>
              Demande reçue le {new Date(request.createdAt).toLocaleString('fr-CH')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(request.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{request.email}</span>
          </div>
          {request.telephone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{request.telephone}</span>
            </div>
          )}
        </div>
        
        <div>
          <Label className="text-sm font-medium">Sujet: {request.sujet}</Label>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Message:</Label>
          <p className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded">{request.message}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`status-${request.id}`}>Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="traite">Traité</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`notes-${request.id}`}>Notes internes</Label>
            <Textarea
              id={`notes-${request.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des notes..."
              rows={2}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Sauvegarder les modifications
        </Button>
      </CardContent>
    </Card>
  )
}

function AppointmentRequestCard({ 
  request, 
  onUpdateStatus 
}: { 
  request: AppointmentRequest
  onUpdateStatus: (id: string, status: string, notes?: string) => void 
}) {
  const [notes, setNotes] = useState(request.notes || '')
  const [status, setStatus] = useState(request.status)

  const handleSave = () => {
    onUpdateStatus(request.id, status, notes)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>{request.prenom} {request.nom}</span>
            </CardTitle>
            <CardDescription>
              Demande reçue le {new Date(request.createdAt).toLocaleString('fr-CH')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(request.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{request.email}</span>
          </div>
          {request.telephone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{request.telephone}</span>
            </div>
          )}
        </div>
        
        <div>
          <Label className="text-sm font-medium">Service demandé: {request.service}</Label>
        </div>
        
        {request.message && (
          <div>
            <Label className="text-sm font-medium">Message:</Label>
            <p className="text-sm text-gray-600 mt-1 p-3 bg-gray-50 rounded">{request.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`status-${request.id}`}>Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nouveau">Nouveau</SelectItem>
                <SelectItem value="confirme">Confirmé</SelectItem>
                <SelectItem value="annule">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`notes-${request.id}`}>Notes internes</Label>
            <Textarea
              id={`notes-${request.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ajouter des notes..."
              rows={2}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Sauvegarder les modifications
        </Button>
      </CardContent>
    </Card>
  )
}

// Fonction utilitaire pour obtenir le badge de statut
function getStatusBadge(status: string) {
  switch (status) {
    case 'nouveau':
      return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Nouveau</Badge>
    case 'en_cours':
    case 'confirme':
      return <Badge variant="default"><Clock className="h-3 w-3 mr-1" />En cours</Badge>
    case 'traite':
      return <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" />Traité</Badge>
    case 'annule':
      return <Badge variant="outline"><XCircle className="h-3 w-3 mr-1" />Annulé</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}