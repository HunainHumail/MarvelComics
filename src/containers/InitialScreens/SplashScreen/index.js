import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Images, Responsive } from "../../../config/";

const SplashScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <Image source={Images.SplashBackground} resizeMode="cover" />
      <Image
        source={Images.Logo}
        resizeMode="contain"
        style={styles.logoStyle}
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
    width: Responsive.HorizontalSize(231),
    height: Responsive.VerticalSize(195),
    position: "absolute",
  },
});
