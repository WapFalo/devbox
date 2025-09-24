const foldersKey = "devbox-folders";
let folders = JSON.parse(localStorage.getItem(foldersKey)) || [];
let currentFolder = null;

// DOM Elements
const folderForm = document.getElementById("folder-form");
const folderNameInput = document.getElementById("folder-name");
const foldersList = document.getElementById("folders-list");
const resourcesSection = document.getElementById("resources-section");