const API_BASE_URL = "https://dummyjson.com";

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
    });
  } catch {
    const error = new Error(
      "Unable to connect to the server. Please check your internet connection."
    );

    error.status = 0;
    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      data.message || "Something went wrong. Please try again."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

function normalizeUser(user) {
  return {
    ...user,

    // Demo-only role mapping for the Role-Based Access bonus.
    // User ID 1 is treated as the admin account.
    role: user.id === 1 ? "admin" : "user",
  };
}

async function loginWithEmail(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  // DummyJSON's login endpoint expects a username.
  // First, find the username that belongs to the entered email.
  const query = new URLSearchParams({
    key: "email",
    value: normalizedEmail,
  });

  const result = await request(`/users/filter?${query.toString()}`);

  const matchedUser = result.users?.find(
    (user) => user.email?.toLowerCase() === normalizedEmail
  );

  if (!matchedUser) {
    const error = new Error(
      "No account was found with this email address."
    );

    error.status = 404;
    throw error;
  }

  // Authenticate using the username returned by DummyJSON.
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: matchedUser.username,
      password,
      expiresInMins: 30,
    }),
  });

  const { accessToken, refreshToken, ...userData } = data;

  return {
    accessToken,
    refreshToken,
    user: normalizeUser(userData),
  };
}

async function getCurrentUser(accessToken) {
  const user = await request("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return normalizeUser(user);
}

async function refreshSession(refreshToken) {
  return request("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
  });
}

const authService = {
  loginWithEmail,
  getCurrentUser,
  refreshSession,
};

export default authService;