import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { IUser } from "@/interfaces/user.interface";

const initialState: IUser = {
    email: null,
    token: null,
    userId: null,
    name: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.email = action.payload.email,
            state.token = action.payload.token,
            state.userId = action.payload.userId,
            state.name = action.payload.name
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.userId = null;
            state.name = null;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;