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

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { validate, buildRuleset } from '@yorkie-js/schema';
import classNames from 'classnames';

import { Button, Icon, InputHelperText, InputTextField } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences } from 'features/users/usersSlice';
import { linter, lintGutter, Diagnostic } from '@codemirror/lint';
import { useForm } from 'react-hook-form';
import {
  selectSchemaCreate,
  resetCreateSuccess,
  createSchemaAsync,
  SchemaCreateFields,
  getSchemaAsync,
  selectSchemaDetail,
  resetDetailSuccess,
  listSchemasAsync,
} from './schemasSlice';

const INITIAL_BODY = `// Document is the root of the document.
// Every schema must have a Document type.
type Document = {
  title: string;
  content: string;
};
`;

const yorkieLinter = linter((view): Array<Diagnostic> => {
  const code = view.state.doc.toString();
  return validate(code).errors.map((error) => {
    return {
      from: view.state.doc.line(error.range.start.line).from + error.range.start.column,
      to: view.state.doc.line(error.range.end.line).from + error.range.end.column,
      message: error.message,
      severity: error.severity,
    };
  });
});

const scrollStyle = EditorView.theme({
  '.cm-scroller': {
    overflowY: 'scroll',
  },
  '.cm-scroller::-webkit-scrollbar': {
    width: '3px',
    height: '3px',
  },
  '.cm-scroller::-webkit-scrollbar-thumb': {
    background: 'var(--orange-alpha-dark)',
    borderRadius: '2px',
  },
});

export function SchemaDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { projectName, schemaName } = useParams();
  const { theme } = useAppSelector(selectPreferences);
  const { isSuccess, error } = useAppSelector(selectSchemaCreate);
  const { schema } = useAppSelector(selectSchemaDetail);
  const [schemaBody, setSchemaBody] = useState(INITIAL_BODY);
  const [createdSchemaName, setCreatedSchemaName] = useState<string | null>(null);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    clearErrors,
    reset,
  } = useForm<SchemaCreateFields>();

  useEffect(() => {
    if (!projectName || !schemaName) {
      dispatch(resetDetailSuccess());
      return;
    }

    // TODO(hackerwins): Manage schema version.
    dispatch(getSchemaAsync({ projectName, schemaName, schemaVersion: 1 }));
  }, [projectName, schemaName]);

  useEffect(() => {
    clearErrors('body');
    if (schema) {
      setSchemaBody(schema.body);
    } else {
      reset();
      setSchemaBody(INITIAL_BODY);
      setCreatedSchemaName(null);
    }
  }, [schema]);

  useEffect(() => {
    if (!error) return;

    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess && createdSchemaName) {
      dispatch(resetCreateSuccess());
      dispatch(resetDetailSuccess());
      dispatch(listSchemasAsync({ projectName: projectName! }));
      navigate(`${location.pathname.substring(0, location.pathname.lastIndexOf('/'))}/${createdSchemaName}`);
    }
  }, [isSuccess, createdSchemaName, navigate, location]);

  useEffect(() => {
    return () => {
      dispatch(resetCreateSuccess());
      dispatch(resetDetailSuccess());
    };
  }, []);

  const onChange = useCallback(
    (value: string) => {
      setSchemaBody(value);
      if (validate(value).errors.length > 0) {
        setError('body', {
          type: 'manual',
          message: 'Schema contains errors',
        });
      } else {
        clearErrors('body');
      }
    },
    [setError, clearErrors],
  );

  const onSubmit = useCallback(
    (data: SchemaCreateFields) => {
      data.projectName = projectName!;
      data.version = 1;
      data.body = schemaBody;
      data.ruleset = [];

      // TODO(hackerwins): Refactor buildRuleset to return a list.
      const ruleset = buildRuleset(data.body);
      for (const [, value] of ruleset.entries()) {
        data.ruleset.push(value);
      }

      setCreatedSchemaName(data.name);
      dispatch(createSchemaAsync(data));
    },
    [dispatch, projectName, schemaBody],
  );

  return (
    <div className="detail_content">
      <form onSubmit={handleSubmit(onSubmit)} className="schema_form">
        <div className="document_header">
          <div className="title_box">
            <Link to="../" state={{ previousProjectName: projectName }} className="btn_back">
              <Icon type="arrowBack" />
            </Link>
            <div className="title_inner schema_title_inner">
              {schema ? (
                <strong className="title">
                  {schema.name}@v{schema.version}
                </strong>
              ) : (
                <InputTextField
                  id="name"
                  label="Schema Name"
                  blindLabel={true}
                  placeholder="Schema Name"
                  {...register('name', {
                    required: 'The schema name is required',
                  })}
                  autoComplete="off"
                  autoFocus
                  state={formErrors.name ? 'error' : 'normal'}
                  helperText={(formErrors.name && formErrors.name.message) || ''}
                  large
                />
              )}
            </div>
          </div>
        </div>
        <div
          className={classNames('schema_editor_box input_box', {
            is_error: formErrors.body?.message,
          })}
        >
          <div className="schema_editor">
            <CodeMirror
              height="100%"
              style={{ height: '100%' }}
              theme={theme.darkMode ? 'dark' : 'light'}
              value={schemaBody}
              onChange={onChange}
              extensions={[javascript({ typescript: true }), yorkieLinter, lintGutter(), scrollStyle]}
            />
          </div>
          {formErrors.body?.message && <InputHelperText state="error" message={formErrors.body?.message} />}
        </div>
        <div className="btn_area">
          <Button type="submit" color="primary">
            {schema ? 'Update Version (WIP)' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
}
