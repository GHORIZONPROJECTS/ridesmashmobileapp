import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home/'
import AccountScreen from '../screens/account'

import { Ionicons } from '@expo/vector-icons';
import {COLORS, SIZES} from '../constants/theme'
import EarningScreen from '../screens/Earnings';
import FriendScreen from '../screens/friends';
// import { CartContext } from '../config/CartContext'



const ClientTabs = createBottomTabNavigator()

const RootClientTabs = ({navigation}) => {

    // const { totalQty } = useContext(CartContext);
  
  return (
   <ClientTabs.Navigator
        
         screenOptions={({route, navigation})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName
                if(route.name === 'home'){
                    iconName = focused
                    ? 'ios-home'
                    : 'ios-home-outline';
                }  else if (route.name === 'earnings') {
                    iconName = focused 
                    ? 'ios-wallet' 
                    : 'ios-wallet-outline';
                } else if (route.name === 'friends') {
                    iconName = focused 
                    ? 'ios-people' 
                    : 'ios-people-outline';
                } else if (route.name === 'account') {
                    iconName = focused 
                    ? 'ios-person' 
                    : 'ios-person-outline';
                  }
                return <Ionicons name={iconName} size={size} color={COLORS.primary} />
                
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel:true,

                  
 
        })} 
   >
        <ClientTabs.Screen  
            name="home" 
            component={HomeScreen}
            options={
                {
                     headerShown:false

                    
                   
                }
            }
            
          
        />
         
        <ClientTabs.Screen  
            name="earnings" 
            component={EarningScreen}
            options={
                {
                    headerShown:false,
                    //  tabBarBadge: 1
                
                }
            }
        />
        <ClientTabs.Screen  
            name="friends" 
            component={FriendScreen}
            options={
                {
                    headerShown:false
                 
                }
            }
        />
        {/* <ClientTabs.Screen  
            name="plan" 
            component={FoodPlanScreen}
            options={
                {
                    headerShown:false
                    
                  
                }
            }
        /> */}

          <ClientTabs.Screen  
            name="account" 
            component={AccountScreen}
             options={
                {
                    headerShown:false
                  
                }
            } 
        /> 
       
   </ClientTabs.Navigator>

   
   
  )
}

export default RootClientTabs