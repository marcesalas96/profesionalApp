import { Button, View, StyleSheet, Text, Dimensions } from 'react-native'
import { Formik, useField } from 'formik'
import { TextInput } from 'react-native'
import * as yup from 'yup'
import backendApi from '../api/backendApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react'
import * as Battery from 'expo-battery';
import Context from '../context/authContext'
import { ModalPermisos } from './ModalPermisos'
import * as Location from 'expo-location';

const styles = StyleSheet.create({
    container: {
        width: 350,
        alignSelf: "center",
        marginTop: Dimensions.get("window").height / 2 - 150,
        backgroundColor: "#eee",
        borderRadius: 4,
        height: 280,
        justifyContent: "space-between",
        padding: 10
    },
    input: {
        padding: 5,
        backgroundColor: "#ddd",
        borderRadius: 5
    },
    error: {
        color: "red",
        fontSize: 14,
        marginTop: -30
    },
    borderError: {
        borderColor: "red",
        borderWidth: 1
    }
})

const initialValues = {
    user: "",
    password: ""
}

const validationSchema = yup.object().shape({
    user: yup.string().required("El usuario es obligatorio"),
    password: yup.string()
})

const FormikInputValue = ({ error, style = {}, name, ...props }) => {
    const {password, type} = props
    const [field, meta, helpers] = useField(name)
    const inputStyle = [
        styles.input,
        style,
        meta.error && styles.borderError
    ]
    return (
        <>
            <TextInput
                value={password && type==="password" ? password : field.value}
                onChangeText={value => helpers.setValue(value)}
                {...props}
                style={inputStyle}
                error={meta.error}

            />
            {
                meta.error && <Text style={styles.error}>{meta.error}</Text>
            }
        </>
    )
}


const LogInPage = () => {

    const [loginError, setloginError] = useState("")
    const { setToken } = useContext(Context)
    const [visible, setVisible] = useState(false)
    const [visibleBateria, setVisibleBateria] = useState(false)
    const LOCATION_TASK_NAME = 'background-location-task';
    const [password, setPassword] = useState(null)

    const requestPermissions = async () => {
        const pass = await AsyncStorage.getItem("password")
        setPassword(pass)
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus === 'granted') {
            const backgroundStatus = await AsyncStorage.getItem("backroundStorage")
            if (backgroundStatus === 'granted') {
                await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: Location.Accuracy.BestForNavigation,
                    deferredUpdatesDistance: 10,
                    timeInterval: 10000,
                    activityType: Location.ActivityType.AutomotiveNavigation,
                    showsBackgroundLocationIndicator: true,
                    foregroundService: {
                        killServiceOnDestroy: true,
                        notificationBody: "Usando ubicacion en 2 plano",
                        notificationTitle: "Ubicacion",
                        
                    }
                });
            }else{
                setVisible(true)
            }
        }
        else{
        }
    };

    const onHandleSubmit = (values) => {
        const loginData = {
            user: values.user,
            password: password ? password : values.password
        }
        backendApi.post("/login", loginData)
            .then(async response => {
                if (response.data.userData.rol.includes('conductor') && response.data.userData.is_active === 'activo') {
                    await AsyncStorage.setItem('password', loginData.password)
                    await AsyncStorage.setItem('token', response.data.token);
                    await AsyncStorage.setItem('user', JSON.stringify(response.data.userData));
                    await AsyncStorage.setItem('ubicacion', JSON.stringify(response.data.ubicacion[0]));
                    await AsyncStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()));
                    setToken(response.data.token)
                }
            }
            ) 
            .catch(error => {
                setloginError(error.message)
            })

    }

    useEffect(() => {
        requestPermissions()
        Battery.isBatteryOptimizationEnabledAsync().then(result => {
            if (result) {
               setVisibleBateria(true)
            }
        })
    }, [])
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onHandleSubmit} >
            {({ handleSubmit }) => {
                return (
                <>
                     
                    <ModalPermisos visible={visibleBateria} setVisible={setVisibleBateria} type={"bateria"} texto={"Sigue los siguientes pasos para asegurarte de que la aplicación funcione correctamente incluso cuando tu celular esté bloqueado. De lo contrario, podrían surgir problemas en la aplicación: \n\n1. Presioná el botón CONFIGURACIÓN que se encuentra al final.\n2. Busca y selecciona la aplicación 'Profesional App'.\n3. Dentro de la configuración de batería, elige la opción 'Sin restricciones' para la aplicación.\n4. Regresa a la aplicación y selecciona la opción 'Listo'."}></ModalPermisos>
                    <ModalPermisos visible={visible} setVisible={setVisible} texto={"Necesitamos acceder a tu ubicacíon en segundo plano para el correcto seguimiento de tu movil."} ></ModalPermisos>
                    <View style={{ backgroundColor: "#171f4b", flex: 1 }}>
                        <View style={styles.container}>
                            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                                <Text style={{ color: "#2b2650", fontSize: 20, fontWeight: "bold" }}>Profesional | </Text>
                                <Text style={{ color: "#FF4960", fontSize: 20, fontWeight: "bold" }}>Remis</Text>
                            </View>
                            <FormikInputValue name={"user"} placeholder={"Usuario"} />
                            <FormikInputValue name={"password"} placeholder={"Contraseña"} secureTextEntry password={password} type={"password"}/>
                            {loginError && <Text style={{ color: "#FF4960" }}>{loginError}</Text>}
                            <Button title='Ingresar' onPress={handleSubmit} color={"#FF4960"} />
                        </View>
                    </View>
                </>
                )
            }}
        </Formik>
    )
}

export default LogInPage