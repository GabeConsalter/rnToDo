import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Item = props => {
	const [done, setDone] = useState(props.item.done),
		styles = StyleSheet.create({
			btnStatus: {
				backgroundColor: done ? '#348' : 'transparent',
				borderColor: '#348',
				borderRadius: 16,
				borderWidth: 1,
				height: 32,
				width: 32
			},
			container: {
				alignItems: 'center',
				backgroundColor: `#000000${done ? '33' : '55'}`,
				borderRadius: 7,
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginBottom: 8,
				paddingHorizontal: 8,
				paddingVertical: 16,
				width: '100%'
			},
			text: {
				color: `#FFFFFF${done ? '33' : 'FF'}`
			}
		});

	return (
		<TouchableOpacity style={styles.container}>
			<View>
				<Text style={styles.text}>{props.item.text}</Text>
			</View>
			<TouchableOpacity
				testID="btnStatus"
				onPress={() => setDone(!done)}
				style={styles.btnStatus}
			/>
		</TouchableOpacity>
	);
};

Item.propTypes = {
	item: PropTypes.object.isRequired

};

Item.displayName = 'Item';

export default Item;