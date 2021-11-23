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

import { Card } from 'react-native-shadow-cards';
import { theme } from '../core/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
export default function FavorcityScreen({ navigation }) {
  const [Cuser, setCuser] = useState('');
  const [data, setData] = useState([]);
  const [uid, setUid] = useState('');

  useEffect(() => {}, []);

  async function FethFav() {
    const user = firebase.auth().currentUser;
    if (user) {
      setCuser(user);

    }
    const collRef = firestore
      .collection('user')
      .doc(user.uid)
      .collection('fav');

    console.log(user.uid);
    setUid(user.uid);
    await collRef.get().then((querysnap) => {
      console.log(querysnap);
      const tempDoc = querysnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setData(tempDoc);
    });
  }

  useEffect(() => {
    const unsubs = navigation.addListener('focus', () => {
      FethFav();
    });
    return unsubs;
  }, [navigation]);

  async function Handledelete(id) {
    let collRef = await firestore
      .collection('user')
      .doc(uid)
      .collection('fav')
      .doc(id);

    await collRef.delete();
    FethFav();
    //alert('ลบสำเร็จแล้ว');
    
  }

  function FavCard() {
    return (
      <>
        {data.map((item) => (
          <TouchableOpacity
            onLongPress={() => Handledelete(item.id)}
            onPress={() =>
              navigation.push('Search Country', {
                nameId: item.favname,
              })
            }>
            <View>
              <View style={styles.card}>
                <Ionicons
                  size={15}
                  style={{ paddingVertical: 6 }}
                  color="#898989"
                  name="location-outline"></Ionicons>
                <Text style={{ fontWeight: 'bold', flex: 1 }}>
                  {' '}
                  {item.favname}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
    );
  }

  return (
    <View style={styles.table}>
      <ScrollView>
        {data.map((item) => (
          <TouchableOpacity
            onLongPress={() => Handledelete(item.id)}
            onPress={() =>
              navigation.navigate('Search Country', {
                nameId: item.favname,
              })
            }>
            <View>
              <View style={styles.card}>
                <Ionicons
                  size={20}
                  style={{ paddingVertical: 6 }}
                  color="red"
                  name="location-sharp"></Ionicons>
                <Text style={{ fontWeight: 'bold', flex: 1 }}>
                  {' '}
                  {item.favname}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 3,
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  table: {
    flex:1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#545453',
  },
});
