import { Button, StyleSheet, Text, View } from "react-native";

export default function App({
  itemText,
  itemDate,
  markCompleted,
}: {
  itemText: string;
  itemDate: Date | undefined;
  markCompleted: Function;
}) {
  const dateView = itemDate ? <Text>{itemDate.toDateString()}</Text> : null;
  return (
    <View style={styles.container}>
      <Button title="X" onPress={() => markCompleted()} />
      <Text>{itemText}</Text>
      {dateView}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "aqua",
    marginTop: 5,
    marginBottom: 5,
    padding: 3,
    justifyContent: "center",
  },
});
