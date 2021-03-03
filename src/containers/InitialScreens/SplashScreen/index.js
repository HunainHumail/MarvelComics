import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Images } from "../../../config/";

const SplashScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Image source={Images.SplashBackground} resizeMode="cover" />
      <Image
        source={Images.Logo}
        resizeMode="cover"
        style={styles.imageStyle}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  viewStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    textAlign: "center",
  },
  imageStyle: {
    width: 331,
    height: 195,
    position: "absolute",
  },
});
