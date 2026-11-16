/* =====================================================================
   CONTENU : tout ce que le visiteur lit se modifie ici.
   Les photos sont dans assets/img/.
   ===================================================================== */

window.SITE = {
  brand: 'RAYMKAS',
  heroLead: 'De Goma & Bukavu, cap sur',
  intro: 'On s’occupe du transport, du guide et des photos. Toi, tu profites. Plus de 500 voyageurs sont déjà partis avec nous depuis janvier.',
  /* Photos de fond du hero (diaporama). srcWide/posWide : variante pour écrans larges (≥ 900 px). */
  heroSlides: [
    {src: 'assets/img/hero-lac.jpg', pos: '52% center'},        // lac Kivu : l'île vue d'en haut
    {src: 'assets/img/hero-girafes.jpg', pos: 'center 45%'},   // Akagera : face aux girafes
    {src: 'assets/img/hero-chateau.jpg', pos: '56% center'},      // Kibuye : le château et son escalier au tapis rouge
  ],
  whatsappNumber: '243976812879',              // numéro WhatsApp, chiffres seulement, avec l'indicatif
  whatsappDisplay: '+243 976 812 879',         // même numéro, tel qu'affiché sur la page
  email: '',                                   // À REMPLIR : vraie adresse (vide = ligne masquée)
  overviewColor: '#1d3a3a',                    // couleur de la page avant/après le parcours
};

/* Prochaines sorties (avec date et prix).
   date : AAAA-MM-JJ. Une sortie disparaît toute seule le lendemain de sa date ;
   s'il n'y en a plus, la section et le bouton du hero sont masqués.            */
window.UPCOMING = [
  {
    title: 'Nyungwe',
    date: '2026-11-29',
    price: '55 $',
    priceNote: 'tout compris',
    photo: 'assets/img/nyungwe-1.jpg',
    photoAlt: 'Un voyageur sur la passerelle suspendue au-dessus de la forêt de Nyungwe',
    text: 'Passerelle suspendue au-dessus des arbres, tyrolienne et cascade, au cœur de l’une des plus vieilles forêts d’Afrique.',
    includes: ['Transport depuis Goma ou Bukavu', 'Entrées du parc : passerelle et tyrolienne', 'Un guide pendant toute la sortie', 'Un photographe pour tes souvenirs'],
    origins: ['Goma', 'Bukavu'],
  },
];

/* Créateur derrière RAYMKAS */
window.CREATOR = {
  name: 'Raymond',
  handle: '@mugishokasongo',
  url: 'https://www.tiktok.com/@mugishokasongo',
  quote: 'Découvre le Kivu que personne ne montre',
  text: 'Derrière RAYMKAS, il y a Raymond. Sur TikTok, il partage les vues de rêve, les sorties et les lieux cachés de la région. Avec RAYMKAS, il t’emmène les vivre en vrai.',
  stats: [
    {n: 22.6, decimals: 1, suffix: ' K', label: 'abonnés'},
    {n: 151.3, decimals: 1, suffix: ' K', label: 'j’aime'},
  ],
};

/* Chiffres clés */
window.STATS = {
  travelers: {n: 500, suffix: '+', label: 'voyageurs depuis janvier'},
  destinations: {label: 'expériences'},
  origins: {label: 'villes de départ', names: ['Goma', 'Bukavu']},
};

/* Points sur la carte (même projection que map-data.js) */
window.MAP_PTS = {
  goma:    [287.8, 366.1],
  bukavu:  [170.0, 636.4],
  bigogwe: [352.0, 346.8],
  kibuye:  [328.8, 490.4],
  nyungwe: [285.0, 624.9],
  akagera: [769.4, 429.7],
};
/* Villes de départ (RD Congo) : chaque expérience part de Goma ET de Bukavu ;
   la carte trace les deux routes vers la destination active. */
window.ORIGINS = [
  {key: 'goma', title: 'Goma', label: 'left'},
  {key: 'bukavu', title: 'Bukavu', label: 'below'},
];
/* Noms discrets sur la carte */
window.MAP_LABELS = [
  {t: 'RD Congo', x: 150, y: 470},
  {t: 'Lac Kivu', x: 262, y: 545, cls: 'water'},
  {t: 'Rwanda', x: 590, y: 600},
];

/* Une entrée par expérience.
   color : couleur de la page quand l'étape est active
   zoom  : niveau de zoom de la carte (1 = vue d'ensemble)            */
window.STOPS = [
  {
    key: 'bigogwe', num: '01', title: 'Bigogwe', meta: 'Collines . Vachers d’un jour',
    color: '#2f4a24', zoom: 2.3, label: 'right',
    text: 'Enfile les bottes, le chapeau et la couverture traditionnelle, prends ton bâton de berger : à Bigogwe, tu passes la journée sur les collines verdoyantes, au milieu des vaches Inyambo aux immenses cornes.',
    tags: ['Collines', 'Vaches Inyambo', 'Tenue de berger'],
    photos: [
      {src: 'assets/img/bigogwe-1.jpg', alt: 'Un voyageur en tenue de berger à côté d’une vache Inyambo aux longues cornes'},
      {src: 'assets/img/bigogwe-chevre.jpg', alt: 'Une voyageuse en couverture à carreaux et chapeau, un chevreau dans les bras'},
      {src: 'assets/img/bigogwe-groupe.jpg', alt: 'Le groupe en tenue de berger : chapeaux, couvertures à carreaux, bottes vertes et bâtons'},
      {src: 'assets/img/bigogwe-2.jpg', alt: 'Groupe de voyageurs en couvertures à carreaux et chapeaux sur les collines'},
      {src: 'assets/img/bigogwe-3.jpg', alt: 'Deux voyageuses en chapeau et bâton de berger sur la colline'},
      {src: 'assets/img/bigogwe-4.jpg', alt: 'Voyageuses assises dans l’herbe, bottes vertes et bâtons de berger'},
      {src: 'assets/img/bigogwe-photo.jpg', alt: 'Une voyageuse en chapeau prend son amie en photo sur la colline'},
    ],
  },
  {
    key: 'kibuye', num: '02', title: 'Kibuye', meta: 'Lac Kivu . Château & bateau',
    color: '#16394a', zoom: 2.1, label: 'right',
    text: 'Monte le grand escalier au tapis rouge d’un château blanc perché sur la colline, puis embarque pour une balade en bateau entre les îles du lac Kivu. Arrêt photo au panneau Rwanda – Kongo et pause sur les rochers, au bord de l’eau.',
    tags: ['Château', 'Bateau sur le lac', 'Îles'],
    photos: [
      {src: 'assets/img/kibuye-chateau.jpg', pos: '55% center', alt: 'Le château blanc et son escalier au tapis rouge, sur la colline de Kibuye'},
      {src: 'assets/img/kibuye-vaches.jpg', pos: '48% center', alt: 'Des vaches qui se baignent dans le lac Kivu, devant le bateau des voyageurs'},
      {src: 'assets/img/kibuye-bateau.jpg', alt: 'Trois voyageuses souriantes en gilet de sauvetage dans une pirogue orange'},
      {src: 'assets/img/kibuye-groupe.jpg', alt: 'Le groupe au sommet, sur les rochers, avec le drapeau de la RD Congo'},
      {src: 'assets/img/kibuye-3.jpg', alt: 'Une voyageuse les bras ouverts à l’avant du bateau'},
      {src: 'assets/img/kibuye-4.jpg', alt: 'Une voyageuse devant le panneau Rwanda – Kongo'},
      {src: 'assets/img/kibuye-6.jpg', alt: 'Trois voyageurs sur les rochers au bord du lac Kivu'},
    ],
  },
  {
    key: 'nyungwe', num: '03', title: 'Nyungwe', meta: 'Forêt tropicale . Canopée',
    color: '#123224', zoom: 2.1, label: 'right',
    text: 'L’une des plus vieilles forêts d’Afrique. Tu marches sur une passerelle suspendue au-dessus des arbres, tu t’élances en tyrolienne, casque et harnais bien attachés, puis tu descends jusqu’à une cascade au cœur de la forêt.',
    tags: ['Passerelle de la canopée', 'Tyrolienne jusqu’à 1 020 m', 'Cascade'],
    photos: [
      {src: 'assets/img/nyungwe-1.jpg', alt: 'Un voyageur sur la passerelle suspendue au-dessus de la forêt de Nyungwe'},
      {src: 'assets/img/nyungwe-passerelle.jpg', alt: 'Selfie du groupe sur la passerelle de la canopée'},
      {src: 'assets/img/nyungwe-2.jpg', alt: 'Le groupe au pied d’une grande cascade dans la forêt'},
      {src: 'assets/img/nyungwe-3.jpg', alt: 'Le groupe en casques et harnais au départ de la tyrolienne'},
      {src: 'assets/img/nyungwe-4.jpg', alt: 'Deux voyageurs devant la cascade'},
    ],
  },
  {
    key: 'akagera', num: '04', title: 'Akagera', meta: 'Savane . Safari',
    color: '#4a3f1e', zoom: 2.0, label: 'left',
    text: 'Le parc des « Big Five ». Tu parcours la savane à la rencontre des girafes et des antilopes, tu pique-niques face au lac, et tu repars avec ta photo souvenir dans le cadre du parc.',
    tags: ['Safari', 'Girafes', 'Pique-nique face au lac'],
    photos: [
      {src: 'assets/img/akagera-girafes.jpg', alt: 'Un voyageur face à deux girafes dans la savane d’Akagera'},
      {src: 'assets/img/akagera-2.jpg', alt: 'Trois girafes sous un acacia dans le parc de l’Akagera'},
      {src: 'assets/img/akagera-3.jpg', alt: 'Deux antilopes cobes dans l’herbe verte de la savane'},
      {src: 'assets/img/akagera-4.jpg', alt: 'Un voyageur dans le cadre photo du parc, face au lac'},
    ],
  },
];

/* Deux façons de voyager */
window.FORMULAS = [
  {
    title: 'En groupe',
    text: 'Rejoins la prochaine sortie avec d’autres voyageurs',
    message: 'Bonjour RAYMKAS, je voudrais recevoir les dates des prochaines sorties en groupe.',
  },
  {
    title: 'En privé',
    text: 'Tes dates, tes expériences, ta famille ou ton équipe',
    message: 'Bonjour RAYMKAS, je voudrais organiser un voyage privé.',
  },
];

window.GOOD_TO_KNOW = [
  {title: 'C’est compris', text: 'Le transport depuis Goma ou Bukavu, un guide pendant toute la sortie et un photographe pour tes souvenirs.'},
  {title: 'Départs', text: 'Depuis Goma par la frontière de Rubavu, ou depuis Bukavu par la frontière de Rusizi. Selon l’expérience, la sortie dure une journée ou un week-end.'},
  {title: 'À prévoir', text: 'Une pièce d’identité valide pour passer la frontière, de bonnes chaussures et une veste : il fait frais à Bigogwe et à Nyungwe.'},];
