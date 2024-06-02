"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn} from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL,
      });
      if (!res.ok) {
        setError("Problrm signing ");
        return;
      }
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      console.log("loginn", res);
      

      router.replace("/DashboardLayout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
