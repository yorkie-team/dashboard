import * as jspb from 'google-protobuf'

import * as resources_pb from './resources_pb';


export class SignUpRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): SignUpRequest;

  getPassword(): string;
  setPassword(value: string): SignUpRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpRequest): SignUpRequest.AsObject;
  static serializeBinaryToWriter(message: SignUpRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpRequest;
  static deserializeBinaryFromReader(message: SignUpRequest, reader: jspb.BinaryReader): SignUpRequest;
}

export namespace SignUpRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class SignUpResponse extends jspb.Message {
  getUser(): resources_pb.User | undefined;
  setUser(value?: resources_pb.User): SignUpResponse;
  hasUser(): boolean;
  clearUser(): SignUpResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpResponse): SignUpResponse.AsObject;
  static serializeBinaryToWriter(message: SignUpResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpResponse;
  static deserializeBinaryFromReader(message: SignUpResponse, reader: jspb.BinaryReader): SignUpResponse;
}

export namespace SignUpResponse {
  export type AsObject = {
    user?: resources_pb.User.AsObject,
  }
}

export class LogInRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LogInRequest;

  getPassword(): string;
  setPassword(value: string): LogInRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogInRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LogInRequest): LogInRequest.AsObject;
  static serializeBinaryToWriter(message: LogInRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogInRequest;
  static deserializeBinaryFromReader(message: LogInRequest, reader: jspb.BinaryReader): LogInRequest;
}

export namespace LogInRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LogInResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): LogInResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogInResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LogInResponse): LogInResponse.AsObject;
  static serializeBinaryToWriter(message: LogInResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogInResponse;
  static deserializeBinaryFromReader(message: LogInResponse, reader: jspb.BinaryReader): LogInResponse;
}

export namespace LogInResponse {
  export type AsObject = {
    token: string,
  }
}

export class CreateProjectRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateProjectRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectRequest): CreateProjectRequest.AsObject;
  static serializeBinaryToWriter(message: CreateProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectRequest;
  static deserializeBinaryFromReader(message: CreateProjectRequest, reader: jspb.BinaryReader): CreateProjectRequest;
}

export namespace CreateProjectRequest {
  export type AsObject = {
    name: string,
  }
}

export class CreateProjectResponse extends jspb.Message {
  getProject(): resources_pb.Project | undefined;
  setProject(value?: resources_pb.Project): CreateProjectResponse;
  hasProject(): boolean;
  clearProject(): CreateProjectResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectResponse): CreateProjectResponse.AsObject;
  static serializeBinaryToWriter(message: CreateProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectResponse;
  static deserializeBinaryFromReader(message: CreateProjectResponse, reader: jspb.BinaryReader): CreateProjectResponse;
}

export namespace CreateProjectResponse {
  export type AsObject = {
    project?: resources_pb.Project.AsObject,
  }
}

export class GetProjectRequest extends jspb.Message {
  getName(): string;
  setName(value: string): GetProjectRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectRequest): GetProjectRequest.AsObject;
  static serializeBinaryToWriter(message: GetProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectRequest;
  static deserializeBinaryFromReader(message: GetProjectRequest, reader: jspb.BinaryReader): GetProjectRequest;
}

export namespace GetProjectRequest {
  export type AsObject = {
    name: string,
  }
}

export class GetProjectResponse extends jspb.Message {
  getProject(): resources_pb.Project | undefined;
  setProject(value?: resources_pb.Project): GetProjectResponse;
  hasProject(): boolean;
  clearProject(): GetProjectResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectResponse): GetProjectResponse.AsObject;
  static serializeBinaryToWriter(message: GetProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectResponse;
  static deserializeBinaryFromReader(message: GetProjectResponse, reader: jspb.BinaryReader): GetProjectResponse;
}

export namespace GetProjectResponse {
  export type AsObject = {
    project?: resources_pb.Project.AsObject,
  }
}

export class ListProjectsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListProjectsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListProjectsRequest): ListProjectsRequest.AsObject;
  static serializeBinaryToWriter(message: ListProjectsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListProjectsRequest;
  static deserializeBinaryFromReader(message: ListProjectsRequest, reader: jspb.BinaryReader): ListProjectsRequest;
}

export namespace ListProjectsRequest {
  export type AsObject = {
  }
}

export class ListProjectsResponse extends jspb.Message {
  getProjectsList(): Array<resources_pb.Project>;
  setProjectsList(value: Array<resources_pb.Project>): ListProjectsResponse;
  clearProjectsList(): ListProjectsResponse;
  addProjects(value?: resources_pb.Project, index?: number): resources_pb.Project;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListProjectsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListProjectsResponse): ListProjectsResponse.AsObject;
  static serializeBinaryToWriter(message: ListProjectsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListProjectsResponse;
  static deserializeBinaryFromReader(message: ListProjectsResponse, reader: jspb.BinaryReader): ListProjectsResponse;
}

export namespace ListProjectsResponse {
  export type AsObject = {
    projectsList: Array<resources_pb.Project.AsObject>,
  }
}

export class UpdateProjectRequest extends jspb.Message {
  getId(): string;
  setId(value: string): UpdateProjectRequest;

  getFields(): resources_pb.UpdatableProjectFields | undefined;
  setFields(value?: resources_pb.UpdatableProjectFields): UpdateProjectRequest;
  hasFields(): boolean;
  clearFields(): UpdateProjectRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectRequest): UpdateProjectRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectRequest;
  static deserializeBinaryFromReader(message: UpdateProjectRequest, reader: jspb.BinaryReader): UpdateProjectRequest;
}

export namespace UpdateProjectRequest {
  export type AsObject = {
    id: string,
    fields?: resources_pb.UpdatableProjectFields.AsObject,
  }
}

export class UpdateProjectResponse extends jspb.Message {
  getProject(): resources_pb.Project | undefined;
  setProject(value?: resources_pb.Project): UpdateProjectResponse;
  hasProject(): boolean;
  clearProject(): UpdateProjectResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectResponse): UpdateProjectResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectResponse;
  static deserializeBinaryFromReader(message: UpdateProjectResponse, reader: jspb.BinaryReader): UpdateProjectResponse;
}

export namespace UpdateProjectResponse {
  export type AsObject = {
    project?: resources_pb.Project.AsObject,
  }
}

export class ListDocumentsRequest extends jspb.Message {
  getProjectName(): string;
  setProjectName(value: string): ListDocumentsRequest;

  getPreviousId(): string;
  setPreviousId(value: string): ListDocumentsRequest;

  getPageSize(): number;
  setPageSize(value: number): ListDocumentsRequest;

  getIsForward(): boolean;
  setIsForward(value: boolean): ListDocumentsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDocumentsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListDocumentsRequest): ListDocumentsRequest.AsObject;
  static serializeBinaryToWriter(message: ListDocumentsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDocumentsRequest;
  static deserializeBinaryFromReader(message: ListDocumentsRequest, reader: jspb.BinaryReader): ListDocumentsRequest;
}

export namespace ListDocumentsRequest {
  export type AsObject = {
    projectName: string,
    previousId: string,
    pageSize: number,
    isForward: boolean,
  }
}

export class ListDocumentsResponse extends jspb.Message {
  getDocumentsList(): Array<resources_pb.DocumentSummary>;
  setDocumentsList(value: Array<resources_pb.DocumentSummary>): ListDocumentsResponse;
  clearDocumentsList(): ListDocumentsResponse;
  addDocuments(value?: resources_pb.DocumentSummary, index?: number): resources_pb.DocumentSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDocumentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListDocumentsResponse): ListDocumentsResponse.AsObject;
  static serializeBinaryToWriter(message: ListDocumentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDocumentsResponse;
  static deserializeBinaryFromReader(message: ListDocumentsResponse, reader: jspb.BinaryReader): ListDocumentsResponse;
}

export namespace ListDocumentsResponse {
  export type AsObject = {
    documentsList: Array<resources_pb.DocumentSummary.AsObject>,
  }
}

export class GetDocumentRequest extends jspb.Message {
  getProjectName(): string;
  setProjectName(value: string): GetDocumentRequest;

  getDocumentKey(): string;
  setDocumentKey(value: string): GetDocumentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDocumentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDocumentRequest): GetDocumentRequest.AsObject;
  static serializeBinaryToWriter(message: GetDocumentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDocumentRequest;
  static deserializeBinaryFromReader(message: GetDocumentRequest, reader: jspb.BinaryReader): GetDocumentRequest;
}

export namespace GetDocumentRequest {
  export type AsObject = {
    projectName: string,
    documentKey: string,
  }
}

export class GetDocumentResponse extends jspb.Message {
  getDocument(): resources_pb.DocumentSummary | undefined;
  setDocument(value?: resources_pb.DocumentSummary): GetDocumentResponse;
  hasDocument(): boolean;
  clearDocument(): GetDocumentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDocumentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDocumentResponse): GetDocumentResponse.AsObject;
  static serializeBinaryToWriter(message: GetDocumentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDocumentResponse;
  static deserializeBinaryFromReader(message: GetDocumentResponse, reader: jspb.BinaryReader): GetDocumentResponse;
}

export namespace GetDocumentResponse {
  export type AsObject = {
    document?: resources_pb.DocumentSummary.AsObject,
  }
}

export class GetSnapshotMetaRequest extends jspb.Message {
  getProjectName(): string;
  setProjectName(value: string): GetSnapshotMetaRequest;

  getDocumentKey(): string;
  setDocumentKey(value: string): GetSnapshotMetaRequest;

  getServerSeq(): number;
  setServerSeq(value: number): GetSnapshotMetaRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSnapshotMetaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSnapshotMetaRequest): GetSnapshotMetaRequest.AsObject;
  static serializeBinaryToWriter(message: GetSnapshotMetaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSnapshotMetaRequest;
  static deserializeBinaryFromReader(message: GetSnapshotMetaRequest, reader: jspb.BinaryReader): GetSnapshotMetaRequest;
}

export namespace GetSnapshotMetaRequest {
  export type AsObject = {
    projectName: string,
    documentKey: string,
    serverSeq: number,
  }
}

export class GetSnapshotMetaResponse extends jspb.Message {
  getSnapshot(): Uint8Array | string;
  getSnapshot_asU8(): Uint8Array;
  getSnapshot_asB64(): string;
  setSnapshot(value: Uint8Array | string): GetSnapshotMetaResponse;

  getLamport(): number;
  setLamport(value: number): GetSnapshotMetaResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSnapshotMetaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSnapshotMetaResponse): GetSnapshotMetaResponse.AsObject;
  static serializeBinaryToWriter(message: GetSnapshotMetaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSnapshotMetaResponse;
  static deserializeBinaryFromReader(message: GetSnapshotMetaResponse, reader: jspb.BinaryReader): GetSnapshotMetaResponse;
}

export namespace GetSnapshotMetaResponse {
  export type AsObject = {
    snapshot: Uint8Array | string,
    lamport: number,
  }
}

export class SearchDocumentsRequest extends jspb.Message {
  getProjectName(): string;
  setProjectName(value: string): SearchDocumentsRequest;

  getQuery(): string;
  setQuery(value: string): SearchDocumentsRequest;

  getPageSize(): number;
  setPageSize(value: number): SearchDocumentsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchDocumentsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchDocumentsRequest): SearchDocumentsRequest.AsObject;
  static serializeBinaryToWriter(message: SearchDocumentsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchDocumentsRequest;
  static deserializeBinaryFromReader(message: SearchDocumentsRequest, reader: jspb.BinaryReader): SearchDocumentsRequest;
}

export namespace SearchDocumentsRequest {
  export type AsObject = {
    projectName: string,
    query: string,
    pageSize: number,
  }
}

export class SearchDocumentsResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): SearchDocumentsResponse;

  getDocumentsList(): Array<resources_pb.DocumentSummary>;
  setDocumentsList(value: Array<resources_pb.DocumentSummary>): SearchDocumentsResponse;
  clearDocumentsList(): SearchDocumentsResponse;
  addDocuments(value?: resources_pb.DocumentSummary, index?: number): resources_pb.DocumentSummary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchDocumentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchDocumentsResponse): SearchDocumentsResponse.AsObject;
  static serializeBinaryToWriter(message: SearchDocumentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchDocumentsResponse;
  static deserializeBinaryFromReader(message: SearchDocumentsResponse, reader: jspb.BinaryReader): SearchDocumentsResponse;
}

export namespace SearchDocumentsResponse {
  export type AsObject = {
    totalCount: number,
    documentsList: Array<resources_pb.DocumentSummary.AsObject>,
  }
}

export class ListChangesRequest extends jspb.Message {
  getProjectName(): string;
  setProjectName(value: string): ListChangesRequest;

  getDocumentKey(): string;
  setDocumentKey(value: string): ListChangesRequest;

  getPreviousSeq(): number;
  setPreviousSeq(value: number): ListChangesRequest;

  getPageSize(): number;
  setPageSize(value: number): ListChangesRequest;

  getIsForward(): boolean;
  setIsForward(value: boolean): ListChangesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListChangesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListChangesRequest): ListChangesRequest.AsObject;
  static serializeBinaryToWriter(message: ListChangesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListChangesRequest;
  static deserializeBinaryFromReader(message: ListChangesRequest, reader: jspb.BinaryReader): ListChangesRequest;
}

export namespace ListChangesRequest {
  export type AsObject = {
    projectName: string,
    documentKey: string,
    previousSeq: number,
    pageSize: number,
    isForward: boolean,
  }
}

export class ListChangesResponse extends jspb.Message {
  getChangesList(): Array<resources_pb.Change>;
  setChangesList(value: Array<resources_pb.Change>): ListChangesResponse;
  clearChangesList(): ListChangesResponse;
  addChanges(value?: resources_pb.Change, index?: number): resources_pb.Change;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListChangesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListChangesResponse): ListChangesResponse.AsObject;
  static serializeBinaryToWriter(message: ListChangesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListChangesResponse;
  static deserializeBinaryFromReader(message: ListChangesResponse, reader: jspb.BinaryReader): ListChangesResponse;
}

export namespace ListChangesResponse {
  export type AsObject = {
    changesList: Array<resources_pb.Change.AsObject>,
  }
}

