"use client";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Algorithms & Tasks
const algorithms = [
  {
    name: "Hash Map",
    image: "/images/hashmap.webp",
    sub: [
      { name: "Nucleotide Count", image: "/images/nucleotide.webp", desc: "Calculate A, T, G, C composition. Detect AT-rich/GC-rich regions." },
      { name: "K-mer Frequency", image: "/images/kmer.webp", desc: "Count short sequences (k-mers) → Find motifs, repeats, genome comparison." }
    ]
  },
  {
    name: "Suffix Array",
    image: "/images/suffixarray.webp",
    sub: [
      { name: "Pattern Matching", image: "/images/pattern.png", desc: "Substring search in genome." },
      { name: "Longest Common Prefix", image: "/images/lcp.png", desc: "Find shared regions." }
    ]
  },
  {
    name: "Suffix Tree",
    image: "/images/suffixtree.webp",
    sub: [
      { name: "Exact Matching", image: "/images/match.png", desc: "Ultra-fast substring queries." },
      { name: "Genome Assembly", image: "/images/assembly.png", desc: "Assemble short reads into genome." }
    ]
  }
];

export default function DNAInput({ prefillSequence = "" }) {
  const [sequence, setSequence] = useState("");
  const [fileName, setFileName] = useState("");
  const [user] = useAuthState(auth);

  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

  const fileInputRef = useRef(null);
  const algoSectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const savedSeq = localStorage.getItem("DNASequence");
    const savedFile = localStorage.getItem("DNAFileName");
    if (savedSeq) setSequence(savedSeq);
    if (savedFile) setFileName(savedFile);
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const cleanText = text.replace(/\s+/g, "").toUpperCase();
      setSequence(cleanText);
      setFileName(file.name);
      localStorage.setItem("DNASequence", cleanText);
      localStorage.setItem("DNAFileName", file.name);
    }
  };

  const clearFileAndSequence = () => {
    setSequence("");
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    localStorage.removeItem("DNASequence");
    localStorage.removeItem("DNAFileName");
  };

  const handleAnalyze = () => {
    if (!sequence) return alert("Enter or upload a sequence first!");
    setShowAlgorithms(true);
    setTimeout(() => algoSectionRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  const handleTask = (taskName) => {
    localStorage.setItem("DNASequence", sequence);

    if (taskName === "Nucleotide Count") {
      // ✅ Count nucleotides
      const counts = {
        A: (sequence.match(/A/g) || []).length,
        T: (sequence.match(/T/g) || []).length,
        G: (sequence.match(/G/g) || []).length,
        C: (sequence.match(/C/g) || []).length,
      };

      // ✅ AT-rich / GC-rich / Balanced logic (with percentages)
      const total = counts.A + counts.T + counts.G + counts.C;
      const atPercent = ((counts.A + counts.T) / total) * 100;
      const gcPercent = ((counts.G + counts.C) / total) * 100;

      let richness = "";
      if (atPercent > gcPercent) richness = `AT-rich (${atPercent.toFixed(2)}%)`;
      else if (gcPercent > atPercent) richness = `GC-rich (${gcPercent.toFixed(2)}%)`;
      else richness = `Balanced (AT ${atPercent.toFixed(2)}%, GC ${gcPercent.toFixed(2)}%)`;

      localStorage.setItem("NucleotideCountResult", JSON.stringify({ counts, richness }));
      router.push("/results/nucleotide-count");
    } 
    else if (taskName === "K-mer Frequency") {
      router.push("/results/kmer-frequency");
    } 
    else {
      alert(`No route found for ${taskName}`);
    }
  };

  return (
    <motion.div className="p-8 max-w-6xl mx-auto">
      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-70"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>

      {/* Upload Card */}
      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">🧬 Upload DNA Sequence</h1>
        <textarea 
          value={sequence} 
          onChange={e=>setSequence(e.target.value.toUpperCase())} 
          placeholder="Paste DNA sequence (A,T,G,C)"
          className="w-full h-44 p-4 mb-5 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/60 backdrop-blur-sm"
        />

        <div className="flex justify-center items-center gap-4 mb-5">
          <input type="file" accept=".txt,.fasta" onChange={handleFileUpload} ref={fileInputRef} className="hidden"/>
          <button onClick={()=>fileInputRef.current.click()} className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">
            Upload DNA File
          </button>

          {fileName && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {fileName}</span>
              <button onClick={clearFileAndSequence} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                ❌
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button onClick={handleAnalyze} className="w-64 py-3 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600">
            Analyze Sequence
          </button>
        </div>
      </motion.div>

      {/* Algorithm Cards */}
      {showAlgorithms && (
        <motion.div ref={algoSectionRef} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {algorithms.map(algo => (
            <motion.div 
              key={algo.name} 
              className="p-8 bg-white rounded-2xl shadow-lg text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={()=>setSelectedAlgorithm(algo.name)}
            >
              <img src={algo.image} alt={algo.name} className="w-28 h-28 mx-auto mb-4 object-contain"/>
              <h2 className="font-bold text-xl">{algo.name}</h2>
            </motion.div>
          ))}
        </motion.div>
      )}

      {selectedAlgorithm && (
        <motion.div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {algorithms.find(a=>a.name===selectedAlgorithm)?.sub.map(task => (
            <motion.div 
              key={task.name} 
              className="p-8 rounded-2xl shadow-lg text-center cursor-pointer bg-white hover:bg-green-100 hover:scale-105 transition-transform"
              onClick={()=>handleTask(task.name)}
            >
              <img src={task.image} alt={task.name} className="w-20 h-20 mx-auto mb-4 object-contain"/>
              <h3 className="font-bold text-lg">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
