import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/components/screens/signin/userSlice";
import projectsReducer from "@/components/screens/main/projects/projectsSlice";
import userPreferencesReducer from "@/components/userPreferences/userPreferencesSlice";
import accountReducer from "@/components/layouts/accountLayout/accountSlice";
import adminReducer from "@/components/screens/admin/admin/adminSlice";

const rootReducer = combineReducers({
	user: userReducer,
	projects: projectsReducer,
	userPreferences: userPreferencesReducer,
	account: accountReducer,
	admin: adminReducer
});

export default rootReducer;