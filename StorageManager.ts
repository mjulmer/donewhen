import AsyncStorage from "@react-native-async-storage/async-storage";

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
  #fetchedDataFromStorage = false;
  #tasks: { [id: string]: ItemData } = {};
  #asyncStorageManager = new AsyncStorageManager();

  #categories: Array<CategoryData> = [
    { catId: "catId0", catTitle: "Uncategorized", taskIds: ["0", "1", "2"] },
  ];

  #setTasksInUi;

  constructor(setTasks: (input: { [id: string]: ItemData }) => void) {
    this.#setTasksInUi = () => setTasks({ ...this.#tasks });
  }

  setTasksInUiAndStorage() {
    this.#setTasksInUi();
    this.#asyncStorageManager.storeTaskObject(this.#tasks);
  }

  #getTaskIds() {}

  async getTasks() {
    if (this.#fetchedDataFromStorage) {
      this.#setTasksInUi();
      return;
    }
    this.#asyncStorageManager
      .readTasks()
      .then((tasksFromStorage) => {
        if (!tasksFromStorage) {
          throw new Error();
        }
        this.#tasks = tasksFromStorage;
        this.#setTasksInUi();
        this.#fetchedDataFromStorage = true;
      })
      .catch((err) => console.error("Issue reading tasks from local storage."));
  }

  markCompleted(taskId: string) {
    this.#tasks[taskId].dates.push(new Date());

    this.setTasksInUiAndStorage();
  }

  addNewItem(title: string) {
    this.#tasks[crypto.randomUUID()] = { title: title, dates: [] };

    this.setTasksInUiAndStorage();
  }
}

class AsyncStorageManager {
  #tasksKey = "TASK_IDS";
  #categoriesKey = "CATEGORIES_KEY";

  storeTaskObject(value: { [id: string]: ItemData }) {
    this.#storeData(this.#tasksKey, value);
  }
  storeCategoryList(value: Array<CategoryData>) {
    this.#storeData(this.#categoriesKey, value);
  }

  async #storeData(key: string, value: object) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Data could not be stored to local storage.");
      // TODO: pop a modal for the user
    }
  }

  async readTasks() {
    try {
      const jsonValue = await AsyncStorage.getItem(this.#tasksKey);
      if (jsonValue === null) {
        throw new Error();
      }
      const newTasksObject = JSON.parse(jsonValue) as {
        [id: string]: ItemData;
      };

      for (const taskId in newTasksObject) {
        const newDateArray: Array<Date> = [];
        const task = newTasksObject[taskId];
        for (let date of task.dates) {
          newDateArray.push(new Date(date));
        }
        newTasksObject[taskId].dates = newDateArray;
      }

      return newTasksObject;
    } catch (e) {
      console.error("Data could not be read from local storage.");
      // TODO: pop a modal for the user
    }
  }
}
