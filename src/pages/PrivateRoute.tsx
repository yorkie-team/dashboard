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

import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectUsers } from 'features/users/usersSlice';

export function PrivateRoute() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token, isValidToken, logout } = useAppSelector(selectUsers);

  useEffect(() => {
    if (logout.isSuccess) {
      window.location.href = `${import.meta.env.VITE_SERVICE_URL}`;
    } else if (!token || !isValidToken) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [token, navigate, location, isValidToken, logout, dispatch]);

  return <Outlet />;
}
