export function getPicsumImageUrl(seed: string | number, width: number, height: number): string {
	return `https://picsum.photos/seed/${seed}/${width}/${height}.jpg`;
}
