import { TASKS_STORAGE } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "./usersSlice";
import { RootState } from "..";

const tasks_storage = localStorage.getItem(TASKS_STORAGE);

export interface TaskType {
    id: string;
    name: string;
    progress: number;
    developers: Omit<UserType,"password" | "tasks">[];
    dateModified: string;
    duration: string;
    timeToEnd: string;
};

interface InitialStateType {
    tasks: TaskType[];
};

const initialState : InitialStateType = {
    tasks: tasks_storage ? JSON.parse(tasks_storage) : [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state,action:PayloadAction<TaskType>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state,action:PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
    },
});

export const { addTask , deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTask = (state:RootState) => state.tasks;
