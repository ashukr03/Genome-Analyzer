"use client";
import { useSearchParams } from "next/navigation";
import DNAInput from "../components/DNAInput";

export default function DNAInputPage() {
  const searchParams = useSearchParams();
  const prefillSequence = searchParams.get("prefill") || "";

  return <DNAInput prefillSequence={prefillSequence} />;
}
