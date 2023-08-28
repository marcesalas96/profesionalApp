import { faToggleOn, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { View, StyleSheet, Text } from 'react-native'
import FooterTab from './FooterTab'
import { useEffect, useState } from "react"
import backendApi from "../api/backendApi"
import { useNavigation } from '@react-navigation/native'
import { ModalNotificaciones } from './ModalNotificaciones'
import { useContext } from 'react'
import Context from '../context/authContext'

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

const Footer = () => {

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

    useEffect(() => {
        const interval = setInterval(async () => {
            await getNewViaje();
        }, 10000);
        return () => clearInterval(interval)
    }, [user]);
    useEffect(() => {
        if (nuevoViaje && estado.disponible === true) {
            setVisible(true);
        }
    }, [nuevoViaje])


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