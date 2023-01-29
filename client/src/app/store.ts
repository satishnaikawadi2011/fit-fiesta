import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';
import uiReducer from './features/ui';
import postReducer from './features/post';
import eventReducer from './features/event';

export const store = configureStore({
	reducer:
		{
			auth: authReducer,
			ui: uiReducer,
			post: postReducer,
			event: eventReducer
		}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
