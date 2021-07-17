import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  return (
    <View style={styles.viewBody}>
      <SearchBar
        placeholder="Busca un local vegano..."
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={StyleSheet.searchBar}
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
