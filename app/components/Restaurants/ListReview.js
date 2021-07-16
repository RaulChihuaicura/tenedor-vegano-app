import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

const db = firebase.firestore(firebaseApp);

export default function ListReview(props) {
  const { navigation, idRestaurant, setRating } = props;
  const [userLogged, setUserLogged] = useState(false);

  firebaseApp.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe una opinión"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#C2A0E8",
          }}
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#C2A0E8", padding: 20 }}
            onPress={() => navigation.navigate("login")}
          >
            Para escribir un comentario es necesario estar logeado{" "}
            <Text style={{ fontWeight: "bold" }}>
              Pulsa AQUÍ para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleReview: {
    color: "#C2A0E8",
  },
});
