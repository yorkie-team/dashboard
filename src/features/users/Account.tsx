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

import React, { useCallback, useState, useEffect } from 'react';
import { Button, Icon, Modal, InputTextBox } from 'components';
import { selectUsers, ChangePasswordFields, changePassword, logoutUser } from './usersSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useForm } from 'react-hook-form';

export function Account() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    username,
    changePassword: { isSuccess, status, error },
  } = useAppSelector(selectUsers);

  const {
    register,
    watch,
    formState: { errors: formErrors },
    handleSubmit,
    setError,
    trigger,
    reset,
  } = useForm<Omit<ChangePasswordFields, 'username'>>();

  const onSubmit = useCallback(
    async (data: Omit<ChangePasswordFields, 'username'>) => {
      await dispatch(changePassword({ ...data, username }));
      await dispatch(logoutUser());
    },
    [dispatch, username],
  );

  const onClose = useCallback(() => {
    reset();
    setIsModalOpen(false);
  }, [reset, setIsModalOpen]);

  useEffect(() => {
    if (!error) return;
    const { target, message } = error;
    setError(target, { type: 'custom', message: message }, { shouldFocus: true });
  }, [error, setError]);

  return (
    <div className="setting_box" id="danger">
      <div className="setting_title">
        <strong className="text">Account</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Change Password</dt>
        <dd className="sub_desc">
          <p className="guide">
            Update your current password to enhance account security.
            <br />
            Choose a strong, unique password that you don't use for other accounts.
          </p>
          <div className="btn_box">
            <Button
              color="primary"
              icon={<Icon type="repeat" />}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Change password
            </Button>
          </div>
        </dd>
      </dl>
      {isModalOpen && (
        <Modal>
          <Modal.Top>
            <Icon type="lockSmall" className="blue_dark" />
          </Modal.Top>
          <form className="form change_password_form" onSubmit={handleSubmit(onSubmit)}>
            <Modal.Content>
              <Modal.Title>Change Password</Modal.Title>
              <Modal.Description>To change your password, please fill in the fields below.</Modal.Description>
              <input hidden type="text" defaultValue={username} autoComplete="username"></input>
              <InputTextBox
                type="password"
                label="Current password"
                autoFocus
                blindLabel={true}
                floatingLabel={true}
                autoComplete="new-password"
                placeholder="Current password"
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  onChange: async () => {
                    await trigger(['password']);
                  },
                })}
                state={formErrors.password ? 'error' : 'normal'}
                helperText={formErrors.password?.message || ''}
              />
              <InputTextBox
                type="password"
                label="New password"
                blindLabel={true}
                floatingLabel={true}
                autoComplete="new-password"
                placeholder="New password"
                fullWidth
                {...register('newPassword', {
                  required: 'Password is required',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~`!?@#$%^&*()\-_+={}[\]|\\;:'"<>,./])(?:[a-zA-Z0-9~`!?@#$%^&*()\-_+={}[\]|\\;:'"<>,./]{8,30})$/,
                    message:
                      'Password must contain 8 to 30 characters with at least 1 alphabet, 1 number, and 1 special character',
                  },
                  validate: (value) =>
                    value !== watch('password') ||
                    'New password cannot be the same as your current password. Please choose a different password.',
                  onChange: async () => {
                    await trigger(['newPassword', 'confirmPassword']);
                  },
                })}
                state={formErrors.newPassword ? 'error' : 'normal'}
                helperText={formErrors.newPassword?.message || ''}
              />
              <InputTextBox
                type="password"
                label="Confirm new password"
                blindLabel={true}
                floatingLabel={true}
                autoComplete="new-password"
                placeholder="Confirm new password"
                fullWidth
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: (value) => value === watch('newPassword') || 'Passwords do not match',
                  onChange: async () => {
                    await trigger('confirmPassword');
                  },
                })}
                state={formErrors.confirmPassword ? 'error' : 'normal'}
                helperText={formErrors.confirmPassword?.message || ''}
              />
            </Modal.Content>
            <Modal.Bottom>
              <Button.Box fullWidth>
                <Button outline onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={status === 'loading' || isSuccess} color="info">
                  Change Password
                </Button>
              </Button.Box>
            </Modal.Bottom>
            <Modal.CloseButton onClick={onClose} />
          </form>
        </Modal>
      )}
    </div>
  );
}
