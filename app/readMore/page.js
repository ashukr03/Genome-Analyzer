"use client";

import Image from "next/image";
import Link from "next/link";

export default function KnowMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          🧬 Genome Analyzer App
        </h1>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
          Welcome to the <strong>Genome Analyzer</strong> knowledge section!
          This page provides an in-depth look at the tools, algorithms, and
          biological concepts used in the application to help you explore and
          analyze DNA sequences effectively.
        </p>

        {/* 1️⃣ What is Genome Analyzer */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            1️⃣ What is Genome Analyzer?
          </h2>

          <Image
            src="/images/dnaHelix.webp"
            alt="DNA Helix Illustration"
            width={500}
            height={400}
            className="mx-auto mb-6 rounded-xl shadow-md w-3/4 md:w-1/2"
          />

          <p className="text-gray-700 leading-relaxed text-justify">
            The <strong>Genome Analyzer</strong> is a modern tool designed to
            decode and interpret genetic sequences. It helps in identifying
            nucleotide patterns, mutations, and conserved regions within DNA.
            With advanced algorithms, this analyzer simplifies genomic research
            for students, researchers, and professionals alike.
          </p>
        </section>

        {/* 2️⃣ Understanding DNA */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            2️⃣ Understanding DNA and Nucleotides (A, T, G, C)
          </h2>

          <p className="text-gray-700 leading-relaxed text-justify">
            DNA, or Deoxyribonucleic Acid, is composed of four nucleotides —
            Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). Each plays
            a critical role in forming genetic codes that determine the
            characteristics of all living organisms.
          </p>

          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>
              <strong>A (Adenine)</strong> always pairs with{" "}
              <strong>T (Thymine)</strong>.
            </li>
            <li>
              <strong>G (Guanine)</strong> always pairs with{" "}
              <strong>C (Cytosine)</strong>.
            </li>
            <li>These base pairings maintain the stability of DNA.</li>
          </ul>
        </section>

        {/* 3️⃣ FASTA Files */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            3️⃣ Working with FASTA Files
          </h2>

          <Image
            src="/images/fasta.webp"
            alt="FASTA File Example"
            width={500}
            height={400}
            className="mx-auto mb-6 rounded-xl shadow-md w-3/4 md:w-1/2"
          />

          <p className="text-gray-700 leading-relaxed text-justify">
            FASTA is a standard text-based file format used to represent
            nucleotide sequences. It includes a header line beginning with a
            &gt; symbol followed by the sequence identifier, and the sequence
            itself in the following lines.
          </p>

          <p className="text-gray-700 mt-3">
            You can upload FASTA files to quickly analyze sequences in the
            Genome Analyzer.
          </p>

          <div className="mt-5">
            <a
              href="https://www.ncbi.nlm.nih.gov/datasets/genome/?taxon=9606"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Download FASTA File
            </a>
          </div>
        </section>

        {/* 4️⃣ AT-rich vs GC-rich */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            4️⃣ AT-Rich vs GC-Rich Regions
          </h2>

          <p className="text-gray-700 leading-relaxed text-justify">
            DNA regions are often categorized as <strong>AT-rich</strong> or{" "}
            <strong>GC-rich</strong> based on their nucleotide composition.
          </p>

          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>
              <strong>AT-rich:</strong> Flexible, easier to unwind, common in
              promoter regions.
            </li>
            <li>
              <strong>GC-rich:</strong> More stable (3 hydrogen bonds), found in
              gene-dense areas.
            </li>
          </ul>
        </section>

        {/* 5️⃣ Core Algorithms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            5️⃣ Core Algorithms in Genome Analyzer
          </h2>

          <ul className="list-disc list-inside mt-3 text-gray-700 leading-relaxed">
            <li><strong>Nucleotide Count:</strong> Counts A, T, G, C.</li>
            <li><strong>K-mer Frequency:</strong> Finds short patterns.</li>
            <li><strong>Longest Common Substring:</strong> Shared DNA region.</li>
            <li><strong>Mutation Detection:</strong> Finds differences.</li>
            <li><strong>Longest Repeated Substring:</strong> Repeated motifs.</li>
            <li><strong>Gene Family Detection:</strong> Conserved genes.</li>
          </ul>
        </section>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
