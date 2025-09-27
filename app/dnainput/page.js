"use client";
import DNAInput from "../components/DNAInput";
import { useSearchParams } from "next/navigation";

export default function DNAInputPage() {
  const searchParams = useSearchParams();
  const prefillSequence = searchParams.get("prefill") || "";
  return <DNAInput prefillSequence={prefillSequence} />;
}

// Add this export at the very end:
export const dynamic = "force-dynamic";
