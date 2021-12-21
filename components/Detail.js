import React, {useState, useEffect, useRef} from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import { formatPrice } from '../Utils';
import api from '../api/DealsService.js'

const Detail = ({ deal, handleOnBack }) => {
    const [dealDetail, setDealDetail] = useState(deal)
    const {title, price, cause, media, user, description} = dealDetail;
    const [dealIndex, setDealIndex] = useState(0)
    const imageXPos = useRef(new Animated.Value(0)).current;
    const [imageIndex, setImageIndex] = useState(0)
    const width = Dimensions.get('window').width;
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => imageXPos.setValue(gesture.dx),
        onPanResponderRelease: (event, gesture) => {
            if(Math.abs(gesture.dx) > width * 0.4) {
                const direction = Math.sign(gesture.dx);

                Animated.timing(imageXPos, {
                    toValue: direction * width,
                    duration: 300,
                    useNativeDriver: false
                }).start(() => {
                    if(Object.values(media)[imageIndex + direction * -1]) {
                        setImageIndex(() => imageIndex + direction * -1)
                        imageXPos.setValue(width * direction * -1)
                    } else {
                        Animated.spring(imageXPos, {  
                            toValue: 0,
                            useNativeDriver: false
                        }).start( )
                    }
                })
            } else {
                Animated.spring(imageXPos, {  
                    toValue: 0,
                    useNativeDriver: false
                }).start()
            }
        }
    })
    useEffect(() => {
        Animated.spring(imageXPos, {
            toValue: 0,
            useNativeDriver: false
        }).start( )
    }, [imageIndex]);

    useEffect(() => {
        const getData = async () => {
            const data = await api.fetchDealDetail(deal.key)
            setDealDetail(data)
        }
        getData()
    }, [])
    return (
		<View style={styles.deal}>
			<TouchableOpacity
				onPress={() => handleOnBack()}
				style={styles.back}
			>
				<Text>Back</Text>
			</TouchableOpacity>
			<Animated.Image
				style={[styles.image, { left: imageXPos }]}
				source={{ uri: media && Object.values(media)[imageIndex] }}
                {...panResponder.panHandlers}
			/>
			<View style={styles.detail}>
				<View>
					<Text style={styles.title}>{title}</Text>
				</View>
				<View style={styles.footer}>
					<View style={styles.info}>
						<Text style={styles.price}>{formatPrice(price)}</Text>
						<Text style={styles.cause}>{cause?.name}</Text>
					</View>

					{user && (
						<View style={styles.user}>
							<Image
								source={{ uri: user?.avatar }}
								style={styles.avatar}
							/>
							<Text>{user?.name}</Text>
						</View>
					)}
				</View>
				<View style={styles.description}>
					<Text>{description}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#ccc',
    },
    deal: {
        // marginHorizontal: 12,
        // marginTop: 50,
    },
    info: {
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: 'rgba(237, 149, 45, 0.4)',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    cause: {
        marginVertical: 10,
    },
    price: {
        fontWeight: 'bold',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    detail: {
        // borderColor: '#bbb',
        // borderWidth: 1,	
        padding: 10
    },
    user: {
        alignItems: 'center',
    },
    description: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'dotted',
        margin: 10,
        padding: 10,
    },
    back: {
        padding: 20,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    }
})
 
export default Detail;