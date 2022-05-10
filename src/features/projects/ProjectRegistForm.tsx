import React, { useCallback, useRef } from 'react';

// DocumentList represents the list of documents in the application.
export function ProjectRegistForm() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const handleSumbit = useCallback((e) => {
    e.preventDefault();
    console.log(nameRef.current?.value);
  }, []);

  return (
    <form className="mt-10" onSubmit={handleSumbit}>
      <div className="mb-6">
        <label
          htmlFor="prjName"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Project name
        </label>
        <input
          type="text"
          ref={nameRef}
          id="prjName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
          required
        />
      </div>
      <button
        type="submit"
        className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Create Project
      </button>
    </form>
  );
}
