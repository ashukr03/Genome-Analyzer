"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Tutorial({ onFinish }) {
  const steps = [
    {
      title: "Welcome to Genome Analyzer!",
      text: "This quick tutorial will help you understand how to analyze genome sequences efficiently and explore various algorithms.",
      image: "/images/welcome.webp",
    },
    {
      title: "Analyze Genome",
      text: "Click on 'Analyze Genome' to start analyzing DNA sequences using advanced algorithms.",
      image: "/images/analyzegenome.webp",
    },
    {
        title: "Choose an Algorithm",
        text: "Pick your preferred analysis method by clicking on any algorithm card. Each card explains its purpose — just tap to select and proceed!",
        image: "/images/algo.webp",
    },

    {
      title: "Upload DNA Sequence",
      text: "Upload your DNA sequence in FASTA or plain text format and click 'Analyze Sequence' to begin the process.",
      image: "/images/sequence.webp",
    },
    {
      title: "Read More",
      text: "To know more about the application, visit the Read More section available on the Home Page.",
      image: "/images/readMore.webp",
    },
    
  ];

  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      localStorage.setItem("tutorialSeen", "true");
      onFinish();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSkip = () => {
    localStorage.setItem("tutorialSeen", "true");
    onFinish();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center text-white flex flex-col items-center"
        >
          <h2 className="text-4xl font-bold mb-4">{steps[step].title}</h2>
          <p className="text-lg mb-6 max-w-2xl">{steps[step].text}</p>

          {/*  Tutorial image  */}
          <motion.img
            key={steps[step].image}
            src={steps[step].image}
            alt="Tutorial step"
            className="w-72 h-52 object-contain mb-8 rounded-lg border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSkip}
              className="px-5 py-2 bg-gray-500/80 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Skip
            </button>

            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={`px-5 py-2 rounded-lg transition ${
                step === 0
                  ? "bg-gray-400/50 cursor-not-allowed text-gray-300"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            >
              {step === steps.length - 1 ? "Finish" : "Next"}
            </button>
          </div>

          {/* Step indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === step ? "bg-green-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
