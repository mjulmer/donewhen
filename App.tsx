import { StyleSheet, View, FlatList, Button } from "react-native";
import { useState } from "react";
import ListItem from "./components/ListItem";

interface ItemData {
  id: string;
  title: string;
  dates: Array<Date>;
}

export default function App() {
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

  return (
    <View style={styles.container}>
      <Button
        title="Add item"
        onPress={() =>
          setItems([
            ...items,
            { id: crypto.randomUUID(), title: "New item", dates: [] },
          ])
        }
      />
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
    </View>
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
