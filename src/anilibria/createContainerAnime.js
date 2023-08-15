import {createLinkAnime} from "./createLinkAnime";
import {createLinkManga} from "./createLinkManga";
import {getTokenFromLocalStorage} from "../mainApp";
import {addAnimeInLib} from "./addAnimeInLib";

export async function createContainerAnime(response) {
    const animeData = await response.json();

    document.getElementById('startWelcome').innerHTML = '';

    if (document.getElementById('randomAnime') !== null) {
        document.getElementById('randomAnime').innerHTML = '';
    }

    const div = document.createElement('div');
    div.setAttribute('id', animeData.id);

    const buttons = document.createElement('div');
    buttons.classList.add('anime__buttons');
    div.prepend(buttons);

    const button = document.createElement('button');
    button.setAttribute('id', 'fetchAnimeData');
    button.textContent = 'Обновить';
    button.className = 'button randomAnime__button';
    buttons.append(button);

    const buttonLinkAnime = document.createElement('button');
    buttonLinkAnime.setAttribute('id', 'buttonLinkAnime');
    buttonLinkAnime.textContent = 'Смотреть';
    buttonLinkAnime.className = 'button buttonLinkAnime';
    buttonLinkAnime.addEventListener('click', () => {
        const animeLink = createLinkAnime(animeData.code);
        window.open(animeLink, '_blank');
    });
    buttons.append(buttonLinkAnime);

    const buttonLinkManga = document.createElement('button');
    buttonLinkManga.setAttribute('id', 'buttonLinkManga');
    buttonLinkManga.textContent = 'Читать';
    buttonLinkManga.className = 'button buttonLinkManga';
    buttonLinkManga.addEventListener('click', () => {
        const mangaLink = createLinkManga(animeData.names.en);
        window.open(mangaLink, '_blank');
    });
    buttons.append(buttonLinkManga);

    const token = getTokenFromLocalStorage();
    if (token) {
        const addButton = document.createElement('button');
        addButton.setAttribute('id', 'addButton');
        addButton.textContent = 'Добавить';
        addButton.className = 'button addButton';
        addButton.addEventListener('click', () => {
            addAnimeInLib(animeData.names.ru);
        });
        buttons.append(addButton);
    } else {
        console.error('Токен не найден. Пользователь не авторизован.');
    }

    const title = document.createElement('h2');
    title.textContent = animeData.names.ru;
    div.append(title);

    const type = document.createElement('p');
    type.textContent = animeData.description;
    type.style.color = '#EDF5E1';
    type.style.fontSize = '150%';
    div.append(type);

    const genres = document.createElement('p');
    genres.textContent = animeData.genres;
    div.append(genres);

    const status = document.createElement('p');
    status.textContent = animeData.status.string;
    div.append(status);

    const season = document.createElement('p');
    let nameSeason = animeData.season.string;

    season.textContent = `Сезон: ${checkSeason(nameSeason)} ${animeData.season.year}г.`;
    div.append(season);


    const container = document.getElementById('randomAnime');
    div.style.fontFamily = 'Montserrat';
    div.style.fontWeight = 'Bold';
    div.style.width = '60%';
    div.style.margin = '0 20%';
    container.append(div);
}

function checkSeason(nameSeason) {
    if (nameSeason !== null) {
        return nameSeason;
    }
    return nameSeason = '';
}