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

import { useState } from 'react';
import { Modal, Icon, Button, Popover } from 'components';

export function ModalView() {
  const [type, setType] = useState('basic1');
  return (
    <>
      <div style={{ position: 'relative', zIndex: '1000', display: 'flex', background: 'white', gap: '30px' }}>
        <button
          onClick={() => {
            setType('basic1');
          }}
        >
          basic1
        </button>
        <button
          onClick={() => {
            setType('basic2');
          }}
        >
          basic2
        </button>
        <button
          onClick={() => {
            setType('input');
          }}
        >
          input
        </button>
      </div>

      {type === 'basic1' && <Basic1Modal />}
      {type === 'basic2' && <Basic2Modal />}
      {type === 'input' && <InputModal />}
    </>
  );
}

function Basic1Modal() {
  return (
    <Modal>
      <Modal.Top>
        <Icon type="alert" className="red_0" />
      </Modal.Top>
      <Modal.Content>
        <Modal.Title>Are you sure you want to delete this team?</Modal.Title>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Box fullWidth>
          <Button color="danger">Remove</Button>
          <Button outline>Cancel</Button>
        </Button.Box>
      </Modal.Bottom>
    </Modal>
  );
}

function Basic2Modal() {
  return (
    <Modal>
      <Modal.Top>
        <Icon type="addMember" className="green_0" />
      </Modal.Top>
      <Modal.Content>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Content>
      <Modal.Bottom>
        <Button.Box fullWidth>
          <Button outline>Cancel</Button>
          <Button color="success">Confirm</Button>
        </Button.Box>
      </Modal.Bottom>
    </Modal>
  );
}

function InputModal() {
  return (
    <Modal large>
      <Modal.Top>
        <Icon type="addMember" className="blue_dark" />
      </Modal.Top>
      <Modal.Content>
        <Modal.Title>Modal title</Modal.Title>
        <Modal.Description>Description Are you sure you want to delete this team</Modal.Description>
      </Modal.Content>
      <Modal.Bottom combine>
        <Popover>
          <div className="input_box">
            <Popover.Target>
              <label className="input_inner_box">
                <input type="text" className="input" id="modal_input" placeholder="Email or username" />
              </label>
            </Popover.Target>
            <Popover.Dropdown>
              <ul className="member_list shadow_m">
                <li className="member_item ">
                  <button className="member_info">
                    <div className="profile">
                      <Icon type="memberEmail" />
                    </div>
                    <div className="info_box">
                      <dl className="details">
                        <dt className="blind">Member Email</dt>
                        <dd className="details_sub_desc">oooooseok@kaist.ac.kr</dd>
                      </dl>
                    </div>
                  </button>
                </li>
                <li className="member_item has_border">
                  <button className="member_info">
                    <div className="profile">
                      <span className="img_box gradient_180deg_yellow">
                        <span className="name">WK</span>
                      </span>
                    </div>
                    <div className="info_box">
                      <dl className="details">
                        <dt className="blind">Member Name</dt>
                        <dd className="details_desc">Wooseok Kim</dd>
                        <dt className="blind">Member Email</dt>
                        <dd className="details_sub_desc">oooooseok@kaist.ac.kr</dd>
                      </dl>
                    </div>
                  </button>
                </li>
                <li className="member_item">
                  <button className="member_info">
                    <div className="profile">
                      <span className="img_box gradient_180deg_yellow">
                        <span className="name">oo</span>
                      </span>
                    </div>
                    <div className="info_box">
                      <dl className="details">
                        <dt className="blind">Member Name</dt>
                        <dd className="details_desc">ooooseok</dd>
                        <dt className="blind">Member Email</dt>
                        <dd className="details_sub_desc">nextinterface@kaist.ac.kr</dd>
                      </dl>
                    </div>
                  </button>
                </li>
              </ul>
            </Popover.Dropdown>
          </div>
        </Popover>
        <Button className="blue_0">Send Invite</Button>
      </Modal.Bottom>
      <Modal.CloseButton onClick={() => {}} />
    </Modal>
  );
}
