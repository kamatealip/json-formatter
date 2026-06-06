import Dexie, { type Table } from "dexie"

export interface SavedState {
  id: string
  input: string
  indentSize: string
  updatedAt: number
}

export interface HistoryItem {
  id?: number
  input: string
  name: string
  timestamp: number
}

export class JsonLixDatabase extends Dexie {
  states!: Table<SavedState>

  history!: Table<HistoryItem>

  constructor() {
    super("JsonLixDB")
    this.version(2).stores({
      states: "id, updatedAt",
      history: "++id, timestamp", // Auto-incrementing id, indexed by timestamp
    })
  }
}

export const db = new JsonLixDatabase()

// Helper to save state
export async function saveEditorState(input: string, indentSize: string) {
  try {
    await db.states.put({
      id: "current-session",
      input,
      indentSize,
      updatedAt: Date.now(),
    })
  } catch (error) {
    console.error("Failed to save state to IndexedDB:", error)
  }
}

// Helper to load state
export async function loadEditorState(): Promise<SavedState | undefined> {
  try {
    return await db.states.get("current-session")
  } catch (error) {
    console.error("Failed to load state from IndexedDB:", error)
    return undefined
  }
}

// History Helpers
export async function addToHistory(input: string) {
  if (!input.trim() || input === "{}" || input.length < 5) return

  try {
    // Generate a simple name/preview
    let name = "Untitled JSON"
    try {
      const parsed = JSON.parse(input)
      if (typeof parsed === "object" && parsed !== null) {
        const keys = Object.keys(parsed)
        if (keys.length > 0) {
          name = keys.slice(0, 2).join(", ") + (keys.length > 2 ? "..." : "")
        }
      }
    } catch {
      name = input.substring(0, 30).replace(/\s+/g, " ") + "..."
    }

    // Check if identical item already exists in last 5 entries to avoid spam
    const recent = await db.history
      .orderBy("timestamp")
      .reverse()
      .limit(5)
      .toArray()
    const isDuplicate = recent.some((item) => item.input === input)
    if (isDuplicate) return

    await db.history.add({
      input,
      name,
      timestamp: Date.now(),
    })

    // Keep only last 10
    const count = await db.history.count()
    if (count > 10) {
      const oldest = await db.history
        .orderBy("timestamp")
        .limit(count - 10)
        .toArray()
      const ids = oldest
        .map((i) => i.id)
        .filter((id): id is number => id !== undefined)
      await db.history.bulkDelete(ids)
    }
  } catch (error) {
    console.error("Failed to add to history:", error)
  }
}

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    return await db.history.orderBy("timestamp").reverse().toArray()
  } catch (error) {
    console.error("Failed to get history:", error)
    return []
  }
}

export async function clearHistory() {
  try {
    await db.history.clear()
  } catch (error) {
    console.error("Failed to clear history:", error)
  }
}

export async function updateHistoryItemName(id: number, name: string) {
  try {
    await db.history.update(id, { name })
  } catch (error) {
    console.error("Failed to update history item name:", error)
  }
}

export async function deleteHistoryItem(id: number) {
  try {
    await db.history.delete(id)
  } catch (error) {
    console.error("Failed to delete history item:", error)
  }
}
