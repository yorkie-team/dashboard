import { atom } from 'recoil';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const countAtom = atom({
  key: 'count',
  default: initialState,
})
