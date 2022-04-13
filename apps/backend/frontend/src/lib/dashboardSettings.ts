import React from 'react';

export const defaultSettings = {
    groupGS: false,
    setGroupGS: (newVal: boolean) => {}
    /* more settings */
};

const DashboardSettingsCtx = React.createContext(defaultSettings);

export default DashboardSettingsCtx;