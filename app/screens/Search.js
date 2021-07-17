import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
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
    <View style={styles.viewBody}>
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
          <Text>Resultado...</Text>
        </View>
      )}
    </View>
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

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#DED7FA",
  },
  searchBar: {
    marginBottom: 20,
  },
});
