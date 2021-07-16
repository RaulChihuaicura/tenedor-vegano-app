import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  console.log(restaurant);

  navigation.setOptions({ title: name });

  useEffect(() => {
    db.collection("restaurants")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
      });
  }, []);

  return (
    <View>
      <Text>Local info ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
