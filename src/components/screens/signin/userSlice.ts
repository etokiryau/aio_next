import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { IUser } from "@/interfaces/user.interface";

interface IState extends IUser {
    isActiveWarning: boolean
}

const initialState: IState = {
    email: null,
    token: null,
    userId: null,
    name: null,
    isActiveWarning: false
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
        },
        toggleWarning: (state) => {
            state.isActiveWarning = !state.isActiveWarning
        }
    }
})

export const { setUser, removeUser, toggleWarning } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;