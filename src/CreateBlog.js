import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");

  const blogsCollectionRef = collection(db, "blogs");

  const createBlog = async () => {
    await addDoc(blogsCollectionRef);
  };
  //   const navigation = useNavigation();
  //   return <SafeAreaView style={styles.container}></SafeAreaView>;
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>
        Write Your Blog Here
      </Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="BlogTitle"
          onChangeText={(title) => setTitle(title)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.textBlog}
          placeholder="Maintain within 50 words."
          onChangeText={(blog) => setBlog(blog)}
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          numberOfLines={10}
          textAlignVertical="top"
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateBlog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",

    marginTop: 10,
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    // paddingBottom: 10,
    // width: 400,
    fontSize: 20,
    borderColor: "#000",
    borderWidth: 1,
    // marginBottom: 10,
    textAlign: "center",
  },
  textBlog: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,

    // paddingBottom: 10,
    // width: 400,
    fontSize: 20,
    borderColor: "#000",
    borderWidth: 1,
    // marginBottom: 10,
  },
  button: {
    marginTop: 50,
    height: 40,
    width: 100,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonView: {
    // width: "100%",
    // height: 50,
    // backgroundColor: "#FF9800",
    // justifyContent: "center",
    // alignItems: "center",
    position: "absolute",
    bottom: 50,
    right: 50,
  },
});
