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
  ActivityIndicator,
} from "react-native";
import NavigationService from "../../../config/NavigationService";
import { Fonts, Images, Colors, ApiCaller } from "../../../config/";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AppButton, CharacterListTile } from "../../../components";
import moment from "moment";
import md5 from "md5";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const OnboardingServiceComponent = ({ children, navigation, route }) => {

  //-------------------------------------------------CONSTANTS-------------------------------------------------
  const carousel = useRef();
  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);
  let initialState = []
  let sliders = [
    {
      title: "Your favourite Marvel Character Comics!",
    },
    {
      title: "INPUT YOUR FAVOURITE MARVEL CHARACTER",
      input: true,
    },
  ];

  //-------------------------------------------------HOOKS-------------------------------------------------

  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [characterData, setCharacterData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharater] = useState();
  const [selectedCharacterId, setSelectedCharacterId] = useState();
  const [offset, setOffset] = useState(0)

 //-------------------------------------------------FUNCTIONS-------------------------------------------------


  const loadData = async (offset=0) => {
    let response = await ApiCaller.Get(
      `characters?nameStartsWith=${search}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    let data = response.data.data.results;
    let names = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image:
          item.thumbnail.path + "/standard_xlarge." + item.thumbnail.extension,
      };
    });
    setCharacterData(offset ? characterData.concat(names) : names);
    setIsLoading(false);
  }



  const onSearchPress =  () => {
    setIsLoading(true);
    loadData()
  };



  const loadMoreData = () => {    
    loadData(characterData.length)
  }



  const onSnapToItem = (index) => {
    setActiveIndex(index);
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
  };


 
  const clearSearch = () => {
    setCharacterData([])
  }



  //-------------------------------------------------RENDER COMPONENT FUNCTIONS-------------------------------------------------

  const _renderItem = ({ item, index }) => (
    <View style={styles.cardStyle}>
      <Text style={styles.headingStyle}>{item.title}</Text>
      {item.input ? (
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
            <TouchableOpacity onPress={()=>{clearSearch()}}><Text style={{marginTop: 5,textAlign:'center', fontFamily:Fonts['Badaboom'], color: Colors.White}}>Clear</Text></TouchableOpacity>
          </View>
          <View style={styles.searchView}>
            {isLoading ? (
              <View style={styles.loadingStyle}>
                <ActivityIndicator size = {'small'} color = {Colors.White}/>
              </View>
            ) : characterData == undefined ? (
              <Text style={styles.textStyle}>Please Search some character</Text>
            ) : (
              !characterData.length ? <Text style={styles.textStyle}>
                No Data
              </Text>:<FlatList
                data={characterData}
                keyExtractor={(item,index) => index.toString()}
                onEndReachedThreshold={0.4}
                onEndReached={()=>{loadMoreData()}}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.tileView}>
                      <CharacterListTile
                        name={item.name}
                        imageUri={item.image}
                        id={item.id}
                        disabled={false}
                        onPress={()=>{onCharacterTap(item)}}
                        selectedCharacter = {selectedCharacterId}
                      />
                    </View>
                  );
                }}
              />
            )}
          </View>
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

  let pagination = () => {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Pagination
          dotsLength={sliders.length}
          activeDotIndex={activeIndex}
          dotContainerStyle={{
            marginHorizontal: -5,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: Colors.White,
          }}
          inactiveDotStyle={{
            borderColor: Colors.White,
            // Define styles for inactive dots here
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={0.6}
        />
      </KeyboardAvoidingView>
    );
  };

//_________________________________________________________________________________________________________________________
  return children({
    navigation,
    sliders,
    carousel,
    activeIndex,
    _renderItem,
    pagination,
    onSnapToItem,
    selectedCharacter,
    onSelectCb,
    selectedCharacterId,
  });
};

export default OnboardingServiceComponent;

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
    width: "90%",
    height: "50%",
    backgroundColor: Colors.Primary,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 15
  },
  loadingStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.White,
  },
  tileView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
