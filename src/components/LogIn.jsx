import { Button, View, StyleSheet, Text, Dimensions, Alert, BackHandler } from 'react-native'
import { Formik, useField } from 'formik'
import { TextInput } from 'react-native'
import * as yup from 'yup'
import backendApi from '../api/backendApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useContext } from 'react'
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Battery from 'expo-battery';
import Context from '../context/authContext'

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
    password: yup.string().required("La contraseña es obligatoria")
})

const FormikInputValue = ({ error, style = {}, name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    const inputStyle = [
        styles.input,
        style,
        meta.error && styles.borderError
    ]
    return (
        <>
            <TextInput
                value={field.value}
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
    const onHandleSubmit = (values) => {
        const loginData = {
            user: values.user,
            password: values.password
        }
        backendApi.post("/login", loginData)
            .then(async response => {
                if (response.data.userData.rol.includes('chofer') && response.data.userData.state === '1') {
                    await AsyncStorage.setItem('token', response.data.token);
                    await AsyncStorage.setItem('user', JSON.stringify(response.data.userData));
                    await AsyncStorage.setItem('ubicacion', JSON.stringify(response.data.ubicacion[0]));
                    await AsyncStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()));
                    setToken(response.data.token)
                }
            }
            )
            .catch(error => {
                setloginError("Credenciales incorrectas, intente de nuevo")
            })

    }

    useEffect(() => {
        Battery.isBatteryOptimizationEnabledAsync().then(result => {
            if (result) {
                startActivityAsync(ActivityAction.MANAGE_APPLICATIONS_SETTINGS);
            }
        })
    }, [])
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onHandleSubmit} >
            {({ handleSubmit }) => {
                return (
                    <View style={{ backgroundColor: "#171f4b", flex: 1 }}>
                        <View style={styles.container}>
                            <View style={{ flexDirection: "row", alignSelf: "center" }}>
                                <Text style={{ color: "#2b2650", fontSize: 20, fontWeight: "bold" }}>Profesional | </Text>
                                <Text style={{ color: "#FF4960", fontSize: 20, fontWeight: "bold" }}>Remis</Text>
                            </View>
                            <FormikInputValue name={"user"} placeholder={"Usuario"} />
                            <FormikInputValue name={"password"} placeholder={"Contraseña"} secureTextEntry />
                            {loginError && <Text style={{ color: "#FF4960" }}>{loginError}</Text>}
                            <Button title='Ingresar' onPress={handleSubmit} color={"#FF4960"} />
                        </View>
                    </View>
                )
            }}
        </Formik>
    )
}

export default LogInPage