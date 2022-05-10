import { Project, DocumentSummary } from './types';

import {
  Project as PbProject,
  DocumentSummary as PbDocumentSummary,
} from './resources_pb';

export function fromProject(pbProject: PbProject): Project {
  const timestamp = pbProject.getCreatedAt();

  return {
    id: pbProject.getId(),
    name: pbProject.getName(),
    publicKey: pbProject.getPublicKey(),
    secretKey: pbProject.getSecretKey(),
    createdAt: timestamp?.getSeconds() * 1000 + timestamp?.getNanos() / 1e6,
  };
}

export function fromProjects(pbProjects: Array<PbProject>): Array<Project> {
  const projects: Array<Project> = [];

  for (const pbProject of pbProjects) {
    projects.push(fromProject(pbProject));
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
