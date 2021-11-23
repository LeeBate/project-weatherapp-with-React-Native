import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Dimensions,Button } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 
import firestore from '../../Firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';

export default function SearchBar({ fetchWeatherData}) {
    const [cityName, setCityName] = useState('');
    
    return (
      <View>
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter City name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons  name="search" size={30} color="black"  onPress={() => fetchWeatherData(cityName)}/>
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        paddingVertical: 15, //ขนาดทั้งหมด
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
    },

})
