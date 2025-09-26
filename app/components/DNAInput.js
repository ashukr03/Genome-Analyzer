"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const algorithms = [
  { name: "Nucleotide Count", image: "/images/nucleotide.webp", route: "/results/nucleotide-count" },
  { name: "K-mer Frequency", image: "/images/kmer.webp", route: "/results/kmer-frequency" },
  { name: "Longest Common Substring", image: "/images/lcs.webp", route: "/results/longest-common-substring" },
  { name: "Mutation Detection", image: "/images/mutation.webp", route: "/results/mutation-detection" },
  { name: "Longest Repeated Substring", image: "/images/repeated.webp", route: "/results/longest-repeated-substring" },
  { name: "Gene Family Detection", image: "/images/genefamily.webp", route: "/results/gene-family-detection" }
];

export default function DNAInput() {
  const router = useRouter();

  return (
    <motion.div className="p-10 max-w-6xl mx-auto min-h-screen">

      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Login.webp')" }}
      ></div>

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        🧬 Genome Analysis Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {algorithms.map((task) => (
          <motion.div
            key={task.name}
            onClick={() => router.push(task.route)}
            className="p-8 rounded-2xl shadow-lg text-center cursor-pointer bg-white hover:scale-105 hover:shadow-2xl transition-transform relative"
            whileHover={{ border: "2px solid #3b82f6" }}
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden relative">
              <img
                src={task.image}
                alt={task.name}
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-xl"></div>
            </div>

            <h3 className="font-bold text-lg">{task.name}</h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
