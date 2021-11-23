import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';
import Weather from '../components/Weather';
import SearchBar from '../components/SearchBar';
import { Constants, Location, Permissions } from 'expo';
import firestore from '../../Firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';

const API_KEY = 'cc06b60003604258f214ffcc17560704';

export default function Dashboard({ route, navigation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [param, setParam] = useState(null);
  const [Default, setDefault] = useState(route.params? route.params.nameId : 'Thailand');
  const [Cuser, setCuser] = useState('');

  async function fetchWeatherData(cityName) {
    setLoaded(false);
   

    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  //   if(route.params){
  //  const data = route.params.nameId;

  //   console.log(data)
  //   if(data)
  //   {
  //     setDefault(data)
  //   }}
    fetchWeatherData(Default);
    console.log("ssssssssss"+Default)
  }, []);


  async function FethFav() {
    const user = firebase.auth().currentUser;
    if (user) {
     
      setCuser(user);
      // console.log(ceruser.uid);
      // console.log('aaaaxxx' + user.uid);
   
    }

    const collRef = firestore
      .collection('user')
      .doc(user.uid)
      .collection('fav_default');

    console.log(user.uid);

   
  }


  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={16} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>
          City Not Found! Try Different City
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
});
