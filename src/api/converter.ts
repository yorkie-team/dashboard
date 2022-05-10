import { Project, DocumentSummary } from './types';

import {
  Project as PbProject,
  DocumentSummary as PbDocumentSummary,
} from './resources_pb';

export function fromProjectSummaries(
  pbProjects: Array<PbProject>,
): Array<Project> {
  const projects: Array<Project> = [];

  for (const pbProject of pbProjects) {
    const timestamp = pbProject.getCreatedAt();

    projects.push({
      id: pbProject.getId(),
      name: pbProject.getName(),
      publicKey: pbProject.getPublicKey(),
      secretKey: pbProject.getSecretKey(),
      createdAt: timestamp?.getSeconds() * 1000 + timestamp?.getNanos() / 1e6,
    });
  }

  return projects;
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
