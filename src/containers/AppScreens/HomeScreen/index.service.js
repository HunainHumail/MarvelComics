import React, { useEffect, useState, useRef } from "react";
import NavigationService from "../../../config/NavigationService";
import { Fonts, Images, Colors, ApiCaller } from "../../../config/";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AppButton, CharacterListTile } from "../../../components";
import moment from "moment";
import md5 from "md5";

const HomeScreenServiceComponent = ({ children, navigation, route }) => {
  console.log('NAVIGATION PROPS: ', route.params)

  //-------------------------------------------------CONSTANTS-------------------------------------------------


  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);
  const selectedCharacter = route.params.selectedCharacter

  console.log('SELECTEDCHARACTER: ', selectedCharacter)
  let id = selectedCharacter.id
  let image = selectedCharacter.image
  let name = selectedCharacter.name

  //-------------------------------------------------HOOKS-------------------------------------------------


  const [comicData, setComicData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);


  //-------------------------------------------------FUNCTIONS-------------------------------------------------


  const loadData = async (offset=0) => {
    setIsLoading(true);

    let response = await ApiCaller.Get(
      `comics?characters=${id}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    let data = response.data.data.results

    console.log('dataaaa: ', data)
    let list = data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        issueNumber: item.issueNumber,
        price: item.prices[0].price,
        imageUrl: item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension,
      };
    });
    console.log("names: ", list);
    setComicData(offset ? comicData.concat(list) : list);
    // setCharacterData(names)
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

  useEffect(()=>{
    loadData()
  }, [])

  console.log('COMIC DATAAA: ', comicData)
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
    onPressChangeCharacter
  });
};

export default HomeScreenServiceComponent;

