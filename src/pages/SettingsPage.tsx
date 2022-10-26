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

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTemplate } from './PageTemplate';
import { Button, Icon, Navigator } from 'components';
import { Preferences } from 'features/users/Preferences';

export function SettingsPage() {
  const navigate = useNavigate();
  const handleCloseBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <PageTemplate className="setting_account_page">
      <h2 className="page_title">
        <span className="text">Settings</span>
      </h2>
      <div className="setting_group">
        <Navigator navList={[{ name: 'Preferences', id: 'preferences' }]} />
        <div className="box_right">
          <Preferences />
        </div>
      </div>
      <Button icon={<Icon type="close" />} className="btn_close" onClick={handleCloseBtn} blindText>
        Go back
      </Button>
    </PageTemplate>
  );
}
