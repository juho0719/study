import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './components/MainScreen';

const AppStackNavigator = createStackNavigator ({
  Main: {
    screen: MainScreen    // MainScreen 컴포넌트 네비게이터에 등록
  }
});

export default createAppContainer(AppStackNavigator);

