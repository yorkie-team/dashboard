import { ProjectSummary, DocumentSummary } from './types';

import {
  Project as PbProjectSummary,
  DocumentSummary as PbDocumentSummary,
} from './resources_pb';

export function fromProjectSummaries(
  pbProjectSummaries: Array<PbProjectSummary>,
): Array<ProjectSummary> {
  const projectSummaries: Array<ProjectSummary> = [];

  for (const pbProjectSummary of pbProjectSummaries) {
    const timestamp = pbProjectSummary.getCreatedAt();
    const date = timestamp
      ? new Date(
          timestamp?.getSeconds() * 1000 + timestamp?.getNanos() / 1e6,
        ).toString()
      : '';

    projectSummaries.push({
      id: pbProjectSummary.getId(),
      name: pbProjectSummary.getName(),
      publicKey: pbProjectSummary.getPublicKey(),
      secretKey: pbProjectSummary.getSecretKey(),
      createdAt: date,
    });
  }

  return projectSummaries;
}

export function fromDocumentSummary(
  pbDocumentSummary: PbDocumentSummary,
): DocumentSummary {
  return {
    id: pbDocumentSummary.getId(),
    key: pbDocumentSummary.getKey()!,
    snapshot: pbDocumentSummary.getSnapshot(),
  };
}

export function fromDocumentSummaries(
  pbDocumentSummaries: Array<PbDocumentSummary>,
): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push(fromDocumentSummary(pbDocumentSummary));
  }

  return documentSummaries;
}
