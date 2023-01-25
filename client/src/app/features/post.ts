import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IPost } from '../../types/Post'

interface postState {
    posts: IPost[];
}


const initialState: postState = {
    posts:[]
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
    reducers: {
      setPosts:(state, action: PayloadAction<IPost[]>) => {
        state.posts = action.payload
        },
        likePost:(state, action: PayloadAction<{postId:string,userId:string}>) => {
            const index = state.posts.findIndex((p) => p._id === action.payload.postId);
            if (index === -1) return;
            if (state.posts[index].likesUsers!.includes(action.payload.userId)) {
                state.posts[index].likesUsers = state.posts[index].likesUsers!.filter(uid => uid !== action.payload.userId)
                state.posts[index].likesCount -= 1;
            } else {
                state.posts[index].likesUsers?.push(action.payload.userId)
                state.posts[index].likesCount += 1;
            }
        },
  },
})




export const { setPosts,likePost} = postSlice.actions

export default postSlice.reducer