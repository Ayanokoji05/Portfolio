"use client";

import { Badge, Card } from "@/components/ui";
import { researchData } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ResearchGrid() {
  const [openId, setOpenId] = useState<string | null>(researchData[0]?.id ?? null);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {researchData.map((project) => {
        const open = openId === project.id;
        return (
          <Card key={project.id} className="flex flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span
                className={
                  project.status === "Active"
                    ? "rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success"
                    : "rounded-full bg-tag-bg px-2.5 py-1 text-xs font-medium text-tag-text"
                }
              >
                {project.status}
              </span>
              <span className="text-xs text-foreground-secondary">{project.period}</span>
            </div>
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : project.id)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent"
              aria-expanded={open}
            >
              {open ? "Hide details" : "Expand details"}
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 overflow-hidden text-sm text-foreground-secondary"
                >
                  {project.highlights.map((item) => (
                    <li key={item} className="mb-2 list-disc ml-5">
                      {item}
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}
