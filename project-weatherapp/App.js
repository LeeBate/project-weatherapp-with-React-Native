import React from "react"
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from './src/core/theme'
import { Text, View } from 'react-native';
import firestore from './Firestore';
import '@firebase/auth';
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SearachScreen,
  ProfileScreen ,
  MyHome,
  EditScreen,
  FavorcityScreen
} from './src/screens'


function Home() {
  return (
    <View >
    </View>
  );
}

function Profile() {
  return (
    <View >
    </View>
  );
}

function SearchCountry() {
  return (
    <View >
    </View>
  );
}
function Favorcity() {
  return (
    <View >
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      
      <Tab.Screen
        name="Home"
        component={MyHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search Country"
        component={SearachScreen}
        options={{
          unmountOnBlur:true,
          tabBarLabel: 'Search Country',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Favorite City"
        component={FavorcityScreen}
        options={{
          tabBarLabel: 'Favorite City',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator()
 function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
      <Stack.Navigator
      initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }} >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="SearachScreen" component={SearachScreen} />
          <Stack.Screen name="MyHome" component={MyHome} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
          <Stack.Screen name="FavorcityScreen" component={FavorcityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default App;
