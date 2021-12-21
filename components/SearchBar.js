import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const SearchBar = () => {

    const handleOnChangeText = () => {
        
    }

    return (
		<TextInput
			placeholder="Search Deal"
			onChangeText={handleOnChangeText}
            style={styles.input}
		/>
	);
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 20,
    }   
})
 
export default SearchBar;