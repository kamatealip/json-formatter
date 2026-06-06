"use client"

import * as React from "react"
import { Editor, loader, type Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"
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
  ShieldCheck,
  Search,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { getLocation, parseTree, findNodeAtLocation } from "jsonc-parser"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JsonTreeView } from "@/components/json-tree-view"
import { HistoryPanel } from "@/components/history-panel"
import { cn } from "@/lib/utils"
import { saveEditorState, loadEditorState, addToHistory } from "@/lib/db"

// Configure Monaco loader to ensure themes are ready
loader.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs" },
})

type CopyFormat = "json" | "python"
type CopyIndent = "2" | "4" | "tab"

interface CopyConfig {
  format: CopyFormat
  indent: CopyIndent
  minify: boolean
}

const DEFAULT_JSON = `{
  "message": "Paste your JSON here or drop a file to begin",
  "status": "ready",
  "features": [
    "Smart Repair",
    "Tree Viewer",
    "Minification",
    "Local Persistence"
  ]
}`

export function JsonFormatter() {
  const { resolvedTheme } = useTheme()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [input, setInput] = React.useState<string>(DEFAULT_JSON)
  const [indentSize, setIndentSize] = React.useState<string>("2")
  const [isDbLoaded, setIsDbLoaded] = React.useState(false)
  const editorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = React.useRef<Monaco | null>(null)

  // Output Editor States
  const [editorSearchQuery, setEditorSearchQuery] = React.useState("")
  const [editorActivePath, setEditorActivePath] = React.useState<(string | number)[]>([])
  const [matchCount, setMatchCount] = React.useState(0)
  const outputEditorRef = React.useRef<editor.IStandaloneCodeEditor | null>(null)
  const decorationsRef = React.useRef<editor.IEditorDecorationsCollection | null>(null)

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
  const [mobileView, setMobileView] = React.useState<"input" | "output">(
    "input"
  )

  // Modal State
  const [copyConfig] = React.useState<CopyConfig>({
    format: "json",
    indent: "2",
    minify: false,
  })

  const editorTheme =
    resolvedTheme === "dark" ? "jsonlix-dark" : "jsonlix-light"

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("jsonlix-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "string", foreground: "4ade80" }, // Green 400
        { token: "number", foreground: "60a5fa" }, // Blue 400
        { token: "keyword", foreground: "fb923c" }, // Orange 400
        { token: "comment", foreground: "6b7280" },
        { token: "operator", foreground: "9ca3af" },
        { token: "string.key.json", foreground: "e5e7eb" }, // Key
        { token: "string.value.json", foreground: "4ade80" }, // Value
      ],
      colors: {
        "editor.background": "#000000",
        "editor.foreground": "#e5e7eb",
        "editor.lineHighlightBackground": "#111111",
        "editorCursor.foreground": "#3b82f6",
        "editorIndentGuide.background": "#21262d",
        "editor.selectionBackground": "#1f6feb44",
      },
    })

    monaco.editor.defineTheme("jsonlix-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "string", foreground: "16a34a" }, // Green 600
        { token: "number", foreground: "2563eb" }, // Blue 600
        { token: "keyword", foreground: "ea580c" }, // Orange 600
        { token: "comment", foreground: "6b7280" },
        { token: "operator", foreground: "4b5563" },
        { token: "string.key.json", foreground: "1f2937" }, // Key
        { token: "string.value.json", foreground: "16a34a" }, // Value
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#1f2937",
        "editor.lineHighlightBackground": "#f3f4f6",
        "editorCursor.foreground": "#2563eb",
        "editorIndentGuide.background": "#e5e7eb",
        "editor.selectionBackground": "#bfdbfe77",
      },
    })
  }

  const [, startTransition] = React.useTransition()
  const deferredInput = React.useDeferredValue(input)

  const [processedResult, setProcessedResult] = React.useState<{
    output: string
    parsed: unknown
    error: string | null
  }>({ output: "", parsed: null, error: null })

  const updateMarkers = React.useCallback((errorMsg: string | null) => {
    if (!monacoRef.current || !editorRef.current) return
    const monaco = monacoRef.current
    const editor = editorRef.current
    const model = editor.getModel()
    if (!model) return

    if (!errorMsg) {
      monaco.editor.setModelMarkers(model, "json", [])
      return
    }

    // Try to extract position from error message
    const posMatch = errorMsg.match(/at position (\d+)/)
    const lineColMatch = errorMsg.match(/at line (\d+) column (\d+)/)

    const markers: editor.IMarkerData[] = []
    if (posMatch) {
      const offset = parseInt(posMatch[1])
      const pos = model.getPositionAt(offset)
      markers.push({
        startLineNumber: pos.lineNumber,
        startColumn: Math.max(1, pos.column - 1),
        endLineNumber: pos.lineNumber,
        endColumn: pos.column + 1,
        message: errorMsg,
        severity: monaco.MarkerSeverity.Error,
      })
    } else if (lineColMatch) {
      const line = parseInt(lineColMatch[1])
      const col = parseInt(lineColMatch[2])
      markers.push({
        startLineNumber: line,
        startColumn: col,
        endLineNumber: line,
        endColumn: col + 1,
        message: errorMsg,
        severity: monaco.MarkerSeverity.Error,
      })
    } else {
      markers.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: Math.max(1, model.getLineMaxColumn(1)),
        message: errorMsg,
        severity: monaco.MarkerSeverity.Error,
      })
    }

    monaco.editor.setModelMarkers(model, "json", markers)
  }, [])

  React.useEffect(() => {
    startTransition(() => {
      if (!deferredInput.trim()) {
        setProcessedResult({ output: "", parsed: null, error: null })
        updateMarkers(null)
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

        setProcessedResult({
          output: formatted,
          parsed: parsedData,
          error: null,
        })
        updateMarkers(null)
        
        // Add to history if it's a valid change and not empty
        if (deferredInput.trim().length > 10) {
          addToHistory(deferredInput)
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        setProcessedResult({ output: "", parsed: null, error: msg })
        updateMarkers(msg)
      }
    })
  }, [deferredInput, indentSize, updateMarkers])

  const { output, parsed, error } = processedResult

  React.useEffect(() => {
    if (!outputEditorRef.current || !editorSearchQuery) {
      decorationsRef.current?.clear()
      setMatchCount(0)
      return
    }

    const editor = outputEditorRef.current
    const model = editor.getModel()
    if (!model) return

    const matches = model.findMatches(editorSearchQuery, false, false, false, null, true)
    setMatchCount(matches.length)

    const newDecorations = matches.map((match) => ({
      range: match.range,
      options: {
        inlineClassName: "bg-yellow-500/30",
        isWholeLine: false,
      },
    }))

    if (!decorationsRef.current) {
      decorationsRef.current = editor.createDecorationsCollection(newDecorations)
    } else {
      decorationsRef.current.set(newDecorations)
    }
  }, [editorSearchQuery, output])

  const generateCopyText = (data: unknown, config: CopyConfig): string => {
    let result = ""
    if (config.minify) {
      result = JSON.stringify(data)
    } else {
      const space = config.indent === "tab" ? "\t" : parseInt(config.indent)
      result = JSON.stringify(data, null, space)
    }

    if (config.format === "python") {
      result = result
        .replace(/:\s*true\b/g, ": True")
        .replace(/:\s*false\b/g, ": False")
        .replace(/:\s*null\b/g, ": None")
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
    setEditorSearchQuery("")
    setEditorActivePath([])
    toast.info("Cleared")
  }

  const handleReset = () => {
    setInput(DEFAULT_JSON)
    setIndentSize("2")
    setEditorSearchQuery("")
    setEditorActivePath([])
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
      let fixed = input
        .replace(/\/\/.*$/gm, "") // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
        .trim()

      // 1. Python-style booleans/null
      fixed = fixed
        .replace(/\bTrue\b/g, "true")
        .replace(/\bFalse\b/g, "false")
        .replace(/\bNone\b/g, "null")

      // 2. Fix single quotes to double quotes
      fixed = fixed.replace(/'/g, '"')

      // 3. Quote unquoted keys (more aggressive)
      // Standard key: val
      fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":')
      // Key after nested structure or value
      fixed = fixed.replace(/([}\]" \d])\s+([a-zA-Z0-9_$]+)\s*:/g, '$1 "$2":')
      // Ensure all keys are quoted if they are word-like and followed by a colon
      fixed = fixed.replace(/(^|[^a-zA-Z0-9_$"])([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":')

      // 4. Add missing colon between key and value
      // Matches "key" [whitespace] value-start
      fixed = fixed.replace(/("([^"]+)"\s*)(?="|\d|true|false|null|\[|{)/g, (match) => {
        return match.includes(":") ? match : match + ": "
      })

      // 5. Add missing commas (The most critical part for nested values)
      // We look for boundaries where a comma SHOULD be:
      // - Between a value and a new key
      // - Between two values in an array
      // - Between nested objects/arrays
      
      const valueEnd = '(?:"[^"]*"|\\d+|true|false|null|[}\\]])'
      const valueStart = '(?:"[^"]*"|\\d+|true|false|null|[{\\[])'
      
      // Pattern 1: End of value followed by start of another value/key
      // We use a lookahead to ensure we don't insert comma before a colon (key's own colon)
      const commaRegex = new RegExp(`(${valueEnd})\\s+(${valueStart})`, "g")

      for (let i = 0; i < 3; i++) {
        fixed = fixed.replace(commaRegex, (match, p1, p2) => {
          // If the match already contains a comma or colon, or if p2 is a key followed by a colon,
          // we need to be careful. But generally, if we have ValueEnd [space] ValueStart, a comma is missing.
          // Exception: "key": value -> no comma between "key" and ":"
          // The regex already matches the space.
          return `${p1}, ${p2}`
        })
      }

      // 6. Special handling for boundaries around brackets/braces
      // e.g., [1 2] -> [1, 2]
      // e.g., {"a":1 "b":2} -> {"a":1, "b":2}
      // e.g., [1] [2] -> [1], [2]
      fixed = fixed.replace(/([}\]])\s+([{\[])/g, "$1, $2")
      fixed = fixed.replace(/([}\]])\s+(")/g, "$1, $2")
      fixed = fixed.replace(/("|\d|true|false|null)\s+(")/g, "$1, $2")

      // 7. Clean up potential double commas or commas after opening braces
      fixed = fixed.replace(/,\s*,/g, ",")
      fixed = fixed.replace(/([{[,])\s*,/g, "$1")

      // 8. Trailing commas
      fixed = fixed.replace(/,\s*([}\]])/g, "$1")

      const parsedData = JSON.parse(fixed)
      setInput(JSON.stringify(parsedData, null, 2))
      toast.success("JSON Automatically Repaired")
    } catch (err) {
      console.error("Smart Fix failed:", err)
      const msg = err instanceof Error ? err.message : String(err)
      updateMarkers(msg)
      toast.error("Could not repair JSON automatically. Check error markers.")
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (
      file &&
      (file.type === "application/json" || file.name.endsWith(".json"))
    ) {
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
    setMobileView("output")
    toast.success("JSON Formatted")
  }

  const InputPanel = (
    <div
      className="flex h-full flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="flex h-9 shrink-0 items-center justify-between border-b bg-muted/10 px-3 py-1.5 text-[10px] font-bold text-muted-foreground">
        <div className="flex items-center gap-2 text-primary/70">
          <span>Input</span>
          <span className="font-normal text-primary">Paste or drop JSON</span>
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
                aria-label="Upload JSON file"
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
                aria-label="Reset to default"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset to Default</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="relative min-h-0 flex-1">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme={editorTheme}
          beforeMount={handleEditorWillMount}
          onMount={(editor, monaco) => {
            editorRef.current = editor
            monacoRef.current = monaco
          }}
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
        <div className="absolute right-6 bottom-6 lg:hidden">
          <Button
            onClick={handleMobileFormat}
            className="z-10 h-12 gap-2 rounded-full pr-4 pl-6 font-semibold shadow-lg"
          >
            Format & View
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const OutputPanel = (
    <div className="relative flex h-full flex-col bg-muted/5">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex h-full flex-col"
      >
        <div className="flex h-9 shrink-0 items-center justify-between border-b bg-muted/10 px-3 text-[10px] font-bold text-muted-foreground uppercase">
          <div className="flex items-center gap-2">
            <span>Output</span>
          </div>
          <TabsList className="h-7 border bg-muted/50 p-0.5">
            <TabsTrigger value="code" className="h-6 gap-1.5 px-2 text-[10px]">
              <Code2 className="h-3 w-3" />
              Code
            </TabsTrigger>
            <TabsTrigger
              value="viewer"
              className="h-6 gap-1.5 px-2 text-[10px]"
            >
              <ListTree className="h-3 w-3" />
              Viewer
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="relative min-h-0 flex-1">
          <TabsContent
            value="code"
            className="m-0 h-full flex flex-col p-0 data-[state=inactive]:hidden"
          >
            {/* Search Header */}
            <div className="px-4 py-2 border-b bg-muted/20 flex items-center gap-2 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search in output..."
                  value={editorSearchQuery}
                  onChange={(e) => setEditorSearchQuery(e.target.value)}
                  className="w-full bg-background border rounded-md pl-8 pr-16 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary border-border/50"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {editorSearchQuery && (
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1 rounded">
                      {matchCount}
                    </span>
                  )}
                </div>
                {editorSearchQuery && (
                  <button
                    onClick={() => setEditorSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Breadcrumbs bar */}
            <div className="px-4 py-1.5 border-b bg-muted/5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 min-h-8">
              <button
                onClick={() => {
                  if (outputEditorRef.current) {
                    outputEditorRef.current.setPosition({ lineNumber: 1, column: 1 })
                    outputEditorRef.current.revealPosition({ lineNumber: 1, column: 1 })
                    outputEditorRef.current.focus()
                  }
                }}
                className={cn(
                  "text-[10px] font-bold transition-colors uppercase tracking-wider whitespace-nowrap",
                  editorActivePath.length === 0
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                root
              </button>
              {editorActivePath.map((segment, i) => (
                <React.Fragment key={i}>
                  <ChevronRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
                  <button
                    onClick={() => {
                      if (outputEditorRef.current) {
                        const model = outputEditorRef.current.getModel()
                        if (!model) return
                        const path = editorActivePath.slice(0, i + 1)
                        const rootNode = parseTree(model.getValue())
                        if (rootNode) {
                          const node = findNodeAtLocation(rootNode, path)
                          if (node) {
                            const pos = model.getPositionAt(node.offset)
                            outputEditorRef.current.setPosition(pos)
                            outputEditorRef.current.revealPositionInCenter(pos)
                            outputEditorRef.current.focus()
                          }
                        }
                      }
                    }}
                    className={cn(
                      "text-[10px] font-bold transition-colors whitespace-nowrap",
                      i === editorActivePath.length - 1
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {typeof segment === "number" ? `[${segment}]` : segment}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={editorTheme}
                beforeMount={handleEditorWillMount}
                onMount={(editor) => {
                  outputEditorRef.current = editor
                  editor.onDidChangeCursorPosition((e) => {
                    const model = editor.getModel()
                    if (!model) return
                    const offset = model.getOffsetAt(e.position)
                    const location = getLocation(model.getValue(), offset)
                    setEditorActivePath(location.path)
                  })
                }}
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
            </div>
          </TabsContent>
          <TabsContent
            value="viewer"
            className="m-0 h-full bg-background p-0 data-[state=inactive]:hidden"
          >
            <JsonTreeView data={parsed} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Back Button - Hidden on Large Screens */}
      <div className="absolute bottom-6 left-6 lg:hidden">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setMobileView("input")}
          className="z-10 h-12 w-12 rounded-full border bg-background/80 shadow-lg backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border bg-background shadow-sm">
      {/* Toolbar */}
      <div className="group relative">
        <div className="no-scrollbar flex shrink-0 items-center justify-between overflow-x-auto scroll-smooth border-b bg-muted/30 p-2">
          <div className="flex items-center gap-1.5 pr-10 md:gap-2">
            <Select 
              value={indentSize} 
              onValueChange={(v) => {
                setIndentSize(v)
                const label = v === "tab" ? "Tabs" : v === "minify" ? "Minified" : `${v} Spaces`
                toast.success(`Indent set to ${label}`)
              }}
            >
              <SelectTrigger 
                className="h-8 w-[100px] shrink-0 bg-background text-xs md:w-[110px]"
                aria-label="Indent size"
              >
                <SelectValue placeholder="Indent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 Spaces</SelectItem>
                <SelectItem value="4">4 Spaces</SelectItem>
                <SelectItem value="tab">Tabs</SelectItem>
                <SelectItem value="minify">Minified</SelectItem>
              </SelectContent>
            </Select>

            <Separator
              orientation="vertical"
              className="mx-0.5 h-6 shrink-0 md:mx-1"
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveTab("code")
                    setIndentSize(indentSize === "minify" ? "2" : indentSize)
                    toast.success("JSON Beautified")
                  }}
                  className={cn(
                    "h-8 shrink-0 gap-1.5 transition-colors hover:bg-primary/10 hover:text-primary",
                    activeTab === "code" && indentSize !== "minify" 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground"
                  )}
                >
                  <RefreshCw className={cn("h-4 w-4", activeTab === "code" && indentSize !== "minify" ? "text-primary" : "text-foreground")} />
                  <span className="hidden text-xs font-medium sm:inline lg:inline">
                    Format
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pretty print JSON</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveTab("viewer")
                    setMobileView("output")
                    toast.success("Switched to Tree View")
                  }}
                  className={cn(
                    "h-8 shrink-0 gap-1.5 transition-colors hover:bg-primary/10 hover:text-primary",
                    activeTab === "viewer" ? "bg-primary/10 text-primary" : "text-foreground"
                  )}
                >
                  <ListTree className={cn("h-4 w-4", activeTab === "viewer" ? "text-primary" : "text-foreground")} />
                  <span className="hidden text-xs font-medium sm:inline lg:inline">
                    Tree View
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Switch to Recursive Tree View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSmartFix}
                  className="h-8 shrink-0 gap-1.5 text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden text-xs font-medium sm:inline lg:inline">
                    Fix
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Auto-repair syntax errors</TooltipContent>
            </Tooltip>

            <HistoryPanel onSelect={(input) => setInput(input)} />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveTab("code")
                    setIndentSize("minify")
                    toast.success("JSON Minified")
                  }}
                  className={cn(
                    "h-8 shrink-0 gap-1.5 transition-colors hover:bg-primary/10 hover:text-primary",
                    indentSize === "minify" && activeTab === "code" 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground"
                  )}
                >
                  <Minimize2 className={cn("h-4 w-4", indentSize === "minify" && activeTab === "code" ? "text-primary" : "text-foreground")} />
                  <span className="hidden text-xs font-medium sm:inline lg:inline">
                    Minify
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Compact JSON</TooltipContent>
            </Tooltip>

            <Separator
              orientation="vertical"
              className="mx-0.5 h-6 shrink-0 md:mx-1"
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-8 shrink-0 gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Eraser className="h-4 w-4" />
                  <span className="hidden text-xs font-medium sm:inline lg:inline">
                    Clear
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear All</TooltipContent>
            </Tooltip>
          </div>

          <div className="ml-4 flex items-center gap-1.5 md:gap-2">
            {error && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mr-1 flex shrink-0 cursor-help items-center gap-1 text-xs text-destructive md:mr-2">
                    <Info className="h-3 w-3" />
                    <span className="hidden xl:inline">Invalid JSON</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-destructive-foreground max-w-[300px] bg-destructive">
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
                  className="h-8 gap-1.5 border text-foreground shadow-sm transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden text-xs font-semibold md:inline">
                    Copy
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy JSON</TooltipContent>
            </Tooltip>

            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              disabled={!output}
              className="h-8 shrink-0 gap-1.5 px-2.5 shadow-sm md:px-3"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden font-semibold sm:inline">Download</span>
            </Button>
          </div>
        </div>

        {/* Mobile Scroll Indicator (requested > icon) */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 flex w-10 items-center justify-end bg-gradient-to-l from-background via-background/80 to-transparent pr-2 transition-opacity group-hover:opacity-0 lg:hidden">
          <ChevronRight className="h-4 w-4 animate-pulse text-primary/40" />
        </div>
      </div>

      {/* Main Layout Area - Logic-aware Responsive Design */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Desktop Layout - Uses CSS to hide on small screens but logical split for performance */}
        <div className="hidden h-full w-full lg:block">
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
        <div className="relative h-full w-full overflow-hidden lg:hidden">
          <div
            className={cn(
              "flex h-full w-[200%] transition-transform duration-500 ease-in-out",
              mobileView === "output" ? "-translate-x-1/2" : "translate-x-0"
            )}
          >
            <div className="h-full w-1/2 shrink-0">{InputPanel}</div>
            <div className="h-full w-1/2 shrink-0">{OutputPanel}</div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex shrink-0 justify-between border-t bg-muted/20 p-1 px-3 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>Chars: {input.length}</span>
          <span className="xs:inline hidden">
            Lines: {input.split("\n").length}
          </span>
          <Separator
            orientation="vertical"
            className="h-3 bg-muted-foreground/20"
          />
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
            <span>
              Persistence:{" "}
              {input.length > 1024 * 1024
                ? "Infinite DB (Active)"
                : "Secure Local DB"}
            </span>
          </div>
          {input.length > 2 * 1024 * 1024 && (
            <div className="hidden animate-pulse items-center gap-1 text-primary sm:flex">
              <Sparkles className="h-3 w-3" />
              <span>
                We&apos;re keeping your large data safe in the local database.
              </span>
            </div>
          )}
        </div>
        <div className="font-medium tracking-wider">JSONlix System</div>
      </div>
    </div>
  )
}
