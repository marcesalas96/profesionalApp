import { checkingCredentials, logout, login, setErrorMessage } from './';
import { backendApi } from '../../api/backendApi';

export const startLogin = ({ user, password }) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        //console.log({user,password});

        try {
            const { data } = await backendApi.post( `/login`,{user,password});
            console.log(data)
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.userData));
            //console.log(userLogged);

        } catch ({response}) {
            const {data} = response
            console.log('viene por catch de starLogin',data);
            dispatch( setErrorMessage(data) );
        }
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        console.log('viene por star logout');
        await backendApi.post(`/logout`);
        localStorage.clear();
        dispatch( logout() );
    }
}


