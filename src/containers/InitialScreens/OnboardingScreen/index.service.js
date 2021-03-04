import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import NavigationService from "../../../config/NavigationService";
import { Fonts, Colors, ApiCaller, Responsive } from "../../../config/";
import { Pagination } from "react-native-snap-carousel";
import { AppButton, CharacterListTile } from "../../../components";
import moment from "moment";
import md5 from "md5";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { showToast } from "../../../config/Utils";

const OnboardingServiceComponent = ({ children, navigation }) => {
  //-------------------------------------------------CONSTANTS-------------------------------------------------
  const carousel = useRef();
  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);
  let initialState = [];
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
  const [loadMore, setLoadMore] = useState(false);
  const [selectedCharacter, setSelectedCharater] = useState();
  const [selectedCharacterId, setSelectedCharacterId] = useState();
  const [info, setInfo] = useState("Please Enter Some Character to Search");

  //-------------------------------------------------FUNCTIONS-------------------------------------------------

  const loadData = async (offset = 0, loadMore) => {
    loadMore ? setIsLoading(false) : setIsLoading(true);
    setLoadMore(loadMore);
    let response = await ApiCaller.Get(
      `characters?nameStartsWith=${search}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );

    if (response) {
      if (response.status == 200) {
        if (
          response?.data?.data?.offset == 0 &&
          response?.data?.data?.total == 0 &&
          response?.data?.data?.count == 0
        ) {

          setInfo("Please try some different character");
          showToast("No Data Found", "success");
          setCharacterData([]);
          setLoadMore(false);
          setIsLoading(false);

        } else {
          if(response.data.data.count == 0 && response.data.data.total != 0)
          {
            showToast('No more data found!', 'success')
            setLoadMore(false)
          }
          else{
            let data = response.data.data.results;
          let names = data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              image:
                item.thumbnail.path +
                "/standard_xlarge." +
                item.thumbnail.extension,
            };
          });
          setCharacterData(offset ? characterData.concat(names) : names);
          setIsLoading(false);
          setLoadMore(false);
          }
        }
      } else {
        showToast(response?.data?.code);
      }
    } else {
      showToast("Some Error Occurred!");
    }
  };

  const onSearchPress = () => {
    search ? loadData() : showToast('Please enter something')
  };

  const loadMoreData = () => {
    loadData(characterData.length, true);
  };

  const onSnapToItem = (index) => {
    setActiveIndex(index);
  };

  const onSelectCb = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify("user"));
      await AsyncStorage.setItem(
        "character",
        JSON.stringify(selectedCharacter)
      );
    } catch {}
    NavigationService.reset_0("HomeScreen");
  };

  const onCharacterTap = (item) => {
    setSelectedCharater({
      id: item.id,
      name: item.name,
      image: item.image,
    });
    selectedCharacterId == item.id
      ? setSelectedCharacterId()
      : setSelectedCharacterId(item.id);
  };

  const clearSearch = () => {
    setCharacterData([]);
  };

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
              width={Responsive.HorizontalSize(100)}
              height={Responsive.VerticalSize(30)}
              onPress={() => onSearchPress()}
            />
            <TouchableOpacity
              onPress={() => {
                clearSearch();
              }}
            >
              <Text
                style={{
                  marginTop: Responsive.VerticalSize(10),
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
            {isLoading && !loadMore ? (
              <View style={styles.loadingStyle}>
                <ActivityIndicator size={"small"} color={Colors.White} />
              </View>
            ) : !characterData.length ? (
              <Text style={styles.textStyle}>{info}</Text>
            ) : (
              <View>
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
                          selectedCharacter={selectedCharacterId}
                        />
                      </View>
                    );
                  }}
                />
                {loadMore && (
                  <View>
                    <ActivityIndicator size="small" color={Colors.White} />
                  </View>
                )}
              </View>
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
    height: Responsive.VerticalSize(554),
    width: Responsive.HorizontalSize(310),
    backgroundColor: "rgba(255, 255, 255, 0.28)",
    borderRadius: 15,
    marginTop: Responsive.VerticalSize(20),
  },
  headingStyle: {
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontLarge,
    color: Colors.White,
    marginHorizontal: "10%",
    textAlign: "center",
    marginTop: "2%",
  },
  textStyle: {
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontMedium,
    color: Colors.White,
    marginHorizontal: "10%",
    marginTop: "10%",
  },
  textInputStyle: {
    fontFamily: Fonts["Badaboom"],
    fontSize: Responsive.FontRegular,
    marginHorizontal: "12%",
    textAlign: "center",
    color: Colors.WhiteText,
    borderBottomColor: Colors.White,
    borderBottomWidth: 1,
  },
  searchView: {
    width: "90%",
    height: Responsive.VerticalSize(200),
    backgroundColor: Colors.Primary,
    alignSelf: "center",
    marginTop: Responsive.VerticalSize(10),
    borderRadius: 15,
    paddingVertical: Responsive.VerticalSize(10)
  },
  loadingStyle: {
    flex: 1,
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
