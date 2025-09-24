import { saveData } from "./storage";
import { getFaviconUrl } from "./favicon.js";
import { getFolders } from "./folders.js";

export function addResource(folderId, name, url) {
    const folders = getFolders();
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return null;
    folder.resources = folder.resources || [];
    folder.resources.push({
        id: Date.now(),
        name: name,
        url: url,
        favicon: getFaviconUrl(url)
    });
    saveData("folders", folders);
}

export function deleteResource(folderId, resourceId) {
    const folders = getFolders();
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return false;
    folder.resources = folder.resources.filter(r => r.id !== resourceId);
    saveData("folders", folders);
}

export function editResource(folderId, resourceId, newName, newUrl) {
    const folders = getFolders();
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return false;
    const resource = folder.resources.find(r => r.id === resourceId);
    if (resource) {
        resource.name = newName;
        resource.url = newUrl;
        resource.favicon = getFaviconUrl(newUrl);
        saveData("folders", folders);
        return true;
    }
    return false;
}