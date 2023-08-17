import { faToggleOn, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons'
import { View, StyleSheet, Text } from 'react-native'
import FooterTab from './FooterTab'
import { useEffect, useState } from "react"
import backendApi from "../api/backendApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ModalNotificaciones } from './ModalNotificaciones'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#20232a",
        padding: 15,
        flexDirection: 'row',
        justifyContent: "center",
        gap: 100
    },
    text: {
        color: "#fafafa",
        fontSize: 15,
        textAlign: "center"
    },
    footerContainer: {
        justifyContent: "flex-end",
        width: 50

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

const Footer = () => {

    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [nuevoViaje, setNuevoViaje] = useState(null)

    const getNotificaciones = () => {
        AsyncStorage.getItem('ubicacion').then(async response => {
            const userFromStorage = JSON.parse(response)
            backendApi.get(`/vehiculos/${userFromStorage.vehiculo_id}/misViajes`).then(response => {
                setNuevoViaje(response.data.datos.find(viaje => viaje.isNew === true))
            }).catch(error => {
                console.log("error en direcciones list", error)
            })
        })
    }
    useEffect(() => {
        getNotificaciones()
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            getNotificaciones()
            nuevoViaje && setVisible(true)
        }, 60000)
        return () => clearInterval(interval)
    }, [nuevoViaje])

    return (
        <>
        <ModalNotificaciones visible={visible} setVisible={setVisible} nuevoViaje={nuevoViaje}/>
        <View style={styles.container}>
            <FooterTab to={"home"} icon={faToggleOn} styles={styles} navigation={navigation}>Estado</FooterTab>
            <View style={{flexDirection: "row"}}>
            <FooterTab to={"viajes"} icon={faCommentDots} styles={styles} navigation={navigation}> Viajes </FooterTab>
            </View>
        </View>
        </>
    )
}

export default Footer