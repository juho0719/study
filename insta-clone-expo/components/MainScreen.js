import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Icon } from 'native-base';

export default class MainScreen extends Component {
	// navigationOptions 코드 추가
	static navigationOptions = {
		headerLeft: <Icon name='ios-camera' style={{ paddingLeft: 10 }} />,
		title: 'Instagram',
		headerRight: <Icon name='ios-send' style={{ paddingRight: 10 }} />,
	}

	render() {
		const { AppTabContainer } = this.props;
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