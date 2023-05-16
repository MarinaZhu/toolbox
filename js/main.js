"use strict";
window.addEventListener('DOMContentLoaded', () => {

    /*---------- Cards ---------*/
    const gallery = document.querySelector(".gallery");

//add new workshops from json file dinamically
    function renderCards(cardsArray){
        for (let i = 0; i < cardsArray.length; i++) {
            const card = document.createElement("div");
            card.classList.add('card');

            card.innerHTML = `<div class="box2" style="background-color: ${cardsArray[i].backgroundColor}">
        <img class="imageOfType" src="${cardsArray[i].typeImage}" width="30px"></div>
        <div class="box3">
          <p class="title">${cardsArray[i].title}</p>
          <br>
          <i class="material-icons" style="font-size: 25px; padding-left: 10px">
            signal_cellular_alt_2_bar
          </i>

          <span class="icon-span">${cardsArray[i].difficulty}</span>
          <i class="material-icons">group</i>
          <span class="icon-span">${cardsArray[i].minNumberOfParticipants} - ${cardsArray[i].maxNumberOfParticipants}</span>
          <i class="material-icons">schedule</i>
          <span class="icon-span">${cardsArray[i].minDuration} - ${cardsArray[i].maxDuration}</span>
        </div>`;

            card.addEventListener("click", popupOpen);

            gallery.appendChild(card);
        }
    }

    fetch('workshops1.json').then((response) => response.json()).then((json) => {
        renderCards(json);
    });

    /*---------- PopUp ---------*/

    const popupClose = document.querySelector(".popupClose");

    //open popup
    function popupOpen() {
        fetch('workshops1.json').then((response) => response.json()).then((json) => {
            const workshopList = document.getElementsByClassName('card');
            for (let i = 0; i < workshopList.length; i++) {
                workshopList[i].onclick = function () {
                    const elementId = i;
                    console.log(elementId);
                    document.getElementById("popup-header").innerText = json[elementId].title;
                    document.getElementById("popup-difficulty").innerText = json[elementId].difficulty;
                    document.getElementById("popup-participants").innerText = `${json[elementId].minNumberOfParticipants} - ${json[elementId].maxNumberOfParticipants}`;
                    document.getElementById("popup-duration").innerText = `${json[elementId].minDuration} - ${json[elementId].maxDuration}`;
                    document.getElementById("popup-main-image").setAttribute("src", json[elementId].popupImage);
                    document.getElementById("myPopup").classList.toggle("show");
                }
            }
        });
    }

    //close popup when user clicks at Close button
    popupClose.addEventListener("click", () => {
        document.getElementById("myPopup").classList.remove("show");
    });

    /* ---------- Filter ---------- */

    const filter = document.querySelector('.filter'),
        filterTrigger = document.querySelector('.filter-trigger'),
        filterClose = document.querySelector('.close'),
        filterForm = document.querySelector('.filter-form'),
        checkboxes = filterForm.querySelectorAll('.filter_item');

    //Filter Trigger
    const triggerFilter = (bool) => event => {
        const elementsToTrigger = document.querySelectorAll('.filter-trigger, .filter, .tab-filter, .gallery')
        elementsToTrigger.forEach((element) => {
            element.classList.toggle('filter-is-visible', bool);
        });
    }

    filterTrigger.addEventListener('click', triggerFilter(true));
    filterClose.addEventListener('click', triggerFilter(false));

    //Checkbox
    fetch('workshops1.json').then((response) => response.json()).then((items) => {
        const difficulties = items.map(item => item.difficulty),
              categories = items.map(item => item.category);

        // Add event listeners to the checkboxes to filter the items
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Get the selected difficulty values
                const selectedCheckboxes = Array.from(checkboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.dataset.filter);

                // If no checkboxes are checked, show all items
                if (selectedCheckboxes.length === 0) {
                    // Clear the existing content in the container
                    gallery.innerHTML = '';
                    renderCards(items);
                } else {
                    // Filter the items based on the selected difficulty values
                    const filteredItems = items.filter(item => {
                        const itemDifficulty = item.difficulty.toLowerCase();
                        return selectedCheckboxes.includes('.' + itemDifficulty);
                    });

                    // Clear the existing content in the container
                    gallery.innerHTML = '';

                    // Check if there are any filtered items
                    if (filteredItems.length === 0) {
                        const failMessage = document.createElement('div');
                        failMessage.classList.add('fail-message');
                        failMessage.textContent = 'No results found';
                        gallery.appendChild(failMessage);
                    } else {
                        // Render filtered items
                        renderCards(filteredItems);
                    }
                }
            });
        });
    });

    //Slider

    //sets the minimum value of the range slider and its corresponding #fromInput field
    function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromSlider.value = from;
        }
    }

    //sets the maximum value of the range slider and its corresponding #toInput field
    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
        setToggleAccessible(toInput);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
        }
    }

    //function updates the #fromInput field when the range slider is adjusted by the user
    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromInput.value = from;
        }
    }

    //function updates the #toInput field when the range slider is adjusted by the user
    function controlToSlider(fromSlider, toSlider, toInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
        setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
            toSlider.value = from;
        }
    }

    //function gets the current values of the #fromInput and #toInput fields and returns them as an array
    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    //function fills the range slider track with a gradient color based on the current values of the 'from' and 'to' input fields
    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max-to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (Number(currentTarget.value) <= 0 ) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }

    const fromSlider = document.querySelector('#fromSlider');
    const toSlider = document.querySelector('#toSlider');
    const fromInput = document.querySelector('#fromInput');
    const toInput = document.querySelector('#toInput');
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);

    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

});