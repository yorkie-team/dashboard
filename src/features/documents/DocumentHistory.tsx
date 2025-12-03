/*
 * Copyright 2025 The Yorkie Authors. All rights reserved.
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

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fromUnixTime, format } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectPreferences } from 'features/users/usersSlice';
import { selectCurrentProject } from 'features/projects/projectsSlice';
import {
  selectDocumentRevisions,
  listRevisionsAsync,
  getRevisionAsync,
  restoreRevisionAsync,
  resetRevisions,
} from './documentsSlice';
import { Icon, Button, CodeBlock, Modal } from 'components';
import { useClipboard } from 'hooks';
import { formatYSON } from 'utils';

export function DocumentHistory() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const documentKey = params.documentKey || '';
  const { project: currentProject } = useAppSelector(selectCurrentProject);
  const { list, selectedRevision, status, hasMore, isLoadingMore, offset, totalCount } =
    useAppSelector(selectDocumentRevisions);
  const { use24HourClock } = useAppSelector(selectPreferences);
  const [selectedRevisionId, setSelectedRevisionId] = useState<string | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const clipboard = useClipboard();

  // Reset selection and revisions state when project or document changes
  useEffect(() => {
    setSelectedRevisionId(null);
    dispatch(resetRevisions());
  }, [dispatch, currentProject?.id, documentKey]);

  // Load revisions when project or document changes
  useEffect(() => {
    if (!currentProject || !documentKey) return;

    const loadRevisions = async () => {
      const result = await dispatch(
        listRevisionsAsync({
          projectName: currentProject.name,
          documentKey,
          pageSize: 100,
          offset: 0,
          isForward: false,
        }),
      ).unwrap();

      // After loading revisions, select the first one
      if (result.revisions.length > 0) {
        const latestRevision = result.revisions[0];
        setSelectedRevisionId(latestRevision.id);
        dispatch(
          getRevisionAsync({
            projectName: currentProject.name,
            documentKey,
            revisionId: latestRevision.id,
          }),
        );
      }
    };

    loadRevisions();
  }, [dispatch, currentProject, documentKey]);

  const handleRevisionClick = (revisionId: string) => {
    if (!currentProject) return;

    setSelectedRevisionId(revisionId);
    dispatch(
      getRevisionAsync({
        projectName: currentProject.name,
        documentKey,
        revisionId,
      }),
    );
  };

  const getSnapshotYSON = () => {
    if (!selectedRevision?.snapshot) return '{}';
    try {
      return formatYSON(selectedRevision.snapshot);
    } catch (e) {
      // If formatting fails, return the original
      return selectedRevision.snapshot;
    }
  };

  const handleRestoreClick = () => {
    setShowRestoreModal(true);
  };

  const handleRestoreConfirm = async () => {
    if (!selectedRevision || !currentProject) return;

    setIsRestoring(true);
    try {
      await dispatch(
        restoreRevisionAsync({
          projectName: currentProject.name,
          documentKey,
          revisionId: selectedRevision.id,
        }),
      ).unwrap();

      alert(`Successfully restored to revision ${selectedRevision.label || selectedRevision.id}`);
      setShowRestoreModal(false);
      navigate('..', { relative: 'path' });
    } catch (error) {
      alert('Failed to restore revision. Please try again.');
    } finally {
      setIsRestoring(false);
    }
  };

  const selectedIndex = list.findIndex((rev) => rev.id === selectedRevisionId);

  const loadMoreRevisions = () => {
    if (!currentProject || !hasMore || isLoadingMore) return;

    dispatch(
      listRevisionsAsync({
        projectName: currentProject.name,
        documentKey,
        pageSize: 100,
        offset,
        isForward: false,
        append: true,
      }),
    );
  };

  // Auto-load more when slider reaches near the end
  useEffect(() => {
    const threshold = 10; // Load more when within 10 items from the end
    if (selectedIndex >= list.length - threshold && hasMore && !isLoadingMore && selectedIndex >= 0) {
      loadMoreRevisions();
    }
  }, [selectedIndex, list.length, hasMore, isLoadingMore]);

  return (
    <div className="detail_content" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div className="document_header">
        <div className="title_box">
          <Link to=".." relative="path" className="btn_back">
            <Icon type="arrowBack" />
          </Link>
          <div className="title_inner">
            <strong className="title">{documentKey} - History</strong>
          </div>
        </div>
      </div>

      {/* Revision Slider */}
      <div className="revision_slider_container">
        <div className="revision_info">
          <div className="revision_title">
            {selectedRevision && (
              <>
                Revision {selectedRevision.label && ` - ${selectedRevision.label}`}
                <span className="revision_date">
                  {format(fromUnixTime(selectedRevision.createdAt), `MMM d, ${use24HourClock ? 'HH:mm' : 'h:mm a'}`)}
                </span>
              </>
            )}
          </div>
          <div className="revision_count">
            {selectedIndex >= 0 && `${selectedIndex + 1} of ${list.length}`}
            {hasMore && ` (${list.length}/${totalCount} loaded)`}
            {isLoadingMore && <span className="loading_more"> Loading...</span>}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="no_revisions">No revisions found</div>
        ) : (
          <div className="slider_controls">
            <Button
              icon={<Icon type="arrowBack" />}
              color="toggle"
              outline
              disabled={selectedIndex <= 0}
              onClick={() => selectedIndex > 0 && handleRevisionClick(list[selectedIndex - 1].id)}
              style={{ minWidth: '32px', padding: '4px 8px' }}
            />

            <div className="slider_wrapper">
              <input
                type="range"
                className="revision_slider"
                min="0"
                max={list.length - 1}
                value={selectedIndex >= 0 ? selectedIndex : 0}
                onChange={(e) => {
                  const idx = parseInt(e.target.value);
                  handleRevisionClick(list[idx].id);
                }}
              />
              <div className="slider_labels">
                {list.length > 0 && (
                  <>
                    <span>{list[0].label && `(${list[0].label})`}</span>
                    {list.length > 1 && (
                      <span>{list[list.length - 1].label && `(${list[list.length - 1].label})`}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            <Button
              icon={<Icon type="arrowBack" />}
              color="toggle"
              outline
              disabled={selectedIndex >= list.length - 1}
              onClick={() => selectedIndex < list.length - 1 && handleRevisionClick(list[selectedIndex + 1].id)}
              style={{ minWidth: '32px', padding: '4px 8px', transform: 'rotate(180deg)' }}
            />
          </div>
        )}
      </div>

      {/* Revision Detail */}
      <div className="revision_detail" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div className="codeblock_header" style={{ flexShrink: 0 }}>
          <div className="box_left">
            {selectedRevision?.description && (
              <span className="revision_description">{selectedRevision.description}</span>
            )}
          </div>
          <div className="box_right">
            {selectedRevision && (
              <>
                <Button
                  onClick={() => clipboard.copy(getSnapshotYSON())}
                  icon={clipboard.copied ? <Icon type="check" /> : <Icon type="copy" />}
                  color="toggle"
                  outline
                  title={clipboard.copied ? 'Copied!' : 'Copy snapshot'}
                />
                <Button
                  onClick={handleRestoreClick}
                  icon={<Icon type="repeat" />}
                  outline
                  disabled={selectedIndex === 0}
                  title={selectedIndex === 0 ? 'Already at latest revision' : 'Restore to this revision'}
                />
              </>
            )}
          </div>
        </div>
        <div className="codeblock" style={{ flex: 1, overflow: 'auto', position: 'relative', minHeight: 0 }}>
          {status === 'loading' && (
            <div className="loading_overlay">
              <div className="loading_text">Loading...</div>
            </div>
          )}
          {selectedRevision ? (
            <CodeBlock.Code code={getSnapshotYSON()} language="json" withLineNumbers />
          ) : (
            <div className="empty_state">Select a revision to view</div>
          )}
        </div>
      </div>

      {showRestoreModal && (
        <Modal>
          <Modal.Top>
            <Modal.Title>Restore Document</Modal.Title>
            <Modal.CloseButton onClick={() => setShowRestoreModal(false)} />
          </Modal.Top>
          <Modal.Content>
            <Modal.Description>
              Are you sure you want to restore this document to this revision?
              {selectedRevision?.label && ` (${selectedRevision.label})`}
              <br />
              <br />
              This action will update the document to the state at:
              <br />
              <strong>
                {selectedRevision &&
                  format(
                    fromUnixTime(selectedRevision.createdAt),
                    `MMM d, yyyy ${use24HourClock ? 'HH:mm:ss' : 'h:mm:ss a'}`,
                  )}
              </strong>
            </Modal.Description>
          </Modal.Content>
          <Modal.Bottom>
            <Button.Box fullWidth>
              <Button outline onClick={() => setShowRestoreModal(false)} disabled={isRestoring}>
                Cancel
              </Button>
              <Button onClick={handleRestoreConfirm} disabled={isRestoring}>
                {isRestoring ? 'Restoring...' : 'Restore'}
              </Button>
            </Button.Box>
          </Modal.Bottom>
        </Modal>
      )}

      <style>{`
        .project_document_page .document_detail_area .detail_content {
          width: 100% !important;
          padding-left: 0 !important;
        }
        
        .revision_slider_container {
          padding: 24px 20px;
          flex-shrink: 0;
        }
        
        .revision_info {
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .revision_title {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-900);
        }
        
        .revision_date {
          margin-left: 12px;
          font-size: 12px;
          font-weight: 400;
          color: var(--gray-600);
        }
        
        .revision_count {
          font-size: 12px;
          color: var(--gray-600);
        }
        
        .loading_more {
          margin-left: 8px;
          font-style: italic;
          color: var(--gray-500);
        }
        
        .no_revisions {
          text-align: center;
          padding: 20px;
          color: var(--gray-500);
        }
        
        .slider_controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .slider_wrapper {
          flex: 1;
          position: relative;
        }
        
        .revision_slider {
          width: 100%;
          cursor: pointer;
          accent-color: var(--gray-900);
        }
        
        .slider_labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 11px;
          color: var(--gray-500);
        }
        
        .revision_detail .codeblock_header {
          min-height: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .revision_detail .codeblock_header .box_left {
          min-height: 24px;
          display: flex;
          align-items: center;
        }
        
        .revision_detail .codeblock_header .box_right {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .revision_description {
          font-size: 13px;
          color: var(--gray-600);
          font-weight: 400;
        }
        
        .loading_overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--gray-000);
          opacity: 0.9;
          z-index: 10;
        }
        
        .loading_text {
          text-align: center;
          color: var(--gray-500);
        }
        
        .empty_state {
          padding: 20px;
          text-align: center;
          color: var(--gray-500);
        }
      `}</style>
    </div>
  );
}
