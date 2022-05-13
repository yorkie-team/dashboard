export type DocumentSummary = {
  id: string;
  key: string;
  snapshot: string;
  createdAt: number;
  accessedAt: number;
  updatedAt: number;
};

export type Project = {
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
  createdAt: number;
};
