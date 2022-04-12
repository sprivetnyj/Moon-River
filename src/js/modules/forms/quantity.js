//================================================================================

// Сниппет "form"

function quantity() {
	const quantityArray = document.querySelectorAll('.quantity');
	if (quantityArray.length) {
		quantityArray.forEach(quantityBlock => {
			quantityBlock.addEventListener('click', (e) => {
				let target = e.target;
				if (target.closest('.quantity__button')) {
					let value = target.closest('.quantity').querySelector('input').value;
					if (target.classList.contains('quantity__button--plus')) {
						value++;
					} else {
						value--;
						if (value < 1) value = 1;
					}
					target.closest('.quantity').querySelector('input').value = value;
				}
			});
			const input = quantityBlock.querySelector('.quantity__input');
			// При ручной смене на некорректное значение (0, ' ' и т.д)
			input.addEventListener('change', () => {
				if (input.value < 1) input.value = 1;
			});
		});
	}
}

quantity();

//================================================================================