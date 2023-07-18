import { View, Text, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import backendApi from "../api/backendApi"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DireccionesList = () => {

    const [user, setUser] = useState({})
    const [direcciones, setDirecciones] = useState([])
    const styles = StyleSheet.create(
        {
            container: {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#cccc"
                
            },
            direccionContainer: {
                flexDirection: "row",
                gap: 10
            },
            fechaText: {
                color: "#ffff",

            },
            direccionText: {
                color: "#7c9cff",
                fontSize: 15
            }
        }
    )

    const getUserData = async () => {
        AsyncStorage.getItem('ubicacion').then(async response => {
            const userFromStorage = JSON.parse(response)
            setUser(userFromStorage)   
        })
    }

    const getViajes = () => {
        backendApi.get("/viajes/2h").then(response => {
            setDirecciones(response.data.datos.filter(viaje => viaje.vehiculo_id === user.vehiculo_id))
        })
    }
     
    useEffect(()=>{
        getUserData()
    }, [])
    useEffect(()=>{
        getViajes()
    }, [direcciones])
    return (
        <View>
            {
                direcciones.map(direccion => {
                    return (
                        <View key={direccion.id} style={styles.container}>
                            <Text style={styles.fechaText}>
                                {direccion.fecha}
                            </Text>
                            <View style={styles.direccionContainer}>
                                <Text style={{color: "#ffff"}}>
                                    Debes ir a:
                                </Text>
                                <Text style={styles.direccionText}>
                                    {direccion.direccion}
                                </Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default DireccionesList