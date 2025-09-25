"use client";
import { useState, useEffect } from "react";
import { auth } from "../../lib/firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create the user
      await createUserWithEmailAndPassword(auth, email, password);

      // Sign out immediately for manual login
      await signOut(auth);

      // Alert and redirect to login page
      alert("Account created! Please log in to continue.");
      router.push("/login"); 
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen min-h-screen flex items-center justify-center py-10">
      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>

      {/* Sticky Overlay */}
      <div className="fixed inset-0 bg-black/40 -z-10"></div>

      {/* Sign Up Card with animation */}
      <div
        className={`bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-md w-full text-center mx-4 transition-all duration-700 ease-out
        ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Create an Account
        </h1>
        <p className="text-gray-600 mb-8">
          Sign up to start analyzing genome sequences.
        </p>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
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
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Already have an account? */}
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
