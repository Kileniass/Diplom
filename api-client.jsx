// api-client.jsx - tiny shared API helper

window.API_BASE = window.API_BASE || window.location.origin;

async function apiRequest(path, options = {}) {
  const isFormDataBody = options.body instanceof FormData;
  const response = await fetch(`${window.API_BASE}${path}`, {
    headers: {
      ...(isFormDataBody ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `HTTP ${response.status}`);
  }

  return response.json();
}

window.apiRequest = apiRequest;
