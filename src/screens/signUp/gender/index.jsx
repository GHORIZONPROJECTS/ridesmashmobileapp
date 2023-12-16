import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
// import './styles.js'
import { COLORS, SIZES } from "../../../constants/theme.js";

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";
import {serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { AuthContext } from '../../../config/AuthContext';
import Loader from "../../../components/loader/index.jsx";

const Gender = ({navigation}) => {
  const items = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];

  const [sex, setSex] = useState(0);

  const [error, setError] = useState('');

  const [loading, setLoading ] = useState(false)

  const { user } = useContext(AuthContext)


  const handleGender = async () => {
    setLoading(true)
    try{
      
      if (sex !== '') {


        await updateDoc(doc(db, "rider", user.uid), {
          
          sex: sex === 0 ? 'Male' : 'Female',
          // value: value,
          timeStamp: serverTimestamp(),

      }).then(() => {
        setLoading(false)
        navigation.navigate('weldone')

          
      })

    }
            
    }catch(error){

      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
      style={{ flex: 1, alignItems: "center", paddingTop: 80 }}
    >
      <Loader visible={loading}/>
      <ImageBackground
        source={require("../../../../assets/images/authentication/background-top.png")}
        style={{
          width: "100%",
          height: 216,
          // padding: 20,
          // paddingVertical: 40,
          position: "absolute",
          top: 0,
        }}
        // resizeMode='contain'
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-start",
        }}
      />
      <ImageBackground
        source={require("../../../../assets/images/onboarding/background-bottom.png")}
        style={{
          width: "100%",
          height: 122,
          // padding: 20,
          // paddingVertical: 40,
          position: "absolute",
          // top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        // resizeMode='contain'
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      />

      {/* <ScrollView> */}

      <View
        style={{
          width: SIZES.width * 0.85,
          height: "80%",
          border: 1,
          borderColor: "black",
        }}
      >
        <View style={{ alignItems: "center", paddingVertical: 20, height: 70 }}>
          <Image
            source={require("../../../../assets/images/authentication/logo.png")}
            style={{ width: 158, height: 46 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            height: 480,
            width: "100%",
            paddingVertical: 20,
            borderRadius: 20,
            backgroundColor: "#fff",
            borderColor: "#ddd",
            borderBottomWidth: 0.5,
            shadowColor: "#171717",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 20,
            shadowColor: "#52006A",
          }}
        >
          <View
            style={{
              flex: 1,
              // alignItems: "center",
              marginTop: 30,
              paddingTop: 15,
            }}
          >
            <View style={{alignItems:'center', marginBottom:15}}>
              <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize:18 }}> Create Account</Text>
           </View>
            <View style={{}}>
              <Text style={{ marginBottom: 2, fontSize: 18 }}>Select Gender</Text>
            </View>
           

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: 270,
                borderWidth: 1,
                borderColor: "#E4E4E7",
                backgroundColor: "#FDFDFD",
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 20,
                marginVertical: 20,
              }}
            >
         

              <RadioForm
                // formHorizontal={true}
                animation={true}
              >
                {/* To create radio buttons, loop through your array of options */}
                {
                  items.map((obj, index) => (
                    <RadioButton labelHorizontal={true} key={index} >
                      {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={index}
                        isSelected={ index === sex}
                        onPress={(sex) => setValue(sex)}
                        borderWidth={3}
                        buttonInnerColor={COLORS.main}
                        // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                        buttonSize={30}
                        // buttonOuterSize={80}
                        buttonStyle={{}}
                        buttonWrapStyle={{marginRight: 10, marginBottom:15}}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={index}
                        labelHorizontal={true}
                        onPress={(value) => setValue(sex)}
                        labelStyle={{fontSize: 18, color: '#000'}}
                        labelWrapStyle={{}}
                      />
                    </RadioButton>
                  ))
                }  
              </RadioForm>
            </View>

            <Pressable
              onPress={() => handleGender()}
              style={{
                borderRadius: 10,
                width: 270,
                height: 50,
                backgroundColor: COLORS.main,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 20,
                shadowColor: "#52006A",
                marginVertical: 10,
              }}
            >
              <Text
                style={{ color: COLORS.white, fontSize: 16, fontWeight: 400 }}
              >
                Next
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default Gender;
