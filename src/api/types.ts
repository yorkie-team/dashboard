export type DocumentSummary = {
  id: string;
  key: DocumentKey;
  snapshot: string;
}

export type DocumentKey = {
  collection: string;
  document: string;
}
