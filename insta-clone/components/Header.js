import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default class Header extends Component {
	static navigationOptions = {
		headerLeft: <Icon name='ios-camera' style={{ paddingLeft: 10 }} />,
		title: 'Instagram',
		headerRight: <Icon name='ios-send' style={{ paddingRight: 10 }} />
	}

	render() {
		return (
			<View style={style.container}>
				<Text>Header</Text>
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});