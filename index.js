import { registerRootComponent } from 'expo';
import App from './App';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import backendApi from './src/api/backendApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LOCATION_TASK_NAME = 'background-location-task';
let user = null
const requestPermissions = async () => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
            AsyncStorage.getItem('ubicacion', (err, result) => {
                user = JSON.parse(result)
            })
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                accuracy: Location.Accuracy.BestForNavigation,
                deferredUpdatesDistance: 30,
                timeInterval: 5000,
                activityType: Location.ActivityType.AutomotiveNavigation,
                showsBackgroundLocationIndicator: true,
                foregroundService: {
                    killServiceOnDestroy: true,
                    notificationBody: "Usando ubicacion en 2 plano",
                    notificationTitle: "Ubicacion",
                    
                }
            });
        }
    }
    else{
    }
};
requestPermissions()

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
        // do something with the locations captured in the background
        try {
            console.log(locations[0].coords.latitude, locations[0].coords.longitude)
            user.latitud = locations[0].coords.latitude
            user.longitud = locations[0].coords.longitude
            backendApi.put(`/ubicaciones/${user.id}`, user)
        } catch (error) {
            console.log("erorrrrr", error)
        }
    }
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
