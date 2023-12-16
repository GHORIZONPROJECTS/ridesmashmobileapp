import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

const PlaceRow = ({data}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {data.description === 'home'
                    ? <MaterialIcons name="home" size={18} color="white" />
                    : <MaterialIcons name="location-pin" size={18} color="white" />
                }
                
            </View>
            <Text style={styles.textContainer}>{data.description}</Text>
        </View>
    )
}

export default PlaceRow

const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flexDirection : 'row',
        marginBottom : 10,
        alignItems : 'center'
        
    }, 
    
    iconContainer : {
        width : 30,
        height : 30,
        alignItems : 'center',
        justifyContent : 'center',
        // padding : 10,
        backgroundColor : '#ccc',
        marginRight : 15,
        borderRadius : 25
    },
    
});