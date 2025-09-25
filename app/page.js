"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebaseConfig";

export default function HomePage() {
  const [user] = useAuthState(auth);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-page fixed video background */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        src="/Homepage.webm"
      />

      {/* Fixed black overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 -z-10" />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center p-6">
        {user ? (
          <>
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Welcome, {user.displayName || "Explorer"}!
            </h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              You’re logged in and ready to start analyzing genome sequences.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                Analyze Genome
              </button>
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                Explore Samples
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              Genome Analyzer
            </h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              Please log in or sign up to start analyzing genome sequences  
              with advanced tools.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
