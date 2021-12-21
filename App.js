import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';
import api from './api/DealsService'
import Deals from './components/Deals';
import Detail from './components/Detail';

export default function App() {
	const [deals, setDeals] = useState({})
    const [currentDealID, setCurrentDealID] = useState('')

    const titleXPos = new Animated.Value(0)
    const animateTitle = (direction = 1) => {
        const width = (Dimensions.get('window').width - 200) / 2
        Animated.timing(titleXPos, {
            toValue: direction * width,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false
        }).start(({finished}) => {
            if (finished) {
                animateTitle(-direction)
            }
        })
    } 
    
    const getCurrentDeal = () => deals.find(deal => deal.key === currentDealID)
    
    const handleOnBack = () => {
        setCurrentDealID('')
    }

    useEffect(() => {
        animateTitle()
    }, [])

    useEffect(() => {
        const getData = async () => {
            const data = await api.fetchData()
            setDeals(data)
        }
        getData()
    }, [deals]);
	return (
	<>
		{
            currentDealID 
            ? (
                <View style={styles.main}>
                    <Detail deal={getCurrentDeal()} handleOnBack={handleOnBack}/>
                </View>
            )
            : deals.length 
                ? (
                    <Deals deals={deals} setCurrentDealID={setCurrentDealID}/>
                )
                : (
                    <Animated.View style={[{left: titleXPos }, styles.container]}>
                        <Text style={styles.header}>Loading...</Text>
                    </Animated.View>
                )
        }
	  <StatusBar style="auto" />
	</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 40,
	},
    main: {
        marginTop: 50,
    }
});
