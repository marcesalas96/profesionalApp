import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Alert, BackHandler } from 'react-native'
import backendApi from '../api/backendApi'


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 130
    },
    botonOcupado: {
        width: 270,
        height: 270,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 200,
        backgroundColor: '#cf2122',
        borderColor: "white",
        borderWidth: 2
    },
    botonLibre: {
        width: 270,
        height: 270,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 200,
        backgroundColor: '#2eb85c',
        borderColor: "white",
        borderWidth: 2
    },
    text: {
        textAlign: "center",
        fontSize: 30,
        color: "#ffffff"
    },
    textEstado: {
        color: "#fafafa",
        fontSize: 25
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:20

    },
    libre: {
        backgroundColor: "#2eb85c",
        marginTop:20,
        borderRadius: 3,
        alignSelf: "center",
        padding: 3,
        fontSize: 30,
        fontWeight: "bold",
        color: "#ffffff",
    },
    ocupado: {
        backgroundColor: "#cf2122",
        marginTop:20,
        borderRadius: 3,
        alignSelf: "center",
        padding: 3,
        fontSize: 30,
        color: "#ffffff",
        fontWeight: "bold"
    }
})

const ButtonChangeState = () => {

    const [estado, setEstado] = useState({ disponible: true })
    const [user, setUser] = useState("")

    const getUserData = async () => {
        AsyncStorage.getItem('ubicacion').then(async response => {
            const userFromStorage = JSON.parse(response)
            setUser(userFromStorage)
            await backendApi.get(`vehiculos/${userFromStorage.vehiculo_id}`).then(response => {
                response.data[0].disponible === "DISPONIBLE"
                    ? setEstado({ disponible: true })
                    : setEstado({ disponible: false })
            }).catch(error => console.log("error disponirble", error))    
        })
    }

    const onEstadoChange = () => {
        setEstado({ disponible: !estado.disponible })
        backendApi.post(`/vehiculos/${user.vehiculo_id}/changeStatus`, { disponible: !estado.disponible })
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <View style={styles.textContainer}>
                <Text style={styles.textEstado}>
                    ESTADO ACTUAL
                </Text>
                {
                    estado.disponible === true ?
                        <Text style={styles.libre}>
                            LIBRE
                        </Text>
                        :
                        <Text style={styles.ocupado}>
                            OCUPADO
                        </Text>
                }
            </View>
            <View style={styles.screen}>
                {
                    estado.disponible === true ?

                        <TouchableOpacity style={styles.botonOcupado} onPress={() => {
                            onEstadoChange()
                        }}>
                            <Text style={styles.text}>
                                OCUPADO
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.botonLibre} onPress={() => {
                            onEstadoChange()
                        }}>
                            <Text style={styles.text}>
                                LIBRE
                            </Text>
                        </TouchableOpacity>

                }
            </View>
        </>
    )
}

export default ButtonChangeState