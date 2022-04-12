//================================================================================

// data-popup="id" - для попапа
//  @id - id секции
// data-popup-close - закрывающий попап элемент
// data-popup-open="id" - кнопка открытия попапа
//  @id - id открывабщего попапа

// .popup--open - стиль открытого попапа

import { focusTrap, scrollLockToggle } from "../functions.js";

export function popup(form = false) {
	// Если попапы не для форм
	if (!form) {
		const popupOpenButtons = document.querySelectorAll('[data-popup-open]');
		if (popupOpenButtons.length) {
			popupOpenButtons.forEach(popupInit);
		}
	} else {
		const popupForm = document.querySelector(`.${form}`);
		const popupSubmit = popupForm.querySelector('.form__arrow');
		popupInit(popupSubmit);
	}
	function popupInit(popupOpen) {
		// Получаем ID открываемого попапа
		const popupId = !form ? popupOpen.dataset.popupOpen : 'form';
		// Находим нужный попап по ID
		const popup = document.querySelector(`[data-popup="${popupId}"]`);
		// Если он есть
		if (popup) {
			// При наличии > 1 кнопки закрытия
			const popupClose = Array.from(popup.querySelectorAll('[data-popup-close]'));
			const popupWrapper = popup.firstElementChild;
			// Если попап для формы, сразу запускаем его появление
			form ? popupStyles(popupClose[0]) :
				popupOpen.addEventListener('click', () => { popupStyles(popupClose[0]); });
			function popupStyles(popupElement) {
				// popupElement - фокусируемый элемент
				scrollLockToggle();
				popup.classList.toggle('popup--open');
				popupElement.focus();
				// В зависимости от элемента либо создаем события, либо удаляем их
				if (popupElement === popupOpen) {
					window.removeEventListener('keydown', popupKeyboard);
					popup.removeEventListener('click', popupCloseEvent);
				} else {
					window.addEventListener('keydown', popupKeyboard);
					popup.addEventListener('click', popupCloseEvent);
				}
			}
			function popupCloseEvent(e) {
				// Если кликнули вне попапа или на любую кнопку закрытия
				if (e.target.closest('[data-popup-close]') || e.target === popupWrapper) {
					popupStyles(popupOpen);
				}
			}
			function popupKeyboard(e) {
				if (e.key === 'Escape') { popupStyles(popupOpen); }
				// Tab (вперед) или Shift Tab (назад)
				if (e.key === 'Tab' || (e.shiftKey && e.key === 'Tab')) {
					focusTrap(e, popupWrapper, e.shiftKey && e.key === 'Tab');
				}
			}
		}
	}
}

//================================================================================