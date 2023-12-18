// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// NOTE(chacha912): This patches the global objects TextEncoder, TextDecoder
// which are missing in the JSDOM environment.
// See https://github.com/jsdom/jsdom/issues/2524 for more details.
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
