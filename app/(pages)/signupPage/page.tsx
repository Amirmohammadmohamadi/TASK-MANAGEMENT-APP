"use client";
import { useForm } from "react-hook-form";
import styles from "./signupPage.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addUser } from "@/components/redux/slices/usersSlice";
import { generateId } from "@/utilities/generateId";
import React, { useState } from "react";
import { ShowPassType } from "../loginPage/page";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const signupFormSchema = Yup.object({
    username: Yup.string().required().min(4),
    password: Yup.string().required().min(4),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")],"the confirmation password is not matches with password.").required(),
    email: Yup.string().required().email(),
});

type SignupFormSchemaType = Yup.InferType<typeof signupFormSchema>;
interface OnSubmitInputType {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
};


const SignupPage = () => {
    const dispatch = useDispatch();
    const {reset , handleSubmit , formState:{ errors } , register} = useForm<SignupFormSchemaType>({resolver: yupResolver(signupFormSchema)});
    const [showPass , setShowPass] = useState<{pass:ShowPassType,confPass:ShowPassType}>({pass:"don't show",confPass:"don't show"});
    const router = useRouter();
    const [inputsValue , setInputsValue] = useState({
        username:"",
        password:"",
        confimrPassword:"",
        email:"",
    });
    
    const resetInputsValue = () => {
        setInputsValue({username:"",password:"",confimrPassword:"",email:""});
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,tag:string) => {
        if(tag === "username") {
            setInputsValue(prev => ({...prev,username:e.target.value}));
        }
        if(tag === "password") {
            setInputsValue(prev => ({...prev,password:e.target.value}));
        }
        if(tag === "confirmPassword") {
            setInputsValue(prev => ({...prev,confimrPassword:e.target.value}));
        }
        if(tag === "email") {
            setInputsValue(prev => ({...prev,email:e.target.value}));
        }
    };

    const handleShowPass = (tag: "pass" | "confPass") => {
        if(tag === "pass") {
            setShowPass(prev => ({...prev,pass: prev.pass === "show" ? "don't show" : "show"}));
        } else if(tag === "confPass") {
            setShowPass(prev => ({...prev,confPass:prev.confPass === "show" ? "don't show" : "show"}));
        }
    }; 

    const onSubmit = ({username , password , confirmPassword , email}:OnSubmitInputType) => {
        dispatch(addUser({username,password,tasks:[],email,priority:"admin",id:generateId()}));
        alert("your signup was successfully please login.");
        reset({username:"",password:"",confirmPassword:"",email:""});
        resetInputsValue();
        router.push("/loginPage");
    }
    return <div className={styles.signupWrapper}>
        <h1 className={styles.formHeader}>SINUP</h1>
        <div className={styles.signupCard}>
            <form className={styles.singupForm} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register("username")}
                        type="text" 
                        className={styles.input} 
                        placeholder="Username"
                        value={inputsValue.username}
                        onChange={(e) => handleChange(e,"username")}
                    />
                    {errors.username && <p className={styles.inputError}>{errors.username.message}</p>}
                </div>
                <div>
                    <div className={styles.passWrapper}>
                        <input
                            {...register("password")}
                            type={showPass.pass === "show" ? "text":"password"}
                            className={styles.input} 
                            placeholder="Password"
                            value={inputsValue.password}
                            onChange={e => handleChange(e,"password")}
                        />
                        <div 
                            className={styles.passIcon}
                            onClick={() => handleShowPass("pass")}>
                                {showPass.pass === "show" ? <FaEye/>:<FaEyeSlash/>}
                        </div>
                    </div>
                    {errors.password && <p className={styles.inputError}>{errors.password.message}</p>}
                </div>
                <div>
                    <div className={styles.passWrapper}>
                        <input 
                            {...register("confirmPassword")}
                            type={showPass.confPass === "show" ? "text":"password" }
                            className={styles.input}
                            placeholder="confirm password"
                            value={inputsValue.confimrPassword}
                            onChange={e => handleChange(e,"confirmPassword")}
                        />
                        <div
                            className={styles.passIcon}
                            onClick={() => handleShowPass("confPass")}>
                                {showPass.confPass === "show" ? <FaEye/> : <FaEyeSlash/>}
                        </div>
                    </div>
                    {errors.confirmPassword && <p className={styles.inputError}>{errors.confirmPassword?.message}</p>}
                </div>
                <div>
                    <input 
                        {...register("email")}
                        type="email" 
                        className={styles.input}
                        placeholder="Email"
                        value={inputsValue.email}
                        onChange={e => handleChange(e,"email")}
                    />
                    {errors.email && <p className={styles.inputError}>{errors.email?.message}</p>}
                </div>
                <button className={styles.button}>Signup</button>
                <p 
                    className={styles.loginLink} 
                    onClick={() => router.push("/loginPage")}>
                        I have an acount.go to login.
                </p>
            </form>    
        </div>    
    </div>
};

export default SignupPage;