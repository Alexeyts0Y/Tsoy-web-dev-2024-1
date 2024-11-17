"use strict";

const soupChoice = document.getElementById("soupChoice");
const mainDishChoice = document.getElementById("mainDishChoice");
const sldChoice = document.getElementById("saladChoice");
const drkChoice = document.getElementById("drinkChoice");
const dsrtChoice = document.getElementById("dessertChoice");

const modal = document.getElementById("modal");

// function createAlertMessage(text) {
//     let div = document.createElement("div");
//     let message = document.createElement("p");
//     let button = document.createElement("button");

//     button.className("okayBtn");
//     message.textContent(text);
//     button.innerHTML("Окей &#128076;");

//     div.append(message);
//     div.append(button);

//     return div;
// }

function displayModal(text) {
    const window = document.getElementById("window");
    const p = window.querySelector(".text");
    
    p.textContent = text;
    modal.className = "modal active";
}

document.querySelector(".orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!soupChoice && !mainDishChoice && !sldChoice && !drkChoice) {
        displayModal("Ничего не выбрано. Выберите блюда для заказа");
        return false;
    } else if (soupChoice && mainDishChoice && sldChoice && !drkChoice) {
        displayModal("Выберите напиток");
        return false;
    } else if (soupChoice && !mainDishChoice) {
        displayModal("Выберите главное блюдо/салат/стартер");
        return false;
    } else if (sldChoice && (!mainDishChoice || !soupChoice)) {
        displayModal("Выберите суп или главное блюдо");
        return false;
    } else if (drkChoice || dsrtChoice) {
        displayModal("Выберите главное блюдо");
        return false;
    }

    return true;
});

const okayBtn = document.querySelector(".okayBtn");

okayBtn.onclick = function() {
    modal.className = "modal";
};