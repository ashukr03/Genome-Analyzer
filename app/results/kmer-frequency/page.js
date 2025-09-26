"use client";
import { useState, useEffect } from "react";

export default function KmerFrequencyResult() {
  const [sequence, setSequence] = useState("");
  const [k, setK] = useState(3);
  const [motif, setMotif] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [displayCount, setDisplayCount] = useState(25);

  useEffect(() => {
    const storedSeq = localStorage.getItem("DNASequence");
    if (storedSeq) setSequence(storedSeq);
  }, []);

  const calculateKmerFrequency = (kValue) => {
    const freq = {};
    if (!sequence || sequence.length < kValue) return freq;
    for (let i = 0; i <= sequence.length - kValue; i++) {
      const kmer = sequence.substring(i, i + kValue).toUpperCase();
      if (!freq[kmer]) freq[kmer] = [];
      freq[kmer].push(i + 1);
    }
    return freq;
  };

  const handleCheck = () => {
    if (!motif) return alert("Please enter a motif to search!");
    const freqData = calculateKmerFrequency(k);
    const filtered = {};
    for (let key in freqData) {
      if (key.includes(motif.toUpperCase())) filtered[key] = freqData[key];
    }
    if (Object.keys(filtered).length === 0)
      alert("No k-mers found for this motif!");
    setFilteredData(filtered);
    setDisplayCount(25);
  };

  const handleShowMore = () => setDisplayCount((prev) => prev + 25);
  const handleKChange = (e) => {
    setK(parseInt(e.target.value));
    setFilteredData({});
    setMotif("");
    setDisplayCount(25);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-20"
        style={{ backgroundImage: "url('/Login.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold text-center mb-4 text-blue-700">
        K-mer Frequency Analysis
      </h1>

      {/* Info Card */}
      <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">
          K-mer Frequency Analysis: Looking for Hidden Patterns
        </h2>
        <p className="mb-2">
          While nucleotide count tells us what ingredients are present, K-mer analysis
          reveals what recipes they form. A K-mer is a short subsequence of length k
          (e.g., for k=3, the sequence ATGC gives codons like ATG, TGC).
        </p>
        <p className="mb-2">
          Why is this powerful? Because DNA often hides signals in repeating short patterns.
          Examples include:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Codon usage bias → preference for certain codons.</li>
          <li>Motif discovery → regulatory sequences or repeats detection.</li>
          <li>Genome assembly → overlapping k-mers help reconstruct sequences.</li>
        </ul>
        <p>
          In short, K-mer frequency analysis provides insight into DNA organization and
          supports applications from gene regulation studies to large-scale genome assembly.
        </p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <div>
          <label className="font-semibold mr-2">Select k-mer length:</label>
          <select value={k} onChange={handleKChange} className="p-2 border rounded-md">
            <option value={3}>3-mer</option>
            <option value={4}>4-mer</option>
            <option value={5}>5-mer</option>
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2">Enter Motif:</label>
          <input
            type="text"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="e.g. ATG"
            className="p-2 border rounded-md"
          />
        </div>

        <div>
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
          >
            Check
          </button>
        </div>
      </div>

      {/* Output Section */}
      {Object.keys(filteredData).length === 0 ? (
        <p className="text-center text-gray-600">
          Enter a motif and click "Check" to see results.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(filteredData)
              .slice(0, displayCount)
              .map(([key, positions]) => (
                <div
                  key={key}
                  className="min-w-[900px] max-w-[1000px] p-6 bg-white rounded-2xl shadow-xl flex flex-col"
                >
                  <h3 className="font-bold text-2xl mb-3 text-center">{key}</h3>
                  <div className="border rounded-md p-3 bg-gray-50 break-words">
                    <p className="text-md text-gray-700">
                      Positions: {positions.join(", ")}
                    </p>
                  </div>
                  <p className="text-md text-gray-500 mt-2 text-center">
                    Count: {positions.length}
                  </p>
                </div>
              ))}
          </div>

          {Object.keys(filteredData).length > displayCount && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
