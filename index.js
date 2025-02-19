import { registerRootComponent } from 'expo';
import App from './App';
import * as TaskManager from 'expo-task-manager';
import backendApi from './src/api/backendApi.js';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_TASK_NAME = 'background-location-task';
const NOTIFICATION_TASK_NAME = 'background-notification-task';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

let user = null;

// Función para cargar el usuario de AsyncStorage
async function loadUser() {
  try {
    const result = await AsyncStorage.getItem('ubicacion');
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error("Error loading user from AsyncStorage:", error);
    return null;
  }
}

// Función para programar la notificación push
async function schedulePushNotification(viaje, token) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nuevo viaje",
        // Verifica que la estructura de "viaje" sea la esperada:
        body: `Dirección: ${viaje.viaje.direccion.toUpperCase()}`,
        data: { token },
      },
      trigger: null,
    });
  } catch (error) {
    console.error("Error scheduling push notification:", error);
  }
}

// Tarea para actualizar la ubicación en segundo plano
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Error in location task:", error);
    return;
  }

  // Cargar el usuario si aún no se ha obtenido
  if (!user) {
    user = await loadUser();
    if (!user) {
      console.warn("No user data available for location update");
      return;
    }
  }

  if (data) {
    const { locations } = data;
    if (locations && locations.length > 0) {
      try {
        console.log(locations[0].coords)
        const { latitude, longitude } = locations[0].coords;
        user.latitud = latitude;
        user.longitud = longitude;
        // Actualizar la ubicación en el backend
        await backendApi.put(`/ubicaciones/${user.id}`, user);
      } catch (err) {
        console.error("Error updating location:", err);
      }
    }
  }
});

// Tarea para procesar notificaciones en segundo plano
TaskManager.defineTask(NOTIFICATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error("Error in notification task:", error);
    return;
  }

  try {
    console.log("Notification task triggered with data:", data);

    // Asegurarse de tener el usuario cargado
    if (!user) {
      user = await loadUser();
      if (!user) {
        console.warn("No user data available for notification task");
        return;
      }
    }

    if (!user.vehiculo_id) {
      console.warn("User does not have vehiculo_id");
      return;
    }

    const response = await backendApi.get(`/vehiculos/${user.vehiculo_id}/misViajes`);
    if (response?.data?.datos) {
      const nuevoViajeEncontrado = response.data.datos.find(viaje => viaje.isNew === true);
      if (nuevoViajeEncontrado) {
        const token = await AsyncStorage.getItem("ExpoToken");
        await schedulePushNotification(nuevoViajeEncontrado, token);
      }
    } else {
      console.warn("Unexpected response format in notification task:", response);
    }
  } catch (err) {
    console.error("Error processing notification task:", err);
  }
});

registerRootComponent(App);
