export function createRegistrationModalContent(elem) {
    elem.innerHTML =
        `
            <div class="container">
                <h1 class="text">Регистрация</h1>
                <p class="text">Пожалуйста, заполните поля для создания аккаунта</p>
                <hr>
                <form id="register-form">
                    <label for="login"><b class="text">Логин</b></label>
                    <input type="text" placeholder="Введите логин" name="login" required>

                    <label for="psw"><b class="text">Пароль</b></label>
                    <input type="password" placeholder="Введите пароль" name="password" required>

                    <label for="psw-repeat"><b class="text">Повторите пароль</b></label>
                    <input type="password" placeholder="Повторите пароль" name="password-repeat" required>
                    
                    <button id="reg" type="submit" class="register-btn">
                        <span class="text">Зарегистрироваться</span>
                    </button>                
                </form>
                <hr>            
            </div>
                      
            <div class="container sign-in">
                <p class="text">Уже есть аккаунт?</p>
                <button id="login">
                    <span class="button__text">Войти</span>
                </button>
            </div>
        `
    ;
}