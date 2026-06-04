import Dexie, { type Table } from 'dexie';

export interface SavedState {
  id: string;
  input: string;
  indentSize: string;
  updatedAt: number;
}

export class JsonLixDatabase extends Dexie {
  states!: Table<SavedState>;

  constructor() {
    super('JsonLixDB');
    this.version(1).stores({
      states: 'id, updatedAt' // Primary key is 'id', indexed by 'updatedAt'
    });
  }
}

export const db = new JsonLixDatabase();

// Helper to save state
export async function saveEditorState(input: string, indentSize: string) {
  try {
    await db.states.put({
      id: 'current-session',
      input,
      indentSize,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Failed to save state to IndexedDB:', error);
  }
}

// Helper to load state
export async function loadEditorState(): Promise<SavedState | undefined> {
  try {
    return await db.states.get('current-session');
  } catch (error) {
    console.error('Failed to load state from IndexedDB:', error);
    return undefined;
  }
}
