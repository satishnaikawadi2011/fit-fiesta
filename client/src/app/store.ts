import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';
import uiReducer from './features/ui';
import postReducer from './features/post';
import eventReducer from './features/event';
import resourceReducer from './features/resource';
import commonReducer from './features/common';
import userReducer from './features/user';
import groupReducer from './features/group';

export const store = configureStore({
	reducer:
		{
			auth: authReducer,
			ui: uiReducer,
			post: postReducer,
			event: eventReducer,
			resource: resourceReducer,
			common: commonReducer,
			user: userReducer,
			group: groupReducer
		}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
