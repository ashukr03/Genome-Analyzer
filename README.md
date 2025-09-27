# Genome-Analyzer 🧬

**Genome-Analyzer** is a web-based bioinformatics dashboard for performing genome analysis tasks like nucleotide counting, K-mer frequency calculation, mutation detection, longest repeated substring detection, and gene family detection. The project is built with **Next.js (App Router)**, **React**, **Framer Motion**, and **Tailwind CSS**.

---

## 🚀 Features

- **Nucleotide Count** – Count occurrences of A, T, G, C in DNA sequences.
- **K-mer Frequency** – Compute frequency of K-length substrings.
- **Longest Common Substring** – Find the longest common substring between sequences.
- **Mutation Detection** – Identify mutations between two DNA sequences.
- **Longest Repeated Substring** – Detect the longest repeated substring within a sequence.
- **Gene Family Detection** – Analyze DNA sequences for gene families.
- **Responsive UI** – Works on desktop and mobile.
- **Animated Dashboard** – Smooth transitions with Framer Motion.
- **File Upload Support** – Upload sequences directly from your device.

---

## 📁 Project Structure

genome-analyzer/
├─ app/
│ ├─ dnainput/ # DNA input page
│ ├─ results/ # Result pages for all algorithms
│ ├─ components/ # React components (Navbar, DNAInput, etc.)
│ ├─ layout.js # Root layout
│ └─ page.js # Home page
├─ public/
│ ├─ images/ # Image assets
├─ .next/ # Next.js build folder
├─ package.json
├─ tailwind.config.js
└─ README.md

---

## ⚡ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion  
- **Backend / Framework:** Next.js 15 (App Router)  
- **Deployment:** Vercel (optimized for static and dynamic rendering)  
- **Version Control:** Git & GitHub  

---

## 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/ashukr03/Genome-Analyzer.git
cd Genome-Analyzer
Install dependencies:

npm install
Run the development server:

npm run dev
Open http://localhost:3000 in your browser.

🌐 Deployment
Deployed on Vercel: The project supports static and server-side rendering.

Make sure all image paths in /public are lowercase to avoid Linux deployment issues.

📝 Usage
Go to the Genome Analysis Dashboard.

Select the desired algorithm from the cards.

Input your DNA sequence (or upload a file).

Click Submit to view results.

Navigate between different algorithms via the dashboard.

⚙️ Notes
Background images and assets must have consistent lowercase file names for deployment on Linux servers (Vercel).

React Image component from next/image is used for optimized images.

All pages are pre-rendered when possible for performance.

👨‍💻 Author
Ashutosh Kumar – MCA Student & Developer

GitHub: ashukr03