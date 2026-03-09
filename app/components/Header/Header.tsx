import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { JSX } from 'react';
import GitIcon from './github.svg';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
	return (
		<div {...props} className={styles.wrapper}>
			<span className={styles.text}>
				.my_blog
			</span>
			<GitIcon className={styles.icon} />
		</div>
	);
};