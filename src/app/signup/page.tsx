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
        confirmPassword : "",
    })
    const [button,setButton]=React.useState(false);
    const [loading,setLoading]=React.useState(false)
    const onSignup = async () =>{
        try {
            setLoading(true)
          const response= await axios.post("/api/users/signup",user);
          console.log("Signup success : ", response.data);
          router.push("/login")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            toast.error("Signup failed : " + errorMessage);
        } finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        if(user.password !== user.confirmPassword ){
            toast.error("Password do not match");
        }
        if(user.email.length>0 && user.password.length >0 && user.username.length>0){
            setButton(false);
        } else{
            setButton(true)
        }

    },[user])
    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
  <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-lg">

    <h2 className="text-2xl font-semibold text-white mb-2">
      Create an account
    </h2>

    <p className="text-sm text-gray-400 mb-6">
      Enter your information below to create your account
    </p>

    <form className="space-y-5" 
     onSubmit={(e)=>{e.preventDefault(),
        onSignup()}}>

      {/* Full Name */}

      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Username
        </label>
        <input
          type="text"
          value={user.username}
          onChange={(e)=>setUser({...user,username:e.target.value})}
          placeholder="John Doe"
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="m@example.com"
          value={user.email}
          onChange={(e)=>setUser({...user,email:e.target.value})}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        <p className="text-xs text-gray-500 mt-1">
          We'll use this to contact you. We will not share your email with anyone else.
        </p>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Must be at least 8 characters long.
        </p>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm text-gray-300 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          value={user.confirmPassword}
          onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
          className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Please confirm your password.
        </p>
      </div>

      {/* Create Account Button */}
      <button
      onClick={onSignup}
        type="submit"
        className="w-full bg-gray-200 text-black py-2 rounded-md font-medium hover:bg-gray-300 transition"
      >
        Create Account
      </button>


      {/* Sign In */}
      <p className="text-center text-sm text-gray-400">
        Already have an account? 
        <Link href="/login" className="text-white ml-1 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  </div>
</div>
    )
}