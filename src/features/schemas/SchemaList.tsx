/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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

import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSchemaList, listSchemasAsync } from './schemasSlice';
import { selectCurrentProject } from 'features/projects/projectsSlice';
import { selectPreferences } from 'features/users/usersSlice';
import { Button, Icon } from 'components';

export function SchemaList({ isDetailOpen = false }: { isDetailOpen?: boolean }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const schemaName = params.schemaName || '';
  const { schemas, status } = useAppSelector(selectSchemaList);
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const url = useLocation().pathname;

  useEffect(() => {
    if (!currentProject) return;

    dispatch(listSchemasAsync());
  }, [dispatch, currentProject]);

  return (
    <>
      <div className="schemas_header">
        <span className="title">Schemas</span>
        <Button
          as="link"
          href={`${isDetailOpen ? `${url.substring(0, url.lastIndexOf('/'))}/new` : `${url}/new`}`}
          className="btn_plus"
          icon={<Icon type="plus" />}
          isActive={isDetailOpen}
          blindText={isDetailOpen}
          color={isDetailOpen ? 'toggle' : ''}
        >
          New Schema
        </Button>
      </div>
      <div className="document_table is_edit">
        {!isDetailOpen && (
          <div className="thead">
            <span className="th id">Name</span>
            <span className="th updated">Created</span>
            <span className="th version">Version</span>
          </div>
        )}
        {status === 'loading' && (
          <div className="box_skeleton">
            <p className="blind">Loading</p>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton is_small"></div>
            </div>
          </div>
        )}
        {status === 'failed' && (
          <div className="placeholder_box no_bg">
            <p className="desc">
              Search failed.
              <br />
              Please try refreshing the page.
            </p>
          </div>
        )}
        {status === 'idle' && (
          <ul className="tbody_list">
            {schemas.map((schema) => {
              const { name, createdAt, version } = schema;
              return (
                <li key={name} className="tbody_item">
                  <Link to={`./${name}`} className={classNames('link', { is_active: name === schemaName })}>
                    <span className="td id">{name}</span>
                    {!isDetailOpen && (
                      <>
                        <span className="td updated">
                          {format(
                            fromUnixTime(createdAt),
                            `MMM d${new Date().getFullYear() === fromUnixTime(createdAt).getFullYear() ? '' : ', yyyy'}, ${use24HourClock ? 'HH:mm' : 'h:mm a'}`,
                          )}
                        </span>
                        <span className="td connections">{version}</span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {status === 'idle' && schemas.length === 0 && (
          <div className="placeholder_box no_bg">
            <p className="desc">No Schema Found</p>
          </div>
        )}
      </div>
    </>
  );
}
