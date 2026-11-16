# RAYMKAS

Page d'accueil de RAYMKAS : des sorties en groupe ou en privé au départ de Goma et Bukavu,
vers Bigogwe, Kibuye (lac Kivu), Nyungwe et Akagera. Transport, guide et photographe compris.

Réservation : WhatsApp +243 976 812 879 · TikTok [@mugishokasongo](https://www.tiktok.com/@mugishokasongo)

## Modifier le contenu

Tout le texte, les photos et le numéro WhatsApp sont dans `js/content.js`.

Après chaque modification d'un fichier CSS ou JS, augmente le numéro `?v=` dans `index.html`
(ex. `?v=3` → `?v=4`) : sinon les téléphones peuvent garder l'ancienne version en mémoire.

## Structure

- `index.html` : la page
- `css/style.css` : le style (couleurs en variables en haut du fichier)
- `js/content.js` : les textes, les expériences, les photos
- `js/main.js` : diaporama, carte animée, carrousels
- `js/map-data.js` : le fond de carte
- `assets/img/` : les photos (`-sm` = version légère pour téléphone)

Site statique, sans compilation : n'importe quel hébergement de fichiers (GitHub Pages, Netlify…) fonctionne.
