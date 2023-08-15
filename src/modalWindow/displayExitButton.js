export function displayExitButton() {
    const navbarMenu = document.querySelector('.navbar__menu');

    if (!document.querySelector('.navbar-menu__exit')) {
        const div = document.createElement('div');
        div.className = 'navbar-menu__item navbar-menu__exit';

        const exitBtn = document.createElement('button');
        exitBtn.className = 'button exit_btn';

        const exitBtnSpan = document.createElement('span');
        exitBtnSpan.className = 'text';
        exitBtnSpan.textContent = 'Выйти';

        navbarMenu.append(div);
        div.append(exitBtn);
        exitBtn.append(exitBtnSpan);

        exitBtn.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            document.querySelector('#openModalWindow').style.display = 'block';
            exitBtn.remove();
            location.reload();
        });

        document.querySelector('#openModalWindow').style.display = 'none';
    }
}
