/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
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

import { Document, OpSource, VersionVector } from '@yorkie-js/sdk';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { AdminService } from './yorkie/v1/admin_connect';
import { UpdatableProjectFields_AuthWebhookMethods as PbProjectFields_AuthWebhookMethods } from './yorkie/v1/resources_pb';
import { InterceptorBuilder } from './interceptor';
import {
  User,
  Project,
  DocumentSummary,
  UpdatableProjectFields,
  DocumentHistory,
  TIME_RANGE,
  RPCError,
  RPCStatusCode,
  ProjectStats,
} from './types';
import * as converter from './converter';

export * from './types';

const interceptor = new InterceptorBuilder();
const transport = createConnectTransport({
  baseUrl: import.meta.env.VITE_API_ADDR!,
  interceptors: [interceptor.createAuthInterceptor(), interceptor.createMetricInterceptor()],
  defaultTimeoutMs: 3000,
  credentials: 'include',
});

// TODO(hackerwins): Consider replacing ConnectRPC with Fetch API.
// For now, we use Fetch API for auth APIs and ConnectRPC for admin APIs.
// It is cumbersome to maintain two different APIs, so we should consider
// replacing ConnectRPC with Fetch API.
const client = createClient(AdminService, transport);

// fetchMe fetches the current user.
export async function fetchMe(): Promise<User> {
  const res = await fetch(`${import.meta.env.VITE_API_ADDR!}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new RPCError(String(RPCStatusCode.UNAUTHENTICATED), 'Login failed');
  }
  if (!res.ok) {
    throw new RPCError(String(RPCStatusCode.UNKNOWN), 'Unknown error');
  }

  return (await res.json()) as User;
}

// logIn logs in the user and returns a token.
export async function logIn(username: string, password: string): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_API_ADDR!}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

  if (res.status === 401) {
    throw new RPCError(String(RPCStatusCode.UNAUTHENTICATED), 'Login failed');
  }
  if (!res.ok) {
    throw new RPCError(String(RPCStatusCode.UNKNOWN), 'Unknown error');
  }
}

// logOut logs out the user.
export async function logOut(): Promise<void> {
  const res = await fetch(`${import.meta.env.VITE_API_ADDR!}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new RPCError(String(RPCStatusCode.UNKNOWN), 'Unknown error');
  }
}

// signUp signs up the user and returns a user.
export async function signUp(username: string, password: string): Promise<User> {
  const res = await client.signUp({ username, password });
  return converter.fromUser(res.user!);
}

// deleteAccount deletes the account.
export async function deleteAccount(username: string, password: string) {
  await client.deleteAccount({ username, password });
}

// changePassword changes the password.
export async function changePassword(username: string, password: string, newPassword: string) {
  await client.changePassword({ username, currentPassword: password, newPassword });
}

// createProject creates a new project.
export async function createProject(name: string): Promise<Project> {
  const res = await client.createProject({ name });
  return converter.fromProject(res.project!);
}

// listProjects fetches projects from the admin server.
export async function listProjects(): Promise<Array<Project>> {
  const res = await client.listProjects({});
  return converter.fromProjects(res.projects);
}

// getProject fetch project from the admin server.
export async function getProject(name: string): Promise<Project> {
  const res = await client.getProject({ name });
  return converter.fromProject(res.project!);
}

// UpdateProject updates a project info.
export async function updateProject(id: string, fields: UpdatableProjectFields): Promise<Project> {
  const pbFields = {
    name: fields.name,
    authWebhookUrl: fields.authWebhookURL,
    authWebhookMethods: fields.authWebhookMethods
      ? new PbProjectFields_AuthWebhookMethods({ methods: fields.authWebhookMethods })
      : undefined,
    clientDeactivateThreshold: fields.clientDeactivateThreshold,
    maxSubscribersPerDocument: Number(fields.maxSubscribersPerDocument),
  };
  const res = await client.updateProject({ id, fields: pbFields });
  return converter.fromProject(res.project!);
}

// listDocuments fetches documents from the admin server.
export async function listDocuments(
  projectName: string,
  previousID: string,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentSummary>> {
  const res = await client.listDocuments({
    projectName,
    previousId: previousID,
    pageSize,
    isForward,
  });
  const summaries = converter.fromDocumentSummaries(res.documents);
  if (isForward) {
    summaries.reverse();
  }
  return summaries;
}

// getDocument fetches a document of the given ID from the admin server.
export async function getDocument(projectName: string, documentKey: string): Promise<DocumentSummary> {
  const res = await client.getDocument({ projectName, documentKey });
  return converter.fromDocumentSummary(res.document!);
}

// searchDocuments fetches documents that match the query parameters.
export async function searchDocuments(
  projectName: string,
  documentQuery: string,
  pageSize: number,
): Promise<{
  totalCount: number;
  documents: Array<DocumentSummary>;
}> {
  const res = await client.searchDocuments({ projectName, query: documentQuery, pageSize });
  const summaries = converter.fromDocumentSummaries(res.documents);
  return {
    totalCount: res.totalCount,
    documents: summaries,
  };
}

// listDocumentHistories lists of changes for the given document.
export async function listDocumentHistories(
  projectName: string,
  documentKey: string,
  previousSeq: bigint,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentHistory>> {
  const res = await client.listChanges({
    projectName,
    documentKey,
    previousSeq,
    pageSize,
    isForward,
  });
  const pbChanges = res.changes;
  const changes = converter.fromChanges(pbChanges);

  const seq = pbChanges[0].id!.serverSeq - 1n;
  const snapshotMeta = await client.getSnapshotMeta({
    projectName,
    documentKey,
    serverSeq: seq,
  });

  const document = new Document(documentKey);
  document.applySnapshot(seq, new VersionVector(new Map()), snapshotMeta.snapshot);

  const histories: Array<DocumentHistory> = [];
  for (let i = 0; i < changes.length; i++) {
    document.applyChanges([changes[i]], OpSource.Remote);
    histories.push({
      serverSeq: pbChanges[i].id!.serverSeq,
      snapshot: document.toJSON(),
    });
  }
  return histories;
}

// removeDocumentByAdmin removes the document of the given document.
export async function removeDocumentByAdmin(
  projectName: string,
  documentKey: string,
  forceRemoveIfAttached: boolean = true,
): Promise<void> {
  await client.removeDocumentByAdmin({
    projectName,
    documentKey,
    force: forceRemoveIfAttached,
  });
}

export async function getProjectStats(projectID: string, range: keyof typeof TIME_RANGE): Promise<ProjectStats> {
  console.log(range);
  return { documentCount: 10, activeUsers: sampleData[range] };
}

const sampleData = {
  oneweek: [
    {
      timestamp: 1740668400000,
      value: 2,
    },
    {
      timestamp: 1740754800000,
      value: 1,
    },
    {
      timestamp: 1740841200000,
      value: 1,
    },
    {
      timestamp: 1741014000000,
      value: 8,
    },
    {
      timestamp: 1741100400000,
      value: 12,
    },
    {
      timestamp: 1741186800000,
      value: 14,
    },
    {
      timestamp: 1741273200000,
      value: 14,
    },
  ],
  onemonth: [
    {
      timestamp: 1738767600000,
      value: 0,
    },
    {
      timestamp: 1738854000000,
      value: 0,
    },
    {
      timestamp: 1738940400000,
      value: 0,
    },
    {
      timestamp: 1739026800000,
      value: 0,
    },
    {
      timestamp: 1739113200000,
      value: 0,
    },
    {
      timestamp: 1739199600000,
      value: 0,
    },
    {
      timestamp: 1739286000000,
      value: 0,
    },
    {
      timestamp: 1739372400000,
      value: 0,
    },
    {
      timestamp: 1739458800000,
      value: 0,
    },
    {
      timestamp: 1739545200000,
      value: 0,
    },
    {
      timestamp: 1739631600000,
      value: 0,
    },
    {
      timestamp: 1739718000000,
      value: 0,
    },
    {
      timestamp: 1739804400000,
      value: 0,
    },
    {
      timestamp: 1739890800000,
      value: 0,
    },
    {
      timestamp: 1739977200000,
      value: 0,
    },
    {
      timestamp: 1740063600000,
      value: 3,
    },
    {
      timestamp: 1740150000000,
      value: 1,
    },
    {
      timestamp: 1740236400000,
      value: 2,
    },
    {
      timestamp: 1740322800000,
      value: 10,
    },
    {
      timestamp: 1740409200000,
      value: 8,
    },
    {
      timestamp: 1740495600000,
      value: 23,
    },
    {
      timestamp: 1740582000000,
      value: 5,
    },
    {
      timestamp: 1740668400000,
      value: 8,
    },
    {
      timestamp: 1740754800000,
      value: 1,
    },
    {
      timestamp: 1740841200000,
      value: 1,
    },
    {
      timestamp: 1740927600000,
      value: 0,
    },
    {
      timestamp: 1741014000000,
      value: 8,
    },
    {
      timestamp: 1741100400000,
      value: 12,
    },
    {
      timestamp: 1741186800000,
      value: 14,
    },
    {
      timestamp: 1741273200000,
      value: 14,
    },
  ],
  threemonth: [
    {
      timestamp: 1738767600000,
      value: 0,
    },
    {
      timestamp: 1738854000000,
      value: 0,
    },
    {
      timestamp: 1738940400000,
      value: 0,
    },
    {
      timestamp: 1739026800000,
      value: 0,
    },
    {
      timestamp: 1739113200000,
      value: 0,
    },
    {
      timestamp: 1739199600000,
      value: 0,
    },
    {
      timestamp: 1739286000000,
      value: 0,
    },
    {
      timestamp: 1739372400000,
      value: 0,
    },
    {
      timestamp: 1739458800000,
      value: 0,
    },
    {
      timestamp: 1739545200000,
      value: 0,
    },
    {
      timestamp: 1739631600000,
      value: 0,
    },
    {
      timestamp: 1739718000000,
      value: 0,
    },
    {
      timestamp: 1739804400000,
      value: 0,
    },
    {
      timestamp: 1739890800000,
      value: 0,
    },
    {
      timestamp: 1739977200000,
      value: 0,
    },
    {
      timestamp: 1740063600000,
      value: 3,
    },
    {
      timestamp: 1740150000000,
      value: 1,
    },
    {
      timestamp: 1740236400000,
      value: 2,
    },
    {
      timestamp: 1740322800000,
      value: 10,
    },
    {
      timestamp: 1740409200000,
      value: 8,
    },
    {
      timestamp: 1740495600000,
      value: 23,
    },
    {
      timestamp: 1740582000000,
      value: 5,
    },
    {
      timestamp: 1740668400000,
      value: 8,
    },
    {
      timestamp: 1740754800000,
      value: 1,
    },
    {
      timestamp: 1740841200000,
      value: 1,
    },
    {
      timestamp: 1740927600000,
      value: 0,
    },
    {
      timestamp: 1741014000000,
      value: 8,
    },
    {
      timestamp: 1741100400000,
      value: 12,
    },
    {
      timestamp: 1741186800000,
      value: 14,
    },
    {
      timestamp: 1741273200000,
      value: 14,
    },
  ],
  twelvemonth: [
    {
      timestamp: 1738767600000,
      value: 0,
    },
    {
      timestamp: 1738854000000,
      value: 0,
    },
    {
      timestamp: 1738940400000,
      value: 0,
    },
    {
      timestamp: 1739026800000,
      value: 0,
    },
    {
      timestamp: 1739113200000,
      value: 0,
    },
    {
      timestamp: 1739199600000,
      value: 0,
    },
    {
      timestamp: 1739286000000,
      value: 0,
    },
    {
      timestamp: 1739372400000,
      value: 0,
    },
    {
      timestamp: 1739458800000,
      value: 0,
    },
    {
      timestamp: 1739545200000,
      value: 0,
    },
    {
      timestamp: 1739631600000,
      value: 0,
    },
    {
      timestamp: 1739718000000,
      value: 0,
    },
    {
      timestamp: 1739804400000,
      value: 0,
    },
    {
      timestamp: 1739890800000,
      value: 0,
    },
    {
      timestamp: 1739977200000,
      value: 0,
    },
    {
      timestamp: 1740063600000,
      value: 3,
    },
    {
      timestamp: 1740150000000,
      value: 1,
    },
    {
      timestamp: 1740236400000,
      value: 2,
    },
    {
      timestamp: 1740322800000,
      value: 10,
    },
    {
      timestamp: 1740409200000,
      value: 8,
    },
    {
      timestamp: 1740495600000,
      value: 23,
    },
    {
      timestamp: 1740582000000,
      value: 5,
    },
    {
      timestamp: 1740668400000,
      value: 8,
    },
    {
      timestamp: 1740754800000,
      value: 1,
    },
    {
      timestamp: 1740841200000,
      value: 1,
    },
    {
      timestamp: 1740927600000,
      value: 0,
    },
    {
      timestamp: 1741014000000,
      value: 8,
    },
    {
      timestamp: 1741100400000,
      value: 12,
    },
    {
      timestamp: 1741186800000,
      value: 14,
    },
    {
      timestamp: 1741273200000,
      value: 14,
    },
  ],
};
