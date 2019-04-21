import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'native-base';
import HomeTab from './components/AppTabNavigator/HomeTab';
import SearchTab from './components/AppTabNavigator/SearchTab';
import AddMediaTab from './components/AppTabNavigator/AddMediaTab';
import LikesTab from './components/AppTabNavigator/LikesTab';
import ProfileTab from './components/AppTabNavigator/ProfileTab';


// 하단 탭 네비게이터 생성
const AppTabNavigator = createMaterialTopTabNavigator({
	HomeTab: { 
    screen: HomeTab,
    navigationOptions: {
      headerLeft: <Icon name='ios-camera' style={{ paddingLeft: 10 }} />,
      title: 'Instagram',
      headerRight: <Icon name='ios-send' style={{ paddingRight: 10 }} />
    } 
  },
	SearchTab: { 
    screen: SearchTab,
    navigationOptions: {
      headerLeft: <Icon name='ios-camera' style={{ paddingLeft: 10 }} />,
      title: 'Instagram',
      headerRight: <Icon name='ios-send' style={{ paddingRight: 10 }} />
    }
  },
	AddMediaTab: { screen: AddMediaTab },
	LikesTab: { screen: LikesTab },
	ProfileTab: { screen: ProfileTab },
}, {
	animationEnabled: true,
	swipeEnabled: true,
	tabBarPosition: "bottom",
	tabBarOptions: {
		style: {
			...Platform.select({
				ios: {
					backgroundColor: 'white'
				}
			})
		},
		iconStyle: { height: 100 },
		activeTintColor: '#000',
		inactiveTintColor: '#d1cece',
		upperCaseLabel: false,
		showLabel: false,
		showIcon: true
	}
});

export default createAppContainer(AppTabNavigator);

