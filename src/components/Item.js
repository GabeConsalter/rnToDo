import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Item component
 *
 * @param {*} props
 * @prop {string} text
 * @prop {bool} done=false
 *
 * @author Gabriel Consalter
 * @since 1.0.0
 */
const Item = props => {
	const styles = StyleSheet.create({
		btnStatus: {
			backgroundColor: props.done ? '#348' : 'transparent',
			borderColor: '#348',
			borderRadius: 16,
			borderWidth: 1,
			height: 32,
			width: 32
		},
		container: {
			alignItems: 'center',
			backgroundColor: `#000000${props.done ? '33' : '55'}`,
			borderRadius: 7,
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 8,
			paddingHorizontal: 8,
			paddingVertical: 16,
			width: '100%'
		},
		text: {
			color: `#FFFFFF${props.done ? '33' : 'FF'}`
		}
	});

	return (
		<TouchableOpacity style={styles.container}>
			<View>
				<Text style={styles.text}>{props.text}</Text>
			</View>
			<TouchableOpacity
				testID="btnStatus"
				onPress={() => props.onSetDone(!props.done)}
				style={styles.btnStatus}
			/>
		</TouchableOpacity>
	);
};

Item.propTypes = {
	done: PropTypes.bool,
	onSetDone: PropTypes.func,
	text: PropTypes.string.isRequired
};

Item.defaultProps = {
	done: false
};

Item.displayName = 'Item';

export default Item;