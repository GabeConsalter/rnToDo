import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import { Item } from '.';

const List = props => (
	<FlatList
		style={styles.container}
		data={props.tasks}
		renderItem={({ item: task }) => (
			<Item item={task} />
		)}
	/>
);

List.propTypes = {
	tasks: PropTypes.array
};

List.defaultProps = {
	tasks: []
};

List.displayName = 'List';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%'
	}
});

export default List;