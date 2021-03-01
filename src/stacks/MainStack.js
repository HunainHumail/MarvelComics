import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'
import {InitialStack} from './InitialStack'
import {HomeStack} from './HomeStack'

export const MainStack = (props) => {
    const MainStack = createStackNavigator();
    const AppStacks = [...InitialStack, ...HomeStack];
    return(
        <>
        <MainStack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{
            headerShown: false
        }}
        >
            {AppStacks.map((stack) => (
                <MainStack.Screen {...stack}/>
            ))}
        </MainStack.Navigator>
        </>
    )
}