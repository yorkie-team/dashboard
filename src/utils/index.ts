export * from './create-safe-context';
export * from './is-element';
export * from './merge-refs';

// setCookie sets new cookie key-value pair.
export function setCookie(key: string, value: string, domain: string, path: string = '/') {
  document.cookie = `${key}=${value};domain=${domain};path=${path}`;
}

// getCookie returns corresponding cookie value to key parameter.
export function getCookie(key: string): string | undefined {
  if (document.cookie === '') {
    return undefined;
  }
  const cookies = document.cookie.split(';').map(pair =>
    pair.split('=').map(value => value.trim())
  );
  const cookie = cookies.find(cookie => cookie[0] === key);
  return cookie ? cookie[1] : undefined;
}

// deleteCookie deletes corresponding cookie key-value pair.
export function deleteCookie(key: string, domain: string, path: string = '/') {
  document.cookie = `${key}=;domain=${domain};path=${path};max-age=0`;
}
