import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { setCookie } from "nookies";

interface IState {
    type: 'common' | 'project',
    isOpen: boolean,
    language: string,
    currency: string,
    location: string | null,
    documentationLanguage: string,
    cookiePopup: boolean
};

const initialState: IState = {
    type: 'common',
    isOpen: false,
    language: 'En',
    currency: 'USD',
    location: null,
    documentationLanguage: 'En',
    cookiePopup: false
};

const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
        openPopup: (state, action: PayloadAction<'common' | 'project'>) => {
            state.isOpen = true;
            if (action) state.type = action.payload
        },
        closePopup: (state) => {
            state.isOpen = false;
        },
        setPreferences: (state, action: PayloadAction<Omit<IState, 'documentationLanguage' | 'location' | 'type'>>) => {
            state.isOpen = action.payload.isOpen;
            state.language = action.payload.language;
            state.currency = action.payload.currency;
            setCookie(null, "preferences", JSON.stringify({language: state.language, currency: state.currency, location: state.location}), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/"
            });
        },
        setDocumentationPreferences: (state, action: PayloadAction<Omit<IState, 'isOpen' | 'language' | 'type' | 'cookiePopup'>>) => {
            state.documentationLanguage = action.payload.documentationLanguage;
            state.location = action.payload.location;
            state.currency = action.payload.currency;
            setCookie(null, "preferences", JSON.stringify({language: state.language, currency: state.currency, location: state.location}), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/"
            });
        },
        setPreferenceFromCookie: (state, action: PayloadAction<Omit<IState, 'isOpen' | 'documentationLanguage' | 'type'>>) => {
            state.location = action.payload.location;
            state.currency = action.payload.currency;
            state.language = action.payload.language;
        },
        toggleCookiePopup: (state, action: PayloadAction<boolean>) => {
            state.cookiePopup = action.payload;
        }
    },
});

export const { closePopup, openPopup, setPreferences, setDocumentationPreferences, setPreferenceFromCookie, toggleCookiePopup } = userPreferencesSlice.actions;

export const selectUserPreferences = (state: RootState) => state.userPreferences;

export default userPreferencesSlice.reducer;