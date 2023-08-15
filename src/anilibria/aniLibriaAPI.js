'use strict'
import {createContainerAnime} from "./createContainerAnime";

async function fetchAnimeData() {
    try {
        const response = await fetch('https://api.anilibria.tv/v3/title/random');

        if (response.ok) {
            await createContainerAnime(response);
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('#fetchAnimeData')) {
        fetchAnimeData().catch(error => {
            console.error("Ошибка получения данных об аниме", error);
        });
    }
});
