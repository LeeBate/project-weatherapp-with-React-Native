import React from 'react'
import { View, Text , StyleSheet , Image, Platform } from 'react-native'
import {colors} from '../core/ColorMyHome'
import { Picker } from '@react-native-community/picker'
const {PRIMARY_COLOR , SECONDARY_COLOR} = colors

export default function WeatherInfo({currentWeather , currentWeatherDetails}) {
    const {
        main: {temp,fahrenheit,humidity},
        weather: [details],
        name
        } = currentWeatherDetails;

        const { icon , main , description} = details

        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text style={{fontFamily:"sora",fontSize:30}}>{name}</Text>
            <Image style = {styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style = {styles.textPrimary} >{temp}°</Text>
            <Text style = {styles.textSecondary}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherIcon:{
      marginTop: 20,
        width: 100,
        height: 100
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        
    },
})