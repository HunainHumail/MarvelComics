import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Fonts, Images, Colors } from "../../../config/";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {AppButton} from '../../../components'
const OnboardingScreen = ({sliders, carousel, pagination, onSnapToItem, _renderItem, activeIndex, selectedCharacter, onSelectCb, selectedCharacterId}) => {
console.log('MAINSCREEN: ', selectedCharacter)

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
        <Image source={Images.MarvelLogo} style={styles.logoStyle} />
        <Carousel
          layout={"default"}
          ref={carousel}
          data={sliders}
          sliderWidth={500}
          // layoutCardOffset={true}
          itemWidth={350}
          renderItem={_renderItem}
          onSnapToItem={(index) => onSnapToItem(index)}
        />
        <View style = {{flexDirection: 'row', flex: 1}}>
        <View style = {styles.buttonView}>
        </View>
        {pagination()}
        <View style = {styles.buttonView}>
        {/* <KeyboardAvoidingView style={{ width: '80%', backgroundColor: 'red'}}> */}
        {activeIndex == 1 && <AppButton text='Select' height="55%" disabled={selectedCharacterId == undefined?true:false} onPress={()=>{onSelectCb()}}/>}
        {/* </KeyboardAvoidingView> */}
       </View>
        </View>


      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

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
