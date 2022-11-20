import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    data: null,
    loading: false
};

export const fetchAuth = createAsyncThunk(
    "/auth/fetchAuth",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/login", {
                username,
                password
            });

            return data;
        } catch (error) {
            console.warn(error);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAuth.pending]: state => {
            state.loading = true;
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload;
            state.loading = false;
        },
        [fetchAuth.rejected]: state => {
            state.loading = false;
            state.data = null;
        }
    }
});

export default authSlice.reducer;
