/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
export default function LoginPage(){
    const [user,setUser]=React.useState({
        email : "",
        password : "",
        username : "",
    })
    const onLogin = async () =>{
        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-white-300 rounded-lg mb-4 focus:outline-none focus:border-white-600" type="text" id="username" placeholder="enter your username"value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}  />
            <hr />
             <label htmlFor="password">password</label>
            <input className="p-2 border border-white-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" placeholder="enter your password"value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  />
            <button onClick={ onLogin}className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">visit signup</Link>
        </div>
    )
}