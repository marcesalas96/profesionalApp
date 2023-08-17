import { useEffect } from "react"
import { useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAuth = async (tokenDefault) => {
    const [token, setToken] = useState()
    tokenDefault ? setToken(tokenDefault) : setToken(await AsyncStorage.getItem("token"))
    return token
}