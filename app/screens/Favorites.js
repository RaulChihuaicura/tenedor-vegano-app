import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image, Icon, Button, ListItem } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState(null);
  const [userlogged, setUserlogged] = useState(false);

  console.log(restaurants);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserlogged(true) : setUserlogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userlogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idRestaurantsArray = [];
            response.forEach((doc) => {
              idRestaurantsArray.push(doc.data().idRestaurant);
            });
            getDataRestaurant(idRestaurantsArray).then((response) => {
              const restaurants = [];
              response.forEach((doc) => {
                const restaurant = doc.data();
                restaurant.id = doc.id;
                restaurants.push(restaurant);
              });
              setRestaurants(restaurants);
            });
          });
      }
    }, [userlogged])
  );

  const getDataRestaurant = (idRestaurantsArray) => {
    const arrayRestaurants = [];
    idRestaurantsArray.forEach((idRestaurant) => {
      const result = db.collection("restaurants").doc(idRestaurant).get();
      arrayRestaurants.push(result);
    });
    return Promise.all(arrayRestaurants);
  };

  if (!userlogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (!restaurants) {
    return <Loading isVisible={true} text="Cargando locales" />;
  } else if (restaurants?.length === 0) {
    return <NotFoundRestaurants />;
  }

  return (
    <View style={styles.viewBody}>
      {restaurants ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurants}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center" }}>Cagando locales</Text>
        </View>
      )}
    </View>
  );
}

function NotFoundRestaurants() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DED7FA",
      }}
    >
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
        color="#C2A0E8"
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "#C2A0E8" }}>
        No tienes locales favoritos en tu lista
      </Text>
    </View>
  );
}

function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#DED7FA",
      }}
    >
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
        color="#C2A0E8"
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: "#C2A0E8",
        }}
      >
        Necesitas estar logeado para ver esta sección
      </Text>
      <Button
        title="Ir al login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#C2A0E8" }}
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant } = props;
  const { name } = restaurant.item;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#DED7FA",
  },
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
  },
});
