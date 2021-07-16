import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function ListRestaurants(props) {
  const { restaurants, handleLoadMore, isLoading } = props;

  return (
    <View style={styles.loaderRestaurants}>
      {size(restaurants) > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={(0, 5)} //el trozo antes de llegar al final
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando Locales</Text>
        </View>
      )}
    </View>
  );
}

function Restaurant(props) {
  const { restaurant } = props;
  const { images, name, address, description } = restaurant.item;
  const imageRestaurant = images[0];

  const goRestaurant = () => {
    console.log("OK");
  };

  return (
    <TouchableOpacity onPress={goRestaurant}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            source={
              imageRestaurant
                ? { uri: imageRestaurant }
                : require("../../../assets/img/no-image.png")
            }
            style={styles.imageRestaurant}
          />
        </View>
        <View>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantAddress}>{address}</Text>
          <Text style={styles.restaurantDescription}>
            {description.substr(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderRestaurants}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundRestaurants}>
        <Text>No quedan locales por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 2,
    padding: 4,
    borderRadius: 5,
    backgroundColor: "#C2A0E8",
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 110,
    height: 80,
    borderRadius: 10,
  },
  restaurantName: {
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
