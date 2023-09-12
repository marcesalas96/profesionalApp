import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import Constants from 'expo-constants'
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import backendApi from '../api/backendApi.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as TaskManager from 'expo-task-manager';
import { useContext } from 'react'
import Context from '../context/authContext.js'

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
const AppBar = ({ navigation, section }) => {
    const {setToken, user} = useContext(Context)
    const logout = async () => {
        const newUser = {...user}
        newUser.latitud = null
        newUser.longitud = null
        await backendApi.put(`/ubicaciones/${user.id}`, newUser)
        backendApi.post('/logout').then(async () => {
            const keys = ["token", "user", "ubicacion", "token-init-date"]
            await TaskManager.unregisterAllTasksAsync()
            await AsyncStorage.multiRemove(keys)
            setToken(null)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {section}
            </Text>
            <TouchableOpacity onPress={() => {logout()}}>
                <FontAwesomeIcon icon={faPowerOff} size={25} style={{ color: "#d10000" }} />
            </TouchableOpacity>
        </View>
    )
}

export default AppBar