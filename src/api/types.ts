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

export type DocumentSummary = {
  id: string;
  key: string;
  snapshot: string;
  createdAt: number;
  accessedAt: number;
  updatedAt: number;
};

export type DocumentHistory = {
  serverSeq: string;
  snapshot: string;
};

export type User = {
  id: string;
  username: string;
  createdAt: number;
};

export type Project = {
  id: string;
  name: string;
  authWebhookURL: string;
  authWebhookMethods: Array<AuthWebhookMethod>;
  publicKey: string;
  secretKey: string;
  createdAt: number;
};

export type UpdatableProjectFields = {
  name?: string;
  authWebhookURL?: string;
  authWebhookMethods?: Array<AuthWebhookMethod>;
};

export type AuthWebhookMethod =
  | 'ActivateClient'
  | 'DeactivateClient'
  | 'AttachDocument'
  | 'DetachDocument'
  | 'PushPull'
  | 'WatchDocuments'
  | 'ListChangeSummaries';

export const AUTH_WEBHOOK_METHODS: Array<AuthWebhookMethod> = [
  'ActivateClient',
  'DeactivateClient',
  'AttachDocument',
  'DetachDocument',
  'PushPull',
  'WatchDocuments',
  'ListChangeSummaries',
];

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
