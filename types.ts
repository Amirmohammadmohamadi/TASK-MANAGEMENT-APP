import React, { SetStateAction , Dispatch } from "react";

export interface ChildrenType {
    children?: React.ReactNode;
};

export type AuthStateType = "private" | "public";

export type ThemeType  = "dark" | "light";

export interface ThemeCotextType {
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export type EntryStatusType = "login" | "singup";