import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDocuments, selectStatus, fetchDocumentsAsync } from './documentsSlice';

export function DocumentList() {
  const status = useAppSelector(selectStatus);
  const documents = useAppSelector(selectDocuments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocumentsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Document List</h1>
      { status === 'loading' && <div>Loading...</div> }
      { status === 'failed' && <div>Failed!</div> }
      { status === 'idle' &&
        <ul>
          { documents.map(document => (
            <li key={document.id}>{document.title}</li>
          )) }
        </ul>
      }
    </div>
  );
}
