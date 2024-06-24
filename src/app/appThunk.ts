import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AsyncThunkPayloadCreator, AsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { ConnectError } from '@connectrpc/connect';
import { fromErrorDetails } from '@/api/converter';
import { RPCError } from '@/api/types';

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

type AppThunkConfig = {
  rejectValue: { error: RPCError | Error };
  rejectedMeta: { isHandledError: boolean };
};

/**
 * createAppThunk is a wrapper for createAsyncThunk that provides error handling for RPCError.
 * It converts RPCError into rejectedWithValue actions.
 *
 * @param type - The string identifier for the thunk.
 * @param payloadCreator - The async function to be executed by the thunk.
 * @returns An AsyncThunk instance with error handling for RPCError.
 */
export const createAppThunk = <Returned, ThunkArg, ThunkApiConfig extends AsyncThunkConfig = AppThunkConfig>(
  type: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => {
  return createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(type, async (arg: ThunkArg, thunkAPI: any) => {
    try {
      return await payloadCreator(arg, thunkAPI);
    } catch (error: unknown) {
      if (!(error instanceof ConnectError)) {
        return thunkAPI.rejectWithValue({ error }, { isHandledError: false });
      }

      const errorDetails = fromErrorDetails(error);
      // NOTE(chacha912): When handling errors in Redux Toolkit, everything that does not match
      // the SerializedError interface will have been removed from it. So, we need to convert
      // the error.code to string.
      // See https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors for more details.
      const rpcError = new RPCError(JSON.stringify(error.code), error.message, errorDetails);
      return thunkAPI.rejectWithValue(
        {
          error: rpcError,
        },
        { isHandledError: false },
      );
    }
  });
};
