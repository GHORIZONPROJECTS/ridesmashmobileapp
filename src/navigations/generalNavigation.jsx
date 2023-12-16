import React, {useContext, useState, useEffect} from 'react'
import Drawer from './drawerNavigator'
import InviteFriendScreen from '../screens/inviteFriend'
import { createStackNavigator } from '@react-navigation/stack'
import CreateAccount from '../screens/signUp/createAccount'
import Dob from '../screens/signUp/dob'
import Gender from '../screens/signUp/gender'
import Weldone from '../screens/weldone'
import {serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db} from "../firebase";
import { AuthContext } from '../config/AuthContext';
import DestinationSearch from '../screens/destinationSearch'
import SearchResult from '../screens/searchResult'



const GeneralStack = createStackNavigator()

const GeneralNavigation = () => {

    const { user }= useContext(AuthContext);

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
      

    return(

        <GeneralStack.Navigator>
      {userData !== '' ? (
            <GeneralStack.Group>
                
                <GeneralStack.Screen name='Drawer' component={Drawer} options={{headerShown:false}} />
                <GeneralStack.Screen name='inviteFriend' component={InviteFriendScreen} options={{headerShown:false}}/>
                <GeneralStack.Screen name='DestinationSearch' component={DestinationSearch} options={{headerShown:false}}/>
                <GeneralStack.Screen name='SearchResult' component={SearchResult} options={{headerShown:false}}/>
            </GeneralStack.Group>
        )
         : (
            <GeneralStack.Group>
                <GeneralStack.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
                <GeneralStack.Screen name='dob' component={Dob} options={{headerShown:false}}/>
                <GeneralStack.Screen name='gender' component={Gender} options={{headerShown:false}}/> 
                <GeneralStack.Screen name='weldone' component={Weldone} options={{headerShown:false}}/>
                <GeneralStack.Screen name='Drawer' component={Drawer} options={{headerShown:false}} />
            </GeneralStack.Group>
         )
        } 
       
        </GeneralStack.Navigator>

    )
}

export default GeneralNavigation

