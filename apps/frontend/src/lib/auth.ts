import React from 'react';
import { StudySet } from '../components/Dashboard/Card';

export interface IgameSession {
    game: string;
    studySet: StudySet
}

export const defaultSettings = {
    accessToken: "",
    setAccessToken: (newVal: string) => {},
    loggedIn: null as boolean | null,
    setLoggedIn: (newVal: boolean) => {},
    gameSession: {} as IgameSession | undefined,
    setGameSession: (newVal: IgameSession) => {}
    /* more settings */
};

const AuthCtx = React.createContext(defaultSettings);

export default AuthCtx;