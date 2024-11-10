import { dishes } from "./db.js";

let selectedSoupFilter;
let selectedMainFilter;
let selectedDrinkFilter;
let selectedSaladFilter;
let selectedDessertFilter;

let selectedSoup;
let selectedMain;
let selectedDrink;
let selectedSalad;
let selectedDsrt;

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

const resetButton = document.getElementById("reset");

const dishCards = document.querySelectorAll(".dish-card");
const dishFilters = document.querySelectorAll(".filterButton");

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

    case "salads":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishSaladsCards.append(dishCard);
        break;
    
    case "beverages":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishDrinksCards.append(dishCard);
        break;

    case "desserts":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishSaladsCards.append(dishCard);
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
    let chosenSaladPrice;
    let chosenDessertPrice;

    let soupPrice, mainPrice, drkPrice, dsrtPrice, sldPrice;

    let price1stPart, price2ndPart, price;

    let soupPriceContent;
    let mainPriceContent;
    let drkPriceContent;
    let sldPriceContent;
    let dsrtPriceContent;
    
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
    
    if (selectedDsrt) {
        chosenDessertPrice = Number(dsrtPrice);
        dsrtPriceContent = (selectedDsrt.querySelector(".price").textContent);
        dsrtPrice = dsrtPriceContent.slice(0, -1);
    }
    
    if (selectedSalad) {
        chosenSaladPrice = Number(sldPrice);
        sldPriceContent = (selectedSalad.querySelector(".price").textContent);
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

function showOrder(param) {
    if (param) {
        document.querySelector(".nothingChosenLabel").style.display = "none";
        const chosenDishes = document.querySelector(".chosenDishes");
        chosenDishes.style.display = "flex";
        return;
    }
    document.querySelector(".nothingChosenLabel").style.display = "inline";
    const chosenDishes = document.querySelector(".chosenDishes");
    chosenDishes.style.display = "none";    
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
    } else if (dish.parentElement.getAttribute("id") == "salads") {
        document.getElementById("saladChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "desserts") {
        document.getElementById("dessertChoice").value = value;
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
    highlightCard(dishCard, selectedSoup);
    selectedSoup = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishMainCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedMain);
    selectedMain = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishDrinksCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedDrink);
    selectedDrink = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishSaladsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedSalad);
    selectedSalad = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishDessertsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedDsrt);
    selectedDsrt = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

resetButton.onclick = function() {
    dishCards.forEach(dishcard => {
        dishcard.style.border = "2px solid white";
        dishcard.style.display = "block";
    });

    dishFilters.forEach(button => {
        button.style.backgroundColor = "white";
    });


    selectedSoup = undefined;
    selectedMain = undefined;
    selectedDrink = undefined;
    selectedSalad = undefined;
    selectedDsrt = undefined;

    selectedSoupFilter = undefined;
    selectedMainFilter = undefined;
    selectedDrinkFilter = undefined;
    selectedSaladFilter = undefined;
    selectedDessertFilter = undefined;

    countPrice();
    showOrder(false);
};

//Фильтрация блюд
function filterDishes(cards, selectedFilter) {
    cards.forEach(dishCard => {
        const keyword = dishCard.dataset.dish;
        const dishData = dishes.find(dish => dish.keyword == keyword);

        if (dishData.kind == selectedFilter.dataset.kind) {
            dishCard.style.display = "block";
        } else {
            dishCard.style.display = "none";
        }
    });
}

soupFilters.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;

    highlightFilter(target, selectedSoupFilter);
    selectedSoupFilter = target;
    let cards = dishSoupsCards.querySelectorAll(".dish-card");
    filterDishes(cards, selectedSoupFilter);
};

mainFilters.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;

    highlightFilter(target, selectedMainFilter);
    selectedMainFilter = target;
    let cards = dishMainCards.querySelectorAll(".dish-card");
    filterDishes(cards, selectedMainFilter);
};

drinkFilters.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;

    highlightFilter(target, selectedDrinkFilter);
    selectedDrinkFilter = target;
    let cards = dishDrinksCards.querySelectorAll(".dish-card");
    filterDishes(cards, selectedDrinkFilter);
};

saladFilters.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;

    highlightFilter(target, selectedSaladFilter);
    selectedSaladFilter = target;
    let cards = dishSaladsCards.querySelectorAll(".dish-card");
    filterDishes(cards, selectedSaladFilter);
};

dessertFilters.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;

    highlightFilter(target, selectedDessertFilter);
    selectedDessertFilter = target;
    let cards = dishDessertsCards.querySelectorAll(".dish-card");
    filterDishes(cards, selectedDessertFilter);
};