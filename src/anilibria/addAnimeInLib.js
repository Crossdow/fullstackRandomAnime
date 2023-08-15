import {getTokenFromLocalStorage} from "../mainApp";

export async function addAnimeInLib(animeTitle) {
    try {
        const token = getTokenFromLocalStorage();
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                const userId = decodedToken.userId;

                const data = {
                    userId: userId,
                    animeTitle: animeTitle,
                };
                try {
                    const response = await fetch("/api/addAnime", {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        console.log('Аниме добавлено');
                    } else {
                        const errorData = await response.json();
                        console.error("Ошибка при добавлении:", errorData.error);
                    }
                } catch (error) {
                    console.error("Ошибка при отправке запроса:", error);
                }
            } catch (error) {
                console.error('Ошибка раскодировки токена или выполнения запроса', error);
            }
        }
    } catch (error) {
        console.error('Ошибка при получении токена', error);
    }
}