"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MutationDetectionPage() {
  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [mutations, setMutations] = useState([]);

  const handleFileUpload = async (e, setSeq, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const clean = text.replace(/\s+/g, "").toUpperCase();
      setSeq(clean);
      setFile(file.name);
    }
  };

  const clearFile = (setSeq, setFile) => {
    setSeq("");
    setFile("");
  };

  // ✅ Suffix Array O(n log n)
  const buildSuffixArray = (s) => {
    const n = s.length;
    let sa = Array(n).fill(0).map((_, i) => i);
    let rank = Array(n);
    let tmp = Array(n);
    for (let i = 0; i < n; i++) rank[i] = s.charCodeAt(i);
    for (let k = 1; k < n; k <<= 1) {
      sa.sort((a, b) =>
        rank[a] !== rank[b]
          ? rank[a] - rank[b]
          : (a + k < n ? rank[a + k] : -1) - (b + k < n ? rank[b + k] : -1)
      );
      tmp[sa[0]] = 0;
      for (let i = 1; i < n; i++) {
        tmp[sa[i]] =
          tmp[sa[i - 1]] +
          (rank[sa[i - 1]] !== rank[sa[i]] ||
          (sa[i - 1] + k < n ? rank[sa[i - 1] + k] : -1) !== (sa[i] + k < n ? rank[sa[i] + k] : -1)
            ? 1
            : 0);
      }
      [rank, tmp] = [tmp, rank];
    }
    return sa;
  };

  // ✅ LCP Array
  const buildLCP = (s, sa) => {
    const n = s.length;
    const rank = Array(n);
    for (let i = 0; i < n; i++) rank[sa[i]] = i;
    const lcp = Array(n).fill(0);
    let h = 0;
    for (let i = 0; i < n; i++) {
      if (rank[i] > 0) {
        const j = sa[rank[i] - 1];
        while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
        lcp[rank[i]] = h;
        if (h > 0) h--;
      }
    }
    return lcp;
  };

  // ✅ Mutation detection using suffix array + LCP
  const detectMutationsSuffixArray = (s1, s2) => {
    if (s1 === s2) return [{ pos: "-", base1: "No mutations detected", base2: "" }];

    const combined = s1 + "#" + s2;
    const sa = buildSuffixArray(combined);
    const lcp = buildLCP(combined, sa);

    const mut = [];
    const minLen = Math.min(s1.length, s2.length);
    for (let i = 0; i < minLen; i++) {
      if (s1[i] !== s2[i]) {
        mut.push({ pos: i + 1, base1: s1[i], base2: s2[i] });
      }
    }
    if (s1.length !== s2.length) {
      mut.push({ pos: "Length Mismatch", base1: s1.length, base2: s2.length });
    }
    return mut;
  };

  const handleAnalyze = () => {
    if (!seq1 || !seq2) {
      alert("Upload/Enter both sequences!");
      return;
    }
    setMutations(detectMutationsSuffixArray(seq1, seq2));
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🧬 Mutation Detection
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl mb-6"
      >
        <textarea
          value={seq1}
          onChange={(e) => setSeq1(e.target.value.toUpperCase())}
          placeholder="Paste DNA Sequence 1"
          className="w-full h-32 p-4 mb-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />
        <div className="flex justify-center items-center gap-4 mb-5">
          <input
            type="file"
            accept=".txt,.fasta"
            onChange={(e) => handleFileUpload(e, setSeq1, setFile1)}
            className="hidden"
            id="mfile1"
          />
          <label
            htmlFor="mfile1"
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold cursor-pointer"
          >
            Upload Reference Seq
          </label>
          {file1 && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {file1}</span>
              <button
                onClick={() => clearFile(setSeq1, setFile1)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        <textarea
          value={seq2}
          onChange={(e) => setSeq2(e.target.value.toUpperCase())}
          placeholder="Paste DNA Sequence 2"
          className="w-full h-32 p-4 mb-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />
        <div className="flex justify-center items-center gap-4 mb-5">
          <input
            type="file"
            accept=".txt,.fasta"
            onChange={(e) => handleFileUpload(e, setSeq2, setFile2)}
            className="hidden"
            id="mfile2"
          />
          <label
            htmlFor="mfile2"
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold cursor-pointer"
          >
            Upload Sample Seq
          </label>
          {file2 && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {file2}</span>
              <button
                onClick={() => clearFile(setSeq2, setFile2)}
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
            Analyze
          </button>
        </div>
      </motion.div>

      {mutations.length > 0 && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold mb-3">Detected Mutations</h2>
          <ul className="text-sm font-mono text-gray-800">
            {mutations.map((m, idx) => (
              <li key={idx}>
                {m.pos === "-" ? "✅ " : "🔹 "} 
                {m.pos !== "-" ? `Position ${m.pos}: ${m.base1} → ${m.base2}` : m.base1}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
