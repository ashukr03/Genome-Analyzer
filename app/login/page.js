"use client";
import { auth, googleProvider, githubProvider } from "../../lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Handle Login with Firebase
  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // redirect to homepage after login
    } catch (error) {
      console.error(error);
      alert("Login failed, please try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      <div className="bg-white/90 shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          🧬 Genome Analyzer
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in to analyze genome sequences with advanced tools.
        </p>

        {/* Google Login Button */}
        <button
          onClick={() => handleLogin(googleProvider)}
          className="flex items-center justify-center w-full mb-4 py-3 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Sign in with Google
        </button>

        {/* GitHub Login Button */}
        <button
          onClick={() => handleLogin(githubProvider)}
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
          🔒 Your login is secure and private.
        </div>
      </div>
    </div>
  );
}
