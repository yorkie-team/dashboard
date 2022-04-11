// Document represents a document of Yorkie.
export interface Document {
  id: number;
  title: string;
  content: string;
}

export async function fetchDocuments(): Promise<Array<Document>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Document 1',
          content: 'Document 1 content',
        },
        {
          id: 2,
          title: 'Document 2',
          content: 'Document 2 content',
        },
        {
          id: 3,
          title: 'Document 3',
          content: 'Document 3 content',
        },
      ]);
    }, 1000);
  });
}
