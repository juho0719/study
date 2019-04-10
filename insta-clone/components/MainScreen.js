import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import HomeTab from './AppTabNavigator/HomeTab';
import SearchTab from './AppTabNavigator/SearchTab';
import AddMediaTab from './AppTabNavigator/AddMediaTab';
import LikesTab from './AppTabNavigator/LikesTab';
import ProfileTab from './AppTabNavigator/ProfileTab';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

// 하단 탭 네비게이터 생성
const AppTabNavigator = createBottomTabNavigator({
	HomeTab: { screen: HomeTab },
	SearchTab: { screen: SearchTab },
	AddMediaTab: { screen: AddMediaTab },
	LikesTab: { screen: LikesTab },
	ProfileTab: { screen: ProfileTab },
});

const AppTabContainer = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component {
	// navigationOptions 코드 추가
	static navigationOptions = {
		headerLeft: <Icon name='ios-camera' style={{ paddingLeft: 10 }} />,
		title: 'Instagram',
		headerRight: <Icon name='ios-send' style={{ paddingRight: 10 }} />,
	}

	render() {
		return (
			<AppTabContainer />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});