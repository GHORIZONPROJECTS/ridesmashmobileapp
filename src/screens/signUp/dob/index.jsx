import React, { useState, useRef, useContext  } from 'react'
import { View, Text,  Button, ImageBackground, Image, TextInput, Pressable, KeyboardAvoidingView, ScrollView, Platform, ToastAndroid} from 'react-native'

import { COLORS, SIZES } from '../../../constants/theme.js';
import  DateTimePicker  from '@react-native-community/datetimepicker';
import {getAuth} from 'firebase/auth';

import {serverTimestamp, setDoc, doc, updateDoc } from "firebase/firestore";
import {  db} from "../../../firebase.js";
import { AuthContext } from '../../../config/AuthContext';
import Loader from '../../../components/loader/index.jsx';


const Dob = ({navigation}) => {

const [dateOfBirth, setDateOfBirth] = useState('');

const [formReady, setFormReady] = useState(false);

const [dateError, setDateError] = useState('');

const [date, setDate] = useState(new Date());

const [showPicker, setShowPicker] = useState(false);

const { user }= useContext(AuthContext);

const [loading, setLoading ] = useState(false)

const toggleDatePicker = () => {
  setShowPicker(!showPicker)
}

const onChange = ({type}, selectedDate ) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate)

      if(Platform.OS ==='android'){
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    }else{
      toggleDatePicker();
    }
}

const confirmIOSDate = () => {
  setDateOfBirth(date.toDateString());
  toggleDatePicker();
}


const auth = getAuth();


function showToast() {
  ToastAndroid.show('Registered successfully!', ToastAndroid.SHORT);
}

const handleDob = async () => {
    setLoading(true)
    if (dateOfBirth === '') {
      setDateError('Please enter your date of birth') ;
      setLoading(false);
      return
    
    }
    try{
      
        await updateDoc(doc(db, "rider", user.uid), {
          
          dateOfBirth: dateOfBirth,
          timeStamp: serverTimestamp(),
          

      }).then(() => {
        setLoading(false)
        showToast()
        navigation.navigate('gender')

          
      })

    
            
    }catch(error){

      setDateError(error.message);
    }


};

  
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
        style={{ flex:1, alignItems:'center', paddingTop:80}}
    >
     <Loader visible={loading}/>
        <ImageBackground

             source={require("../../../../assets/images/authentication/background-top.png")}
          
            style={{
                width: "100%",
                height: 216,
                position: 'absolute',
                top:0
              }}
            // resizeMode='contain'
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-start"
              }}
        />
         <ImageBackground
            source={require("../../../../assets/images/onboarding/background-bottom.png")}
          
            style={{
                width: "100%",
                height: 122,
                position: 'absolute',
                right: 0,
                bottom: 0,
                left: 0
              }}
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end"
              }}
        />

        {/* <ScrollView> */}

        <View style={{  width:SIZES.width*0.85, height:"80%", border:1, borderColor:'black'}}>

              
              <View style={{alignItems:'center',  paddingVertical:20, height:70}}>
              <Image 
                source={require("../../../../assets/images/authentication/logo.png")}
                style={{width:158, height:46}}
                resizeMode="contain"
              />
              </View>
              <View 
              style={{
                flex:1, 
                alignItems:'center', 
                height:480, 
                width:'100%',
                paddingVertical:20, 
                paddingHorizontal:20,
                borderRadius:20,
                backgroundColor: '#fff',
                borderColor: '#ddd',
                borderBottomWidth: 0.5,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 20,
                shadowColor: '#52006A',
                
               
                }}>
                 
                    <View style={{
                        flex:1,
                        // alignItems:'center',
                        marginTop:30,

                    }}>
                        <View style={{alignItems:'center'}}>
                        <Text style={{marginBottom:10, fontWeight:'bold', fontSize:20}}>Create Account</Text>
                        </View>
                        {dateError &&
                            <View style={{alignItems:'center'}}>
                            <Text style={{marginBottom:10, fontWeight:'400', color:'red'}}>{dateError}</Text>
                            </View>
                        }

                        <View style={{alignItems:'center'}}>
                          <Text style={{marginBottom:10, fontSize:20, fontWeight:300}}>Enter your date of birth
                          </Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                          <Text style={{marginVertical:10, fontSize:12}}>Your Date of birth Information will not be displayed publicly it will only be seen by you.
                          </Text>
                          
                        </View>
                        <Text style={{marginVertical:10, fontSize:14}}>Enter Date of Birth
                          </Text>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:'#E4E4E7', backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:10, paddingVertical:10}}>

                        

                        {showPicker && (
                        
                          <DateTimePicker
                            
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange = {onChange}
                            style={{height:120, marginTop:-10}}
                          />
                        )
                        }

                        {showPicker && Platform.OS === 'ios' && (
                            <View
                               style={{
                                 flexDirection:'row',
                                 justifyContent:'space-between'
                               }}
                            >
                                <Pressable
                                  style={{
                                    backgroundColor:'#11182711', paddingHorizontal:20, height:50,
                                    justifyContent:'center', alignItems:'center', borderRadius:50,
                                    marginTop:10, marginBottom:15
                                  }}

                                  onPress={toggleDatePicker}
                                >
                                  <Text
                                    style={{
                                      color:'#075985',
                                      fontSize:14,
                                      fontWeight:"500"
                                    }}
                                  >Cancel</Text>
                                </Pressable>

                                <Pressable
                                  style={{
                                    backgroundColor:COLORS.main, paddingHorizontal:20, height:50,
                                    justifyContent:'center', alignItems:'center', borderRadius:50,
                                    marginTop:10, marginBottom:15
                                  }}

                                  onPress={confirmIOSDate}
                                >
                                  <Text
                                    style={{
                                      color:'#fff',
                                      fontSize:14,
                                      fontWeight:"500"
                                    }}
                                  >Confirm</Text>
                                </Pressable>
                             </View>
                        )}
                        
                     

                        {!showPicker && (

                        <Pressable
                            onPress={toggleDatePicker}
                            >
                            <TextInput
                            placeholder='Saturday Aug 21 2023'
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                            placeholderTextColor='#11182744'
                            editable={false}
                            style={{
                                color:!showPicker && 'black'
                            }}
                            onPressIn={toggleDatePicker}
                            />
                        </Pressable>

                        )
                         
                        }

                        </View>


                      {/* <Text style={{marginBottom:10, fontWeight:'bold', fontSize:20}}>Create Account</Text> */}
                      <View style={{alignItems:'center'}}>
                      <Pressable onPress={ () => handleDob()} 
                        // disabled={!formReady}

                        style = {{
                          
                          borderRadius:10,    
                          width:"100%",
                          height:50, 
                          backgroundColor: !formReady?COLORS.main:'#11182744', 
                          alignItems:'center',
                          justifyContent:'center',
                          shadowColor: '#171717',
                          shadowOffset: {width: -2, height: 4},
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                          elevation: 20,
                          shadowColor: '#52006A',
                          marginVertical:30
                        }}
                       >
                        <Text style={{color:!formReady?COLORS.white:'#11182744', fontSize:16, fontWeight:400}}>Next</Text>
                        </Pressable>

                      </View>
                       
                       
                    </View>
              </View>
        </View>
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )
}

export default Dob