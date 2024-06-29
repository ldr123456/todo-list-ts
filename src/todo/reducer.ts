import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from "./constants";

// Type definition for the state of a single todo item
interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

// Action types
type Action =
  | { type: typeof ADD_ITEM; payload: { title: string } }
  | { type: typeof UPDATE_ITEM; payload: { id: string; title: string } }
  | { type: typeof REMOVE_ITEM; payload: { id: string } }
  | { type: typeof TOGGLE_ITEM; payload: { id: string } }
  | { type: typeof REMOVE_ALL_ITEMS }
  | { type: typeof TOGGLE_ALL; payload: { completed: boolean } }
  | { type: typeof REMOVE_COMPLETED_ITEMS };

// This alphabet uses `A-Za-z0-9_-` symbols.
// The order of characters is optimized for better gzip and brotli compression.
let urlAlphabet =
  "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

function nanoid(size: number = 21): string {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
}

export const todoReducer = (state: TodoItem[], action: Action): TodoItem[] => {
  switch (action.type) {
    case ADD_ITEM:
      return state.concat({ id: nanoid(), title: action.payload.title, completed: false });
    case UPDATE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
    case REMOVE_ITEM:
      return state.filter((todo) => todo.id !== action.payload.id);
    case TOGGLE_ITEM:
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    case REMOVE_ALL_ITEMS:
      return [];
    case TOGGLE_ALL:
      return state.map((todo) =>
        todo.completed !== action.payload.completed ? { ...todo, completed: action.payload.completed } : todo
      );
    case REMOVE_COMPLETED_ITEMS:
      return state.filter((todo) => !todo.completed);
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};
