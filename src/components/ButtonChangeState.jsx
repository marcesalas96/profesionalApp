import { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
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
    }
})

const ButtonChangeState = () => {

    const [estado, setEstado] = useState("DISPONIBLE")

    const estadoChange = () => {
        estado === "DISPONIBLE" ?
            setEstado("OCUPADO") :
            setEstado("DISPONIBLE")
    }

    return (
        <View style={styles.screen}>
            {
                estado === "DISPONIBLE" ?

                    <TouchableOpacity style={styles.botonOcupado} onPress={() => {
                        estadoChange()
                    }}>
                        <Text style={styles.text}>
                            OCUPADO
                        </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.botonLibre} onPress={() => {
                        estadoChange()
                    }}>
                        <Text style={styles.text}>
                            LIBRE
                        </Text>
                    </TouchableOpacity>

            }
        </View>
    )
}

export default ButtonChangeState