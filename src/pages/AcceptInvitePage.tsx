/*
 * Copyright 2026 The Yorkie Authors. All rights reserved.
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

import { useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { acceptInviteAsync, resetAcceptInviteStatus, selectAcceptInviteStatus } from 'features/members/membersSlice';
import { Button } from 'components';
import { PageTemplate } from './PageTemplate';

export function AcceptInvitePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = useAppSelector(selectAcceptInviteStatus);

  const token = useMemo(() => (searchParams.get('token') || '').trim(), [searchParams]);

  useEffect(() => {
    dispatch(resetAcceptInviteStatus());
    if (!token) return;
    dispatch(acceptInviteAsync({ token }));
  }, [dispatch, token]);

  return (
    <PageTemplate className="invite_accept_page">
      <div className="placeholder_box">
        {!token && (
          <>
            <strong className="title">Invalid invite link</strong>
            <p className="desc">Missing token. Please check the invite link and try again.</p>
            <Button onClick={() => navigate('/projects')}>Go to Projects</Button>
          </>
        )}

        {token && status.status === 'loading' && (
          <>
            <strong className="title">Accepting invite…</strong>
            <p className="desc">Please wait a moment.</p>
          </>
        )}

        {token && status.status === 'failed' && (
          <>
            <strong className="title">Failed to accept invite</strong>
            <p className="desc">{status.error || 'Please try again or request a new invite link.'}</p>
            <Button onClick={() => dispatch(acceptInviteAsync({ token }))}>Retry</Button>
          </>
        )}

        {token && status.isSuccess && (
          <>
            <strong className="title">Invite accepted</strong>
            <p className="desc">You have been added as a project member.</p>
            <Button onClick={() => navigate('/projects')}>Go to Projects</Button>
          </>
        )}
      </div>
    </PageTemplate>
  );
}
