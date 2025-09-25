"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider, githubProvider } from "../../lib/firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // OAuth login
  const handleOAuthLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // redirect after login
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again!");
    }
  };

  // Email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect after login
    } catch (error) {
      console.error(error);
      alert("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center py-10">
      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/Login.webp')" }}
      ></div>

      {/* Sticky Overlay */}
      <div className="fixed inset-0 bg-black/40 -z-10"></div>

      {/* Login Card with animation */}
      <div
        className={`bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-md w-full text-center mx-4 transition-all duration-700 ease-out
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Genome Analyzer
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to analyze genome sequences with advanced tools.
        </p>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login with Email"}
          </button>
        </form>

        {/* OAuth Buttons */}
        <button
          onClick={() => handleOAuthLogin(googleProvider)}
          className="flex items-center justify-center w-full mb-4 py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>

        <button
          onClick={() => handleOAuthLogin(githubProvider)}
          className="flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          <img
            src="https://www.svgrepo.com/show/475654/github-color.svg"
            alt="GitHub"
            className="w-6 h-6 mr-2"
          />
          Sign in with GitHub
        </button>

        {/* Extra UI Touch */}
        <div className="mt-8 text-sm text-gray-500">
          Your login is secure and private.
        </div>
      </div>
    </div>
  );
}
