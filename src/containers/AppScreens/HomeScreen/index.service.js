import React, { useEffect, useState } from "react";
import NavigationService from "../../../config/NavigationService";
import { ApiCaller } from "../../../config/";
import AsyncStorage from "@react-native-community/async-storage";
import { showToast, PRIVATE_KEY, MD5_HASH, TIME_STAMP } from "../../../config/Utils";

const HomeScreenServiceComponent = ({ children, navigation, route }) => {

  //-------------------------------------------------CONSTANTS-------------------------------------------------


  const privateKey = PRIVATE_KEY;
  const ts = TIME_STAMP;
  const md5Hash = MD5_HASH;

  //-------------------------------------------------HOOKS-------------------------------------------------


  const [comicData, setComicData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [total, setTotal] = useState('')

  //-------------------------------------------------FUNCTIONS-------------------------------------------------

  const getCharacter = async () => {
    await AsyncStorage.getItem("character").then(async (character) => {
      let parsedCharacter= JSON.parse(character)

      if (character) {
        setId(parsedCharacter.id)
        setImage(parsedCharacter.image)
        setName(parsedCharacter.name)
      } 
    });
  };


  const loadData = async (offset=0, loadMore) => {
    if(id){
      loadMore == true ? setIsLoading(false) : setIsLoading(true)

      setLoadMore(true)
    let response = await ApiCaller.Get(
      `comics?characters=${id}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    if (response)
    {
      if (response.status == 200) {
        if(response.data.data.count == 0 && response.data.data.total != 0)
        {
          showToast('No More Data found!', 'success')
          setLoadMore(false)
        }
        else
        {
        let data = response.data.data.results
        let total = response.data.data.total
        setTotal(total)
        let list = data.map((item) => {
          return {
            id: item.id,
            title: item.title,
            issueNumber: item.issueNumber,
            price: item.prices[0].price,
            imageUrl: item.thumbnail.path + "/portrait_uncanny." + item.thumbnail.extension,
          };
        });
        data.length == 0 ? setComicData('null') :  setComicData(offset ? comicData.concat(list) : list);
        setIsLoading(false);
        setLoadMore(false);
        }
      }
      else {
        showToast(response?.data?.code)
      }
    }
    else {
      showToast('Some Error Occured')
    }
    }
  }


  const loadMoreData = () => {   
    loadData(comicData.length, true)
  }


  const handleModal = (bool = !modalVisible) => {
    setModalVisible(bool);
  };

  const handleCancel=() => setModalVisible(false);
    

  const onPressCb = () => setModalVisible(true)

  const onPressChangeCharacter = () => NavigationService.reset_0('ChangeCharacterScreen')
  
  //-------------------------------------------------EFFECTS-------------------------------------------------

  useEffect(()=>{
    getCharacter()
    loadData()
  }, [id,image,name])

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
    isLoading,
    loadMore,
    total,
  });
};

export default HomeScreenServiceComponent;

