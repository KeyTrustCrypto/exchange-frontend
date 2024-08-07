import * as crypto from 'crypto';
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
  const privateKeyObject = crypto.createPrivateKey({
    key: config.changellyApiPrivateKey,
    type: 'pkcs1',
    format: 'pem',
    encoding: 'base64',
  });

  const path = config.changellyApiUrl
  const payload = path + JSON.stringify(data ?? {});
  const payloadArrayBuffer = Buffer.from(payload, 'utf-8').buffer;
  const payloadUint8Array = new Uint8Array(payloadArrayBuffer);

  const signature = crypto.sign('sha256', payloadUint8Array, privateKeyObject).toString('base64');
  const headers = {
    'x-api-key': config.changellyApiPublicKey,
    'x-api-signature': signature,
  }
  return { headers }
}

