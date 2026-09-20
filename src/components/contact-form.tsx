"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Please add a subject"),
  message: z.string().min(20, "Message should be at least 20 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    setErrorMessage("");
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    try {
      if (accessKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            ...values,
            from_name: siteConfig.name,
          }),
        });
        const json = (await response.json()) as { success?: boolean; message?: string };
        if (!response.ok || !json.success) {
          throw new Error(json.message || "Unable to send message");
        }
      } else {
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`
        );
        window.location.assign(`mailto:${siteConfig.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`);
      }
      reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="glass flex flex-col items-center rounded-2xl border border-card-border px-6 py-12 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-success" />
        <h3 className="text-xl font-semibold">Message ready</h3>
        <p className="mt-2 max-w-md text-foreground-secondary">
          Thanks for reaching out. I will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Send another
        </button>
      </div>
    );
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-card-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-5 rounded-2xl border border-card-border p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input className={fieldClass} {...register("name")} autoComplete="name" />
          {errors.name ? <p className="mt-1 text-xs text-error">{errors.name.message}</p> : null}
        </label>
        <label className="block text-sm font-medium">
          Email
          <input className={fieldClass} type="email" {...register("email")} autoComplete="email" />
          {errors.email ? <p className="mt-1 text-xs text-error">{errors.email.message}</p> : null}
        </label>
      </div>
      <label className="block text-sm font-medium">
        Subject
        <input className={fieldClass} {...register("subject")} />
        {errors.subject ? <p className="mt-1 text-xs text-error">{errors.subject.message}</p> : null}
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea className={`${fieldClass} min-h-36 resize-y`} {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-error">{errors.message.message}</p> : null}
      </label>
      {status === "error" ? <p className="text-sm text-error">{errorMessage}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send message
      </button>
    </form>
  );
}
