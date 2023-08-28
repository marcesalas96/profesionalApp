import { Modal, View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import Context from "../context/authContext";
export const ModalNotificaciones = ({visible, setVisible, nuevoViaje}) => {

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
            width: "80%",
            height: "30%",
            justifyContent: "center"

        },
        modalContent: {
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center"
        },
        nuevoViaje: {
            fontSize: 23,
            fontWeight: "800",
            textShadowColor: "#0000",
        },
        direccion: {
            fontSize: 18,
            fontWeight: "600",
        }
    })
    const {changeEstado} = useContext(Context)

    
    const handlePress = () => {
        setVisible(false)
        changeEstado()
    }
    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.nuevoViaje}>
                            NUEVO VIAJE
                        </Text>
                        {
                            nuevoViaje ?
                            <Text style={styles.direccion}>
                                {nuevoViaje.viaje.direccion}
                            </Text>
                            :
                            <></>
                        }
                        <Button title="ACEPTAR" onPress={handlePress} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}