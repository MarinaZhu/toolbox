"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const filter = document.querySelector('.filter'),
          filterTrigger = document.querySelector('.filter-trigger'),
          filterClose = document.querySelector('.close');

    const triggerFilter = (bool) => event =>{
        const elementsToTrigger = document.querySelectorAll('.filter-trigger, .filter, .tab-filter, .gallery')
        elementsToTrigger.forEach((element) => {
            element.classList.toggle('filter-is-visible', bool);
        });
    }

    filterTrigger.addEventListener('click', triggerFilter(true));
    filterClose.addEventListener('click', triggerFilter(false));
});