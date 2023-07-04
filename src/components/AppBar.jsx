import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Constants from 'expo-constants'
import { View, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#20232a",
        paddingTop: Constants.statusBarHeight + 15,
        paddingBottom: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    text: {
        color: "#fafafa",
        fontSize: 20
    }
})
const AppBar = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ESTADO
            </Text>
            <FontAwesomeIcon icon={faPowerOff} size={25} style={{ color: "#d10000" }} />
        </View>
    )
}

export default AppBar