/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
export default function SignupPage(){
    const router=useRouter()
    const [user,setUser]=React.useState({
        email : "",
        password : "",
        username : "",
    })
    const [button,setButton]=React.useState(false);
    const [loading,setLoading]=React.useState(false)
    const onSignup = async () =>{
        try {
            setLoading(true)
          const response= await axios.post("/api/users/signup",user);
          console.log("Signup success : ", response.data);
          router.push('/profile')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error("Signup failed : " + errorMessage);
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length >0 && user.username.length>0){
            setButton(false);
        } else{
            setButton(true)
        }

    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-white-600" type="text" id="username" placeholder="enter your username"value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}  />
            <hr />
             <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" placeholder="enter your email"value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  />
            <hr />
             <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" placeholder="enter your password"value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{button ? "no signup" : "Signup"}</button>
            <Link href="/profile">visit profile</Link>
        </div>
    )
}