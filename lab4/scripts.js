import { dishes } from "./db.js"

let selectedSoup;
let selectedMain;
let selectedDrink;

function fillDishCard(dishCard, dishData) {
    dishCard.querySelector(".dish_img img").src = dishData.image;
    dishCard.querySelector(".dish_img img").alt = dishData.name;
    dishCard.querySelector(".price").textContent = `${dishData.price}₽`;
    dishCard.querySelector(".dish_name").textContent = dishData.name;
    dishCard.querySelector(".weight").textContent = dishData.count;
}

const dishCards = document.querySelectorAll(".dish-card");

dishCards.forEach(dishCard => {
    const keyword = dishCard.getAttribute("data-dish");
    const dishData = dishes.find(dish => dish.keyword == keyword);
    
    if (dishData) {
        fillDishCard(dishCard, dishData);
    }
});

const dishSoupCards = document.getElementById("soupes")
const dishMainCards = document.getElementById("main")
const dishDrinksCards = document.getElementById("drinks")

function toNumber(number) {
    if(!number) {
        number = 0;
    }
    return number
}

function countPrice() {
    let selectedSoupPrice, selectedDrinkPrice, selectedMainPrice

    if(selectedSoup) {
        selectedSoupPrice = Number((selectedSoup.querySelector(".price").textContent).slice(0, -1))
    }

    if(selectedMain) {
        selectedMainPrice = Number((selectedMain.querySelector(".price").textContent).slice(0, -1))
    }

    if(selectedDrink) {
        selectedDrinkPrice = Number((selectedDrink.querySelector(".price").textContent).slice(0, -1))
    }

    document.querySelector(".fullPrice").textContent = String(toNumber(selectedSoupPrice) + toNumber(selectedDrinkPrice) + toNumber(selectedMainPrice) + "₽")
}

function showOrder() {
    document.querySelector(".nothingChosenLabel").style.display = "none";
    const chosenDishes = document.querySelector(".chosenDishes")
    chosenDishes.style.display = "flex";
}

function chooseDish(dish) {
    const dishName = dish.querySelector(".dish_name").textContent
    const dishPrice = dish.querySelector(".price").textContent
    if(dish.parentElement.getAttribute("id") == "soupes") {
        document.getElementById("soupChoice").value = dishName + ` ${dishPrice}`;
    } else if(dish.parentElement.getAttribute("id") == "main") {
        document.getElementById("mainDishChoice").value = dishName + ` ${dishPrice}`;
    } else if(dish.parentElement.getAttribute("id") == "drinks") {
        document.getElementById("drinkChoice").value = dishName + ` ${dishPrice}`;
    }
}

function highlight(target, selected) {
    if (selected) {
        selected.style.border = "2px solid white"
    }
    target.style.border = "2px solid tomato"
}

dishSoupCards.onclick = function(event) {
    let target = event.target
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement
    highlight(dishCard, selectedSoup)
    selectedSoup = dishCard

    showOrder()
    chooseDish(dishCard)
    countPrice()
};

dishMainCards.onclick = function(event) {
    let target = event.target
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement
    highlight(dishCard, selectedMain)
    selectedMain = dishCard

    showOrder()
    chooseDish(dishCard)
    countPrice()
}

dishDrinksCards.onclick = function(event) {
    let target = event.target

    if (target.tagName != "BUTTON") return;

    const dishCard = target.parentElement.parentElement
    highlight(dishCard, selectedDrink)
    selectedDrink = dishCard

    showOrder()
    chooseDish(dishCard)
    countPrice()
};