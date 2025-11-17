"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // redirect if not logged in
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">
          Welcome, {user.displayName || user.email}! 👋
        </h1>

        <p className="text-gray-700 mb-6">
          You’re now inside Audi’s Babylon.
        </p>

        <button
          onClick={logout}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}