import React, { useState, useEffect, Component } from "react";

import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { firebase } from "../config";

const Dashboard = () => {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection("newBlogs");

  useEffect(() => {
    todoRef.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { title, author, blog } = doc.data();
        users.push({ title, author, blog });
      });
      setUsers(users);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 26 }}>
          Blog Feed
        </Text>

        <View>
          <FlatList
            style={{ height: "100%" }}
            data={users}
            numColumns={1}
            renderItem={({ item }) => (
              <Pressable>
                {/* style={StyleSheet.container} */}
                <View>
                  <Text style={styles.textTitle}>{item.title}</Text>

                  <Text style={styles.textBlog}>{item.blog}</Text>
                  <Text style={styles.textAuthor}>Author~{item.author}</Text>
                  <View
                    style={{
                      flex: 1,
                      borderBottomColor: "#00e4d0",
                      // borderTopColor: "#026efd",
                      borderStyle: "dashed",
                      // borderBottomWidth: StyleSheet.hairlineWidth,
                      // borderTopWidth: 1,
                      borderBottomWidth: 3,
                      marginTop: "5%",
                      marginBottom: "5%",
                      shadowColor: "#000",
                      elevation: 5,
                      // border-style: none,
                      // border-top-style: dotted,
                      // border-color: #B7D3DF,
                      // border-width: 10px,
                      // width: 7%,
                    }}
                  />
                  {/* <text style={StyleSheet.itemDate}>{item.createdAt}</text> */}
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.buttonView1}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 20 }}>
            User Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateBlog")}
          style={styles.buttonView2}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 20 }}>
            Create Blog
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
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
  buttonView1: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#00e4d0",
    // width: "100%",
    // height: 50,
    // backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "50%",
    bottom: 0,
    right: 0,
    borderTop: 5,
  },
  buttonView2: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#00e4d0",
    // width: "100%",
    // height: 50,
    // backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "50%",
    bottom: 0,
    left: 0,
  },
  // footer: {
  // position: "absolute",
  //   backgroundColor: "#00e4d0",
  // },
  textTitle: {
    flex: 1,
    width: "95%",
    borderWidth: 1,
    borderColour: "#000",
    borderRadius: 50,
    fontSize: 25,
    padding: 10,
    marginRight: "2%",
    marginLeft: "2%",
  },
  textAuthor: {
    flex: 1,
    width: "95%",
    borderWidth: 1,
    borderColour: "#000",
    borderRadius: 50,
    fontSize: 15,
    padding: 10,
    marginRight: "2%",
    marginLeft: "2%",
  },
  textBlog: {
    flex: 1,
    width: "95%",
    borderWidth: 1,
    borderColour: "#000",
    // borderRadius: 50,
    fontSize: 17,
    padding: 10,
    marginRight: "2%",
    marginLeft: "2%",
  },
});

/* <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateBlog")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Create Blog</Text>
      </TouchableOpacity> */

//   <SafeAreaView>
//   <FlatList
//     style={{height:"100%"}}
//     data={users}
//     numColumns={1}
//   renderItem ={({ item }) => (
//     <Pressable>
//       {/* style={StyleSheet.container} */}
//       <View>
//         <text style={StyleSheet.textInput}>{item.title}</text>
//         <text style={StyleSheet.textInput}>{item.author}</text>
//         <text style={StyleSheet.textInput}>{item.blog}</text>
//         {/* <text style={StyleSheet.itemDate}>{item.createdAt}</text> */}
//       </View>
//     </Pressable>
//   )}
//   />
// </SafeAreaViewView>
