import {useState, useEffect} from 'react'
import NavigationService from '../../../config/NavigationService'
const SplashServiceComponent = ({
    children,
    navigation,
}) => {
    useEffect(()=>{
        setTimeout(() => {
            NavigationService.reset_0("OnboardingScreen");
          }, 2400);
    },[])
    return children({
        navigation
    })
}

export default SplashServiceComponent;