/// <reference types="vite/client" />

export const DEFAULT_BACKEND_URL = 'http://localhost:8080';

export function apiUrl(path: string) {
  const base = import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL;
  return `${base}${path.startsWith('/') ? path : '/' + path}`;
}
