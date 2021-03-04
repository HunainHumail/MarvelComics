/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/stacks/MainStack";
import {NavigationService} from './src/config';
import {Colors} from './src/config/'
import { Root } from "native-base";

const App: () => React$Node = () => {
  return (
    <Root>
      <NavigationContainer ref={(ref) => NavigationService.setTopLevelNavigator(ref)} theme={{colors: {background: Colors.Primary}}}>
      <MainStack/>
      </NavigationContainer> 
    </Root>
  );
};

export default App;
