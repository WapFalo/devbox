import { saveData, getData, loadData } from './storage.js';

let folders = loadData("folders") || [];

export function getFolders() {
    return [...folders]; // Return a copy to prevent external mutations
}

export function addFolder(name) {
    const folder = {
        id: Date.now(),
        name: name,
        resources: []
    };
    folders.push(folder);
    saveData("folders", folders);
    return folder;
}

export function deleteFolder(id) {
    folders = folders.filter(folder => folder.id !== id);
    saveData("folders", folders);
}

export function editFolder(id, newName) {
    const folder = folders.find(f => f.id === id);
    if (folder) {
        folder.name = newName;
        saveData("folders", folders);
        return true;
    }
    return false;
}