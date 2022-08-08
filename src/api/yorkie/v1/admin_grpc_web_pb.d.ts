import * as grpcWeb from 'grpc-web';

import * as yorkie_v1_admin_pb from '../../yorkie/v1/admin_pb';


export class AdminServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  signUp(
    request: yorkie_v1_admin_pb.SignUpRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.SignUpResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.SignUpResponse>;

  logIn(
    request: yorkie_v1_admin_pb.LogInRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.LogInResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.LogInResponse>;

  createProject(
    request: yorkie_v1_admin_pb.CreateProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.CreateProjectResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.CreateProjectResponse>;

  listProjects(
    request: yorkie_v1_admin_pb.ListProjectsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.ListProjectsResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.ListProjectsResponse>;

  getProject(
    request: yorkie_v1_admin_pb.GetProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.GetProjectResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.GetProjectResponse>;

  updateProject(
    request: yorkie_v1_admin_pb.UpdateProjectRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.UpdateProjectResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.UpdateProjectResponse>;

  listDocuments(
    request: yorkie_v1_admin_pb.ListDocumentsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.ListDocumentsResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.ListDocumentsResponse>;

  getDocument(
    request: yorkie_v1_admin_pb.GetDocumentRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.GetDocumentResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.GetDocumentResponse>;

  getSnapshotMeta(
    request: yorkie_v1_admin_pb.GetSnapshotMetaRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.GetSnapshotMetaResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.GetSnapshotMetaResponse>;

  searchDocuments(
    request: yorkie_v1_admin_pb.SearchDocumentsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.SearchDocumentsResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.SearchDocumentsResponse>;

  listChanges(
    request: yorkie_v1_admin_pb.ListChangesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: yorkie_v1_admin_pb.ListChangesResponse) => void
  ): grpcWeb.ClientReadableStream<yorkie_v1_admin_pb.ListChangesResponse>;

}

export class AdminServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  signUp(
    request: yorkie_v1_admin_pb.SignUpRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.SignUpResponse>;

  logIn(
    request: yorkie_v1_admin_pb.LogInRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.LogInResponse>;

  createProject(
    request: yorkie_v1_admin_pb.CreateProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.CreateProjectResponse>;

  listProjects(
    request: yorkie_v1_admin_pb.ListProjectsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.ListProjectsResponse>;

  getProject(
    request: yorkie_v1_admin_pb.GetProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.GetProjectResponse>;

  updateProject(
    request: yorkie_v1_admin_pb.UpdateProjectRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.UpdateProjectResponse>;

  listDocuments(
    request: yorkie_v1_admin_pb.ListDocumentsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.ListDocumentsResponse>;

  getDocument(
    request: yorkie_v1_admin_pb.GetDocumentRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.GetDocumentResponse>;

  getSnapshotMeta(
    request: yorkie_v1_admin_pb.GetSnapshotMetaRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.GetSnapshotMetaResponse>;

  searchDocuments(
    request: yorkie_v1_admin_pb.SearchDocumentsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.SearchDocumentsResponse>;

  listChanges(
    request: yorkie_v1_admin_pb.ListChangesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<yorkie_v1_admin_pb.ListChangesResponse>;

}

