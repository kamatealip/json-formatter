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
}

function JsonNode({ data, name, isLast = true, depth = 0 }: JsonTreeViewProps) {
  const [isOpen, setIsOpen] = React.useState(depth < 2)
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

    return (
      <div className="flex items-center gap-2 py-0.5 group">
        <div className="flex items-center gap-1.5 min-w-fit">
          <Icon className="h-3 w-3 text-muted-foreground/50" />
          {name && <span className="text-sm font-medium text-foreground/80">{name}:</span>}
        </div>
        <span className={cn("text-sm break-all font-mono", valueColor)}>
          {typeof data === "string" ? `"${data}"` : String(data)}
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
  const previewText = isArray 
    ? `Array [${keys.length}]` 
    : `Object {${keys.length}}`

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <div className="flex items-center gap-1.5 py-1 group">
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
            {keys.map((key, index) => (
              <JsonNode 
                key={key} 
                name={isArray ? undefined : key} 
                data={record[key]} 
                isLast={index === keys.length - 1}
                depth={depth + 1}
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
  if (data === null || data === undefined) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
        <FileJson className="h-8 w-8 opacity-20" />
        <p className="text-sm">No data to display</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-auto p-4 custom-scrollbar">
      <div className="max-w-full inline-block min-w-full">
        <JsonNode data={data} depth={0} />
      </div>
    </div>
  )
}
