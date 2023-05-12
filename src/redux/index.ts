import { combineReducers } from '@reduxjs/toolkit';

import userReducer from '@/components/screens/login/userSlice';
import projectsReducer from '@/components/screens/main/projects/projectsSlice';

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
});

export default rootReducer;