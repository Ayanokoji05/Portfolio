"use client";

import { publicationsData, type Publication } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

type CitationStyle = "apa" | "mla" | "bibtex";

function toBibtex(pub: Publication) {
  const key = `${pub.authors.split(",")[0].replace(/[^a-zA-Z]/g, "").toLowerCase()}${pub.year}`;
  const entry = pub.type === "Journal" ? "article" : pub.type === "Conference" ? "inproceedings" : "misc";
  return `@${entry}{${key},
  title={${pub.title}},
  author={${pub.authors}},
  ${pub.type === "Journal" ? "journal" : "booktitle"}={${pub.journal}},
  year={${pub.year}},
  doi={${pub.doi}}
}`;
}

function toApa(pub: Publication) {
  return `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}. https://doi.org/${pub.doi}`;
}

function toMla(pub: Publication) {
  return `${pub.authors}. "${pub.title}." ${pub.journal}, ${pub.year}, https://doi.org/${pub.doi}.`;
}

function formatCitation(pub: Publication, style: CitationStyle) {
  if (style === "apa") return toApa(pub);
  if (style === "mla") return toMla(pub);
  return toBibtex(pub);
}

const types = ["All", "Journal", "Conference", "Preprint"] as const;

export function PublicationsBrowser() {
  const years = useMemo(
    () => ["All", ...Array.from(new Set(publicationsData.map((p) => String(p.year)))).sort((a, b) => +b - +a)],
    []
  );
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [year, setYear] = useState("All");
  const [style, setStyle] = useState<CitationStyle>("apa");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = publicationsData.filter((pub) => {
    const typeOk = type === "All" || pub.type === type;
    const yearOk = year === "All" || String(pub.year) === year;
    return typeOk && yearOk;
  });

  const copy = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const downloadAll = () => {
    const blob = new Blob([filtered.map(toBibtex).join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "publications.bib";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {types.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                type === item ? "bg-accent text-white" : "bg-tag-bg text-tag-text hover:bg-card-hover"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-foreground-secondary">
            Year
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="ml-2 rounded-lg border border-card-border bg-background px-2 py-1.5 text-sm"
            >
              {years.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-foreground-secondary">
            Cite as
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as CitationStyle)}
              className="ml-2 rounded-lg border border-card-border bg-background px-2 py-1.5 text-sm"
            >
              <option value="apa">APA</option>
              <option value="mla">MLA</option>
              <option value="bibtex">BibTeX</option>
            </select>
          </label>
          <button
            type="button"
            onClick={downloadAll}
            className="inline-flex items-center gap-2 rounded-lg border border-card-border px-3 py-1.5 text-sm hover:bg-card-hover"
          >
            <Download className="h-4 w-4" />
            Export BibTeX
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((pub) => {
          const citation = formatCitation(pub, style);
          return (
            <article key={pub.id} className="glass rounded-2xl border border-card-border p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-secondary">
                <span className="rounded-full bg-tag-bg px-2 py-0.5 text-tag-text">{pub.type}</span>
                <span>{pub.year}</span>
                <span>{pub.citations} citations</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{pub.title}</h2>
              <p className="mt-1 text-sm text-foreground-secondary">{pub.authors}</p>
              <p className="mt-1 text-sm italic text-foreground-secondary">{pub.journal}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{pub.abstract}</p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-background-secondary p-3 text-xs text-foreground-secondary">
                {citation}
              </pre>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  DOI <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => copy(citation, pub.id)}
                  className="inline-flex items-center gap-1 text-sm text-foreground-secondary hover:text-accent"
                >
                  {copied === pub.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === pub.id ? "Copied" : "Copy citation"}
                </button>
              </div>
            </article>
          );
        })}
        {filtered.length === 0 ? (
          <p className="text-foreground-secondary">No publications match these filters.</p>
        ) : null}
      </div>
    </div>
  );
}
