"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function FAQSection() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
              JSON Knowledge Base
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-primary" />
          </div>

          <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </section>
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
