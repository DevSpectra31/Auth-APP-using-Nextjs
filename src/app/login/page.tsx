"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function LoginPage(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email: "",
        password:"",
    })
    const[button,setButton]=React.useState(false)
    const [Loading, setLoading] = useState(false)
    const onLogin = async () =>{
        try {
            setLoading(true)
            const response=await axios.post("/api/users/login" ,user)
            console.log("Login success : ",response.data)
            toast.success("Login success")
            router.push("/profile")
        } catch (error) {
            console.log("Login fialed : ", error instanceof Error ? error.message : String(error));
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButton(false)
        }
        else{
            setButton(true)
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{Loading ? "Processing" : "Login"}</h1>
            <hr />
            <label className="bg-white-700" htmlFor="email">email</label>
            <input className=" p-2 border border-white-300  rounded-lg mb-4 focus:outline-none focus:border-white-600" type="email" id="email" placeholder="enter your email"value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  />
            <hr />
             <label htmlFor="password">password</label>
            <input className="p-2 border border-white-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" placeholder="enter your password"value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  />
            <button onClick={ onLogin}  className= " p-2 border border-white-300  rounded-lg mb-4 focus:outline-none focus:border-white-600">{button ? "NO Login" : "Login"}</button>
            <Link href="/signup">visit signup</Link>
        </div>
    )
}