import React, { useEffect, useState } from "react";
import NavigationService from "../../../config/NavigationService";
import { ApiCaller } from "../../../config/";
import moment from "moment";
import md5 from "md5";
import AsyncStorage from "@react-native-community/async-storage";
import { showToast } from "../../../config/Utils";

const HomeScreenServiceComponent = ({ children, navigation, route }) => {

  //-------------------------------------------------CONSTANTS-------------------------------------------------


  const privateKey = "4e7b6885fbb0e9d91aec0d9d60bbd6af";
  const publicKey = "c5ec22114831d4a03079737c05140b314216d7a9";
  const ts = moment().unix();
  const md5Hash = md5(ts + publicKey + privateKey);

  // const selectedCharacter = route.params.selectedCharacter
  // let id = selectedCharacter.id
  // let image = selectedCharacter.image
  // let name = selectedCharacter.name

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
      console.log('parseddd: ', parsedCharacter.id)

      if (character) {
        setId(parsedCharacter.id)
        setImage(parsedCharacter.image)
        setName(parsedCharacter.name)
      } 
    });
  };

  console.log('id: ', id)
  console.log('image: ', image)
  console.log('name: ', name)



  const loadData = async (offset=0, loadMore) => {
    if(id){
      console.log('1st loadmore: ', loadMore)
      loadMore == true ? setIsLoading(false) : setIsLoading(true)
      console.log('1st is Liading: ', isLoading)

      setLoadMore(true)
      // setIsLoading(true);
    // loadMore == false ? setIsLoading(true) : setIsLoading(false) 
    let response = await ApiCaller.Get(
      `comics?characters=${id}&limit=10&offset=${offset}&ts=${ts}&apikey=${privateKey}&hash=${md5Hash}`
    );
    console.log('response: ', response)
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
        console.log('total: ', total)
        console.log('data: ', data.length)
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
    // setLoadMore(true) 
    loadData(comicData.length, true)
    // setLoadMore(false)
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

