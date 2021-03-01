import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Share,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import {
  Responsive,
  Images,
  NavigationService,
  Fonts,
  Colors,
  ApiCaller,
} from "../../config";
import { BlurView } from "@react-native-community/blur";
import AppButton from "../AppButton";

export const CharacterModal = ({
  modalVisible,
  handleModal,
  handleCancel,
  image,
  name,
  //toggleState,
  // handleToggle,
  //value,
}) => {
//   const [viewRef, setViewRef] = useState(null);

  console.log('imaaaaage: ', image)

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => handleModal(false)}
    >
      <BlurView
        style={styles.absolute}
        // viewRef={viewRef}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleModal(false)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <TouchableHighlight>
          <View
            style={styles.modalStyle}
          >
            
              <Image source={{ uri:image }} style={styles.characterImageStyle} />
              <Text style={styles.textStyle}>{name}</Text>
              <View style={styles.buttonView}>
              <AppButton text='Change Character' width={Responsive.HorizontalSize(120)} height={Responsive.VerticalSize(50)}/>
              </View>

          </View>
        </TouchableHighlight>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalStyle: {
    width: Responsive.HorizontalSize(311),
    height: Responsive.VerticalSize(400),
    borderRadius: Responsive.VerticalSize(15),
    backgroundColor: Colors.Primary,
  },
  
  characterImageStyle: {
    height: Responsive.VerticalSize(150),
    width: Responsive.VerticalSize(150),
    resizeMode: 'cover',
    borderRadius: Responsive.VerticalSize(15),
    position: 'absolute',
    alignSelf: 'center',
    top: Responsive.VerticalSize(-100)
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontLarge,
    textAlign: "center",
    alignSelf: "center",
    marginTop: Responsive.VerticalSize(80),
    paddingHorizontal: Responsive.VerticalSize(20)
  },
  buttonView: {
      alignSelf: 'center',
      justifyContent: 'flex-end',
      alignContent:'flex-end',
      marginTop: Responsive.VerticalSize(10)
  }
});
