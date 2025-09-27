"use client";

import DNAInput from "../components/DNAInput";
import { useSearchParams } from "next/navigation";

// Top-level page component
export default function DNAInputPage() {
  return <DNAInputWrapper />;
}

// Client-side wrapper to safely use useSearchParams()
function DNAInputWrapper() {
  const searchParams = useSearchParams();
  const prefillSequence = searchParams.get("prefill") || "";

  return <DNAInput prefillSequence={prefillSequence} />;
}
export const dynamic = "force-dynamic";
