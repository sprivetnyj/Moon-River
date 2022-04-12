//================================================================================

import { slideUp, slideDown, slideToggle, focusTrap, scrollLockToggle, arrayFromData } from "./functions.js";

function headerMenu() {
	const menuToggle = document.querySelector('.menu-toggle');
	if (menuToggle) {
		const header = document.querySelector('.header');
		const menu = header.querySelector('.menu');
		const logo = header.querySelector('.header__logo');
		header.addEventListener('click', menuStyles);
		function menuStyles(e) {
			// Проверка на якорные ссылки в меню
			const isBurgerLink = (
				// Если ссылка меню
				(e.target.classList.contains('menu__link')) &&
				// Если меню открыто
				(menuToggle.classList.contains('menu-toggle--open')) &&
				// Если не ведет на другую страницу
				(!e.target.getAttribute('href').endsWith('html'))
			);
			if (e.target === menuToggle || e.key === 'Escape' || isBurgerLink) {
				let expanded = 'false' === menuToggle.getAttribute('aria-expanded');
				menuToggle.setAttribute('aria-expanded', expanded);
				if (!expanded) {
					menuToggle.setAttribute('aria-label', 'Открыть меню');
					document.removeEventListener('keydown', menuKeyboard);
				} else {
					menuToggle.setAttribute('aria-label', 'Закрыть меню');
					document.addEventListener('keydown', menuKeyboard);
				}
				menuToggle.classList.toggle('menu-toggle--open');
				menu.classList.toggle('menu--open');
				logo.classList.toggle('light');
				scrollLockToggle();
			}
		}
		function menuKeyboard(e) {
			if (e.key === 'Escape') {
				menuStyles(e);
				menuToggle.focus();
			}
			if (e.key === 'Tab' || e.shiftKey && e.key === 'Tab') {
				focusTrap(e, menu, e.shiftKey && e.key === 'Tab', true, menuToggle);
			}
		}
	}
}
headerMenu();
//================================================================================
const menuList = document.querySelector('.menu__list');
if (menuList) {
	const menuLinks = document.querySelectorAll('.menu__link');
	const menuSubMenuArray = document.querySelectorAll('.menu__sub-menu');
	if (menuLinks.length) {
		// Срабатывает и при клике
		const media = window.matchMedia(`(max-width:${1149.98 / 16}em)`);
		media.addEventListener('change', mediaChanges);
		mediaChanges(media);

		function mediaChanges(media) {
			if (media.matches) {
				menuRemove();
				menuList.removeEventListener('mouseover', mouseEvent);
				menuList.removeEventListener('click', clickEvent);
				menuList.removeEventListener('keydown', keyEvent);
			} else {
				menuInit();
				menuList.addEventListener('mouseover', mouseEvent);
				menuList.addEventListener('click', clickEvent);
				menuList.addEventListener('keydown', keyEvent);
			}
		}
		function mouseEvent(e) {
			if (e.target.classList.contains('menu__link')) {
				setNewMenu(e.target);
			}
		}
		function clickEvent(e) {
			if (e.target.classList.contains('menu__link')) {
				e.preventDefault();
			}
		}
		function keyEvent(e) {
			if (e.key === 'Tab') {
				if (e.target.classList.contains('menu__link')) {
					setNewMenu(e.target);
				}
			}
			if (e.shiftKey && e.key === 'Tab') {
				if (e.target.classList.contains('menu__link')) {
					const index = Array.from(menuLinks).indexOf(e.target);
					if (index > 0) {
						setNewMenu(menuLinks[index - 1]);
					}
				}
			}
		}
		function menuInit() {
			menuSubMenuArray[0].classList.add('active');
			menuLinks.forEach(menuLink => {
				menuLink.classList.remove('active');
			});
			menuLinks[0].classList.add('active');
		}
		function menuRemove() {
			menuLinks.forEach(menuLink => {
				menuLink.classList.remove('active');
			});
			menuSubMenuArray.forEach(menuSubMenu => {
				menuSubMenu.classList.remove('active');
			});
		}
		function setNewMenu(element) {
			menuLinks.forEach(menuLink => {
				menuLink.classList.remove('active');
			});
			menuSubMenuArray.forEach(menuSubMenu => {
				menuSubMenu.classList.remove('active');
			});
			element.classList.add('active');
			element.nextElementSibling.classList.add('active');
		}
	}
}
//================================================================================
function spoilers() {
	const spoilersArray = document.querySelectorAll('[data-spoilers]');
	if (spoilersArray.length) {
		spoilersArray.forEach(spoilersInit);
		// Инициализация блоков спойлеров
		function spoilersInit(spoilersBlock) {
			const spoilersData = arrayFromData(spoilersBlock, 'data-spoilers');
			const spoilersContents = [];
			const spoilersButtons = spoilersBlock.querySelectorAll(`[data-spoiler="${spoilersData[0]}"]`);
			// Добавление в массив контента, идущего за каждой кнопкой
			spoilersButtons.forEach(spoilersButton => {
				spoilersContents.push(spoilersButton.nextElementSibling);
			})
			const media = window.matchMedia(`(max-width:${1149.98 / 16}em)`);
			media.addEventListener('change', mediaChanges);
			mediaChanges(media);

			function mediaChanges(media) {
				if (media.matches) {
					spoilersInitBody(spoilersBlock, spoilersButtons, spoilersContents);
				} else {
					spoilersRemoveBody(spoilersBlock, spoilersButtons, spoilersContents);
				}
			}
		}
		// Инициализация элементов блока
		function spoilersInitBody(spoilersBlock, spoilersButtons, spoilersContents) {
			spoilersBlock.classList.add('on');
			// Строка с 3 параметрами селектора data-spoilers
			const spoilersData = arrayFromData(spoilersBlock, 'data-spoilers');
			// Добавление атрибутов для каждой кнопки
			spoilersButtons.forEach((spoilersButton, index) => {
				spoilersButton.setAttribute('id', `${spoilersData[0]}-btn-${index + 1}`);
				spoilersButton.setAttribute('aria-expanded', false);
				spoilersButton.setAttribute('aria-controls', `${spoilersData[0]}-cnt-${index + 1}`);
				// Если указан номер активной кнопки (0,1...)
				// Или указан параметр открытия всех кнопок (all)
				if (spoilersData[2] == index || spoilersData[2] == 'all') {
					// Стили открытой кнопки
					spoilersToggle(spoilersButton, true, true);
				}
			});
			// Добавление атрибутов для каждого контент-блока
			spoilersContents.forEach((spoilersContent, index) => {
				spoilersContent.setAttribute('id', `${spoilersData[0]}-cnt-${index + 1}`);
				spoilersContent.setAttribute('role', 'region');
				spoilersContent.setAttribute('aria-labelledby', spoilersButtons[index].id);
				// Если контент находится по неактивной кнопкой
				// Или указан параметр закрытия всех кнопок (null)
				if (spoilersData[2] != index && spoilersData[2] != 'all') {
					slideUp(spoilersContent, 0);
				}
			});
			spoilersEvents(spoilersBlock, spoilersButtons, spoilersData);
		}
		// Сброс элементов блока
		function spoilersRemoveBody(spoilersBlock, spoilersButtons, spoilersContents) {
			spoilersBlock.classList.remove('on');
			// Сброс атрибутов для каждой кнопки
			spoilersButtons.forEach(spoilersButton => {
				spoilersButton.removeAttribute('id');
				spoilersButton.removeAttribute('aria-expanded');
				spoilersButton.removeAttribute('aria-controls');
			});
			// Сброс атрибутов для каждого контент-блока
			spoilersContents.forEach(spoilersContent => {
				spoilersContent.removeAttribute('id',);
				spoilersContent.removeAttribute('role');
				spoilersContent.removeAttribute('aria-labelledby');
				spoilersContent.removeAttribute('hidden');
			});
		}
		// События элементов спойлера
		function spoilersEvents(spoilersBlock, spoilersButtons, spoilersData) {
			spoilersBlock.addEventListener('click', (e) => {
				if (spoilersBlock.classList.contains('on')) {
					// Если кликнули на спойлер
					if (e.target.closest('[data-spoiler]')) {
						e.preventDefault();
						const el = e.target.closest('[data-spoiler]');
						// Если аккордеон
						if (spoilersData[1] === 'true') {
							const activebutton = spoilersBlock.querySelector('.active');
							if (!spoilersBlock.querySelectorAll('.slide').length) {
								if (el !== activebutton) {
									spoilersSetButtons(el, activebutton, true);
								}
							}
						} else {
							// Пока блок контента не прекратит анимаицю
							if (!el.nextElementSibling.classList.contains('slide')) {
								spoilersSetButtons(el, null, false);
							}
						}
					}
				}
			});
			spoilersBlock.addEventListener('keydown', (e) => {
				if (spoilersBlock.classList.contains('on')) {
					// Замкнутое перемещение с помощью ArrowUp и ArrowDown по самим кнопкам, а не всем фокус элементам
					if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
						focusTrap(e, spoilersButtons, e.key === 'ArrowUp', false);
					}
					// Фокус на первый спойлер
					else if (e.key === 'Home') { spoilersButtons[0].focus(); }
					// Фокус на последний спойлер
					else if (e.key === 'End') { spoilersButtons[spoilersButtons.length - 1].focus(); }
				}
			});
		}
		// Проверка типа спойлеров
		function spoilersSetButtons(newButton, oldButton, accordion) {
			// Если аккордеон
			if (accordion) {
				// Открываем новый спойлер 
				spoilersToggle(newButton, true, true);
				slideDown(newButton.nextElementSibling, 300);
				// Закрываем старый спойлер 
				spoilersToggle(oldButton, false, true);
				slideUp(oldButton.nextElementSibling, 300);
			} else {
				// В зависимости от состояния спойлера
				const expanded = newButton.classList.contains('active');
				spoilersToggle(newButton, !expanded, false);
				slideToggle(newButton.nextElementSibling, 300);
			}
		}
		// Переключение стилей кнопки спойлера
		function spoilersToggle(spoilersButton, expanded, accordion) {
			spoilersButton.classList.toggle('active');
			spoilersButton.setAttribute('aria-expanded', expanded);
			// Если аккордеон
			if (accordion) {
				// Aria-disabled для открытой кнопки
				expanded ? spoilersButton.setAttribute('aria-disabled', true) :
					spoilersButton.removeAttribute('aria-disabled');
			}
		}
	}
}
spoilers();
//================================================================================