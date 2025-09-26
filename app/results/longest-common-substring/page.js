"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function LongestCommonSubstringPage() {
  const [seq1, setSeq1] = useState("");
  const [seq2, setSeq2] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [result, setResult] = useState(null);

  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleFileUpload = async (e, setSeq, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const clean = text.replace(/\s+/g, "").toUpperCase();
      setSeq(clean);
      setFile(file.name);
    }
  };

  const clearFile = (setSeq, setFile, ref) => {
    setSeq("");
    setFile("");
    setResult(null);
    if (ref.current) ref.current.value = "";
  };

  // ✅ Pure Suffix Array (Doubling Algorithm)
  const buildSuffixArray = (s) => {
    const n = s.length;
    let sa = Array.from({ length: n }, (_, i) => i);
    let rank = Array.from(s, (c) => c.charCodeAt(0));
    let tmp = Array(n);
    for (let k = 1; k < n; k <<= 1) {
      sa.sort((a, b) => {
        if (rank[a] !== rank[b]) return rank[a] - rank[b];
        const ra = a + k < n ? rank[a + k] : -1;
        const rb = b + k < n ? rank[b + k] : -1;
        return ra - rb;
      });
      tmp[sa[0]] = 0;
      for (let i = 1; i < n; i++) {
        tmp[sa[i]] =
          tmp[sa[i - 1]] +
          (rank[sa[i - 1]] !== rank[sa[i]] ||
          (sa[i - 1] + k < n ? rank[sa[i - 1] + k] : -1) !== (sa[i] + k < n ? rank[sa[i] + k] : -1)
            ? 1
            : 0);
      }
      rank = [...tmp];
      if (rank[sa[n - 1]] === n - 1) break; // fully sorted
    }
    return sa;
  };

  // ✅ LCP array
  const buildLCP = (s, sa) => {
    const n = s.length;
    const rank = Array(n);
    for (let i = 0; i < n; i++) rank[sa[i]] = i;

    const lcp = Array(n - 1).fill(0);
    let h = 0;
    for (let i = 0; i < n; i++) {
      if (rank[i] === 0) continue;
      const j = sa[rank[i] - 1];
      while (i + h < n && j + h < n && s[i + h] === s[j + h]) h++;
      lcp[rank[i] - 1] = h;
      if (h > 0) h--;
    }
    return lcp;
  };

  const findLCS = (s1, s2) => {
    const sep = "$";
    const combined = s1 + sep + s2;
    const n1 = s1.length;

    const sa = buildSuffixArray(combined);
    const lcp = buildLCP(combined, sa);

    let maxLen = 0,
      pos = -1;
    for (let i = 0; i < lcp.length; i++) {
      const inFirst = sa[i] < n1;
      const inSecond = sa[i + 1] < n1;
      if (inFirst !== inSecond && lcp[i] > maxLen) {
        maxLen = lcp[i];
        pos = sa[i];
      }
    }

    if (maxLen === 0)
      return { substring: "No common substring found", pos1: -1, pos2: -1 };

    const substring = combined.slice(pos, pos + maxLen);
    const pos1 = s1.indexOf(substring) + 1;
    const pos2 = s2.indexOf(substring) + 1;

    return { substring, pos1, pos2, length: maxLen };
  };

  const handleAnalyze = () => {
    if (!seq1 || !seq2) return alert("Upload/Enter both sequences!");
    setResult(findLCS(seq1, seq2));
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/signup.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        🔎 Longest Common Substring (Suffix Array)
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
            ref={fileInputRef1}
            onChange={(e) => handleFileUpload(e, setSeq1, setFile1)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef1.current.click()}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"
          >
            Upload Seq 1
          </button>
          {file1 && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {file1}</span>
              <button
                onClick={() => clearFile(setSeq1, setFile1, fileInputRef1)}
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
            ref={fileInputRef2}
            onChange={(e) => handleFileUpload(e, setSeq2, setFile2)}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef2.current.click()}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"
          >
            Upload Seq 2
          </button>
          {file2 && (
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-1 rounded-full shadow">
              <span className="truncate max-w-xs font-medium">📂 {file2}</span>
              <button
                onClick={() => clearFile(setSeq2, setFile2, fileInputRef2)}
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

      {result && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold mb-2">Result</h2>
          <p className="font-mono mb-2">{result.substring}</p>
          {result.pos1 > 0 && result.pos2 > 0 && (
            <p className="text-gray-700">
              Position in Sequence 1: {result.pos1} <br />
              Position in Sequence 2: {result.pos2} <br />
              Length: {result.length}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
