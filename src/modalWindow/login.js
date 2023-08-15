import {displayExitButton} from "./displayExitButton";

export async function login(event) {
    event.preventDefault();

    const loginForm = document.getElementById("login-form");
    const loginFormData = new FormData(loginForm);
    const userData = {
        login: loginFormData.get("login"),
        password: loginFormData.get("password"),
    };

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const userToken = data.token;

            localStorage.setItem("userToken", userToken);

            displayExitButton(userData.login);
            location.reload();
        } else {
            const errorData = await response.json();
            console.error("Ошибка при входе:", errorData.error);
        }
    } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
    }
}