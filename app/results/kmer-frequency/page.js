"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function KmerFrequencyPage() {
  const [sequence, setSequence] = useState("");
  const [k, setK] = useState(3);
  const [motif, setMotif] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      setSequence(text.replace(/\s+/g, "").toUpperCase());
      setFileName(file.name);
    }
  };

  // Clear sequence and file
  const clearFileAndSequence = () => {
    setSequence("");
    setFileName("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Analyze k-mers + motif
  const analyzeKmers = () => {
    if (!sequence) return alert("Please upload or enter a DNA sequence!");

    // HashMap (Map) ka use
    const countsMap = new Map();
    const motifMatches = [];

    for (let i = 0; i <= sequence.length - k; i++) {
      const sub = sequence.substring(i, i + k);
      countsMap.set(sub, (countsMap.get(sub) || 0) + 1);
    }

    if (motif) {
      const motifUpper = motif.toUpperCase();
      for (let i = 0; i <= sequence.length - motifUpper.length; i++) {
        if (sequence.substring(i, i + motifUpper.length) === motifUpper) {
          motifMatches.push(i + 1);
        }
      }
    }

    // Map ko normal object me convert karke result me store karte hain
    const counts = Object.fromEntries(countsMap);

    setResult({ counts, motifMatches });
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">

      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>
      
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        🔬 K-mer Frequency Analysis
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl mb-6"
      >
        {/* Sequence Input */}
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value.toUpperCase())}
          placeholder="Paste DNA sequence (A,T,G,C)..."
          className="w-full h-40 p-4 mb-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />

        {/* File Upload + K & Motif Inputs */}
        <div className="flex flex-wrap gap-4 mb-4 items-center justify-center">
          <input
            type="file"
            accept=".txt,.fasta"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"
          >
            Upload DNA File
          </button>

          {fileName && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {fileName}</span>
              <button
                onClick={clearFileAndSequence}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                ❌
              </button>
            </div>
          )}

          {/* K input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={k}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 3 && value <= 6) setK(value);
              }}
              className="w-20 p-2 border rounded-lg"
              min="3"
              max="6"
            />
            <span>K-value</span>
          </div>

          {/* Motif input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={motif}
              onChange={(e) => setMotif(e.target.value.toUpperCase())}
              placeholder="Enter motif (e.g. ATG)"
              className="p-2 border rounded-lg"
            />
            <span>Motif</span>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center">
          <button
            onClick={analyzeKmers}
            className="w-64 py-3 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600"
          >
            Analyze Sequence
          </button>
        </div>
      </motion.div>

      {/* Results Section */}
      {result && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="font-bold text-xl mb-4 text-center">Results:</h2>

          {/* K-mer Results */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">K-mer Frequencies:</h3>
            <ul className="space-y-1 max-h-60 overflow-y-auto">
              {Object.entries(result.counts).map(([kmer, count]) => (
                <li key={kmer} className="text-gray-700">
                  <span className="font-mono">{kmer}</span> → {count}
                </li>
              ))}
            </ul>
          </div>

          {/* Motif Results */}
          {motif && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Motif Matches ({motif}):</h3>
              {result.motifMatches.length > 0 ? (
                <p className="text-gray-700">
                  Found {result.motifMatches.length} times at positions: {result.motifMatches.join(", ")}
                </p>
              ) : (
                <p className="text-red-500 text-center">Motif not found in sequence.</p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
