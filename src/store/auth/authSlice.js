import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        user: null,
        name: null,
        state: null,
        rol: null,
        status: 'not-authenticated',   // ckecking , authenticated , not-authenticated
        errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.id = payload.id;
            state.user = payload.user;
            state.name = payload.name;
            state.state = payload.state;
            state.rol = payload.rol;
            state.status = 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) => {
            state.id = null;
            state.user = null;
            state.name = null;
            state.state = null;
            state.rol = null;
            state.status = 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },

        setErrorMessage: (state, {payload}) => {
            //console.log('payloas',{payload});
            state.errorMessage = payload.message;
            state.status='not-authenticated';
        }

    },
});


export const { login, logout, checkingCredentials,setErrorMessage } = authSlice.actions;