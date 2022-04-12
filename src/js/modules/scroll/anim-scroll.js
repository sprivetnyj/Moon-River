//================================================================================

// Сниппет "da"

// data-anim="x,y,duration,delay" - для анимируемого элемента
//  @x - смещение по x
//  @y - смещение по y
//  @duration - продолжительность в секундах
//  @delay - задержка в секундах

// .active - настройка анимации (common.scss)

import { counter, arrayFromData } from '../functions.js'

function anim() {
	const animArray = document.querySelectorAll('[data-anim]');
	if (animArray.length) {
		animArray.forEach(animItem => {
			// Получение параметров из атрибута
			const animData = arrayFromData(animItem, 'data-anim');
			const animX = animData[0];
			const animY = animData[1];
			const animDuration = animData[2];
			const animDelay = animData[3];

			animItem.classList.add('anim');

			// Объявление CSS-переменных инлайн, для интеграции в файл стилей
			animItem.style.setProperty('--x', `${animX}px`);
			animItem.style.setProperty('--y', `${animY}px`);
			animItem.style.setProperty('--del', `${animDelay}s`);
			animItem.style.setProperty('--dur', `${animDuration}s`);

			// Задержка между предыдущими настройками и первым появлением
			setTimeout(() => {
				// При скролле
				window.addEventListener('scroll', animScroll);
				// С первого экрана
				animScroll();
			}, 0);

			function animScroll() {
				// Высота элемента
				const animHeight = animItem.offsetHeight;
				// Корректное расстояние относительно окна браузера
				const animOffset = offset(animItem);
				// Нижняя граница окна с небольшим зазором
				const animPoint = window.innerHeight;
				// Если элемент в нужной позиции для появления
				if (!animItem.classList.contains('active')) {
					if ((scrollY > animOffset - animPoint) && scrollY < (animOffset + animHeight)) {
						animItem.classList.add('active');
						// Запуск счетчика цифр для текущего элемента
						const counterArray = animItem.querySelectorAll('[data-counter]');
						if (counterArray.length) {
							counterArray.forEach(el => { counter(counterArray); });
						}
					}
				}
			}

			function offset(el) {
				const rect = el.getBoundingClientRect(),
					scrollTop = window.scrollY || document.documentElement.scrollTop;
				return rect.top + scrollTop;
			}
		});
	}
}

anim();

//================================================================================