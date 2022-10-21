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
import { PageTemplate } from './PageTemplate';
import { Button, Icon, Navigator, InputToggle } from 'components';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const navigate = useNavigate();
  const handleCloseBtn = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <PageTemplate className="setting_account_page">
      <div className="content">
        <h2 className="page_title">
          <span className="text">User Settings</span>
        </h2>
        <div className="setting_group">
          <Navigator navList={[{ name: 'Preferences', id: 'sectionPreferences' }]} />
          <div className="box_right">
            <div className="setting_box">
              <div className="setting_title">
                <strong className="text">Preferences</strong>
              </div>
              <dl className="sub_info">
                <dt className="sub_title">Theme</dt>
                <dd className="sub_desc">
                  <InputToggle id="theme" label="Sync with system settings" />
                  <div className="input_group setting_theme">
                    <label className="input_radio_box">
                      <input type="radio" className="blind" name="theme" id="theme_dark" />
                      <em className="radio_ui">
                        <span className="ball"></span>
                      </em>
                      <span className="label">Dark</span>
                    </label>
                    <label className="input_radio_box">
                      <input type="radio" className="blind" name="theme" id="theme_light" />
                      <em className="radio_ui">
                        <span className="ball"></span>
                      </em>
                      <span className="label">Light</span>
                    </label>
                  </div>
                </dd>
                <dt className="sub_title">Times</dt>
                <dd className="sub_desc">
                  <InputToggle id="times" label="Use a 24-hour clock" />
                  <span className="time">01:00:00 PM</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <Button icon={<Icon type="close" />} className="btn_close" onClick={handleCloseBtn}>
          <span className="blind">Go back</span>
        </Button>
      </div>
    </PageTemplate>
  );
}
