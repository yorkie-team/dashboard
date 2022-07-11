export type DocumentSummary = {
  id: string;
  key: string;
  snapshot: string;
  createdAt: number;
  accessedAt: number;
  updatedAt: number;
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

type fieldViolation = {
  field: string;
  description: string;
};

export type grpcStatus = {
  code: number;
  message: string;
  details: Array<fieldViolation>;
};

function validateName(name: string): boolean {
  const nameRegex = /^[A-Za-z0-9_.-]{2,30}$/g;
  if (!nameRegex.test(name)) {
    // TODO(DongjinS): Show error message more specifically.
    alert('Project Name can only contain letters, numbers, spaces and these characters: _.-');
    return false;
  }
  return true;
}

function validateAuthWebhookUrl(authWebhookUrl: string): boolean {
  // NOTE(DongjinS): regular expression copy from https://www.regextester.com/99895.
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g;
  if (!urlRegex.test(authWebhookUrl)) {
    alert('AuthWebhookUrl should fit the url format.');
    return false;
  }
  return true;
}

export function validateUpdatableProjectFields(fields: UpdatableProjectFields): boolean {
  if (typeof fields.name !== 'undefined' && !validateName(fields.name)) return false;
  if (
    typeof fields.authWebhookURL !== 'undefined' &&
    fields.authWebhookURL !== '' &&
    !validateAuthWebhookUrl(fields.authWebhookURL)
  )
    return false;

  return true;
}
