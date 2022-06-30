/**
 * @fileoverview gRPC-Web generated client stub for api
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var resources_pb = require('./resources_pb.js')
const proto = {};
proto.api = require('./admin_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.api.AdminClient =
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
proto.api.AdminPromiseClient =
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
 *   !proto.api.CreateProjectRequest,
 *   !proto.api.CreateProjectResponse>}
 */
const methodDescriptor_Admin_CreateProject = new grpc.web.MethodDescriptor(
  '/api.Admin/CreateProject',
  grpc.web.MethodType.UNARY,
  proto.api.CreateProjectRequest,
  proto.api.CreateProjectResponse,
  /**
   * @param {!proto.api.CreateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.CreateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.CreateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.CreateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.createProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/CreateProject',
      request,
      metadata || {},
      methodDescriptor_Admin_CreateProject,
      callback);
};


/**
 * @param {!proto.api.CreateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.CreateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.createProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/CreateProject',
      request,
      metadata || {},
      methodDescriptor_Admin_CreateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ListProjectsRequest,
 *   !proto.api.ListProjectsResponse>}
 */
const methodDescriptor_Admin_ListProjects = new grpc.web.MethodDescriptor(
  '/api.Admin/ListProjects',
  grpc.web.MethodType.UNARY,
  proto.api.ListProjectsRequest,
  proto.api.ListProjectsResponse,
  /**
   * @param {!proto.api.ListProjectsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListProjectsResponse.deserializeBinary
);


/**
 * @param {!proto.api.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.ListProjectsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListProjectsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.listProjects =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/ListProjects',
      request,
      metadata || {},
      methodDescriptor_Admin_ListProjects,
      callback);
};


/**
 * @param {!proto.api.ListProjectsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListProjectsResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.listProjects =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/ListProjects',
      request,
      metadata || {},
      methodDescriptor_Admin_ListProjects);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetProjectRequest,
 *   !proto.api.GetProjectResponse>}
 */
const methodDescriptor_Admin_GetProject = new grpc.web.MethodDescriptor(
  '/api.Admin/GetProject',
  grpc.web.MethodType.UNARY,
  proto.api.GetProjectRequest,
  proto.api.GetProjectResponse,
  /**
   * @param {!proto.api.GetProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.GetProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.getProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/GetProject',
      request,
      metadata || {},
      methodDescriptor_Admin_GetProject,
      callback);
};


/**
 * @param {!proto.api.GetProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.getProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/GetProject',
      request,
      metadata || {},
      methodDescriptor_Admin_GetProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.UpdateProjectRequest,
 *   !proto.api.UpdateProjectResponse>}
 */
const methodDescriptor_Admin_UpdateProject = new grpc.web.MethodDescriptor(
  '/api.Admin/UpdateProject',
  grpc.web.MethodType.UNARY,
  proto.api.UpdateProjectRequest,
  proto.api.UpdateProjectResponse,
  /**
   * @param {!proto.api.UpdateProjectRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.UpdateProjectResponse.deserializeBinary
);


/**
 * @param {!proto.api.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.UpdateProjectResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.UpdateProjectResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.updateProject =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_Admin_UpdateProject,
      callback);
};


/**
 * @param {!proto.api.UpdateProjectRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.UpdateProjectResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.updateProject =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/UpdateProject',
      request,
      metadata || {},
      methodDescriptor_Admin_UpdateProject);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ListDocumentsRequest,
 *   !proto.api.ListDocumentsResponse>}
 */
const methodDescriptor_Admin_ListDocuments = new grpc.web.MethodDescriptor(
  '/api.Admin/ListDocuments',
  grpc.web.MethodType.UNARY,
  proto.api.ListDocumentsRequest,
  proto.api.ListDocumentsResponse,
  /**
   * @param {!proto.api.ListDocumentsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListDocumentsResponse.deserializeBinary
);


/**
 * @param {!proto.api.ListDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.ListDocumentsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListDocumentsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.listDocuments =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/ListDocuments',
      request,
      metadata || {},
      methodDescriptor_Admin_ListDocuments,
      callback);
};


/**
 * @param {!proto.api.ListDocumentsRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListDocumentsResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.listDocuments =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/ListDocuments',
      request,
      metadata || {},
      methodDescriptor_Admin_ListDocuments);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.GetDocumentRequest,
 *   !proto.api.GetDocumentResponse>}
 */
const methodDescriptor_Admin_GetDocument = new grpc.web.MethodDescriptor(
  '/api.Admin/GetDocument',
  grpc.web.MethodType.UNARY,
  proto.api.GetDocumentRequest,
  proto.api.GetDocumentResponse,
  /**
   * @param {!proto.api.GetDocumentRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.GetDocumentResponse.deserializeBinary
);


/**
 * @param {!proto.api.GetDocumentRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.GetDocumentResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.GetDocumentResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.getDocument =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/GetDocument',
      request,
      metadata || {},
      methodDescriptor_Admin_GetDocument,
      callback);
};


/**
 * @param {!proto.api.GetDocumentRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.GetDocumentResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.getDocument =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/GetDocument',
      request,
      metadata || {},
      methodDescriptor_Admin_GetDocument);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.ListChangesRequest,
 *   !proto.api.ListChangesResponse>}
 */
const methodDescriptor_Admin_ListChanges = new grpc.web.MethodDescriptor(
  '/api.Admin/ListChanges',
  grpc.web.MethodType.UNARY,
  proto.api.ListChangesRequest,
  proto.api.ListChangesResponse,
  /**
   * @param {!proto.api.ListChangesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.ListChangesResponse.deserializeBinary
);


/**
 * @param {!proto.api.ListChangesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.api.ListChangesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.ListChangesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.AdminClient.prototype.listChanges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.Admin/ListChanges',
      request,
      metadata || {},
      methodDescriptor_Admin_ListChanges,
      callback);
};


/**
 * @param {!proto.api.ListChangesRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.ListChangesResponse>}
 *     Promise that resolves to the response
 */
proto.api.AdminPromiseClient.prototype.listChanges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.Admin/ListChanges',
      request,
      metadata || {},
      methodDescriptor_Admin_ListChanges);
};


module.exports = proto.api;

