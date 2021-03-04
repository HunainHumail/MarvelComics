import {useEffect} from 'react'
import NavigationService from '../../../config/NavigationService'
import AsyncStorage from "@react-native-community/async-storage";

const SplashServiceComponent = ({
    children,
    navigation,
}) => {


//-------------------------------------------------FUNCTIONS-------------------------------------------------

const getUser = async () => {
  await AsyncStorage.getItem("character").then(async (character) => {
    if (JSON.parse(character)) {
      setTimeout(() => {
        NavigationService.reset_0("HomeScreen");
      }, 2400);
    } else {
      setTimeout(() => {
        NavigationService.reset_0("OnboardingScreen");
      }, 2400);
    }
  });
};


//-------------------------------------------------EFFECTS-------------------------------------------------

  useEffect(() => {
    getUser();
  }, []);

//_________________________________________________________________________________________________________________________


return children({
        navigation
    })
}

export default SplashServiceComponent;