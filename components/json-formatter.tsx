"use client"

import * as React from "react"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { 
  Copy, 
  Download, 
  Eraser, 
  Minimize2, 
  RefreshCw,
  Info
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

export function JsonFormatter() {
  const { resolvedTheme } = useTheme()
  const [input, setInput] = React.useState<string>('{\n  "message": "Paste your JSON here",\n  "status": "success"\n}')
  const [indentSize, setIndentSize] = React.useState<string>("2")

  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "light"

  const { output, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", error: null }

    try {
      const parsed = JSON.parse(input)
      let formatted = ""
      
      if (indentSize === "minify") {
        formatted = JSON.stringify(parsed)
      } else {
        const space = indentSize === "tab" ? "\t" : parseInt(indentSize)
        formatted = JSON.stringify(parsed, null, space)
      }
      
      return { output: formatted, error: null }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { output: "", error: msg }
    }
  }, [input, indentSize])

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      toast.success("Copied to clipboard")
    } catch {
      toast.error("Failed to copy")
    }
  }

  const handleClear = () => {
    setInput("")
    setIndentSize("2")
    toast.info("Cleared")
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

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
        <div className="flex items-center gap-2">
          <Select value={indentSize} onValueChange={setIndentSize}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="Indentation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Spaces</SelectItem>
              <SelectItem value="4">4 Spaces</SelectItem>
              <SelectItem value="tab">Tabs</SelectItem>
              <SelectItem value="minify">Minified</SelectItem>
            </SelectContent>
          </Select>
          
          <Separator orientation="vertical" className="h-6 mx-1" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIndentSize(indentSize === "minify" ? "2" : indentSize)} 
                className="h-8 w-8 text-primary"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Format JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIndentSize("minify")} 
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Minify JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClear} className="h-8 w-8 text-destructive">
                <Eraser className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Input</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          {error && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-destructive mr-4 cursor-help">
                  <Info className="h-3 w-3" />
                  <span>Invalid JSON</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] bg-destructive text-destructive-foreground">
                {error}
              </TooltipContent>
            </Tooltip>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy} 
            disabled={!output}
            className="h-8 gap-1.5"
          >
            <Copy className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Copy</span>
          </Button>

          <Button 
            variant="default" 
            size="sm" 
            onClick={handleDownload} 
            disabled={!output}
            className="h-8 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      {/* Editors */}
      <div className="flex-1 overflow-hidden min-h-0">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="h-full flex flex-col">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between">
                <span>Input</span>
                <span className="font-normal opacity-70">Paste your raw JSON</span>
              </div>
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={editorTheme}
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
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={20}>
            <div className="h-full flex flex-col bg-muted/5">
               <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between">
                <span>Output</span>
                <span className="font-normal opacity-70">Formatted result</span>
              </div>
              <Editor
                height="100%"
                defaultLanguage="json"
                theme={editorTheme}
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
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      {/* Footer Info */}
      <div className="p-1 px-3 bg-muted/20 border-t text-[10px] text-muted-foreground flex justify-between">
        <div className="flex items-center gap-3">
          <span>Characters: {input.length}</span>
          <span>Lines: {input.split('\n').length}</span>
        </div>
        <div>Monaco Editor Engine</div>
      </div>
    </div>
  )
}
