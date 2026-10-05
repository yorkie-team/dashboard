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

export type Presence = {
  [key: string]: string;
};

export type DocumentSummary = {
  id: string;
  key: string;
  root: string;
  presences?: { [key: string]: Presence };
  attachedClients: number;
  docSize?: DocSize;
  createdAt: number;
  accessedAt: number;
  updatedAt: number;
  schemaKey: string;
};

export type ChannelSummary = {
  key: string;
  sessionCount: number;
};

export type RevisionSummary = {
  id: string;
  label: string;
  description: string;
  snapshot: string;
  createdAt: number;
};

export type Schema = {
  id: string;
  name: string;
  version: number;
  body: string;
  createdAt: number;
};

export type User = {
  id: string;
  authProvider: string;
  username: string;
  createdAt: number;
};

export type Member = {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  role: string;
  invitedAt?: number;
};

export type Project = {
  id: string;
  name: string;
  authWebhookURL: string;
  authWebhookMethods: Array<AuthWebhookMethod>;
  eventWebhookURL: string;
  eventWebhookEvents?: Array<EventWebhookEvent>;
  clientDeactivateThreshold: string;
  channelSessionTtl: string;
  snapshotThreshold: number;
  snapshotInterval: number;
  maxSubscribersPerDocument: number;
  maxAttachmentsPerDocument: number;
  maxSizePerDocument: number;
  removeOnDetach: boolean;
  autoRevisionEnabled: boolean;
  allowedOrigins: Array<string>;
  publicKey: string;
  secretKey: string;
  createdAt: number;
};

export interface ProjectStats {
  documentsCount: number;
  clientsCount: number;
  channelsCount: number;
  activeUsersCount: number;
  activeUsers: Array<{
    timestamp: number;
    value: number;
  }>;
  activeDocumentsCount: number;
  activeDocuments: Array<{
    timestamp: number;
    value: number;
  }>;
  activeClientsCount: number;
  activeClients: Array<{
    timestamp: number;
    value: number;
  }>;
  activeChannelsCount: number;
  activeChannels: Array<{
    timestamp: number;
    value: number;
  }>;
  sessionsCount: number;
  sessions: Array<{
    timestamp: number;
    value: number;
  }>;
  peakSessionsPerChannelCount: number;
  peakSessionsPerChannel: Array<{
    timestamp: number;
    value: number;
  }>;
}

export const DATE_RANGE_OPTIONS = {
  oneweek: 'Last 7 days',
  fourweeks: 'Last 4 Weeks',
  threemonths: 'Last 3 Months',
  twelvemonths: 'Last 12 Months',
};

export type UpdatableProjectFields = {
  name?: string;
  authWebhookURL?: string;
  authWebhookMethods?: Array<AuthWebhookMethod>;
  eventWebhookURL?: string;
  eventWebhookEvents?: Array<EventWebhookEvent>;
  clientDeactivateThreshold?: string;
  channelSessionTtl?: string;
  snapshotThreshold?: number;
  snapshotInterval?: number;
  maxSubscribersPerDocument?: number;
  maxAttachmentsPerDocument?: number;
  maxSizePerDocument?: number;
  removeOnDetach?: boolean;
  autoRevisionEnabled?: boolean;
  allowedOrigins?: string;
};

// AuthWebhookMethod mirrors the server's AuthMethods() in api/types/auth_webhook.go.
export type AuthWebhookMethod =
  | 'ActivateClient'
  | 'DeactivateClient'
  | 'AttachDocument'
  | 'DetachDocument'
  | 'RemoveDocument'
  | 'PushPull'
  | 'Watch'
  | 'WatchDocument' // Deprecated: use Watch
  | 'WatchChannel' // Deprecated: use Watch
  | 'CreateRevision'
  | 'GetRevision'
  | 'ListRevisions'
  | 'RestoreRevision'
  | 'AttachChannel'
  | 'DetachChannel'
  | 'RefreshChannel'
  | 'PeekChannel'
  | 'Broadcast';

export type EventWebhookEvent = 'DocumentRootChanged';

// AUTH_WEBHOOK_METHOD_GROUPS lists the methods shown as toggles, grouped by the resource they act on.
// The deprecated aliases WatchDocument and WatchChannel are left out: the server matches them when
// Watch is enabled. A project that still stores them keeps them on save, since toggling only adds or
// removes the toggled method.
export const AUTH_WEBHOOK_METHOD_GROUPS: Array<{ label: string; methods: Array<AuthWebhookMethod> }> = [
  { label: 'Client', methods: ['ActivateClient', 'DeactivateClient'] },
  { label: 'Document', methods: ['AttachDocument', 'DetachDocument', 'RemoveDocument', 'PushPull', 'Watch'] },
  { label: 'Revision', methods: ['CreateRevision', 'GetRevision', 'ListRevisions', 'RestoreRevision'] },
  { label: 'Channel', methods: ['AttachChannel', 'DetachChannel', 'RefreshChannel', 'PeekChannel', 'Broadcast'] },
];

// AUTH_WEBHOOK_METHODS lists every method that has a toggle.
export const AUTH_WEBHOOK_METHODS: Array<AuthWebhookMethod> = AUTH_WEBHOOK_METHOD_GROUPS.flatMap(
  ({ methods }) => methods,
);

// toggleAuthWebhookMethod returns the given methods with method added or removed, keeping every
// other method, including ones without a toggle.
export function toggleAuthWebhookMethod(
  methods: Array<AuthWebhookMethod>,
  method: AuthWebhookMethod,
  enabled: boolean,
): Array<AuthWebhookMethod> {
  if (enabled) {
    return methods.includes(method) ? [...methods] : [...methods, method];
  }
  return methods.filter((m) => m !== method);
}

export const EVENT_WEBHOOK_EVENTS: Array<EventWebhookEvent> = ['DocumentRootChanged'];

export enum RPCStatusCode {
  OK = 0,
  CANCELLED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATA_LOSS = 15,
  UNAUTHENTICATED = 16,
}

export type APIErrorName = 'RPCError';
export type FieldViolation = {
  field: string;
  description: string;
};
export class RPCError extends Error {
  readonly name: APIErrorName;
  readonly code: string;
  readonly message: string;
  readonly details?: Array<FieldViolation>;
  constructor(code: string, message: string, details?: Array<FieldViolation>) {
    super(message);
    this.name = 'RPCError';
    this.code = code;
    this.message = message;
    if (details) this.details = details;
  }
}

export type DocSize = {
  live: DataSize;
  gc: DataSize;
};

export type DataSize = {
  data: number;
  meta: number;
};
