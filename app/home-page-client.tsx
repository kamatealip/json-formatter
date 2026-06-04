"use client"
import React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileJson,
  Sparkles,
  Lock,
  ArrowRight,
  Code2,
  ListTree,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Download,
  History,
  FileUp,
  Search,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Smart Syntax Repair",
    description:
      "Instantly fixes common structural errors like unquoted keys, trailing commas, and mismatched single/double quotes.",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Monaco Editor Engine",
    description:
      "The same engine that powers VS Code. Enjoy native syntax highlighting, bracket matching, and advanced code folding.",
  },
  {
    icon: <ListTree className="h-6 w-6" />,
    title: "Recursive Tree View",
    description:
      "Navigate complex, nested objects with a structured hierarchical viewer. Perfect for deep data exploration.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Deep Search",
    description:
      "Recursively search through thousands of lines of data. Instantly find keys or values across any depth.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "100% Private Worker",
    description:
      "Your data never leaves your browser. Processing runs in a dedicated background worker for maximum security.",
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Session Persistence",
    description:
      "Automatically backups your work to LocalStorage. Pick up exactly where you left off, even after a full refresh.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Multi-Format Export",
    description:
      "Export your data as formatted JSON, minified production code, or even Python-compatible dictionaries.",
  },
  {
    icon: <FileUp className="h-6 w-6" />,
    title: "Drag & Drop Loader",
    description:
      "Drop any .json file directly into the interface to load and format it instantly with zero latency.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2.5"
        >
          <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter">JSONlix</span>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-border bg-muted/50 px-6 font-bold hover:bg-muted sm:flex"
            >
              <Link href="/format">Open Formatter</Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Professional Split-Layout Hero */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-24">
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="currentColor"
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] bg-[size:40px_40px]" />

          <div className="relative z-10 container mx-auto px-6">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="max-w-2xl text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary uppercase"
                >
                  <Zap className="h-3 w-3 fill-current" />
                  <span>Modern JSON Engineering</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                >
                  <h1 className="mb-8 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-5xl leading-[1.1] font-black tracking-tighter text-transparent md:text-7xl lg:text-8xl">
                    The Ultimate JSON <br />
                    <span className="text-primary">Workflow.</span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-12 text-lg leading-relaxed font-medium text-muted-foreground md:text-2xl"
                >
                  A high-performance formatter that handles messy, broken JSON with real-time detection and smart auto-repair. 
                  <span className="text-foreground/80"> Zero server-side overhead. Absolute privacy.</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="flex flex-col items-center gap-6 sm:flex-row"
                >
                  <Link href="/format">
                    <HoverBorderGradient
                      containerClassName="rounded-full shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]"
                      as="button"
                      className="flex items-center gap-2 bg-background px-10 py-4 text-lg font-black text-foreground"
                    >
                      Launch Application
                      <ArrowRight className="h-5 w-5" />
                    </HoverBorderGradient>
                  </Link>

                  <Button
                    asChild
                    variant="link"
                    className="group text-lg font-bold text-muted-foreground hover:text-foreground"
                  >
                    <Link
                      href="#capabilities"
                      className="flex items-center gap-2"
                    >
                      Explore Features
                      <div className="h-px w-0 bg-muted-foreground transition-all duration-300 group-hover:w-8" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Professional Visual Element */}
              <div className="relative hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: 40, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="perspective-1000"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-background/60 shadow-2xl backdrop-blur-3xl p-1">
                    <div className="flex flex-col rounded-[1.25rem] bg-muted/20 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
                        <div className="flex gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500/30 border border-red-500/50" />
                          <div className="h-3 w-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
                          <div className="h-3 w-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
                        </div>
                        <div className="text-[10px] font-black tracking-[0.3em] text-muted-foreground/40 uppercase">
                          JSONLIX_CORE_ENGINE
                        </div>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-border font-mono text-sm">
                        <div className="p-8 bg-muted/5">
                          <div className="flex items-center gap-3 text-red-500/80 mb-4">
                            <Terminal className="h-4 w-4" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Input Data</span>
                          </div>
                          <div className="space-y-1 opacity-50">
                            <div>{"{"}</div>
                            <div className="pl-6">name: &apos;jsonlix&apos;,</div>
                            <div className="pl-6">active: true,</div>
                            <div className="pl-6 text-red-400 font-bold underline decoration-wavy underline-offset-4">missing_comma</div>
                            <div>{"}"}</div>
                          </div>
                        </div>
                        <div className="p-8 bg-primary/[0.03]">
                          <div className="flex items-center gap-3 text-emerald-500 mb-4">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-[10px] font-black tracking-widest uppercase">Auto-Repaired</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-foreground/80">{"{"}</div>
                            <div className="pl-6 text-blue-400">&quot;name&quot;: <span className="text-emerald-400">&quot;jsonlix&quot;</span>,</div>
                            <div className="pl-6 text-blue-400">&quot;active&quot;: <span className="text-emerald-400">true</span>,</div>
                            <div className="pl-6 text-blue-400">&quot;status&quot;: <span className="text-emerald-400">&quot;ready&quot;</span></div>
                            <div className="text-foreground/80">{"}"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Shards */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-8 -top-8 rounded-2xl border border-primary/20 bg-primary/10 p-4 shadow-xl backdrop-blur-md"
                  >
                    <Sparkles className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-12 -bottom-12 rounded-2xl border border-primary/20 bg-primary/10 p-6 shadow-xl backdrop-blur-md"
                  >
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities - Auto-Scroll Marquee */}
        <section
          id="capabilities"
          className="relative overflow-hidden border-y border-border bg-muted/5 py-32"
        >
          <div className="container mx-auto mb-20 px-6">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl"
                >
                  Professional-grade primitives.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl font-medium text-muted-foreground"
                >
                  Engineered for developers who demand speed, privacy, and
                  visual clarity when working with complex data.
                </motion.p>
              </div>
              <div className="flex items-center gap-4 rounded-full border border-border px-6 py-2 text-xs font-black tracking-[0.4em] text-muted-foreground uppercase">
                <Sparkles className="h-3 w-3 animate-pulse text-primary" />
                <span>Recursive Engine</span>
              </div>
            </div>
          </div>

          <div className="pause-marquee flex overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="animate-marquee flex gap-8 px-4 whitespace-nowrap"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={`f1-${index}`}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </motion.div>
            <div
              className="animate-marquee flex gap-8 px-4 whitespace-nowrap"
              aria-hidden="true"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={`f2-${index}`}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </section>

        {/* FAQ Section */}
        <section className="relative py-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-20 text-center"
              >
                <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
                  Knowledge Base
                </h2>
                <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
              </motion.div>

              <div className="space-y-4">
                <FAQItem
                  question="Is there a reliable JSON formatter online?"
                  answer="Yes, JSONlix is a professional-grade, privacy-first online JSON formatter designed for developers who need fast and secure data processing."
                />
                <FAQItem
                  question="How to identify and fix JSON syntax errors?"
                  answer="JSONlix automatically detects syntax errors in real-time. Use the 'Smart Repair' feature to automatically fix common issues like unquoted keys, trailing commas, and single quotes."
                />
                <FAQItem
                  question="Can I use JSONlix on my smartphone?"
                  answer="Absolutely. JSONlix is built with a responsive design that works seamlessly on mobile devices, allowing you to format and inspect JSON data anywhere."
                />
                <FAQItem
                  question="How to format and beautify JSON online?"
                  answer="Simply paste your raw JSON into the editor. JSONlix instantly applies syntax highlighting and indentation. You can adjust the indentation size between 2 spaces, 4 spaces, or tabs."
                />
                <FAQItem
                  question="Is it safe to use an online JSON formatter?"
                  answer="With JSONlix, it is 100% safe. All processing is done locally in your browser. Your data never leaves your machine and is never sent to any server."
                />
                <FAQItem
                  question="How to read and navigate large JSON files?"
                  answer="JSONlix features an advanced Tree View for hierarchical navigation and a recursive search tool to find specific keys or values in seconds, regardless of file size."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden border-t border-border bg-muted/5 py-40">
          <div className="absolute inset-0 translate-y-1/2 scale-150 rounded-full bg-primary/5 blur-[120px]" />
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-10 text-5xl font-black tracking-tighter md:text-7xl"
            >
              Elevate your data workflow.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="h-16 rounded-full bg-foreground px-12 text-xl font-black text-background shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 hover:bg-foreground/90 active:scale-95"
              >
                <Link href="/format">Start Formatting Now</Link>
              </Button>
            </motion.div>
            <p className="mt-8 text-[10px] font-black tracking-[0.5em] text-muted-foreground/30 uppercase">
              Instant access • No registration • OSS Core
            </p>
          </div>
        </section>

        {/* SEO Content Section - Fixed Hydration Mismatch */}
        <section className="relative border-t border-border bg-background py-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-primary">
              <h2 className="mb-8 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-3xl font-black tracking-tighter text-transparent md:text-5xl">
                Ultimate Guide to Using an Online JSON Formatter
              </h2>

              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
                <p>
                  In the modern landscape of software development, JSON (JavaScript Object Notation) has become the de facto standard for data exchange. Whether you are working with REST APIs, configuration files, or complex databases, you will inevitably encounter JSON data. However, raw JSON is often minified or poorly formatted, making it difficult for humans to read and debug. This is where a high-quality <strong className="text-primary">json formatter</strong> becomes an essential part of your toolkit.
                </p>

                <h3 className="text-2xl font-bold text-foreground">What is a JSON Formatter?</h3>
                <p>
                  A <strong className="text-primary">json formatter</strong> is a tool that takes raw, minified, or messy JSON strings and converts them into a structured, well-indented, and human-readable format. By applying consistent indentation (usually 2 or 4 spaces) and syntax highlighting, an <strong className="text-primary">online json formatter</strong> allows developers to quickly scan data structures, identify keys, and understand the hierarchy of objects and arrays.
                </p>

                <h3 className="text-2xl font-bold text-foreground">Why You Need an Online JSON Formatter</h3>
                <p>
                  Many developers wonder why they should use an <strong className="text-primary">online json formatter</strong> instead of just using their built-in IDE features. While IDEs like VS Code are powerful, an <strong className="text-primary">online json formatter free</strong> of charge provides instant access without having to open heavy applications. If you are working on a remote machine or simply need a quick way to verify a snippet of data, a <strong className="text-primary">free online json formatter</strong> is often the fastest solution.
                </p>
                <p>
                  Moreover, our tool goes beyond simple beautification. If you find yourself searching for a <strong className="text-primary">json fromatter online</strong> (even with common typos!), you likely need a tool that can also handle &quot;broken&quot; JSON. Our smart syntax repair engine automatically fixes common errors like trailing commas, unquoted keys, and mismatched quotes, saving you minutes of manual debugging.
                </p>

                <h3 className="text-2xl font-bold text-foreground">Explore Data with an Online JSON Viewer</h3>
                <p>
                  Sometimes, just looking at a flat text file isn&apos;t enough, especially when dealing with deeply nested objects spanning thousands of lines. This is where an <strong className="text-primary">online json viewer</strong> becomes invaluable. A professional <strong className="text-primary">online json viewer</strong> provides a &quot;tree view&quot; representation of your data.
                </p>
                <p>
                  Using an <strong className="text-primary">online json tree view</strong>, you can collapse and expand specific nodes, allowing you to focus on the data that matters most. This hierarchical navigation is far superior to scrolling through a raw text file. Our <strong className="text-primary">free online json viewer</strong> includes a recursive search feature, meaning you can find specific keys or values across any depth of your data structure instantly.
                </p>

                <h3 className="text-2xl font-bold text-foreground">The Importance of Security and Privacy</h3>
                <p>
                  When using any <strong className="text-primary">online json formatter free</strong> tool, security should be your top priority. Many online tools send your data to their servers for processing, which can be a massive risk if you are handling sensitive API keys, user data, or proprietary configurations.
                </p>
                <p>
                  JSONlix is designed as a privacy-first utility. Unlike other tools, our <strong className="text-primary">online json viewer</strong> processes everything locally within your browser. This means your data never leaves your machine. Whether you are using it as a <strong className="text-primary">free online json formatter</strong> or a complex debugger, you can rest assured that your data remains 100% private and secure.
                </p>

                <h3 className="text-2xl font-bold text-foreground">Advanced Features for Developers</h3>
                <p>
                  For those who require more than just basic beautification, JSONlix offers a suite of advanced primitives. Our recursive engine is optimized for high-performance, capable of handling multi-megabyte files without lagging your browser. When you use this <strong className="text-primary">online json viewer</strong>, you are leveraging the same Monaco Editor engine that powers VS Code, giving you access to familiar features like bracket matching, code folding, and native syntax highlighting.
                </p>
                <p>
                  The <strong className="text-primary">online json tree view</strong> is particularly useful for engineers who need to map out data flows or understand complex API responses. By providing a clear visual representation of objects and arrays, it reduces cognitive load and allows you to spot structural anomalies at a glance. Whether you need a <strong className="text-primary">free online json viewer</strong> for a one-off task or a daily driver for your development workflow, JSONlix delivers unmatched precision and speed.
                </p>

                <h3 className="text-2xl font-bold text-foreground">How to Use Our Free Online JSON Formatter</h3>
                <p>
                  Using JSONlix is incredibly straightforward. Simply follow these steps:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Paste your raw JSON data into the editor window.</li>
                  <li>Watch as the tool instantly applies beautification.</li>
                  <li>If there are errors, our &quot;Smart Repair&quot; will highlight or fix them.</li>
                  <li>Switch to the <strong className="text-primary">online json tree view</strong> for a hierarchical look.</li>
                  <li>Search for specific values using the deep search bar.</li>
                  <li>Export your formatted data or copy it to your clipboard.</li>
                </ul>
                <p>
                  Our goal is to provide the best <strong className="text-primary">online json formatter free</strong> service on the web, combining power with simplicity. Whether you are debugging a complex API response or just trying to make sense of a config file, JSONlix is the ultimate <strong className="text-primary">json formatter</strong> for the modern developer.
                </p>

                <h3 className="text-2xl font-bold text-foreground">Conclusion</h3>
                <p>
                  Whether you are a seasoned engineer or just starting your coding journey, having a reliable <strong className="text-primary">json formatter</strong> is non-negotiable. From beautifying messy strings with an <strong className="text-primary">online json formatter</strong> to exploring deep structures with an <strong className="text-primary">online json tree view</strong>, the right tools can significantly boost your productivity. Don&apos;t settle for basic tools; choose a <strong className="text-primary">free online json viewer</strong> that offers speed, repair capabilities, and absolute privacy.
                </p>
                <p>
                  Experience the best <strong className="text-primary">json fromatter online</strong> today and streamline your data workflow with JSONlix.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mb-20 grid grid-cols-1 items-start gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-2.5">
                <FileJson className="h-8 w-8 text-primary" />
                <span className="text-2xl font-black tracking-tighter">
                  JSONlix
                </span>
              </div>
              <p className="max-w-sm text-lg leading-relaxed font-medium text-muted-foreground">
                The privacy-first kernel for JSON exploration and structural
                recovery. Built for the modern web.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-muted-foreground/30 uppercase">
                Application
              </h4>
              <ul className="space-y-4 font-bold text-muted-foreground">
                <li>
                  <Link
                    href="/format"
                    className="transition-colors hover:text-primary"
                  >
                    JSON Tool
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="transition-colors hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-muted-foreground/30 uppercase">
                Legal
              </h4>
              <ul className="space-y-4 font-bold text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-primary"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row">
            <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase">
              &copy; 2026 JSONlix Research. ALL RIGHTS RESERVED.
            </p>
            <div className="group flex cursor-default items-center gap-3 text-muted-foreground/10">
              <ShieldCheck className="h-4 w-4 transition-colors group-hover:text-primary" />
              <span className="text-[10px] font-black tracking-widest uppercase">
                Encrypted Local Stack
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex h-[380px] w-[320px] flex-none flex-col overflow-hidden rounded-[2.5rem] border border-border bg-muted/5 p-10 transition-all duration-500 hover:border-primary/50 hover:bg-muted/10 md:w-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative z-10 mb-10 w-fit rounded-2xl border border-border bg-muted/20 p-5 transition-all duration-500 group-hover:rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_30px_-5px_var(--primary)]">
        {icon}
      </div>
      <h3 className="relative z-10 mb-6 text-2xl font-black tracking-tight transition-transform duration-300 group-hover:translate-x-2">
        {title}
      </h3>
      <p className="relative z-10 text-base leading-relaxed font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {description}
      </p>
      <div className="mt-auto flex translate-y-4 items-center gap-2 pt-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-[10px] font-black tracking-widest text-primary uppercase">
          Explore Primitive
        </span>
        <ArrowRight className="h-3 w-3 text-primary" />
      </div>
    </motion.div>
  )
}

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className={cn(
        "group mb-4 overflow-hidden rounded-3xl border border-border bg-muted/5 transition-all duration-300",
        isOpen && "border-primary/20 bg-muted/10"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-8 text-left text-xl font-black tracking-tighter transition-colors hover:bg-muted/5 md:text-2xl"
      >
        {question}
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            backgroundColor: isOpen ? "rgba(59, 130, 246, 1)" : "rgba(0, 0, 0, 0)",
          }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300"
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-black" : "text-muted-foreground"
            )}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8">
              <p className="text-lg leading-relaxed font-medium text-muted-foreground">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
