import { Button, View, StyleSheet, Text, Dimensions } from 'react-native'
import { Formik, useField } from 'formik'
import { TextInput } from 'react-native'
import * as yup from 'yup'
import backendApi from '../api/backendApi'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const onHandleSubmit = (values) => {
    const loginData = {
        user: values.user,
        password: values.password
    }
    console.log("acaaaaa",loginData);
    backendApi.post("/login", loginData)
        .then(async response => {
            if (response.data.userData.rol.includes('chofer') && response.data.userData.state === '1') {
                await AsyncStorage.setItem('token', response.data.token);
            //     localStorage.setItem('user', JSON.stringify(response.data.userData));
            //     localStorage.setItem('ubicacion', JSON.stringify(response.data.ubicacion[0]));
            //     localStorage.setItem('token-init-date', new Date().getTime());
            }
        }
    )
}

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
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onHandleSubmit} >
            {({ handleSubmit }) => {
                return (
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <Text style={{ color: "#2b2650", fontSize: 20, fontWeight: "bold" }}>Profesional | </Text>
                            <Text style={{ color: "#FF4960", fontSize: 20, fontWeight: "bold" }}>Remis</Text>
                        </View>
                        <FormikInputValue name={"user"} placeholder={"Usuario"} />
                        <FormikInputValue name={"password"} placeholder={"Contraseña"} secureTextEntry />
                        <Button title='Ingresar' onPress={handleSubmit} color={"#FF4960"} />
                    </View>
                )
            }}
        </Formik>
    )
}

export default LogInPage