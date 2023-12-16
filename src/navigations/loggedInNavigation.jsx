import React, {useEffect, useContext, useState} from 'react'
import Drawer from './drawerNavigator'
import InviteFriendScreen from '../screens/inviteFriend'
import { createStackNavigator } from '@react-navigation/stack'
import CreateAccount from '../screens/signUp/createAccount'
import Dob from '../screens/signUp/dob'
import Gender from '../screens/signUp/gender'
import Weldone from '../screens/weldone'
import {auth, db} from '../firebase';
import { AuthContext } from '../config/AuthContext';
import {doc, getDoc} from "firebase/firestore";



const loggedInStack = createStackNavigator()

const LoggedInNavigation = ({navigation}) => {


    const { user }= useContext(AuthContext);

    const [userData, setUserData] = useState(null)

    // const getUser = async() => {
    //     // setIsLoading(true)
    //       const docRef = doc(db, "rider", user.uid);
    //       const docSnap = await getDoc(docRef);
          
    //       if (docSnap.exists()) {
    
    //         setUserData(docSnap.data())
    //         // setIsLoading(false)
            
          
    
    //       } else {
    
    //         console.log("No such document!");
    //       }
    //   }
    
    //   useEffect(()=>{
    //     getUser()

        
    //   }, [])

    //   if(!userData) {navigation.navigate('createAccount')}

    return(

        <loggedInStack.Navigator>
                <loggedInStack.Screen name='drawer' component={Drawer} options={{headerShown:false, gestureEnabled: false}} />
                <loggedInStack.Screen name='inviteFriend' component={InviteFriendScreen} options={{headerShown:false}}/>
                <loggedInStack.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
                <loggedInStack.Screen name='dob' component={Dob} options={{headerShown:false}}/>
                <loggedInStack.Screen name='gender' component={Gender} options={{headerShown:false}}/> 
                <loggedInStack.Screen name='weldone' component={Weldone} options={{headerShown:false}}/>
                
                       
        </loggedInStack.Navigator>

    )
}

export default LoggedInNavigation

