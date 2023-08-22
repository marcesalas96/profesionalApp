import { registerRootComponent } from 'expo';
import App from './App';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import backendApi from './src/api/backendApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LOCATION_TASK_NAME = 'background-location-task';
let user = null
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.log("ERORRRRR", error)
        return;
    }
    if(user === null){
        AsyncStorage.getItem('ubicacion', (err, result) => {
            user = JSON.parse(result)
        })
    }
    if (data) {
        const { locations } = data;
        console.log(locations)
        try {
            user.latitud = locations[0].coords.latitude
            user.longitud = locations[0].coords.longitude
            backendApi.put(`/ubicaciones/${user.id}`, user)
        } catch (error) {
            console.log("erorrrrr", error)
        }
    }
});

registerRootComponent(App);
