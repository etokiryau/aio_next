import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/components/screens/signin/userSlice";
import projectsReducer from "@/components/screens/main/projects/projectsSlice";
import userPreferencesReducer from "@/components/userPreferences/userPreferencesSlice";

const rootReducer = combineReducers({
	user: userReducer,
	projects: projectsReducer,
	userPreferences: userPreferencesReducer
});

export default rootReducer;
