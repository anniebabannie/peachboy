// Centralized environment variable access
// Only include client-safe (VITE_) variables here.

export function getEnv() {
  const endpoint = requireEnv('VITE_AWS_ENDPOINT_URL_S3', 'https://example.invalid');
  const bucket = requireEnv('VITE_BUCKET_NAME', 'peachboy');
  const appName = import.meta.env.VITE_APP_NAME || 'Peach Boy';
  const s3Base = `${endpoint.replace(/\/$/, '')}/${bucket}`;
  return {
    AWS_ENDPOINT_URL_S3: endpoint,
    BUCKET_NAME: bucket,
    APP_NAME: appName,
    S3_BASE: s3Base,
  } as const;
}

export function requireEnv(name: string, fallback?: string): string {
  const value = (import.meta as any).env?.[name];
  if (value == null || value === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const ENV = getEnv();