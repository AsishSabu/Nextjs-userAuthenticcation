"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken||"");
    console.log(urlToken,"tokennn");

  }, []);

  useEffect(() => {
    // Function to verify email
    const verifyEmail = async () => {
      try {
        if (token) {
          await axios.post("/api/users/verifyemail", { token });
          setVerified(true);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      {verified && (
        <div>
          <h2>Email is Verified</h2>
          <Link href="/login">Login Now</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error in email verified</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
