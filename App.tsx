/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import PropertyListing from './screens/PropertyListing/PropertyListing';
import PropertyDetails from './screens/PropertyDetails/PropertyDetails';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen">
          <Stack.Screen name="Splash Screen" component={SplashScreen} options={{
            headerShown: false,}}/>
          <Stack.Screen name="Property Listing" component={PropertyListing} options={{
            headerShown: false,}}/>
          <Stack.Screen name="Property Details" component={PropertyDetails} options={{
            headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
