"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function LongestRepeatedSubstringPage() {
  const [sequence, setSequence] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      const cleanText = text.replace(/\s+/g, "").toUpperCase();

      setSequence(cleanText);
      setFileName(file.name);
      setResult(null);
    }
  };

  const clearFile = () => {
    setSequence("");
    setFileName("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // =========================
  // Ukkonen's Suffix Tree Implementation
  // =========================
  class Node {
    constructor(start = 0, end = 0) {
      this.children = {};
      this.suffixLink = null;
      this.start = start;
      this.end = end;
      this.index = -1; // for leaf nodes
    }
  }

  const buildSuffixTree = (text) => {
    const n = text.length;
    const root = new Node();
    root.suffixLink = root;

    let activeNode = root;
    let activeEdge = -1;
    let activeLength = 0;
    let remaining = 0;
    let leafEnd = -1;
    const nodes = [];

    const edgeLength = (node) => (node.end === null ? leafEnd - node.start + 1 : node.end - node.start + 1);

    for (let i = 0; i < n; i++) {
      leafEnd = i;
      remaining++;
      let lastNewNode = null;

      while (remaining > 0) {
        if (activeLength === 0) activeEdge = i;
        const ch = text[activeEdge];

        if (!activeNode.children[ch]) {
          const leaf = new Node(i, null);
          leaf.index = i - remaining + 1;
          activeNode.children[ch] = leaf;
          nodes.push(leaf);

          if (lastNewNode) {
            lastNewNode.suffixLink = activeNode;
            lastNewNode = null;
          }
        } else {
          const next = activeNode.children[ch];
          const len = edgeLength(next);
          if (activeLength >= len) {
            activeEdge += len;
            activeLength -= len;
            activeNode = next;
            continue;
          }

          if (text[next.start + activeLength] === text[i]) {
            activeLength++;
            if (lastNewNode) {
              lastNewNode.suffixLink = activeNode;
              lastNewNode = null;
            }
            break;
          }

          const split = new Node(next.start, next.start + activeLength - 1);
          activeNode.children[ch] = split;
          const leaf = new Node(i, null);
          leaf.index = i - remaining + 1;
          split.children[text[i]] = leaf;
          next.start += activeLength;
          split.children[text[next.start]] = next;

          if (lastNewNode) lastNewNode.suffixLink = split;
          lastNewNode = split;
          nodes.push(split, leaf);
        }

        remaining--;
        if (activeNode === root && activeLength > 0) {
          activeLength--;
          activeEdge = i - remaining + 1;
        } else if (activeNode !== root) {
          activeNode = activeNode.suffixLink;
        }
      }
    }

    return root;
  };

  const dfsFindLRS = (node, path) => {
    let maxResult = { substring: "", length: 0, positions: [] };

    const isLeaf = Object.keys(node.children).length === 0;
    if (!isLeaf) {
      for (const key in node.children) {
        const child = node.children[key];
        const edgeStr = sequence.slice(child.start, (child.end === null ? sequence.length : child.end + 1));
        const childResult = dfsFindLRS(child, path + edgeStr);
        if (childResult.length > maxResult.length) maxResult = childResult;
      }

      const positions = collectLeafIndexes(node);
      if (positions.length >= 2 && path.length > maxResult.length) {
        maxResult = { substring: path, length: path.length, positions };
      }
    }

    return maxResult;
  };

  const collectLeafIndexes = (node) => {
    const indexes = [];
    const stack = [node];
    while (stack.length) {
      const n = stack.pop();
      if (Object.keys(n.children).length === 0) indexes.push(n.index + 1);
      for (const key in n.children) stack.push(n.children[key]);
    }
    return indexes;
  };

  const findLongestRepeatedSubstringWithTree = (text) => {
    const root = buildSuffixTree(text);
    const result = dfsFindLRS(root, "");
    if (!result.substring)
      return { substring: "No repeated substring found", length: 0, positions: [] };
    return result;
  };

  const findLongestRepeatedSubstring = () => {
    if (!sequence) return alert("Please upload or enter a DNA sequence!");
    const res = findLongestRepeatedSubstringWithTree(sequence);
    setResult(res);
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        🔄 Longest Repeated Substring
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl mb-6"
      >
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value.toUpperCase().replace(/\s+/g, ""))}
          placeholder="Paste DNA sequence (A,T,G,C)"
          className="w-full h-40 p-4 mb-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />

        <div className="flex justify-center items-center gap-4 mb-5">
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
            onClick={findLongestRepeatedSubstring}
            className="w-64 py-3 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600"
          >
            Analyze Sequence
          </button>
        </div>
      </motion.div>

      {result && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg text-center overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <p className="text-gray-700 font-mono break-words">{result.substring}</p>
          {result.length > 0 && (
            <div className="text-gray-700 mt-2 font-mono text-left">
              <p>Length: {result.length}</p>
              <p>First Positions in Sequence:</p>
              <div className="overflow-x-auto">
                {result.positions.map((pos, idx) => (
                  <span key={idx}>
                    {pos}
                    {(idx + 1) % 20 === 0 ? <br /> : ", "}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
