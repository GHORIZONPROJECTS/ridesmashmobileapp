import React, { useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, useWindowDimensions, Pressable, Image, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants/theme';
import MapView, {Marker} from 'react-native-maps';
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
import cars from '../../../assets/data/car'


const HomeScreen = ({navigation}) => {

  const bottomSheetRef = useRef(null);

  Location.setGoogleApiKey('AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA');

  const snapPoints = useMemo(() => ['42%', '60%'], []);

 const [riderLocation, setRiderLocation] = useState(null) 
 const [displayCurrentAddress, setDisplayCurrentAddress] = useState('loading...')
 const [address, setAddress] = useState([])

 

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
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
          });

          // reverseGeocodedAddress = await Location.reverseGeocodeAsync({
          //   latitude: location.coords.latitude,
          //   longitude: location.coords.longitude,
          // }
          // , {
          //   useGoogleMaps:true
          // });

          console.log(location.coords.latitude, location.coords.longitude)
          // console.log(reverseGeocodedAddress)

    })();
 }, [])

//  console.log(riderLocation)


// const GetCurrentLocation = async () => {

//   let { coords } = await Location.getCurrentPositionAsync();

//   if (coords) {
//     const { latitude, longitude } = coords;
//     let response = await Location.reverseGeocodeAsync({
//       latitude,
//       longitude
//     }, {useGoogleMaps:true});

//     setAddress(response)
//     // console.log(response)

    
//   }
// };

// console.log(address)
//  useEffect(() => {
//       GetCurrentLocation()
//  }, [])

 
  // useEffect(() => {
  //   (async () => {
  //     const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
  //       longitude: riderLocation.longitude,
  //       latitude: riderLocation.latitude
  
  //       // latitude: location.coords.latitude,
  //       // longitude: location.coords.longitude,
  //     }
  //     , {
  //       useGoogleMaps:true
  //     });
  //     // setAddress(reverseGeocodedAddress)
  
  //     console.log('reverse Geocoded')
  //     console.log(reverseGeocodedAddress)
  
  //   })()
  // }, [])

  // const myapikey="AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA"

// function getaddressfromcoordinates({latitude, longitude}) {
//   return new promise((resolve, reject) => {
//     fetch(
//       'https://maps.googleapis.com/maps/api/geocode/json?address=' +
//         latitude +
//         ',' +
//         longitude +
//         '&key=' +
//         myapikey,
//     )
//       .then(response => response.json())
//       .then(responsejson => {
//         if (responsejson.status === 'ok') {
//           resolve(responsejson?.results?.[0]?.formatted_address);
//         } else {
//           reject('not found');
//         }
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// }



//  useEffect(() => {
//   getaddressfromcoordinates({lat, long})
//  }, [])


// Geocoder.init("AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA");

// Geocoder.from(41.89, 12.49)
// 		.then(json => {
//         		var addressComponent = json.results[0].address_components[0];
// 			// console.log(addressComponent);
// 		})
// 		.catch(error => console.warn(error));

const goToSearch = () => {
  navigation.navigate('DestinationSearch')
}

const getCars = (type) => {
    if(type === 'top-smashClassic'){
      return require('../../../assets/images/cars/topCar.png');
    }

    if(type === 'top-smashRide'){
      return require('../../../assets/images/cars/topCar.png');
    }

    if(type === 'top-smashExecutive'){
      return require('../../../assets/images/cars/topCar.png');
    }

      return require('../../../assets/images/cars/topCar.png');
}


  return (
    <View style={styles.container}>

      <MapView
        style={{height: Dimensions.get('window').height-200, width: Dimensions.get('window').width}}
        initialRegion={riderLocation}
        showsUserLocation
        followsUserLocation
      >

      {
        cars.map((car) => (

          <Marker key={car.id} coordinate={{latitude:car.latitude  , longitude:car.longitude}}>
{/* 
           <Marker key={car.id} coordinate={{latitude:riderLocation.latitude-car.latitude,longitude:riderLocation.longitude-car.longitude}}> */}
          <Image
            source={getCars(car.type)}
            alt='' 
            style={{width:35, height:40, transform:[{rotate : `${car.heading}deg`}]}}
            resizeMode='contain'
          />  
        </Marker> 

        ))
      }  

      </MapView>
      <View style={{position:'absolute', top:50, left:30, marginBottom:10, width:50, height:50, borderRadius:25, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.primary}}>
            <Pressable onPress={() => navigation.openDrawer()} style={{}}>
                <Ionicons name="md-list-outline" size={30} color={COLORS.white}  />
            </Pressable>
        </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        // onChange={handleSheetChanges}
      >
       <View style={{}}>
            <View style={{paddingVertical:20, paddingHorizontal:15, marginBottom:10, backgroundColor:COLORS.primary, borderTopRightRadius:80}}>
              <Image
                source={require('../../../assets/images/cars/smashClassic.png')}
                style={{width:50, height:30, position:'absolute', right:10, top:0}}
              />
              <Text style={{fontSize:16, fontWeight:'bold', marginBottom:5, color:'white'}}>Convinient, Safe and Cheap fare</Text>
              <Text style={{color:'white', lineHeight:20, fontSize:14, fontWeight:400, }}>We offer the cheapest fare rate out there, you can trust us for a smooth and safe ride to you destination. Enjoy your ride</Text>
            </View>
            <Pressable onPress={() => goToSearch()} style={{ height:60, margin:10, borderRadius:10, backgroundColor:'#ededed', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20, }}>
              <Text style={{fontSize:20, fontWeight:'bold'}}>Where to?</Text>
              <View style={{backgroundColor:'white', width:80, height:30, borderRadius:5, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10}}>
              <Feather name="clock" size={18} color="black" />
              <Text style={{fontSize:10}}>Now</Text>
              <AntDesign name="caretdown" size={12} color="black"/>
              </View>
            </Pressable>

            <Pressable style={{ height:60, marginHorizontal:10, borderRadius:10, backgroundColor:'#ededed', flexDirection:'row', alignItems:'center', paddingHorizontal:20, }}>
              <FontAwesome5 name="box-open" size={24} color="black" />
              <Text style={{fontSize:16, fontWeight:'bold', marginLeft:10}}>Delivery items?</Text>
            </Pressable>
            <View  style={{marginHorizontal:20}}>
              <Pressable style={{ height:40, marginHorizontal:10, flexDirection:'row', alignItems:'center', marginVertical:10}}>
                <AntDesign name="home" size={22} color="black" />
                <Text style={{fontSize:14, marginLeft:20}}>Home</Text>
              </Pressable>
              <Divider/>
            </View>

          
            <View  style={{marginHorizontal:20, marginVertical:10}}>
            <Pressable style={{ height:40, marginHorizontal:10, flexDirection:'row', alignItems:'center', marginVertical:10 }}>
              <AntDesign name="shoppingcart" size={22} color="black" />
              <Text style={{fontSize:14, marginLeft:20}}>Shoprite Ikeja City Mall</Text>
            </Pressable>
            <Divider/>  
            </View>

            <View>

            

            </View>
      
       </View> 
       
       
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: 'lightblue',
    postion:'relative',
    // paddingTop:40
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal:40,
    // backgroundColor:'grey'
  },
});

export default HomeScreen;