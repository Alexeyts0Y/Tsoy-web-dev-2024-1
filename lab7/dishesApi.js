"use strict";

export function loadDishes(url) {
    return fetch(url)
        .then(response => {
            return response.json();
        });
}

// loadDishes()
//     .then(data => console.log(data));

// export const dishes = responseData;