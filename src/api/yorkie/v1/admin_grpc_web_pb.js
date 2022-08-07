/**
 * @fileoverview gRPC-Web generated client stub for yorkie.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var yorkie_v1_resources_pb = require('../../yorkie/v1/resources_pb.js')
const proto = {};
proto.yorkie = {};
proto.yorkie.v1 = require('./admin_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.yorkie.v1.AdminServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.yorkie.v1.AdminServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.SignUpRequest,
 *   !proto.yorkie.v1.SignUpResponse>}
 */
const methodDescriptor_AdminService_SignUp = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/SignUp',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.SignUpRequest,
  proto.yorkie.v1.SignUpResponse,
  /**
   * @param {!proto.yorkie.v1.SignUpRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.SignUpResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.SignUpResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.SignUpResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.signUp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/SignUp',
      request,
      metadata || {},
      methodDescriptor_AdminService_SignUp,
      callback);
};


/**
 * @param {!proto.yorkie.v1.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.SignUpResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.signUp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/SignUp',
      request,
      metadata || {},
      methodDescriptor_AdminService_SignUp);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.LogInRequest,
 *   !proto.yorkie.v1.LogInResponse>}
 */
const methodDescriptor_AdminService_LogIn = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/LogIn',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.LogInRequest,
  proto.yorkie.v1.LogInResponse,
  /**
   * @param {!proto.yorkie.v1.LogInRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.LogInResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.LogInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.LogInResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.LogInResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.logIn =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/LogIn',
      request,
      metadata || {},
      methodDescriptor_AdminService_LogIn,
      callback);
};


/**
 * @param {!proto.yorkie.v1.LogInRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.LogInResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.logIn =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/LogIn',
      request,
      metadata || {},
      methodDescriptor_AdminService_LogIn);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.CreateProjectRequest,
 *   !proto.yorkie.v1.CreateProjectResponse>}
 */
const methodDescriptor_AdminService_CreateProject = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/CreateProject',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.CreateProjectRequest,
  proto.yorkie.v1.CreateProjectResponse,
  /**
   * @param {!proto.yorkie.v1.CreateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.CreateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.CreateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.CreateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.createProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/CreateProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_CreateProject,
      callback);
};


/**
 * @param {!proto.yorkie.v1.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.CreateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.createProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/CreateProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_CreateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.ListProjectsRequest,
 *   !proto.yorkie.v1.ListProjectsResponse>}
 */
const methodDescriptor_AdminService_ListProjects = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/ListProjects',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.ListProjectsRequest,
  proto.yorkie.v1.ListProjectsResponse,
  /**
   * @param {!proto.yorkie.v1.ListProjectsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.ListProjectsResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.ListProjectsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.ListProjectsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.listProjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListProjects',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListProjects,
      callback);
};


/**
 * @param {!proto.yorkie.v1.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.ListProjectsResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.listProjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListProjects',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListProjects);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.GetProjectRequest,
 *   !proto.yorkie.v1.GetProjectResponse>}
 */
const methodDescriptor_AdminService_GetProject = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/GetProject',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.GetProjectRequest,
  proto.yorkie.v1.GetProjectResponse,
  /**
   * @param {!proto.yorkie.v1.GetProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.GetProjectResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.GetProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.GetProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.GetProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.getProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetProject,
      callback);
};


/**
 * @param {!proto.yorkie.v1.GetProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.GetProjectResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.getProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.UpdateProjectRequest,
 *   !proto.yorkie.v1.UpdateProjectResponse>}
 */
const methodDescriptor_AdminService_UpdateProject = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/UpdateProject',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.UpdateProjectRequest,
  proto.yorkie.v1.UpdateProjectResponse,
  /**
   * @param {!proto.yorkie.v1.UpdateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.UpdateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.UpdateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.UpdateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.updateProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_UpdateProject,
      callback);
};


/**
 * @param {!proto.yorkie.v1.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.UpdateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.updateProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_AdminService_UpdateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.ListDocumentsRequest,
 *   !proto.yorkie.v1.ListDocumentsResponse>}
 */
const methodDescriptor_AdminService_ListDocuments = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/ListDocuments',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.ListDocumentsRequest,
  proto.yorkie.v1.ListDocumentsResponse,
  /**
   * @param {!proto.yorkie.v1.ListDocumentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.ListDocumentsResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.ListDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.ListDocumentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.ListDocumentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.listDocuments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListDocuments',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListDocuments,
      callback);
};


/**
 * @param {!proto.yorkie.v1.ListDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.ListDocumentsResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.listDocuments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListDocuments',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListDocuments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.GetDocumentRequest,
 *   !proto.yorkie.v1.GetDocumentResponse>}
 */
const methodDescriptor_AdminService_GetDocument = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/GetDocument',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.GetDocumentRequest,
  proto.yorkie.v1.GetDocumentResponse,
  /**
   * @param {!proto.yorkie.v1.GetDocumentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.GetDocumentResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.GetDocumentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.GetDocumentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.GetDocumentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.getDocument =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetDocument',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetDocument,
      callback);
};


/**
 * @param {!proto.yorkie.v1.GetDocumentRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.GetDocumentResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.getDocument =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetDocument',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetDocument);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.GetSnapshotMetaRequest,
 *   !proto.yorkie.v1.GetSnapshotMetaResponse>}
 */
const methodDescriptor_AdminService_GetSnapshotMeta = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/GetSnapshotMeta',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.GetSnapshotMetaRequest,
  proto.yorkie.v1.GetSnapshotMetaResponse,
  /**
   * @param {!proto.yorkie.v1.GetSnapshotMetaRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.GetSnapshotMetaResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.GetSnapshotMetaRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.GetSnapshotMetaResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.GetSnapshotMetaResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.getSnapshotMeta =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetSnapshotMeta',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetSnapshotMeta,
      callback);
};


/**
 * @param {!proto.yorkie.v1.GetSnapshotMetaRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.GetSnapshotMetaResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.getSnapshotMeta =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/GetSnapshotMeta',
      request,
      metadata || {},
      methodDescriptor_AdminService_GetSnapshotMeta);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.SearchDocumentsRequest,
 *   !proto.yorkie.v1.SearchDocumentsResponse>}
 */
const methodDescriptor_AdminService_SearchDocuments = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/SearchDocuments',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.SearchDocumentsRequest,
  proto.yorkie.v1.SearchDocumentsResponse,
  /**
   * @param {!proto.yorkie.v1.SearchDocumentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.SearchDocumentsResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.SearchDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.SearchDocumentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.SearchDocumentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.searchDocuments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/SearchDocuments',
      request,
      metadata || {},
      methodDescriptor_AdminService_SearchDocuments,
      callback);
};


/**
 * @param {!proto.yorkie.v1.SearchDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.SearchDocumentsResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.searchDocuments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/SearchDocuments',
      request,
      metadata || {},
      methodDescriptor_AdminService_SearchDocuments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.yorkie.v1.ListChangesRequest,
 *   !proto.yorkie.v1.ListChangesResponse>}
 */
const methodDescriptor_AdminService_ListChanges = new grpc.web.MethodDescriptor(
  '/yorkie.v1.AdminService/ListChanges',
  grpc.web.MethodType.UNARY,
  proto.yorkie.v1.ListChangesRequest,
  proto.yorkie.v1.ListChangesResponse,
  /**
   * @param {!proto.yorkie.v1.ListChangesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.yorkie.v1.ListChangesResponse.deserializeBinary
);


/**
 * @param {!proto.yorkie.v1.ListChangesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.yorkie.v1.ListChangesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.yorkie.v1.ListChangesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.yorkie.v1.AdminServiceClient.prototype.listChanges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListChanges',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListChanges,
      callback);
};


/**
 * @param {!proto.yorkie.v1.ListChangesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.yorkie.v1.ListChangesResponse>}
 *     Promise that resolves to the response
 */
proto.yorkie.v1.AdminServicePromiseClient.prototype.listChanges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/yorkie.v1.AdminService/ListChanges',
      request,
      metadata || {},
      methodDescriptor_AdminService_ListChanges);
};


module.exports = proto.yorkie.v1;

