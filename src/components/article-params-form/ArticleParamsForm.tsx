import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

// Пропсы компонента: текущие настройки статьи, функции применения и сброса
type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние открытия/закрытия боковой панели
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Локальное состояние формы (изменения не применяются сразу)
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	// Ссылка на sidebar для обработки клика вне панели
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Функция открытия/закрытия sidebar
	const toggleSidebar = () => setIsMenuOpen(!isMenuOpen);

	// Обработчик клика вне sidebar для закрытия панели
	useEffect(() => {
		// если меню закрыто — обработчик не вешаем
		if (!isMenuOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMenuOpen]);

	// Функции изменения полей формы
	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[0]) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[0]) => {
		setFormState({ ...formState, fontSizeOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[0]) => {
		setFormState({ ...formState, fontColor: option });
	};

	const handleBackgroundColorChange = (
		option: (typeof backgroundColors)[0]
	) => {
		setFormState({ ...formState, backgroundColor: option });
	};

	const handleContentWidthChange = (option: (typeof contentWidthArr)[0]) => {
		setFormState({ ...formState, contentWidth: option });
	};

	// Применение изменений формы к статье
	const handleApply = (e?: React.FormEvent) => {
		e?.preventDefault();
		onApply(formState); // Передаем новые настройки вверх
		setIsMenuOpen(false); // Закрываем sidebar
	};

	// Сброс формы к дефолтным значениям
	const handleReset = (e?: React.MouseEvent) => {
		e?.preventDefault();
		setFormState(defaultArticleState); // Сбрасываем локальное состояние формы
		onReset(); // Сбрасываем состояние статьи в App
		setIsMenuOpen(false); // Закрываем sidebar
	};

	return (
		<>
			{/* Кнопка-стрелка для открытия/закрытия панели */}
			<ArrowButton isOpen={isMenuOpen} onClick={toggleSidebar} />

			{/* Боковая панель с настройками */}
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}>
				{/* Форма настроек */}
				<form className={styles.form} onSubmit={handleApply}>
					{/* Заголовок формы */}
					<h1 className={styles.title}>Задайте параметры</h1>

					{/* Выбор шрифта */}
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption || null}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<Separator />

					{/* Размер шрифта */}
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption || null}
						onChange={handleFontSizeChange}
					/>
					<Separator />

					{/* Цвет шрифта */}
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor || null}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />

					{/* Цвет фона */}
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor || null}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>
					<Separator />

					{/* Ширина контента */}
					<Select
						title='Ширина контента'
						selected={formState.contentWidth || null}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>

					{/* Кнопки управления */}
					<div className={styles.bottomContainer}>
						{/* Сброс */}
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						{/* Применить */}
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
