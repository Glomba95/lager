export default async function getCoordinates(address: string) {
    // Konverterar spaces m.m. förbjudna tecken inför GET-req.
    const urlEncodedAddress = encodeURIComponent(address);
    const url = "https://nominatim.openstreetmap.org/search.php?format=jsonv2&q=";
    const response = await fetch(`${url}${urlEncodedAddress}`);
    const result = await response.json();

    return result;
};