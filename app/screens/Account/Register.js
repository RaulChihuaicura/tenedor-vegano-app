import React, { useRef } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  const toastRef = useRef();
  return (
    <ScrollView style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/primary-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#DED7FA",
  },
  logo: {
    width: "100%",
    height: 250,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
