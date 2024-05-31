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

import Long from 'long';
import { Document, OpSource } from 'yorkie-js-sdk';
import { createPromiseClient } from '@connectrpc/connect';
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { AdminService } from './yorkie/v1/admin_connect';
import { UpdatableProjectFields_AuthWebhookMethods as PbProjectFields_AuthWebhookMethods } from './yorkie/v1/resources_pb';
import { InterceptorBuilder } from './interceptor';
import { User, Project, DocumentSummary, UpdatableProjectFields, DocumentHistory } from './types';
import * as converter from './converter';

export * from './types';

const interceptor = new InterceptorBuilder();
const transport = createGrpcWebTransport({
  baseUrl: process.env.REACT_APP_API_ADDR!,
  interceptors: [interceptor.createAuthInterceptor()],
  defaultTimeoutMs: 3000,
});
const client = createPromiseClient(AdminService, transport);

// setToken sets the token for the current user.
export function setToken(token: string) {
  interceptor.setToken(token);
}

// logIn logs in the user and returns a token.
export async function logIn(username: string, password: string): Promise<string> {
  const res = await client.logIn({ username, password });
  setToken(res.token);
  return res.token;
}

// signUp signs up the user and returns a user.
export async function signUp(username: string, password: string): Promise<User> {
  const res = await client.signUp({ username, password });
  return converter.fromUser(res.user!);
}

// createProject creates a new project.
export async function createProject(name: string): Promise<Project> {
  const res = await client.createProject({ name });
  return converter.fromProject(res.project!);
}

// listProjects fetches projects from the admin server.
export async function listProjects(): Promise<Array<Project>> {
  const res = await client.listProjects({});
  return converter.fromProjects(res.projects);
}

// getProject fetch project from the admin server.
export async function getProject(name: string): Promise<Project> {
  const res = await client.getProject({ name });
  return converter.fromProject(res.project!);
}

// UpdateProject updates a project info.
export async function updateProject(id: string, fields: UpdatableProjectFields): Promise<Project> {
  const pbFields = {
    name: fields.name,
    authWebhookUrl: fields.authWebhookURL,
    authWebhookMethods: fields.authWebhookMethods
      ? new PbProjectFields_AuthWebhookMethods({ methods: fields.authWebhookMethods })
      : undefined,
    clientDeactivateThreshold: fields.clientDeactivateThreshold,
  };
  const res = await client.updateProject({ id, fields: pbFields });
  return converter.fromProject(res.project!);
}

// listDocuments fetches documents from the admin server.
export async function listDocuments(
  projectName: string,
  previousID: string,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentSummary>> {
  const res = await client.listDocuments({
    projectName,
    previousId: previousID,
    pageSize,
    isForward,
  });
  const summaries = converter.fromDocumentSummaries(res.documents);
  if (isForward) {
    summaries.reverse();
  }
  return summaries;
}

// getDocument fetches a document of the given ID from the admin server.
export async function getDocument(projectName: string, documentKey: string): Promise<DocumentSummary> {
  const res = await client.getDocument({ projectName, documentKey });
  return converter.fromDocumentSummary(res.document!);
}

// searchDocuments fetches documents that match the query parameters.
export async function searchDocuments(
  projectName: string,
  documentQuery: string,
  pageSize: number,
): Promise<{
  totalCount: number;
  documents: Array<DocumentSummary>;
}> {
  const res = await client.searchDocuments({ projectName, query: documentQuery, pageSize });
  const summaries = converter.fromDocumentSummaries(res.documents);
  return {
    totalCount: res.totalCount,
    documents: summaries,
  };
}

// listDocumentHistories lists of changes for the given document.
export async function listDocumentHistories(
  projectName: string,
  documentKey: string,
  previousSeq: string,
  pageSize: number,
  isForward: boolean,
): Promise<Array<DocumentHistory>> {
  // 1. snapshot 테스트
  // const snapshotMeta = await client.getSnapshotMeta({
  //   projectName,
  //   documentKey,
  //   serverSeq: '5365',
  // });

  // const res = await client.listChanges({
  //   projectName,
  //   documentKey,
  //   previousSeq: '5365',
  //   isForward: true,
  // });
  // console.log('5365~', res);

  // const pbChanges = res.changes;
  // try {
  //   const changes = converter.fromChanges(pbChanges);
  //   console.log('5365~ changes', changes);

  //   const document = new Document(documentKey);
  //   document.applySnapshot(Long.fromString('5365'), snapshotMeta.snapshot);
  //   console.log('✅ snapshot', (document.getValueByPath('$.text') as any).toJSInfoForTest());

  //   for (let i = 0; i < changes.length; i++) {
  //     if (changes[i].hasOperations()) {
  //       console.log('✅change', pbChanges[i].id!.serverSeq, changes[i]);
  //       if (Number(pbChanges[i].id!.serverSeq) >= 5369) {
  //         console.log('document', (document.getValueByPath('$.text') as any).toJSInfoForTest());
  //         debugger;
  //       }
  //       document.applyChanges([changes[i]], 'Remote' as any);
  //     }
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  // 2. changes 테스트
  const res = await client.listChanges({
    projectName,
    documentKey,
    previousSeq: '5371',
  });

  const pbChanges = res.changes;
  try {
    const changes = converter.fromChanges(pbChanges);
    console.log('changes', changes);

    const document = new Document(documentKey);

    for (let i = 0; i < changes.length; i++) {
      if (changes[i].hasOperations()) {
        if (Number(pbChanges[i].id!.serverSeq) >= 5369) {
          console.log('✅change', pbChanges[i].id!.serverSeq, changes[i]);
          console.log('document', (document.getValueByPath('$.text') as any).toJSInfoForTest());
          debugger;
        }
        document.applyChanges([changes[i]], 'Remote' as any);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}

// removeDocumentByAdmin removes the document of the given document.
export async function removeDocumentByAdmin(
  projectName: string,
  documentKey: string,
  forceRemoveIfAttached: boolean = true,
): Promise<void> {
  await client.removeDocumentByAdmin({
    projectName,
    documentKey,
    force: forceRemoveIfAttached,
  });
}
