/*
 * Copyright 2024 The Yorkie Authors. All rights reserved.
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

import React, { useCallback, useState } from 'react';
import { Button, Icon, Modal, InputTextBox } from 'components';
import { deleteUser, logoutUser, selectUsers } from './usersSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

export function DangerZone() {
  const dispatch = useAppDispatch();
  const {
    username,
    deleteAccount: { isSuccess, status, error },
  } = useAppSelector(selectUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await dispatch(deleteUser({ username, password: inputValue }));
      await dispatch(logoutUser());
      setInputValue('');
    },
    [dispatch, inputValue],
  );

  return (
    <div className="setting_box" id="danger">
      <div className="setting_title">
        <strong className="text">Danger zone</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Delete Account</dt>
        <dd className="sub_desc">
          <p className="guide">
            Permanently remove your account and all of its contents.
            <br />
            There is no going back. Please continue with caution.
          </p>
          <div className="btn_box">
            <Button
              icon={<Icon type="close" />}
              color="danger"
              outline
              onClick={() => {
                setInputValue('');
                setIsModalOpen(true);
              }}
            >
              Delete Account
            </Button>
          </div>
        </dd>
      </dl>
      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Icon type="alert" className="red_0" />
          </Modal.Top>
          <form className="form" onSubmit={handleSubmit}>
            <Modal.Content>
              <Modal.Title>Delete your account</Modal.Title>
              <Modal.Description>
                This action cannot be undone. This will permanently delete your account and all of its contents.
                <br />
                <br />
                Please enter your password to confirm.
              </Modal.Description>
              <InputTextBox
                type="password"
                label="Password"
                blindLabel
                autoFocus
                autoComplete="new-password"
                state={error ? 'error' : 'normal'}
                helperText={error?.message}
                value={inputValue}
                onChange={handleChange}
                placeholder="Current password"
                fullWidth
              />
            </Modal.Content>
            <Modal.Bottom>
              <Button.Box fullWidth>
                <Button
                  outline
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={status === 'loading' || isSuccess} color="danger">
                  {status !== 'loading' && 'Delete Account'}
                  {status === 'loading' && 'Deleting...'}
                </Button>
              </Button.Box>
            </Modal.Bottom>
            <Modal.CloseButton
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
