import React from 'react';

export const defaultSettings = {
    accessToken: "",
    setAccessToken: (newVal: string) => {},
    loggedIn: null as boolean | null,
    setLoggedIn: (newVal: boolean) => {},
    /* more settings */
};

const AuthCtx = React.createContext(defaultSettings);

export default AuthCtx;