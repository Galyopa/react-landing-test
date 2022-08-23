import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from '../services/UsersApi';
import userReduser from '../features/users/users';
import { positionsApi } from '../services/PositionsApi';

export const store = configureStore({
  reducer: {
    users: userReduser,
    [usersApi.reducerPath]: usersApi.reducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, positionsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

setupListeners(store.dispatch);