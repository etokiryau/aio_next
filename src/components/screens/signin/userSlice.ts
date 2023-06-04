import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { IUser } from "@/interfaces/user.interface";

interface IState extends IUser {
    isActiveWarning: boolean,
    authMode: 'signin' | 'signup'
}

const initialState: IState = {
    email: null,
    token: null,
    userId: null,
    name: null,
    isConfirmed: false,
    isActiveWarning: false,
    authMode: 'signin'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.userId = action.payload.userId,
            state.name = action.payload.name;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.userId = null;
            state.name = null;
        },
        toggleWarning: (state) => {
            state.isActiveWarning = !state.isActiveWarning;
        },
        setStatusToConfirmed: (state) => {
            state.isConfirmed = true;
        },
        changeAuthMode: (state, action: PayloadAction<'signin' | 'signup'>) => {
            state.authMode = action.payload
        },
        // setToken: (state, action: PayloadAction<string>) => {
        //     state.token = action.payload
        // }
    }
})

export const { setUser, removeUser, toggleWarning, changeAuthMode, setStatusToConfirmed } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;