'use strict'
import './mainStyles.css';
import 'normalize.css';
import {displayExitButton} from "./modalWindow/displayExitButton";

export function getTokenFromLocalStorage() {
    return localStorage.getItem('userToken');
}

function checkAuthorization() {
    const token = getTokenFromLocalStorage();

    if (token) {
        displayExitButton();
    }
}

checkAuthorization();

