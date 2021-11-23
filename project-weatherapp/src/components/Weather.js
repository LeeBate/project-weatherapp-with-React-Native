import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import SearchBar from './SearchBar';
import {
  haze,
  rainy,
  snow,
  sunny,
  clear,
  sun,
  heavy,
  heavy1,
  light,
  showers,
  sleet,
  snow1,
  thunder,
  cold,
} from '../assets/backgroudImages/index';
import firestore from '../../Firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import * as SecureStore from 'expo-secure-store';


export default function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [cuser, setCuser] = useState(null);

  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = weatherData;
  const [{ main }] = weather;
  console.log(name);

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
  }, [backgroundImage]);

  function getBackgroundImg(weather) {
    if (temp <= '0') return snow;
    if ((temp > '0') & (temp <= '10')) return snow1;
    if ((temp > '11') & (temp < '15')) return sleet;
    if ((temp > '14') & (temp < '20')) return cold;
    if ((temp > '20') & (temp < '25')) return heavy;
    if ((temp >= '25') & (temp <= '30')) return sun;
    if ((temp > '31') & (temp <= '35')) return sunny;
  }

  let textColor = backgroundImage !== (snow, snow1, sleet) ? 'white' : 'black';

  useEffect(() => {
    async function CheckLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCuser(user);
        }
      });
    }

    CheckLogin();
  }, []);

  async function AddFav() {
    let collRef = await firestore
      .collection('user')
      .doc(cuser.uid)
      .collection('fav');
    collRef
      .add({
        favname: name,
      })
      .catch((err) => console.log(err.message));

    //alert('เพื่มแล้วน้ะจ๊ะ');
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover">
        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: 'bold',
              fontSize: 46,
            }}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: 'bold',
            }}>
            {main}
          </Text>
          <Text style={{ ...styles.headerText, color: textColor }}>
            {temp} °C
          </Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
          </View>
        </View>
        <View style={styles.info1}>
          <TouchableOpacity onPress={AddFav}>
            <Text style={{ fontSize: 22, color: 'white',}}>
              Add Myfavorite City{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  info1: {
    width: '70%',

    marginHorizontal: 60,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
