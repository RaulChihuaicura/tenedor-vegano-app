import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  //uso de la lobreria fireSQL para hacer sintaxis SQL en firestore
  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
        .then((response) => {
          setRestaurants(response);
        });
    }
  }, [search]);

  return (
    <ScrollView style={styles.scrollViewBody}>
      <SearchBar
        placeholder="Busca un local vegano..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={StyleSheet.searchBar}
      />
      {restaurants.length === 0 ? (
        <NoFoundRestaurants />
      ) : (
        <View>
          <FlatList
            data={restaurants}
            renderItem={(restaurant) => (
              <Restaurant restaurant={restaurant} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </ScrollView>
  );
}

function NoFoundRestaurants() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { id, name, images } = restaurant.item;

  return (
    <ListItem
      title={name}
      leftAvatar={{
        source: images[0]
          ? { uri: images[0] }
          : require("../../assets/img/no-image.png"),
      }}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate("restaurants", {
          screen: "restaurant",
          params: { id, name },
        })
      }
      containerStyle={styles.containerListItem}
    />
  );
}

const styles = StyleSheet.create({
  scrollViewBody: {
    backgroundColor: "#DED7FA",
  },
  searchBar: {
    marginBottom: 20,
  },
  containerListItem: {
    backgroundColor: "#C2A0E8",
    marginBottom: 1,
  },
});
