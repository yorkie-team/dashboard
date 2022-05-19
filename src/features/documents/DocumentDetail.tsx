import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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
          <Link to={'../'} className="float-right text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-sm p-1 text-center inline-flex items-center dark:text-gray-500 dark:focus:ring-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
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
