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

import { Button, Icon, InputHelperText, InputTextField, Popover, Dropdown, Modal } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences } from 'features/users/usersSlice';
import { linter, lintGutter, Diagnostic } from '@codemirror/lint';
import { useForm } from 'react-hook-form';
import {
  selectSchemaCreate,
  resetCreateSuccess,
  createSchemaAsync,
  SchemaCreateFields,
  getSchemasAsync,
  selectSchemaDetail,
  resetDetailSuccess,
  listSchemasAsync,
  removeSchemaAsync,
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
  const { schemas } = useAppSelector(selectSchemaDetail);
  const [schemaVersion, setSchemaVersion] = useState<number>(0);
  const [schemaBody, setSchemaBody] = useState(INITIAL_BODY);
  const [createdSchemaName, setCreatedSchemaName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionOpened, setOptionOpened] = useState(false);
  const [versionOpened, setVersionOpened] = useState(false);
  const schemaEditable = schemas.length === 0 || (schemas.length > 0 && schemaVersion === schemas[0].version);

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

    dispatch(getSchemasAsync({ projectName, schemaName }));
  }, [projectName, schemaName]);

  useEffect(() => {
    reset();
    if (schemas.length > 0) {
      setSchemaBody(schemas[0].body);
      setSchemaVersion(schemas[0].version);
    } else {
      setSchemaBody(INITIAL_BODY);
      setSchemaVersion(0);
      setCreatedSchemaName(null);
    }
  }, [schemas]);

  useEffect(() => {
    if (!error) return;

    setError(error.target, { type: 'custom', message: error.message }, { shouldFocus: true });
  }, [error, setError]);

  useEffect(() => {
    if (isSuccess && createdSchemaName) {
      dispatch(resetCreateSuccess());
      dispatch(resetDetailSuccess());
      dispatch(listSchemasAsync({ projectName: projectName! }));
      dispatch(getSchemasAsync({ projectName: projectName!, schemaName: createdSchemaName }));
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
      data.name = schemas.length ? schemas[0].name : data.name;
      data.projectName = projectName!;
      data.version = schemas.length ? schemas[0].version + 1 : 1;
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
    <>
      <div className="detail_content schema_detail">
        <form onSubmit={handleSubmit(onSubmit)} className="schema_form">
          <div className="document_header">
            <div className="title_box">
              <Link to="../" state={{ previousProjectName: projectName }} className="btn_back">
                <Icon type="arrowBack" />
              </Link>
              <div className="title_inner schema_title_inner">
                {schemas.length ? (
                  <>
                    <strong className="title">{schemas[0].name}</strong>
                    <div className="filter_item">
                      <Popover opened={versionOpened} onChange={setVersionOpened}>
                        <Popover.Target>
                          <button type="button" className="btn btn_small filter_desc">
                            <span className="text">v{schemaVersion}</span>
                            <Icon type="arrow" className="icon_arrow" />
                          </button>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Dropdown>
                            <Dropdown.List>
                              {schemas.map(({ version }) => (
                                <Dropdown.Item
                                  key={version}
                                  onClick={() => {
                                    reset();
                                    setSchemaVersion(version);
                                    setSchemaBody(schemas.find((schema) => schema.version === version)?.body || '');
                                    setVersionOpened(false);
                                  }}
                                >
                                  {schemaVersion === version && <Icon type="check" color="orange_0" />}
                                  <Dropdown.Text>v{version}</Dropdown.Text>
                                </Dropdown.Item>
                              ))}
                            </Dropdown.List>
                          </Dropdown>
                        </Popover.Dropdown>
                      </Popover>
                    </div>
                  </>
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
                <Popover opened={optionOpened} onChange={setOptionOpened}>
                  <Popover.Target>
                    <button type="button" className="btn btn_more">
                      <Icon type="moreLarge" />
                    </button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Dropdown>
                      <Dropdown.Title>More Options</Dropdown.Title>
                      <Dropdown.List>
                        <Dropdown.Item
                          onClick={async () => {
                            setIsModalOpen(true);
                          }}
                        >
                          <Dropdown.Text highlight>Delete Schema</Dropdown.Text>
                        </Dropdown.Item>
                      </Dropdown.List>
                    </Dropdown>
                  </Popover.Dropdown>
                </Popover>
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
                editable={schemaEditable}
              />
            </div>
            {formErrors.body?.message && <InputHelperText state="error" message={formErrors.body?.message} />}
          </div>
          <div className="btn_area">
            <Button type="submit" color="primary" disabled={!schemaEditable}>
              {schemas.length ? 'Update Version' : 'Create'}
            </Button>
            {!schemaEditable && (
              <span className="desc">Editing is only available in the latest version of the schema.</span>
            )}
          </div>
        </form>
      </div>
      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Icon type="alert" className="red_0" />
          </Modal.Top>
          <Modal.Content>
            <Modal.Title>Are you sure you want to delete this version?</Modal.Title>
            <Modal.Description>
              This action cannot be undone. This will permanently delete <strong>v{schemaVersion}</strong> of the{' '}
              <strong>{schemaName}</strong> schema.
            </Modal.Description>
          </Modal.Content>
          <Modal.Bottom>
            <Button.Box fullWidth>
              <Button
                outline
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                No, cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  await dispatch(
                    removeSchemaAsync({ projectName: projectName!, schemaName: schemaName!, version: schemaVersion }),
                  );
                  navigate(`..`, { replace: true });
                }}
              >
                Yes, delete v{schemaVersion}
              </Button>
            </Button.Box>
          </Modal.Bottom>
        </Modal>
      )}
    </>
  );
}
