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
import { InputToggle } from 'components';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences, toggleUseSystemTheme, toggleUseDarkTheme, toggleUse24HourClock } from './usersSlice';

export function Preferences() {
  const dispatch = useAppDispatch();
  const { theme, use24HourClock } = useAppSelector(selectPreferences);
  const handleThemeInputChanged = useCallback(() => {
    dispatch(toggleUseSystemTheme());
  }, [dispatch]);
  const handleThemeRadioChanged = useCallback(() => {
    dispatch(toggleUseDarkTheme());
  }, [dispatch]);
  const handleClockInputChanged = useCallback(() => {
    dispatch(toggleUse24HourClock());
  }, [dispatch]);

  return (
    <div className="setting_box" id="preferences">
      <div className="setting_title">
        <strong className="text">Preferences</strong>
      </div>
      <dl className="sub_info">
        <dt className="sub_title">Theme</dt>
        <dd className="sub_desc">
          <InputToggle
            id="theme"
            label="Sync with system settings"
            checked={theme.useSystem}
            onChange={handleThemeInputChanged}
          />
          <div className="input_group setting_theme">
            <label className="input_radio_box">
              <input
                type="radio"
                className="blind"
                name="theme"
                id="theme_dark"
                checked={theme.darkMode}
                disabled={theme.useSystem}
                onChange={handleThemeRadioChanged}
              />
              <em className="radio_ui">
                <span className="ball"></span>
              </em>
              <span className="label">Dark</span>
            </label>
            <label className="input_radio_box">
              <input
                type="radio"
                className="blind"
                name="theme"
                id="theme_light"
                checked={!theme.darkMode}
                disabled={theme.useSystem}
                onChange={handleThemeRadioChanged}
              />
              <em className="radio_ui">
                <span className="ball"></span>
              </em>
              <span className="label">Light</span>
            </label>
          </div>
        </dd>
        <dt className="sub_title">Times</dt>
        <dd className="sub_desc">
          <InputToggle
            id="times"
            label="Use a 24-hour clock"
            checked={use24HourClock}
            onChange={handleClockInputChanged}
          />
          <span className="time">{use24HourClock ? '13:00' : '1:00 PM'}</span>
        </dd>
      </dl>
    </div>
  );
}
