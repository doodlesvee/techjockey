"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const initialState = {
    email: "",
    password: "",
  };

  const router = new useRouter();
  const [loginState, setLoginState] = useState(initialState);
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        ...loginState,
        redirect: false,
      });

      if (response.error) {
        setError("Invalid Credentials");
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
          <input
            name="email"
            value={loginState.email}
            onChange={onChangeHandler}
            type="text"
            placeholder="Email"
          />
          <input
            name="password"
            value={loginState.password}
            onChange={onChangeHandler}
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

          <Link className="text-sm mt-2 text-right" href={"/register"}>
            Don't have an account ? <span className="underline">Register</span>
          </Link>
        </form>
      </div>{" "}
    </div>
  );
}
