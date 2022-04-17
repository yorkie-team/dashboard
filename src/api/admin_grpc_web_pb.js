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


module.exports = proto.api;

