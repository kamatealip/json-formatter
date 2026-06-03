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
  Settings2,
  ArrowLeft,
  ChevronRight
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { JsonTreeView } from "@/components/json-tree-view"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

// Configure Monaco loader to ensure themes are ready
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' } });

type CopyFormat = 'json' | 'python'
type CopyIndent = '2' | '4' | 'tab'

interface CopyConfig {
  format: CopyFormat
  indent: CopyIndent
  minify: boolean
}

export function JsonFormatter() {
  const { resolvedTheme } = useTheme()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  const [input, setInput] = React.useState<string>('{\n  "message": "Paste your JSON here",\n  "status": "success",\n  "features": ["Formatting", "Minifying", "Tree View"],\n  "author": {\n    "name": "Gemini CLI",\n    "role": "AI Engineer"\n  }\n}')
  const [indentSize, setIndentSize] = React.useState<string>("2")
  const [activeTab, setActiveTab] = React.useState<string>("code")
  
  // Mobile View State
  const [mobileView, setMobileView] = React.useState<'input' | 'output'>('input')
  
  // Modal State
  const [isCopyModalOpen, setIsCopyModalOpen] = React.useState(false)
  const [copyConfig, setCopyConfig] = React.useState<CopyConfig>({
    format: 'json',
    indent: '2',
    minify: false
  })

  const editorTheme = resolvedTheme === "dark" ? "github-dark" : "github-light"

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'keyword', foreground: 'ff7b72' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'type', foreground: 'ffa657' },
        { token: 'comment', foreground: '8b949e' },
        { token: 'operator', foreground: '79c0ff' },
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#c9d1d9',
        'editor.lineHighlightBackground': '#161b22',
        'editorCursor.foreground': '#58a6ff',
        'editorIndentGuide.background': '#21262d',
        'editor.selectionBackground': '#1f6feb44',
      }
    });

    monaco.editor.defineTheme('github-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'string', foreground: '0a3069' },
        { token: 'keyword', foreground: 'cf222e' },
        { token: 'number', foreground: '0550ae' },
        { token: 'type', foreground: '953800' },
        { token: 'comment', foreground: '57606a' },
        { token: 'operator', foreground: '0550ae' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292f',
        'editor.lineHighlightBackground': '#f6f8fa',
        'editorCursor.foreground': '#0969da',
        'editorIndentGuide.background': '#d8dee4',
        'editor.selectionBackground': '#add6ff77',
      }
    });
  }

  const { output, parsed, error } = React.useMemo(() => {
    if (!input.trim()) return { output: "", parsed: null, error: null }

    try {
      const parsedData = JSON.parse(input)
      let formatted = ""
      
      if (indentSize === "minify") {
        formatted = JSON.stringify(parsedData)
      } else {
        const space = indentSize === "tab" ? "\t" : parseInt(indentSize)
        formatted = JSON.stringify(parsedData, null, space)
      }
      
      return { output: formatted, parsed: parsedData, error: null }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      return { output: "", parsed: null, error: msg }
    }
  }, [input, indentSize])

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
      setIsCopyModalOpen(false)
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

  const handleMobileFormat = () => {
    if (error) {
      toast.error("Invalid JSON")
      return
    }
    setMobileView('output')
    toast.success("JSON Formatted")
  }

  const InputPanel = (
    <div className="h-full flex flex-col">
      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between h-9 shrink-0">
        <span>Input</span>
        <span className="font-normal opacity-70">Paste your raw JSON</span>
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
        {!isDesktop && (
           <Button 
            onClick={handleMobileFormat}
            className="absolute bottom-6 right-6 h-12 rounded-full shadow-lg gap-2 pl-6 pr-4 z-10"
           >
             Format Now
             <ChevronRight className="h-4 w-4" />
           </Button>
        )}
      </div>
    </div>
  )

  const OutputPanel = (
    <div className="h-full flex flex-col bg-muted/5 relative">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="px-3 text-[10px] uppercase font-bold text-muted-foreground bg-muted/10 border-b flex items-center justify-between h-9 shrink-0">
          <span>Output</span>
          <TabsList className="h-7 bg-muted/50 p-0.5">
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
      
      {!isDesktop && (
        <Button 
          variant="secondary"
          size="icon"
          onClick={() => setMobileView('input')}
          className="absolute bottom-6 left-6 h-12 w-12 rounded-full shadow-lg z-10 bg-background/80 backdrop-blur-sm border"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex flex-col h-full w-full bg-background border rounded-lg overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b shrink-0 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2">
          <Select value={indentSize} onValueChange={setIndentSize}>
            <SelectTrigger className="w-[130px] h-8 text-xs shrink-0">
              <SelectValue placeholder="Indentation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 Spaces</SelectItem>
              <SelectItem value="4">4 Spaces</SelectItem>
              <SelectItem value="tab">Tabs</SelectItem>
              <SelectItem value="minify">Minified</SelectItem>
            </SelectContent>
          </Select>
          
          <Separator orientation="vertical" className="h-6 mx-1 shrink-0" />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIndentSize(indentSize === "minify" ? "2" : indentSize)} 
                className="h-8 gap-1.5 text-primary hover:text-primary hover:bg-primary/10 shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Format</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pretty print JSON</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIndentSize("minify")} 
                className="h-8 gap-1.5 shrink-0"
              >
                <Minimize2 className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Minify</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Compact JSON</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1 shrink-0" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear} 
                className="h-8 gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
              >
                <Eraser className="h-4 w-4" />
                <span className="text-xs font-medium hidden sm:inline">Clear</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear input and output</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {error && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-destructive mr-2 cursor-help shrink-0">
                  <Info className="h-3 w-3" />
                  <span className="hidden xs:inline">Invalid JSON</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[300px] bg-destructive text-destructive-foreground">
                {error}
              </TooltipContent>
            </Tooltip>
          )}

          <Dialog open={isCopyModalOpen} onOpenChange={setIsCopyModalOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={!parsed}
                className="h-8 gap-1.5 shrink-0"
              >
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Copy Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Copy Settings
                </DialogTitle>
                <DialogDescription>
                  Configure how you want to copy the JSON to your clipboard.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-6 py-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Output Format</Label>
                  <RadioGroup 
                    value={copyConfig.format} 
                    onValueChange={(v: CopyFormat) => setCopyConfig({...copyConfig, format: v})}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="json" id="f-json" />
                      <Label htmlFor="f-json" className="font-normal cursor-pointer">JSON</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="python" id="f-python" />
                      <Label htmlFor="f-python" className="font-normal cursor-pointer">Python Dict</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-semibold">Minify Content</Label>
                    <p className="text-xs text-muted-foreground">Remove all whitespace and newlines.</p>
                  </div>
                  <Switch 
                    checked={copyConfig.minify}
                    onCheckedChange={(v) => setCopyConfig({...copyConfig, minify: v})}
                  />
                </div>

                {!copyConfig.minify && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Indentation</Label>
                    <RadioGroup 
                      value={copyConfig.indent} 
                      onValueChange={(v: CopyIndent) => setCopyConfig({...copyConfig, indent: v})}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="i-2" />
                        <Label htmlFor="i-2" className="font-normal cursor-pointer">2 Spaces</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4" id="i-4" />
                        <Label htmlFor="i-4" className="font-normal cursor-pointer">4 Spaces</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tab" id="i-tab" />
                        <Label htmlFor="i-tab" className="font-normal cursor-pointer">Tabs</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCopyModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCopyAction} className="gap-1.5">
                  <Copy className="h-3.5 w-3.5" />
                  Copy to Clipboard
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button 
            variant="default" 
            size="sm" 
            onClick={handleDownload} 
            disabled={!output}
            className="h-8 gap-1.5 shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex-1 overflow-hidden min-h-0 relative">
        {isDesktop ? (
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={50} minSize={20}>
              {InputPanel}
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={50} minSize={20}>
              {OutputPanel}
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="h-full w-full overflow-hidden relative">
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
        )}
      </div>
      
      {/* Footer Info */}
      <div className="p-1 px-3 bg-muted/20 border-t text-[10px] text-muted-foreground flex justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span>Chars: {input.length}</span>
          <span className="hidden xs:inline">Lines: {input.split('\n').length}</span>
        </div>
        <div>Modern JSON System</div>
      </div>
    </div>
  )
}
