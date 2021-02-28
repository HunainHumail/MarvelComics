import {useState, useEffect} from 'react'
import NavigationService from '../../../config/NavigationService'
const OnboardingServiceComponent = ({
    children,
    navigation,
    route,
}) => {
    
    return children({
        navigation
    })
}

export default OnboardingServiceComponent;