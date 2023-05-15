import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

import { ISingleProject } from '@/interfaces/projects.interface';

interface IProjectsState {
    projects: ISingleProject[],
    favourites: string[],
    filters: {
        favourites: boolean,
        floorNumber: number | null,
        totalArea: [number, number] | null,
        cost: [number, number] | null,
        roofType: string | null
    }
};

const initialState: IProjectsState = {
    projects: [],
    favourites: [],
    filters: {
        favourites: false,
        floorNumber: null,
        totalArea: null,
        cost: null,
        roofType: null
    }
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<ISingleProject[]>) => {
            state.projects = action.payload;
        },
        toggleFavourite: (state, action: PayloadAction<string | string[]>) => {
            if (!Array.isArray(action.payload)) {
                const isAdded = state.favourites.some(item => item === action.payload);

                isAdded 
                ? state.favourites = state.favourites.filter(item => item !== action.payload)
                : state.favourites.push(action.payload);
            } else {
                state.favourites = action.payload
            }
            
            localStorage.setItem('favouriteProjects', JSON.stringify([...state.favourites]));
        },
        togglePropertyFilter: (state, action: PayloadAction<{[key: string]: number | boolean | string | null}>) => {
            state.filters = {...state.filters, ...action.payload}
        }
    },
});

export const { setProjects, toggleFavourite, togglePropertyFilter } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export const selectFilteredProjects = (state: RootState) => {
    const { favourites, floorNumber, totalArea, cost, roofType } = state.projects.filters;
    const projects = state.projects.projects;
    const favouritesList = state.projects.favourites;

    return projects.filter((item) => {
        if (favourites && favouritesList.some(id => id === item.id) !== favourites) return false;
        if (floorNumber && item.floorNumber !== floorNumber) return false;
        if (totalArea && (item.totalArea > totalArea[1] || item.totalArea < totalArea[0])) return false;
        if (cost && (item.cost > cost[1] || item.cost < cost[0])) return false;
        if (roofType && item.roofType !== roofType) return false;
        return true;
    });
};

export default projectsSlice.reducer;