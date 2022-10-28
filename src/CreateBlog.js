import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProgressBar from "react-native-animated-progress";
// import { addDoc, collection } from "firebase/firestore";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const CreateBlog = () => {
  const [name, setName] = useState([]);
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("does not exist");
        }
      });
  }, []);

  const todoRef = firebase.firestore().collection("newBlogs");

  const postBlog = () => {
    if (title && title.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        title: title,
        blog: blog,
        author: name.firstName,
        createdAt: timestamp,
      };
      todoRef
        .add(data)
        .then(() => {
          setTitle("");
          setBlog("");

          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  // const blogsCollectionRef = collection(db, "blogs");

  // const createBlog = async () => {
  //   await addDoc(blogsCollectionRef,{title,blog,author:{name: firebase.auth().currentUser.displayName , id: }});
  // };
  //   const navigation = useNavigation();
  //   return <SafeAreaView style={styles.container}></SafeAreaView>;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>
          Write Your Blog Here
        </Text>
        <View style={{ marginTop: 40 }}>
          <TextInput
            maxLength={30}
            style={styles.textInput}
            placeholder="BlogTitle"
            onChangeText={(title) => setTitle(title)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ProgressBar
            style={{ margin: 10, paddingTop: 20 }}
            height={7}
            progress={100}
            backgroundColor="#00e4d0"
            shadowColor="#000"
            animated={true}
          />

          <Text style={{ padding: 10, fontSize: 20 }}>
            {blog
              .split(" ")
              .map((word) => word && "🍕")
              .join(" ")}
          </Text>
          <ProgressBar
            height={7}
            progress={100}
            width={85}
            backgroundColor="#00e4d0"
            shadowColor="#000"
            animated={true}
          />

          <TextInput
            maxLength={300}
            style={styles.textBlog}
            placeholder="Write your Story"
            onChangeText={(blog) => setBlog(blog)}
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            numberOfLines={10}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => {
              postBlog();
              navigation.navigate("Dashboard");
            }}
            style={styles.button}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 20,
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
    backgroundColor: "#00e4d0",
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
