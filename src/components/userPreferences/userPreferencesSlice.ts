import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface IState {
    isOpen: boolean,
    language: string,
    currency: string,
    location: string | null
};

const initialState: IState = {
    isOpen: false,
    language: 'En',
    currency: 'USD',
    location: null
};

const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        togglePopup: (state) => {
            state.isOpen = !state.isOpen;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        }
    },
});

export const { togglePopup, setLanguage } = userPreferencesSlice.actions;

export const selectUserPreferences = (state: RootState) => state.userPreferences;

export default userPreferencesSlice.reducer;