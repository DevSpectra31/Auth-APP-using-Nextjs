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
    const forgotPassword= async()=>{
        router.push("/forgotpassword")
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
          <div>
        <div className="min-h-screen flex items-center justify-center @view-transition {
  navigation: auto | none;
  types: none | <custom-ident>#;
}">
  <div className="w-[420px] bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-lg">
     <h1>{Loading ? "Processing" : "Login"}</h1>
    <h2 className="text-2xl font-semibold text-white">
      Login to your account
      <hr />
    </h2>
    <p className="text-sm text-zinc-400 mt-1 mb-6">
      Enter your email below to login to your account
    </p>

    {/* Email */}
    <div className="mb-4">
      <label className="text-sm text-zinc-300">Email</label>
      <input
        type="email"
        value={user.email}
          onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder="m@example.com"
        className="w-full mt-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>

    {/* Password */}
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label className="text-sm text-zinc-300">Password</label>
        <span className="text-sm text-zinc-400 hover:text-white cursor-pointer">
        <button onClick={forgotPassword}>  Forgot your password? </button>
        </span>
      </div>

      <input
        type="password"
        value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
        className="w-full mt-2 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      />
    </div>

    {/* Login Button */}
    <button onClick={onLogin}  className="w-full bg-gray-200 text-black font-medium py-2 rounded-md mt-2 hover:bg-gray-300 transition">
      Login
    </button>
  </div>
</div>
</div>
    )
}