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

import {
  DataSize,
  DATE_RANGE_OPTIONS,
  DocSize,
  Presence,
  Schema,
  RevisionSummary,
  ChannelSummary,
  Member,
} from './types';
import { Timestamp as PbTimestamp } from '@bufbuild/protobuf';
import { User, Project, DocumentSummary, AuthWebhookMethod, EventWebhookEvent, FieldViolation } from './types';
import { Change, converter, Indexable } from '@yorkie-js/sdk';
import {
  User as PbUser,
  Project as PbProject,
  Member as PbMember,
  DocumentSummary as PbDocumentSummary,
  ChannelSummary as PbChannelSummary,
  DataSize as PbDataSize,
  DocSize as PbDocSize,
  Schema as PbSchema,
  Change as PbChange,
  RevisionSummary as PbRevisionSummary,
} from './yorkie/v1/resources_pb';
import { GetProjectStatsRequest_DateRange as PbDateRange } from './yorkie/v1/admin_pb';
import { ConnectError } from '@connectrpc/connect';
import { BadRequest } from '@buf/googleapis_googleapis.bufbuild_es/google/rpc/error_details_pb';

export function fromTimestamp(pbTimestamp: PbTimestamp): number {
  return pbTimestamp.toDate().getTime() / 1000;
}

export function fromUser(pbUser: PbUser): User {
  return {
    id: pbUser.id,
    authProvider: pbUser.authProvider,
    username: pbUser.username,
    createdAt: fromTimestamp(pbUser.createdAt!),
  };
}

export function fromProject(pbProject: PbProject): Project {
  return {
    id: pbProject.id,
    name: pbProject.name,
    publicKey: pbProject.publicKey,
    secretKey: pbProject.secretKey,
    createdAt: fromTimestamp(pbProject.createdAt!),
    authWebhookURL: pbProject.authWebhookUrl,
    authWebhookMethods: pbProject.authWebhookMethods as Array<AuthWebhookMethod>,
    eventWebhookURL: pbProject.eventWebhookUrl,
    eventWebhookEvents: pbProject.eventWebhookEvents as Array<EventWebhookEvent>,
    clientDeactivateThreshold: pbProject.clientDeactivateThreshold,
    snapshotInterval: Number(pbProject.snapshotInterval),
    snapshotThreshold: Number(pbProject.snapshotThreshold),
    maxSubscribersPerDocument: pbProject.maxSubscribersPerDocument,
    maxAttachmentsPerDocument: pbProject.maxAttachmentsPerDocument,
    maxSizePerDocument: pbProject.maxSizePerDocument,
    removeOnDetach: pbProject.removeOnDetach,
    autoRevisionEnabled: pbProject.autoRevisionEnabled,
    allowedOrigins: pbProject.allowedOrigins,
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
  const summary: DocumentSummary = {
    id: pbDocumentSummary.id,
    key: pbDocumentSummary.key,
    root: pbDocumentSummary.root,
    attachedClients: pbDocumentSummary.attachedClients,
    docSize: fromPbDocSize(pbDocumentSummary.documentSize),
    createdAt: fromTimestamp(pbDocumentSummary.createdAt!),
    accessedAt: fromTimestamp(pbDocumentSummary.accessedAt!),
    updatedAt: fromTimestamp(pbDocumentSummary.updatedAt!),
    schemaKey: pbDocumentSummary.schemaKey,
  };

  // Convert presences if they exist
  if (pbDocumentSummary.presences && Object.keys(pbDocumentSummary.presences).length > 0) {
    summary.presences = {};
    for (const [key, pbPresence] of Object.entries(pbDocumentSummary.presences)) {
      if (!pbPresence || !pbPresence.data) {
        continue;
      }

      const presence: Presence = {};
      for (const [dataKey, value] of Object.entries(pbPresence.data)) {
        try {
          presence[dataKey] = JSON.parse(value);
        } catch {
          presence[dataKey] = value;
        }
      }
      summary.presences[key] = presence;
    }
  }

  return summary;
}

export function fromDocumentSummaries(pbDocumentSummaries: Array<PbDocumentSummary>): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push(fromDocumentSummary(pbDocumentSummary));
  }

  return documentSummaries;
}

export function fromChannelSummary(pbChannelSummary: PbChannelSummary): ChannelSummary {
  return {
    key: pbChannelSummary.key,
    sessionCount: pbChannelSummary.sessionCount,
  };
}

export function fromChannelSummaries(pbChannelSummaries: Array<PbChannelSummary>): Array<ChannelSummary> {
  const channelSummaries: Array<ChannelSummary> = [];

  for (const pbChannelSummary of pbChannelSummaries) {
    channelSummaries.push(fromChannelSummary(pbChannelSummary));
  }

  return channelSummaries;
}

export function fromChanges(pbChanges: Array<PbChange>): Array<Change<Indexable>> {
  return converter.fromChanges(pbChanges as any);
}

export function fromSchemas(pbSchemas: Array<PbSchema>): Array<Schema> {
  const schemas: Array<Schema> = [];

  for (const pbSchema of pbSchemas) {
    schemas.push(fromSchema(pbSchema));
  }

  return schemas;
}

export function fromSchema(pbSchema: PbSchema): Schema {
  return {
    id: pbSchema.id,
    name: pbSchema.name,
    version: pbSchema.version,
    body: pbSchema.body,
    createdAt: fromTimestamp(pbSchema.createdAt!),
  };
}

/**
 * `fromErrorDetails` converts the error details to the array of FieldViolation.
 * See https://connectrpc.com/docs/web/errors/#error-details for more details.
 */
export function fromErrorDetails(error: ConnectError) {
  const pbDetails = error.findDetails(BadRequest);
  const details: Array<FieldViolation> = [];
  for (const pbDetail of pbDetails) {
    for (const { field, description } of pbDetail.fieldViolations) {
      details.push({ field, description });
    }
  }
  return details;
}

export function toDateRange(range: keyof typeof DATE_RANGE_OPTIONS): PbDateRange {
  switch (range) {
    case 'oneweek':
      return PbDateRange.LAST_1W;
    case 'fourweeks':
      return PbDateRange.LAST_4W;
    case 'threemonths':
      return PbDateRange.LAST_3M;
    case 'twelvemonths':
      return PbDateRange.LAST_12M;
    default:
      throw new Error(`unknown range: ${range}`);
  }
}

function fromPbDataSize(pbDataSize?: PbDataSize): DataSize {
  return {
    data: pbDataSize?.data ?? 0,
    meta: pbDataSize?.meta ?? 0,
  };
}

function fromPbDocSize(pbDocSize?: PbDocSize): DocSize {
  return {
    live: fromPbDataSize(pbDocSize?.live),
    gc: fromPbDataSize(pbDocSize?.gc),
  };
}

export function fromRevisionSummary(pbRevision: PbRevisionSummary): RevisionSummary {
  return {
    id: pbRevision.id,
    label: pbRevision.label,
    description: pbRevision.description,
    snapshot: pbRevision.snapshot,
    createdAt: fromTimestamp(pbRevision.createdAt!),
  };
}

export function fromRevisionSummaries(pbRevisions: Array<any>): Array<RevisionSummary> {
  return pbRevisions.map((pbRevision) => fromRevisionSummary(pbRevision));
}

export function fromMember(pbMember: PbMember): Member {
  return {
    id: pbMember.id,
    projectId: pbMember.projectId,
    userId: pbMember.userId,
    username: pbMember.username,
    role: pbMember.role,
    invitedAt: pbMember.invitedAt ? fromTimestamp(pbMember.invitedAt) : undefined,
  };
}

export function fromMembers(pbMembers: Array<PbMember>): Array<Member> {
  return pbMembers.map((pbMember) => fromMember(pbMember));
}
