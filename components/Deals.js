import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Deal from './Deal';
const Deals = ({ deals, setCurrentDealID }) => {
	return (
		<View style={styles.list}>
			<Text>Deals</Text>
			{/* {deals.map(deal => (
                <Text key={deal.key}>{deal.title}</Text>
            ))} */}
			<FlatList
				data={deals}
				renderItem={({ item }) => <Deal deal={item} setCurrentDealID={setCurrentDealID}/>}
			/>
		</View>
	);
};
 
const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        padding: 50,
    }
})

export default Deals;