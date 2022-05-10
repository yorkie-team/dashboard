export type DocumentSummary = {
  id: string;
  key: string;
  snapshot: string;
};

export type Project = {
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
  createdAt: number;
};
