import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import {Images} from '../../../config/'


const OnboardingScreen = (props) => {
  return (
    <View style={styles.container}>
    <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
      <Image source={Images.MarvelLogo} style={styles.logoStyle}/>
    </ImageBackground>
  </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "column"
  },
  logoStyle:{
    marginTop: '5%'
  },
  imageStyle:{
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center'
    // justifyContent: "center",
    // width: '100%'
  }
})