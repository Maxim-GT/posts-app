import cardStyles from '@/components/Card/Card.module.css';
import styles from './page.module.css';

export default function Loading() {
	const skeletons = Array.from({ length: 9 });

	return (
		<main>
			<div className={styles.cardGrid}>
				{skeletons.map((_, i) => (
					<div key={i} className={cardStyles.skeletonCard}></div>
				))};
			</div>
		</main>
	)
}