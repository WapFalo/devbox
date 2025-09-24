import { createElement } from 'react';
import { getFolders, addFolder, deleteFolder, editFolder } from './folders.js';
import { addResource, deleteResource, editResource } from './resources.js';

// DOM Selection
const dom = {
    folder: {
    form: document.querySelector('#folderForm'),
    name: document.querySelector('#folderName'),
    list: document.querySelector('#folderList')
    },
    resource: {
        form: document.querySelector('#resourceForm'),
        name: document.querySelector('#resourceName'),
        url: document.querySelector('#resourceURL'),
        fodler: document.querySelector('#resourceFolder')
    }
};

function createEditForm (currentValue, onSave, onCancel) {
    const form = document.createElement('form');
    form.className = 'edit-form';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.required = true;

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', onCancel);

    form.append(input, saveButton, cancelButton);

    form.addEventListener('submmit', (e) => {
        e.preventDefault();
        onSave(input.value);
    });

    return { form, input};
}

function renderFolders() {
    dom.folder.list.innerHTML = '';
    dom.resource.folder.innerHTML = '';

    getFolders.forEach(folder => {
        const option = document.createElement('option');
        option.value = folder.id;
        option.textContent = folder.name;
        dom.resource.folder.appendChild(option);

        const div = createElement('article');
        div.className = 'folder';

        const folderHeader = document.createElement('div');
        folderHeader.className = 'folder-header';

        const folderTitle = document.createElement('h3');
        folderTitle.innerHTML = `📂 ${folder.name}`;

        const editFolderButton = document.createElement('button');
        editFolderButton.type = 'button';
        editFolderButton.textContent = 'Edit';
        editFolderButton.className = 'icon-button';
        editFolderButton.title = 'Edit Folder Name';
        editFolderButton.addEventListener('click', () => {
            const { form, input } = createEditForm(
                folder.name, (newName) => {
                    editFolder(folder.id, newName);
                    renderFolders();
                },
                () => renderFolders()
            );

            folderTitle.replaceWith(form);
            input.focus();
        });

        folderHeader.append(folderTitle, editFolderButton);
        div.appendChild(folderHeader);

        const ul = document.createElement('ul');
        folder.resources.forEach(r => {
            const li = createElement('li');
            li.className = 'resource';

            resourceLink.href = r.url;
            resourceLink.target =  '_blank';
            resourceLink.innerHTML = `<img src="${r.favicon}" alt="icon" width="32" height="32">${r.name}`;

            const resourceActions = document.createElement('div');
            resourceActions.className = 'resource-actions';

            const editButton = document.createElement('button');
            editButton.type = "button";
            editButton.className = 'icon-button';
            editButton.title = 'Edit Resource';
            editButton.textContent = 'Edit';
            editButton.addEventListener("click", (e) =>{
                e.preventDefault();
                e.stopPropagation();

                const form = document.createElement('form');
                form.className = 'edit-resource-form';

                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = r.name;
                nameInput.required = true;
                nameInput.placeholder = 'Resource Name';

                const urlInput = document.createElement('input');
                urlInput.type = 'url';
                urlInput.value = r.url;
                urlInput.required = true;
                urlInput.placeholder = 'Resource URL';

                const saveButton = document.createElement('button');
                saveButton.type = 'submit';
                saveButton.textContent = 'Save';

                const cancelButton = document.createElement('button');
                cancelButton.type = 'button';
                cancelButton.textContent = 'Cancel';
                
                form.append(nameInput, urlInput, saveButton, cancelButton);

                const onCancel = () => li.replaceChild(resourceLink, form);

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    editResource(folder.id, r.id, nameInput.value, urlInput.value);
                    renderFolders();
                });
                cancelButton.addEventListener('click', onCancel);
                li.replaceChild(form, resourceLink);
                nameInput.focus();
            });

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'icon-button';
            removeButton.title = 'Delete Resource';
            removeButton.textContent = 'Delete';
            removeButton.addEventListener('click', () => {
                if (confirm(`Are you sure you want to delete the resource "${r.name}"?`)) {
                    deleteFolder(folder.id, r.id);
                    renderFolders();
                }
            });
            div.appendChild(ul, removeButton);
            dom.folder.list.appendChild(div);
        });
    });
}

// Replace the resource link with an inline edit form and focus the name input
dom.folder.form.addEventListener("submit", e => {
    e.preventDefault();
    addFolder(dom.folder.name.value);
    dom.folder.name.value = "";
    renderFolders();
})

// Handle folder deletion with user confirmation and update the UI
dom.resource.form.addEventListener("submit", e => {
    e.preventDefault();
    addResource(dom.resource.name.value, dom.resource.url.value, parseInt(dom.resource.folder.value));
    dom.resource.name.value = "";
    dom.resource.url.value = "";
    renderFolders();
})

renderFolders();