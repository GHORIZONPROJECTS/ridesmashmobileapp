import { View, Text, ImageBackground, Image, TextInput, TextButton, TouchableOpacity, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import './styles.jsx'
import './styles.jsx'
import { COLORS, SIZES } from '../../constants/theme.js'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { auth } from '../../firebase.js'
import {getAuth,PhoneAuthProvider,signInWithCredential} from 'firebase/auth';

const OtpAuth = ({route, navigation}) => {

  const verificationId = route.params;
//   const phoneNumber = route.params.phoneNumber
 
  console.log(verificationId)
//   console.log(code)

//   const auth = getAuth();

// const [verificationId,setVerificationID] = useState('');
const [code,setCode] = useState();
// const [clearInput, setClearInput] = useState(false)

const [errorCode,setErrorCode] = useState("");
   
const [timer, setTimer] = useState(60)

  useEffect(() =>{
    let interval = setInterval(() => {
        setTimer(prevTimer => {
            if(prevTimer > 0 ){
                return prevTimer - 1
            }else{
                return prevTimer
            }
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleVerifyCode = async () => {
    try{
        const credential = PhoneAuthProvider.credential(verificationId, code); // get the credential
        await signInWithCredential(auth,credential); // verify the credential
        // setInfo('Success: Phone authentication successful'); // if OK, set the message
        navigation.navigate("createAccount"); // navigate to the welcome screen
        
    }catch(error){
        setErrorCode(`Error : ${error.message}`); // show the error.
    }
}

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
        style={{ flex:1, alignItems:'center', paddingTop:80}}
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
                        <Text style={{marginBottom:9, fontSize:12, fontStyle:'italic', marginVertical:10}}>+234**
                        ****22</Text>


                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270,  borderColor:'#E4E4E7', backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:10, paddingVertical:10}}>

                        <OTPInputView
                            style={{width: '100%', height: 50, flex:1, justifyContent:'space-between'}}
                            pinCount={6}
                            // code={code} 
                            // oncodechanged={(code)=>{
                            //     setCode(code);
                            // }} 
                            // clearinputs={clearInput}
                            autoFocusOnLoad
                            codeInputFieldStyle={{
                                width:40,
                                height:40,
                                borderRadius:1,
                                backgroundColor:'#FDFDFD',
                                color:COLORS.black,
                                fontSize:20
                            }}
                            autofillFromClipboard={false}
                            codeInputHighlightStyle={{borderColor: "#03DAC6",}}
                            onCodeFilled = {(code) => {
                                handleVerifyCode()
                            }}
                        />
                        </View>

                        {errorCode != "" && (
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
                        )}


                       
                       <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'center',
                                marginTop: 20
                            }}
                       >



                           <Text style={{color: COLORS.gray, fontSize:12}}>Didn't receive code?</Text> 
                       

                          <TouchableOpacity 
                                onPress = {() => setTimer()}
                                disabled={timer == 0 ? true : false }
                                style={{
                                    marginLeft:10,
                                    backgroundColor:null,
                                    borderRadius:25,    
                                   
                            }}
                        ><Text style={{color:'red', fontSize:12, fontWeight:400}}>{`Resend (${timer}s)`}</Text>
                        </TouchableOpacity> 

                       </View>
                            
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
                            code && code !== null && handleVerifyCode()
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
              </View>
        </View>
        {/* </ScrollView> */}
    </KeyboardAvoidingView>
  )
}

export default OtpAuth