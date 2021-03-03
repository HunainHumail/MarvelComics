import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { AppButton } from "../../../components";
import { Fonts, Images, Colors, Responsive } from "../../../config/";
const ChangeCharacterScreen = ({ searchComponent, onSelectCb, selectedCharacterId }) => {


  return (
    <View style={styles.container}>
    <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
      <Image source={Images.MarvelLogo} style={styles.logoStyle} />
     {searchComponent()}
     <AppButton text='Select' height={Responsive.VerticalSize(40)} disabled={selectedCharacterId == undefined?true:false} onPress={()=>{onSelectCb()}}/>

    </ImageBackground>
  </View>
  );
};

export default ChangeCharacterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    logoStyle: {
      marginTop: "5%",
    },
    imageStyle: {
      flex: 1,
      resizeMode: "cover",
      alignItems: "center",
    },
  });
  