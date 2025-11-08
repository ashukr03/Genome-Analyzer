"use client";

export default function KnowMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          🧬 Genome Analyzer App
        </h1>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
          Welcome to the <strong>Genome Analyzer</strong> knowledge section!
          This page provides an in-depth look at the tools, algorithms, and biological concepts
          used in the application to help you explore and analyze DNA sequences effectively.
        </p>

        {/* 1️⃣ What is Genome Analyzer */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            1️⃣ What is Genome Analyzer?
          </h2>
          <img
            src="/images/dnaHelix.webp"
            alt="DNA Helix Illustration"
            className="mx-auto mb-6 rounded-xl shadow-md w-3/4 md:w-1/2"
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            The <strong>Genome Analyzer</strong> is a modern tool designed to decode and interpret genetic sequences.
            It helps in identifying nucleotide patterns, mutations, and conserved regions within DNA.
            With advanced algorithms, this analyzer simplifies genomic research for students,
            researchers, and professionals alike.
          </p>
        </section>

        {/* 2️⃣ Understanding DNA and Nucleotides */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            2️⃣ Understanding DNA and Nucleotides (A, T, G, C)
          </h2>

          <p className="text-gray-700 leading-relaxed text-justify">
            DNA, or Deoxyribonucleic Acid, is composed of four nucleotides — Adenine (A),
            Thymine (T), Cytosine (C), and Guanine (G).
            Each plays a critical role in forming genetic codes that determine the characteristics of all living organisms.
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li><strong>A (Adenine)</strong> always pairs with <strong>T (Thymine)</strong>.</li>
            <li><strong>G (Guanine)</strong> always pairs with <strong>C (Cytosine)</strong>.</li>
            <li>These base pairings maintain the stability and structure of DNA.</li>
          </ul>
        </section>

        {/* 3️⃣ FASTA Files */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            3️⃣ Working with FASTA Files
          </h2>
          <img
            src="/images/fasta.webp"
            alt="FASTA File Example"
            className="mx-auto mb-6 rounded-xl shadow-md w-3/4 md:w-1/2"
          />
          <p className="text-gray-700 leading-relaxed text-justify">
            FASTA is a standard text-based file format used to represent nucleotide sequences.
            It includes a header line beginning with a “&gt;” symbol followed by the sequence identifier,
            and the sequence itself in the following lines.
          </p>
          <p className="text-gray-700 mt-3">
            You can upload FASTA files to quickly analyze sequences in the Genome Analyzer.
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

        {/* 4️⃣ AT-rich and GC-rich Regions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            4️⃣ AT-Rich vs GC-Rich Regions
          </h2>

          <p className="text-gray-700 leading-relaxed text-justify">
            DNA regions are often categorized as <strong>AT-rich</strong> or <strong>GC-rich</strong> based on
            their nucleotide composition.
            These compositions have significant biological implications:
          </p>
          <ul className="list-disc list-inside mt-3 text-gray-700">
            <li>
              <strong>AT-rich Regions:</strong> More flexible and easier to unwind, commonly found in regulatory
              or promoter regions where DNA needs to open up for transcription.
            </li>
            <li>
              <strong>GC-rich Regions:</strong> More stable due to three hydrogen bonds between G and C pairs.
              These regions often occur in gene-dense areas and are essential for structural integrity.
            </li>
          </ul>
        </section>

        {/* 5️⃣ Core Algorithms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            5️⃣ Core Algorithms in Genome Analyzer
          </h2>

          <ul className="list-disc list-inside mt-3 text-gray-700 leading-relaxed">
            <li>
              <strong>Nucleotide Count:</strong> Counts occurrences of A, T, G, and C to analyze composition and GC content.
            </li>
            <li>
              <strong>K-mer Frequency:</strong> Detects repeating short patterns (k-length substrings) within DNA.
            </li>
            <li>
              <strong>Longest Common Substring:</strong> Finds the longest identical sequence shared between two DNA samples.
            </li>
            <li>
              <strong>Mutation Detection:</strong> Identifies substitutions, insertions, and deletions in sequences.
            </li>
            <li>
              <strong>Longest Repeated Substring:</strong> Locates recurring DNA motifs useful in evolutionary biology.
            </li>
            <li>
              <strong>Gene Family Detection:</strong> Groups related genes across species based on conserved sequences.
            </li>
          </ul>
        </section>

        {/* 6️⃣ Real-World Applications */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
            6️⃣ Real-World Benefits of Genome Analyzer
          </h2>
          <img
            src="/images/genome.webp"
            alt="Real World Applications of Genome Analyzer"
            className="mx-auto mb-6 rounded-xl shadow-md w-3/4 md:w-1/2"
          />
          <ul className="list-disc list-inside mt-3 text-gray-700 leading-relaxed">
            <li>
              <strong>Healthcare:</strong> Early disease detection and precision medicine through genetic markers.
            </li>
            <li>
              <strong>Forensics:</strong> DNA profiling for criminal investigations and identity verification.
            </li>
            <li>
              <strong>Agriculture:</strong> Crop improvement via genome-based breeding and mutation tracking.
            </li>
            <li>
              <strong>Evolutionary Biology:</strong> Comparative genomics helps understand species evolution.
            </li>
            <li>
              <strong>Biotechnology:</strong> Genetic modification and synthetic biology research.
            </li>
          </ul>
        </section>

        {/*  Detailed Real-World Benefits of Core Algorithms */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
            7️⃣ Real-World Benefits of Each Algorithm
          </h2>

          <div className="grid gap-8 md:grid-cols-2">

            {/* 1 - Nucleotide Count */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                1. Nucleotide Count (A, T, G, C + GC Content)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Disease detection — GC methylation helps diagnose cancers.</li>
                <li>• PCR test optimization (COVID, DNA fingerprinting).</li>
                <li>• Drug design — DNA stability impact.</li>
                <li>• Species identification using GC signature.</li>
              </ul>
              <p className="mt-3 font-medium text-blue-500">
                Benefit: Accurate tests, cancer analysis, species classification.
              </p>
            </div>

            {/* 2 - K-mer Frequency */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
                2. K-mer Frequency (Short Pattern Detection)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Virus detection (COVID, HIV identifier patterns).</li>
                <li>• Genome assembly for large DNA sequences.</li>
                <li>• Antibiotic resistance gene detection.</li>
              </ul>
              <p className="mt-3 font-medium text-purple-500">
                Benefit: Fast pathogen detection, genome building, resistance tracking.
              </p>
            </div>

            {/* 3 - Longest Common Substring */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                3. Longest Common Substring (Between Two DNA Samples)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Evolution study — species relationship mapping.</li>
                <li>• Ancestry testing.</li>
                <li>• Disease gene detection between patients.</li>
                <li>• Paternity & forensic identity tests.</li>
              </ul>
              <p className="mt-3 font-medium text-green-500">
                Benefit: Forensics, heredity checks, disease discovery.
              </p>
            </div>

            {/* 4 - Mutation Detection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                4. Mutation Detection (SNPs, Insertions, Deletions)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Cancer mutation identification.</li>
                <li>• Genetic disease prediction (Thalassemia, Huntington’s).</li>
                <li>• Personalized medicine based on DNA mutations.</li>
                <li>• Virus variant tracking (COVID: Delta, Omicron).</li>
              </ul>
              <p className="mt-3 font-medium text-red-500">
                Benefit: Precision treatment, accurate diagnosis, vaccine design.
              </p>
            </div>

            {/* 5 - Longest Repeated Substring */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-yellow-600 flex items-center gap-2">
                5. Longest Repeated Substring (Repeated DNA Motifs)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Forensic DNA fingerprinting.</li>
                <li>• Evolutionary pressure and adaptation studies.</li>
                <li>• Genetic disease detection (Fragile X, Huntington).</li>
              </ul>
              <p className="mt-3 font-medium text-yellow-600">
                Benefit: Crime-solving, ancestry mapping, disorder detection.
              </p>
            </div>

            {/* 6 - Gene Family Detection */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-teal-100 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 flex items-center gap-2">
                6. Gene Family Detection (Across Species)
              </h3>
              <ul className="mt-3 text-gray-700 space-y-2">
                <li>• Drug discovery using similar genes.</li>
                <li>• Crop improvement (drought resistance, yield).</li>
                <li>• Biotechnology — enzyme & protein function studies.</li>
                <li>• Evolution & gene duplication analysis.</li>
              </ul>
              <p className="mt-3 font-medium text-teal-600">
                Benefit: Better medicines, improved crops, biotech advancement.
              </p>
            </div>

          </div>
        </section>


        {/* Back Button */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
