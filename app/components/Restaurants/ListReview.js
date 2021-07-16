import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp);

export default function ListReview() {
  const [userLogged, setUserLogged] = useState(false);
  console.log(userLogged);

  firebaseApp.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  return (
    <View>
      {userLogged ? (
        <Button title="Escribe una opinión" />
      ) : (
        <View>
          <Text>Para comentar es necesario estar logeado</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
