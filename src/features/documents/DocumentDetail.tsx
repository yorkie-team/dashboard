import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactJson from 'react-json-view';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectDocumentDetail, getDocumentAsync } from './documentsSlice';

function getDocumentJSON(snapshot: string | undefined): object {
  if (!snapshot) {
    return {};
  }
  return JSON.parse(snapshot);
}

// DocumentDetail represents the snapshot of document.
export function DocumentDatail() {
  const { document, status } = useAppSelector(selectDocumentDetail);
  const dispatch = useAppDispatch();
  const { projectName, documentKey } = useParams();
  const documentJson = getDocumentJSON(document?.snapshot);

  useEffect(() => {
    dispatch(getDocumentAsync({
      projectName: projectName!,
      documentKey: documentKey!,
    }));
  }, [dispatch, projectName, documentKey]);

  return (
    <div className="px-5 border-l border-gray-100">
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed!</div>}
      {status === 'idle' && (
        <>
          <h2 className="text-lg font-semibold">{document?.key}</h2>
          <div className="py-6">
            <ReactJson
              src={documentJson}
              displayObjectSize={false}
              displayDataTypes={false}
            />
          </div>
        </>
      )}
    </div>
  );
}
