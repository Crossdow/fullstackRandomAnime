export async function showAnimeLib(userId) {
    try {
        const response = await fetch(`/api/library?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const favourites__list = document.querySelector('.favourites');
            const animeList = data.map(anime => `<li>${anime.anime}</li>`);

            favourites__list.innerHTML = `
                <ul class="favourites__list text">
                    <b>Добавленные: </b>
                    ${animeList.join('')}
                </ul>
            `;
        } else {
            const errorData = await response.json();
            console.error('Ошибка при получении списка аниме:', errorData.error);
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
}

