import { combineReducers, configureStore } from '@reduxjs/toolkit';
import interfaceSlice from './reducers/index';

const rootReducer = combineReducers({
	interfaceSlice
});

export type RootState = ReturnType<typeof rootReducer>;
 
export const store = configureStore({
	reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;