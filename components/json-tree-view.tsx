"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Folder, FileJson, Hash, Type, ToggleLeft, Ghost, Search, X } from "lucide-react"
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
  searchQuery?: string
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

function JsonNode({ data, name, isLast = true, depth = 0, searchQuery = "" }: JsonTreeViewProps) {
  const isObject = data !== null && typeof data === "object"
  const isArray = Array.isArray(data)
  
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
    const isMatch = searchQuery && (
      (name && name.toLowerCase().includes(searchQuery.toLowerCase())) || 
      valueStr.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (searchQuery && !isMatch) return null

    return (
      <div className={cn("flex items-center gap-2 py-0.5 group rounded px-1 transition-colors", isMatch && "bg-primary/20 ring-1 ring-primary/30")}>
        <div className="flex items-center gap-1.5 min-w-fit">
          <Icon className="h-3 w-3 text-muted-foreground/50" />
          {name && <span className="text-sm font-medium text-foreground/80">{name}:</span>}
        </div>
        <span className={cn("text-sm break-all font-mono", valueColor)}>
          {valueStr}
          {!isLast && <span className="text-muted-foreground">,</span>}
        </span>
      </div>
    )
  }

  // Recursive case: Objects and Arrays
  const record = data as Record<string, unknown>
  const keys = Object.keys(record)
  const isEmpty = keys.length === 0
  const LabelIcon = isArray ? FileJson : Folder
  
  // Filtering logic
  const filteredKeys = searchQuery 
    ? keys.filter(key => {
        const matchesKey = key.toLowerCase().includes(searchQuery.toLowerCase())
        if (matchesKey) return true
        return deepMatch(record[key], searchQuery)
      })
    : keys

  const [isOpen, setIsOpen] = React.useState(depth < 2 || !!searchQuery)

  // Auto-expand on search
  React.useEffect(() => {
    if (searchQuery) setIsOpen(true)
  }, [searchQuery])

  if (searchQuery && filteredKeys.length === 0 && !(name && name.toLowerCase().includes(searchQuery.toLowerCase()))) {
    return null
  }

  const previewText = isArray 
    ? `Array [${keys.length}]` 
    : `Object {${keys.length}}`

  const isNameMatch = name && searchQuery && name.toLowerCase().includes(searchQuery.toLowerCase())

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <div className={cn("flex items-center gap-1.5 py-1 group rounded px-1 transition-colors", isNameMatch && "bg-primary/20 ring-1 ring-primary/30")}>
        <CollapsibleTrigger asChild>
          <button className="p-0.5 hover:bg-muted rounded-sm transition-colors shrink-0">
            {isOpen ? (
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </button>
        </CollapsibleTrigger>
        
        <div className="flex items-center gap-1.5 cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
          <LabelIcon className="h-3.5 w-3.5 text-primary/70 shrink-0" />
          {name && <span className="text-sm font-semibold text-foreground/90">{name}:</span>}
          <span className="text-[11px] font-bold text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded uppercase tracking-wider">
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
                name={isArray ? undefined : key} 
                data={record[key]} 
                isLast={index === filteredKeys.length - 1}
                depth={depth + 1}
                searchQuery={searchQuery}
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

export function JsonTreeView({ data }: { data: unknown }) {
  const [searchQuery, setSearchQuery] = React.useState("")

  if (data === null || data === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <FileJson className="h-8 w-8 opacity-20" />
        <p className="text-sm">No data to display</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Search Header */}
      <div className="px-4 py-2 border-b bg-muted/20 flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search keys or values..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border rounded-md pl-8 pr-8 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded-full"
            >
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <div className="max-w-full inline-block min-w-full">
          <JsonNode data={data} depth={0} searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
