//================================================================================

// Сниппет "form"

// data-form - для формы
// data-required - для обязательного поля
// data-validate="min,max" - для валидации полей
//  @min - минимальная длина поля (опционально для input[type="text"])
//  @max - максимальная длина поля (опционально для input[type="text"])

// .form__error - подпись ошибки под полем
// .error - ошибка для поля

import { arrayFromData } from '../functions.js';
import { popup } from '../components/popup.js'

function forms() {
	const formsArray = document.querySelectorAll('[data-form]');
	if (formsArray.length) {
		formsArray.forEach(form => {
			const formItems = form.querySelectorAll('[data-required]');
			if (formItems.length) {
				formItems.forEach(formItemEvents);
				form.addEventListener('submit', formSubmit);
				// События для полей
				function formItemEvents(formItem) {
					// При каждом новом вводе в поле
					formItem.addEventListener('input', (e) => {
						// Если была попытка отправки формы
						if (form.classList.contains('error')) {
							// Валидация на лету
							const errors = formValidate(e.target);
							checkErrors(e.target, errors);
						}
					});
					// При фокусе удаляем ошибку
					formItem.addEventListener('focus', (e) => {
						removeErrors(e.target);
					});
					// При смене фокуса проверяем на ошибку
					formItem.addEventListener('blur', (e) => {
						// Если была попытка отправки формы
						if (form.classList.contains('error')) {
							const errors = formValidate(e.target);
							checkErrors(e.target, errors);
						}
					});
				}
				// При отправке формы
				function formSubmit(e) {
					let totalErrors = 0;
					e.preventDefault();
					formItems.forEach(formItem => {
						formItem.value = formItem.value.trimEnd();
						const errors = formValidate(formItem);
						if (errors.length) {
							checkErrors(formItem, errors);
							form.classList.add('error');
							totalErrors++;
						}
					});
					if (totalErrors === 0) {
						form.classList.remove('error');
						form.reset();
						popup(form.classList[0]);
					}
				}
				// Валидация полей
				function formValidate(formItem) {
					const isValidate = formItem.hasAttribute('data-validate');
					const errors = [];
					// Очистка от пробелов на старте
					if (formItem.type !== 'tel') {
						formItem.value = formItem.value.trimStart();
					}
					// Если поле пустое (без учета очищенных ранее пробелов)
					if (!formItem.value) {
						errors.push('Поле обязательно!');
					}
					// Если есть опция валидации
					if (isValidate) {
						// Если текстовое поле или область
						if ((formItem.tagName === 'INPUT' && formItem.type === 'text') || formItem.tagName === 'TEXTAREA') {
							// Диапазон по вводимым символам
							const itemRangeValues = arrayFromData(formItem, 'data-validate');
							if (formItem.value.length < itemRangeValues[0]) {
								errors.push(`Поле должно содержать минимум ${itemRangeValues[0]} символа!`);
							}
							if (formItem.value.length > itemRangeValues[1]) {
								errors.push(`Поле должно содержать максимум ${itemRangeValues[1]} символов!`);
							}
						} else if (formItem.type === 'email') {
							if (testValue(formItem, 'email')) {
								errors.push(`Email неверного формата!`);
							}
						} else if (formItem.type === 'tel') {
							if (testValue(formItem, 'tel')) {
								errors.push(`Телефон должен содержать минимум 10 цифр!`);
							}
						} else if (formItem.type === 'checkbox') {
							if (!formItem.checked) {
								errors.push(`Подтвердите соглашение!`);
							}
						} else {
							if (!formItem.value) {
								errors.push(`Поле обязательно!`);
							}
						}
					}
					// Возвращаем все ошибки в виде массива
					return errors;
				}
				// Проверка разных типов полей по регулярному выражению
				function testValue(element, type) {
					if (type === 'email') {
						return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(element.value);
					} else if (type === 'tel') {
						return !/[\(]?\d{3}[\)]?[-\.\s]?(\d{3})[-\.\s]?(\d{2})[-\.\s]?(\d{2})/.test(element.value);
					}
				}
				// Проверка на наличие ошибоу
				function checkErrors(formItem, errors) {
					if (errors.length) {
						addErrors(formItem, errors)
					} else {
						removeErrors(formItem);
					}
				}
				// Добавление ошибки
				function addErrors(formItem, errors) {
					if (!formItem.parentElement.querySelector('.form__error')) {
						formItem.classList.add('error');
						formItem.insertAdjacentHTML('afterend', `<div class="form__error">${errors[0]}</div>`);
					} else {
						formItem.nextElementSibling.textContent = errors[0];
					}
				}
				// Удаление ошибки
				function removeErrors(formItem) {
					if (formItem.parentElement.querySelector('.form__error')) {
						formItem.classList.remove('error');
						formItem.parentElement.querySelector('.form__error').remove();
					}
				}
			}
		});
	}
}

forms();

//================================================================================