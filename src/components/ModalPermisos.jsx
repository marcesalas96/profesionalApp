import { Modal, View, Text, StyleSheet, Button, Alert } from "react-native";
import * as Location from 'expo-location';
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
export const ModalPermisos = ({ texto, handlePermisos, visible, setVisible, type }) => {
    const [textParts, setTextParts] = useState("")
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(0,0,0,0.7)"
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "90%",
            height: type ? "65%" : "30%",
            justifyContent: "center"

        },
        modalContent: {
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center"
        },
        text: {
            fontSize: 16,
            textShadowColor: "#0000",
            textAlign: type ? "left" : "center",
            marginHorizontal: 15
        }, nuevoViaje: {
            fontSize: 23,
            fontWeight: "800",
            textShadowColor: "#0000",
            textAlign: "center"
        }, buttonContainer: {
            flexDirection: "row",
            gap: 15
        },
        button: {
            height: 50,
            backgroundColor: "red"
        }
    })

    const handleOnPress = async () => {
        if (type) {
            setVisible(false)
        }
        else {
            const { status } = await Location.requestBackgroundPermissionsAsync()
            await AsyncStorage.setItem("backroundStorage", status)
            setVisible(false)
        }
    }
    const handleConfiguracion = async () => {
        await startActivityAsync(ActivityAction.APPLICATION_SETTINGS)
    }
    useEffect(() => {
        if (type) {
            setTextParts(texto.split("problemas"))
        }
    }, [])
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.nuevoViaje}>
                            NOTIFICACIÓN ⚠️
                        </Text>
                        {type ?
                            <>
                                <Text style={styles.text}>
                                    {textParts[0]}
                                    <Text style={{ color: "red", fontWeight: "700"}}>
                                        problemas
                                    </Text>
                                    <Text style={styles.text}>
                                        {textParts[1]}
                                    </Text>
                                </Text>
                            </>
                            :
                            <Text style={styles.text}>
                                {texto}
                            </Text>
                        }
                        <View style={styles.buttonContainer}>

                            {
                                type && <Button title="CONFIGURACIÓN" onPress={() => { handleConfiguracion() }}  />
                            }
                            <Button title={type ? "LISTO" : "ACEPTAR"}  onPress={() => { handleOnPress() }} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}