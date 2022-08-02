import * as grpcWeb from 'grpc-web';

import * as admin_pb from './admin_pb';


export class AdminClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  signUp(
    request: admin_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.SignUpResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.SignUpResponse>;

  logIn(
    request: admin_pb.LogInRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.LogInResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.LogInResponse>;

  createProject(
    request: admin_pb.CreateProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.CreateProjectResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.CreateProjectResponse>;

  listProjects(
    request: admin_pb.ListProjectsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.ListProjectsResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.ListProjectsResponse>;

  getProject(
    request: admin_pb.GetProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.GetProjectResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.GetProjectResponse>;

  updateProject(
    request: admin_pb.UpdateProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.UpdateProjectResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.UpdateProjectResponse>;

  listDocuments(
    request: admin_pb.ListDocumentsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.ListDocumentsResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.ListDocumentsResponse>;

  getDocument(
    request: admin_pb.GetDocumentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.GetDocumentResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.GetDocumentResponse>;

  getSnapshotMeta(
    request: admin_pb.GetSnapshotMetaRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.GetSnapshotMetaResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.GetSnapshotMetaResponse>;

  searchDocuments(
    request: admin_pb.SearchDocumentsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.SearchDocumentsResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.SearchDocumentsResponse>;

  listChanges(
    request: admin_pb.ListChangesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.ListChangesResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.ListChangesResponse>;

}

export class AdminPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  signUp(
    request: admin_pb.SignUpRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.SignUpResponse>;

  logIn(
    request: admin_pb.LogInRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.LogInResponse>;

  createProject(
    request: admin_pb.CreateProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.CreateProjectResponse>;

  listProjects(
    request: admin_pb.ListProjectsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.ListProjectsResponse>;

  getProject(
    request: admin_pb.GetProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.GetProjectResponse>;

  updateProject(
    request: admin_pb.UpdateProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.UpdateProjectResponse>;

  listDocuments(
    request: admin_pb.ListDocumentsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.ListDocumentsResponse>;

  getDocument(
    request: admin_pb.GetDocumentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.GetDocumentResponse>;

  getSnapshotMeta(
    request: admin_pb.GetSnapshotMetaRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.GetSnapshotMetaResponse>;

  searchDocuments(
    request: admin_pb.SearchDocumentsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.SearchDocumentsResponse>;

  listChanges(
    request: admin_pb.ListChangesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.ListChangesResponse>;

}

