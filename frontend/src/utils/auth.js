/**
 * Checks if a JWT token is expired.
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is expired or invalid, false otherwise.
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const { exp } = JSON.parse(jsonPayload);
    if (!exp) return false;

    // Check if current time is past the expiry time
    // exp is in seconds, Date.now() is in milliseconds
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Note: isAuthenticated() based on localStorage is deprecated.
 * Authentication state is now managed via AuthContext and in-memory access token.
 */
