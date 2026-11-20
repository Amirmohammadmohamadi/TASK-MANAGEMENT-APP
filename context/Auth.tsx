"use client";
import { AUTH_STORAGE } from "@/constants";
import { ChildrenType } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

export type AuthType = 
| {status: "not authenticated"}
| {status: "authenticated" , username:string , date: string};

type AuthContextType = {
    auth: AuthType;    
    setAuth: Dispatch<SetStateAction<AuthType>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const initialize : () => AuthType = () => {
    const auth_storage = localStorage.getItem(AUTH_STORAGE);
    if(auth_storage) {
        return JSON.parse(auth_storage);
    }
    return {status: "not authenticated"};
};

export const AuthContextProvider = ({children}:ChildrenType) => {
    const [auth , setAuth] = useState<AuthType>(initialize);

    const value = useMemo(()=>({
        auth,setAuth,
    }),[auth]);

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("error in AuthContext");
    return context;
};