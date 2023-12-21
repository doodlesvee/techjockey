"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const router = new useRouter();

  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formState;
    if (!email || !name || !password) {
      setError("All fields are mandtory");
      return;
    }

    try {
      const response = await axios.post("/api/register", formState);
      if ((response.status = 201)) {
        setFormState(initialState);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.err);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={onChangeHandler}
            placeholder="Full Name"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formState.email}
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formState.password}
            onChange={onChangeHandler}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-2 text-right" href={"/"}>
            Already have an account ? <span className="underline">Login</span>
          </Link>
        </form>
      </div>{" "}
    </div>
  );
}
