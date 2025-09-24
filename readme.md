## 🎯 Projet : DevBox

### Description

DevBox est une application front **vanilla JavaScript** permettant aux développeurs de gérer leur propre base de ressources web.
Chaque ressource est définie par :

* un **nom**,
* une **URL**,
* le **favicon** du site (récupéré automatiquement via Google Favicon API).

Les ressources sont organisées dans des **dossiers personnalisés** que l’utilisateur peut créer, modifier et supprimer.

### Fonctionnalités principales

1. **Gestion des ressources**

   * Ajouter une ressource avec nom + URL.
   * Favicon automatiquement associé (`https://www.google.com/s2/favicons?domain=...`).
   * Éditer / supprimer une ressource.

2. **Organisation en dossiers**

   * Créer, renommer et supprimer des dossiers.
   * Associer des ressources à un dossier.

3. **Persistance locale**

   * Sauvegarde de toutes les données via **LocalStorage**.
   * Restauration automatique à chaque chargement.

4. **UI / UX**

   * Interface minimaliste et responsive avec **PicoCSS**.
   * Liste claire des dossiers et ressources.
   * Formulaire simple d’ajout de ressource et de dossier.

### Stack technique

* **Frontend** : Vanilla JS + PicoCSS.
* **Stockage** : LocalStorage (pas de backend).
* **Favicon** : Google Favicon API.

### Bonus possibles

* Recherche / filtrage de ressources.
* Export / import des données en JSON.