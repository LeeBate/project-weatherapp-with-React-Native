import React, { useState,useEffect } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import {firebase} from "@firebase/app";
import firestore from '../../Firestore';
import '@firebase/auth';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  async function onLoginPressed() {
    console.log('Login email : ' + email.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    console.log('Login pass : ' + password.value);

    await firebase.auth()
    .signInWithEmailAndPassword(email.value,password.value)
    .then((user) => {
     // alert('สำเร็จ');

// user.user.updateProfile({
//         displayName: name.value,// set displayName
//         photoURL: 'https://hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg', //โปรไฟล์เริ่มต้นสำหรับทุกแอคเคท์
//       })
     
      navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    })
    })
    .catch((errror) => {
      alert('ไม่สำเร็จ');
    });    
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        
        navigation.reset({
          index: 0,
          routes: [{ name: 'MyTabs' }],
        }); 
      }
    });
  }, []);


  return (
    <Background>
      <Logo />
      <Header>Welcome to WeatherApp.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={{color:'white'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}
const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,// ความสูงระหว่าง button password & Login
  },
  row: {
    flexDirection: 'row',
    marginTop: 4, // Login & text Don't have\
    color:'while'
  },
  forgot: {
    fontSize: 13, //forgot pass
    fontWeight: 'bold',
    color: '#9debef',
  },
  link: {
    fontWeight: 'bold',
    color: '#9debef',
  },
})
