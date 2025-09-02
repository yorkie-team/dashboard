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

import pkg from '../../package.json';
import { Interceptor } from '@connectrpc/connect';

export class InterceptorBuilder {
  private projectSecretKey?: string;

  /**
   * `setProjectSecretKey` sets the project secret key for project-related API calls.
   * @param projectSecretKey The project secret key to set.
   */
  public setProjectSecretKey(projectSecretKey: string) {
    this.projectSecretKey = projectSecretKey;
  }

  /**
   * `clearProjectSecretKey` clears the project secret key.
   */
  public clearProjectSecretKey() {
    this.projectSecretKey = undefined;
  }

  public createAuthInterceptor(): Interceptor {
    return (next) => async (req) => {
      // Check if this is a project-related API call
      if (this.isProjectRelatedAPI(req.url) && this.projectSecretKey) {
        req.header.set('authorization', `API-Key ${this.projectSecretKey}`);
      }
      return await next(req);
    };
  }

  /**
   * `isProjectRelatedAPI` determines if the given URL is a project-related API.
   * @param url The request URL to check.
   * @returns true if the URL is for a project-related API.
   */
  private isProjectRelatedAPI(url: string): boolean {
    const projectRelatedAPIs = [
      'ListDocuments',
      'GetDocument',
      'GetDocuments',
      'UpdateDocument',
      'RemoveDocumentByAdmin',
      'GetSnapshotMeta',
      'SearchDocuments',
      'ListChanges',
      'GetProjectStats',
      'CreateSchema',
      'ListSchemas',
      'GetSchema',
      'GetSchemas',
      'RemoveSchema',
    ];

    return projectRelatedAPIs.some((api) => url.includes(api));
  }

  /**
   * `createMetricInterceptor` creates an interceptor to add the x-yorkie-user-agent header for each
   * request.
   */
  createMetricInterceptor(): Interceptor {
    return (next) => async (req) => {
      req.header.set('x-yorkie-user-agent', pkg.name + '/' + pkg.version);
      return await next(req);
    };
  }
}
