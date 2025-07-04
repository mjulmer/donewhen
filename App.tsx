import { StyleSheet, View, FlatList } from "react-native";
import ListItem from "./components/ListItem";

export default function App() {
  const items = [
    {
      id: "0",
      title: "Heartworm medication",
    },
    {
      id: "1",
      title: "Water peace lily",
    },
    {
      id: "2",
      title: "Cleaned kitchen grout",
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem itemText={item.title} />}
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
