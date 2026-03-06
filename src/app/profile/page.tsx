/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState();
    const logout=async()=>{
        try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful ')
       // router.push('/login')
        } catch (error : any ) {
            console.log(error.message);
            toast.success(error.message)
        }
    }
    const getUserDetials = async()=>{
       const res= await axios.get('/api/users/me')
       console.log(res.data)
       setData(res.data.data._id)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2> User ID : {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
            <hr />
            <button  className="bg-blue-500 mt-4 hover:bg-orange-700 text-white  font-bold py-2 rounded"  onClick={logout}>Logout</button>
            <hr />
            <button  className="bg-blue-500 mt-4 hover:bg-green-700 text-white  font-bold py-2 rounded"  onClick={getUserDetials}>Get UserDetails</button>
            </div>
    )
}