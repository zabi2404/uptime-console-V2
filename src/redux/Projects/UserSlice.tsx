import type { Schema } from "@/amplify/data/resource";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateClient } from "aws-amplify/api";

interface usertype {
    id: string;
    name: string | null;
    email: string | null;
    phoneNumber: string | null;
    companyName: string | null;
    websiteUrl: string | null;
    address: string | null;
}

interface userState {
    user: usertype | null,
    loading: boolean,
    error: string | null | undefined;
}

const initialState: userState = {
    user: null,
    loading: false,
    error: null,
};
const client = generateClient<Schema>();

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.models.UserProfile.list();

            if (errors) {
                console.error("Error fetching user:", errors);
                return rejectWithValue(
                    errors[0]?.message || "Failed to fetch user"
                );
            }

            return data[0] ?? null;

        } catch (error: unknown) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch user"
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })

            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }

});


export default userSlice.reducer;