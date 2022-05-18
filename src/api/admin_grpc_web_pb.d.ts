import * as grpcWeb from 'grpc-web';

import * as admin_pb from './admin_pb';


export class AdminClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

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

}

export class AdminPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

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

}

