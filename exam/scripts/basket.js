"use strict";

import { getItemById } from "./api.js";

const itemsContainer = document.querySelector(".items");

const itemsData = [];
const promises = [];

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

function displayNothingSelected() {
    if (itemsData.length) {
        document.querySelector(".nothingSelected")
            .style.display = "none";
        return;
    }
    document.querySelector(".nothingSelected").style.display = "inline";
}

function renderSelectedItems() {
    itemsContainer.innerHTML = "";
    displayNothingSelected();
    itemsData.forEach(data => {
        const card = createItemCard(data);
        card.querySelector("button").textContent = "Удалить";
        itemsContainer.append(card);
    });
}

for (let i = 0; i < localStorage.length; i++) {
    let key = window.localStorage.key(i);
    let id = window.localStorage.getItem(key);
    promises.push(getItemById(id).then(data => {
        itemsData.push(data);
    }));
}

if (promises.length != 0) {
    Promise.all(promises).then(() => {
        console.log("here");
        renderSelectedItems();
    });
}

function removeDish(id) {
    window.localStorage.removeItem(`${id}`);
    for (let i = 0; i < itemsData.length; i++) {
        if (itemsData[i].id == id) {
            itemsData.splice(i, 1);
            return;
        }
    }
}

itemsContainer.onclick = function(e) {
    let target = e.target;
    if (target.tagName != "BUTTON") return;

    const card = target.parentElement.parentElement;
    removeDish(Number(card.dataset.id));
    renderSelectedItems();
};

const closeNotificationBtn = document.querySelector(".closeNotification");
closeNotificationBtn.onclick = function() {
    closeNotificationBtn.parentElement.style.display = "none";
};