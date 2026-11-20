"use client"
import { useForm } from "react-hook-form";
import styles from "./loginPage.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { existingUser } from "@/utilities/existingUser";
import { AuthType, useAuth } from "@/context/Auth";
import { AUTH_STORAGE, PASSWORD, USERNAME } from "@/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const loginFormSchema = Yup.object({
    username: Yup.string().required().min(4),
    password: Yup.string().required().min(4),
});

type LoginFormSchemaType = Yup.InferType<typeof loginFormSchema>;
export type ShowPassType = "show" | "don't show";

const LoginPage = () => {
    const {reset , handleSubmit , register , formState:{ errors }} = useForm<LoginFormSchemaType>({resolver: yupResolver(loginFormSchema)});
    const [inputsValue , setInputsValue] = useState({username:"",password:""});
    const [showPass , setShowPass] = useState<ShowPassType>("don't show");
    const { setAuth } = useAuth();

    const router = useRouter();

    const onSubmit = ({username,password}:{username:string,password:string}) => {
        const result = existingUser({username,password});
        if(result) {
            alert("your login was successfully");
            const authInformation : AuthType = {status:"authenticated" , username , date: `this user authenticated in ${new Date()}`}
            localStorage.setItem(AUTH_STORAGE,JSON.stringify(authInformation));
            setAuth(authInformation);
            router.push("/dashboard");
        } else {
            alert("username or password is incorrect try again");
        }
        reset({username:"",password:""});
        setInputsValue(prev => ({...prev,username:"",password:""}));
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,tag:string) => {
        if(tag === USERNAME) {
            setInputsValue(prev => ({...prev,username:e.target.value}));
        } else if (tag === PASSWORD) {
            setInputsValue(prev => ({...prev,password:e.target.value}));
        }
    };

    useEffect(() => {
        console.log("inputsValue:",inputsValue);
    },[inputsValue])

    return <div className={styles.loginPageWrapper}>
        <div className={styles.loginWrapper}>
            <h1 className={styles.formHeader}>LOGIN</h1>
            <div className={styles.loginCard}>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input 
                            {...register("username")}
                            className={styles.input}
                            placeholder="Username"
                            value={inputsValue.username}
                            onChange={e => handleChange(e,USERNAME)}
                            type="text" 
                        />
                        {errors.username && <p className={styles.inputError}>{errors.username.message}</p>}
                    </div>
                    <div>
                        <div className={styles.passWrapper}>
                            <input 
                                {...register("password")}
                                className={styles.input}
                                placeholder="Password"
                                value={inputsValue.password}
                                onChange={e => handleChange(e,PASSWORD)}
                                type={showPass === "don't show" ? "password" : "text"} 
                            />
                            <div
                                className={styles.passIcon}
                                onClick={() => showPass === "don't show" ? setShowPass("show") : setShowPass("don't show")}>
                                    {showPass === "don't show" ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        {errors.password && <p className={styles.inputError}>{errors.password.message}</p>}
                    </div>
                    <button className={styles.button} type="submit">Login</button>
                    <p 
                        className={styles.signupLink}
                        onClick={() => router.push("/signupPage")}>
                            I don't have any account.go to signup.
                    </p>
                </form>
            </div>
        </div>

    </div>
};

export default LoginPage;