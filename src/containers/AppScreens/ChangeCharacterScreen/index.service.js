import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import NavigationService from "../../../config/NavigationService";
import { Fonts, Images, Colors, ApiCaller, Responsive } from "../../../config/";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AppButton, CharacterListTile } from "../../../components";
import moment from "moment";
import md5 from "md5";
import { ChangeCharacterScreen } from "../../../screens";

const ChangeCharacterServiceComponent = ({ children, navigation, route }) => {
  //-------------------------------------------------CONSTANTS-------------------------------------------------

  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);

  //-------------------------------------------------HOOKS-------------------------------------------------

  const [search, setSearch] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharater] = useState();
  const [selectedCharacterId, setSelectedCharacterId] = useState();

  //-------------------------------------------------FUNCTIONS-------------------------------------------------

  const loadData = async (offset = 0) => {
    let response = await ApiCaller.Get(
      `characters?nameStartsWith=${search}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    console.log("responseeeee: ", response);
    let data = response.data.data.results;
    console.log("the data: ", data);
    let names = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image:
          item.thumbnail.path + "/standard_xlarge." + item.thumbnail.extension,
      };
    });
    console.log("names: ", names);
    setCharacterData(offset ? characterData.concat(names) : names);
    setIsLoading(false);
  };

  const onSearchPress = () => {
    console.log("search pressed");
    console.log("again char data: ", characterData);

    setIsLoading(true);
    loadData();
  };

  const loadMoreData = () => {
    //setOffset(characterData.length+10)
    loadData(characterData.length);
  };

  const onSelectCb = () => {
    NavigationService.navigate('HomeScreen', {selectedCharacter: selectedCharacter,})
  }

  const onCharacterTap = (item) => {
    setSelectedCharater({
      id: item.id,
      name: item.name,
      image: item.image
    })
    
    selectedCharacterId == item.id ? setSelectedCharacterId() : setSelectedCharacterId(item.id)
    console.log('sid',selectedCharacterId)
    console.log('itemid',item.id)
  };

  const clearSearch = () => {
    setCharacterData([]),
      console.log("Chardata: ", characterData);
  };

  const onPressCb = () => setModalVisible(true);

  //-------------------------------------------------RENDER COMPONENT FUNCTIONS-------------------------------------------------

  const searchComponent = () => (
    <View>
      <TextInput
        placeholder={"Enter Character Name. e.g. Spider-Man"}
        placeholderTextColor={Colors.WhiteText}
        style={styles.textInputStyle}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      <View style={{ alignSelf: "center", marginTop: 10 }}>
        <AppButton
          text="Search"
          width={100}
          height={30}
          onPress={() => onSearchPress()}
        />
        <TouchableOpacity
          onPress={() => {
            clearSearch();
          }}
        >
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              fontFamily: Fonts["Badaboom"],
              color: Colors.White,
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchView}>
        {isLoading ? (
          <View style={styles.loadingStyle}>
            <ActivityIndicator />
          </View>
        ) : characterData == undefined ? (
          <Text style={styles.textStyle}>Please Search some character</Text>
        ) : !characterData.length ? (
          <Text style={styles.textStyle}>No Data</Text>
        ) : (
          <FlatList
            data={characterData}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.4}
            onEndReached={() => {
              loadMoreData();
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.tileView}>
                  <CharacterListTile
                    name={item.name}
                    imageUri={item.image}
                    id={item.id}
                    disabled={false}
                    onPress={() => {
                      onCharacterTap(item);
                    }}
                    selectedCharacter = {selectedCharacterId}
                    />
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );

  // _________________________________________________________________________________________________________________________

  return children({
    navigation,
    loadMoreData,
    onPressCb,
    searchComponent,
    onSelectCb,
    selectedCharacter,
    selectedCharacterId,
  });
};

export default ChangeCharacterServiceComponent;

const styles = StyleSheet.create({
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
    marginHorizontal: "12%",
    textAlign: "center",
    color: Colors.WhiteText,
    borderBottomColor: Colors.White,
    borderBottomWidth: 1,
  },
  searchView: {
    width: Responsive.HorizontalSize(300),
    height: Responsive.VerticalSize(500),
    backgroundColor: Colors.Primary,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 15,
  },
  loadingStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.White,
  },
  tileView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
