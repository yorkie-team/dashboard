---
title: rpc-error-handling
---

# RPC error handling

## Summary

When the RPC request fails, we throw a custom RPCError. Then common RPCErrors are handled by setting the global error state in the Redux middleware, and specific RPCErrors are handled by setting an error state in the reducer.

### Goals

We handle RPC errors appropriately depending on the situation.

### Non-Goals

We only handle RPC errors here. Any rendering errors in components can be handled using error-boundary, etc.

## Proposal Details

#### Dashboard Layered Architecture

Dashboard layered architecture pattern looks like:

- `RC`(presentation): Display that information on a screen in a particular format
- `xxSlice`(business): Perform business logic against the data
- `src/api/index.ts`: RPC Request

As a request moves from layer to layer in the layered architecture, it must go through the layer right below it to get to the next layer below that one.

|                               Dashboard architecture                                |                                                                                                                                      Layered architecture                                                                                                                                       |
| :---------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="540" alt="layered-architecture" src="./media/layered-architecture.png"> | <img width="300" alt="Layered Architecture" src="https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/assets/sapr_0102.png"> [Image - Software Architecture Patterns](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html) |

#### RPC Error Handling

We handle RPC errors according to the following steps.

![rpc-error-handling](./media/rpc-error-handling.png)

1. Throw custom RPCError with code, message, and details using [RPC interceptor](https://grpc.io/blog/grpc-web-interceptor/).

```ts
// api/interceptor.ts

public intercept(request: any, invoker: any): any {
    // ...setting metadata

    return invoker(request).catch((err: any) => {
      const [, pbDetails] = errorDetails.statusFromError(err);
      if (pbDetails && pbDetails.length > 0) {
        const details: Array<FieldViolation> = [];
        for (const pbDetail of pbDetails) {
          if (pbDetail instanceof errorDetails.BadRequest) {
            for (const v of pbDetail.getFieldViolationsList()) {
              details.push({ field: v.getField(), description: v.getDescription() });
            }
          }
        }
        throw new RPCError(err.code, err.message, details);
      }

      throw new RPCError(err.code, err.message);
    });
  }
}

class RPCError extends Error {
  name: APIErrorName;
  code: string;
  message: string;
  details: Array<FieldViolation>;
  constructor(code: number, message: string, details?: Array<FieldViolation>) {
    super(message);
    this.name = 'RPCError';
    this.code = String(code);
    this.message = message;
    this.details = details || [];
  }
}
```

2. Handle common RPCError like request timeout, session expired, and so on in Redux middleware.

```ts
// app/store.ts

export const store = configureStore({
  reducer: {
    // ...set reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.error'],
      },
    }).concat(globalErrorHandler), // Add common RPCError handler
});
```

```ts
// app/middleware.ts

export const globalErrorHandler: Middleware = (store: MiddlewareAPI) => (next) => (action) => {
  next(action);
  if (!isRejectedAction(action) && !isRejectedWithValue(action)) return;

  let { code: statusCode, message: errorMessage, name: errorName } = action.error;
  statusCode = Number(statusCode);

  const apiErrorName: APIErrorName = 'RPCError';
  if (errorName !== apiErrorName) {
    throw action.error; // handle only RPCError
  }
  if (isHandledError(action.type, statusCode)) return; // except specific RPCError
  store.dispatch(setGlobalError({ statusCode, errorMessage })); // handle common RPCError
};
```

3. Handle specific RPCError by setting the error state in the reducer.

```ts
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    // rejected case
    builder.addCase(loginUser.rejected, (state, action) => {
      state.login.status = 'failed';
      // `action.error` has a serialized version of the error value
      const statusCode = Number(action.error.code);
      if (statusCode === RPCStatusCode.NOT_FOUND || statusCode === RPCStatusCode.UNAUTHENTICATED) {
        // set specific error state
        state.login.error = {
          target: 'username',
          message: 'Incorrect username or password',
        };
      }
  },
});
```

4. Show UI according to the error state.

##### Redux Middleware

Redux uses middleware to let us customize the dispatch function. Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. [(redux fundamentals)](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)

<img width="450" alt="image" src="http://blog.hwahae.co.kr/wp-content/uploads/2021/09/210927_fin_05-1.jpg"> [Image - hwahae blog](http://blog.hwahae.co.kr/all/tech/tech-tech/6946/)
