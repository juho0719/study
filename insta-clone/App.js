import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './components/MainScreen';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';

const HeaderStackNavigator = createStackNavigator ({
  Header: {
    screen: Header
  },
  BottomNavigator: AppTabNavigator
});

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

export default createAppContainer(AppStackNavigator);

