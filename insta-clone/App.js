import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { StyleSheet, Platform } from 'react-native';
import HomeTab from './components/AppTabNavigator/HomeTab';
import SearchTab from './components/AppTabNavigator/SearchTab';
import AddMediaTab from './components/AppTabNavigator/AddMediaTab';
import LikesTab from './components/AppTabNavigator/LikesTab';
import ProfileTab from './components/AppTabNavigator/ProfileTab';

// 하단 탭 네비게이터 생성
const AppTabNavigator = createMaterialTopTabNavigator({
	HomeTab: { screen: HomeTab },
	SearchTab: { screen: SearchTab },
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

