'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';
import { ReactNode } from 'react';
import React from 'react';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
		}
	}
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5, ease: 'easeOut' }
	}
} as const;

export const AnimatedList = ({ children }: { children: ReactNode }) => {
	return (
		<motion.div
			className={styles.cardGrid}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{React.Children.map(children, (child) => (
				<motion.div variants={item}>
					{child}
				</motion.div>
			))}
		</motion.div>
	)
}