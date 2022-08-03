export type DocumentSummary = {
  id: string;
  key: string;
  snapshot: string;
  createdAt: number;
  accessedAt: number;
  updatedAt: number;
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

type FieldViolation = {
  field: string;
  description: string;
};

export type ErrorWithDetails = {
  message: string;
  code: number;
  details: Array<FieldViolation>;
};
