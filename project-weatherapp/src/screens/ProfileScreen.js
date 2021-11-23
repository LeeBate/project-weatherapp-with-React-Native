// import { firebase } from '@firebase/app';
// import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/auth';
import { firebase } from '@firebase/app';
import Constants from 'expo-constants';
import firestore from '../../Firestore';

import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { Card } from 'react-native-shadow-cards';
import { theme } from '../core/theme';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [imgurl, setimgurl] = useState();
  const [name, setName] = useState();
   const [phoneNumber, setphoneNumber] = useState('');
  const [Profilepic, setProfilepic] = useState('');
  const [cuser, setCuser] = useState('');
  const [image, setImage] = useState('');






  useEffect(() => {
    async function CheckLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCuser(user);

       
          const email = setEmail(user.email);
          console.log(user)
            setName(user.displayName);
          const docRef = firestore.collection('user').doc(user.uid);

          docRef.get().then((doc) => {
            // setName(doc.data().name);
          });
          let storageRef = firebase.storage().ref();
          let picRef = storageRef.child(user.uid + '.jpg').getDownloadURL();

          picRef.then((url) => setImage(url));
        }
      });
    }
    CheckLogin();
       const unsubs = navigation.addListener('focus', () => {
      CheckLogin();
      
    });
    return unsubs;
  }, [navigation]);

  useEffect(() => {
    async function AskPer() {
      if (Platform.os != 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
            const { status2 } =
          await ImagePicker.requestCameraRollPermissionsAsync();
        if (status != 'granted') {
          alert('need Storage permission');
       
      }

    }}
    AskPer();
  }, []);

  async function GetImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      let response = await fetch(result.uri);
      let blob = await response.blob();

      let storageRef = firebase.storage().ref();
      let picRef = storageRef.child(cuser.uid + '.jpg');

      picRef.put(blob).then((pic) => {
        alert('uploaded');
        setImage(result.uri);
      });
    }
  }

  async function GetImageC() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      let response = await fetch(result.uri);
      let blob = await response.blob();

      let storageRef = firebase.storage().ref();
      let picRef = storageRef.child(cuser.uid + '.jpg');

      picRef.put(blob).then((pic) => {
        alert('uploaded');
        setImage(result.uri);
      });
    }
  }

  function Confirmbox() {
    Alert.alert('Confirm', 'Are you sure you want to Logout?', [
      { text: 'NO', style: 'cancel' },
      {
        text: 'YES',
        onPress: () => {
          console.log('signed out');
          firebase
            .auth()
            .signOut()
            .then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              });
            })
            .catch((error) => console.log(error.message));
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
        
            <View style={{ opacity: 1 }}>
              <View style={{ alignSelf: 'center' }}>
                <View style={styles.profileImage}>
                  <Image
                    source={
                      image == ''
                        ? require('../assets/default.jpg')
                        : { uri: image }
                    }
                    style={styles.image}
                  />
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.text}>{name} </Text>
                </View>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-start' }}></View>
            <View>
              <View style={styles.titleBar}></View>
            </View>
  
        </View>

        <View style={styles.bottomFlex}>
          <View style={styles.ButtonEdit}></View>

          <View>
            <View style={{ backgroundColor: 'red' }}></View>
          </View>

          <View
            style={[
              {
                backgroundColor: 'white',
                borderRadius: 0,
                width: '90%',
                bottom: 1,
                margin: 10,

                flex: 2,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              },
            ]}>
            <View
              style={{
                marginLeft: 0,
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                top: '0%',
              }}>
              <View style={styles.cardBox}>
                <Ionicons
                  size={30}
                  style={{ paddingVertical: 6 }}
                  color="#898989"
                  name="person-circle-outline"></Ionicons>

                <Text style={[styles.textBox, { marginLeft: 8 }]}>{name}</Text>
              </View>
            </View>
            <View
              style={{
                marginLeft: 0,
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                top: '0%',
              }}>
              <View style={styles.cardBox}>
                <Ionicons
                  size={30}
                  style={{ paddingVertical: 4 }}
                  color="#898989"
                  name="mail-outline"></Ionicons>

                <Text style={[styles.textBox, { marginBottom: 10,marginLeft: 8, margin: 5 }]}>
                  {email}
                </Text>
              </View>

               
              <View
                style={{ backgroundColor: 'white', justifyContent: 'center' }}>
                <View style={{ padding: 5 }}>
                  <Button
                    onPress={GetImage}
                    type="outline"
                    title="Change profile picture"
                    buttonStyle={{
                      backgroundColor: 'white',
                      borderWidth: 3,
                      marginTop: 5,
                      marginBottom: 10,
                    }}
                  />
                  <Button
                    onPress={GetImageC}
                    type="outline"
                    title="Change profile with camera "
                    buttonStyle={{
                      backgroundColor: 'white',
                      borderWidth: 3,
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  />
                  <Button
                    onPress={() => navigation.navigate('Edit')}
                    title="Edit Profile"
                    buttonStyle={{ backgroundColor: 'black' }}
                  />

                  <Button
                    onPress={Confirmbox}
                    title="Logout"
                    buttonStyle={{ backgroundColor: 'red', marginTop: 10 }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
              }}></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  ButtonEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
  },
  bottomFlex: {
    flex: 2,
    // backgroundColor: '#D2D9E3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
  },
  text: {
    fontFamily: 'Sora',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textBox: {
    paddingVertical: 10,
    fontFamily: 'Hahmlet',
    color: '#898989',
    textAlign: 'center',
    fontSize: 20,
  },

  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    marginTop: 15,
    width: 130,
    height: 130,
    borderRadius: 100,
    overflow: 'hidden',
  },

 
  
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 12,
    position: 'relative',
  },
  cardBox: {
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  AndroidSafeArea: {
    backgroundColor: 'white',
    flex: 1,
    opacity: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});