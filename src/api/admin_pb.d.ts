import * as jspb from 'google-protobuf'

import * as resources_pb from './resources_pb';


export class ListDocumentsRequest extends jspb.Message {
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

