"use strict";

import { getAllDishes } from "./dishesApi.js";

window.localStorage.setItem("soupId", "");
window.localStorage.setItem("mainId", "");
window.localStorage.setItem("drinkId", "");
window.localStorage.setItem("saladId", "");
window.localStorage.setItem("dessertId", "");

let soupChoiceFilter;
let mainChoiceFilter;
let drkChoiceFilter;
let sldChoiceFilter;
let dsrtChoiceFilter;

let isActive1 = false;
let isActive2 = false;
let isActive3 = false;
let isActive4 = false;
let isActive5 = false;

let soupChoice;
let mainChoice;
let drkChoice;
let sldChoice;
let dsrtChoice;

const soupFilters = document.getElementById("soupFilters");
const mainFilters = document.getElementById("mainFilters");
const drinkFilters = document.getElementById("drinkFilters");
const saladFilters = document.getElementById("saladFilters");
const dessertFilters = document.getElementById("dessertFilters");

const dishSoupsCards = document.getElementById("soupes");
const dishMainCards = document.getElementById("main");
const dishDrinksCards = document.getElementById("drinks");
const dishSaladsCards = document.getElementById("salads");
const dishDessertsCards = document.getElementById("desserts");

let dishes;

function fillDishCard(dishCard, dishData) {
    dishCard.querySelector(".dish_img img").src = dishData.image;
    dishCard.querySelector(".dish_img img").alt = dishData.name;
    dishCard.querySelector(".price").textContent = `${dishData.price}₽`;
    dishCard.querySelector(".dish_name").textContent = dishData.name;
    dishCard.querySelector(".weight").textContent = dishData.count;
}

function createDishCard() {
    let dishCard = document.createElement("div");
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let weigth = document.createElement("p");
    let price = document.createElement("p");
    let dishName = document.createElement("p");
    let div = document.createElement("div");
    let button = document.createElement("button");
    
    dishCard.className = "dish-card";
    figure.className = "dish_img";
    weigth.className = "weight";
    price.className = "price";
    dishName.className = "dish_name";
    
    button.textContent = "Добавить";

    figure.append(img);
    div.append(weigth);
    div.append(button);

    dishCard.append(figure);
    dishCard.append(price);
    dishCard.append(dishName);
    dishCard.append(div);

    return dishCard;
}

getAllDishes()
    .then(responseDishes => {
        dishes = responseDishes;
        responseDishes.forEach((dish) => {
            let dishCard = createDishCard();
        
            switch (dish.category) {
            case "soup":
                dishCard.setAttribute("data-dish", `${dish.keyword}`);
                dishCard.setAttribute("data-id", `${dish.id}`);
                fillDishCard(dishCard, dish);
                dishSoupsCards.append(dishCard);
                break;
        
            case "main-course":
                dishCard.setAttribute("data-dish", `${dish.keyword}`);
                dishCard.setAttribute("data-id", `${dish.id}`);
                fillDishCard(dishCard, dish);
                dishMainCards.append(dishCard);
                break;
        
            case "salad":
                dishCard.setAttribute("data-dish", `${dish.keyword}`);
                dishCard.setAttribute("data-id", `${dish.id}`);
                fillDishCard(dishCard, dish);
                dishSaladsCards.append(dishCard);
                break;
            
            case "drink":
                dishCard.setAttribute("data-dish", `${dish.keyword}`);
                dishCard.setAttribute("data-id", `${dish.id}`);
                fillDishCard(dishCard, dish);
                dishDrinksCards.append(dishCard);
                break;
        
            case "dessert":
                dishCard.setAttribute("data-dish", `${dish.keyword}`);
                dishCard.setAttribute("data-id", `${dish.id}`);
                fillDishCard(dishCard, dish);
                dishDessertsCards.append(dishCard);
                break;
            }
        });
    });

function toNumber(stringNumber) {
    let number = Number(stringNumber);
    if (!number) {
        number = 0;
    }
    return number;
};

function countPrice() {
    let chosenSoupPrice;
    let chosenDrinkPrice;
    let chosenMainPrice;
    let chosenSaladPrice;
    let chosenDessertPrice;

    let soupPrice, mainPrice, drkPrice, dsrtPrice, sldPrice;

    let price1stPart, price2ndPart, price;

    let soupPriceContent;
    let mainPriceContent;
    let drkPriceContent;
    let sldPriceContent;
    let dsrtPriceContent;
    
    if (soupChoice) {
        chosenSoupPrice = Number(soupPrice);
        soupPriceContent = (soupChoice.querySelector(".price").textContent);
        soupPrice = soupPriceContent.slice(0, -1);
    }
    
    if (mainChoice) {
        chosenMainPrice = Number(mainPrice);
        mainPriceContent = (mainChoice.querySelector(".price").textContent);
        mainPrice = mainPriceContent.slice(0, -1);
    }
    
    if (drkChoice) {
        chosenDrinkPrice = Number(drkPrice);
        drkPriceContent = (drkChoice.querySelector(".price").textContent);
        drkPrice = drkPriceContent.slice(0, -1);
    }
    
    if (dsrtChoice) {
        chosenDessertPrice = Number(dsrtPrice);
        dsrtPriceContent = (dsrtChoice.querySelector(".price").textContent);
        dsrtPrice = dsrtPriceContent.slice(0, -1);
    }
    
    if (sldChoice) {
        chosenSaladPrice = Number(sldPrice);
        sldPriceContent = (sldChoice.querySelector(".price").textContent);
        sldPrice = sldPriceContent.slice(0, -1);
    }
    
    chosenSoupPrice = toNumber(soupPrice);
    chosenMainPrice = toNumber(mainPrice);
    chosenDrinkPrice = toNumber(drkPrice);
    chosenSaladPrice = toNumber(sldPrice);
    chosenDessertPrice = toNumber(dsrtPrice);

    price1stPart = chosenDrinkPrice + chosenSoupPrice + chosenMainPrice;
    price2ndPart = chosenSaladPrice + chosenDessertPrice;

    price = String(price1stPart + price2ndPart) + "₽";

    document.querySelector(".fullPrice").textContent = price;
}

function showPanel() {
    const window = document.getElementById("goToOrder");
    window.className = "goToOrder active";
}

function chooseDish(dish) {
    const dishName = dish.querySelector(".dish_name").textContent;
    const dishPrice = dish.querySelector(".price").textContent;
    
    const value = dishName + ` ${dishPrice}`;
    const keyword = `${dish.dataset.dish}`;
    
    if (dish.parentElement.getAttribute("id") == "soupes") {
        document.getElementById("soupPlaceholder").setAttribute("value", value);
    } else if (dish.parentElement.getAttribute("id") == "main") {
        document.getElementById("mainPlaceholder").setAttribute("value", value);
    } else if (dish.parentElement.getAttribute("id") == "drinks") {
        document.getElementById("drkPlaceholder").setAttribute("value", value);
    } else if (dish.parentElement.getAttribute("id") == "salads") {
        document.getElementById("sldPlaceholder").setAttribute("value", value);
    } else if (dish.parentElement.getAttribute("id") == "desserts") {
        document.getElementById("dsrtPlaceholder").setAttribute("value", value);
    }
};

function highlightCard(target, selected) {
    if (selected) {
        selected.style.border = "2px solid white";
    }
    target.style.border = "2px solid tomato";
};

function highlightFilter(target, selected) {
    if (selected) {
        selected.style.backgroundColor = "white";
    }
    target.style.backgroundColor = "lightblue";
}

dishSoupsCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, soupChoice);
    soupChoice = dishCard;
    window.localStorage.setItem("soupId", `${dishCard.dataset.id}`);

    showPanel();
    chooseDish(dishCard);
    countPrice();
    console.log(dishes);
};

dishMainCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, mainChoice);
    mainChoice = dishCard;
    window.localStorage.setItem("mainId", `${dishCard.dataset.id}`);
    
    showPanel();
    chooseDish(dishCard);
    countPrice();
};

dishDrinksCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, drkChoice);
    drkChoice = dishCard;
    window.localStorage.setItem("drinkId", `${dishCard.dataset.id}`);
    
    showPanel();
    chooseDish(dishCard);
    countPrice();
};

dishSaladsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, sldChoice);
    sldChoice = dishCard;
    window.localStorage.setItem("saladId", `${dishCard.dataset.id}`);
    
    showPanel();
    chooseDish(dishCard);
    countPrice();
};

dishDessertsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, dsrtChoice);
    dsrtChoice = dishCard;
    window.localStorage.setItem("dessertId", `${dishCard.dataset.id}`);

    showPanel();
    chooseDish(dishCard);
    countPrice();
};

function resetFilter(selectedFilter, cards, target) {
    selectedFilter = undefined;
    cards.forEach(dishCard => {
        dishCard.style.display = "flex";
    });
    target.style.backgroundColor = "white";
}

//Фильтрация блюд
function filterDishes(cards, selectedFilter) {
    cards.forEach(dishCard => {
        const keyword = dishCard.dataset.dish;
        const dishData = dishes.find(dish => dish.keyword == keyword);

        if (dishData.kind == selectedFilter.dataset.kind) {
            dishCard.style.display = "flex";
        } else {
            dishCard.style.display = "none";
        }
    });
}

soupFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishSoupsCards.querySelectorAll(".dish-card");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive1 && (target === soupChoiceFilter)) {
        isActive1 = false;
        resetFilter(soupChoiceFilter, cards, target);
        return;
    }

    isActive1 = true;
    highlightFilter(target, soupChoiceFilter);
    soupChoiceFilter = target;
    filterDishes(cards, soupChoiceFilter);
};

mainFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishMainCards.querySelectorAll(".dish-card");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive2 && (target === mainChoiceFilter)) {
        isActive2 = false;
        resetFilter(mainChoiceFilter, cards, target);
        return;
    }

    isActive2 = true;
    highlightFilter(target, mainChoiceFilter);
    mainChoiceFilter = target;
    filterDishes(cards, mainChoiceFilter);
};

drinkFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishDrinksCards.querySelectorAll(".dish-card");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive3 && (target === drkChoiceFilter)) {
        isActive3 = false;
        resetFilter(drkChoiceFilter, cards, target);
        return;
    }

    isActive3 = true;
    highlightFilter(target, drkChoiceFilter);
    drkChoiceFilter = target;
    filterDishes(cards, drkChoiceFilter);
};

saladFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishSaladsCards.querySelectorAll(".dish-card");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive4 && (target === sldChoiceFilter)) {
        isActive4 = false;
        resetFilter(sldChoiceFilter, cards, target);
        return;
    }

    isActive4 = true;
    highlightFilter(target, sldChoiceFilter);
    sldChoiceFilter = target;
    filterDishes(cards, sldChoiceFilter);
};

dessertFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishDessertsCards.querySelectorAll(".dish-card");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive5 && (target === dsrtChoiceFilter)) {
        isActive5 = false;
        resetFilter(dsrtChoiceFilter, cards, target);
        return;
    }

    isActive5 = true;
    highlightFilter(target, dsrtChoiceFilter);
    dsrtChoiceFilter = target;
    filterDishes(cards, dsrtChoiceFilter);
};