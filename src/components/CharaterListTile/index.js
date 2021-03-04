import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { Colors, Fonts, Responsive } from "../../config";

const CharacterListTile = ({
  width = "95%",
  name,
  onPress,
  disabled = true,
  height = Responsive.VerticalSize(60),
  imageUri,
  selectedCharacter,
  id,
}) => {

  return (
    <TouchableOpacity
      style={[
        styles.listStyle,
        {
          width: width,
          height,
          borderWidth: selectedCharacter == id ? 1 : 0,
          borderRadius: 15,
          borderColor: selectedCharacter == id ? Colors.Secondary : null,
        },
      ]}
      onPress={
        (onPress)
      }
      disabled={disabled}
    >
      <View style={styles.imageView}>
        <Image
          source={{ uri: imageUri }}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CharacterListTile;

const styles = StyleSheet.create({
  listStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  textStyle: {
    color: Colors.White,
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontRegular,
    textAlign: "center",
    alignSelf: "center",
    marginHorizontal: Responsive.HorizontalSize(10),
  },
  imageView: {
    height: Responsive.VerticalSize(50),
    borderRadius: 15,
    width: Responsive.VerticalSize(50),
    marginLeft: Responsive.HorizontalSize(10),
    justifyContent: "center",
    alignSelf: "center",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
});
