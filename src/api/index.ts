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
import {
  UpdatableProjectFields_AuthWebhookMethods as PbProjectFields_AuthWebhookMethods,
  UpdatableProjectFields_EventWebhookEvents as PbProjectFields_EventWebhookEvents,
  UpdatableProjectFields_AllowedOrigins as PbProjectFields_AllowedOrigins,
} from './yorkie/v1/resources_pb';
import { InterceptorBuilder } from './interceptor';
import {
  User,
  Project,
  DocumentSummary,
  UpdatableProjectFields,
  DocumentHistory,
  DATE_RANGE_OPTIONS,
  RPCError,
  RPCStatusCode,
  ProjectStats,
  Schema,
  RevisionSummary,
} from './types';
import * as converter from './converter';
import { Rule } from '@yorkie-js/schema';

export * from './types';

// Export the interceptor instance so it can be used elsewhere
const interceptor = new InterceptorBuilder();
export { interceptor };

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

// logIn logs in the user.
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
    eventWebhookUrl: fields.eventWebhookURL,
    eventWebhookEvents: fields.eventWebhookEvents
      ? new PbProjectFields_EventWebhookEvents({ events: fields.eventWebhookEvents })
      : undefined,
    clientDeactivateThreshold: fields.clientDeactivateThreshold,
    snapshotThreshold: fields.snapshotThreshold ? BigInt(fields.snapshotThreshold) : undefined,
    snapshotInterval: fields.snapshotInterval ? BigInt(fields.snapshotInterval) : undefined,
    maxSubscribersPerDocument: fields.maxSubscribersPerDocument,
    maxAttachmentsPerDocument: fields.maxAttachmentsPerDocument,
    maxSizePerDocument: fields.maxSizePerDocument,
    removeOnDetach: fields.removeOnDetach && Boolean(fields.removeOnDetach),
    allowedOrigins: fields.allowedOrigins
      ? new PbProjectFields_AllowedOrigins({ origins: fields.allowedOrigins.split(',') })
      : undefined,
  };
  const res = await client.updateProject({ id, fields: pbFields });
  return converter.fromProject(res.project!);
}

// listDocuments fetches documents from the admin server.
export async function listDocuments(
  previousID: string,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentSummary>> {
  const res = await client.listDocuments({
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
export async function getDocument(documentKey: string): Promise<DocumentSummary> {
  const res = await client.getDocument({ documentKey });
  return converter.fromDocumentSummary(res.document!);
}

// searchDocuments fetches documents that match the query parameters.
export async function searchDocuments(
  documentQuery: string,
  pageSize: number,
): Promise<{
  totalCount: number;
  documents: Array<DocumentSummary>;
}> {
  const res = await client.searchDocuments({ query: documentQuery, pageSize });
  const summaries = converter.fromDocumentSummaries(res.documents);
  return {
    totalCount: res.totalCount,
    documents: summaries,
  };
}

// listDocumentHistories lists of changes for the given document.
export async function listDocumentHistories(
  documentKey: string,
  previousSeq: bigint,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentHistory>> {
  const res = await client.listChanges({
    documentKey,
    previousSeq,
    pageSize,
    isForward,
  });
  const pbChanges = res.changes;
  const changes = converter.fromChanges(pbChanges);

  const seq = pbChanges[0].id!.serverSeq - 1n;
  const snapshotMeta = await client.getSnapshotMeta({
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
export async function removeDocumentByAdmin(documentKey: string, forceRemoveIfAttached: boolean = true): Promise<void> {
  await client.removeDocumentByAdmin({
    documentKey,
    force: forceRemoveIfAttached,
  });
}

// getProjectStats fetches the project stats.
export async function getProjectStats(range: keyof typeof DATE_RANGE_OPTIONS): Promise<ProjectStats> {
  const dateRange = converter.toDateRange(range);
  const res = await client.getProjectStats({ dateRange });
  const activeUsers = res.activeUsers.map((point) => {
    return {
      // NOTE(hackerwins): Number can safely represent dates for +285,616 years.
      // Millisecond precision loss is acceptable for daily stats.
      timestamp: Number(point.timestamp),
      value: point.value,
    };
  });

  return {
    documentsCount: Number(res.documentsCount),
    clientsCount: Number(res.clientsCount),
    activeUsersCount: res.activeUsersCount,
    activeUsers: activeUsers,
  };
}

// createSchema creates a new schema.
export async function createSchema(name: string, version: number, body: string, rules: Array<Rule>): Promise<Schema> {
  const res = await client.createSchema({
    schemaName: name,
    schemaVersion: version,
    schemaBody: body,
    rules,
  });

  return converter.fromSchema(res.schema!);
}

// listSchemas fetches schemas of the given project.
export async function listSchemas(): Promise<Array<Schema>> {
  const res = await client.listSchemas({});
  return converter.fromSchemas(res.schemas);
}

// getSchema fetches a schema by the given schema name and version.
export async function getSchema(schemaName: string, version: number): Promise<Schema> {
  const res = await client.getSchema({
    schemaName,
    version,
  });
  return converter.fromSchema(res.schema!);
}

// getSchemas fetches schemas by the given schema name.
export async function getSchemas(schemaName: string): Promise<Array<Schema>> {
  const res = await client.getSchemas({
    schemaName,
  });
  return converter.fromSchemas(res.schemas);
}

// removeSchema removes the schema of the given schema name and version.
export async function removeSchema(schemaName: string, version: number): Promise<void> {
  await client.removeSchema({
    schemaName,
    version,
  });
}

// rotateProjectKeys rotates the API keys of the project.
export async function rotateProjectKeys(projectId: string): Promise<Project> {
  const res = await client.rotateProjectKeys({ id: projectId });
  return converter.fromProject(res.project!);
}

// listRevisions fetches revisions for the given document.
export async function listRevisions(
  projectName: string,
  documentKey: string,
  pageSize: number,
  offset: number,
  isForward: boolean,
): Promise<{
  revisions: Array<RevisionSummary>;
  totalCount: number;
}> {
  const res = await client.listRevisionsByAdmin({
    projectName,
    documentKey,
    pageSize,
    offset,
    isForward,
  });

  return {
    revisions: converter.fromRevisionSummaries(res.revisions),
    totalCount: res.totalCount,
  };
}

// getRevision fetches a specific revision by ID.
export async function getRevision(
  projectName: string,
  documentKey: string,
  revisionId: string,
): Promise<RevisionSummary> {
  const res = await client.getRevisionByAdmin({
    projectName,
    documentKey,
    revisionId,
  });

  return converter.fromRevisionSummary(res.revision!);
}

// restoreRevision restores a document to a specific revision.
export async function restoreRevision(projectName: string, documentKey: string, revisionId: string): Promise<void> {
  await client.restoreRevisionByAdmin({
    projectName,
    documentKey,
    revisionId,
  });
}
