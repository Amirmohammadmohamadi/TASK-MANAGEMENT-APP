import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        tasks: tasksReducer,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore[`getState`]>;
export type AppDispatch = AppStore[`dispatch`];
