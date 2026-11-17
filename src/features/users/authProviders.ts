/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AuthProviderInfo, AuthProviders } from 'api/types';

const githubProvider: AuthProviderInfo = {
  name: 'github',
  displayName: 'GitHub',
  loginPath: '/auth/github/login',
};

// externalAuthProviderPrefix prefixes the auth provider of users signed in by
// an external provider, as in "external:<name>".
const externalAuthProviderPrefix = 'external:';

/**
 * `isEnabled` reads a boolean build variable. Any value but empty, `false`
 * or `0` enables it, so deployments that set `1` or `yes` keep working.
 */
export function isEnabled(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized !== '' && normalized !== 'false' && normalized !== '0';
}

/**
 * `isAuthProviders` reports whether the given `/auth/providers` body has the
 * shape the login page reads, so a malformed answer falls back instead of
 * breaking the page.
 */
export function isAuthProviders(body: unknown): body is AuthProviders {
  if (typeof body !== 'object' || body === null) return false;
  const { passwordLogin, providers } = body as Record<string, unknown>;
  return (
    typeof passwordLogin === 'boolean' &&
    Array.isArray(providers) &&
    providers.every(
      (provider) =>
        typeof provider === 'object' &&
        provider !== null &&
        typeof provider.name === 'string' &&
        typeof provider.displayName === 'string' &&
        typeof provider.loginPath === 'string',
    )
  );
}

/**
 * `fallbackAuthProviders` returns the login methods to offer when the server
 * does not answer `/auth/providers`, as servers before it do not: password
 * login, and GitHub when the build enables it.
 */
export function fallbackAuthProviders(githubAuthEnabled: string | undefined): AuthProviders {
  return {
    passwordLogin: true,
    providers: isEnabled(githubAuthEnabled) ? [githubProvider] : [],
  };
}

/**
 * `providerDisplayName` returns the name to show for the auth provider of a
 * user, or null for a local user. Providers are matched by login path, since
 * an external provider may share its name with GitHub. A provider the server
 * no longer lists is shown by its name.
 */
export function providerDisplayName(authProvider: string, providers: Array<AuthProviderInfo>): string | null {
  if (!authProvider) return null;

  const isExternal = authProvider.startsWith(externalAuthProviderPrefix);
  const name = isExternal ? authProvider.slice(externalAuthProviderPrefix.length) : authProvider;
  const loginPath = isExternal ? `/auth/external/${name}/login` : `/auth/${name}/login`;
  const listed = providers.find((provider) => provider.loginPath === loginPath);
  if (listed) return listed.displayName;
  if (authProvider === githubProvider.name) return githubProvider.displayName;
  return name;
}
