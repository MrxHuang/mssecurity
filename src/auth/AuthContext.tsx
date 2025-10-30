import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth, googleProvider, githubProvider, microsoftProvider } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  token: string | null;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🎬 Iniciando listener de autenticación...');
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      console.log('🔍 Estado de autenticación cambió:', u ? '✅ Autenticado' : '❌ No autenticado');
      if (u) {
        console.log('👤 Usuario detectado:', {
          email: u.email,
          uid: u.uid,
          displayName: u.displayName,
          photoURL: u.photoURL,
          providerId: u.providerId,
          providerData: u.providerData
        });
      }
      setUser(u);
      if (u) {
        try {
          const idToken = await u.getIdToken();
          console.log('🎟️ Token obtenido en listener');
          setToken(idToken);
          localStorage.setItem('authToken', idToken);
        } catch (error) {
          console.error('❌ Error obteniendo token:', error);
        }
      } else {
        setToken(null);
        try {
          localStorage.removeItem('authToken');
        } catch {}
      }
      setLoading(false);
      console.log('✅ Estado actualizado - loading:', false, 'user:', u ? 'presente' : 'null');
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    console.log('🚀 Iniciando login con Google (popup)...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Login exitoso:', result.user.email);
    } catch (error: any) {
      console.error('❌ Error en loginWithGoogle:', error);
      if (error.code === 'auth/popup-blocked') {
        alert('Por favor, permite popups en tu navegador para iniciar sesión.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log('⚠️ Usuario cerró el popup');
      } else {
        alert(`Error: ${error.message}`);
      }
      throw error;
    }
  };
  const loginWithGithub = async () => {
    console.log('🚀 Iniciando login con GitHub (popup)...');
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log('✅ Login exitoso:', result.user.email);
    } catch (error: any) {
      console.error('❌ Error en loginWithGithub:', error);
      if (error.code === 'auth/popup-blocked') {
        alert('Por favor, permite popups en tu navegador para iniciar sesión.');
      }
      throw error;
    }
  };
  const loginWithMicrosoft = async () => {
    console.log('🚀 Iniciando login con Microsoft (popup)...');
    console.log('📋 Provider configurado:', microsoftProvider);
    try {
      console.log('⏳ Esperando respuesta del popup...');
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log('✅ Respuesta recibida del popup');
      console.log('👤 Usuario:', result.user);
      console.log('📧 Email:', result.user.email);
      console.log('🆔 UID:', result.user.uid);
      console.log('🔑 Provider ID:', result.providerId);
      
      // Obtener el token
      const token = await result.user.getIdToken();
      console.log('🎟️ Token obtenido (primeros 20 chars):', token.substring(0, 20) + '...');
      
      console.log('✅ Login con Microsoft completado exitosamente');
    } catch (error: any) {
      console.error('❌ Error en loginWithMicrosoft:', error);
      console.error('🔍 Objeto completo del error:', error);
      console.error('📌 Código de error:', error.code);
      console.error('📝 Mensaje:', error.message);
      console.error('📚 Stack:', error.stack);
      
      if (error.code === 'auth/popup-blocked') {
        alert('Por favor, permite popups en tu navegador para iniciar sesión con Microsoft.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        console.log('⚠️ Usuario cerró el popup de Microsoft');
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('⚠️ Popup cancelado - se abrió otro popup');
      } else if (error.code === 'auth/unauthorized-domain') {
        alert('Error: Este dominio no está autorizado en Firebase. Añade el dominio en la consola de Firebase.');
      } else if (error.code === 'auth/operation-not-allowed') {
        alert('Error: El proveedor de Microsoft no está habilitado en Firebase. Por favor, habilítalo en la consola de Firebase.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        alert('Esta cuenta ya existe con otro proveedor (Google o GitHub). Por favor, usa el mismo método de inicio de sesión.');
      } else if (error.code === 'auth/invalid-credential') {
        // Verificar si es el error específico de secreto inválido
        if (error.message.includes('AADSTS7000215') || error.message.includes('Invalid client secret')) {
          alert('⚠️ Error de configuración de Microsoft:\n\n' +
                'El "Client Secret" configurado en Firebase es incorrecto.\n\n' +
                'SOLUCIÓN:\n' +
                '1. Ve a Firebase Console → Authentication → Sign-in method → Microsoft\n' +
                '2. En Azure AD, copia el "Value" (NO el "Secret ID")\n' +
                '3. Pégalo en Firebase como "Application client secret"\n' +
                '4. Guarda los cambios');
        } else {
          alert(`Credenciales inválidas: ${error.message}`);
        }
      } else {
        alert(`Error al iniciar sesión con Microsoft: ${error.message}`);
      }
      throw error;
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    token,
    loginWithGoogle,
    loginWithGithub,
    loginWithMicrosoft,
    logout,
  }), [user, loading, token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}


