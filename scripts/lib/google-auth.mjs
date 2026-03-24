import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/business.manage',
];

let _authClient = null;

/**
 * Get an authenticated Google API client using a service account key file.
 * Caches the client after first initialization.
 */
export async function getAuthClient() {
  if (_authClient) return _authClient;

  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || './scripts/credentials/service-account.json';
  const absPath = resolve(keyPath);

  let keyFile;
  try {
    keyFile = JSON.parse(readFileSync(absPath, 'utf-8'));
  } catch (err) {
    console.error(`\n  Failed to read service account key at: ${absPath}`);
    console.error('  Download your key from Google Cloud Console and save it there.\n');
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: SCOPES,
  });

  _authClient = await auth.getClient();
  google.options({ auth: _authClient });

  return _authClient;
}

/**
 * Get the API key for unauthenticated / simple requests (e.g. GBP reads).
 */
export function getApiKey() {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    console.error('\n  GOOGLE_API_KEY is not set in .env\n');
    process.exit(1);
  }
  return key;
}
