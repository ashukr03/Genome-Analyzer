"use client";
import { useEffect, useState } from "react";

export default function NucleotideCountResult() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("NucleotideCountResult");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data)
    return (
      <p className="p-8 text-center">
        No data found. Go back and analyze a sequence.
      </p>
    );

  const { counts, richness } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* Sticky Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-20 opacity-20"
        style={{ backgroundImage: "url('/Login.webp')" }}
      ></div>

      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Nucleotide Count Result
      </h1>

      {/* Info Card */}
      <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-6 text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Nucleotide Count: The Basic Composition Check</h2>
        <p className="mb-2">
          Every DNA sequence is built from four bases: adenine (A), thymine (T),
          guanine (G), and cytosine (C). Counting how often each base appears may
          sound basic, but it reveals a lot about the sequence.
        </p>
        <p className="mb-2">
          For example, the ratio of GC to AT bases (GC content) is a genomic signature.
          High GC content, as seen in some heat-loving bacteria, increases DNA stability,
          while AT-rich regions often appear in regulatory elements influencing gene activity.
        </p>
        <p>
          Researchers often visualize nucleotide composition with pie charts or bar graphs,
          making it easy to see if a genome is AT-rich, GC-rich, or balanced—useful for
          species classification, sequencing quality control, and evolutionary studies.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(counts).map(([nuc, count]) => (
          <div key={nuc} className="p-6 bg-white/70 rounded-2xl shadow text-center">
            <h2 className="font-bold text-xl">{nuc}</h2>
            <p className="text-lg mt-2">{count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-lg font-semibold text-gray-700">
        Sequence Richness: {richness}
      </div>
    </div>
  );
}
