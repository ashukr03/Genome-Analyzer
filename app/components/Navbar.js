"use client";
import Link from "next/link";
import { auth } from "../../lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to homepage after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
        {/* Left Side - Logo */}
        <Link href="/" className="text-xl font-bold hover:text-purple-400 transition">
          🧬 Genome Analyzer
        </Link>

        {/* Right Side - Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">{user.displayName || user.email}</span>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-20"></div>
    </header>
  );
}
