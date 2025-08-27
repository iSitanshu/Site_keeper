"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import crossimage from '@/image/cross.png'


const LoginPopup = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const router = useRouter();
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (currState === "Sign Up") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      });
      await res.json();
      if (!res.ok) {
        console.error("data.error while registering || Something went wrong");
      } else {
        setCurrState("Login");
      }
    } else {
      const { email, password } = userRegister;

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.error("Error while login - ", res.error);
      } else {
        router.push("/"); // redirect on success
      }
    }
  };

  const changeState = () => {
    if (currState === "Sign Up") setCurrState("Login");
    if (currState === "Login") setCurrState("Sign Up");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex flex-col gap-6 items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <form
        className="bg-white w-[90%] sm:w-[400px] p-6 rounded-2xl shadow-xl relative"
        onSubmit={handleSubmit}
      >
        {/* Title and Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{currState}</h2>
          <Image
            src={crossimage}
            alt="Close"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-4">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              onChange={handleChange}
              className="border border-gray-300 text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onChange={handleChange}
            className="border border-gray-300 text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter the Password"
            required
            onChange={handleChange}
            className="border border-gray-300 text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-800 transition duration-300"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Terms and Conditions */}
        {/* <div className="flex items-start mt-4 gap-2 text-sm text-gray-600">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div> */}

        {/* Switch Auth Mode */}
        <p className="mt-4 text-sm text-center text-gray-700">
          {currState === "Login" ? (
            <>
              Create a new account?{" "}
              <span
                className="text-green-800 font-semibold cursor-pointer hover:underline"
                onClick={() => changeState()}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-green-700 font-semibold cursor-pointer hover:underline"
                onClick={() => changeState()}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
      {/* <GoogleLogin
        onSuccess={(responseMessage) => handleCredentialResponse(responseMessage)}
        onError={errorMessage}
      />
      {profile && (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      )} */}
    </div>
  );
};

export default LoginPopup;
