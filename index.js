import { registerRootComponent } from 'expo';
import App from './App';
import * as TaskManager from 'expo-task-manager';
import backendApi from './src/api/backendApi.js';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LOCATION_TASK_NAME = 'background-location-task';
const NOTIFICATION_TASK_NAME = "background-notification-task"
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

let user = null
async function schedulePushNotification(viaje, token) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Nuevo viaje",
            body: `Dirección: ${viaje.viaje.direccion.toUpperCase()}`,
            data: { data: token },
        },
        trigger: null
    });
}
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.log("ERORRRRR", error)
        return;
    }
    if (user === null) {
        AsyncStorage.getItem('ubicacion', (err, result) => {
            user = JSON.parse(result)
        })
    }
    if (data) {
        const { locations } = data;
        try {
            user.latitud = locations[0].coords.latitude
            user.longitud = locations[0].coords.longitude
            backendApi.put(`/ubicaciones/${user.id}`, user)
        } catch (error) {
            console.log("erorrrrr", error)
        }
    }
});

TaskManager.defineTask(NOTIFICATION_TASK_NAME, async ({ data, error }) => {
    try {
        const notificationData = data
        console.log("acaaaaa", notificationData)
        const response = await backendApi.get(`/vehiculos/${user.vehiculo_id}/misViajes`);
        const nuevoViajeEncontrado = response.data.datos.find(viaje => viaje.isNew === true);
        if(nuevoViajeEncontrado){
            const token = await AsyncStorage.getItem("ExpoToken")
            await schedulePushNotification(nuevoViajeEncontrado, token)
        }
    } catch (error) {
        console.log("erorrrrr", error)
    }
})

registerRootComponent(App);
