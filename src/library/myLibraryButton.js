import {getTokenFromLocalStorage} from "../mainApp";
import {displayLibraryContent} from "./libraryCotent";

const libraryButton = document.querySelector('#library');

libraryButton.addEventListener('click', () => {
    if (!document.querySelector('.newMain')) {
        const token = getTokenFromLocalStorage();

        if (token) {
            displayLibraryContent();
        } else {
            alert('Вы не вошли в аккаунт');
        }
    }
})



