import { UserType } from "@/components/redux/slices/usersSlice";
import { USERS_STORAGE } from "@/constants";

interface ArgumentsType {
    username: string;
    password: string;
};


export const existingUser = ({username,password}:ArgumentsType) => {
    const users_storage = localStorage.getItem(USERS_STORAGE);

    if(users_storage) {
        const users:UserType[] = JSON.parse(users_storage);
        return users.find(u => u.username === username && u.password === password)
    } else {
        return alert("the storage is empty!")
    }
};