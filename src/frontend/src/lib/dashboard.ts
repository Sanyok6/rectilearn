import React from 'react';

export const defaultCtx = {
    groupGS: false,
    setGroupGS: (newVal: boolean) => {},
    user: {
        name: "",
        email: "",
        role: "",
        profile_picture_index: 0,
    }
    /* more settings */
};

const DashboardCtx = React.createContext(defaultCtx);

export default DashboardCtx;