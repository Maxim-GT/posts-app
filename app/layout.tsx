import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JSX } from 'react';
import { Header } from '../components/Header/Header';
import styles from './layout.module.css';
import { AppContextProvider } from '@/context/app.context';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Блог",
	description: "Мой блог с различными постами",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	return (
		<html lang="ru">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AppContextProvider gitLink='https://github.com/Maxim-GT'>
					<div className={styles.wrapper}>
						<Header />
						{children}
					</div>
				</AppContextProvider>
			</body>
		</html>
	);
}
