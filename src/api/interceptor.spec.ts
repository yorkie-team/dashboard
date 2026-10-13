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

import { describe, it, expect } from 'vitest';
import { InterceptorBuilder, ProjectNameHeader } from './interceptor';

const send = async (builder: InterceptorBuilder, method: string): Promise<Headers> => {
  const header = new Headers();
  const req = { url: `https://api.yorkie.dev/yorkie.v1.AdminService/${method}`, header };
  const next = async () => ({}) as any;
  await builder.createAuthInterceptor()(next)(req as any);
  return header;
};

describe('InterceptorBuilder.createAuthInterceptor', () => {
  it('authenticates project-scoped calls with the secret key when one is given', async () => {
    const builder = new InterceptorBuilder();
    builder.setProject('my-project', 'secret');

    const header = await send(builder, 'ListDocuments');
    expect(header.get('authorization')).toBe('API-Key secret');
    expect(header.get(ProjectNameHeader)).toBeNull();
  });

  it('names the project instead when the role cannot read the secret key', async () => {
    const builder = new InterceptorBuilder();
    builder.setProject('my-project', '');

    const header = await send(builder, 'ListDocuments');
    expect(header.get('authorization')).toBeNull();
    expect(header.get(ProjectNameHeader)).toBe('my-project');
  });

  it('drops the previous project credential when switching projects', async () => {
    const builder = new InterceptorBuilder();
    builder.setProject('admin-project', 'secret');
    builder.setProject('member-project', '');

    const toMember = await send(builder, 'ListDocuments');
    expect(toMember.get('authorization')).toBeNull();
    expect(toMember.get(ProjectNameHeader)).toBe('member-project');

    builder.setProject('admin-project', 'secret');
    const toAdmin = await send(builder, 'ListDocuments');
    expect(toAdmin.get('authorization')).toBe('API-Key secret');
    expect(toAdmin.get(ProjectNameHeader)).toBeNull();
  });

  it('leaves user-scoped calls and cleared projects untouched', async () => {
    const builder = new InterceptorBuilder();
    builder.setProject('my-project', 'secret');

    const userScoped = await send(builder, 'GetProject');
    expect(userScoped.get('authorization')).toBeNull();
    expect(userScoped.get(ProjectNameHeader)).toBeNull();

    builder.clearProject();
    const cleared = await send(builder, 'ListDocuments');
    expect(cleared.get('authorization')).toBeNull();
    expect(cleared.get(ProjectNameHeader)).toBeNull();
  });
});
