import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	// Состояние статьи: хранит текущие настройки шрифта, цвета, ширины и фона
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		// Основной контейнер страницы
		<main
			className={styles.main}
			style={
				{
					// Передаем CSS-переменные, чтобы стили статьи менялись динамически
					'--font-family': articleState.fontFamilyOption.value, // шрифт
					'--font-size': articleState.fontSizeOption.value, // размер шрифта
					'--font-color': articleState.fontColor.value, // цвет шрифта
					'--container-width': articleState.contentWidth.value, // ширина контента
					'--bg-color': articleState.backgroundColor.value, // цвет фона
				} as CSSProperties
			}>
			{/* Панель настроек статьи */}
			<ArticleParamsForm
				currentState={articleState} // передаем текущее состояние
				onApply={setArticleState} // функция применения изменений
				onReset={() => setArticleState(defaultArticleState)} // сброс к дефолту
			/>

			{/* Компонент статьи, который будет стилизоваться через CSS-переменные */}
			<Article />
		</main>
	);
};
