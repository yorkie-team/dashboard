import * as jspb from 'google-protobuf'

import * as resources_pb from './resources_pb';


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
  getProject(): resources_pb.Project | undefined;
  setProject(value?: resources_pb.Project): UpdateProjectRequest;
  hasProject(): boolean;
  clearProject(): UpdateProjectRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectRequest): UpdateProjectRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectRequest;
  static deserializeBinaryFromReader(message: UpdateProjectRequest, reader: jspb.BinaryReader): UpdateProjectRequest;
}

export namespace UpdateProjectRequest {
  export type AsObject = {
    project?: resources_pb.Project.AsObject,
  }
}

export class UpdateProjectResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectResponse): UpdateProjectResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectResponse;
  static deserializeBinaryFromReader(message: UpdateProjectResponse, reader: jspb.BinaryReader): UpdateProjectResponse;
}

export namespace UpdateProjectResponse {
  export type AsObject = {
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

