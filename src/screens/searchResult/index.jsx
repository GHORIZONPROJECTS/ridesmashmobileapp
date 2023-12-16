import React, { useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, useWindowDimensions, Pressable, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants/theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../config/AuthContext';
import { db, auth } from '../../firebase'
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";
// import info from '../../data'
import Geocoder from 'react-native-geocoding';
import { Feather,  AntDesign, FontAwesome5 } from '@expo/vector-icons';
import {Divider} from 'react-native-paper'
import UberTypeRow from '../../components/uberTypeRow';
import typeData from '../../../assets/data/type'
import MapViewDirections from 'react-native-maps-directions';

const SearchResult = ({navigation, route}) => {

  const {fromText, destinationText} = route.params;

  console.log({'from' : fromText, 'To' : destinationText})

  const originLoc = {
    latitude : fromText.details.geometry.location.lat(),
    longitude : fromText.details.geometry.location.lng(),
  }

  const destinationLoc = {
    latitude : destinationText.details.geometry.location.lat,
    longitude : destinationText.details.geometry.location.lng,
  }

  // const originLoc = fromText.place.geometry.location.lat()

  // var place = autocomplete.getPlace();
  // console.log(place.geometry.location);

  console.log(originLoc)

  const bottomSheetRef = useRef(null);

  // Location.setGoogleApiKey('AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA');

  const snapPoints = useMemo(() => ['50%', '50%'], []);

  const [riderLocation, setRiderLocation] = useState(null) 
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('loading...')
  const [address, setAddress] = useState([])

  const origin = {latitude: 6.5257989, longitude: 3.3699052};
  const destination = {latitude: 6.517060, longitude: 3.377970};

  const GOOGLE_MAPS_APIKEY = "AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA";

  useEffect(() => {
    (async() => {

      // Turns on your device location
        let {status} = await Location.requestForegroundPermissionsAsync();

        if(status !== 'granted'){

          setErrorMsg('Permission to access location was denied');
          return
        }

        // gets user Location
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

          setRiderLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.024,
            longitudeDelta: 0.024
          });

          reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
           {
            useGoogleMaps:true
          });

          console.log(location.coords.latitude, location.coords.longitude)
          console.log(reverseGeocodedAddress)

    })();
 }, [])

 const goToSearch = () => {
  navigation.navigate('DestinationSearch')
}

  return (
    <View style={styles.container}>

    <MapView
      style={{height: Dimensions.get('window').height*0.6, width: Dimensions.get('window').width}}
      initialRegion={riderLocation}
      provider= {PROVIDER_GOOGLE}
      showsUserLocation
      followsUserLocation
    >
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor={COLORS.main}
        mode={'TRANSIT'}
      />
       <Marker coordinate={origin} title="Starting Point">
          <MaterialIcons name="person-pin-circle" size={24} color="black" />
       </Marker>
       <Marker coordinate={destination} title="Destination Point">
        <Image
              source={require('../../../assets/images/cars/topCar.png')}
              alt='' 
              style={{width:35, height:40}}
              resizeMode='contain'
          /> 
       </Marker>
    </MapView>
    <View style={{position:'absolute', top:50, left:30, marginBottom:10, width:50, height:50, borderRadius:25, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.primary}}>
          <Pressable onPress={() => navigation.goBack()} style={{}}>
              <Ionicons name="arrow-back" size={30} color={COLORS.white}  />
          </Pressable>
      </View>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
    >
      <View>
      
        {
          typeData.map((type) =>  <UberTypeRow type = {type} key = {type.id} /> 
          )
        }
        
      <Pressable onPress = { () => {console.log('')}} style={{paddingTop:10, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.main, bottom:0, marginTop:20, marginHorizontal:10}}>
        <Text style={{fontSize:18, fontWeight:400, marginRight:10, color:'white'}}>Confirm</Text>
        <Text></Text>
      </Pressable>
      </View>
     
    </BottomSheet>
  </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: 'lightblue',
    postion:'relative',
    // paddingTop:35,
  },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  //   // paddingHorizontal:40,
  //   // backgroundColor:'grey'
  // },
});