import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import NavigationService from "../../../config/NavigationService";
import { Fonts, Colors, ApiCaller, Responsive } from "../../../config/";
import { AppButton, CharacterListTile } from "../../../components";
import AsyncStorage from "@react-native-community/async-storage";
import { showToast, PRIVATE_KEY, MD5_HASH, TIME_STAMP } from "../../../config/Utils";


const ChangeCharacterServiceComponent = ({ children, navigation, route }) => {
  //-------------------------------------------------CONSTANTS-------------------------------------------------

  const privateKey = PRIVATE_KEY;
  const ts = TIME_STAMP;
  const md5Hash = MD5_HASH;

  //-------------------------------------------------HOOKS-------------------------------------------------

  const [search, setSearch] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [selectedCharacter, setSelectedCharater] = useState();
  const [selectedCharacterId, setSelectedCharacterId] = useState();
  const [info, setInfo] = useState('Please Enter Some Character to Search')

  //-------------------------------------------------FUNCTIONS-------------------------------------------------

  const loadData = async (offset = 0, loadMore) => {
    loadMore ? setIsLoading(false) : setIsLoading(true)

    setLoadMore(true)
    let response = await ApiCaller.Get(
      `characters?nameStartsWith=${search}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );

    if(response){
    if(response.status == 200) {

      if (response?.data?.data?.offset == 0 && response?.data?.data?.total == 0 && response?.data?.data?.count == 0 )
      {
        setCharacterData([])
        setInfo('Please try some different character')
        showToast('No Data Found', 'success')
        setIsLoading(false)

      }
      else
      {
        if(response.data.data.count == 0 && response.data.data.total != 0)
       {
          showToast('No more data found!', 'success')
          setLoadMore(false)
       }

       else 
       {
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
      setLoadMore(false)
        }
       }
    }
    else {
      showToast(response?.data?.code)
    }
    }
    else {
      showToast('Some Error Occurred!')
    }
  };

  const onSearchPress = () => {
    search ? loadData() : showToast('Please enter something')
  };

  const loadMoreData = () => {
    loadData(characterData.length, true)
  };

  const onSelectCb = async() => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify("user"));
      await AsyncStorage.setItem("character", JSON.stringify(selectedCharacter));
    } catch {}

    NavigationService.reset_0('HomeScreen')
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
  };

  const onPressCb = () => setModalVisible(true);

  //-------------------------------------------------RENDER COMPONENT FUNCTIONS-------------------------------------------------

  const searchComponent = (info) => (
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
            <ActivityIndicator size ={'small'} color={Colors.White} />
          </View>
        ) : characterData.length < 1 ? (
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
                    selectedCharacter = {selectedCharacterId}
                    />
                </View>
              );
            }}
          />
          {
          loadMore && <View style={{flex:1, marginBottom: Responsive.VerticalSize(20)}}>
                  <ActivityIndicator size="small" color={Colors.White} />
                </View>}
            </View>
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
    info, 
    isLoading,
    loadMore
  });
};

export default ChangeCharacterServiceComponent;

const styles = StyleSheet.create({
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
