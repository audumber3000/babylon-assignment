"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Here we are setting display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      console.log("Registered:", userCredential.user);

      // Here we are redirect to login or home
      router.push("/login");
    } catch (err) {
      const message =  "Failed to register";  
      setError(message);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Welcome to Audi's Babylon
        </h1>
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">
          Create an Account
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-emerald-300"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-emerald-300"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border rounded-lg px-3 py-2 border-gray-300 focus:ring-2 focus:ring-emerald-300"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <Link href="/login" className="text-emerald-700 font-semibold ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}