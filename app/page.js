"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tutorial from "./components/Tutorial";

export default function HomePage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [showTutorial, setShowTutorial] = useState(false);
  const [loginFlag, setLoginFlag] = useState(false);

  // ✅ Detect login transition only once
  useEffect(() => {
    if (user && !loginFlag) {
      setLoginFlag(true);

      // ❗ Don't remove item (it causes flicker)
      // Instead, simply IGNORE the old value & show tutorial fresh
      setShowTutorial(true);
    }
  }, [user, loginFlag]);

  // When tutorial ends, store a temporary flag so it closes smoothly
  const handleTutorialFinish = () => {
    localStorage.setItem("tutorialTemp", "done"); // harmless flag
    setShowTutorial(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        src="/Homepage.webm"
      />

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center p-6">

        {/* ------------------------- */}
        {/*        NOT LOGGED IN      */}
        {/* ------------------------- */}
        {!user && (
          <>
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Genome Analyzer
            </h1>

            <p className="text-lg text-white mb-8 max-w-xl">
              Please log in or sign up to start analyzing genome sequences
              with advanced tools.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                Sign Up
              </button>
            </div>
          </>
        )}

        {/* ------------------------- */}
        {/*        LOGGED IN VIEW      */}
        {/* ------------------------- */}
        {user && (
          <>
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Welcome, {user.displayName || "Explorer"}!
            </h1>

            <p className="text-lg text-white mb-8 max-w-xl">
              You’re logged in and ready to start analyzing genome sequences.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => router.push("/dnainput")}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                Analyze Genome
              </button>

              <button
                onClick={() => router.push("/readMore")}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
              >
                Read More
              </button>

              <button
                onClick={() => router.push("/aboutus")}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                About Us
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tutorial overlay AFTER login */}
      {user && showTutorial && (
        <Tutorial onFinish={handleTutorialFinish} />
      )}
    </div>
  );
}
