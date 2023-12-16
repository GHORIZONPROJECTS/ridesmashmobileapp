import React from 'react'
import {Text, View, Image, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const UberTypeRow = (props) => {

    const {type}  = props;

    return (
        <View style={{paddingHorizontal:10}}>
        
          
            <Pressable key={type.id} onPress={() => console.log()} style={{flexDirection:'row', width:'100%', justifyContent:'space-between', marginBottom:2, alignItems:'center', paddingHorizontal:5, paddingVertical:15, borderRadius:5}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image
                        source={type.typeImg}
                        style={{width:60, height:40}} 
                        resizeMode='contain'
                    />
                </View>
                <View style={{flexDirection:'column', marginRight:5, width:100, }}>
                    <Text style={{fontSize:13, fontWeight:500, marginBottom:5}}>{type.type}</Text>
                    <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={{fontSize:12, color:'gray'}}>{type.duration}min</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Ionicons  name="person" size={12} color="gray" />
                            <Text style={{fontSize:12, color:'gray', marginLeft:5}}>4 Seats</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:'row', fontSize:10, paddingLeft:20}}>
                    <Text style={{fontSize:12, fontWeight:500}}>N{type.price}.00 - N{type.price2}.00</Text>
                </View>
            </Pressable>

            

            
           

        </View>
    )
}

export default UberTypeRow;