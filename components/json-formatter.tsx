"use client"

import * as React from "react"
import { Editor, loader, type Monaco } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { 
  Copy, 
  Download, 
  Eraser, 
  Minimize2, 
  RefreshCw,
  Info,
  Code2,
  ListTree,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  FileUp,
  RotateCcw,
  ShieldCheck
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { JsonTreeView } from "@/components/json-tree-view"
import { cn } from "@/lib/utils"
import { saveEditorState, loadEditorState } from "@/lib/db"

// Configure Monaco loader to ensure themes are ready
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

type CopyFormat = 'json' | 'python'
type CopyIndent = '2' | '4' | 'tab'

interface CopyConfig {
  format: CopyFormat
  indent: CopyIndent
  minify: boolean
}

const DEFAULT_JSON = `{
  "message": "Welcome to JSONlix",
  "status": "online",
  "tagline": "The Ultimate Online JSON Experience",
  "capabilities": {
    "repair": "Smart Syntax Auto-Fix",
    "search": "Recursive Tree Filtering",
    "storage": "Infinite Local Persistence",
    "ux": "Drag & Drop Support"
  },
  "features": [
    "Syntax Highlighting",
    "Instant Minifying",
    "Pro-Grade Viewer",
    "Python Dict Export"
  ],
  "stats": {
    "security": "100% Client-Side",
    "speed": "Instant",
    "version": "2.0.0"
  }
}`

export function JsonFormatter() {
  const { resolvedTheme } = useTheme()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [input, setInput] = React.useState<string>(DEFAULT_JSON)
  const [indentSize, setIndentSize] = React.useState<string>("2")
  const [isDbLoaded, setIsDbLoaded] = React.useState(false)

  // Load from IndexedDB on mount
  React.useEffect(() => {
    const init = async () => {
      const saved = await loadEditorState()
      if (saved) {
        setInput(saved.input)
        setIndentSize(saved.indentSize)
      }
      setIsDbLoaded(true)
    }
    init()
  }, [])

  // Save to IndexedDB on change
  React.useEffect(() => {
    if (isDbLoaded) {
      saveEditorState(input, indentSize)
    }
  }, [input, indentSize, isDbLoaded])

  const [activeTab, setActiveTab] = React.useState<string>("code")

  // View State for Mobile/Tablet
  const [mobileView, setMobileView] = React.useState<'input' | 'output'>('input')
  
  // Modal State
  const [copyConfig] = React.useState<CopyConfig>({
    format: 'json',
    indent: '2',
    minify: false
  })

  const editorTheme = resolvedTheme === "dark" ? "jsonlix-dark" : "jsonlix-light"

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('jsonlix-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'string', foreground: '4ade80' },
        { token: 'number', foreground: '60a5fa' },
        { token: 'keyword', foreground: 'fb923c' },
        { token: 'type', foreground: 'fb923c' },
        { token: 'comment', foreground: '6b7280' },
        { token: 'operator', foreground: '9ca3af' },
        { token: 'key', foreground: 'e5e7eb' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#e5e7eb',
        'editor.lineHighlightBackground': '#161b22',
        'editorCursor.foreground': '#3b82f6',
        'editorIndentGuide.background': '#21262d',
        'editor.selectionBackground': '#1f6feb44',
      }
    });

    monaco.editor.defineTheme('jsonlix-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'string', foreground: '16a34a' },
        { token: 'number', foreground: '2563eb' },
        { token: 'keyword', foreground: 'ea580c' },
        { token: 'type', foreground: 'ea580c' },
        { token: 'comment', foreground: '6b7280' },
        { token: 'operator', foreground: '4b5563' },
        { token: 'key', foreground: '1f2937' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#1f2937',
        'editor.lineHighlightBackground': '#f3f4f6',
        'editorCursor.foreground': '#2563eb',
        'editorIndentGuide.background': '#e5e7eb',
        'editor.selectionBackground': '#bfdbfe77',
      }
    });
  }

  const [, startTransition] = React.useTransition()
  const deferredInput = React.useDeferredValue(input)

  const [processedResult, setProcessedResult] = React.useState<{
    output: string
    parsed: unknown
    error: string | null
  }>({ output: "", parsed: null, error: null })

  React.useEffect(() => {
    startTransition(() => {
      if (!deferredInput.trim()) {
        setProcessedResult({ output: "", parsed: null, error: null })
        return
      }

      try {
        const parsedData = JSON.parse(deferredInput)
        let formatted = ""

        if (indentSize === "minify") {
          formatted = JSON.stringify(parsedData)
        } else {
          const space = indentSize === "tab" ? "\t" : parseInt(indentSize)
          formatted = JSON.stringify(parsedData, null, space)
        }

        setProcessedResult({ output: formatted, parsed: parsedData, error: null })
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        setProcessedResult({ output: "", parsed: null, error: msg })
      }
    })
  }, [deferredInput, indentSize])

  const { output, parsed, error } = processedResult

  const generateCopyText = (data: unknown, config: CopyConfig): string => {
    let result = ""
    if (config.minify) {
      result = JSON.stringify(data)
    } else {
      const space = config.indent === "tab" ? "\t" : parseInt(config.indent)
      result = JSON.stringify(data, null, space)
    }

    if (config.format === 'python') {
      result = result
        .replace(/:\s*true\b/g, ': True')
        .replace(/:\s*false\b/g, ': False')
        .replace(/:\s*null\b/g, ': None')
    }
    return result
  }

  const handleCopyAction = async () => {
    if (!parsed) return
    try {
      const textToCopy = generateCopyText(parsed, copyConfig)
      await navigator.clipboard.writeText(textToCopy)
      toast.success(`Copied as ${copyConfig.format.toUpperCase()}`)
    } catch {
      toast.error("Failed to copy")
    }
  }

  const handleClear = () => {
    setInput("")
    setIndentSize("2")
    toast.info("Cleared")
  }

  const handleReset = () => {
    setInput(DEFAULT_JSON)
    setIndentSize("2")
    toast.success("Reset to Default")
  }

  const handleDownload = () => {
    if (!output) return
    const blob = new Blob([output], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "formatted.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Downloading JSON")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setInput(content)
      toast.success(`Loaded ${file.name}`)
    }
    reader.readAsText(file)
  }

  const handleSmartFix = () => {
    try {
      const fixed = input
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/'/g, '"') // Single to double quotes (heuristic)
        .replace(/([{,]\s*)([a-zA-Z0-9_$]+)(\s*:)/g, '$1"$2"$3') // Unquoted keys
        .replace(/,\s*([}\]])/g, '$1') // Trailing commas
        .trim()
      
      const parsedData = JSON.parse(fixed)
      setInput(JSON.stringify(parsedData, null, 2))
      toast.success("JSON Automatically Repaired")
    } catch {
      toast.error("Could not repair JSON automatically")
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && (file.type === "application/json" || file.name.endsWith(".json"))) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setInput(event.target?.result as string)
        toast.success(`Dropped ${file.name}`)
      }
      reader.readAsText(file)
    } else {
      toast.error("Please drop a valid JSON file")
    }
  }

  const handleMobileFormat = () => {
    if (error) {
      toast.error("Invalid JSON")
      return
    }
    setMobileView('output')
    toast.success("JSON Formatted")
  }

  const InputPanel = (
    <div 
      className="h-full flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between h-9 shrink-0">
        <div className="flex items-center gap-2 text-primary/70">
          <span>Input</span>
          <span className="font-normal opacity-70">Paste or drop JSON</span>
        </div>
        <div className="flex items-center gap-1">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".json,application/json"
            onChange={handleFileUpload}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload JSON File</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                onClick={handleReset}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset to Default</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme={editorTheme}
          beforeMount={handleEditorWillMount}
          value={input}
          onChange={(v) => setInput(v || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 10 },
            lineNumbers: "on",
            wordWrap: "on",
          }}
        />
        {/* Floating Action Button - Hidden on Large Screens */}
        <div className="absolute bottom-6 right-6 lg:hidden">
          <Button 
          onClick={handleMobileFormat}
          className="h-12 rounded-full shadow-lg gap-2 pl-6 pr-4 z-10 font-semibold"
          >
            Format & View
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const OutputPanel = (
    <div className="h-full flex flex-col bg-muted/5 relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="px-3 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between h-9 shrink-0">
          <div className="flex items-center gap-2">
            <span>Output</span>
          </div>
          <TabsList className="h-7 bg-muted/50 p-0.5 border">
            <TabsTrigger value="code" className="h-6 text-[10px] px-2 gap-1.5">
              <Code2 className="h-3 w-3" />
              Code
            </TabsTrigger>
            <TabsTrigger value="viewer" className="h-6 text-[10px] px-2 gap-1.5">
              <ListTree className="h-3 w-3" />
              Viewer
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 min-h-0 relative">
          <TabsContent value="code" className="h-full m-0 p-0 data-[state=inactive]:hidden">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme={editorTheme}
              beforeMount={handleEditorWillMount}
              value={output}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 10 },
                lineNumbers: "on",
                wordWrap: "on",
                domReadOnly: true,
              }}
            />
          </TabsContent>
          <TabsContent value="viewer" className="h-full m-0 p-0 data-[state=inactive]:hidden bg-background">
            <JsonTreeView data={parsed} />
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Back Button - Hidden on Large Screens */}
      <div className="absolute bottom-6 left-6 lg:hidden">
        <Button 
          variant="secondary"
          size="icon"
          onClick={() => setMobileView('input')}
          className="h-12 w-12 rounded-full shadow-lg z-10 bg-background/80 backdrop-blur-sm border"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="relative group">
        <div className="flex items-center justify-between p-2 bg-muted/30 border-b shrink-0 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 md:gap-2 pr-10">
            <Select value={indentSize} onValueChange={setIndentSize}>
              <SelectTrigger className="w-[100px] md:w-[110px] h-8 text-xs shrink-0 bg-background">
                <SelectValue placeholder="Indent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Spaces</SelectItem>
                <SelectItem value="4">4 Spaces</SelectItem>
                <SelectItem value="tab">Tabs</SelectItem>
                <SelectItem value="minify">Minified</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-6 mx-0.5 md:mx-1 shrink-0" />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIndentSize(indentSize === "minify" ? "2" : indentSize)} 
                  className={cn(
                    "h-8 gap-1.5 text-primary hover:text-primary hover:bg-primary/10 shrink-0",
                    indentSize !== "minify" && "bg-primary/5"
                  )}
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline lg:inline">Format</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pretty print JSON</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSmartFix} 
                  className="h-8 gap-1.5 text-primary hover:text-primary hover:bg-primary/10 shrink-0"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline lg:inline">Fix</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Auto-repair syntax errors</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIndentSize("minify")} 
                  className={cn(
                    "h-8 gap-1.5 shrink-0 hover:bg-primary/10 hover:text-primary",
                    indentSize === "minify" && "bg-primary/5 text-primary"
                  )}
                >
                  <Minimize2 className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline lg:inline">Minify</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Compact JSON</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-6 mx-0.5 md:mx-1 shrink-0" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleClear} 
                  className="h-8 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                >
                  <Eraser className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline lg:inline">Clear</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear All</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 ml-4">
            {error && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-destructive mr-1 md:mr-2 cursor-help shrink-0">
                    <Info className="h-3 w-3" />
                    <span className="hidden xl:inline">Invalid JSON</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] bg-destructive text-destructive-foreground">
                  {error}
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCopyAction} 
                  disabled={!parsed}
                  className="h-8 gap-1.5 text-primary hover:bg-primary/5 transition-colors border shadow-sm"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold hidden md:inline">Copy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy JSON</TooltipContent>
            </Tooltip>

            <Button 
              variant="default" 
              size="sm" 
              onClick={handleDownload} 
              disabled={!output}
              className="h-8 gap-1.5 shrink-0 px-2.5 md:px-3 shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-semibold">Download</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile Scroll Indicator (requested > icon) */}
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background via-background/80 to-transparent flex items-center justify-end pr-2 pointer-events-none lg:hidden group-hover:opacity-0 transition-opacity">
          <ChevronRight className="h-4 w-4 text-primary/40 animate-pulse" />
        </div>
      </div>

      {/* Main Layout Area - Logic-aware Responsive Design */}
      <div className="flex-1 overflow-hidden min-h-0 relative">
        {/* Desktop Layout - Uses CSS to hide on small screens but logical split for performance */}
        <div className="hidden lg:block h-full w-full">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={50} minSize={20}>
              {InputPanel}
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={50} minSize={20}>
              {OutputPanel}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile/Tablet Layout - Uses CSS to hide on large screens */}
        <div className="lg:hidden h-full w-full overflow-hidden relative">
           <div 
            className={cn(
              "h-full w-[200%] flex transition-transform duration-500 ease-in-out",
              mobileView === 'output' ? "-translate-x-1/2" : "translate-x-0"
            )}
           >
              <div className="w-1/2 h-full shrink-0">
                {InputPanel}
              </div>
              <div className="w-1/2 h-full shrink-0">
                {OutputPanel}
              </div>
           </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="p-1 px-3 bg-muted/20 border-t text-[10px] text-muted-foreground flex justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span>Chars: {input.length}</span>
          <span className="hidden xs:inline">Lines: {input.split('\n').length}</span>
          <Separator orientation="vertical" className="h-3 bg-muted-foreground/20" />
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
            <span>Persistence: {input.length > 1024 * 1024 ? "Infinite DB (Active)" : "Secure Local DB"}</span>
          </div>
          {input.length > 2 * 1024 * 1024 && (
            <div className="hidden sm:flex items-center gap-1 text-primary animate-pulse">
              <Sparkles className="h-3 w-3" />
              <span>We&apos;re keeping your large data safe in the local database.</span>
            </div>
          )}
        </div>
        <div className="font-medium tracking-wider">JSONlix System</div>
      </div>
    </div>
  )
}
