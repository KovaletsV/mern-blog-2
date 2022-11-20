import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
    posts: [],
    tags: [],
    loading: false
};

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
    const { data } = await axios.get("/posts");
    return data;
});

export const fetchTags = createAsyncThunk("/tags/fetchTags", async () => {
    const { data } = await axios.get("/posts/tags");
    return data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: state => {
            state.posts = [];
            state.loading = true;
        },

        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        [fetchPosts.rejected]: state => {
            state.posts = [];
            state.loading = false;
        },
        [fetchTags.pending]: state => {
            state.tags = [];
            state.loading = true;
        },

        [fetchTags.fulfilled]: (state, action) => {
            state.tags = action.payload;
            state.loading = false;
        },
        [fetchTags.rejected]: state => {
            state.tags = [];
            state.loading = false;
        }
    }
});

export default postsSlice.reducer;
