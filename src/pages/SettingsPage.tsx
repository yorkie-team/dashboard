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
import { Button, Icon } from 'components';
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
          <nav className="navigator">
            <ul className="navigator_list">
              <li className="navigator_group is_active">
                <span className="navigator_item">Preferences</span>
              </li>
            </ul>
          </nav>
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
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z" fill="#23C176"></path>
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
                    </label> <label className="input_radio_box">
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
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.3536 2.64645C10.5488 2.84171 10.5488 3.15829 10.3536 3.35355L4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L1.64645 6.35355C1.45118 6.15829 1.45118 5.84171 1.64645 5.64645C1.84171 5.45118 2.15829 5.45118 2.35355 5.64645L4.5 7.79289L9.64645 2.64645C9.84171 2.45118 10.1583 2.45118 10.3536 2.64645Z" fill="#23C176"></path>
                        </svg>

                      </span>
                    </em>
                    <span className="label">Use a 24-hour clock</span>
                  </label> <span className="time">01:00:00 PM</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <Button icon={<Icon type="close" />} className="btn_close" onClick={handleCloseBtn}>
          <span className="blind">Go back</span>
        </Button>
        <button type="button" className="btn btn_top">
          <span className="icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="30" height="30" rx="6" fill="#FEFDFB"></rect>
              <path fillRule="evenodd" clipRule="evenodd" d="M9.21392 6.90067e-07H22.7861C24.074 -1.97186e-05 25.137 -3.65019e-05 26.0029 0.0707112C26.9023 0.144192 27.729 0.301894 28.5055 0.69756C29.7098 1.31115 30.6889 2.29022 31.3024 3.49446C31.6981 4.271 31.8558 5.09772 31.9293 5.99708C32 6.86298 32 7.92595 32 9.21388V22.7861C32 24.0741 32 25.137 31.9293 26.0029C31.8558 26.9023 31.6981 27.729 31.3024 28.5055C30.6889 29.7098 29.7098 30.6889 28.5055 31.3024C27.729 31.6981 26.9023 31.8558 26.0029 31.9293C25.137 32 24.0741 32 22.7861 32H9.21388C7.92595 32 6.86298 32 5.99708 31.9293C5.09772 31.8558 4.271 31.6981 3.49446 31.3024C2.29022 30.6889 1.31115 29.7098 0.69756 28.5055C0.301894 27.729 0.144192 26.9023 0.0707112 26.0029C-3.65019e-05 25.137 -1.97186e-05 24.074 6.90067e-07 22.7861V9.21392C-1.97186e-05 7.92597 -3.65019e-05 6.86299 0.0707112 5.99708C0.144192 5.09772 0.301894 4.271 0.69756 3.49446C1.31115 2.29022 2.29022 1.31115 3.49446 0.69756C4.271 0.301894 5.09772 0.144192 5.99708 0.0707112C6.86299 -3.65019e-05 7.92597 -1.97186e-05 9.21392 6.90067e-07ZM6.25766 3.26008C5.5562 3.3174 5.19747 3.42128 4.94723 3.54878C4.34511 3.85557 3.85557 4.34511 3.54878 4.94723C3.42128 5.19747 3.3174 5.5562 3.26008 6.25766C3.20125 6.9778 3.2 7.90947 3.2 9.28V22.72C3.2 24.0905 3.20125 25.0222 3.26008 25.7423C3.3174 26.4438 3.42128 26.8025 3.54878 27.0528C3.85558 27.6549 4.34511 28.1444 4.94723 28.4512C5.19747 28.5787 5.5562 28.6826 6.25766 28.7399C6.9778 28.7988 7.90947 28.8 9.28 28.8H22.72C24.0905 28.8 25.0222 28.7988 25.7423 28.7399C26.4438 28.6826 26.8025 28.5787 27.0528 28.4512C27.6549 28.1444 28.1444 27.6549 28.4512 27.0528C28.5787 26.8025 28.6826 26.4438 28.7399 25.7423C28.7988 25.0222 28.8 24.0905 28.8 22.72V9.28C28.8 7.90947 28.7988 6.97781 28.7399 6.25766C28.6826 5.5562 28.5787 5.19747 28.4512 4.94723C28.1444 4.34511 27.6549 3.85558 27.0528 3.54878C26.8025 3.42128 26.4438 3.3174 25.7423 3.26008C25.0222 3.20125 24.0905 3.2 22.72 3.2H9.28C7.90947 3.2 6.9778 3.20125 6.25766 3.26008ZM14.8686 8.46863C15.4935 7.84379 16.5065 7.84379 17.1314 8.46863L23.5314 14.8686C24.1562 15.4935 24.1562 16.5065 23.5314 17.1314C22.9065 17.7562 21.8935 17.7562 21.2686 17.1314L17.6 13.4627V22.4C17.6 23.2837 16.8837 24 16 24C15.1163 24 14.4 23.2837 14.4 22.4V13.4627L10.7314 17.1314C10.1065 17.7562 9.09347 17.7562 8.46863 17.1314C7.84379 16.5065 7.84379 15.4935 8.46863 14.8686L14.8686 8.46863Z" fill="#A6A19E"></path>
            </svg>
          </span>
        </button>
      </div>
    </PageTemplate >
  );
}