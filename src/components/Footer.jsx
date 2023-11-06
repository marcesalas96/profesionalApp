import { faToggleOn, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { View, StyleSheet } from 'react-native'
import FooterTab from './FooterTab'
import backendApi from "../api/backendApi"
import { useNavigation } from '@react-navigation/native'
import { ModalNotificaciones } from './ModalNotificaciones'
import { useContext, useState, useEffect, useRef } from 'react'
import Context from '../context/authContext'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#20232a",
        padding: 15,
        flexDirection: 'row',
        justifyContent: "center",
        gap: 50
    },
    text: {
        color: "#fafafa",
        fontSize: 12,
        textAlign: "center"
    },
    footerContainer: {
        justifyContent: "flex-end",
        width: 150

    },
    logo: {
        alignSelf: "center",
        color: "#ffffff"
    },
    active: {
        color: "#0d6efd",
    },
    isNew: {
        alignSelf: "center",
        color: "#ffff",
    }

})

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Footer = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [nuevoViaje, setNuevoViaje] = useState(null)
    const { user, estado } = useContext(Context)

    const getNewViaje = async () => {
        try {
            const response = await backendApi.get(`/vehiculos/${user.vehiculo_id}/misViajes`);
            const nuevoViajeEncontrado = response.data.datos.find(viaje => viaje.isNew === true);
            setNuevoViaje(nuevoViajeEncontrado);
        } catch (error) {
            console.log("Error en getNewViaje", error);
        }
    };

    async function schedulePushNotification(viaje) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Nuevo viaje",
                body: `Dirección: ${viaje.viaje.direccion}`,
                data: { data: 'goes here' },
            },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
              });
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token.data;
    }
    const useNotification = async (viaje) => {
        await schedulePushNotification(viaje)
        console.log(expoPushToken)
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            await getNewViaje();
        }, 10000);
        return () => clearInterval(interval)
    }, [user]);
    useEffect(() => {
        if (nuevoViaje && estado.disponible === true) {
            useNotification(nuevoViaje)
            setVisible(true);
        }
    }, [nuevoViaje])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <>
            <ModalNotificaciones visible={visible} setVisible={setVisible} nuevoViaje={nuevoViaje} user={user} />
            <View style={styles.container}>
                <FooterTab to={"home"} icon={faToggleOn} styles={styles} navigation={navigation}>Estado</FooterTab>
                <View style={{ flexDirection: "row" }}>
                    <FooterTab to={"viajes"} icon={faCommentDots} styles={styles} navigation={navigation}> Viajes </FooterTab>
                </View>
            </View>
        </>
    )
}

export default Footer