import { Timestamp as PbTimestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import { Project, DocumentSummary, AuthWebhookMethod, grpcStatus } from './types';

import { Project as PbProject, DocumentSummary as PbDocumentSummary } from './resources_pb';

import * as errorDetails from 'grpc-web-error-details';

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
    authWebhookURL: pbProject.getAuthWebhookUrl(),
    authWebhookMethods: pbProject.getAuthWebhookMethodsList() as Array<AuthWebhookMethod>,
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

export function fromError(
  error:
    | any
    | {
        metadata: {
          'grpc-status-details-bin'?: string;
        };
      }
    | {
        code?: number;
        message?: string;
      },
): grpcStatus {
  const [status, details] = errorDetails.statusFromError(error);
  if (!status || !details) {
    return error;
  }
  var res: grpcStatus = { code: status.getCode(), message: status.getMessage(), details: [] };
  for (const d of details) {
    if (d instanceof errorDetails.BadRequest) {
      for (const v of d.getFieldViolationsList()) {
        res.details.push({ field: v.getField(), description: v.getDescription() });
      }
    }
  }
  return res;
}
