"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">Welcome to Audi's Babylon</h1>
       

        <div className="grid gap-4">
          <Link href="/login" className="block w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
            Go to Login
          </Link>

          <Link href="/register" className="block w-full py-3 rounded-lg border border-emerald-600 text-emerald-600 font-semibold hover:bg-emerald-50">
            Go to Register
          </Link>

      
        </div>

        <p className="text-xs text-gray-400 mt-6">We serve the community at our best !</p>
      </div>
    </div>
  );
}