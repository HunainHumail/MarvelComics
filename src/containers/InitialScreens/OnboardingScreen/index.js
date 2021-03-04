import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Fonts, Images, Colors, Responsive } from "../../../config/";
import Carousel from "react-native-snap-carousel";
import {AppButton} from '../../../components'
const OnboardingScreen = ({sliders, carousel, pagination, onSnapToItem, _renderItem, activeIndex, onSelectCb, selectedCharacterId}) => {

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
        <Image source={Images.MarvelLogo} style={styles.logoStyle} />
        <Carousel
          layout={"default"}
          ref={carousel}
          data={sliders}
          sliderWidth={Responsive.HorizontalSize()}
          itemWidth={Responsive.HorizontalSize(300)}
          renderItem={_renderItem}
          onSnapToItem={(index) => onSnapToItem(index)}
        />
        <View style = {{flexDirection: 'row', flex: 1}}>
        <View style = {styles.buttonView}>
        </View>
        {pagination()}
        <View style = {styles.buttonView}>
        {activeIndex == 1 && <AppButton text='Select' height={Responsive.VerticalSize(40)} disabled={selectedCharacterId == undefined?true:false} onPress={()=>{onSelectCb()}}/>}
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
  },
  buttonView: {
    width: Responsive.HorizontalSize(130), justifyContent: 'center', alignItems: 'center'
  }

});
