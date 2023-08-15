import {displayExitButton} from "./displayExitButton";
import {welcomeNewUser, repeatMail} from "./modalWindow";

export async function registration(event) {
    event.preventDefault();

    const form = document.getElementById("register-form");
    const formData = new FormData(form);

    const login = formData.get("login");
    const password = formData.get("password");
    const passwordRepeat = formData.get("password-repeat");

    if (password !== passwordRepeat) {
        alert('Введите одинаковые пароли');
        return;
    }

    const userData = {
        login: login,
        password: password,
    };

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const newUser = await response.json();
            const userToken = newUser.token;

            localStorage.setItem("userToken", userToken);

            welcomeNewUser();
            displayExitButton(newUser.login);
            location.reload();
        } else if (response.status === 400) {
            const errorData = await response.json();
            console.error("Ошибка при регистрации:", errorData.error);
            repeatMail();
        } else {
            const errorData = await response.json();
            console.error("Ошибка при регистрации:", errorData.error);
        }
    } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
    }
}