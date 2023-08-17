import { View, Text, StyleSheet, RefreshControl } from "react-native"
import { useEffect, useState, useCallback } from "react"
import backendApi from "../api/backendApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ScrollView } from "react-native"

const DireccionesList = ({ }) => {
    
    const [direcciones, setDirecciones] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const styles = StyleSheet.create(
        {
            container: {
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#cccc",
                flexDirection: "row",
                justifyContent: "space-between"

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
            },
            viewIsNew: {
                alignSelf: "center",
                marginLeft: 30,
                backgroundColor: "#2eb85c",
                paddingHorizontal: 5,
                paddingVertical: 2,
                color: "#FFFF",
                fontSize: 20,
                fontWeight: 700,
                borderRadius: 4
            },
            cancelado: {
                alignSelf: "center",
                marginLeft: 30,
                backgroundColor: "#cf2122",
                paddingHorizontal: 5,
                paddingVertical: 2,
                color: "#FFFF",
                fontSize: 15,
                fontWeight: 500,
                borderRadius: 4
            }
        }
    )

    
    const getViajes = () => {
        
        AsyncStorage.getItem('ubicacion').then(async response => {
            const userFromStorage = JSON.parse(response)
            backendApi.get(`/vehiculos/${userFromStorage.vehiculo_id}/misViajes`).then(response => {
                setDirecciones(response.data.datos)
            }).catch(error => {
                console.log("error en direcciones list", error)
            })
        })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {

            setRefreshing(false);
            getViajes()
        }, 2000);
    }, []);

    useEffect(() => {
        getViajes()
    }, [])
    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {
                direcciones.map(direccion => {
                    return (
                        <ScrollView horizontal={true} key={direccion.id}
                            contentContainerStyle={styles.container}>
                            <View>
                                <Text style={styles.fechaText}>
                                    {direccion.viaje.fecha}
                                </Text>
                                <View style={styles.direccionContainer}>
                                    <Text style={{ color: "#ffff" }}>
                                        Debes ir a:
                                    </Text>
                                    <Text style={styles.direccionText}>
                                        {direccion.viaje.direccion}
                                    </Text>
                                </View>
                            </View>
                            {
                                direccion.viaje.estado === "CANCELADO" ?
                                    <Text style={styles.cancelado}>
                                        CANCELADO
                                    </Text>
                                    :
                                    direccion.isNew ?
                                        <Text style={styles.viewIsNew}>
                                            NUEVO
                                        </Text>
                                        :
                                        <>
                                        </>
                            }

                        </ScrollView>
                    )
                })
            }
        </ScrollView>
    )
}

export default DireccionesList