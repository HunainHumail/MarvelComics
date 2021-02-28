import {useState, useEffect} from 'react'

const SplashServiceComponent = ({
    children,
    navigation,
    route,
}) => {
    return children({
        navigation
    })
}

export default SplashServiceComponent;