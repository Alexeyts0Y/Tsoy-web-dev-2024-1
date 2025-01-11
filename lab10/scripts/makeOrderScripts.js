"use strict";

import { getDishById, createOrder } from "../scripts/dishesApi.js";

const modal = document.getElementById("modal");

let soupChoice = window.localStorage.getItem("soupId");
let mainChoice = window.localStorage.getItem("mainId");
let drkChoice = window.localStorage.getItem("drinkId");
let sldChoice = window.localStorage.getItem("saladId");
let dsrtChoice = window.localStorage.getItem("dessertId");

const dishCards = document.getElementById("dish-block");

const resetButton = document.getElementById("reset");
let dishes = [];

function toNumber(stringNumber) {
    let number = Number(stringNumber);
    if (!number) {
        number = 0;
    }
    return number;
};

function chooseDish(dish, mode) {
    const dishName = dish.querySelector(".dish_name").textContent;
    const dishPrice = dish.querySelector(".price").textContent;
    
    const value = dishName + ` ${dishPrice}`;
    const keyword = `${dish.dataset.dish}`;
    if (mode) {
        switch (dish.dataset.category) {
        case "soup":
            document.getElementById("soupPlaceholder")
                .setAttribute("value", value);
            document.getElementById("soup_id")
                .setAttribute("value", window.localStorage.getItem("soupId"));
            break;
        case "main-course":
            document.getElementById("mainPlaceholder")
                .setAttribute("value", value);
            document.getElementById("main_course_id")
                .setAttribute("value", window.localStorage.getItem("mainId"));
            break;
        case "drink":
            document.getElementById("drkPlaceholder")
                .setAttribute("value", value);
            document.getElementById("drink_id")
                .setAttribute("value", window.localStorage.getItem("drinkId"));
            break;
        case "salad":
            document.getElementById("sldPlaceholder")
                .setAttribute("value", value);
            document.getElementById("salad_id")
                .setAttribute("value", window.localStorage.getItem("saladId"));
            break;
        case "dessert":
            document.getElementById("dsrtPlaceholder")
                .setAttribute("value", value);
            document.getElementById("dessert_id")
                .setAttribute("value", window.localStorage
                    .getItem("dessertId"));
            break;
        }
        return;
    }
    switch (dish.dataset.category) {
    case "soup":
        document.getElementById("soupPlaceholder")
            .setAttribute("value", "");
        document.getElementById("soupChoice")
            .setAttribute("value", "");
        break;
    case "main-course":
        document.getElementById("mainPlaceholder")
            .setAttribute("value", "");
        document.getElementById("mainChoice")
            .setAttribute("value", "");
        break;
    case "drink":
        document.getElementById("drkPlaceholder")
            .setAttribute("value", "");
        document.getElementById("drinkChoice")
            .setAttribute("value", "");
        break;
    case "salad":
        document.getElementById("sldPlaceholder")
            .setAttribute("value", "");
        document.getElementById("saladChoice")
            .setAttribute("value", "");
        break;
    case "dessert":
        document.getElementById("dsrtPlaceholder")
            .setAttribute("value", "");
        document.getElementById("dessertChoice")
            .setAttribute("value", "");
        break;
    }
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
    
    button.textContent = "Удалить";

    figure.append(img);
    div.append(weigth);
    div.append(button);

    dishCard.append(figure);
    dishCard.append(price);
    dishCard.append(dishName);
    dishCard.append(div);

    return dishCard;
}

const localStorageSize = window.localStorage.length;

function displayNothingChosen() {
    if (dishes.length) {
        document.querySelector(".nothingChosenLabel1")
            .style.display = "none";
        document.querySelector(".nothingChosenLabel2")
            .style.display = "none";
        return;
    }
    document.querySelector(".nothingChosenLabel1").style.display = "inline";
    document.querySelector(".nothingChosenLabel2").style.display = "inline";
}

function renderDishes(arr) {
    displayNothingChosen();
    dishCards.innerHTML = "";
    dishes.forEach((dish) => {
        let dishCard = createDishCard();
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        dishCard.setAttribute("data-id", `${dish.id}`);
        dishCard.setAttribute("data-category", `${dish.category}`);
        fillDishCard(dishCard, dish);
        dishCards.append(dishCard);
        if (dish.category == "soup") {
            soupChoice = dishCard;
        } else if (dish.category == "main-course") {
            mainChoice = dishCard;
        } else if (dish.category == "drink") {
            drkChoice = dishCard;
        } else if (dish.category == "salad") {
            sldChoice = dishCard;
        } else if (dish.category == "dessert") {
            dsrtChoice = dishCard;
        }
        chooseDish(dishCard, true);
    });
    countPrice();
}

function removeDishData(category) {
    for (let i = 0; i < dishes.length; i++) {
        if (dishes[i].category == category) {
            dishes.splice(i, 1);
        }
    }
}

console.log(window.localStorage);

const promises = [];

for (let i = 0; i < localStorageSize; i++) {
    let key = window.localStorage.key(i);
    let id = window.localStorage.getItem(key);
    if (id == "" || !Number(id)) continue;    
    promises.push(getDishById(id).then(data => {
        dishes.push(data);
    }));
}

Promise.all(promises).then(() => {
    renderDishes();
});

function removeDishCard(dishCard) {
    switch (dishCard.dataset.category) {
    
    case "soup":
        window.localStorage.removeItem("soupId");
        removeDishData("soup");
        soupChoice = undefined;
        break;

    case "main-course":
        window.localStorage.removeItem("mainId");
        removeDishData("main-course");
        mainChoice = undefined;
        break;

    case "salad":
        window.localStorage.removeItem("saladId");
        removeDishData("salad");
        sldChoice = undefined;
        break;

    case "drink":
        window.localStorage.removeItem("drinkId");
        removeDishData("drink");
        drkChoice = undefined;
        break;

    case "dessert":
        window.localStorage.removeItem("dessertId");
        removeDishData("dessert");
        dsrtChoice = undefined;
        break;
    }
}

dishCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;

    removeDishCard(dishCard);
    renderDishes();
    chooseDish(dishCard, false);
    countPrice();
};

function resetAll() {
    document.getElementById("soupPlaceholder").value = "";
    document.getElementById("mainPlaceholder").value = "";
    document.getElementById("sldPlaceholder").value = "";
    document.getElementById("drkPlaceholder").value = "";
    document.getElementById("comment").textContent = "";
    
    document.getElementById("full_name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("delivery_time").value = "";
    document.getElementById("delivery_address").value = "";

    soupChoice = undefined;
    mainChoice = undefined;
    drkChoice = undefined;
    sldChoice = undefined;
    dsrtChoice = undefined;
    window.localStorage.clear();
    dishes = [];
}

resetButton.onclick = function() {
    soupChoice = undefined;
    mainChoice = undefined;
    drkChoice = undefined;
    sldChoice = undefined;
    dsrtChoice = undefined;
    resetAll();
    renderDishes();
    countPrice();
};

function displayModal(text) {
    const window = document.getElementById("window");
    const p = window.querySelector(".text");
    
    p.textContent = text;
    modal.className = "modal active";
}

document.querySelector(".orderForm")
    .addEventListener("submit", async function(e) {
        e.preventDefault();

        const soupChoice = window.localStorage.getItem("soupId");
        const mainChoice = window.localStorage.getItem("mainId");
        const drkChoice = window.localStorage.getItem("drinkId");
        const sldChoice = window.localStorage.getItem("saladId");
        const dsrtChoice = window.localStorage.getItem("dessertId");

        if (!soupChoice && !mainChoice && !sldChoice && 
            !drkChoice && !dsrtChoice) {
            displayModal("Ничего не выбрано. Выберите блюда для заказа");
            return false;
        } else if ((soupChoice || mainChoice || sldChoice) && !drkChoice) {
            displayModal("Выберите напиток");
            return false;
        } else if (soupChoice && !mainChoice && !sldChoice) {
            displayModal("Выберите главное блюдо/салат/стартер");
            return false;
        } else if (sldChoice && !soupChoice && !mainChoice) {
            displayModal("Выберите суп или главное блюдо");
            return false;
        } else if ((drkChoice || dsrtChoice) && !soupChoice && 
        !mainChoice && !sldChoice) {
            displayModal("Выберите главное блюдо");
            return false;
        }

        const formData = new FormData(this);
        const response = await createOrder({
            body: formData
        });
        if (!response.ok) {
            throw new Error("Error creating order");
        }
        resetAll();
        renderDishes();
    });

const okayBtn = document.querySelector(".okayBtn");
okayBtn.onclick = function() {
    modal.className = "modal";
};