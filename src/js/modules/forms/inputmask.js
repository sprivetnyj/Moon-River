//================================================================================

import "inputmask/dist/inputmask.min.js";

function inputMasks() {
	const inputTelMasks = document.querySelectorAll('input[type="tel"]');
	if (inputTelMasks.length) {
		inputTelMasks.forEach(input => {
			Inputmask({ "mask": '+7(999)-999-99-99', showMaskOnHover: false }).mask(input);
		});
	}
}

inputMasks();

//================================================================================