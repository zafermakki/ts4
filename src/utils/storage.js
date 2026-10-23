const STORAGE_KEY = "nexora.auth.session.v1";

export function saveSession(session, rememberMe = false) {
  clearSession();

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...session,
      rememberMe,
    })
  );
}

export function getStoredSession() {
  try {
    const localSession = localStorage.getItem(STORAGE_KEY);

    if (localSession) {
      return JSON.parse(localSession);
    }

    const temporarySession = sessionStorage.getItem(STORAGE_KEY);

    if (temporarySession) {
      return JSON.parse(temporarySession);
    }

    return null;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
}