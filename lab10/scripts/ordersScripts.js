"use strict";

import { getAllOrders } from "../scripts/dishesApi.js";
import { getDishById } from "../scripts/dishesApi.js";
import { getOrderById } from "../scripts/dishesApi.js";
import { changeOrder } from "../scripts/dishesApi.js";
import { deleteOrder } from "../scripts/dishesApi.js";

const ordersContainer = document.querySelector(".ordersContainer");
const closeBtn = document.querySelector(".closeBtn");
const okayBtn = document.querySelector(".okayBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const saveBtn = document.querySelector(".saveBtn");
const yesBtn = document.querySelector(".yesBtn");

function createElement(tag, classname) {
    let elem = document.createElement(tag);
    elem.className = classname;
    return elem;
}

async function getOrderDishes(order) {
    const promises = [];
    const dishIds = [
        order.soup_id,
        order.main_course_id, 
        order.salad_id, 
        order.drink_id, 
        order.dessert_id
    ];
    for (let id of dishIds) {
        if (!id) continue;
        promises.push(getDishById(id));
    }
    const dishes = await Promise.all(promises);
    return dishes;
}

async function countPrice(dishes) {
    let totalPrice = 0;
    for (const dish of dishes) {
        totalPrice += dish.price;
    }
    return totalPrice;
}

async function createAndFillOrderElement(order, index) { //correct
    const orderElement = createElement("div", "order");
    const date = new Date(order.created_at).toLocaleDateString();

    const orderDishes = await getOrderDishes(order); // Correct
    const totalPrice = await countPrice(orderDishes); // Correct
    
    orderElement.setAttribute("data-id", order.id);
    orderElement.innerHTML = `
        <p class="number">${index + 1}</p>
        <p class="date">${date}</p>
        <div class="compound">
            ${orderDishes.map(dish => dish.name).join(', ')}
        </div>
        <p class="price">${totalPrice}₽</p>
        <div class="time">${order.delivery_time}</div>
        <div class="actions">
            <button class="detailsBtn">
                <img src="../img/icons/details.png" alt="">
            </button>
            <button class="editBtn">
                <img src="../img/icons/edit.png" alt="">
            </button>
            <button class="deleteBtn">
                <img src="../img/icons/delete.png" alt="">
            </button>
        </div>
    `;
    return orderElement;
}

async function displayAllOrders() {
    const orders = await getAllOrders();
    const ordersContainer = document.querySelector(".ordersContainer");
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    ordersContainer.innerHTML = "";

    for (const [index, order] of orders.entries()) {
        const orderElement = await createAndFillOrderElement(order, index);
        ordersContainer.append(orderElement);
    }
}

displayAllOrders();

const modal = document.getElementById("modal");
function displayModal() {
    modal.classList.toggle("active");
}


function createDishList(dishes) {
    const dishList = createElement("div", "dishList");
    
    for (let dish of dishes) {
        const label = document.createElement("p");
        const value = document.createElement("p");
        if (dish.category == "soup") {
            label.textContent = "Суп";
        } else if (dish.category == "main-course") {
            label.textContent = "Основное блюдо";
        } else if (dish.category == "salad") {
            label.textContent = "Салат или стартер";
        } else if (dish.category == "drink") {
            label.textContent = "Напиток";
        } else if (dish.category == "dessert") {
            label.textContent = "Десерт";
        }
        value.innerHTML = `${dish.name} (${dish.price}₽)`;
        dishList.append(label);
        dishList.append(value);
    }
    return dishList;
}

async function createAndDisplayDetails(orderId) {
    const orderElement = document.getElementById("content");
    const form = document.getElementById("changeData");
    const confirmDeleting = document.getElementById("confirmDeleting");
    const order = await getOrderById(orderId);
    const orderDishes = await getOrderDishes(order); // Correct
    const totalPrice = await countPrice(orderDishes); // Correct
    const dishList = await createDishList(orderDishes);
    const date = new Date(order.created_at).toLocaleDateString();
    const labelTop = document.querySelector(".labelHead");
    const bottomBtns = document.querySelector(".labelBottom");
    
    orderElement.style.display = "grid";
    form.style.display = "none";
    confirmDeleting.style.display = "none";
    
    labelTop.querySelector("h2").textContent = "Просмотр заказа";
    bottomBtns.querySelector(".okayBtn").style.display = "block";
    bottomBtns.querySelector(".cancelBtn").style.display = "none";
    bottomBtns.querySelector(".saveBtn").style.display = "none";
    bottomBtns.querySelector(".yesBtn").style.display = "none";

    orderElement.innerHTML = "";
    orderElement.innerHTML = `
        <p class="dateOfIssue">Дата оформления</p>
        <p class="dateVal">${date}</p>
        <h3 class="deliveryLabel">Доставка</h3>
        <div class="deliveryData">
            <p class="fullName">Имя получателя</p>
            <p class="fullNameVal">${order.full_name}</p>
            <p class="deliveryAddress">Адрес доставки</p>
            <p class="deliveryAddressVal">${order.delivery_address}</p>
            <p class="deliveryTime">Время доставки</p>
            <p class="deliveryTimeVal">${order.delivery_time}</p>
            <p class="phone">Телефон</p>
            <p class="phoneVal">${order.phone}</p>
            <p class="email">Email</p>
            <p class="emailVal">${order.email}</p>
        </div>
        <h3 class="comment">Комментарий</h3>
        <div class="commentVal">${order.comment}</div>
        <h3 class="compound">Состав заказа</h3>
        <h3 class="totalPrice">Стоимость: ${totalPrice}₽</h3>
    `;
    orderElement.querySelector(".compound").after(dishList);
}

async function createAndDisplayChangeWindow(orderId) {
    const elem = document.getElementById("content");
    const form = document.getElementById("changeData");
    const confirmDeleting = document.getElementById("confirmDeleting");
    const order = await getOrderById(orderId);
    const orderDishes = await getOrderDishes(order); // Correct
    const totalPrice = await countPrice(orderDishes); // Correct
    const dishList = await createDishList(orderDishes);
    const date = new Date(order.created_at).toLocaleDateString();
    const labelTop = document.querySelector(".labelHead");
    const bottomBtns = document.querySelector(".labelBottom");
    
    form.style.display = "grid";
    elem.style.display = "none";
    confirmDeleting.style.display = "none";

    labelTop.querySelector("h2").textContent = "Редактирование заказа";
    bottomBtns.querySelector(".okayBtn").style.display = "none";
    bottomBtns.querySelector(".cancelBtn").style.display = "block";
    bottomBtns.querySelector(".saveBtn").style.display = "block";
    bottomBtns.querySelector(".yesBtn").style.display = "none";

    form.setAttribute("data-orderid", orderId);
    form.innerHTML = "";
    form.innerHTML = `
        <p class="dateOfIssue">Дата оформления</p>
        <p class="dateVal">${date}</p>
        <h3 class="delivery">Доставка</h3>
        <label for="full_name" class="fullName">Имя получателя</label>
        <input type="text" name="full_name" id="fullName"
            class="fullNameVal" 
            value="${order.full_name}"
        >
        <label for="delivery_address" class="deliveryAddress">Адрес доставки
        </label>
        <input type="text" name="delivery_address" id="deliveryAddress"
            class="deliveryAddressVal"
            value="${order.delivery_address}"    
        >
        <label for="delivery_time" class="deliveryTime">Время доставки
        </label>
        <input type="time" name="delivery_time" id="deliveryTime" 
            class="deliveryTimeVal"
            value="${order.delivery_time}"
        >
        <label for="phone" class="phone">Телефон</label>
        <input type="tel" name="phone" id="phone"
            class="phoneVal"
            value="${order.phone}"
        >
        <label for="email" class="email">Email</label>
        <input type="email" name="email" id="email"
            class="emailVal"
            value="${order.email}"
        >
        <label for="comment" class="comment">Комментарий</label>
        <textarea name="comment" id="comment" class="commentVal">
            ${order.comment}
        </textarea>
        <h3 class="compound">Состав заказа</h3>
        <h3 class="totalPrice">Стоимость: ${totalPrice}₽</h3>
    `;
    form.querySelector(".compound").after(dishList);
}

async function createAndDisplayQuestion(orderId) {
    const orderElement = document.getElementById("content");
    const form = document.getElementById("changeData");
    const confirmDeleting = document.getElementById("confirmDeleting");
    const labelTop = document.querySelector(".labelHead");
    const bottomBtns = document.querySelector(".labelBottom");
    
    orderElement.style.display = "none";
    form.style.display = "none";
    confirmDeleting.style.display = "block";
    
    labelTop.querySelector("h2").textContent = "Просмотр заказа";
    bottomBtns.querySelector(".okayBtn").style.display = "none";
    bottomBtns.querySelector(".cancelBtn").style.display = "block";
    bottomBtns.querySelector(".saveBtn").style.display = "none";
    bottomBtns.querySelector(".yesBtn").style.display = "";

    confirmDeleting.innerHTML = "";
    confirmDeleting.innerHTML = `
        <div class="question" data-orderid="${orderId}">
            Вы уверены что хотите удалить заказ?
        </div>
    `;
}

ordersContainer.onclick = async function(e) {
    let target = e.target;
    if (target.tagName == "IMG") {
        target = target.parentElement;
    }
    const order = target.parentElement.parentElement;

    if (target.classList.contains("detailsBtn")) {
        await createAndDisplayDetails(order.dataset.id);
        displayModal();
    } else if (target.className == "editBtn") {
        await createAndDisplayChangeWindow(order.dataset.id);
        displayModal();
    } else if (target.className == "deleteBtn") {
        await createAndDisplayQuestion(order.dataset.id);
        displayModal();
    }
};

closeBtn.onclick = function() {
    displayModal();
};

okayBtn.onclick = function() {
    displayModal();
};

cancelBtn.onclick = function() {
    displayModal();
};

saveBtn.onclick = async function() {
    const form = document.getElementById("changeData");
    let formData = new FormData(form);

    await changeOrder(form.dataset.orderid, {
        body: formData
    });
    displayModal();
    displayAllOrders();
};

yesBtn.onclick = async function () {
    const question = document.querySelector(".question");
    await deleteOrder(question.dataset.orderid);
    displayModal();
    displayAllOrders();
};