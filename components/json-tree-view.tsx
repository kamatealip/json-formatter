"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Folder, FileJson, Hash, Type, ToggleLeft, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface JsonTreeViewProps {
  data: unknown
  name?: string
  isLast?: boolean
  depth?: number
  path?: string[]
  forceShow?: boolean
}

interface TreeContextType {
  activePath: string[]
  setActivePath: (path: string[]) => void
  searchQuery: string
}

const TreeContext = React.createContext<TreeContextType | null>(null)

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>
  
  const parts = text.split(new RegExp(`(${query})`, "gi"))
  return (
    <span>
      {parts.map((part, i) => (
        <span 
          key={i} 
          className={cn(
            part.toLowerCase() === query.toLowerCase() && "bg-emerald-500/30 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500/40 rounded-sm px-0.5 font-medium shadow-[0_0_8px_rgba(16,185,129,0.2)]"
          )}
        >
          {part}
        </span>
      ))}
    </span>
  )
}

function deepMatch(data: unknown, query: string): boolean {
  if (!query) return true
  const q = query.toLowerCase()
  if (typeof data === "string") return data.toLowerCase().includes(q)
  if (typeof data === "number" || typeof data === "boolean") return String(data).toLowerCase().includes(q)
  if (data !== null && typeof data === "object") {
    const record = data as Record<string, unknown>
    return Object.keys(record).some(key => key.toLowerCase().includes(q) || deepMatch(record[key], q))
  }
  return false
}

function JsonNode({ data, name, isLast = true, depth = 0, path = [], forceShow = false }: JsonTreeViewProps) {
  const context = React.useContext(TreeContext)
  const { activePath = [], setActivePath = () => {}, searchQuery = "" } = context || {}

  const isObject = data !== null && typeof data === "object"
  const isArray = Array.isArray(data)
  
  // Construct path for this node
  const currentPath = React.useMemo(() => {
    if (name === undefined && depth === 0) return []
    return name !== undefined ? [...path, name] : path
  }, [name, path, depth])

  const isActive = activePath.length > 0 && JSON.stringify(activePath) === JSON.stringify(currentPath.map(String))
  const isNameMatch = !!(name !== undefined && searchQuery && String(name).toLowerCase().includes(searchQuery.toLowerCase()))

  // Recursive case calculations for expansion logic
  const record = isObject ? (data as Record<string, unknown>) : {}
  const keys = isObject ? Object.keys(record) : []
  
  // Filtering logic: if the name matches, show all keys. Otherwise, filter.
  const filteredKeys = searchQuery && !isNameMatch && isObject
    ? keys.filter(key => {
        const matchesKey = key.toLowerCase().includes(searchQuery.toLowerCase())
        if (matchesKey) return true
        return deepMatch(record[key], searchQuery)
      })
    : keys

  const hasMatchInside = searchQuery && filteredKeys.length > 0
  
  // Expansion logic - MUST be called before any early returns
  const [isOpen, setIsOpen] = React.useState<boolean>(() => {
    if (searchQuery) return !!(isNameMatch || hasMatchInside)
    return depth < 2
  })
  const [prevSearchQuery, setPrevSearchQuery] = React.useState(searchQuery)

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery)
    if (searchQuery) {
      // Auto-expand if it matches or has matches inside
      if (isNameMatch || hasMatchInside) setIsOpen(true)
    }
  }

  // Base case: Primitive types
  if (!isObject) {
    let valueColor = "text-foreground"
    let Icon = Ghost

    if (typeof data === "string") {
      valueColor = "text-green-600 dark:text-green-400"
      Icon = Type
    } else if (typeof data === "number") {
      valueColor = "text-blue-600 dark:text-blue-400"
      Icon = Hash
    } else if (typeof data === "boolean") {
      valueColor = "text-orange-600 dark:text-orange-400"
      Icon = ToggleLeft
    } else if (data === null) {
      valueColor = "text-muted-foreground italic"
    }

    const valueStr = typeof data === "string" ? `"${data}"` : String(data)
    const isValueMatch = searchQuery && valueStr.toLowerCase().includes(searchQuery.toLowerCase())
    const isMatch = isNameMatch || isValueMatch

    if (searchQuery && !isMatch && !forceShow) return null

    return (
      <div 
        className={cn(
          "flex items-center gap-2 py-0.5 my-0.5 group rounded px-1 transition-colors cursor-pointer", 
          isMatch && "bg-emerald-500/15 ring-1 ring-emerald-500/40 shadow-[inset_0_0_8px_rgba(16,185,129,0.1)]",
          isActive && "bg-primary/10 ring-1 ring-primary/20 shadow-sm"
        )}
        onClick={(e) => {
          e.stopPropagation()
          setActivePath(currentPath)
        }}
      >
        <div className="flex items-center gap-1.5 min-w-fit">
          <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
          {name !== undefined && (
            <span className="text-sm font-medium text-foreground/80 font-mono">
              <HighlightText text={String(name)} query={searchQuery} />:
            </span>
          )}
        </div>
        <span className={cn("text-sm break-all font-mono", valueColor)}>
          <HighlightText text={valueStr} query={searchQuery} />
          {!isLast && <span className="text-muted-foreground">,</span>}
        </span>
      </div>
    )
  }

  // Recursive case: Objects and Arrays
  const isEmpty = keys.length === 0
  const LabelIcon = isArray ? FileJson : Folder
  
  const shouldRender = !searchQuery || isNameMatch || hasMatchInside || forceShow

  if (!shouldRender) return null

  if (!context) return null

  const previewText = isArray 
    ? `Array [${keys.length}]` 
    : `Object {${keys.length}}`

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <div 
        className={cn(
          "flex items-center gap-1.5 py-1 my-0.5 group rounded px-1 transition-colors cursor-pointer", 
          isNameMatch && "bg-emerald-500/15 ring-1 ring-emerald-500/40 shadow-[inset_0_0_8px_rgba(16,185,129,0.1)]",
          isActive && "bg-primary/10 ring-1 ring-primary/20 shadow-sm"
        )}
        onClick={(e) => {
          e.stopPropagation()
          setActivePath(currentPath)
        }}
      >
        <CollapsibleTrigger asChild>
          <button 
            className="p-0.5 hover:bg-muted rounded-sm transition-colors shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>
        
        <div 
          className="flex items-center gap-1.5 cursor-pointer select-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <LabelIcon className="h-3.5 w-3.5 text-primary/70 shrink-0" />
          {name !== undefined && (
            <span className="text-sm font-semibold text-foreground/90 font-mono">
              <HighlightText text={String(name)} query={searchQuery} />:
            </span>
          )}
          <span className="text-[11px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
            {previewText}
          </span>
        </div>
      </div>

      <CollapsibleContent className="pl-4 border-l border-muted/50 ml-[7px] mt-0.5">
        {!isEmpty ? (
          <div className="flex flex-col">
            {filteredKeys.map((key, index) => (
              <JsonNode 
                key={key} 
                name={isArray ? Number(key) : key} 
                data={record[key]} 
                isLast={index === filteredKeys.length - 1}
                depth={depth + 1}
                path={currentPath}
                forceShow={isNameMatch || forceShow}
              />
            ))}
          </div>
        ) : (
          <div className="text-[10px] text-muted-foreground italic py-1 pl-4">Empty</div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function JsonTreeView({ 
  data, 
  searchQuery = "", 
  onMatchCountChange
}: { 
  data: unknown, 
  searchQuery?: string, 
  onMatchCountChange?: (count: number) => void
}) {
  const [activePath, setActivePath] = React.useState<(string | number)[]>([])

  const matchCount = React.useMemo(() => {
    if (!searchQuery) return 0
    let count = 0
    const traverse = (obj: unknown) => {
      if (obj === null || obj === undefined) return
      const q = searchQuery.toLowerCase()
      
      if (typeof obj !== "object") {
        if (String(obj).toLowerCase().includes(q)) count++
        return
      }

      const record = obj as Record<string, unknown>
      Object.keys(record).forEach(key => {
        if (key.toLowerCase().includes(q)) count++
        traverse(record[key])
      })
    }
    traverse(data)
    return count
  }, [data, searchQuery])

  React.useEffect(() => {
    onMatchCountChange?.(matchCount)
  }, [matchCount, onMatchCountChange])

  if (data === null || data === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <FileJson className="h-8 w-8 opacity-20" />
        <p className="text-sm">No data to display</p>
      </div>
    )
  }

  return (
    <TreeContext.Provider value={{ activePath: activePath.map(String), setActivePath: (p) => setActivePath(p), searchQuery }}>
      <div className="h-full w-full flex flex-col overflow-hidden">
        {/* Breadcrumbs bar */}
        <div className="px-4 py-1.5 border-b bg-muted/5 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 min-h-8">
          <button 
            onClick={() => setActivePath([])}
            className={cn(
              "text-[10px] font-bold transition-colors uppercase tracking-wider whitespace-nowrap",
              activePath.length === 0 ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
          >
            root
          </button>
          {activePath.map((segment, i) => (
            <React.Fragment key={i}>
              <ChevronRight className="h-3 w-3 text-muted-foreground/30 shrink-0" />
              <button 
                onClick={() => setActivePath(activePath.slice(0, i + 1))}
                className={cn(
                  "text-[10px] font-bold transition-colors whitespace-nowrap",
                  i === activePath.length - 1 ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {typeof segment === "number" ? `[${segment}]` : segment}
              </button>
            </React.Fragment>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-background">
          <div className="max-w-full inline-block min-w-full">
            <JsonNode data={data} depth={0} />
          </div>
        </div>
      </div>
    </TreeContext.Provider>
  )
}
