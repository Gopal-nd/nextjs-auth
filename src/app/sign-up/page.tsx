"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUp() {
  const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
  });
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function onSignUp() {
    console.log(user)
    try {
      setLoading(true)
      const response = await axios.post("/api/users/sign-up",user)
      console.log("signup sucess",response.data)
      router.push('/login')
    } catch (error:any) {
      console.log("sign up failed",error.response.data);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter();
  return (
    <div className=" font-semibold flex-col items-center justify-center">
      <h1 className="text-center text-white text-2xl">
        {loading ? "Processing" : "Sign up"}
      </h1>
      <hr />

      <div className="flex justify-center flex-col gap-1 w-40 md:w-80 m-auto mt-10 text-center">
        <label htmlFor="username">username</label>
        <input
          type="text"
          className="px-2 py-2 text-black rounded-sm shadow-xl "
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username ..."
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          className="px-2 py-2 rounded-sm text-black shadow-xl "
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email ..."
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          className="px-2 py-2 text-black rounded-sm shadow-xl "
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password ..."
        />
        <button
          type="submit"
          onClick={onSignUp}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          {buttonDisabled ? "No Sign-up" : "Sign Up"}
        </button>
        <span>
          Have Account{" "}
          <Link href="/login" className="text-blue-400">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
