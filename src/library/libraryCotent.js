import {showAnimeLib} from "./showAnimeLib";
import {getTokenFromLocalStorage} from "../mainApp";

const token = getTokenFromLocalStorage();

export function displayLibraryContent() {
    if (!document.querySelector('.newMain')) {
        const navbarMenu = document.querySelector('.navbar__menu');

        const library = navbarMenu.querySelector('#library');
        library.remove();

        const div = document.createElement('div');
        div.classList.add('return');
        div.innerHTML =
            `
            <button id="return" class="return_btn">
                <span class="text">
                    Назад
                </span>
            </button>           
        `

        navbarMenu.prepend(div);

        const returnButton = document.querySelector('#return');
        returnButton.addEventListener('click', () => {
            location.reload();
        })

        const main = document.querySelector('.main');
        main.classList.remove('main');
        main.classList.add('newMain');
        main.innerHTML = '';

        const container = document.createElement('div');
        container.classList.add('newContainer');
        main.append(container);

        container.innerHTML = `
        <div class="favourites"></div>
        `;

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;
                showAnimeLib(userId).catch(error => {
                    console.error("Ошибка показа библиотеки", error);
                });
            } catch (error) {
                console.error('Ошибка раскодировки токена или выполнения запроса', error);
            }
        }
    }
}