import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Context = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState()
    const getToken = () => {
        AsyncStorage.getItem('token').then(async response =>{
            setToken(response)
        })
    }
    useEffect(()=>{
        getToken()
    }, [token])
    return(
        <Context.Provider value={{token, setToken}}>
            {children}
        </Context.Provider>
    )
}

export default Context