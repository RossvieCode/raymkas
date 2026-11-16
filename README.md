# RAYMKAS

Page d'accueil de RAYMKAS : des sorties en groupe ou en privé au départ de Goma et Bukavu,
vers Bigogwe, Kibuye (lac Kivu), Nyungwe et Akagera. Transport, guide et photographe compris.

Réservation : WhatsApp +243 976 812 879 · TikTok [@mugishokasongo](https://www.tiktok.com/@mugishokasongo)

## Modifier le contenu

Tout le texte, les photos et le numéro WhatsApp sont dans `js/content.js`.
Le site est en français et en anglais : chaque texte s’écrit `T('français', 'English')`.
Les textes des boutons et titres sont dans `js/i18n.js` (dictionnaire `UI`).
Lien direct vers la version anglaise : `?lang=en`.

Après chaque modification d'un fichier CSS ou JS, augmente le numéro `?v=` dans `index.html`
(ex. `?v=3` → `?v=4`) : sinon les téléphones peuvent garder l'ancienne version en mémoire.

## Prochaines sorties

Les sorties avec date et prix sont dans `window.UPCOMING` (`js/content.js`). Elles apparaissent sur la page
`prochaine-sortie.html`, dans le bouton jaune du hero, le bouton flottant, la section « On part quand ? » et dans la fiche de l’expérience.
Une sortie disparaît toute seule le lendemain de sa date.

## Structure

- `index.html` : la page d’accueil
- `prochaine-sortie.html` : la prochaine sortie (carte, date, prix, réservation)
- `css/style.css` : le style (couleurs en variables en haut du fichier)
- `js/content.js` : les textes, les expériences, les photos
- `js/main.js` : diaporama, carte animée, carrousels
- `js/map-data.js` : le fond de carte
- `js/map-draw.js` : tracés et repères de la carte (partagés par les deux pages)
- `js/upcoming.js` : prochaines sorties (dates, compte à rebours)
- `js/sortie.js` : page « Prochaine sortie »
- `assets/img/` : les photos (`-sm` = version légère pour téléphone)

Site statique, sans compilation : n'importe quel hébergement de fichiers (GitHub Pages, Netlify…) fonctionne.
