import { DocumentList } from '../features/documents/DocumentList';

export function Documents() {
  return (
    <div className='px-12 py-6'>
      <h2 className='text-lg font-semibold'>Documents</h2>
      <DocumentList />
    </div>
  );
}
