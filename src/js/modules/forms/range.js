//================================================================================

// Сниппет "range"

// data-range="min,max,start" - для range слайдера
//  @min - минимальное значение
//  @max - максимальное значение
//  @start - стартовое значение

import * as noUiSlider from 'nouislider';

function range() {
	const rangeSlider = document.querySelector('[data-range]');
	if (rangeSlider) {
		const rangeSliderData = arrayFromData(rangeSlider, 'data-range');
		const rangeSliderMin = Number(rangeSliderData[0]);
		const rangeSliderMax = Number(rangeSliderData[1]);
		const rangeSliderStart = Number(rangeSliderData[2]);

		noUiSlider.create(rangeSlider, {
			start: [rangeSliderStart, rangeSliderMax],
			connect: true,
			step: 1,
			range: {
				'min': rangeSliderMin,
				'max': rangeSliderMax,
			}
		});

		const rangeInputs = rangeSlider.parentElement.querySelectorAll('input[type="number"]');
		const rangeArray = [null, null];

		// При изменении ползунков
		rangeSlider.noUiSlider.on('update', (values, handle) => {
			// Задаем value конкретному input
			rangeInputs[handle].value = Math.round(values[handle]);
		});

		// При изменении значения input
		rangeInputs.forEach((rangeInput, index) => {
			rangeInput.addEventListener('change', (e) => {
				setRangeSlider(index, e.currentTarget.value);
			});
		});

		function setRangeSlider(index, value) {
			rangeArray[index] = value;
			rangeSlider.noUiSlider.set(rangeArray);
		}
	}
}

range();

//================================================================================