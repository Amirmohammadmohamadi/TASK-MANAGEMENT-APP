import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { USERS_STORAGE } from "@/constants";
import { TaskType } from "./tasksSlice";

const users_storage = localStorage.getItem(USERS_STORAGE);

export interface UserType {
    id: string;
    username: string;
    password: string;
    tasks: TaskType[];
    priority: "admin" | "user";
    email: string;
};

interface InitialStateType {
    users: UserType[],
};

const initialState : InitialStateType = {
    users: users_storage ? JSON.parse(users_storage) : [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state,action:PayloadAction<UserType>) => {
            state.users.push(action.payload);
            localStorage.setItem(USERS_STORAGE,JSON.stringify(state.users));
        },
        deleteUser: (state,action:PayloadAction<string>) => {
            state.users = state.users.filter(u => u.id !== action.payload);
            localStorage.setItem(USERS_STORAGE,JSON.stringify(state.users))
        },
    },
});

export const { addUser , deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsers = (state:RootState) => state.users;