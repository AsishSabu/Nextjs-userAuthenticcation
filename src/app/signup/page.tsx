"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router=useRouter()
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const response=await axios.post("/api/users/signup", formData)
    console.log(response,"response");
    router.push("/login")

  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">
        Sign Up
      </h2>
      <form className="space-y-4"onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            UserName
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your userName"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login">
          <h1 className="text-blue-500 hover:underline">Log in</h1>
        </Link>
      </p>
    </div>
  </div>
  )
};

export default SignupPage;