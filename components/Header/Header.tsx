'use client';

import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { JSX, useContext } from 'react';
import GitIcon from './github.svg';
import { AppContext } from '@/context/app.context';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
	const { gitLink } = useContext(AppContext);

	return (
		<div {...props} className={styles.wrapper}>
			<span className={styles.text}>
				.my_blog
			</span>
			<a href={gitLink} target='_blanck'>
				<GitIcon className={styles.icon} />
			</a>

		</div>
	);
};