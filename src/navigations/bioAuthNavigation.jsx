import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import TelephoneAuth from '../screens/telephoneAuth';
import CreateAccount from '../screens/signUp/createAccount';
import Dob from '../screens/signUp/dob';
import Gender from '../screens/signUp/gender';
import Weldone from '../screens/weldone';


const bio = createStackNavigator();

const BioAuthNavigation = () => { 

    return(
        
            <bio.Navigator initialRouteName = 'createAccount'>
                {/* <bio.Screen name='telephoneAuth' component={TelephoneAuth} options={{headerShown:false}}/> */}
                <bio.Screen name='createAccount' component={CreateAccount} options={{headerShown:false}}/>
                <bio.Screen name='dob' component={Dob} options={{headerShown:false}}/>
                <bio.Screen name='gender' component={Gender} options={{headerShown:false}}/>
                <bio.Screen name='weldone' component={Weldone} options={{headerShown:false}}/>
            </bio.Navigator>
       
        
     
    )
}

export default BioAuthNavigation