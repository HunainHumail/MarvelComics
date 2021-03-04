import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CharacterModal, ComicListTile } from "../../../components";
import { Fonts, Images, Colors, Responsive } from "../../../config/";
const HomeScreen = ({
  comicData,
  loadMoreData,
  loadMore,
  image,
  handleModal,
  modalVisible,
  onPressCb,
  handleCancelCb,
  name,
  onPressChangeCharacter,
  isLoading,
  total
}) => {

  return (
    <View style={styles.container}>
      <ImageBackground source={Images.AppBackground} style={styles.imageStyle}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "80%" }}>
            <Image source={Images.MarvelLogo} style={styles.logoStyle} />
          </View>
          <TouchableOpacity style={styles.imageView} onPress={onPressCb}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headingStyle}>Comics</Text>
        <View style={styles.listView}>
          {isLoading ? (
            <View style={styles.loadingStyle}>
              <ActivityIndicator size={"small"} color={Colors.White} />
            </View>
          ) : (
            total == 0 ? (
              <Text style={styles.textStyle}>No data</Text>
            ) :
            (<View>
              <FlatList
              data={comicData}
              keyExtractor={(item) => item.id.toString()}
              onEndReachedThreshold={0.8}
              onEndReached={() => {
                loadMoreData();
              }}
              renderItem={({ item, index }) => {
                return (
                  <ComicListTile
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    issueNo={item.issueNumber}
                  />
                );
              }}
            />
            {
            loadMore && <View>
                  <ActivityIndicator size="small" color={Colors.White} />
                </View> }
            </View>)
          )}
        </View>
      </ImageBackground>
      <CharacterModal
        modalVisible={modalVisible}
        handleModal={handleModal}
        handleCancel={handleCancelCb}
        image={image}
        name={name}
        onPress={onPressChangeCharacter}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    marginTop: "5%",
    alignSelf: "center",
    marginLeft: Responsive.HorizontalSize(50),
  },
  imageStyle: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  headingStyle: {
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontLarge,
    color: Colors.White,
    marginHorizontal: "10%",
    textAlign: "center",
    marginTop: "2%",
  },
  listView: {
    flex: 1,
    width: "90%",
    paddingBottom: Responsive.VerticalSize(20),
    justifyContent: 'center'
  },
  imageView: {
    height: Responsive.VerticalSize(50),
    borderRadius: Responsive.VerticalSize(40),
    width: Responsive.VerticalSize(50),
    alignSelf: "flex-end",
  },
  loadingStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.White,
  },
  textStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontLarge,
    color: Colors.White
  }
});
