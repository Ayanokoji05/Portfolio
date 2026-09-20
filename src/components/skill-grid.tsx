"use client";

import { aboutData } from "@/lib/data";
import { motion } from "framer-motion";

export function SkillGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {aboutData.skills.map((skill) => (
        <div key={skill.name}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="text-foreground-secondary">{skill.level}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
