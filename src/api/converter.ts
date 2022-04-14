import {
  DocumentSummary,
  DocumentKey,
} from './types';

import {
  DocumentSummary as PbDocumentSummary,
  DocumentKey as PbDocumentKey,
} from './resources_pb';

export function fromDocumentSummaries(pbDocumentSummaries: Array<PbDocumentSummary>): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push({
      id: pbDocumentSummary.getId(),
      key: fromDocumentKey(pbDocumentSummary.getKey()!),
      snapshot: pbDocumentSummary.getSnapshot(),
    });
  }

  return documentSummaries;
}

export function fromDocumentKey(pbDocumentKey: PbDocumentKey): DocumentKey {
  return {
    collection: pbDocumentKey.getCollection(),
    document: pbDocumentKey.getDocument(),
  };
}
