export { StorageManager, ItemData, CategoryData };

interface ItemData {
  title: string;
  dates: Array<Date>;
}

interface CategoryData {
  catId: string;
  catTitle: string;
  taskIds: Array<string>;
}

class StorageManager {
  #taskIdsKey = "TASK_IDS";
  // TODO: make this false once storage is implemented
  #fetchedDataFromStorage = true;
  #tasks: { [id: string]: ItemData } = {
    "0": {
      title: "Heartworm medication",
      dates: [],
    },
    "1": {
      title: "Water peace lily",
      dates: [],
    },
    "2": {
      title: "Cleaned kitchen grout",
      dates: [],
    },
  };

  #categories: Array<CategoryData> = [
    { catId: "catId0", catTitle: "Uncategorized", taskIds: ["0", "1", "2"] },
  ];

  #setTasks;

  constructor(setTasks: (input: { [id: string]: ItemData }) => void) {
    this.#setTasks = setTasks;
  }

  setTasks() {
    this.#setTasks(this.#tasks);
  }

  #getTaskIds() {}

  getTasks() {
    if (this.#fetchedDataFromStorage) {
      return this.#tasks;
    }
    // TODO fetch tasks from storage
    this.#fetchedDataFromStorage = true;
  }

  markCompleted(taskId: string) {
    this.#tasks[taskId].dates.push(new Date());
  }

  addNewItem(title: string) {
    const newTaskId: string = crypto.randomUUID();
    const newTask: ItemData = { title: title, dates: [] };
    this.#tasks[newTaskId] = newTask;
    // TODO update task in state
  }
}
