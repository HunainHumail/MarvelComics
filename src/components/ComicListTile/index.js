import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from "react-native";
import { Colors, Fonts, Images, Responsive} from "../../config";

const ComicListTile = ({
  title,
  issueNo,
  price,
  imageUrl
}) => {
  // const [selected, setSelected] = useState(false)
  // const handleSelected = () => {
  //     setSelected(!selected)
  //   }
  return (
    <View style={styles.cardStyle}>
        <View style={styles.imageView}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.infoContainerView}>
            <Text style={styles.headingStyle}>
                {title}
            </Text>
            <Text style={styles.textStyle}>
                Issue Number: {issueNo}
            </Text>
            <Text style={styles.textStyle}>
               Price:  ${price}
            </Text>
            
      </View>
    </View>
  );
};

export default ComicListTile;

const styles = StyleSheet.create({
    cardStyle: {
        height: Responsive.VerticalSize(182),
        backgroundColor: "rgba(255, 255, 255, 0.28)",
        borderRadius: Responsive.VerticalSize(15),
        marginTop: Responsive.VerticalSize(20),
        justifyContent: 'center',
        flexDirection: 'row'
      },
      imageView: {
        height: Responsive.VerticalSize(155),
        borderRadius: 15,
        width: Responsive.VerticalSize(101),
        marginLeft: Responsive.HorizontalSize(10),
        alignSelf: 'center',
        flex: 2
      },
      imageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 15,
      },
      headingStyle: {
        color: Colors.White,
        fontFamily: Fonts["Badaboom"],
        fontSize: Responsive.FontMedium,
        textAlign: "center",
        alignSelf: "center",
        marginHorizontal: 10,
        marginVertical: Responsive.VerticalSize(20)

      },
      textStyle: {
        color: Colors.White,
        fontFamily: Fonts["Poppins-Bold"],
        fontSize: Responsive.FontRegular,
        textAlign: "center",
        alignSelf: "center",
        marginHorizontal: 10,
        marginTop: Responsive.VerticalSize(2)
      },
      infoContainerView: {
          flex: 4,
          justifyContent: 'flex-start'
      }
});
