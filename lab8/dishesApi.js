"use strict";

const address = "http://lab8-api.std-900.ist.mospolytech.ru";
const key = "?api_key=d6d50fc0-628f-4069-b854-bf25968b4cad";

export function getAllDishes() {
    let url = address + "/labs/api/dishes" + key;

    return fetch(url)
        .then(response => {
            return response.json();
        });
}

export async function getDishById(id) {
    let url = address + `/labs/api/dishes/${id}` + key;

    return await fetch(url)
        .then(response => {
            return response.json();
        });
}

export async function getAllOrders() {
    let url = address + "/labs/api/orders" + key;

    return await fetch(url)
        .then(response => {
            return response.json();
        });
}

export async function getOrderById(id) {
    let url = address + `/labs/api/orders/${id + key}`;
    
    return fetch(url)
        .then(response => {
            return response.json();
        });
}

export async function createOrder(options) {
    let url = address + "/labs/api/orders" + key;
    
    const formData = new FormData();
    for (const key in options.body) {
        formData.append(key, options.body[key]);
    }

    const requestOptions = {
        method: "POST",
        body: formData
    };

    return fetch(url, requestOptions)
        .then(response => {
            return response.json();
        });
}
export async function changeOrder(id, options) {
    let url = address + `/labs/api/orders/${id}` + key;
    
    const formData = new FormData();
    for (const key in options.body) {
        formData.append(key, options.body[key]);
    }

    const requestOptions = {
        method: "PUT",
        body: formData
    };

    return fetch(url, requestOptions)
        .then(response => {
            return response.json();
        });
}

export async function deleteOrder(id) {
    let url = address + `/labs/api/orders/${id + key}`;
    
    const options = {
        method: "DELETE"
    };
    
    return fetch(url, JSON.stringify(options))
        .then(response => {
            return response.json();
        });
}