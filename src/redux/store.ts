import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer from '.';

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, any>;
export type RootState = ReturnType<typeof rootReducer>;

export default store;