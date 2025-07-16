import { useEffect, useState } from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { StorageManager, ItemData, CategoryData } from "./StorageManager";
import ListItem from "./components/ListItem";
import NewItemModal from "./components/NewItemModal";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState<Array<CategoryData>>([]);
  const [tasks, setTasks] = useState<{ [id: string]: ItemData }>({});
  const [storageManager, _] = useState(new StorageManager(setTasks));

  // This helper function is only needed until I add categories. Right now,
  // all tasks are rendered in once list, and all tasks come as an object.
  // When categories are rendered, the list of task IDs will be passed to
  // the data attribute on the list component.
  function transformTasksIntoArray() {
    const taskArray = [];
    for (const id in tasks) {
      taskArray.push({ ...tasks[id], id: id });
    }
    return taskArray;
  }

  // This is also temporary -- once the tasks are set from an effect,
  // we can rely on that to load them.
  if (Object.keys(tasks).length === 0) {
    storageManager.setTasks();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NewItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addNewItem={(taskName: string) => storageManager.addNewItem(taskName)}
        />
        <Button title="Add item" onPress={() => setModalVisible(true)} />
        <FlatList
          data={transformTasksIntoArray()}
          renderItem={({ item }) => (
            <ListItem
              itemText={item.title}
              itemDate={item.dates.at(-1)}
              markCompleted={() => storageManager.markCompleted(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
