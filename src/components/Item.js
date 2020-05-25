import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Item = props => (
	<TouchableOpacity style={styles.container}>
		<View>
			<Text style={styles.text}>{props.item.text}</Text>
		</View>
		<TouchableOpacity style={styles.btnStatus} />
	</TouchableOpacity>
);

Item.propTypes = {
	item: PropTypes.object.isRequired
};

Item.displayName = 'Item';

const styles = StyleSheet.create({
	btnStatus: {
		borderColor: '#348',
		borderRadius: 16,
		borderWidth: 1,
		height: 32,
		width: 32
	},

	container: {
		alignItems: 'center',
		backgroundColor: '#00000055',
		borderRadius: 7,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
		paddingHorizontal: 8,
		paddingVertical: 16,
		width: '100%'
	},

	text: {
		color: 'white'
	}
});

export default Item;