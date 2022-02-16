export async function fetchMaps(userId, setAllMaps) {
    const response = await fetch(`/api/users/${userId}/maps`);
    const responseData = await response.json();
    setAllMaps(responseData.maps);
    }
