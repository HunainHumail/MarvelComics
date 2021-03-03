import React, { useEffect, useState } from "react";
import NavigationService from "../../../config/NavigationService";
import { ApiCaller } from "../../../config/";
import moment from "moment";
import md5 from "md5";
import AsyncStorage from "@react-native-community/async-storage";

const HomeScreenServiceComponent = ({ children, navigation, route }) => {

  //-------------------------------------------------CONSTANTS-------------------------------------------------


  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);
  const selectedCharacter = route.params.selectedCharacter
  // let id = selectedCharacter.id
  // let image = selectedCharacter.image
  // let name = selectedCharacter.name

  //-------------------------------------------------HOOKS-------------------------------------------------


  const [comicData, setComicData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')


  //-------------------------------------------------FUNCTIONS-------------------------------------------------

  const getCharacter = async () => {
    await AsyncStorage.getItem("character").then(async (character) => {
      if (character) {
        setId(character.id)
        setImage(character.image)
        setName(character.name)
      } 
    });
  };



  const loadData = async (offset=0) => {
    setIsLoading(true);

    let response = await ApiCaller.Get(
      `comics?characters=${id}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    let data = response.data.data.results

    let list = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        issueNumber: item.issueNumber,
        price: item.prices[0].price,
        imageUrl: item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension,
      };
    });
    setComicData(offset ? comicData.concat(list) : list);
    setIsLoading(false);
  }


  const loadMoreData = () => {    
    loadData(comicData.length)
  }


  const handleModal = (bool = !modalVisible) => {
    setModalVisible(bool);
  };

  const handleCancel=() => setModalVisible(false);
    

  const onPressCb = () => setModalVisible(true)

  const onPressChangeCharacter = () => NavigationService.reset_0('ChangeCharacterScreen')
  
  //-------------------------------------------------EFFECTS-------------------------------------------------

  useEffect(async()=>{
    await getCharacter()
    loadData()
  }, [])

//_________________________________________________________________________________________________________________________


  return children({
    navigation,
    comicData,
    loadMoreData,
    modalVisible,
    handleModal,
    handleCancel,
    onPressCb,
    image,
    name,
    onPressChangeCharacter,
    isLoading
  });
};

export default HomeScreenServiceComponent;

