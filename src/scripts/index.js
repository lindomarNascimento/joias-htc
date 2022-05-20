function constructInformativesTop(json) {
  const $wrapper = document.querySelector(".header__informative-wrapper");

  for (completeText of json) {
    $wrapper.innerHTML += `
      <span class="header__informatives-top--text${
        completeText.firstBold ? "-strong" : ""
      }">
        ${completeText.text}
        <span class="header__informatives-top--text${
          completeText.firstBold === false ? "-strong" : "-margin"
        }">
          ${completeText.bold}
        </span>
      </span>
    `;
  }
}

function informativesTop() {
  fetch("../../src/mocks/INFORMATIVES__TOP.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructInformativesTop(json);
    });
}

function requestMenuDesktop() {
  fetch("../../src/mocks/MENU.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructMenuDesktop(json.menu);
    });
}

function constructMenuDesktop(json) {
  let strucureMenu = "";

  const $containerMenu = document.querySelector(".header__menu");

  for (const menu of json) {
    strucureMenu += `<div class="header__menu-wrapper">
      <a href=${menu.url} class="header__menu-department script">${menu.name}</a>
    </div>`;
  }

  $containerMenu.innerHTML = strucureMenu;
}

informativesTop();
// requestMenuDesktop();
