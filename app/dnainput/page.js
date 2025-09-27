import DNAInput from "../components/DNAInput";

export default function DNAInputPage({ searchParams }) {
  const prefillSequence = searchParams?.prefill || "";

  return <DNAInput prefillSequence={prefillSequence} />;
}
