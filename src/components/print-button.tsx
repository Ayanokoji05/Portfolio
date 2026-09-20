"use client";

export function PrintButton({ label = "Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white print:hidden"
    >
      {label}
    </button>
  );
}
