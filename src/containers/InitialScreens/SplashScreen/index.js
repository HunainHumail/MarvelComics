import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";


const SplashScreen = (props) => {
  return (
    <View style={styles.viewStyle}> 
        <Text style={styles.logoStyle}>Splash</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  viewStyle:{
    height: '100%',
    justifyContent:'center',
    alignItems: 'center'
  },
  logoStyle:{
    textAlign: 'center'
  },
  imageStyle:{

  }
})