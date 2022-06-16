import { Timestamp as PbTimestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Project, DocumentSummary } from './types';

import { Project as PbProject, DocumentSummary as PbDocumentSummary } from './resources_pb';

export function fromTimestamp(pbTimestamp: PbTimestamp): number {
  return pbTimestamp.getSeconds() + pbTimestamp.getNanos() / 1e9;
}

export function fromProject(pbProject: PbProject): Project {
  return {
    id: pbProject.getId(),
    name: pbProject.getName(),
    publicKey: pbProject.getPublicKey(),
    secretKey: pbProject.getSecretKey(),
    createdAt: fromTimestamp(pbProject.getCreatedAt()!),
    authWebhookUrl: pbProject.getAuthWebhookUrl(),
    authWebhookMethods: pbProject.getAuthWebhookMethodsList(),
  };
}

export function fromProjects(pbProjects: Array<PbProject>): Array<Project> {
  const projects: Array<Project> = [];

  for (const pbProject of pbProjects) {
    projects.push(fromProject(pbProject));
  }

  return projects;
}

export function fromDocumentSummary(pbDocumentSummary: PbDocumentSummary): DocumentSummary {
  return {
    id: pbDocumentSummary.getId(),
    key: pbDocumentSummary.getKey()!,
    snapshot: pbDocumentSummary.getSnapshot(),
    createdAt: fromTimestamp(pbDocumentSummary.getCreatedAt()!),
    accessedAt: fromTimestamp(pbDocumentSummary.getAccessedAt()!),
    updatedAt: fromTimestamp(pbDocumentSummary.getUpdatedAt()!),
  };
}

export function fromDocumentSummaries(pbDocumentSummaries: Array<PbDocumentSummary>): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push(fromDocumentSummary(pbDocumentSummary));
  }

  return documentSummaries;
}
