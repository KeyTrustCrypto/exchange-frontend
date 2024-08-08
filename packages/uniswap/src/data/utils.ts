import CryptoJS from 'crypto-js';
import { config } from 'uniswap/src/config'
import { AuthData } from './types';

export const objectToQueryString = (obj: Record<string, string | number | boolean>): string => {
  return Object.entries(obj)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export function serializeQueryParams(params: Record<string, Parameters<typeof encodeURIComponent>[0] | undefined>): string {
  const queryString = []
  for (const [param, value] of Object.entries(params)) {
    if (value !== undefined) {
      queryString.push(`${encodeURIComponent(param)}=${encodeURIComponent(value)}`)
    }
  }
  return queryString.join('&')
}

export function createSignedHeaders<T>(
  data?: T,
): { headers: AuthData } {
  const payload = 'https://fiat-api.changelly.com' + JSON.stringify(data ?? {});
  const hash = CryptoJS.SHA256(payload);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  const headers = {
    'x-api-key': config.changellyApiPublicKey,
    'x-api-signature': signature,
  };
  return { headers };
}

