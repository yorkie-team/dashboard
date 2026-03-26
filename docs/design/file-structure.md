---
title: file-structure
---

# File Structure

## Summary

We structure files using a `colocation` principle and `ducks` pattern.

- colocation: keep files that often change together close to each other.
- [ducks pattern](https://github.com/erikras/ducks-modular-redux): organize logic into `feature folders`(all files for a feature in the same folder), with all the Redux logic for a given feature in a single `slice` file.

### Goals

Keeping related logic together makes it easier to find and update that code.

## Proposal Details

Dashboard folder structure looks like:

```bash
/src
├── api
├── app
├── components
├── features
│   ├── documents
│   ├── projects
│   └── users
├── pages
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── xxxPage.tsx
├── utils
└── App.tsx
```

- `/api`: API definition files with `.proto`
- `/app`: contains app-wide setup
- `/components`: reusable, independent UI components like buttons, modals, inputs, etc
- `/features`: contains all feature folders
  - `/documents`: a single feature folder
    - `documentsSlice.ts`: Redux reducer logic and associated actions
    - `documentList.tsx`: a React component
- `/pages`: layout and page components
- `/utils`: utility functions
- `App.tsx`: root React component

### Reference

- React file structure: https://reactjs.org/docs/faq-structure.html
- Redux file structure: https://redux.js.org/style-guide/#structure-files-as-feature-folders-with-single-file-logic
