//================================================================================

// Перед wrapper
// <script src="https://api-maps.yandex.ru/2.1/?apikey=<your API key>&lang=it_it"></script>

// <div id="map" class="map"></div>

function map() {
	if (document.querySelector('#map')) {
		addMap();
	}
	function addMap() {
		let center = [55.77241077714968, 37.679044499999975];
		let zoom = 16;

		function initMap() {
			let map = new ymaps.Map('map', {
				center: center,
				zoom: zoom,
			});
			map.controls.remove('geolocationControl'); // удаляем геолокацию
			map.controls.remove('searchControl'); // удаляем поиск
			map.controls.remove('trafficControl'); // удаляем контроль трафика
			map.controls.remove('typeSelector'); // удаляем тип
			map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
			map.controls.remove('zoomControl'); // удаляем контрол зуммирования
			map.controls.remove('rulerControl'); // удаляем контрол правил
		}

		ymaps.ready(initMap);
	}
}

map();

//================================================================================