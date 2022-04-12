//================================================================================

import { isMobile } from './functions.js';
import Swiper, { Navigation, Pagination } from 'swiper';

// Autoplay, Controller, Thumbs
// Mousewheel, Keyboard, FreeMode
// Navigation, Pagination, Scrollbar

function sliders() {
	window.addEventListener("load", () => {
		setSliders();
		// setSiderScroll();
	});

	function setSliders() {
		if (document.querySelector('.slider-media')) {
			new Swiper('.slider-media', {
				modules: [Navigation, Pagination],
				spaceBetween: 20,
				speed: 800,
				// autoplay: {
				// 	delay: 3000,
				// 	disableOnInteraction: false,
				// },
				navigation: {
					nextEl: '.slider-media .swiper-button-next',
					prevEl: '.slider-media .swiper-button-prev',
				},
				pagination: {
					el: '.slider-media .swiper-pagination',
					type: 'bullets',
					clickable: true
				},
				breakpoints: {
					480: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					992: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
				},
			});
			// if (document.querySelector('.slider-section')) {
			// 	new Swiper('.slider-section', {
			// 		modules: [Navigation],
			// 		slidesPerView: 1,
			// 		spaceBetween: 0,
			// 		speed: 800,
			// 		// autoplay: {
			// 		// 	delay: 3000,
			// 		// 	disableOnInteraction: false,
			// 		// },
			// 		navigation: {
			// 			nextEl: '.slider-section .swiper-button-next',
			// 			prevEl: '.slider-section .swiper-button-prev',
			// 		},
			// 		// pagination: {
			// 		// 	el: '.slider-section .swiper-pagination',
			// 		// 	// bulletClass: 'slider-section__bullet',
			// 		// 	// bulletActiveClass: 'slider-section__bullet--active',
			// 		// 	type: 'bullets',
			// 		// 	clickable: true
			// 		// },
			// 		// breakpoints: {
			// 		// 	320: {
			// 		// 		slidesPerView: 1,
			// 		// 		spaceBetween: 15,
			// 		// 	},
			// 		// 	480: {
			// 		// 		slidesPerView: 1.5,
			// 		// 		spaceBetween: 15,
			// 		// 	},
			// 		// 	768: {
			// 		// 		slidesPerView: 2,
			// 		// 		spaceBetween: 15,
			// 		// 	},
			// 		// 	992: {
			// 		// 		slidesPerView: 3,
			// 		// 		spaceBetween: 30,
			// 		// 	},
			// 		// },
			// 	});
		}
	}
	// function setSiderScroll() {
	// 	const wrapper = document.querySelector('.page');
	// 	if (document.querySelector('.page')) {
	// 		const pageSlider = new Swiper('.page', {
	// 			modules: [Mousewheel, Keyboard, FreeMode],
	// 			direction: 'vertical',
	// 			speed: 900,
	// 			mousewheel: true,
	// 			slidesPerView: 'auto',
	// 			keyboard: true,
	// 			freeMode: false,
	// 			init: false,
	// 			on: {
	// 				init: function () {
	// 					setScrollType();
	// 					setMenuLinks();
	// 				},
	// 				slideChange: function () {
	// 					removeMenuLink();
	// 					// Если после 0 блока и до футера
	// 					if ((pageSlider.realIndex > 0) && (pageSlider.realIndex < menuLinks.length + 1)) {
	// 						menuLinks[pageSlider.realIndex - 1].classList.add('active');
	// 					}
	// 				},
	// 				resize: function () {
	// 					setScrollType();
	// 				}
	// 			}
	// 		});
	// 		const menuLinks = document.querySelectorAll('.menu__link');
	// 		function setMenuLinks() {
	// 			if (menuLinks.length) {
	// 				const menuLogo = document.querySelector('.header__logo');
	// 				if (menuLogo) {
	// 					menuLogo.addEventListener('click', (e) => {
	// 						removeMenuLink();
	// 						pageSlider.slideTo(0);
	// 						e.preventDefault();
	// 					});
	// 				}
	// 				menuLinks.forEach((menuLink, index) => {
	// 					menuLink.addEventListener('click', (e) => {
	// 						removeMenuLink();
	// 						pageSlider.slideTo(index + 1);
	// 						menuLinks[pageSlider.realIndex - 1].classList.add('active');
	// 						e.preventDefault();
	// 					});
	// 				});
	// 			}
	// 		}
	// 		function removeMenuLink() {
	// 			const menuLinkActive = document.querySelector('.menu__link.active');
	// 			if (menuLinkActive) {
	// 				menuLinkActive.classList.remove('active');
	// 			}
	// 		}
	// 		function setScrollType() {
	// 			if (isMobile.any()) {
	// 				pageSlider.params.freeMode.enabled = true;
	// 			} else {
	// 				if (wrapper.classList.contains('free')) {
	// 					wrapper.classList.remove('free');
	// 					pageSlider.params.freeMode.enabled = false;
	// 				}
	// 				for (let index = 0; index < pageSlider.slides.length; index++) {
	// 					const pageSlide = pageSlider.slides[index];
	// 					const pageSlideBody = pageSlide.querySelector('.swiper-slide__body');
	// 					if (pageSlideBody) {
	// 						const pageSlideBodyHeight = pageSlideBody.offsetHeight;
	// 						// Если содержимое блока не помещается в экран
	// 						if (pageSlideBodyHeight > window.innerHeight) {
	// 							wrapper.classList.add('free');
	// 							pageSlider.params.freeMode.enabled = true;
	// 							break;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 		pageSlider.init();
	// 	}
	// }
}

sliders();

//================================================================================