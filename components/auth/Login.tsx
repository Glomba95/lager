import { useState } from 'react';

import AuthFields from './AuthFields';

import Auth from '../../interfaces/auth';
import AuthModel from '../../models/auth';

export default function Login(props:{
    navigation:any, 
    setIsLoggedIn:(isLoggedIn:Boolean)=>void
}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    const {navigation, setIsLoggedIn}=props;

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);

            // TODO kolla svar från API:t, console log är tillfällig
            console.log("login API response message: ", result);

            setIsLoggedIn(true);
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};