"use client"

import * as React from "react"
import {
  History,
  Trash2,
  Clock,
  FileJson,
  ChevronRight,
  Pencil,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  getHistory,
  clearHistory,
  updateHistoryItemName,
  deleteHistoryItem,
  type HistoryItem,
} from "@/lib/db"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

interface HistoryPanelProps {
  onSelect: (input: string) => void
}

export function HistoryPanel({ onSelect }: HistoryPanelProps) {
  const [history, setHistory] = React.useState<HistoryItem[]>([])
  const [open, setOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<HistoryItem | null>(null)
  const [newName, setNewName] = React.useState("")

  const fetchHistory = React.useCallback(async () => {
    const items = await getHistory()
    setHistory(items)
  }, [])

  React.useEffect(() => {
    if (!open) return

    let active = true
    const load = async () => {
      const items = await getHistory()
      if (active) setHistory(items)
    }
    load()
    return () => {
      active = false
    }
  }, [open])

  const handleClear = async () => {
    await clearHistory()
    setHistory([])
    toast.success("History cleared")
  }

  const handleDeleteItem = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    await deleteHistoryItem(id)
    await fetchHistory()
    toast.success("History item deleted")
  }

  const handleSelect = (input: string) => {
    onSelect(input)
    setOpen(false)
    toast.success("JSON restored from history")
  }

  const handleRenameClick = (e: React.MouseEvent, item: HistoryItem) => {
    e.stopPropagation()
    setEditingItem(item)
    setNewName(item.name)
  }

  const handleRenameSave = async () => {
    if (editingItem?.id && newName.trim()) {
      await updateHistoryItemName(editingItem.id, newName.trim())
      await fetchHistory()
      setEditingItem(null)
      toast.success("History item renamed")
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 shrink-0 gap-1.5 transition-colors hover:bg-primary/10 hover:text-primary",
              open ? "bg-primary/10 text-primary" : "text-foreground"
            )}
          >
            <History
              className={cn(
                "h-4 w-4",
                open ? "text-primary" : "text-foreground"
              )}
            />
            <span className="hidden text-xs font-medium sm:inline lg:inline">
              History
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[300px] flex-col p-0 sm:w-[400px]"
        >
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                History
              </SheetTitle>
            </div>
            <SheetDescription>
              Your last 10 formatted JSON objects.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <ScrollArea className="flex-1 px-6">
            <div className="py-4">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-muted-foreground">
                  <Clock className="h-8 w-8 opacity-20" />
                  <p className="text-sm">No history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="group relative flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                      onClick={() => handleSelect(item.input)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <FileJson className="h-4 w-4 shrink-0 text-primary/60" />
                          <span className="truncate text-sm font-semibold tracking-tight uppercase">
                            {item.name}
                          </span>
                          <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-primary/10 hover:text-primary"
                              onClick={(e) => handleRenameClick(e, item)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive"
                              onClick={(e) =>
                                item.id && handleDeleteItem(e, item.id)
                              }
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] whitespace-nowrap text-muted-foreground">
                          {formatDistanceToNow(item.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 rounded bg-muted/30 p-1.5 font-mono text-[11px] text-muted-foreground">
                        {item.input.substring(0, 100)}
                      </p>
                      <div className="absolute right-2 bottom-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <ChevronRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
          {history.length > 0 && (
            <SheetFooter className="border-t p-6 pt-4">
              <Button
                variant="destructive"
                className="w-full gap-2"
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>

      <Dialog
        open={!!editingItem}
        onOpenChange={(open) => !open && setEditingItem(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename History Item</DialogTitle>
            <DialogDescription>
              Enter a new name for this history entry.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRenameSave()
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleRenameSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
