import styled from "styled-components"
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { app } from '../firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { useEffect } from "react";

const Login = () => {
    useEffect(() => {
        const auth = getAuth(app);
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

        ui.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            signInSuccessUrl: '/',
        });
    }, [])

    return (
        <div id="firebaseui-auth-container">

        </div>
    )
}

export default Login