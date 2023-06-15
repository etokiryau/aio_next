import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/components/screens/signin/userSlice";
import projectsReducer from "@/components/screens/main/projects/projectsSlice";
import userPreferencesReducer from "@/components/userPreferences/userPreferencesSlice";
import accountReducer from "@/components/layouts/accountLayout/accountSlice";

const rootReducer = combineReducers({
	user: userReducer,
	projects: projectsReducer,
	userPreferences: userPreferencesReducer,
	account: accountReducer
});

export default rootReducer;
