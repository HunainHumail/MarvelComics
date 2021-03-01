import React, {useState} from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from "react-native";
import { Colors, Fonts, Images } from "../../config";

const CharacterListTile = ({
  width = "100%",
  name,
  onPress,
  disabled = true,
  height = 60,
  imageUri,
}) => {
    const [selected, setSelected] = useState(false)
    const handleSelected = () => {
        setSelected(!selected)
      }
  return (
    <TouchableOpacity
      style={[styles.listStyle, { width: width, height, borderWidth: selected ? 1 : 0, borderRadius: 15, borderColor: selected ? Colors.Secondary : null }]}
      onPress={onPress, ()=>{handleSelected()}}
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
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    marginHorizontal: 10
  },
  imageView: {
    height: 50,
    borderRadius: 15,
    width: 50,
    marginLeft: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    borderRadius: 15
  },
});
