import Main from './src/components/Main.jsx';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './src/context/authContext.js';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar style='light' />
        <Main />
      </NavigationContainer>
    </AuthContextProvider>
  );
}