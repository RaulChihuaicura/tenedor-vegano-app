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
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites() {
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
            getDataRrestaurant(idRestaurantsArray).then((response) => {
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

  const getDataRrestaurant = (idRestaurantsArray) => {
    const arrayRestaurants = [];
    idRestaurantsArray.forEach((idRestaurant) => {
      const result = db.collection("restaurants").doc(idRestaurant).get();
      arrayRestaurants.push(result);
    });
    return Promise.all(arrayRestaurants);
  };

  return (
    <View>
      <Text>Favorites...</Text>
    </View>
  );
}
