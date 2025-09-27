"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function NucleotideCountPage() {
  const [sequence, setSequence] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const cleanText = text.replace(/\s+/g, "").toUpperCase();
      setSequence(cleanText);
      setFileName(file.name);
    }
  };

  const clearFile = () => {
    setSequence("");
    setFileName("");
    setResult(null);
  };

  const handleAnalyze = () => {
    if (!sequence) return alert("Enter or upload a DNA sequence!");

    // HashMap (Map) ka use
    const countsMap = new Map([
      ["A", 0],
      ["T", 0],
      ["G", 0],
      ["C", 0],
    ]);

    for (let nucleotide of sequence) {
      if (countsMap.has(nucleotide)) {
        countsMap.set(nucleotide, countsMap.get(nucleotide) + 1);
      }
    }

    const total = Array.from(countsMap.values()).reduce((a, b) => a + b, 0);
    const atPercent = ((countsMap.get("A") + countsMap.get("T")) / total) * 100;
    const gcPercent = ((countsMap.get("G") + countsMap.get("C")) / total) * 100;

    // Define richness
    let richness = "";
    if (atPercent > gcPercent) richness = `AT-rich (${atPercent.toFixed(2)}%)`;
    else if (gcPercent > atPercent) richness = `GC-rich (${gcPercent.toFixed(2)}%)`;
    else richness = `Balanced (AT ${atPercent.toFixed(2)}%, GC ${gcPercent.toFixed(2)}%)`;

    // Map ko normal object me convert karke result me store karte hain
    const counts = Object.fromEntries(countsMap);

    setResult({ counts, richness, total, atPercent, gcPercent });
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">

      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🧬 Nucleotide Count
      </h1>

      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl"
      >
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value.toUpperCase())}
          placeholder="Paste DNA sequence (A,T,G,C)"
          className="w-full h-32 p-4 mb-5 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />

        <div className="flex justify-center items-center gap-4 mb-5">
          <input type="file" accept=".txt,.fasta" onChange={handleFileUpload} className="hidden" id="dnaFile" />
          <label
            htmlFor="dnaFile"
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold cursor-pointer"
          >
            Upload DNA File
          </label>

          {fileName && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {fileName}</span>
              <button
                onClick={clearFile}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            className="w-64 py-3 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600"
          >
            Analyze Sequence
          </button>
        </div>
      </motion.div>

      {/* Result */}
      {result && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold text-blue-700 mb-3">Result</h2>

          {/* Nucleotide Counts with Definitions */}
          <p className="text-gray-800 font-mono mb-2">
            A (Adenine): {result.counts.A}, T (Thymine): {result.counts.T}, G (Guanine): {result.counts.G}, C (Cytosine): {result.counts.C}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>Total nucleotides:</strong> {result.total}
          </p>

          <p className="text-gray-700 mb-1">
            <strong>AT Content:</strong> {result.atPercent.toFixed(2)}%
          </p>

          <p className="text-gray-700 mb-2">
            <strong>GC Content:</strong> {result.gcPercent.toFixed(2)}%
          </p>

          <p className="mt-2 font-semibold text-green-700">{result.richness}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
