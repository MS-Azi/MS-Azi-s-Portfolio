"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const socials = [
  { label: "GitHub", href: "https://github.com/MS-Azi", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/esther-azi", icon: Linkedin },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        "Contact form: NEXT_PUBLIC_WEB3FORMS_KEY is not set — see public/images/README.md / project setup notes."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", "New message from your portfolio site");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs uppercase tracking-wider text-paper-500">
            Get in touch
          </span>
          <h2 className="mt-2 text-3xl font-semibold text-paper-100 sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-paper-500">
            Have a web build, a mobile app, or a design system that needs a
            hand? Tell me what you&apos;re working on and I&apos;ll reply within
            two business days.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex items-center gap-2 rounded-lg border border-ink-600 px-3.5 py-2.5 text-sm text-paper-300 transition-colors hover:border-paper-500 hover:text-paper-100"
              >
                <social.icon className="h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-ink-600 bg-ink-800/50 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-paper-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                type="text"
                className="mt-1.5 w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-100 outline-none placeholder:text-paper-500 focus:border-lane-web"
                placeholder="Jordan Lee"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-paper-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                required
                type="email"
                className="mt-1.5 w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-100 outline-none placeholder:text-paper-500 focus:border-lane-web"
                placeholder="jordan@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="text-sm font-medium text-paper-300">
              What do you need?
            </label>
            <select
              id="category"
              name="category"
              defaultValue="web"
              className="mt-1.5 w-full rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-100 outline-none focus:border-lane-web"
            >
              <option value="web">Web development</option>
              <option value="mobile">Mobile app</option>
              <option value="design">Graphic / UI-UX design</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium text-paper-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="mt-1.5 w-full resize-none rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-paper-100 outline-none placeholder:text-paper-500 focus:border-lane-web"
              placeholder="Tell me a bit about the project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sent" || status === "sending"}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors sm:w-auto",
              status === "sent"
                ? "bg-lane-webDim text-lane-web"
                : status === "error"
                  ? "bg-lane-design/20 text-lane-design"
                  : "bg-paper-100 text-ink-950 hover:bg-paper-300 disabled:opacity-60"
            )}
          >
            {status === "sent" ? (
              <>
                <Check className="h-4 w-4" /> Message sent
              </>
            ) : status === "sending" ? (
              <>Sending…</>
            ) : status === "error" ? (
              <>
                <AlertCircle className="h-4 w-4" /> Couldn&apos;t send — try again
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
          {status === "error" && !WEB3FORMS_ACCESS_KEY && (
            <p className="text-xs text-paper-500">
              The form isn&apos;t connected to an email address yet — see the
              setup notes for how to add your Web3Forms key.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
