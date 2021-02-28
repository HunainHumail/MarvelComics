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

const OnboardingScreen = (props) => {
  let sliders = [
    {
      title: "Your favourite Marvel Character Comics!",
    },
    {
      title: "INPUT YOUR FAVOURITE MARVEL CHARACTER",
      input: true,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const carousel = useRef();
  const [flex, setFlex] = useState(1)

  const _renderItem = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <Text style={styles.headingStyle}>{item.title}</Text>
      {item.input ? (
        <View>
          <TextInput
          placeholder={'Enter Character Name. e.g. Spider-Man'}
          placeholderTextColor={Colors.WhiteText}
          style={styles.textInputStyle}
          onFocus={()=>{setFlex(0)}}
          />
        </View>
      ) : (
        <View>
          <Text style={[styles.textStyle]}>
            get to know about your favorourite marvel character comics through
            this app
          </Text>
          <Text style={styles.textStyle}>
            {
              " 1) Select your favourte hero \n 2) see all the comics of your selected character"
            }
          </Text>
        </View>
      )}
    </View>
  );
  // let pagination = () => {
  //   return (
  //     <Pagination
  //       dotsLength={sliders.length}
  //       activeDotIndex={activeIndex}
  //       dotContainerStyle={{
  //         marginHorizontal: -5,
  //       }}
  //       dotStyle={{
  //         width: 10,
  //         height: 10,
  //         borderRadius: 5,
  //         marginHorizontal: 8,
  //         backgroundColor: Colors.White,
  //       }}
  //       inactiveDotStyle={{
  //         borderColor: Colors.White,
  //         // Define styles for inactive dots here
  //       }}
  //       inactiveDotOpacity={1}
  //       inactiveDotScale={0.6}
  //     />
  //   );
  // };

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
        <Image source={Images.MarvelLogo} style={styles.logoStyle} />
        <KeyboardAvoidingView>
        <Carousel
          layout={"default"}
          ref={carousel}
          data={sliders}
          sliderWidth={500}
          layoutCardOffset={true}
          itemWidth={350}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        {/* <View style={{marginBottom:70}}>{pagination()}</View> */}

        </KeyboardAvoidingView>

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

});
