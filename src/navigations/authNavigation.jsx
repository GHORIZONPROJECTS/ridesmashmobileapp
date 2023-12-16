import { createStackNavigator } from '@react-navigation/stack';


// import CreateAccount from '../screens/signUp/createAccount';
// import Dob from '../screens/signUp/dob';
// import Gender from '../screens/signUp/gender';
import TelephoneOtp from '../screens/telephoneOtp';
// import Weldone from '../screens/weldone';


const auth = createStackNavigator();

const AuthNavigation = () => { 

    return(
        
            <auth.Navigator>
                <auth.Screen name='telephoneOtp' component={TelephoneOtp} options={{headerShown:false}}/>
                {/* <auth.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
                <auth.Screen name='dob' component={Dob} options={{headerShown:false}}/>
                <auth.Screen name='gender' component={Gender} options={{headerShown:false}}/> 
                <auth.Screen name='weldone' component={Weldone} options={{headerShown:false}}/> */}
            </auth.Navigator>
       
        
     
    )
}

export default AuthNavigation