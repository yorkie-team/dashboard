import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDocuments, selectStatus, listDocumentsAsync } from './documentsSlice';

// DocumentList represents the list of documents in the application.
export function DocumentList() {
  const status = useAppSelector(selectStatus);
  const documents = useAppSelector(selectDocuments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listDocumentsAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Document List</h1>
      { status === 'loading' && <div>Loading...</div> }
      { status === 'failed' && <div>Failed!</div> }
      { status === 'idle' &&
        <ul>
          { documents.map(document => (
            <li key={document.id}>{document.key.collection}${document.key.document} {document.snapshot}</li>
          )) }
        </ul>
      }
    </div>
  );
}
