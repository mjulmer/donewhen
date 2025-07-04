import { StyleSheet, Text, View } from "react-native";

export default function App({ itemText }: { itemText: string }) {
  return (
    <View style={styles.container}>
      <Text>{itemText}</Text>
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
