import '@firebase/auth';
import { firebase } from '@firebase/app';
import Constants from 'expo-constants';
import firestore from '../../Firestore';
import Dialog from 'react-native-dialog';

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
  TextInput,
  Form,
} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';

import BackButton from '../components/BackButton';
import { Card } from 'react-native-shadow-cards';
import { theme } from '../core/theme';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

export default function EditScreen({ navigation }) {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [Password, setPassword] = useState(null);
  const [visible, setVisible] = useState(false);
  const [cuser, setCuser] = useState(null);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setCuser(user);
      setName(user.displayName);
      setEmail(user.email);
      console.log(user);
    }
  }, []);

  async function Submit() {
    const user = await firebase.auth().currentUser;
    if (user) {
      console.log(user);
      user
        .updateProfile({
          displayName: Name,
        })
        .then(() => {
          user
            .updateEmail(Email)
            .then(function () {
              alert('Saved Succes');
              navigation.goBack();
            })
            .catch(function (error) {
              if (error.code === 'auth/requires-recent-login') {
                console.log(Password);
                const user = firebase.auth().currentUser;
                setVisible(true);
              }
            });
        });
    }

    console.log(Name);
    console.log(Email);
    console.log(PhoneNumber);
  }
  const handleCancel = (user) => {
    setVisible(false);
    console.log(cuser);
    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = firebase.auth.EmailAuthProvider.credential(
      cuser.email,
      Password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // User re-authenticated.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };
  return (
    <View style={styles.AndroidSafeArea}>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{ fontSize: 30, textAlign: 'center', marginVertical: 50 }}>
            Edit Profile
          </Text>
          <View>
            <Text style={{ marginLeft: 10 }}>Name :</Text>
            <TextInput
              style={styles.input}
              defaultValue={Name}
              onChangeText={(textename) => setName(textename)}
            />
          </View>
          <View>
            <Text style={{ marginLeft: 10 }}>Email :</Text>
            <TextInput
              style={styles.input}
              defaultValue={Email}
              onChangeText={(textemail) => setEmail(textemail)}
            />
          </View>

          <View style={{ padding: 10, marginTop: 16 }}>
            <Button
              title="Save"
              buttonStyle={{ backgroundColor: '#560CCE' }}
              onPress={Submit}
            />
            <View style={{ marginBottom: 30 }}></View>
            <Button
              onPress={() => navigation.navigate('Profile')}
              title="Back"
              buttonStyle={{ backgroundColor: 'black' }}
            />
          </View>
        </View>
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Input
          label="Password"
          onChangeText={(pass) => setPassword(pass)}
        />
        <Dialog.Button label="OK" onPress={() => handleCancel(cuser)} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: 'white',
    flex: 1,
    opacity: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
