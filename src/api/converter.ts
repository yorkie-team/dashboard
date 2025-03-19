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

import { DATE_RANGE_OPTIONS } from './types';
import { Timestamp as PbTimestamp } from '@bufbuild/protobuf';
import { User, Project, DocumentSummary, AuthWebhookMethod, FieldViolation } from './types';
import { Change, converter, Indexable } from '@yorkie-js/sdk';
import {
  User as PbUser,
  Project as PbProject,
  DocumentSummary as PbDocumentSummary,
  Change as PbChange,
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
    clientDeactivateThreshold: pbProject.clientDeactivateThreshold,
    maxSubscribersPerDocument: pbProject.maxSubscribersPerDocument,
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
    id: pbDocumentSummary.id,
    key: pbDocumentSummary.key,
    snapshot: pbDocumentSummary.snapshot,
    createdAt: fromTimestamp(pbDocumentSummary.createdAt!),
    accessedAt: fromTimestamp(pbDocumentSummary.accessedAt!),
    updatedAt: fromTimestamp(pbDocumentSummary.updatedAt!),
  };
}

export function fromDocumentSummaries(pbDocumentSummaries: Array<PbDocumentSummary>): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push(fromDocumentSummary(pbDocumentSummary));
  }

  return documentSummaries;
}

export function fromChanges(pbChanges: Array<PbChange>): Array<Change<Indexable>> {
  return converter.fromChanges(pbChanges as any);
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
