import Main from './src/components/Main.jsx';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Main />
    </NavigationContainer>
  );
}