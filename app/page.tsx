import { Metadata } from "next"
import Link from "next/link"
import { 
  FileJson, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Code2,
  ListTree,
  MousePointerClick
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "KodaJSON | Professional Online JSON Formatter & Validator",
  description: "The ultimate privacy-first JSON experience. Smart repair, recursive search, and instant formatting for professional developers.",
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">KodaJSON</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/format" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Launch App
          </Link>
          <ThemeToggle />
          <Button asChild className="hidden sm:flex font-semibold shadow-lg shadow-primary/20">
            <Link href="/format">Get Started — Free</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden border-b bg-muted/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-20 dark:opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px] mix-blend-multiply" />
          </div>

          <div className="container mx-auto px-6 relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-3 w-3" />
              <span>NEW: SMART REPAIR 2.0</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 leading-[1.1]">
              The Ultimate Online <span className="text-primary italic">JSON</span> Experience.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Professional-grade formatting, smart syntax auto-fix, and recursive tree search. All processed locally in your browser for maximum privacy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base font-bold shadow-xl shadow-primary/20 w-full sm:w-auto">
                <Link href="/format">
                  Format JSON Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold w-full sm:w-auto">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>

            {/* Product Teaser */}
            <div className="mt-20 max-w-5xl mx-auto rounded-2xl border bg-card/50 backdrop-blur shadow-2xl p-2 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="aspect-[16/9] bg-muted/30 rounded-xl border border-dashed flex flex-col items-center justify-center gap-4">
                  <FileJson className="h-12 w-12 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-sm font-medium">Ready for your dirtiest data.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Built for modern developer workflows.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">No more "Invalid JSON" errors. KodaJSON is engineered to handle real-world, messy data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="h-6 w-6 text-primary" />}
              title="Smart Repair"
              description="Automatically fixes unquoted keys, trailing commas, single quotes, and JS comments. It's JSON magic."
            />
            <FeatureCard 
              icon={<Search className="h-6 w-6 text-primary" />}
              title="Recursive Search"
              description="Deep search through thousands of lines of JSON. Instantly find keys or values in a clean tree view."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="100% Private"
              description="Your data never leaves your machine. All processing is done locally via Web Workers for zero-latency security."
            />
            <FeatureCard 
              icon={<Code2 className="h-6 w-6 text-primary" />}
              title="Monaco Powered"
              description="Uses the same engine that powers VS Code. Enjoy industry-standard syntax highlighting and indentation."
            />
            <FeatureCard 
              icon={<ListTree className="h-6 w-6 text-primary" />}
              title="Advanced Tree View"
              description="Switch between raw code and a structured tree viewer. Perfect for exploring complex nested structures."
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Persistent History"
              description="Never lose your work. Your input is automatically saved to local storage so you can pick up where you left off."
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Stop struggling with broken JSON.</h2>
            <Button asChild variant="secondary" size="lg" className="h-14 px-10 text-base font-bold shadow-2xl">
              <Link href="/format">Start Formatting — It's Free</Link>
            </Button>
            <p className="mt-6 text-primary-foreground/60 text-sm font-medium">No account required • No data tracking • Open Source</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tight">KodaJSON</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="https://github.com" className="hover:text-primary transition-colors">GitHub</Link>
          </div>
          
          <p className="text-xs text-muted-foreground/60 font-medium">
            © 2026 KodaJSON. Engineered for the professional web.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="bg-muted p-3 rounded-xl w-fit mb-6 group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </p>
    </div>
  )
}
