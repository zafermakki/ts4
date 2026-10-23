import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService";

import {
  clearSession,
  getStoredSession,
  saveSession,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const result = await authService.loginWithEmail(email, password);

    const session = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    };

    saveSession(session, rememberMe);

    setUser(result.user);
    setAccessToken(result.accessToken);

    return result.user;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const savedSession = getStoredSession();

      if (!savedSession?.accessToken) {
        setLoading(false);
        return;
      }

      let currentAccessToken = savedSession.accessToken;
      let currentRefreshToken = savedSession.refreshToken;
      let currentUser;

      try {
        try {
          // Verify that the stored access token is still valid.
          currentUser = await authService.getCurrentUser(
            currentAccessToken
          );
        } catch (error) {
          const tokenExpired =
            error.status === 401 || error.status === 403;

          if (!tokenExpired || !currentRefreshToken) {
            throw error;
          }

          // Obtain fresh tokens and verify the new access token.
          const refreshed = await authService.refreshSession(
            currentRefreshToken
          );

          currentAccessToken = refreshed.accessToken;
          currentRefreshToken = refreshed.refreshToken;

          currentUser = await authService.getCurrentUser(
            currentAccessToken
          );
        }

        if (cancelled) return;

        const updatedSession = {
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
          user: currentUser,
        };

        saveSession(updatedSession, savedSession.rememberMe);

        setAccessToken(currentAccessToken);
        setUser(currentUser);
      } catch (error) {
        if (cancelled) return;

        // If the network is unavailable, retain an existing cached
        // session temporarily rather than treating connectivity as
        // proof that the token is invalid.
        if (error.status === 0 && savedSession.user) {
          setAccessToken(savedSession.accessToken);
          setUser(savedSession.user);
        } else {
          clearSession();
          setAccessToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}