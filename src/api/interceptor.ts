/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as errorDetails from 'grpc-web-error-details';
import { APIErrorName } from './types';

/**
 * `DefaultUnaryInterceptor` is a unary interceptor.
 */
export class DefaultUnaryInterceptor {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  /**
   * `setToken` sets the token to the interceptor.
   * @param token The token to set.
   */
  public setToken(token: string) {
    this.token = token;
  }

  /**
   * `intercept` intercepts the request and adds the token and deadline to the metadata
   * and returns RPCError if the request is rejected.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public intercept(request: any, invoker: any): any {
    const metadata = request.getMetadata();
    if (this.token) {
      metadata.authorization = this.token;
    }
    metadata.deadline = new Date().getTime() + 3000;
    return invoker(request).catch((err: any) => {
      const [, pbDetails] = errorDetails.statusFromError(err);
      if (pbDetails && pbDetails.length > 0) {
        const details: Array<FieldViolation> = [];
        for (const pbDetail of pbDetails) {
          if (pbDetail instanceof errorDetails.BadRequest) {
            for (const v of pbDetail.getFieldViolationsList()) {
              details.push({ field: v.getField(), description: v.getDescription() });
            }
          }
        }
        throw new RPCError(err.code, err.message, details);
      }

      throw new RPCError(err.code, err.message);
    });
  }
}

/**
 * `DefaultStreamInterceptor` is a stream interceptor.
 */
export class DefaultStreamInterceptor {
  private token?: string;

  constructor(token?: string) {
    this.token = token;
  }

  /**
   * `setToken` sets the token to the interceptor.
   * @param token The token to set.
   */
  public setToken(token: string) {
    this.token = token;
  }

  /**
   * `intercept` intercepts the request and adds the token and deadline to the metadata
   * and returns RPCError if the request is rejected.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public intercept(request: any, invoker: any): any {
    const metadata = request.getMetadata();
    if (this.token) {
      metadata.authorization = this.token;
    }
    metadata.deadline = new Date().getTime() + 3000;
    return invoker(request).catch((err: any) => {
      const [, pbDetails] = errorDetails.statusFromError(err);
      if (pbDetails && pbDetails.length > 0) {
        const details: Array<FieldViolation> = [];
        for (const pbDetail of pbDetails) {
          if (pbDetail instanceof errorDetails.BadRequest) {
            for (const v of pbDetail.getFieldViolationsList()) {
              details.push({ field: v.getField(), description: v.getDescription() });
            }
          }
        }
        throw new RPCError(err.code, err.message, details);
      }

      throw new RPCError(err.code, err.message);
    });
  }
}

class RPCError extends Error {
  name: APIErrorName;
  code: string;
  message: string;
  details: Array<FieldViolation>;
  constructor(code: number, message: string, details?: Array<FieldViolation>) {
    super(message);
    this.name = 'RPCError';
    this.code = String(code);
    this.message = message;
    this.details = details || [];
  }
}

type FieldViolation = {
  field: string;
  description: string;
};
