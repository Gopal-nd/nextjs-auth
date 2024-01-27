'use client'

import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default  function Login(){
    const [user, setUser] = useState({
        email: "",
        password: "",
  
      });
    
      function onLogin(e){
        e.preventDefault()
      }
 return (
    <div className=" font-semibold flex-col items-center justify-center">
    <h1 className="text-center text-white text-2xl">LOG IN</h1>
    <hr />

    <div className="flex justify-center flex-col gap-1 w-40 md:w-80 m-auto mt-10 text-center">
      <label htmlFor="email">email</label>
      <input
        type="email"
        className="px-2 py-2 rounded-sm shadow-xl "
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email ..."
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        className="px-2 py-2 rounded-sm shadow-xl "
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password ..."
      />
      <button
        type="submit"
        onClick={onLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Login
      </button>
      <span>Dont have Account <Link href="/sign-up" className="text-blue-400">Sign UP</Link></span>
    </div>
  </div>
 )
}
