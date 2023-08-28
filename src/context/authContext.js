import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import backendApi from "../api/backendApi";

const Context = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState()
    const [estado, setEstado] = useState({disponible: true})
    const [user, setUser] = useState()

    const getUserFromLocalStorage = async () => {
        try {
          const response = await AsyncStorage.getItem('ubicacion');
          const userFromStorage = JSON.parse(response);
          setUser(userFromStorage);
          await getEstado(userFromStorage);
        } catch (error) {
          console.log('Error al obtener los datos del usuario desde AsyncStorage:', error);
        }
      };

    const getEstado = async (userFromStorage) => {
        await backendApi.get(`vehiculos/${userFromStorage.vehiculo_id}`).then(response => {
            response.data[0].disponible === "DISPONIBLE"
                ? setEstado({ disponible: true })
                : setEstado({ disponible: false })
        }).catch(error => console.log("error disponirble", error))
    }

    const changeEstado = () => {
        setEstado({disponible: !estado.disponible})
        backendApi.post(`/vehiculos/${user.vehiculo_id}/changeStatus`, { disponible: !estado.disponible })
    }

    const getToken = () => {
        AsyncStorage.getItem('token').then(async response =>{
            setToken(response)
        })
    }
    useEffect(()=>{
        getToken()
        getUserFromLocalStorage()
    }, [token])
    return(
        <Context.Provider value={{token, setToken, user, estado, changeEstado}}>
            {children}
        </Context.Provider>
    )
}

export default Context