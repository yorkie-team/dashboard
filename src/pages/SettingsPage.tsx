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
import { Button, Icon, Navigator } from 'components';
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
                  <label className="input_toggle_box">
                    <input type="checkbox" className="blind" id="theme_checkbox" />
                    <em className="toggle_ui">
                      <span className="track"></span>
                      <span className="ball">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z"
                            fill="#23C176"
                          ></path>
                        </svg>
                      </span>
                    </em>
                    <span className="label">Sync with system settings</span>
                  </label>
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
                  <label className="input_toggle_box">
                    <input type="checkbox" className="blind" id="times_checkbox" />
                    <em className="toggle_ui">
                      <span className="track"></span>
                      <span className="ball">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z"
                            fill="#23C176"
                          ></path>
                        </svg>
                      </span>
                    </em>
                    <span className="label">Use a 24-hour clock</span>
                  </label>
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
