"use client";
import Image from "next/image";

const teamMembers = [
  {
    name: "Aditya Shrestha (Team Leader)",
    role: "Algorithm & Core Logic",
    bio: "Implemented suffix array construction in JavaScript, tested with sample DNA sequences, wrote helper functions for substring search and repeats, and prepared integration with Firestore.",
    image: "/images/Addy.jpg",
  },
  {
    name: "Khushi Panwar",
    role: "Backend & Firebase Setup",
    bio: "Initialized Firebase project, configured authentication (email/password), created Firestore schema for users, sequences, and results, and documented setup steps for future phases.",
    image: "/images/Khusi.jpg", 
  },
  {
    name: "Ashutosh Kumar",
    role: "Frontend & UI Setup",
    bio: "Set up React + TailwindCSS project structure, built authentication UI (login/signup forms), created sequence upload form, and ensured responsive design and polished styling.",
    image: "/images/Ashu.jpg",
  },
];

export default function AboutUsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Login.webp')" }}
      ></div>

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">🌟 Meet Our Team</h1>
      <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
        We are a passionate team working together to build the Genome Analyzer project. Each member brings unique skills to ensure seamless development, attractive UI, and robust algorithms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full border-4 border-blue-200 shadow-md"
              />
            </div>
            <h2 className="font-bold text-xl mb-1">{member.name}</h2>
            <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
            <p className="text-gray-700 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>© 2025 Genome Analyzer Team. All rights reserved.</p>
      </div>
    </div>
  );
}
