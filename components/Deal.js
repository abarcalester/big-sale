import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../Utils';
const Deal = ({ deal, setCurrentDealID }) => {
    const {title, price, cause, media} = deal;
    
    const handlePress = () => {
        setCurrentDealID(deal.key)
    }

    return (  
        <TouchableOpacity style={styles.deal} onPress={handlePress}>
            <Image style={styles.image} source={{ uri: Object.values(media)[0] }}/>
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>{formatPrice(price)}</Text>
                    <Text style={styles.cause}>{cause.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    deal: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
    },
    cause: {
        flex: 1,
        textAlign: 'right'
    },
    price: {
        flex: 2
    },
})
 
export default Deal;