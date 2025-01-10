"use strict";

import { getAllItemsPaginate, getItemsByQuery } from "./api.js";

const itemsContainer = document.querySelector(".items");
const showMoreBtn = document.querySelector(".showMoreBtn");
const searchBtn = document.querySelector(".searchBtn");

let itemsData = [];
let totalItemsCount;
let currentPage = 1;

function createItemCard(data) {
    const card = document.createElement("div");
    card.className = "itemCard";
    card.setAttribute("data-id", data.id);
    card.setAttribute("data-category", data.main_category);

    const actual_price = data.actual_price;
    const discount_price = data.discount_price;
    let discount = (actual_price - discount_price) * 100 / actual_price;
    discount = String(Math.round(discount)) + "%";
    let oldPrice = String(actual_price) + "₽";
    let price;

    if (!discount_price) {
        price = String(actual_price) + "₽";
        oldPrice = "";
        discount = "";
    } else {
        price = String(discount_price) + "₽";
    }

    card.innerHTML = `
        <figure class="itemImg">
            <img
                src="${data.image_url}"
                alt=""
            />
        </figure>
        <div class="itemAttributes">
            <p class="itemName">${data.name}</p>
            <div class="itemRating">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
            </div>
            <div class="itemPriceAndDiscount">
                <p class="price">${price}</p>
                <p class="oldPrice">${oldPrice}</p>
                <p class="discount">${discount}</p>
            </div>
            <button>Добавить</button>
        </div>
    `;
    const stars = card.querySelectorAll(".star");
    for (let i = 0; i < Math.round(data.rating); i++) {
        stars[i].classList.add("active");
    }
    return card;
}

function checkSelected(data) {
    if (window.localStorage.getItem(`${data.id}`)) {
        return true;
    } else {
        return false;
    }
}

async function renderItems(needClear) {
    await getAllItemsPaginate(currentPage).then((response) => {
        totalItemsCount = response._pagination.total_count; 
        if (needClear) {
            itemsData = [];
            itemsContainer.innerHTML = "";
        }
        itemsData.concat(response.goods);
        response.goods.forEach(element => {
            const itemCard = createItemCard(element);
            if (checkSelected(element)) {
                itemCard.querySelector("button").textContent = "Добавлено";
            }
            itemsContainer.append(itemCard);
        });
    });
}

renderItems(true);

async function renderQueryItems(query) {
    await getItemsByQuery(query).then((response) => {
        itemsContainer.innerHTML = "";
        if (response.length == 0) {
            const elem = document.createElement("p");
            elem.textContent = "Ничего не найдено";
            itemsContainer.append(elem);
            return;
        }
        response.forEach((element) => {
            const itemCard = createItemCard(element);
            itemsContainer.append(itemCard);
        });
    });
    
}

showMoreBtn.onclick = async function() {
    // Это чтобы точно кнопка не работала после скрытия
    if (currentPage == Math.ceil(totalItemsCount / 12)) {
        return;
    }

    currentPage++;
    await renderItems(false);

    if (currentPage == Math.ceil(totalItemsCount / 12)) {
        showMoreBtn.style.display = "none";
    }
};

searchBtn.onclick = async function(e) {
    e.preventDefault();
    showMoreBtn.style.display = "none";
    const query = document.getElementById("searchbar").value;
    if (!query) {
        renderItems(true);
        showMoreBtn.style.display = "block";
    } else {
        renderQueryItems(query);
    }
};

const closeNotificationBtn = document.querySelector(".closeNotification");
closeNotificationBtn.onclick = function() {
    closeNotificationBtn.parentElement.style.display = "none";
};

itemsContainer.onclick = function(e) {
    let target = e.target;
    if (target.tagName != "BUTTON" || target.textContent == "В корзине") return;

    const card = target.parentElement.parentElement;
    window.localStorage.setItem(`${card.dataset.id}`, `${card.dataset.id}`);
    target.textContent = "В корзине";
    console.log(window.localStorage);
};