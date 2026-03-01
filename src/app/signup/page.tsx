/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
export default function SignupPage(){
    const [user,setUser]=React.useState({
        email : "",
        password : "",
        username : "",
    })
    const onSignup = async () =>{
        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-white-600" type="text" id="username" placeholder="enter your username"value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}  />
            <hr />
             <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="email" placeholder="enter your email"value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}  />
            <hr />
             <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" type="text" id="password" placeholder="enter your password"value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}  />
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup here</button>
            <Link href="/login">visit login</Link>
        </div>
    )
}