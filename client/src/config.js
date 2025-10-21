// Centralized backend URL resolver to avoid hardcoding and prevent network errors
// Prefers Vite env, falls back to window origin-based heuristics

export function getBackendBaseUrl() {
  const envUrl = import.meta?.env?.VITE_BACKEND_URL;
  const { hostname } = window.location;

  if (envUrl && typeof envUrl === 'string' && envUrl.startsWith('http')) {
    // If env points to localhost but the app is not on localhost, ignore it to avoid broken prod calls
    const isEnvLocalhost = /:\/\/localhost(?::\d+)?/.test(envUrl) || /:\/\/127\.0\.0\.1(?::\d+)?/.test(envUrl);
    const isAppLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isEnvLocalhost && !isAppLocalhost) {
      return 'https://dearregards.onrender.com';
    }
    return envUrl.replace(/\/$/, '');
  }

  // Fallbacks for common dev setups
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // Default to production API domain if nothing else is configured
  return 'https://dearregards.onrender.com';
}

export function api(path) {
  return `${getBackendBaseUrl()}${path.startsWith('/') ? '' : '/'}${path}`;
}


