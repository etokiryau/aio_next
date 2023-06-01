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
        setPreferences: (state, action: PayloadAction<IState>) => {
            state.isOpen = action.payload.isOpen;
            state.language = action.payload.language;
            state.location = action.payload.location;
            state.currency = action.payload.currency;
        }
    },
});

export const { togglePopup, setPreferences } = userPreferencesSlice.actions;

export const selectUserPreferences = (state: RootState) => state.userPreferences;

export default userPreferencesSlice.reducer;