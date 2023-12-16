import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OnlineDrivers = () => {
  return (
    <View>
      <Image
        source={require('../../../../assets/images/carMarker.png')}
        alt=''
        resizeMode='contain'
        style={{width:40, height:20}}
      />
    </View>
  )
}

export default OnlineDrivers

const styles = StyleSheet.create({})