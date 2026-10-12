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

// The server returns the project secret key only to owners and admins. A member
// gets an empty key and reaches the project-scoped methods with its session
// cookie instead, naming the project in this header.
export const ProjectNameHeader = 'x-yorkie-project';

export class InterceptorBuilder {
  private project?: { name: string; secretKey: string };

  /**
   * `setProject` sets the project that project-related API calls act on.
   * @param name The name of the project.
   * @param secretKey The project secret key, or an empty string when the
   * current user's role cannot read it.
   */
  public setProject(name: string, secretKey: string) {
    this.project = { name, secretKey };
  }

  /**
   * `clearProject` clears the project that project-related API calls act on.
   */
  public clearProject() {
    this.project = undefined;
  }

  public createAuthInterceptor(): Interceptor {
    return (next) => async (req) => {
      if (this.project && this.isProjectRelatedAPI(req.url)) {
        if (this.project.secretKey) {
          req.header.set('authorization', `API-Key ${this.project.secretKey}`);
        } else {
          // The session cookie authenticates the user; the server checks the
          // user's role in the named project.
          req.header.set(ProjectNameHeader, this.project.name);
        }
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
      'CompactDocumentByAdmin',
      'GetSnapshotMeta',
      'SearchDocuments',
      'ListChanges',
      'ListChannels',
      'GetChannels',
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
