import { JSX } from 'react';
import { Card } from './components';

const data = [
	{
		id: "1",
		title: "Как работать с CSS Grid",
		excerpt: "Грид-раскладка (CSS Grid Layout) представляет собой двумерную систему сеток в CSS. Гриды подойдут и для верстки основных областей страницы..",
		image: "/mini.png",
		category: "Front-end",
		publishedAt: "1 месяц назад",
		readingTime: "3 минуты",
		likesCount: 4,
		userLiked: false,	
	}
];

export default function Home(): JSX.Element {
	return (
		<>
			{data.map((card) => (
				<Card
					key={card.id}
					{...card}
				/>
			))}
		</>
	);
}
