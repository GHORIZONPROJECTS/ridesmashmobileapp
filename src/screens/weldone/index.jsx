import { StyleSheet, Text, View, KeyboardAvoidingView, ImageBackground, Image, Pressable, ToastAndroid } from 'react-native'
import React from 'react';
import { SIZES, COLORS } from '../../constants/theme';

const Weldone = ({navigation}) => {

  const handleWeldone = () => {
    try {
      
      navigation.navigate('Drawer')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    enabled={false}
    style={{ flex: 1, alignItems: "center", paddingTop: 80 }}
  >
    <ImageBackground
      source={require("../../../assets/images/authentication/background-top.png")}
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
      source={require("../../../assets/images/onboarding/background-bottom.png")}
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
          source={require("../../../assets/images/authentication/logo.png")}
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
        
         

          {/* <View
            style={{
              flexDirection: "column",
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
          > */}
       
          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Image
              source={require("../../../assets/images/welcome/transportation.png")}
              style={{ width: 234, height: 165 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ alignItems: "center", paddingVertical: 20 }}>
            <Image
                source={require("../../../assets/images/welcome/check.png")}
                style={{ width: 51, height: 37 }}
                resizeMode="contain"
              />
          </View>

          <View style={{alignItems:'center', marginBottom:15}}>
              <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize:18 }}> Well Done! </Text>
           </View>
              
      </View>

          <Pressable
            onPress={() => handleWeldone()}
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
    {/* </View> */}
    {/* </ScrollView> */}
  </KeyboardAvoidingView>
  )
}

export default Weldone

const styles = StyleSheet.create({})