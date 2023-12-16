import React, {useState, useEffect} from 'react'
import { TextInput, View, SafeAreaView, StatusBar } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../constants/theme';
import PlaceRow from '../../components/placeRow';
import styles from './style'
// import Geolocation from '@react-native-community/geolocation';

// Geolocation.setRNConfiguration(config);

// navigator.geolocation = require('@react-native-community/geolocation');

const DestinationSearch = ({navigation}) => {

    const [fromText, setFromText] = useState(null);
    const [destinationText, setDestinationText] = useState(null)

    const checkNavigation = () => {
        if (fromText && destinationText) {
            // console.warn('good job')
            navigation.navigate('SearchResult',{fromText, destinationText} )
        }
    }

    useEffect(() => {
        checkNavigation()
    }, [fromText, destinationText])



    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
      };
      const workPlace = {
        description: 'Work',
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
      };


    return (
        <SafeAreaView style={{backgroundColor:'white'}}>
            <StatusBar barStyle='light-content'/>
        <View style={{marginVertical:20, width:'100%', height:'100%'}}>
       
        <GooglePlacesAutocomplete
            placeholder='Where From?'
            onPress={(data, details = null) => {
                setFromText({data, details})
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}


            query={{
                key: 'AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA',
                language: 'en',
            }}

            suppressDefaultStyles

            enablePoweredByContainer = {false}

            styles={{
                textInputContainer: {
                borderWidth:0.5,
                borderColor : '#eee',
                // width:'80%',
                margin:10,

                },
                textInput: {
                //   height: 38,
                  color: '#000',
                  fontSize: 16,
                  padding : 10,
                  backgroundColor: '#eee',
                },
                predefinedPlacesDescription: {
                //   color: '#1faadb',
                },
                container : {
                    position : 'absolute',
                    top : 0 ,
                    left : 10 ,
                    right : 10 
                },
                listView : {
                    position : 'absolute',
                    top : 140,
                    // backgroundColor : 'blue',
                    marginHorizontal : 12
                },

                separator : {
                    backgroundColor : '#eee',
                    height : 1,
                    marginBottom : 10
                }

              }}

              renderRow={(data) => <PlaceRow data={data}/>}

              

              predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
            placeholder='Where To?'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setDestinationText({data, details})
                console.log(data, details);
            }}

            // styles={{
            //     textInputContainer: {
            //     //   backgroundColor: COLORS.lightgray,
            //     borderWidth:1,
            //     // width:'80%',
            //     margin:10

            //     },
            //     textInput: {
            //       height: 38,
            //       color: '#5d5d5d',
            //       fontSize: 16,
            //     },
            //     predefinedPlacesDescription: {
            //     //   color: '#1faadb',
            //     },

            //     container : {
            //         position : 'absolute',
            //         top : 50 ,
            //         left : 10 ,
            //         right : 10 
            //     },


            // }}

            suppressDefaultStyles

            enablePoweredByContainer = {false}

            styles={{
                textInputContainer: {
                borderWidth:0.5,
                borderColor : '#eee',
                // width:'80%',
                margin:10,

                },
                textInput: {
                //   height: 38,
                  color: '#000',
                  fontSize: 16,
                  padding : 10,
                  backgroundColor: '#eee',
                },
                predefinedPlacesDescription: {
                //   color: '#1faadb',
                },
                container : {
                    position : 'absolute',
                    top : 60 ,
                    left : 10 ,
                    right : 10 
                },
                listView : {
                    position : 'absolute',
                    top : 80,
                    // backgroundColor : 'blue',
                    marginHorizontal : 12
                },

                separator : {
                    backgroundColor : '#eee',
                    height : 1,
                    marginBottom : 10
                }

              }}


            query={{
                key: 'AIzaSyASD4ZhyumbR2B6VwaHXs9ZXCy4eGKeuoA',
                language: 'en',
            }}

            renderRow={(data) => <PlaceRow data={data}/>}
        />

         {/* origin circle */}

         <View 
            style = {{
                width : 5,
                height : 5,
                // backgroundColor : 'black',
                position : 'absolute',
                top : 30,
                left : 10,
                borderRadius : 2.5,
                borderColor : '#000',
                borderWidth : 1
            }} 
         />

         {/* origin to destination line */}

         <View style = {{
             width : 1,
             height : 58,
             backgroundColor : '#ccc',
             position : 'absolute',
             top : 32,
             left : 12
         }} />

         {/* destination square */}

         <View style = {{
             width : 5,
             height : 5,
             backgroundColor : 'black',
             position : 'absolute',
             top : 90,
             left : 10
         }} />

        </View>
        </SafeAreaView>
    )
}

export default DestinationSearch

