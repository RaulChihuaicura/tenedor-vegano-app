import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Rating } from "react-native-elements";
import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(0);

  navigation.setOptions({ title: name });

  useEffect(() => {
    db.collection("restaurants")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setRestaurant(data);
        setRating(data.rating);
      });
  }, []);

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
      <RestaurantInfo
        location={restaurant.location}
        name={restaurant.name}
        address={restaurant.address}
      />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

function RestaurantInfo(props) {
  const { location, name, address } = props;

  return (
    <View style={styles.viewRestaurantInfo}>
      <Text style={styles.viewRestaurantInfoTitle}>
        Información del Local Vegano
      </Text>
      <Map location={location} name={name} height={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#DED7FA",
  },
  viewRestaurantTitle: {
    padding: 15,
    backgroundColor: "#ffffff",
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 10,
  },
  viewRestaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
