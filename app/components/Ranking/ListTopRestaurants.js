import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card, Image, Icon, Rating } from "react-native-elements";

export default function ListTopRestaurants(props) {
  const { restaurants, navigation } = props;

  return (
    <FlatList
      data={restaurants}
      renderItem={(restaurant) => (
        <Restaurant restaurant={restaurant} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { name, rating } = restaurant.item;
  return (
    <View>
      <Text>{name}</Text>
      <Text>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
