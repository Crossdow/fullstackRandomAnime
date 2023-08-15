import {registration} from "./registration";
import {login} from "./login";
import {createRegistrationModalContent} from "./createRegistrationModal";
import {createLoginModalContent} from "./createLoginModalContent";

let isModalOpen = false;
export function welcomeNewUser() {
    alert('Поздравляю! Регистрация пройдена');
}

export function repeatMail() {
    alert('Пользователь с такой почтой уже существует');
}

export function closeModal() {
    if (isModalOpen) {
        document.getElementById("myModal").remove();
        isModalOpen = false;
    }
}

export function closeLoginModal() {
    const loginModal = document.getElementById("myModalLogin");
    loginModal.remove();
}

function openRegisterModal() {
    if (!isModalOpen) {
        isModalOpen = true;

        let modalContainer = document.createElement('div');
        modalContainer.className = 'modal';
        modalContainer.id = 'myModal';

        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        createRegistrationModalContent(modalContent);

        document.body.append(modalContainer);
        modalContainer.append(modalContent);
        const modal = document.getElementById("myModal");
        modal.style.display = "block";

        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };

        /*РЕГИСТРАЦИЯ*/
        const form = document.getElementById("register-form");
        form.addEventListener("submit", registration);
    }
}

function openLoginModal() {
    closeModal();
    let modalLoginContainer = document.createElement('div');
    modalLoginContainer.className = 'modalLogin';
    modalLoginContainer.id = 'myModalLogin';

    let modalLoginContent = document.createElement('div');
    modalLoginContent.className = 'modal_login-content';

    createLoginModalContent(modalLoginContent);

    document.body.append(modalLoginContainer);
    modalLoginContainer.append(modalLoginContent);
    const myLoginModal = document.getElementById("myModalLogin");
    myLoginModal.style.display = "block";

    myLoginModal.onclick = function(event) {
        if (event.target === myLoginModal) {
            closeLoginModal();
        }
    };

    /*Вход*/
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", login);
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('#login')) {
        openLoginModal();
    } else if (target.matches('#openModalWindow')) {
        openRegisterModal();
    } else if (target.matches('#closeModalWindow')) {
        closeModal();
    }
});

