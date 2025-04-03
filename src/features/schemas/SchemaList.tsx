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

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectSchemaList, listSchemasAsync } from './schemasSlice';
import { Checkbox } from 'components';
import { selectPreferences } from 'features/users/usersSlice';

export function SchemaList({ isDetailOpen = false }: { isDetailOpen?: boolean }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const projectName = params.projectName || '';
  const schemaName = params.schemaName || '';
  const { schemas, status } = useAppSelector(selectSchemaList);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const prevProjectName = useLocation().state?.previousProjectName;
  const [selectedSchemaNames, setSelectedSchemaNames] = useState<Array<string>>([]);

  useEffect(() => {
    dispatch(listSchemasAsync({ projectName }));
  }, [dispatch, prevProjectName, projectName]);

  return (
    <>
      <div className="document_table is_edit">
        {!isDetailOpen && (
          <div className="thead">
            <span className="th id">Schema Name</span>
            <span className="th updated">Created At</span>
            <span className="th select">
              <button
                type="button"
                className="btn_all_check"
                onClick={() => {
                  if (selectedSchemaNames.length === schemas.length) {
                    setSelectedSchemaNames([]);
                    return;
                  }

                  setSelectedSchemaNames(schemas.map((schema) => schema.name));
                }}
              >
                {schemas.length ? 'Select All' : ''}
              </button>
            </span>
          </div>
        )}
        {status === 'loading' && (
          <div className="box_skeleton">
            <p className="blind">Loading</p>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
            </div>
            <div className="box_flex">
              <div className="skeleton"></div>
              <div className="skeleton is_small"></div>
              <div className="skeleton"></div>
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
              const { name, createdAt } = schema;
              return (
                <li key={name} className="tbody_item">
                  <Link
                    to={`./${name}`}
                    state={{ previousProjectName: projectName }}
                    className={classNames('link', { is_active: name === schemaName })}
                  >
                    <span className="td id">{name}</span>
                    {!isDetailOpen && (
                      <span className="td updated">
                        {format(
                          fromUnixTime(createdAt),
                          `MMM d${new Date().getFullYear() === fromUnixTime(createdAt).getFullYear() ? '' : ', yyyy'}, ${use24HourClock ? 'HH:mm' : 'h:mm a'}`,
                        )}
                      </span>
                    )}
                  </Link>
                  {!isDetailOpen && (
                    <span className="td select">
                      <Checkbox
                        id={name}
                        onChange={() => {
                          setSelectedSchemaNames((prev) => {
                            if (prev.includes(name)) {
                              return prev.filter((item) => item !== name);
                            }
                            return [...prev, name];
                          });
                        }}
                        checked={selectedSchemaNames.includes(name)}
                      />
                    </span>
                  )}
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
