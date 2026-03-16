import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IPaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	totalItems: number;
	pageSize: number;
	currentPage: number;
}