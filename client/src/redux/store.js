import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
import postsReducer from "./features/posts";

export default configureStore({
    reducer: { posts: postsReducer, auth: authReducer }
});
