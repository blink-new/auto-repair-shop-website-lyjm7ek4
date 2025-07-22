import { ADMIN_CONFIG } from '@/config/admin';

// Service d'authentification admin simple
export class AdminAuth {
  private static readonly ADMIN_PASSWORD = ADMIN_CONFIG.password;
  private static readonly SESSION_KEY = 'garage_admin_session';
  private static readonly SESSION_DURATION = ADMIN_CONFIG.sessionDuration * 60 * 60 * 1000; // Heures en millisecondes

  static login(password: string): boolean {
    if (password === this.ADMIN_PASSWORD) {
      const session = {
        timestamp: Date.now(),
        expires: Date.now() + this.SESSION_DURATION
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static isAuthenticated(): boolean {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const now = Date.now();

      // Vérifier si la session n'a pas expiré
      if (now > session.expires) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  static getRemainingTime(): number {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return 0;

      const session = JSON.parse(sessionData);
      const remaining = session.expires - Date.now();
      return Math.max(0, remaining);
    } catch {
      return 0;
    }
  }

  static extendSession(): void {
    if (this.isAuthenticated()) {
      const session = {
        timestamp: Date.now(),
        expires: Date.now() + this.SESSION_DURATION
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
  }
}