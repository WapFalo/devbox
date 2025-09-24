export function saveData (key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Error while saving data", error);
        return null;
    }
}

export function loadData (key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error getting data from localStorage", error);
        return null;
    }
}