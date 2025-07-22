import { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminPanel } from './AdminPanel';
import { AdminAuth } from '@/services/adminAuth';
import { ADMIN_CONFIG } from '@/config/admin';
import { Button } from '@/components/ui/button';
import { LogOut, Clock } from 'lucide-react';

export function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    // Vérifier l'authentification au chargement
    setIsAuthenticated(AdminAuth.isAuthenticated());

    // Mettre à jour le temps restant toutes les minutes
    const interval = setInterval(() => {
      const remaining = AdminAuth.getRemainingTime();
      setRemainingTime(remaining);

      // Si la session a expiré, déconnecter
      if (remaining === 0 && isAuthenticated) {
        setIsAuthenticated(false);
      }
    }, 60000); // Vérifier toutes les minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setRemainingTime(AdminAuth.getRemainingTime());
  };

  const handleLogout = () => {
    AdminAuth.logout();
    setIsAuthenticated(false);
    setRemainingTime(0);
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const extendSession = () => {
    AdminAuth.extendSession();
    setRemainingTime(AdminAuth.getRemainingTime());
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header admin */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Administration - {ADMIN_CONFIG.garageName}
            </h1>
            <p className="text-sm text-gray-500">
              Gestion des demandes de contact et rendez-vous
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Temps de session restant */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Session: {formatTime(remainingTime)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={extendSession}
                className="text-xs"
              >
                Prolonger
              </Button>
            </div>

            {/* Bouton de déconnexion */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu admin */}
      <div className="max-w-7xl mx-auto p-4">
        <AdminPanel />
      </div>
    </div>
  );
}