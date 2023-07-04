import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

interface IState {
    isLoggedin: boolean,
};

const initialState: IState = {
    isLoggedin: false
};

const userAdmin = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUser(state) {
           state.isLoggedin = true
        },
    }
})

export const { setUser } = userAdmin.actions;

export const selectAdmin = (state: RootState) => state.admin;

export default userAdmin.reducer;