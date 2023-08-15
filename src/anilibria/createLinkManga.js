export function createLinkManga(animeEngName) {
    const cleanedName = animeEngName.replace(/:/g, '').replace(/\s+\d+$/, '');
    const formattedName = cleanedName.toLowerCase().replace(/\s+/g, '-');
    return `https://mangalib.me/${formattedName}`;
}