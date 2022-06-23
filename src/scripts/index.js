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

function requestMenu() {
  fetch("../../src/mocks/MENU.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const sizeWindow = window.innerWidth;

      if (sizeWindow >= 1024) {
        constructMenuDesktop(json.menu);
      } else {
        constructMenuMobile(json.menu);
      }
    });
}

function constructMenuDesktop(json) {
  let strucureMenu = "";
  const $containerMenu = document.querySelector(".header__menu");

  for (const menu of json) {
    strucureMenu += `<div class="header__menu-wrapper">
      <a href=${menu.url} class="header__menu-department script">${
      menu.name
    }</a>
      ${
        menu.children
          ? `
      <div class="header__menu-items ${
        (menu.name === "Turmalina" ? "turmalina" : "",
        menu.name === "Outros" ? "others" : "")
      }">
        ${menu.children
          .map(function (child) {
            return `
          <div class="header__menu-wrapper-category">
              <a href=${child.url} class="header__menu-category" >
                ${child.name}
              </a>

              ${
                child.children
                  ? `
                <div class="header__menu-sub-category">
                  ${child.children
                    .map(function (subChild) {
                      return `
                      <a href=${subChild.url} class="header__menu-category">
                        ${subChild.name}
                      </a>
                    `;
                    })
                    .join("")}
                </div>
                `
                  : ``
              }
          </div>
          `;
          })
          .join("")}
      </div>
          `
          : ``
      }
    </div>`;
  }

  $containerMenu.innerHTML = strucureMenu;
}

function handleMenuMobileCategory() {
  const $deparments = document.querySelectorAll(
    ".header__menu-mobile-with-child"
  );

  $deparments.forEach(function ($department) {
    const $iconClick = $department.querySelector(".iconArrow");
    const $category = $department.querySelector(".header__menu-mobile-items");

    $iconClick.addEventListener("click", function () {
      $category.classList.toggle("active");
    });
  });
}

function constructMenuMobile(json) {
  let structureMenu = "";
  const $containerMenu = document.querySelector(
    ".header__menu-mobile-structure"
  );

  json.map(function (menu) {
    structureMenu += `
      <div class="header__menu-mobile-wrapper ${
        menu.children ? "header__menu-mobile-with-child" : ""
      }">
        <div class="header__menu-mobile-wraper-department">
          <a
            href=${menu.url}
            class="header__menu-department header__menu-mobile-department"
          >
            ${menu.name}
          </a>
          <span class="iconArrow header__menu-mobile-icon-arrow">
            <img src="./assets/arrow-down.png" alt="" />
          </span>
        </div>
        ${
          menu.children
            ? `
          <div class="header__menu-mobile-items">
            ${menu.children
              .map(function (child) {
                return `
              <div class="header__menu-wrapper">
                <a href="index.html" class="header__menu-category">
                  ${child.name}
                </a>
              </div>
              `;
              })
              .join("")}
          </div>
        `
            : ``
        }
       
      </div>
    `;
  });

  $containerMenu.innerHTML = structureMenu;

  handleMenuMobileCategory();
}

// informativesTop();
requestMenu();

function handleToggleMenuMobile() {
  const $menuMobile = document.querySelector(".header__menu-hamburger");
  const $estructureMenuMob = document.querySelector(".header__menu-mobile");
  const $closeMenuIconX = document.querySelector(".close-menu");
  const $shadowMenuMobile = document.querySelector(".shadow");
  $menuMobile.addEventListener("click", function () {
    $estructureMenuMob.classList.add("active");
  });

  $closeMenuIconX.addEventListener("click", function () {
    $estructureMenuMob.classList.remove("active");
  });

  $shadowMenuMobile.addEventListener("click", function () {
    $estructureMenuMob.classList.remove("active");
  });
}

handleToggleMenuMobile();

function constructShelf(products) {
  const $containerShelf = document.querySelector('.shelf')
  products.map(function (product) {
    const image = document.createElement('img')
    const seal = document.createElement('div')
    const name = document.createElement('h2')
    const price = document.createElement('span')
    const containerProduct = document.createElement('div')
    const button = document.createElement('button')
    const installment = document.createElement('span')
    image.src = product.image
    image.classList.add('shelf__image')
    image.alt = product.title

    seal.textContent = product.category
    seal.classList.add('shelf__seal')

    name.textContent = product.title
    name.classList.add('shelf__name')

    price.textContent = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.price)
    price.classList.add('shelf__price')

    containerProduct.classList.add('shelf__product')

    installment.textContent = 'Compre em até 8x sem juros' 
    installment.classList.add('shelf__installment')

    button.textContent = 'Comprar'
    button.classList.add('shelf__button')

    containerProduct.appendChild(image)
    containerProduct.appendChild(seal)
    containerProduct.appendChild(name)
    containerProduct.appendChild(price)
    containerProduct.appendChild(installment)
    containerProduct.appendChild(button)

    $containerShelf.appendChild(containerProduct)
  });
}
function requestProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      constructShelf(json);
    });
}

requestProducts();
