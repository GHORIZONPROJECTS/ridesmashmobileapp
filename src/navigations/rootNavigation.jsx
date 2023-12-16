import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation'
// import AuthStack from './authNavigation'
// import LoggedInNavigation from './loggedInNavigation';
// import { View, ActivityIndicator } from 'react-native';
import {auth} from '../firebase';
import { AuthContext } from '../config/AuthContext';
// import BioLogInNavigation from './bioLogInNavigation';
import GeneralNavigation from './generalNavigation';
// import TelephoneAuth from '../screens/telephoneAuth';
// import TelephoneOtp from '../screens/telephoneOtp';
// import CreateAccount from '../screens/signUp/createAccount';
// import Dob from '../screens/signUp/dob';
// // import HomeScreen from '../screens/home';
// import Drawer from './drawerNavigator';
// import Gender from '../screens/signUp/gender';
// import Weldone from '../screens/weldone';
// import InviteFriendScreen from '../screens/inviteFriend';
// import { db } from '../firebase'
// import {doc, getDoc} from "firebase/firestore";

// const root = createStackNavigator();

const navigation = ({navigation}) =>{

const { user, setUser } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);

// const [userData, setUserData] = useState([])


useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);


  // const getUser = async() => {
  //   const docRef = doc(db, "rider", user.uid);
  //     const docSnap = await getDoc(docRef);
      
  //     if (docSnap.exists()) {

  //       setUserData(docSnap.data())
        
  //     } else {

  //       console.log("No such document!");
  //     }
  // }

  // useEffect(()=>{
  //   getUser()
  // }, [])

  // console.log(userData)

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size='large' />
  //     </View>
  //   );
  // }

    return(

      // <NavigationContainer>
           
      // {user ? <LoggedInNavigation /> : <AuthStack />} 
      
      //  {/* <root.Navigator initialRouteName = 'createAccount'>
      //    <root.Screen name='telephoneOtp' component={TelephoneOtp} options={{headerShown:false}}/> 
      //    <root.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
      //    <root.Screen name='dob' component={Dob} options={{headerShown:false}}/>
      //    <root.Screen name='gender' component={Gender} options={{headerShown:false}}/>
      //    <root.Screen name='weldone' component={Weldone} options={{headerShown:false}}/>
      //    <root.Screen name='home' component={Drawer} options={{headerShown:false, gestureEnabled: false}} />
      //    <root.Screen name='inviteFriend' component={InviteFriendScreen} options={{headerShown:false}}/>
      //  </root.Navigator> */}
      // </NavigationContainer>
        <NavigationContainer>

              {/* {user ? <LoggedInNavigation /> : <AuthNavigation/>}  */}
           
             {user ? <GeneralNavigation /> : <AuthNavigation />} 
            
              {/* <root.Navigator initialRouteName = 'telephoneOtp'>
                <root.Screen name='telephoneOtp' component={TelephoneOtp} options={{headerShown:false}}/> 
                <root.Screen name='telephoneAuth' component={TelephoneAuth} options={{headerShown:false}}/> 
                <root.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
                <root.Screen name='dob' component={Dob} options={{headerShown:false}}/>
                <root.Screen name='gender' component={Gender} options={{headerShown:false}}/>
                <root.Screen name='weldone' component={Weldone} options={{headerShown:false}}/>
                <root.Screen name='home' component={Drawer} options={{headerShown:false, gestureEnabled: false}} />
                <root.Screen name='inviteFriend' component={InviteFriendScreen} options={{headerShown:false}}/>
              </root.Navigator> */}
        </NavigationContainer>
    )
}

export default navigation;