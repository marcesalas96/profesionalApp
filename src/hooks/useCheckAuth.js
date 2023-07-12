import { useDispatch, useSelector } from "react-redux";
import { backendApi } from "../api/backendApi";
import { login,logout,checkingCredentials,setErrorMessage } from "../store/auth";




export const useCheckAuth = () => {

    const { status,errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout());
        //console.log('se ejecuta check');
        dispatch( checkingCredentials() );

        try {
            //console.log('se ejecuta el try check');
            const { data } = await backendApi.get(`/user-profile`);
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.userData));

        } catch (error) {
            //console.log('se ejecuta el catch');
            localStorage.clear();
            dispatch(logout());
        }
    }

    return {
        //Propiedades
        status,
        errorMessage,

        //Metodos
        // inicioLogin,
        checkAuthToken
    };
    
}