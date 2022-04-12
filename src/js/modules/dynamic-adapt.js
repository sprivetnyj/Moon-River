//================================================================================

// Сниппет "dd"

// data-da="target,breakpoint,position" - для перемещаемого элемента
//  @target - конечный элемент
//  @breakpoint - ширина срабатывания
//  @position - позиция относительно target
//   {before} - до элемента
//   {after} - после элемента

function dynamicAdapt() {
	const targetElementsArray = document.querySelectorAll('[data-da]');
	if (targetElementsArray.length) {
		targetElementsArray.forEach(targetElement => {
			// Параметтры data атрибута
			const pointElementData = arrayFromData(targetElement, 'data-da');
			// Конечный элемент
			const pointElement = document.querySelector(pointElementData[0]);
			// Если есть конечный элемент
			if (pointElement) {
				// Брейкпоинт, приведенный к виду (100 => 99.98 / 16 => 6.25(em))
				const pointElementBreakpoint = String((pointElementData[1] - 1)).concat('.98') / 16;
				// Позиция для размещения
				const pointElementPosition = pointElementData[2] === 'before' ? 'beforebegin' : 'afterend';

				// Предыдущий элемент
				let previousElement;
				// Текущая позиция
				let targetElementPosition;

				// Если есть предыдущий элемент
				if (targetElement.previousElementSibling) {
					previousElement = targetElement.previousElementSibling;
					// Всавка после предыдущего элемента
					targetElementPosition = 'afterend';
				} else {
					previousElement = targetElement.parentElement;
					// Вставка сразу после родителя
					targetElementPosition = 'afterbegin';
				}
				// Медиа-выражение
				const media = window.matchMedia(`(max-width:${pointElementBreakpoint}em)`);
				media.addListener(mediaChanges);
				mediaChanges(media);

				function mediaChanges(media) {
					if (media.matches) {
						pointElement.insertAdjacentElement(pointElementPosition, targetElement);
					} else {
						previousElement.insertAdjacentElement(targetElementPosition, targetElement);
					}
				}
			}
		});
	}
}

dynamicAdapt();

//================================================================================