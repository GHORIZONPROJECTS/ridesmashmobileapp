import React, { useState } from 'react'
import { View, Text,  Button, ImageBackground, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import './styles.jsx'
import { COLORS, SIZES } from '../../constants/theme.js';
// import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {getAuth, PhoneAuthProvider,signInWithCredential, RecaptchaVerifier, signInWithPhoneNumber, GoogleAuthProvider } from 'firebase/auth';






const TelephoneAuth = ({navigation}) => {

// const provider = new GoogleAuthProvider();    


const [selectedTab, setSelectedTab] = useState(0);
// const [inputValue, setInputValue] = useState('');

// const recaptchaVerifier = useRef(null);


const [phoneNumber,setPhoneNumber] = useState('');
const [verificationId,setVerificationID] = useState('');
const [verificationCode,setVerificationCode] = useState('');
const [info,setInfo] = useState("");
// const attemptInvisibleVerification = false;


const auth = getAuth();

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    onSignInSubmit();
  }

});





const handleSendVerificationCode =  () => {

        const phoneNumber = `+234${phoneNumber}`;
        // const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            Seterr(error.message)
            // ...
            });

};

  
const handleCodeVerification =  () => {


        const code = verificationCode;
        confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user)
          navigation.navigate('createAccount')
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          setError(error.message) 
          return
          // ...
        });

  


};



  return (
    <View
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        // enabled={false}
        // style={{ flex:1, alignItems:'center', paddingTop:80}}
    >
    
        <ImageBackground
            source={require("../../../assets/images/authentication/background-top.png")}
          
            style={{
                width: "100%",
                height: 216,
                // padding: 20,
                // paddingVertical: 40,
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
            source={require("../../../assets/images/onboarding/background-bottom.png")}
          
            style={{
                width: "100%",
                height: 122,
                // padding: 20,
                // paddingVertical: 40,
                position: 'absolute',
                // top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }}
            // resizeMode='contain'
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end"
              }}
        />

        {/* <ScrollView> */}
        {/* {!verificationId &&
              ( <View style={{  width:SIZES.width*0.85, height:"80%", border:1, borderColor:'black'}}>

               <FirebaseRecaptchaVerifierModal 
                   ref={recaptchaVerifier}
                   firebaseConfig={firebaseConfig}
               />
                     
                     <View style={{alignItems:'center',  paddingVertical:20, height:70}}>
                     <Image 
                       source={require("../../../assets/images/authentication/logo.png")}
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
                               flexDirection:'row', 
                               justifyContent:'space-between', 
                               width:'60%', 
                               height:50, 
                               borderRadius:25, 
                               backgroundColor:'#D9D9D9',
                               alignItems:'center',
                               borderWidth:2,
                               borderColor:'#ccc'
                               }}>
                               <TouchableOpacity 
                                   onPress={() => {setSelectedTab(0)}}
                                  
                                   style={{
                                   backgroundColor:selectedTab == 0 ? COLORS.main : '#D9D9D9',  
                                   borderRadius:25,
                                   width:'50%',
                                   height:'98%', 
                                   alignItems:'center',
                                   justifyContent:'center'
                                }}><Text
                                   style={{
                                       color:selectedTab == 0 ? COLORS.white : COLORS.main,
                                       fontSize:16,  
                                   }}
                                >Log In</Text>
                                </TouchableOpacity>
                               <TouchableOpacity  
                                   onPress={() => {setSelectedTab(1)}}
                               
                                   style={{
                                   borderRadius:25,    
                                   width:'50%',
                                   height:'98%', 
                                   backgroundColor:selectedTab == 1 ? COLORS.main : '#D9D9D9', 
                                   alignItems:'center',
                                   justifyContent:'center'
                                }}
                               
                               ><Text
                                   style={{
                                       color:selectedTab == 1 ? COLORS.white : COLORS.main,
                                       fontSize:16,  
                                   }}
                               >Sign Up</Text>
                               </TouchableOpacity>
                           </View>
                           <View style={{
                               flex:1,
                               alignItems:'center',
                               marginTop:30,
                               paddingTop:15,
       
                           }}>
                               <Text style={{marginBottom:10, fontWeight:'bold'}}>Enter Your Phone Number</Text>
       
                               <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:'#E4E4E7', backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:10, paddingVertical:10}}>
                                   <Image
                                       source={require('../../../assets/images/authentication/country.png')}
                                       style={{width:18, height:13, marginRight:8}}
                                       resizeMode="contain"
                                   />
                                   <FontAwesome name="caret-down" size={24} color="#A1A1AA" />
                                   <Text style={{marginHorizontal:8, fontSize:16}}>+234</Text>
                                   <TextInput
                                       placeholder='8047858766'
                                       autoFocus
                                       autoCompleteType='tel'
                                       keyboardType='numeric'
                                       maxLength={10}
                                       textContentType='telephoneNumber'
                                       style={{
                                           fontSize:16
                                       }}
                                       value={phoneNumber}
                                       placeholderTextColor={'#E4E4E7'}
                                       onChangeText={ (phoneNumber) => setPhoneNumber(phoneNumber)}
                                   />
                                
                               </View>
                               <Text style={{color:'#595959', fontSize:10, marginVertical:10}}>We will use this number to validate your account</Text>
       
                               {selectedTab == 0 
       
                               ? 
       
                               <TouchableOpacity 
                                   onPress={ () => handleSendVerificationCode()}
                                   disabled={phoneNumber == '' ? true : false }
                                   style={{
                                           borderRadius:25,    
                                           width:194,
                                           height:50, 
                                           backgroundColor: COLORS.main, 
                                           alignItems:'center',
                                           justifyContent:'center',
                                           // shadowColor: '#171717',
                                           shadowOffset: {width: -2, height: 2},
                                           shadowOpacity: 0.2,
                                           shadowRadius: 3,
                                           elevation: 20,
                                           // shadowColor: '#52006A',
                                           marginVertical:10
                                   }}
                               ><Text style={{color:COLORS.white, fontSize:16, fontWeight:400}}>Log In</Text>
                               </TouchableOpacity>
       
       
                               :
                               
                               <TouchableOpacity 
                               onPress={ () => handleSendVerificationCode()}
                               disabled={phoneNumber == '' ? true : false }
                               style={{
                                   borderRadius:25,    
                                   width:194,
                                   height:50, 
                                   backgroundColor: COLORS.main, 
                                   alignItems:'center',
                                   justifyContent:'center',
                                   shadowColor: '#171717',
                                   shadowOffset: {width: -2, height: 4},
                                   shadowOpacity: 0.2,
                                   shadowRadius: 3,
                                   elevation: 20,
                                   shadowColor: '#52006A',
                                   marginVertical:10
                               }}><Text style={{color:COLORS.white, fontSize:16, fontWeight:400}}>Sign Up</Text>
                               </TouchableOpacity>
       
                               }
                              
                               <Text style={{color:COLORS.gray, fontSize:16, fontWeight:'bold', marginVertical:10}}>Or</Text>
                               <TouchableOpacity 
                               onPress={() => {}}
                               style={{flexDirection:'row', alignItems:'center', paddingHorizontal:20, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:25}}>
                                   <Image
                                       source={require("../../../assets/images/authentication/google.png")}
                                       style={{width:16, height:16}}
                                       resizeMode='contain'
                                   />
                                   <Text style={{marginHorizontal:20}}>Sign In with Google</Text>
                               </TouchableOpacity>
                               <TouchableOpacity 
                               onPress={() => {}}
                               style={{flexDirection:'row', alignItems:'center', paddingHorizontal:15, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:25, marginTop:15}}>
                                   <Image
                                       source={require("../../../assets/images/authentication/facebook.png")}
                                       style={{width:16, height:16}}
                                       resizeMode='contain'
                                   />
                                   <Text style={{marginHorizontal:20}}>Sign In with Facebook</Text>
                               </TouchableOpacity>
                           </View>
                     </View>
               </View>)
        } */}
        
        {/* {verificationId &&
        (
            <View style={{  width:SIZES.width*0.85, height:"80%", border:1, borderColor:'black'}}>
              
            <View style={{alignItems:'center',  paddingVertical:20, height:70}}>
              <Image 
                  source={require("../../../assets/images/authentication/logo.png")}
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
                      alignItems:'center',
                      marginTop:30,
                      paddingTop:15,

                  }}>

                      <Text style={{marginBottom:10, fontWeight:'bold', fontSize:16}}>VERIFY PHONE NUMBER</Text>
                      <Text style={{marginBottom:9, fontSize:12, fontStyle:'italic'}}>Enter 4 digit code received on your phone</Text>
                      <Text style={{marginBottom:9, fontSize:12, fontStyle:'italic', marginVertical:10}}>{`+234 ****** ${phoneNumber.slice(6)}`}</Text>
                      
                      
                    
                      <View style={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:270,  borderColor:'#E4E4E7', backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:10, paddingVertical:10}}>
                              <Text style={{marginBottom:10, color:'green', fontSize:16}}>{info}</Text>
                              {errorCode &&
                                   <Text style={{marginBottom:10, color:'red', fontSize:16}}>{errorCode}</Text>
                              }

                              <TextInput
                                  editable={!!verificationId}
                                  placeholder= "123456"
                                  value={verificationCode}
                                  placeholderTextColor={COLORS.lightgray}
                                  keyboardType='numeric'
                                  maxLength={6}
                                  onChangeText={setVerificationCode}
                                  style={{ marginBottom:30, fontSize:18, marginVertical:20, borderWidth:1, borderColor:'#ccc', width:210, textAlign:'center', paddingVertical:10, letterSpacing:20}}
                                  
                              /> 

                              <Button
                                  title= "Confirm Verification Code"
                                  disabled={!verificationCode}
                                  onPress = {() => handleCodeVerification()}
                                 
                              />  

                   
                  </View>

                      {/* {errorCode != "" && (
                          <Text
                          style={{
                              fontSize: 10,
                              color: "red",
                              textAlign: "center",
                              marginTop: 30,
                          }}
                          >
                          {errorCode}
                          </Text>
                      )} */}


                     
                     {/* <View
                          style={{
                              flexDirection:'row',
                              justifyContent:'center',
                              marginTop: 20
                          }}
                     >



                         <Text style={{color: COLORS.gray, fontSize:12}}> Didnt receive code? </Text> 
                     

                        <TouchableOpacity 
                              onPress = {() => setTimer()}
                              disabled={timer == 0 ? true : false }
                              style={{
                                  marginLeft:10,
                                  backgroundColor:null,
                                  borderRadius:25,    
                                 
                          }}
                      >
                          <Text style={{color:'red', fontSize:12, fontWeight:400}}>{`Resend (${timer}s)`}</Text>
                      </TouchableOpacity> 

                     </View>
                           */}
                     {/* {verify === false ? (
                      <TouchableOpacity
                      disabled={code && code !== null ? false : true}
                      style={{
                          backgroundColor: "#E23744",
                          width: "100%",
                          height: 50,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                          marginTop: 10,
                          bottom:10
                      }}
                      onPress={() =>
                          code && code !== null && handleVerifyVerificationCode()
                      }
                      >
                      <Text style={{ color: "white", fontSize: 18 }}>
                          {translation.sl_verify_and_login}
                      </Text>
                      </TouchableOpacity>
                  ) : (
                      <ActivityIndicator
                      size="small"
                      color={COLORS.main}
                      style={{ marginTop: 10 }}
                      />
                  )} */}

            </View>
    //       </View>
    //   </View>
    //     )
    //     } */}

     
    //     {/* </ScrollView> */}
    // </View>
  )
}

export default TelephoneAuth