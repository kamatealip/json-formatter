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
  Plus,
  Download,
  History,
  FileUp,
  Search,
  Zap,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { JsonFormatter } from "@/components/json-formatter"

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Smart JSON Repair",
    description:
      "Instantly fixes common JSON syntax errors like unquoted keys, trailing commas, and mismatched single/double quotes.",
    className: "lg:col-span-2",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "JSON Beautifier Engine",
    description:
      "Advanced beautification using the Monaco engine. Enjoy native syntax highlighting, bracket matching, and code folding.",
    className: "lg:col-span-1",
  },
  {
    icon: <ListTree className="h-6 w-6" />,
    title: "Recursive JSON Viewer",
    description:
      "Navigate complex, nested objects with a structured hierarchical tree view. Perfect for deep data exploration.",
    className: "lg:col-span-1",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Private Offline Formatter",
    description:
      "Your data never leaves your browser. Our 100% private offline JSON formatter runs in a dedicated background worker.",
    className: "lg:col-span-2",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "JSON Path Search",
    description:
      "Recursively search through thousands of lines of data. Instantly find JSON keys or values across any depth.",
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Auto-Save History",
    description:
      "Automatically backups your formatted JSON to LocalStorage. Pick up exactly where you left off, even after a refresh.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "JSON Minifier & Export",
    description:
      "Export your data as beautified JSON, minified production code, or even Python-compatible dictionaries.",
  },
  {
    icon: <FileUp className="h-6 w-6" />,
    title: "JSON File Loader",
    description:
      "Drop any .json file directly into the interface to load, validate, and format it instantly with zero latency.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] flex shrink-0 items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
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
          </motion.div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Formatter Section - Takes initial view */}
        <section className="h-[calc(100vh-73px)] min-h-[600px] border-b border-border bg-background px-4 py-2 sm:px-6 sm:py-4">
          <JsonFormatter />
        </section>

        {/* Informational Content */}
        <div className="relative">
          <section className="relative overflow-hidden border-b border-border bg-muted/5 py-32">
            <div className="container mx-auto mb-20 px-8 md:px-12">
              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end max-w-6xl mx-auto">
                <div className="max-w-2xl">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-6 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl"
                  >
                    Professional JSON Beautifier & Formatter.
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl font-medium text-muted-foreground"
                  >
                    Engineered for developers who demand the best online JSON viewer, 
                    validator, and repair tool with 100% data privacy.
                  </motion.p>
                </div>
                <div className="flex items-center gap-4 rounded-full border border-border px-6 py-2 text-xs font-black tracking-[0.4em] text-muted-foreground uppercase">
                  <Sparkles className="h-3 w-3 animate-pulse text-primary" />
                  <span>Validator Engine</span>
                </div>
              </div>
            </div>

            <div className="container mx-auto px-8 md:px-12">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {features.slice(0, 4).map((feature, index) => (
                  <BentoCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    className={feature.className}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="pause-marquee mt-20 flex overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="animate-marquee flex gap-8 px-4 whitespace-nowrap"
              >
                {features.slice(4).map((feature, index) => (
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
                {features.slice(4).map((feature, index) => (
                  <FeatureCard
                    key={`f2-${index}`}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* How it Works Section */}
          <section className="relative overflow-hidden py-32">
            <div className="container mx-auto px-8 md:px-12">
              <div className="mb-24 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary uppercase"
                >
                  <span>JSON Tool Workflow</span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mb-6 text-4xl font-black tracking-tighter md:text-6xl"
                >
                  Format raw data into <br />{" "}
                  <span className="text-primary">perfectly valid JSON.</span>
                </motion.h2>
              </div>

              <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 max-w-6xl mx-auto">
                <div className="absolute top-1/2 left-0 z-0 hidden h-px w-full -translate-y-1/2 bg-border md:block" />

                <StepItem
                  number="01"
                  title="Input & Load"
                  description="Paste raw JSON, enter a URL, or drop a file directly into the high-performance online editor."
                  icon={<Terminal className="h-8 w-8" />}
                  delay={0}
                />
                <StepItem
                  number="02"
                  title="Validate & Repair"
                  description="Our private worker analyzes, validates, and beautifies your JSON with instant repair capabilities."
                  icon={<Zap className="h-8 w-8" />}
                  delay={0.2}
                />
                <StepItem
                  number="03"
                  title="Explore & Export"
                  description="Navigate the recursive tree view, find paths, and minify or export your data instantly."
                  icon={<ListTree className="h-8 w-8" />}
                  delay={0.4}
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative py-32">
            <div className="container mx-auto px-8 md:px-12">
              <div className="mx-auto max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-20 text-center"
                >
                  <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
                    JSON Knowledge Base
                  </h2>
                  <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <FAQItem
                    question="What is the best online JSON formatter and validator?"
                    answer="JSONlix is considered one of the best tools as it combines a JSON beautifier, validator, and repair tool into one private, offline-capable interface."
                  />
                  <FAQItem
                    question="How can I fix JSON syntax errors automatically?"
                    answer="JSONlix features a 'Smart Repair' tool that automatically detects and fixes common syntax issues like missing quotes, trailing commas, and single quotes in real-time."
                  />
                  <FAQItem
                    question="Is there a secure and private JSON viewer online?"
                    answer="Yes, JSONlix is a privacy-first JSON viewer. All data processing occurs locally in your browser, meaning your sensitive data is never uploaded to any server."
                  />
                  <FAQItem
                    question="How do I beautify and minify JSON data?"
                    answer="Simply paste your data into the JSONlix editor. It will instantly beautify your JSON with proper indentation. You can also use the 'Minify' option to compress it for production use."
                  />
                  <FAQItem
                    question="Can I format large JSON files (10MB+) online?"
                    answer="JSONlix is optimized for performance. Using a dedicated web worker, it can handle, format, and search through large JSON files without freezing your browser."
                  />
                  <FAQItem
                    question="How to navigate complex JSON with a tree view?"
                    answer="Our recursive Tree View allows you to expand and collapse nodes, making it easy to explore deeply nested data structures and find specific JSON paths instantly."
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="relative border-t border-border bg-background py-32">
            <div className="container mx-auto px-8 md:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-primary mx-auto max-w-4xl"
              >
                <h2 className="mb-8 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-3xl font-black tracking-tighter text-transparent md:text-5xl">
                  Expert Guide to Online JSON Formatting & Validation
                </h2>

                <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    In modern web development, JSON (JavaScript Object Notation) is the 
                    universal language for data. However, raw API responses are often 
                    minified or cluttered. A high-quality <strong className="text-primary">json formatter</strong> is 
                    essential for developers to transform messy data into clean, readable structures.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">
                    Why use a JSON Beautifier?
                  </h3>
                  <p>
                    A <strong className="text-primary">json beautifier</strong> takes minified 
                    code and applies indentation (2 or 4 spaces) and syntax highlighting. 
                    This makes it possible to debug API responses, configuration files, 
                    and database records in seconds. Using an <strong className="text-primary">online json formatter</strong> like 
                    JSONlix provides instant clarity without the need for complex IDE setups.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">
                    Advanced JSON Validator & Repair
                  </h3>
                  <p>
                    Validating your data is just as important as formatting it. Our 
                    <strong className="text-primary"> json validator</strong> checks for 
                    strict compliance with JSON standards. If your data is "broken," our 
                    unique <strong className="text-primary">json repair tool</strong> can 
                    automatically fix common issues like trailing commas or unquoted keys, 
                    making it a superior choice for developers searching for a 
                    <strong className="text-primary"> json lint</strong> alternative.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">
                    Explore with a Recursive JSON Viewer
                  </h3>
                  <p>
                    For large datasets, a text editor isn't enough. An 
                    <strong className="text-primary"> online json viewer</strong> with 
                    a <strong className="text-primary">json tree view</strong> allows you 
                    to navigate hierarchical structures effortlessly. Collapse nodes, 
                    expand arrays, and use deep search to find specific keys in 
                    multi-megabyte files. It&apos;s the fastest <strong className="text-primary">online json tree view</strong> for 
                    modern engineering workflows.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">
                    100% Private Offline JSON Formatter
                  </h3>
                  <p>
                    Security is paramount. Most <strong className="text-primary">free online json formatter</strong> tools 
                    upload your data to a server. JSONlix is different. It is an 
                    <strong className="text-primary"> offline json formatter</strong> that 
                    processes everything on your device. Whether you need to 
                    <strong className="text-primary"> minify json</strong> for production or 
                    <strong className="text-primary"> beautify json online</strong> for debugging, 
                    your data remains private and secure.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">
                    Key Features for Developers:
                  </h3>
                  <ul className="list-disc space-y-2 pl-6">
                    <li><strong className="text-primary">Beautify JSON Online:</strong> Instant indentation and highlighting.</li>
                    <li><strong className="text-primary">Minify JSON:</strong> Compress data for API performance.</li>
                    <li><strong className="text-primary">Validate JSON:</strong> Real-time syntax checking and linting.</li>
                    <li><strong className="text-primary">Repair JSON:</strong> Automatically fix common structural errors.</li>
                    <li><strong className="text-primary">JSON Tree View:</strong> Interactive hierarchical navigation.</li>
                  </ul>

                  <p>
                    Experience the most powerful <strong className="text-primary">json fromatter online</strong>. 
                    Streamline your development, ensure data validity, and maintain 
                    absolute privacy with JSONlix—the ultimate tool to 
                    <strong className="text-primary"> format json</strong> effortlessly.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

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
      </main>
    </div>
  )
}

function BentoCard({
  icon,
  title,
  description,
  className,
  index,
}: {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-muted/5 p-8 transition-all hover:border-primary/50 hover:bg-muted/10",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 mb-6 inline-flex rounded-2xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
        {icon}
      </div>
      <h3 className="relative z-10 mb-3 text-2xl font-black tracking-tight">
        {title}
      </h3>
      <p className="relative z-10 text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {description}
      </p>
    </motion.div>
  )
}

function StepItem({
  number,
  title,
  description,
  icon,
  delay,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group relative z-10 flex flex-col items-center text-center"
    >
      <div className="relative mb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-background text-primary shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:shadow-primary/20">
          {icon}
        </div>
        <div className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-black text-black shadow-lg">
          {number}
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-black tracking-tight">{title}</h3>
      <p className="max-w-[280px] leading-relaxed font-medium text-muted-foreground">
        {description}
      </p>
    </motion.div>
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

function FAQItem({ question, answer }: { question: string; answer: string }) {
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
            backgroundColor: isOpen
              ? "rgba(59, 130, 246, 1)"
              : "rgba(0, 0, 0, 0)",
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
