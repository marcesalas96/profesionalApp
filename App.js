import Main from './src/components/Main.jsx';
import { NativeRouter } from 'react-router-native';
import React, { useEffect, useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import GetGeoLocation from './src/components/GetGeoLocation.jsx';
import backendApi from './src/api/backendApi.js';


export default function App() {
  const LOCATION_TASK_NAME = 'background-location-task';
  const [location, setLocation] = useState()
  const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          deferredUpdatesDistance: 1,
          timeInterval: 5000,
          activityType: Location.ActivityType.AutomotiveNavigation,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            killServiceOnDestroy: true,
            notificationBody: "Usando ubicacion en 2 plano",
            notificationTitle: "Ubicacion"
          }
        });
      }
    }
  };
  requestPermissions()
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      console.log("ERORRRRR", error)
      return;
    }
    if (data) {
  
      const { locations } = data;
      // do something with the locations captured in the background
      setLocation(locations[0].coords)
      // backendApi.put("/ubicaciones/23", {latitud: location.latitud, longitud: location.longitud})
    }
  });

  return (
    <NativeRouter>
      <Main />
      <GetGeoLocation location={location} />
    </NativeRouter>
  );
}