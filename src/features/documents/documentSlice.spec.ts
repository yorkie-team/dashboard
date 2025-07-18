/*
 * Copyright 2022 The Yorkie Authors. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, it, expect } from 'vitest';
import { DocumentSummary } from 'api';
import { getPaginationData } from './documentsSlice';

const PAGE_SIZE = 5;
const TOTAL_SIZE = 15;
const sampleDocumentData: Array<DocumentSummary> = [];
for (let i = 0; i < TOTAL_SIZE; i++) {
  sampleDocumentData.push({
    id: `${i}`,
    key: `${i}`,
    root: '',
    attachedClients: 0,
    createdAt: 0,
    accessedAt: 0,
    updatedAt: 0,
    schemaKey: '',
  });
}

describe('Pagination', () => {
  describe('single page', () => {
    it('Previous and next buttons should be disabled', () => {
      const documents = sampleDocumentData.slice(10, 15).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: false,
        previousID: '',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(false);
      expect(result.hasNext).toEqual(false);
      expect(result.data.map((document) => document.id)).toEqual(['14', '13', '12', '11', '10']);
    });
  });

  describe('multiple pages', () => {
    it('Previous button should be disabled on initial page', () => {
      const documents = sampleDocumentData.slice(9, 15).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: false,
        previousID: '',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(false);
      expect(result.hasNext).toEqual(true);
      expect(result.data.map((document) => document.id)).toEqual(['14', '13', '12', '11', '10']);
    });

    it('Previous button should be disabled when moving to first page', () => {
      const documents = sampleDocumentData.slice(10, 15).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: true,
        previousID: '9',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(false);
      expect(result.hasNext).toEqual(true);
      expect(result.data.map((document) => document.id)).toEqual(['14', '13', '12', '11', '10']);
    });

    it('Next button should be disabled when moving to last page', () => {
      const documents = sampleDocumentData.slice(0, 5).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: false,
        previousID: '5',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(true);
      expect(result.hasNext).toEqual(false);
      expect(result.data.map((document) => document.id)).toEqual(['4', '3', '2', '1', '0']);
    });

    it('Previous and next buttons should be abled when moving to next page', () => {
      const documents = sampleDocumentData.slice(4, 10).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: false,
        previousID: '10',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(true);
      expect(result.hasNext).toEqual(true);
      expect(result.data.map((document) => document.id)).toEqual(['9', '8', '7', '6', '5']);
    });

    it('Previous and next buttons should be abled when moving to previous page', () => {
      const documents = sampleDocumentData.slice(5, 11).reverse();
      const result = getPaginationData({
        data: documents,
        isForward: true,
        previousID: '4',
        pageSize: PAGE_SIZE,
      });

      expect(result.hasPrevious).toEqual(true);
      expect(result.hasNext).toEqual(true);
      expect(result.data.map((document) => document.id)).toEqual(['9', '8', '7', '6', '5']);
    });
  });
});
