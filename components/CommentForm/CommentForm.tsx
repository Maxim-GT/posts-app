'use client';

import { CommentFormProps } from './CommentForm.props';
import styles from './CommentForm.module.css';
import cn from 'classnames';
import { JSX, useState } from 'react';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { useForm } from 'react-hook-form';
import { ICommentForm } from './ReviewForm.interface';
import { createComment } from '@/services/comments';

export const CommentForm = ({ postId, className, ...props }: CommentFormProps): JSX.Element => {

	const { register, handleSubmit, formState: { errors }, reset } = useForm<ICommentForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const onSubmit = async (formData: ICommentForm) => {
		setIsSuccess(false);
		setError(undefined);

		try {
			const data = await createComment(formData, postId);
			if (data) {
				reset();
				setIsSuccess(true);
			} else {
				setError('Что-то пошло не так')
			}
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError('Произошла неизвестная ошибка');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} >
			<div
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input {...register('name', {
					required: {
						value: true, message: 'Заполните имя'
					}
				})}
					placeholder='Имя'
					error={errors.name}
				/>
				<Textarea {...register('comment', {
					required: 'Напишите хотя бы пару предложений',
					validate: (value) => {
						const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

						if (wordCount < 5) {
							return 'Нужно хотя бы 5 слов';
						}

						return true;
					}
				})}
					placeholder='Комментарий'
					error={errors.comment}
				/>
				<Button type='submit' className={styles.button}>Отправить</Button>
			</div>
			{isSuccess && <div className={cn(styles.success, styles.panel)}>
				<div className={styles.successTitle}>Ваш комментарий отправлен</div>
			</div>}
			{error && <div className={cn(styles.error, styles.panel)}>
				Что-то пошло не так, попробуйте обновить страницу
			</div>}
		</form>
	);
};