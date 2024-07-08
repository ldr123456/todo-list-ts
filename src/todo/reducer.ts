import { ADD_ITEM, UPDATE_ITEM, REMOVE_ITEM, TOGGLE_ITEM, REMOVE_ALL_ITEMS, TOGGLE_ALL, REMOVE_COMPLETED_ITEMS } from "./constants";

// 这是ts的要求，对参数定义这个参数的类型，你可以全局搜索看一下使用的地方
// 这个类型要求id必须是string类型，另外两个同样
// 定义 Todo 项目的接口
interface TodoItem {
  id: string; // Todo 项目的唯一标识符
  title: string; // Todo 项目的标题
  completed: boolean; // Todo 项目的完成状态
}

// 定义动作类型的联合类型
// 这个也是定义了一种类型，只不过因为使用Action类型的那个参数的可能性比较多，所以我这里用联合类型定义的，传进来的参数只要符合下面其中一下就不会报错
type Action =
  | { type: typeof ADD_ITEM; payload: { title: string } }
  | { type: typeof UPDATE_ITEM; payload: { id: string; title: string } }
  | { type: typeof REMOVE_ITEM; payload: { id: string } }
  | { type: typeof TOGGLE_ITEM; payload: { id: string } }
  | { type: typeof REMOVE_ALL_ITEMS }
  | { type: typeof TOGGLE_ALL; payload: { completed: boolean } }
  | { type: typeof REMOVE_COMPLETED_ITEMS };

// 定义生成唯一 ID 的字母表
let urlAlphabet =
  "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// 定义生成唯一 ID 的函数
// 就是给每一个列表项一个独有的id，方便删改
function nanoid(size: number = 21): string {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]; // 随机生成一个字符并追加到 id 字符串中
  }
  return id; // 返回生成的唯一 ID
}

// 定义 Todo 项目的 reducer 函数
// 这里使用了我们定义的TodoItem类型，意思是传进来的这个state参数需要是TodoItem类型，:后面的这个TodoItem代表返回值需要是TodoItem类型
// 这个函数会根据传递的不同参数对列表项进行不同的操作
// 函数前的export代表把这个函数导出，可以在其他文件里导入这个方法并使用（不导出就不能在其他文件导入并使用）
export const todoReducer = (state: TodoItem[], action: Action): TodoItem[] => {
  switch (action.type) {
    case ADD_ITEM:
      // 添加一个新的 Todo 项目
      return state.concat({ id: nanoid(), title: action.payload.title, completed: false });
    case UPDATE_ITEM:
      // 更新指定 ID 的 Todo 项目的标题
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
    case REMOVE_ITEM:
      // 删除指定 ID 的 Todo 项目
      return state.filter((todo) => todo.id !== action.payload.id);
    case TOGGLE_ITEM:
      // 切换指定 ID 的 Todo 项目的完成状态
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );
    case REMOVE_ALL_ITEMS:
      // 删除所有的 Todo 项目
      return [];
    case TOGGLE_ALL:
      // 切换所有 Todo 项目的完成状态
      return state.map((todo) =>
        todo.completed !== action.payload.completed ? { ...todo, completed: action.payload.completed } : todo
      );
    case REMOVE_COMPLETED_ITEMS:
      // 删除所有已完成的 Todo 项目
      return state.filter((todo) => !todo.completed);
    default:
      // 如果动作类型未知，抛出错误
      throw new Error(`Unknown action: ${action}`);
  }
};
