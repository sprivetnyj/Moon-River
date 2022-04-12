// ФУНКЦИИ =======================================================================

import * as functions from "./modules/functions.js";

// Проверка поддержки WebP
functions.isWebp();

// Исправление наложения нижней панели на смартфонах
functions.fullVHfix();

// Скролл фиксированного header
functions.headerScroll();

// КОМПОНЕНТЫ ====================================================================

// Фильтр
// import "./modules/components/filter.js";

// Бургер меню
// import "./modules/components/headerMenu.js";

// Попап
// import { popup } from "./modules/components/popup.js"; popup();

// Выпадающий список
// import "./modules/components/select.js";

// Спойлеры
// import "./modules/components/spoilers.js";

// Табы
// import "./modules/components/tabs.js";

// Тултипы
// import "./modules/components/tooltip.js";

// РАБОТА С ФОРМАМИ ==============================================================

// Валидация 
import "./modules/forms/forms.js";

// Маски для полей
// import "./modules/forms/inputmask.js";

// Range слайдер
// import "./modules/forms/range.js";

// Количество
// import "./modules/forms/quantity.js";

// СКРОЛЛ ========================================================================

// Анимация при скролле
import "./modules/scroll/anim-scroll.js";

// Плавный скролл
// import "./modules/scroll/smooth-scroll.js";

// Кастомный скроллбар (data-simplebar)
// import SimpleBar from 'simplebar';

// ПРОЧЕЕ ========================================================================

// Динамический адаптив
// import "./modules/dynamic-adapt.js";

// Яндекс карта
// import "./modules/map.js";

// Параллакс мышью
// import "./modules/parallax-mouse.js";

// Слайдеры swiper
import "./modules/sliders.js";

// Переключатель темы
// import "./modules/themes.js";

//================================================================================

// Свои скрипты
import "./modules/scripts.js";
