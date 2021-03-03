import {useEffect} from 'react'
import NavigationService from '../../../config/NavigationService'
const SplashServiceComponent = ({
    children,
    navigation,
}) => {


//-------------------------------------------------EFFECTS-------------------------------------------------

    useEffect(()=>{
        setTimeout(() => {
            NavigationService.reset_0("OnboardingScreen");
          }, 2400);
    },[])
//_________________________________________________________________________________________________________________________


return children({
        navigation
    })
}

export default SplashServiceComponent;