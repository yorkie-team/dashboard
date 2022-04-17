import * as grpcWeb from 'grpc-web';

import * as admin_pb from './admin_pb';


export class AdminClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listDocuments(
    request: admin_pb.ListDocumentsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: admin_pb.ListDocumentsResponse) => void
  ): grpcWeb.ClientReadableStream<admin_pb.ListDocumentsResponse>;

}

export class AdminPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listDocuments(
    request: admin_pb.ListDocumentsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<admin_pb.ListDocumentsResponse>;

}

