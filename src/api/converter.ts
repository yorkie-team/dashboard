import { DocumentSummary } from './types';

import { DocumentSummary as PbDocumentSummary } from './resources_pb';

export function fromDocumentSummary(pbDocumentSummary: PbDocumentSummary): DocumentSummary {
  return {
    id: pbDocumentSummary.getId(),
    key: pbDocumentSummary.getKey()!,
    snapshot: pbDocumentSummary.getSnapshot(),
  };
}

export function fromDocumentSummaries(pbDocumentSummaries: Array<PbDocumentSummary>): Array<DocumentSummary> {
  const documentSummaries: Array<DocumentSummary> = [];

  for (const pbDocumentSummary of pbDocumentSummaries) {
    documentSummaries.push(fromDocumentSummary(pbDocumentSummary));
  }

  return documentSummaries;
}
