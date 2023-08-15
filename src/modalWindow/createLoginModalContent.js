export function createLoginModalContent(elem) {
    elem.innerHTML =
        `
        <div class="container">
            <h1 class="text">Вход</h1>
            <p class="text">Пожалуйста, заполните поля для входа в аккаунт</p>
            <hr>
            <form id="login-form">
                <label for="login"><b class="text">Логин</b></label>
                <input type="text" placeholder="Введите логин" name="login" required>

                <label for="psw"><b class="text">Пароль</b></label>
                <input type="password" placeholder="Введите пароль" name="password" required>
                
                <button id="log" type="submit" class="login-btn">
                    <span class="text">Войти</span>
                </button>                
            </form>
            <hr>            
        </div>
        `
    ;
}