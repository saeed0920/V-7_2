"use strict";

const selectElement = function (nameElement) {
  const element = document.querySelector(nameElement);
  if (element) return element;
  console.warn("this element undefined");
};
const selectElementAll = function (nameElement) {
  const element = document.querySelectorAll(nameElement);
  if (element) return element;
  console.warn("this elements undefined");
};

// variables
const selectors = {
  made(x) {
    for (let i = 1; i <= x; i++) {
      this[i] = selectElement(`.selector-${i}`);
    }
  },
};

const containers = {
  made(x) {
    for (let i = 1; i <= x; i++) {
      this[i] = selectElementAll(`.container-${i}`);
    }
  },
};
selectors.made(4);
containers.made(4);

const itemsNotActive = selectElementAll(".container--not-active");
const itemsFix = selectElement(".container--fix");

const homeIcon = selectElement(".home-icon");
const chatIcon = selectElement(".chat-icon");
// function
const addClass = function (nameElement, nameClass) {
  nameElement.classList.add(nameClass);
};

const removeClass = function (nameElement, nameClass) {
  nameElement.classList.remove(nameClass);
};

//setup default
const sets = new Set();
for (const [x, items] of Object.entries(selectors)) {
  // of containers
  sets.add(x);
}
sets.delete("made");
console.log(sets.size);

const setup = function () {
  for (let i = 1; i <= sets.size; i++) {
    removeClass(selectors[i], "selector-active");
    for (const x of containers[i]) {
      addClass(x, "hide");
    }
  }
  for (const items of containers[1]) {
    removeClass(items, "hide");
  }
  selectors[1].classList.add("selector-active");
};
setup();
//

// if user click selector
for (let i = 1; i <= 4; i++) {
  selectors[i].addEventListener("click", function () {
    sets.delete(`${i}`);
    //
    for (const x of sets) {
      removeClass(selectors[x], "selector-active");
      for (const items of containers[x]) {
        addClass(items, "hide");
      }
    }
    //
    addClass(selectors[i], "selector-active");
    for (const items of containers[i]) {
      removeClass(items, "hide");
    }
    //
    sets.add(`${i}`);
  });
}

// if user click home icon
homeIcon.addEventListener("click", function () {
  removeClass(itemsFix, "hide");
  for (const items of itemsNotActive) removeClass(items, "hide");
  removeClass(document.querySelector(".main-section__sidebar"), "fix-sidebar");
  removeClass(document.querySelector(".main-section"), "background-gray-main");
  setup();
});
