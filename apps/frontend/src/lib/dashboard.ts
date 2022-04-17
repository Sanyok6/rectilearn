import React from 'react';

export const defaultCtx = {
    groupGS: false,
    setGroupGS: (newVal: boolean) => {},
    user: {
        name: "",
        email: "",
        role: "",
    }
    /* more settings */
};

const DashboardCtx = React.createContext(defaultCtx);

export default DashboardCtx;