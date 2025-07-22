import React, { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Badge } from './components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { useToast } from './hooks/use-toast'
import { Toaster } from './components/ui/toaster'
import { AdminWrapper } from './components/AdminWrapper'
import { submitContactRequest, submitAppointmentRequest } from './services/requests'
import type { ContactFormData, AppointmentFormData } from './types/requests'
import { 
  Wrench, 
  Car, 
  Shield, 
  Clock, 
  Phone, 
  MapPin, 
  Mail, 
  Star, 
  CheckCircle, 
  Calendar,
  Menu,
  X,
  Award,
  Users,
  Zap,
  Settings
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  // États pour les formulaires
  const [contactForm, setContactForm] = useState<ContactFormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })

  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    service: '',
    message: ''
  })

  const services = [
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Réparation Mécanique",
      description: "Diagnostic et réparation complète de tous systèmes mécaniques",
      price: "À partir de 80€"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Entretien Périodique",
      description: "Vidange, révision, contrôle technique et maintenance préventive",
      price: "À partir de 120€"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Freinage & Sécurité",
      description: "Remplacement plaquettes, disques et système de freinage complet",
      price: "À partir de 150€"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Électricité Auto",
      description: "Diagnostic électronique, batterie, alternateur et système électrique",
      price: "À partir de 90€"
    }
  ]

  const testimonials = [
    {
      name: "auto farat",
      rating: 5,
      comment: "Garagiste sympathique et très professionnel tarifs raisonnables, il donne de bons conseils. Je recommande vivement",
      location: "Client vérifié"
    },
    {
      name: "Mafalda D'Alfonso",
      rating: 5,
      comment: "Très professionnel, efficace et d'une honnêteté rare. Je recommande chaudement",
      location: "Client vérifié"
    },
    {
      name: "Sophie Laurent",
      rating: 5,
      comment: "Garage de confiance ! Ils ont diagnostiqué et résolu mon problème en une journée. Prix honnête et travail de qualité.",
      location: "Région de Nyon"
    }
  ]

  // Fonction pour soumettre le formulaire de contact
  const handleContactSubmit = async () => {
    if (!contactForm.nom || !contactForm.prenom || !contactForm.email || !contactForm.sujet || !contactForm.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      await submitContactRequest(contactForm)
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })
      // Réinitialiser le formulaire
      setContactForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour soumettre le formulaire de rendez-vous
  const handleAppointmentSubmit = async () => {
    if (!appointmentForm.nom || !appointmentForm.prenom || !appointmentForm.email || !appointmentForm.service) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    try {
      await submitAppointmentRequest(appointmentForm)
      toast({
        title: "Demande de rendez-vous envoyée !",
        description: "Nous vous contacterons rapidement pour confirmer votre créneau.",
      })
      // Réinitialiser le formulaire
      setAppointmentForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        service: '',
        message: ''
      })
      setIsBookingOpen(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showAdmin) {
    return <AdminWrapper />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">Garage Routhier</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-gray-700 hover:text-primary transition-colors">Accueil</a>
              <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
              <a href="#apropos" className="text-gray-700 hover:text-primary transition-colors">À Propos</a>
              <a href="#temoignages" className="text-gray-700 hover:text-primary transition-colors">Témoignages</a>
              <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdmin(true)}
                className="text-gray-700 hover:text-primary"
              >
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Prendre RDV
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Prendre Rendez-vous</DialogTitle>
                    <DialogDescription>
                      Réservez votre créneau pour une intervention dans notre garage.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom">Nom</Label>
                        <Input 
                          id="nom" 
                          placeholder="Votre nom" 
                          value={appointmentForm.nom}
                          onChange={(e) => setAppointmentForm({...appointmentForm, nom: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input 
                          id="prenom" 
                          placeholder="Votre prénom" 
                          value={appointmentForm.prenom}
                          onChange={(e) => setAppointmentForm({...appointmentForm, prenom: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        value={appointmentForm.email}
                        onChange={(e) => setAppointmentForm({...appointmentForm, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input 
                        id="telephone" 
                        placeholder="06 12 34 56 78" 
                        value={appointmentForm.telephone}
                        onChange={(e) => setAppointmentForm({...appointmentForm, telephone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service souhaité</Label>
                      <Select 
                        value={appointmentForm.service} 
                        onValueChange={(value) => setAppointmentForm({...appointmentForm, service: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Réparation Mécanique">Réparation Mécanique</SelectItem>
                          <SelectItem value="Entretien Périodique">Entretien Périodique</SelectItem>
                          <SelectItem value="Freinage & Sécurité">Freinage & Sécurité</SelectItem>
                          <SelectItem value="Électricité Auto">Électricité Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Décrivez votre problème ou demande..." 
                        value={appointmentForm.message}
                        onChange={(e) => setAppointmentForm({...appointmentForm, message: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleAppointmentSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Envoi en cours..." : "Confirmer le Rendez-vous"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#accueil" className="text-gray-700 hover:text-primary transition-colors">Accueil</a>
                <a href="#services" className="text-gray-700 hover:text-primary transition-colors">Services</a>
                <a href="#apropos" className="text-gray-700 hover:text-primary transition-colors">À Propos</a>
                <a href="#temoignages" className="text-gray-700 hover:text-primary transition-colors">Témoignages</a>
                <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Prendre RDV
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Votre Garage de <span className="text-primary">Confiance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Depuis 10 ans, Garage Routhier vous accompagne pour l'entretien et la réparation 
              de votre véhicule avec expertise, transparence et prix compétitifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Calendar className="h-5 w-5 mr-2" />
                    Prendre Rendez-vous
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline">
                <Phone className="h-5 w-5 mr-2" />
                +41 22 369 17 57
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">10 Années d'Expérience</h3>
              <p className="text-gray-600">Expertise reconnue dans la réparation automobile</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2000+ Clients Satisfaits</h3>
              <p className="text-gray-600">Une clientèle fidèle qui nous fait confiance</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Garantie 12 Mois</h3>
              <p className="text-gray-600">Toutes nos interventions sont garanties</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une gamme complète de services pour maintenir votre véhicule en parfait état
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {service.description}
                  </CardDescription>
                  <Badge variant="secondary" className="bg-accent/10 text-accent font-semibold">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Demander un Devis Gratuit
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                À Propos du Garage Routhier
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Fondé en 2014, Garage Routhier est un garage automobile indépendant situé à Givrins, en Suisse. 
                Notre équipe de mécaniciens certifiés met son expertise au service de votre véhicule.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Mécaniciens certifiés et expérimentés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Équipements de diagnostic dernière génération</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Pièces détachées d'origine et de qualité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Devis transparent et prix compétitifs</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10</div>
                  <div className="text-gray-600">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-gray-600">Taux de satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24h</div>
                  <div className="text-gray-600">Délai moyen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La satisfaction de nos clients est notre priorité absolue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              N'hésitez pas à nous contacter pour toute question ou demande de devis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Informations de Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Adresse</div>
                      <div className="text-gray-600">Rte de Genolier 21, 1271 Givrins, Suisse</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <div className="text-gray-600">+41 22 369 17 57</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">contact@garage-routhier.ch</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Horaires d'ouverture</div>
                      <div className="text-gray-600">
                        Lun-Ven: 8h00-18h00<br />
                        Sam: 8h00-12h00<br />
                        Dim: Fermé
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-800">
                  <Phone className="h-5 w-5" />
                  <span className="font-semibold">Urgences 24h/7j</span>
                </div>
                <p className="text-red-700 mt-1">
                  Pour les pannes et urgences: <strong>+41 22 369 17 57</strong>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
                <CardDescription>
                  Nous vous répondrons dans les plus brefs délais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-nom">Nom</Label>
                    <Input 
                      id="contact-nom" 
                      placeholder="Votre nom" 
                      value={contactForm.nom}
                      onChange={(e) => setContactForm({...contactForm, nom: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-prenom">Prénom</Label>
                    <Input 
                      id="contact-prenom" 
                      placeholder="Votre prénom" 
                      value={contactForm.prenom}
                      onChange={(e) => setContactForm({...contactForm, prenom: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-telephone">Téléphone</Label>
                  <Input 
                    id="contact-telephone" 
                    placeholder="06 12 34 56 78" 
                    value={contactForm.telephone}
                    onChange={(e) => setContactForm({...contactForm, telephone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-sujet">Sujet</Label>
                  <Select 
                    value={contactForm.sujet} 
                    onValueChange={(value) => setContactForm({...contactForm, sujet: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Demande de devis">Demande de devis</SelectItem>
                      <SelectItem value="Prise de rendez-vous">Prise de rendez-vous</SelectItem>
                      <SelectItem value="Demande d'information">Demande d'information</SelectItem>
                      <SelectItem value="Urgence">Urgence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea 
                    id="contact-message" 
                    placeholder="Décrivez votre demande..." 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleContactSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-6 w-6 text-accent" />
                <span className="text-xl font-bold">Garage Routhier</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre garage de confiance depuis 2014. Expertise, transparence et service de qualité.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Réparation Mécanique</li>
                <li>Entretien Périodique</li>
                <li>Freinage & Sécurité</li>
                <li>Électricité Auto</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Rte de Genolier 21</li>
                <li>1271 Givrins, Suisse</li>
                <li>+41 22 369 17 57</li>
                <li>contact@garage-routhier.ch</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horaires</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Lun-Ven: 8h00-18h00</li>
                <li>Samedi: 8h00-12h00</li>
                <li>Dimanche: Fermé</li>
                <li className="text-red-400">Urgences 24h/7j</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Garage Routhier. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}

export default App