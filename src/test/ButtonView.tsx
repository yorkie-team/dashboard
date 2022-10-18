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

import React from 'react';
import { Button, Icon } from 'components';

export function ButtonView() {
  return (
    <>
      <div className="uio_group">
        <em className="uio_title">Color variation</em>
        <div className="uio_box">
          {[
            { className: 'gray900', text: 'Gray900' },
            { className: 'gray800', text: 'Gray800' },
            { className: 'gray700', text: 'Gray700' },
            { className: 'gray600', text: 'Gray600' },
            { className: 'gray500', text: 'Gray500' },
            { className: 'gray400', text: 'Gray400' },
            { className: 'gray300', text: 'Gray300' },
            { className: 'gray200', text: 'Gray200' },
            { className: 'gray100', text: 'Gray100' },
            { className: 'gray50', text: 'Gray50' },
            { className: 'white', text: 'White' },
          ].map(({ className, text }) => (
            <Button key={text} className={className}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'gray300', text: 'Gray300' },
            { className: 'gray200', text: 'Gray200' },
            { className: 'gray100', text: 'Gray100' },
            { className: 'gray50', text: 'Gray50' },
            { className: 'white', text: 'White' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'orange_dark', text: 'Orange (Dark)' },
            { className: 'orange_0', text: 'Orange' },
            { className: 'orange_light', text: 'Orange (Light)' },
            { className: 'orange_alpha_dark', text: 'Orange Alpha (Dark)' },
            { className: 'orange_alpha_0', text: 'Orange Alpha' },
            { className: 'orange_alpha_light', text: 'Orange Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'orange_dark', text: 'Orange (Dark)' },
            { className: 'orange_0', text: 'Orange' },
            { className: 'orange_light', text: 'Orange (Light)' },
            { className: 'orange_alpha_dark', text: 'Orange Alpha (Dark)' },
            { className: 'orange_alpha_0', text: 'Orange Alpha' },
            { className: 'orange_alpha_light', text: 'Orange Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'yellow_dark', text: 'Yellow (Dark)' },
            { className: 'yellow_0', text: 'Yellow' },
            { className: 'yellow_light', text: 'Yellow (Light)' },
            { className: 'yellow_alpha_dark', text: 'Yellow Alpha (Dark)' },
            { className: 'yellow_alpha_0', text: 'Yellow Alpha' },
            { className: 'yellow_alpha_light', text: 'Yellow Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'yellow_dark', text: 'Yellow (Dark)' },
            { className: 'yellow_0', text: 'Yellow' },
            { className: 'yellow_light', text: 'Yellow (Light)' },
            { className: 'yellow_alpha_dark', text: 'Yellow Alpha (Dark)' },
            { className: 'yellow_alpha_0', text: 'Yellow Alpha' },
            { className: 'yellow_alpha_light', text: 'Yellow Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'green_dark', text: 'Green (Dark)' },
            { className: 'green_0', text: 'Green' },
            { className: 'green_light', text: 'Green (Light)' },
            { className: 'green_alpha_dark', text: 'Green Alpha (Dark)' },
            { className: 'green_alpha_0', text: 'Green Alpha' },
            { className: 'green_alpha_light', text: 'Green Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'green_dark', text: 'Green (Dark)' },
            { className: 'green_0', text: 'Green' },
            { className: 'green_light', text: 'Green (Light)' },
            { className: 'green_alpha_dark', text: 'Green Alpha (Dark)' },
            { className: 'green_alpha_0', text: 'Green Alpha' },
            { className: 'green_alpha_light', text: 'Green Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'blue_dark', text: 'Blue (Dark)' },
            { className: 'blue_0', text: 'Blue' },
            { className: 'blue_light', text: 'Blue (Light)' },
            { className: 'blue_alpha_dark', text: 'Blue Alpha (Dark)' },
            { className: 'blue_alpha_0', text: 'Blue Alpha' },
            { className: 'blue_alpha_light', text: 'Blue Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'blue_dark', text: 'Blue (Dark)' },
            { className: 'blue_0', text: 'Blue' },
            { className: 'blue_light', text: 'Blue (Light)' },
            { className: 'blue_alpha_dark', text: 'Blue Alpha (Dark)' },
            { className: 'blue_alpha_0', text: 'Blue Alpha' },
            { className: 'blue_alpha_light', text: 'Blue Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'red_dark', text: 'Red (Dark)' },
            { className: 'red_0', text: 'Red' },
            { className: 'red_light', text: 'Red (Light)' },
            { className: 'red_alpha_dark', text: 'Red Alpha (Dark)' },
            { className: 'red_alpha_0', text: 'Red Alpha' },
            { className: 'red_alpha_light', text: 'Red Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'red_dark', text: 'Red (Dark)' },
            { className: 'red_0', text: 'Red' },
            { className: 'red_light', text: 'Red (Light)' },
            { className: 'red_alpha_dark', text: 'Red Alpha (Dark)' },
            { className: 'red_alpha_0', text: 'Red Alpha' },
            { className: 'red_alpha_light', text: 'Red Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'purple_dark', text: 'Purple (Dark)' },
            { className: 'purple_0', text: 'Purple' },
            { className: 'purple_light', text: 'Purple (Light)' },
            { className: 'purple_alpha_dark', text: 'Purple Alpha (Dark)' },
            { className: 'purple_alpha_0', text: 'Purple Alpha' },
            { className: 'purple_alpha_light', text: 'Purple Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`}>
              {text}
            </Button>
          ))}
        </div>
        <div className="uio_box">
          {[
            { className: 'purple_dark', text: 'Purple (Dark)' },
            { className: 'purple_0', text: 'Purple' },
            { className: 'purple_light', text: 'Purple (Light)' },
            { className: 'purple_alpha_dark', text: 'Purple Alpha (Dark)' },
            { className: 'purple_alpha_0', text: 'Purple Alpha' },
            { className: 'purple_alpha_light', text: 'Purple Alpha (Light)' },
          ].map(({ className, text }) => (
            <Button key={text} className={`${className}`} outline={true}>
              {text}
            </Button>
          ))}
        </div>
        <em className="uio_title">Status</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <Button outline={true}>Default</Button>
            <Button className=" gray300" disabled={true}>
              Disabled
            </Button>
          </div>
        </div>
        <em className="uio_title">Size</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <Button size="sm" outline={true}>
              Small
            </Button>
            <Button outline={true}>Medium (default)</Button>
            <Button size="lg" outline={true}>
              Large
            </Button>
          </div>
        </div>
        <em className="uio_title">With Icon</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <div className="btn_box">
              {[
                { className: 'orange_dark', text: 'Orange (Dark)' },
                { className: 'orange_0', text: 'Orange' },
                { className: 'orange_light', text: 'Orange (Light)' },
                {
                  className: 'orange_alpha_dark',
                  text: 'Orange Alpha (Dark)',
                },
                { className: 'orange_alpha_0', text: 'Orange Alpha' },
                {
                  className: 'orange_alpha_light',
                  text: 'Orange Alpha (Light)',
                },
              ].map(({ className, text }) => (
                <Button key={text} className={`${className}`} icon={<Icon type="circle" />}>
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <em className="uio_title">Only Icon</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <Button.Box>
              <Button color="toggle" isActive={true} blindText={true} icon={<Icon type="viewGrid" />}>
                2x2 layout
              </Button>
              <Button color="toggle" blindText={true} icon={<Icon type="viewGrid" />}>
                2x2 layout
              </Button>
              <Button color="toggle" isActive={true} blindText={true} icon={<Icon type="viewList" />}>
                1x2 layout
              </Button>
              <Button color="toggle" blindText={true} icon={<Icon type="viewList" />}>
                1x2 layout
              </Button>
            </Button.Box>
          </div>
        </div>
        <em className="uio_title">Multiple Button (Box & Full Width)</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <Button.Box fullWidth={true}>
              <Button color="primary">Send</Button>
            </Button.Box>
          </div>
          <div className="uio_box">
            <Button.Box fullWidth={true}>
              <Button outline={true}>Cancel</Button>
              <Button color="success">Confirm</Button>
            </Button.Box>
          </div>
        </div>
        <em className="uio_title">Tag as</em>
        <div className="uio_align_box">
          <div className="uio_box">
            <Button outline={true}>button</Button>
            <Button as="link" href="#" outline={true}>
              link
            </Button>
            <Button as="a" href="#" outline={true}>
              a
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
