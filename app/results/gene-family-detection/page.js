"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function GeneFamilyDetectionPage() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // File Upload Handling
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const text = await file.text();
      setSequence(text.replace(/[^ATGC]/gi, "").toUpperCase());
      setFileName(file.name);
      setResult(null);
    }
  };

  const clearFileAndSequence = () => {
    setSequence("");
    setFileName("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Suffix Tree Node
  class Node {
    constructor(start, end) {
      this.children = {};
      this.start = start;
      this.end = end;
      this.suffixLink = null;
      this.index = -1;
    }
  }

  class End {
    constructor(val) {
      this.value = val;
    }
  }

  // Build suffix tree using Ukkonen's algorithm (simplified)
  class SuffixTree {
    constructor(text) {
      this.text = text;
      this.root = new Node(-1, new End(-1));
      this.build();
    }

    build() {
      const n = this.text.length;
      const root = this.root;
      let activeNode = root;
      let activeEdge = -1;
      let activeLength = 0;
      let remainingSuffix = 0;
      const leafEnd = new End(-1);
      let lastCreatedInternalNode = null;

      for (let i = 0; i < n; i++) {
        leafEnd.value = i;
        remainingSuffix++;
        lastCreatedInternalNode = null;

        while (remainingSuffix > 0) {
          if (activeLength === 0) activeEdge = i;

          if (!activeNode.children[this.text[activeEdge]]) {
            activeNode.children[this.text[activeEdge]] = new Node(i, leafEnd);

            if (lastCreatedInternalNode) {
              lastCreatedInternalNode.suffixLink = activeNode;
              lastCreatedInternalNode = null;
            }
          } else {
            const next = activeNode.children[this.text[activeEdge]];
            const edgeLen = next.end.value - next.start + 1;

            if (activeLength >= edgeLen) {
              activeEdge += edgeLen;
              activeLength -= edgeLen;
              activeNode = next;
              continue;
            }

            if (this.text[next.start + activeLength] === this.text[i]) {
              if (lastCreatedInternalNode && activeNode !== root) {
                lastCreatedInternalNode.suffixLink = activeNode;
                lastCreatedInternalNode = null;
              }
              activeLength++;
              break;
            }

            const splitEnd = new End(next.start + activeLength - 1);
            const split = new Node(next.start, splitEnd);
            activeNode.children[this.text[activeEdge]] = split;

            split.children[this.text[i]] = new Node(i, leafEnd);
            next.start += activeLength;
            split.children[this.text[next.start]] = next;

            if (lastCreatedInternalNode) lastCreatedInternalNode.suffixLink = split;
            lastCreatedInternalNode = split;
          }

          remainingSuffix--;

          if (activeNode === root && activeLength > 0) {
            activeLength--;
            activeEdge = i - remainingSuffix + 1;
          } else if (activeNode !== root) {
            activeNode = activeNode.suffixLink || root;
          }
        }
      }

      this.setSuffixIndex(root, 0, n);
    }

    setSuffixIndex(node, labelHeight, size) {
      if (!node) return;
      let leaf = true;
      for (const k in node.children) {
        leaf = false;
        this.setSuffixIndex(
          node.children[k],
          labelHeight + (node.children[k].end.value - node.children[k].start + 1),
          size
        );
      }
      if (leaf) node.index = size - labelHeight;
    }
  }

  // Descend the suffix tree and collect repeated motifs of length 6
  const findRepeatedMotifs = (node, path, motifs, windowSize) => {
    if (!node) return;

    // Collect motif if path length reached
    if (path.length === windowSize) {
      motifs[path] = (motifs[path] || 0) + node.indexesCount();
      return;
    }

    for (const c in node.children) {
      const child = node.children[c];
      const edgeLabel = sequence.substring(child.start, child.end.value + 1);
      const needed = windowSize - path.length;
      const edgePart = edgeLabel.slice(0, Math.min(needed, edgeLabel.length));
      findRepeatedMotifs(child, path + edgePart, motifs, windowSize);
    }
  };

  // Helper to count number of leaf indices in node
  Node.prototype.indexesCount = function () {
    if (this.index >= 0) return 1;
    let count = 0;
    for (const c in this.children) {
      count += this.children[c].indexesCount();
    }
    return count;
  };

  const detectGeneFamilies = () => {
    if (!sequence) return alert("Please upload or enter a DNA sequence!");

    const cleanSeq = sequence + "$";
    const windowSize = 6;
    const tree = new SuffixTree(cleanSeq);
    const motifs = {};

    findRepeatedMotifs(tree.root, "", motifs, windowSize);

    const families = Object.entries(motifs).filter(([_, count]) => count > 1);
    setResult(families.length ? families : "No gene families detected.");
  };

  return (
    <motion.div className="p-8 max-w-4xl mx-auto">
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-30"
        style={{ backgroundImage: "url('/Signup.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
        🧬 Gene Family Detection
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl mb-6"
      >
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value.replace(/[^ATGC]/gi, "").toUpperCase())}
          placeholder="Paste DNA sequence (A,T,G,C)"
          className="w-full h-40 p-4 mb-4 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white/60"
        />

        <div className="flex justify-center gap-4 mb-4">
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
        </div>

        <div className="flex justify-center">
          <button
            onClick={detectGeneFamilies}
            className="w-64 py-3 rounded-xl text-white font-semibold bg-green-500 hover:bg-green-600"
          >
            Analyze Sequence
          </button>
        </div>
      </motion.div>

      {result && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="font-bold text-xl mb-2 text-center">Detected Families:</h2>
          {Array.isArray(result) ? (
            <ul className="space-y-1 max-h-60 overflow-y-auto">
              {result.map(([motif, count]) => (
                <li key={motif} className="text-gray-700">
                  <span className="font-mono">{motif}</span> → {count} times
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-center">{result}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
