"use strict"
import { dishes } from "./db.js";

let selectedSoup;
let selectedMain;
let selectedDrink;

const dishSoupsCards = document.getElementById("soupes");
const dishMainCards = document.getElementById("main");
const dishDrinksCards = document.getElementById("drinks");

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
    button.textContent = "Добавить";
    weigth.className = "weight";
    price.className = "price";
    dishName.className = "dish_name";


    figure.append(img);
    div.append(weigth);
    div.append(button);

    dishCard.append(figure);
    dishCard.append(price);
    dishCard.append(dishName);
    dishCard.append(div);

    return dishCard;
}

dishes.forEach((dish) => {
    let dishCard = createDishCard();

    switch (dish.category) {
    case "soups":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishSoupsCards.append(dishCard);
        break;

    case "mainCourse":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishMainCards.append(dishCard);
        break;
    
    case "beverages":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishDrinksCards.append(dishCard);
        break;
    }
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

    let soupPrice, mainPrice, drkPrice;

    let price1stPart, price;

    let soupPriceContent;
    let mainPriceContent;
    let drkPriceContent;
    
    if (selectedSoup) {
        chosenSoupPrice = Number(soupPrice);
        soupPriceContent = (selectedSoup.querySelector(".price").textContent);
        soupPrice = soupPriceContent.slice(0, -1);
    }
    
    if (selectedMain) {
        chosenMainPrice = Number(mainPrice);
        mainPriceContent = (selectedMain.querySelector(".price").textContent);
        mainPrice = mainPriceContent.slice(0, -1);
    }
    
    if (selectedDrink) {
        chosenDrinkPrice = Number(drkPrice);
        drkPriceContent = (selectedDrink.querySelector(".price").textContent);
        drkPrice = drkPriceContent.slice(0, -1);
    }
    
    chosenSoupPrice = toNumber(soupPrice);
    chosenMainPrice = toNumber(mainPrice);
    chosenDrinkPrice = toNumber(drkPrice);

    price1stPart = chosenDrinkPrice + chosenSoupPrice + chosenMainPrice;

    price = String(price1stPart) + "₽";

    document.querySelector(".fullPrice").textContent = price;
}

function showOrder() {
    document.querySelector(".nothingChosenLabel").style.display = "none";
    const chosenDishes = document.querySelector(".chosenDishes");
    chosenDishes.style.display = "flex";
}

function chooseDish(dish) {
    const dishName = dish.querySelector(".dish_name").textContent;
    const dishPrice = dish.querySelector(".price").textContent;
    
    const value = dishName + ` ${dishPrice}`;

    if (dish.parentElement.getAttribute("id") == "soupes") {
        document.getElementById("soupChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "main") {
        document.getElementById("mainDishChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "drinks") {
        document.getElementById("drinkChoice").value = value;
    }
}

function highlight(target, selected) {
    if (selected) {
        selected.style.border = "2px solid white";
    }
    target.style.border = "2px solid tomato";
}

dishSoupsCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;
    highlight(dishCard, selectedSoup);
    selectedSoup = dishCard;

    showOrder();
    chooseDish(dishCard);
    countPrice();
};

dishMainCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;
    highlight(dishCard, selectedMain);
    selectedMain = dishCard;

    showOrder();
    chooseDish(dishCard);
    countPrice();
};

dishDrinksCards.onclick = function(event) {
    let target = event.target;

    if (target.tagName != "BUTTON") return;

    const dishCard = target.parentElement.parentElement;
    highlight(dishCard, selectedDrink);
    selectedDrink = dishCard;

    showOrder();
    chooseDish(dishCard);
    countPrice();
};