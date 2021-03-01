import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AppButton, CharacterModal, ComicListTile } from "../../../components";
import { Fonts, Images, Colors, Responsive } from "../../../config/";
const ChangeCharacterScreen = ({ searchComponent, selectedCharacter, onSelectCb, selectedCharacterId }) => {


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
      // justifyContent: "center",
      // width: '100%'
    },
    cardStyle: {
      height: 554,
      width: 361,
      backgroundColor: "rgba(255, 255, 255, 0.28)",
      borderRadius: 15,
      marginTop: 20,
    },
    headingStyle: {
      fontFamily: Fonts["Badaboom"],
      fontSize: 45,
      color: Colors.White,
      marginHorizontal: "10%",
      textAlign: "center",
      marginTop: "2%",
    },
    textStyle: {
      fontFamily: Fonts["Badaboom"],
      fontSize: 25,
      color: Colors.White,
      marginHorizontal: "10%",
      marginTop: "10%",
    },
    textInputStyle: {
      fontFamily: Fonts["Badaboom"],
      fontSize: 18,
      marginHorizontal: '12%',
      textAlign: 'center',
      borderBottomColor: Colors.White,
      borderBottomWidth: 1
    },
    buttonView: {
      width: '30%', justifyContent: 'center', alignItems: 'center'
    }
  
  });
  