import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from "react-native";

export default function NewItemModal({
  modalVisible,
  setModalVisible,
  addNewItem,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  addNewItem: Function;
}) {
  const [itemTitle, setItemTitle] = useState("");
  const titleInput = (
    <TextInput onChangeText={setItemTitle} placeholder={"New item"} />
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {titleInput}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              addNewItem(itemTitle ? itemTitle : "New item");
              setItemTitle("");
              setModalVisible(!modalVisible);
            }}
          >
            <Text>Add item</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
