import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface IState {
    isActive: boolean
};

const initialState: IState = {
    isActive: false
};

const accountSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isActive = !state.isActive;
        }
    },
});

export const { toggleSidebar } = accountSlice.actions;

export const selectAccount = (state: RootState) => state.account;

export default accountSlice.reducer;