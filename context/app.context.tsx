'use client';

import { createContext, PropsWithChildren } from 'react';

export interface IAppContext {
	gitLink: string;
}

export const AppContext = createContext<IAppContext>({ gitLink: 'https://github.com/Maxim-GT' });

export const AppContextProvider = ({ gitLink, children }: PropsWithChildren<IAppContext>) => {
	return (
		<AppContext.Provider value={{ gitLink }}>
			{children}
		</AppContext.Provider>
	)
};