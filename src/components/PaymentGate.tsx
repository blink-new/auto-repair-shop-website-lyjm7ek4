import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { 
  Lock, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Mail, 
  Phone,
  AlertCircle
} from 'lucide-react'

interface PaymentGateProps {
  onPaymentComplete: () => void
}

export function PaymentGate({ onPaymentComplete }: PaymentGateProps) {
  const [accessCode, setAccessCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')

  // Code secret pour débloquer le site (vous pouvez le changer)
  const UNLOCK_CODE = 'PAID2025'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError('')

    // Simulation d'une vérification
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (accessCode.toUpperCase() === UNLOCK_CODE) {
      onPaymentComplete()
    } else {
      setError('Code d\'accès invalide. Veuillez vérifier votre paiement.')
    }
    
    setIsVerifying(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Site en Attente de Paiement
          </h1>
          <p className="text-gray-600">
            Ce site web est actuellement protégé en attendant la finalisation du paiement.
          </p>
        </div>

        {/* Payment Info Card */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="text-center pb-4">
            <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <CreditCard className="h-6 w-6 text-amber-600" />
            </div>
            <CardTitle className="text-lg text-amber-800">
              Paiement Requis
            </CardTitle>
            <CardDescription className="text-amber-700">
              Pour accéder au site web complet de Garage Routhier
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Site Web Professionnel</span>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  Premium
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Design professionnel et responsive
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Formulaires de contact fonctionnels
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Panel d'administration inclus
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Hébergement et maintenance
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Access Code Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Code d'Accès
            </CardTitle>
            <CardDescription>
              Entrez le code d'accès reçu après paiement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="accessCode">Code d'Accès</Label>
                <Input
                  id="accessCode"
                  type="text"
                  placeholder="Entrez votre code d'accès"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isVerifying || !accessCode.trim()}
              >
                {isVerifying ? 'Vérification...' : 'Accéder au Site'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-gray-900">
              Besoin d'Aide ?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              <span>guillaume@example.com</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              <span>+33 6 XX XX XX XX</span>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Contactez Guillaume pour toute question concernant le paiement ou l'accès au site.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Site créé par Guillaume pour Thibault</p>
          <p className="mt-1">© 2025 - Tous droits réservés</p>
        </div>
      </div>
    </div>
  )
}