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
import { Link, useNavigate, useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { validate, buildRuleset } from '@yorkie-js/schema';

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

export function SchemaDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectName, schemaName } = useParams();
  const { theme } = useAppSelector(selectPreferences);
  const { isSuccess, error } = useAppSelector(selectSchemaCreate);
  const { schema } = useAppSelector(selectSchemaDetail);
  const [schemaBody, setSchemaBody] = useState(INITIAL_BODY);

  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<SchemaCreateFields>();

  useEffect(() => {
    return () => {
      dispatch(resetCreateSuccess());
      dispatch(resetDetailSuccess());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!projectName || !schemaName) {
      return;
    }

    // TODO(hackerwins): Manage schema version.
    dispatch(getSchemaAsync({ projectName, schemaName, schemaVersion: 1 }));
  }, [projectName, schemaName]);

  useEffect(() => {
    if (schema) {
      setSchemaBody(schema.body);
    }
  }, [schema]);

  useEffect(() => {
    if (!error) return;

    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess) {
      navigate(`..`);
    }
  }, [dispatch, isSuccess, navigate, projectName]);

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

      dispatch(createSchemaAsync(data));
    },
    [dispatch, projectName, schemaBody],
  );

  return (
    <div className="detail_content">
      <div className="document_header">
        <div className="title_box">
          <Link to="../" state={{ previousProjectName: projectName }} className="btn_back">
            <Icon type="arrowBack" />
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="title_inner">
          {schema ? (
            <h2>
              {schema.name}@v{schema.version}
            </h2>
          ) : (
            <InputTextField
              id="name"
              label=""
              blindLabel={true}
              placeholder="Schema Name"
              {...register('name', { required: 'Schema Name is required' })}
              autoComplete="off"
              autoFocus
              state={formErrors.name ? 'error' : 'normal'}
              helperText={(formErrors.name && formErrors.name.message) || ''}
              large
            />
          )}
        </div>
        <div style={{ marginTop: '20px' }}>
          <CodeMirror
            theme={theme.darkMode ? 'dark' : 'light'}
            value={schemaBody}
            onChange={onChange}
            extensions={[javascript({ typescript: true }), yorkieLinter, lintGutter()]}
          />
          {formErrors.body?.message && <InputHelperText state="error" message={formErrors.body?.message} />}
        </div>
        <div className="btn_area" style={{ marginTop: '20px' }}>
          <Button.Box>
            <Button as="link" href="../" outline>
              Cancel
            </Button>
            <Button type="submit" color="info" outline>
              Create
            </Button>
          </Button.Box>
        </div>
      </form>
    </div>
  );
}
