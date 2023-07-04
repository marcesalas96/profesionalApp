import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#282c34",
        paddingTop: 20
    },
    text: {
        color: "#fafafa",
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15
    },
    libre: {
        backgroundColor: "#2eb85c",
        borderRadius: 3,
        alignSelf: "flex-start",
        padding: 3,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: "bold",
        color: "#ffffff",
    },
    ocupado: {
        backgroundColor: "#cf2122",
        borderRadius: 3,
        alignSelf: "flex-start",
        padding: 3,
        marginLeft: 10,
        fontSize: 15,
        color: "#ffffff",
        fontWeight: "bold"
    }
})
const estado = {
    estado: "DISPONIBLE"
}
const ActualState = () => {

    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>
                ESTADO ACTUAL:
            </Text>
            {
                estado.estado === "DISPONIBLE" ?
                    <Text style={styles.libre}>
                        LIBRE
                    </Text>
                    :
                    <Text style={styles.ocupado}>
                        OCUPADO
                    </Text>
            }
        </View>
    )
}

export default ActualState