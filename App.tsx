import { useState } from "react";
import { StyleSheet, FlatList, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ListItem from "./components/ListItem";
import NewItemModal from "./components/NewItemModal";

interface ItemData {
  id: string;
  title: string;
  dates: Array<Date>;
}

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState<Array<ItemData>>([
    {
      id: "0",
      title: "Heartworm medication",
      dates: [],
    },
    {
      id: "1",
      title: "Water peace lily",
      dates: [],
    },
    {
      id: "2",
      title: "Cleaned kitchen grout",
      dates: [],
    },
  ]);

  function markCompleted(targetId: string) {
    setItems(
      items.map((it: ItemData) => {
        if (it.id !== targetId) {
          return it;
        }
        it.dates.push(new Date());
        return it;
      })
    );
  }

  function addNewItem(title: string) {
    setItems([...items, { id: crypto.randomUUID(), title: title, dates: [] }]);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NewItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addNewItem={addNewItem}
        />
        <Button title="Add item" onPress={() => setModalVisible(true)} />
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ListItem
              itemText={item.title}
              itemDate={item.dates.at(-1)}
              markCompleted={() => markCompleted(item.id)}
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
