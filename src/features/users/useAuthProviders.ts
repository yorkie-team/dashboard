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

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchAuthProviders, selectAuthProviders } from './usersSlice';
import { providerDisplayName } from './authProviders';

/**
 * `useAuthProviders` returns the login methods the server offers, fetching
 * them once per page load.
 */
export function useAuthProviders() {
  const dispatch = useAppDispatch();
  const authProviders = useAppSelector(selectAuthProviders);

  useEffect(() => {
    if (authProviders.status === 'idle') {
      dispatch(fetchAuthProviders());
    }
  }, [authProviders.status, dispatch]);

  return authProviders;
}

/**
 * `useProviderDisplayName` returns the name to show for the given auth
 * provider, or null for a local user.
 */
export function useProviderDisplayName(authProvider: string): string | null {
  const { providers } = useAuthProviders();
  return providerDisplayName(authProvider, providers);
}
