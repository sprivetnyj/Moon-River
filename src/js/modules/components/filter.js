//================================================================================

// Сниппет "filter"

// data-filter - для родителя всех фильтр элементов
// data-filter-title="id" - для кнопки фильтра
//  @id - ID категории фильтра
//   {all} - все элементы фильтра
//   {text} - элементы фильтра под категорию
// data-filter-item="id" - для элемента фильтра
//  @id - ID категории фильтра
//   {text} - категория элемента

// .active - для активной кнопки фильтра
// .hidden - для скрытого элемента фильтра (display: none)

function filter() {
	const filterArray = document.querySelectorAll('[data-filter]');
	if (filterArray.length) {
		filterArray.forEach(filterBlock => {
			const filterItems = filterBlock.querySelectorAll('[data-filter-item]');
			const filterTitles = filterBlock.querySelectorAll('[data-filter-title]');
			// При клике на заголовок фильтра
			filterTitles.forEach(filterTitle => {
				filterTitle.addEventListener('click', (e) => {
					// Всплытие до нужного элемента
					if (e.target.closest('[data-filter-title]')) {
						const filterTarget = e.target.closest('[data-filter-title]');
						// Если клик на не активный заголовок
						if (!filterTarget.classList.contains('active')) {
							// Убираем активный класс у предыдущего, добавляем его новому
							filterTitles.forEach(filterTitle => filterTitle.classList.remove('active'));
							filterTarget.classList.add('active');
							// Находим по ID заголовка нужные элементы
							const filterId = filterTarget.getAttribute('data-filter-title');
							filterItems.forEach(filterItem => {
								// Скрываем и показываем конкретные элементы
								if (filterId === 'all') {
									filterItem.classList.remove('hidden');
								} else if (filterItem.getAttribute('data-filter-item') === filterId) {
									filterItem.classList.remove('hidden');
								} else {
									filterItem.classList.add('hidden');
								}
							});
						}
					}
				});
			});
		});
	}
}

filter();

//================================================================================