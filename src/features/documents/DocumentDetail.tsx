import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDocumentDetail, getDocumentAsync } from './documentsSlice';

export function DocumentDatail() {
  const { document, status } = useAppSelector(selectDocumentDetail);
  const dispatch = useAppDispatch();
  const { documentID } = useParams();

  useEffect(() => {
    dispatch(getDocumentAsync(documentID!));
  }, [dispatch, documentID]);

  return (
    <div className="px-5 border-l border-gray-100">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <>
          <h2 className="text-lg font-semibold">{document?.key}</h2>
          <div className="py-6">{document?.snapshot}</div>
        </>
      )}
    </div>
  );
}
