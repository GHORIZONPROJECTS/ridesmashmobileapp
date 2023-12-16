import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
import BioAuthNavigation from './bioAuthNavigation'; 
import LoggedInNavigation from './loggedInNavigation';
import { View, ActivityIndicator } from 'react-native';
import {auth} from '../firebase';
import { AuthContext } from '../config/AuthContext';
import { db } from '../firebase'
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";


const BioLogInNavigation = ({navigation}) =>{

const { user } = useContext(AuthContext);
// const [isLoading, setIsLoading] = useState(true);
const [userData, setUserData] = useState('')



  const getUser = async() => {
    // setIsLoading(true)
    const docRef = doc(db, "rider", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        setUserData(docSnap.data())
        // setIsLoading(false)
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getUser()
  }, [])

  console.log(userData)

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size='large' />
  //     </View>
  //   );
  // }

    return(
        <View>
            {userData ? <LoggedInNavigation /> : <BioAuthNavigation />} 
        </View>
    )
          
            
        
    
}

export default BioLogInNavigation;