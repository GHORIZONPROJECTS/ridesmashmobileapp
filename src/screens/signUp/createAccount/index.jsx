import React, { useState, useRef, useContext, useEffect } from 'react'
import { View, Text,  Button, ImageBackground, Image, TextInput, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
// import './styles.js'
import { COLORS, SIZES } from '../../../constants/theme';
// import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import {getAuth,PhoneAuthProvider,signInWithCredential} from 'firebase/auth';
import {InputField} from '../../../components/authComponent';
import {serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db} from "../../../firebase";
// import {firebaseConfig} from '../../../firebase.js';
import { AuthContext } from '../../../config/AuthContext';
import Loader from '../../../components/loader';
// import { Redirect } from 'expo-router';
// import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";


const CreateAccount = ({navigation}) => {

// const [selectedTab, setSelectedTab] = useState(0);

// const recaptchaVerifier = useRef(null);

// const auth = getAuth();

const { user }= useContext(AuthContext);

// console.log(user.uid)

// console.log(user.phoneNumber)

// const [isLoading, setIsLoading] = useState(true);


const [firstname, setFirstname] = useState('');
const [surname, setSurname] = useState('');
const [email, setEmail] = useState('');
const [rightIcon, setRightIcon] = useState('eye');
const [signupError, setSignupError] = useState('');
const [loading, setLoading ] = useState(false)

// const [isLoading, setIsLoading] = useState(true);
// const [userData, setUserData] = useState('')



  // const getUser = async() => {
  //   // setIsLoading(true)
  //   const docRef = doc(db, "rider", user.uid);
  //     const docSnap = await getDoc(docRef);
      
  //     if (docSnap.exists()) {

  //       setUserData(docSnap.data())
  //       // setIsLoading(false)
        
      

  //     } else {

  //       console.log("No such document!");
  //     }
  // }

  // useEffect(()=>{
  //   getUser()
  // }, [])

  // if(userData !== ''){
  //   navigation.navigate('home')
  // }

  // if (userData) {
  //   return <Redirect href="/home" />;
  // }

  // console.log(userData)

const onHandleSignup = async () => {
//  Keyboard.dismiss();
      // setLoading(true);
      if (firstname === '' || surname === '' || email === '') {
        setSignupError('Please fill in all information!') 
        return
      }

  try {
       setLoading(true);
       await setDoc(doc(db, "rider", user.uid), {
                  firstname: firstname,
                  surname:surname,
                  email: email,
                  timeStamp: serverTimestamp(),
              
                  }
              );
              setLoading(false)
              navigation.navigate('dob')
    
    
  } catch (error) {

    setSignupError(error.message);

  }
};


  return (
    
    // <View
      
    //     style={{ flex:1, height:"100%"}}
    // > 

    <View style={{flex:1, alignItems:'center', justifyContent:'center', height:'100%'}}>
       <Loader visible={loading}/>
        <ImageBackground
            source={require("../../../../assets/images/authentication/background-top.png")}
          
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
            source={require("../../../../assets/images/onboarding/background-bottom.png")}
          
            style={{
                width: "100%",
                height: 122,
                // padding: 20,
                // paddingVertical: 40,
                position: 'absolute',
                // top: 0,
                // right: 0,
                bottom: 0,
                // left: 0
              }}
            // resizeMode='contain'
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end"
              }}
        />

    {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={true}
        style={{ flex:1, alignItems:'center', paddingTop:80}}
    > */}


        <View style={{  width:SIZES.width*0.85, border:1, borderColor:'black'}}>

              
              <View style={{alignItems:'center',  paddingVertical:20, height:70}}>
              <Image 
                source={require("../../../../assets/images/authentication/logo.png")}
                style={{width:158, height:46}}
                resizeMode="contain"
              />
              </View>
              <View 
                style={{
                    // flex:1, 
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
                        <Text style={{marginBottom:10, fontWeight:'bold', fontSize:16}}>Create Account</Text>

                       
                        {signupError &&
                          <View style={{alignItems:'center'}}>
                          <Text style={{marginBottom:10, fontWeight:'400', color:'red'}}>{signupError}</Text>
                          </View>
                      }

                        <View style={{alignItems:'center', width:270, borderWidth:1, borderColor:'#E4E4E7', borderRadius:5, marginBottom:10 }}>
                           

                            <InputField
                                  inputStyle={{
                                    fontSize: 16
                                    }}
                                    containerStyle={{
                                    backgroundColor: '#fff',
                                    }}
                                    leftIcon='account-outline'
                                    placeholder='Firstname'
                                    autoCapitalize='none'
                                    autoFocus={false}
                                    value={firstname}
                                    onChangeText={text => setFirstname(text)}
                                  
                            />
                        </View>  
                        <View style={{alignItems:'center', width:270, borderWidth:1, borderColor:'#E4E4E7', borderRadius:5, marginBottom:10 }}>
                       

                       <InputField
                             inputStyle={{
                               fontSize: 16
                               }}
                               containerStyle={{
                               backgroundColor: '#fff',
                               }}
                               leftIcon='account'
                               placeholder='Surname'
                               autoCapitalize='none'
                               autoFocus={false}
                               value={surname}
                               onChangeText={text => setSurname(text)}
                               
                             
                       />
                   </View>  

                        <View style={{alignItems:'center', width:270, borderWidth:1, borderColor:'#E4E4E7', borderRadius:5, marginBottom:20 }}>
                         
                            <InputField
                                inputStyle={{
                                fontSize: 16
                                }}
                                containerStyle={{
                                backgroundColor: '#fff',
                                // marginBottom: 20,
                                alignItems:'center'
                                }}
                                leftIcon='email'
                                placeholder='Enter email'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={false}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                // value={email}
                                // onChangeText={text => setEmail(text)}
                            />

                        </View>   

                         
                        <Pressable onPress={ () => onHandleSignup()} 
                            disabled={!firstname || !surname || !email}
                            style={{
                                borderRadius:10,    
                                width:270,
                                height:50, 
                                backgroundColor: firstname || surname || email ? COLORS.main:'#D9D9D9', 
                                alignItems:'center',
                                justifyContent:'center',
                                shadowColor: '#171717',
                                shadowOffset: {width: -2, height: 4},
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                // elevation: 20,
                                shadowColor: '#52006A',
                                marginVertical:10
                            }}><Text style={{color:firstname || surname || email ? COLORS.white:'#11182744', fontSize:16, fontWeight:400}}>Next</Text>
                        </Pressable>
                       
                        </View>

                    </View>
        </View>
        {/* </KeyboardAvoidingView> */}
     </View> 
  )
}

export default CreateAccount