/* =====================================================================
   CONTENU : tout ce que le visiteur lit se modifie ici.
   Chaque texte est écrit deux fois : T('français', 'English').
   Les photos sont dans assets/img/.
   ===================================================================== */

window.SITE = {
  brand: 'RAYMKAS',
  heroLead: T('De Goma & Bukavu, cap sur', 'From Goma & Bukavu, off to'),
  intro: T('On s’occupe du transport, du guide et des photos. Toi, tu profites. Plus de 500 voyageurs sont déjà partis avec nous depuis avril.',
           'We handle the transport, the guide and the photos. You just enjoy. Over 500 travellers have already come along with us since April.'),
  /* Photos de fond du hero (diaporama). srcWide/posWide : variante pour écrans larges (≥ 900 px). */
  heroSlides: [
    {src: 'assets/img/hero-lac.jpg', pos: '52% center'},        // lac Kivu : l'île vue d'en haut
    {src: 'assets/img/hero-bateau.jpg', pos: 'center 32%'},     // Kibuye : voyageuses souriantes dans la pirogue
    {src: 'assets/img/hero-girafes.jpg', pos: 'center 45%'},   // Akagera : face aux girafes
    {src: 'assets/img/hero-groupe.jpg', pos: 'center 40%'},     // le groupe au sommet avec le drapeau de la RD Congo
    {src: 'assets/img/hero-chateau.jpg', pos: '56% center'},      // Kibuye : le château et son escalier au tapis rouge
  ],
  whatsappNumber: '243976812879',              // numéro WhatsApp, chiffres seulement, avec l'indicatif
  whatsappDisplay: '+243 976 812 879',         // même numéro, tel qu'affiché sur la page
  email: 'mugishokasongo@icloud.com',          // adresse e-mail (vide = ligne masquée)
  overviewColor: '#1d3a3a',                    // couleur de la page avant/après le parcours
};

/* Prochaines sorties (avec date et prix).
   date : AAAA-MM-JJ. Une sortie disparaît toute seule le lendemain de sa date ;
   s'il n'y en a plus, la section et le bouton du hero sont masqués.            */
window.UPCOMING = [
  {
    key: 'nyungwe',               // même clé que l'expérience (carte + lien dans sa fiche)
    title: 'Nyungwe',
    date: '2026-12-06',
    price: T('55 $', '$55'),
    priceNote: T('tout compris', 'all inclusive'),
    // priceFrom: 'Bukavu',       // si le prix ne vaut que pour une ville : depuis les autres, le message WhatsApp demande le prix
    photo: 'assets/img/nyungwe-affiche.jpg',
    poster: true,                 // la photo est une affiche : affichée en entier (format 4:5), sans pastille de date
    photoAlt: T('Affiche de la sortie au parc de Nyungwe le 6 décembre 2026 : 55 $ par personne, canopy walk, nature walk, tyrolienne et cueillette de thé',
                'Poster for the Nyungwe park trip on 6 December 2026: $55 per person, canopy walk, nature walk, zipline and tea harvesting'),
    text: T('Passerelle suspendue au-dessus des arbres, tyrolienne et cascade, au cœur de l’une des plus vieilles forêts d’Afrique.',
            'A walkway suspended above the trees, a zipline and a waterfall, deep in one of Africa’s oldest forests.'),
    includes: T(['Transport aller-retour depuis Goma ou Bukavu (départ 6 h 30, frontière Ruzizi Nguba)',
                 'Entrées du parc : canopy walk et tyrolienne',
                 'Nature walk, observation des oiseaux et cueillette de thé',
                 'Excursions guidées pendant toute la sortie',
                 'Boissons : sodas et eau',
                 'Photographie et vidéographie pour tes souvenirs'],
                ['Return transport from Goma or Bukavu (6:30 am departure, Ruzizi Nguba border)',
                 'Park fees: canopy walk and zipline',
                 'Nature walk, birdwatching and tea harvesting',
                 'Guided excursions for the whole trip',
                 'Soft drinks: sodas and water',
                 'Photography and videography for your memories']),
    origins: ['Goma', 'Bukavu'],
  },
];

/* Créateur derrière RAYMKAS */
window.CREATOR = {
  name: 'Mugisho',
  handle: '@mugishokasongo',
  url: 'https://www.tiktok.com/@mugishokasongo',
  quote: T('Découvre le Kivu que personne ne montre', 'Discover the Kivu nobody shows you'),
  text: T('Derrière RAYMKAS, il y a Mugisho. Sur TikTok, il partage les vues de rêve, les sorties et les lieux cachés de la région. Avec RAYMKAS, il t’emmène les vivre en vrai.',
          'Behind RAYMKAS is Mugisho. On TikTok, he shares dreamy views, outings and the region’s hidden spots. With RAYMKAS, he takes you to live them for real.'),
  stats: [
    {n: 22.6, decimals: 1, suffix: ' K', label: T('abonnés', 'followers')},
    {n: 151.3, decimals: 1, suffix: ' K', label: T('j’aime', 'likes')},
  ],
};

/* Chiffres clés */
window.STATS = {
  travelers: {n: 500, suffix: '+', label: T('voyageurs depuis avril', 'travellers since April')},
  destinations: {label: T('expériences', 'experiences')},
  origins: {label: T('villes de départ', 'departure cities'), names: ['Goma', 'Bukavu']},
};

/* Points sur la carte (même projection que map-data.js) */
window.MAP_PTS = {
  goma:    [287.8, 366.1],
  bukavu:  [170.0, 636.4],
  bigogwe: [352.0, 346.8],
  kibuye:  [328.8, 490.4],
  nyungwe: [285.0, 624.9],
  akagera: [769.4, 429.7],
  kashusha: [163.0, 568.5],   // Sud-Kivu, au nord de Bukavu (env. 2,30° S, 28,84° E)
  tchegera: [238.0, 424.0],   // île du lac Kivu, au sud-ouest de Goma, à 15 min de bateau
  tchibati: [140.0, 540.0],   // chutes de Tchibati, Kahuzi-Biega (env. 2,21° S, 28,77° E)
};
/* Villes de départ (RD Congo) : chaque expérience part de Goma ET de Bukavu,
   sauf si elle a sa propre liste « origins » ; la carte trace les routes vers la destination active. */
window.ORIGINS = [
  {key: 'goma', title: 'Goma', label: 'right'},   // à droite : Tchegera est juste à gauche, dans le lac
  {key: 'bukavu', title: 'Bukavu', label: 'below'},
];
/* Noms discrets sur la carte */
window.MAP_LABELS = [
  {t: T('RD Congo', 'DR Congo'), x: 150, y: 470},
  {t: T('Lac Kivu', 'Lake Kivu'), x: 262, y: 545, cls: 'water'},
  {t: 'Rwanda', x: 600, y: 545},   // entre Kibuye et Nyungwe, loin de leurs noms
];

/* Une entrée par expérience.
   color : couleur de la page quand l'étape est active
   zoom  : niveau de zoom de la carte (1 = vue d'ensemble)            */
window.STOPS = [
  {
    key: 'tchibati', num: '01', title: 'Tchibati', meta: T('Kahuzi-Biega . Chutes', 'Kahuzi-Biega . Waterfalls'),
    color: '#1f3b26', zoom: 2.4, label: 'left',
    text: T('Notre toute première sortie. Au pied du parc de Kahuzi-Biega, tu descends à travers la forêt jusqu’aux chutes de Tchibati, puis tu t’approches de l’eau qui tombe, dans les embruns, sur les rochers. Retour par les collines vertes, pour la photo de groupe.',
            'Our very first trip. At the edge of Kahuzi-Biega park, you walk down through the forest to the Tchibati falls, then get close to the falling water, in the spray, on the rocks. Back over the green hills for the group photo.'),
    tags: T(['Chutes', 'Forêt de Kahuzi-Biega', 'Notre première sortie'], ['Waterfalls', 'Kahuzi-Biega forest', 'Our first trip']),
    photos: [
      {src: 'assets/img/tchibati-1.jpg', alt: T('Trois voyageurs devant les chutes de Tchibati, dans les embruns', 'Three travellers in front of the Tchibati falls, in the spray')},
      {src: 'assets/img/tchibati-selfie.jpg', alt: T('Selfie du groupe dans la forêt, les chutes de Tchibati derrière', 'Group selfie in the forest, with the Tchibati falls behind')},
      {src: 'assets/img/tchibati-2.jpg', alt: T('Des voyageuses qui dansent sur les rochers au pied de la cascade', 'Travellers dancing on the rocks at the foot of the waterfall')},
      {src: 'assets/img/tchibati-groupe.jpg', alt: T('Le groupe assis dans l’herbe sur la colline, sous un grand ciel', 'The group sitting in the grass on the hill, under a wide sky')},
    ],
  },
  {
    key: 'tchegera', num: '02', title: 'Tchegera', meta: T('Lac Kivu . Île', 'Lake Kivu . Island'),
    color: '#17404a', zoom: 2.6, label: 'left',
    text: T('Une île au milieu du lac Kivu, à quelques minutes de bateau de Goma. Plage de sable noir volcanique, grands arbres au bord de l’eau, ponton de bois sur les rochers et troncs blanchis où l’on s’assoit les pieds dans le lac. Une journée pour décrocher, au milieu du lac.',
            'An island in the middle of Lake Kivu, a few minutes by boat from Goma. A black volcanic sand beach, tall trees by the water, a wooden footbridge over the rocks and bleached tree trunks to sit on with your feet in the lake. A day to switch off, in the middle of the lake.'),
    tags: T(['Île', 'Traversée en bateau', 'Sable volcanique'], ['Island', 'Boat crossing', 'Volcanic sand']),
    photos: [
      {src: 'assets/img/tchegera-groupe.jpg', pos: 'center 70%', alt: T('Des voyageurs assis sur un grand tronc blanchi, les pieds dans le lac Kivu', 'Travellers sitting on a large bleached tree trunk, feet in Lake Kivu')},
      {src: 'assets/img/tchegera-ponton.jpg', alt: T('Un voyageur les bras ouverts sur le ponton de bois au-dessus des rochers', 'A traveller with open arms on the wooden footbridge above the rocks')},
      {src: 'assets/img/tchegera-rive.jpg', alt: T('La rive de sable noir, ses grands arbres, les kayaks et les bateaux au bord de l’eau', 'The black sand shore with tall trees, kayaks and boats by the water')},
      {src: 'assets/img/tchegera-tente.jpg', alt: T('L’intérieur d’une grande tente safari, sa table en bois et une carte des volcans brodée', 'Inside a large safari tent, with a wooden table and an embroidered map of the volcanoes')},
    ],
  },
  {
    key: 'kashusha', num: '03', title: 'Kashusha', meta: T('Sud-Kivu . Jardin & prairies', 'South Kivu . Garden & meadows'),
    color: '#34461c', zoom: 2.4, label: 'right',
    text: T('Au Sud-Kivu, à deux pas de Bukavu : un grand jardin fleuri avec ses bulles transparentes et ses tentes safari, puis les prairies vertes où paissent les vaches. Une sortie nature pour se poser, respirer et faire de belles photos entre amis.',
            'In South Kivu, just outside Bukavu: a large flowered garden with transparent bubble domes and safari tents, then green meadows where cows graze. A nature day out to relax, breathe and take great photos with friends.'),
    tags: T(['Bulles transparentes', 'Tentes safari', 'Prairies'], ['Bubble domes', 'Safari tents', 'Meadows']),
    photos: [
      {src: 'assets/img/kashusha-bulles.jpg', pos: '62% center', alt: T('Une bulle transparente sur la pelouse du jardin de Kashusha, sous un grand ciel', 'A transparent bubble dome on the lawn of the Kashusha garden, under a wide sky')},
      {src: 'assets/img/kashusha-tente.jpg', pos: '52% center', alt: T('Une tente safari avec sa terrasse en bois, entourée de palmiers', 'A safari tent with its wooden deck, surrounded by palm trees')},
      {src: 'assets/img/kashusha-2.jpg', pos: '40% center', alt: T('Le groupe autour d’une table, sous un parasol, dans le jardin fleuri', 'The group around a table under a parasol, in the flowered garden')},
      {src: 'assets/img/kashusha-allee.jpg', pos: '60% center', alt: T('Une allée de dalles qui serpente dans la pelouse jusqu’aux bulles', 'A stepping-stone path winding across the lawn to the bubble domes')},
      {src: 'assets/img/kashusha-jardin.jpg', pos: '50% center', alt: T('Le jardin en pente, ses fleurs rouges et les bulles au fond', 'The sloping garden with red flowers and the bubble domes behind')},
      {src: 'assets/img/kashusha-tente-2.jpg', pos: '62% center', alt: T('Une tente safari au bout d’une allée bordée de haies et de fleurs', 'A safari tent at the end of a path lined with hedges and flowers')},
      {src: 'assets/img/kashusha-1.jpg', alt: T('Quatre voyageurs posent dans la prairie de Kashusha, des vaches et des eucalyptus derrière eux', 'Four travellers posing in the Kashusha meadow, with cows and eucalyptus behind them')},
    ],
  },
  {
    key: 'bigogwe', num: '04', title: 'Bigogwe', meta: T('Collines . Vachers d’un jour', 'Hills . Herders for a day'),
    color: '#2f4a24', zoom: 2.3, label: 'right',
    text: T('Enfile les bottes, le chapeau et la couverture traditionnelle, prends ton bâton de berger : à Bigogwe, tu passes la journée sur les collines verdoyantes, au milieu des vaches Inyambo aux immenses cornes.',
            'Pull on the boots, the hat and the traditional blanket, grab your herder’s stick: in Bigogwe you spend the day on the green hills, among Inyambo cows with their huge horns.'),
    tags: T(['Collines', 'Vaches Inyambo', 'Tenue de berger'], ['Hills', 'Inyambo cows', 'Herder outfit']),
    photos: [
      {src: 'assets/img/bigogwe-1.jpg', alt: T('Un voyageur en tenue de berger à côté d’une vache Inyambo aux longues cornes', 'A traveller in herder clothes next to a long-horned Inyambo cow')},
      {src: 'assets/img/bigogwe-chevre.jpg', alt: T('Une voyageuse en couverture à carreaux et chapeau, un chevreau dans les bras', 'A traveller in a checked blanket and hat, holding a young goat')},
      {src: 'assets/img/bigogwe-groupe.jpg', alt: T('Le groupe en tenue de berger : chapeaux, couvertures à carreaux, bottes vertes et bâtons', 'The group in herder outfits: hats, checked blankets, green boots and sticks')},
      {src: 'assets/img/bigogwe-2.jpg', alt: T('Groupe de voyageurs en couvertures à carreaux et chapeaux sur les collines', 'Travellers in checked blankets and hats on the hills')},
      {src: 'assets/img/bigogwe-3.jpg', alt: T('Deux voyageuses en chapeau et bâton de berger sur la colline', 'Two travellers with hats and herder’s sticks on the hill')},
      {src: 'assets/img/bigogwe-4.jpg', alt: T('Voyageuses assises dans l’herbe, bottes vertes et bâtons de berger', 'Travellers sitting in the grass with green boots and herder’s sticks')},
      {src: 'assets/img/bigogwe-photo.jpg', alt: T('Une voyageuse en chapeau prend son amie en photo sur la colline', 'A traveller in a hat taking a photo of her friend on the hill')},
    ],
  },
  {
    key: 'kibuye', num: '05', title: 'Kibuye', meta: T('Lac Kivu . Château & bateau', 'Lake Kivu . Castle & boat'),
    color: '#16394a', zoom: 2.1, label: 'right',
    text: T('Monte le grand escalier au tapis rouge d’un château blanc perché sur la colline, puis embarque pour une balade en bateau entre les îles du lac Kivu. Arrêt photo au panneau Rwanda – Kongo et pause sur les rochers, au bord de l’eau.',
            'Climb the red-carpet staircase of a white castle perched on the hill, then hop on a boat ride between the islands of Lake Kivu. Photo stop at the Rwanda – Kongo sign and a break on the rocks by the water.'),
    tags: T(['Château', 'Bateau sur le lac', 'Îles'], ['Castle', 'Boat on the lake', 'Islands']),
    photos: [
      {src: 'assets/img/kibuye-chateau.jpg', pos: '55% center', alt: T('Le château blanc et son escalier au tapis rouge, sur la colline de Kibuye', 'The white castle and its red-carpet staircase on the hill in Kibuye')},
      {src: 'assets/img/kibuye-vaches.jpg', pos: '48% center', alt: T('Des vaches qui se baignent dans le lac Kivu, devant le bateau des voyageurs', 'Cows bathing in Lake Kivu in front of the travellers’ boat')},
      {src: 'assets/img/kibuye-bateau.jpg', alt: T('Trois voyageuses souriantes en gilet de sauvetage dans une pirogue orange', 'Three smiling travellers in life jackets in an orange canoe')},
      {src: 'assets/img/kibuye-groupe.jpg', alt: T('Le groupe au sommet, sur les rochers, avec le drapeau de la RD Congo', 'The group at the top, on the rocks, with the DR Congo flag')},
      {src: 'assets/img/kibuye-3.jpg', alt: T('Une voyageuse les bras ouverts à l’avant du bateau', 'A traveller with open arms at the front of the boat')},
      {src: 'assets/img/kibuye-4.jpg', alt: T('Une voyageuse devant le panneau Rwanda – Kongo', 'A traveller in front of the Rwanda – Kongo sign')},
      {src: 'assets/img/kibuye-6.jpg', alt: T('Trois voyageurs sur les rochers au bord du lac Kivu', 'Three travellers on the rocks by Lake Kivu')},
    ],
  },
  {
    key: 'nyungwe', num: '06', title: 'Nyungwe', meta: T('Forêt tropicale . Canopée', 'Rainforest . Canopy'),
    color: '#123224', zoom: 2.1, label: 'right',
    text: T('L’une des plus vieilles forêts d’Afrique. Tu marches sur une passerelle suspendue au-dessus des arbres, tu t’élances en tyrolienne, casque et harnais bien attachés, puis tu descends jusqu’à une cascade au cœur de la forêt.',
            'One of Africa’s oldest forests. You walk on a walkway suspended above the trees, fly down a zipline with your helmet and harness strapped on, then head down to a waterfall deep in the forest.'),
    tags: T(['Passerelle de la canopée', 'Tyrolienne jusqu’à 1 020 m', 'Cascade'], ['Canopy walkway', 'Zipline up to 1,020 m', 'Waterfall']),
    photos: [
      {src: 'assets/img/nyungwe-1.jpg', alt: T('Un voyageur sur la passerelle suspendue au-dessus de la forêt de Nyungwe', 'A traveller on the suspended walkway above Nyungwe forest')},
      {src: 'assets/img/nyungwe-passerelle.jpg', alt: T('Selfie du groupe sur la passerelle de la canopée', 'Group selfie on the canopy walkway')},
      {src: 'assets/img/nyungwe-2.jpg', alt: T('Le groupe au pied d’une grande cascade dans la forêt', 'The group at the foot of a tall waterfall in the forest')},
      {src: 'assets/img/nyungwe-3.jpg', alt: T('Le groupe en casques et harnais au départ de la tyrolienne', 'The group in helmets and harnesses at the start of the zipline')},
      {src: 'assets/img/nyungwe-4.jpg', alt: T('Deux voyageurs devant la cascade', 'Two travellers in front of the waterfall')},
    ],
  },
  {
    key: 'akagera', num: '07', title: 'Akagera', meta: T('Savane . Safari', 'Savanna . Safari'),
    color: '#4a3f1e', zoom: 2.0, label: 'left',
    text: T('Le parc des « Big Five ». Tu parcours la savane à la rencontre des girafes et des antilopes, tu pique-niques face au lac, et tu repars avec ta photo souvenir dans le cadre du parc.',
            'The “Big Five” park. You cross the savanna to meet giraffes and antelopes, have a picnic facing the lake, and leave with your souvenir photo in the park’s frame.'),
    tags: T(['Safari', 'Girafes', 'Pique-nique face au lac'], ['Safari', 'Giraffes', 'Lakeside picnic']),
    photos: [
      {src: 'assets/img/akagera-girafes.jpg', alt: T('Un voyageur face à deux girafes dans la savane d’Akagera', 'A traveller facing two giraffes in the Akagera savanna')},
      {src: 'assets/img/akagera-2.jpg', alt: T('Trois girafes sous un acacia dans le parc de l’Akagera', 'Three giraffes under an acacia in Akagera park')},
      {src: 'assets/img/akagera-3.jpg', alt: T('Deux antilopes cobes dans l’herbe verte de la savane', 'Two kob antelopes in the green savanna grass')},
      {src: 'assets/img/akagera-4.jpg', alt: T('Un voyageur dans le cadre photo du parc, face au lac', 'A traveller in the park’s photo frame, facing the lake')},
    ],
  },
];

/* Deux façons de voyager */
window.FORMULAS = [
  {
    title: T('En groupe', 'As a group'),
    text: T('Rejoins la prochaine sortie avec d’autres voyageurs', 'Join the next trip with other travellers'),
    message: T('Bonjour RAYMKAS, je voudrais recevoir les dates des prochaines sorties en groupe.', 'Hello RAYMKAS, I’d like the dates of the next group trips.'),
  },
  {
    title: T('En privé', 'Private'),
    text: T('Tes dates, tes expériences, ta famille ou ton équipe', 'Your dates, your experiences, your family or your team'),
    message: T('Bonjour RAYMKAS, je voudrais organiser un voyage privé.', 'Hello RAYMKAS, I’d like to organise a private trip.'),
  },
];

/* Questions fréquentes (section avant « On part quand ? ») */
window.FAQ = [
  {q: T('Qu’est-ce qui est compris dans le prix ?', 'What’s included in the price?'),
   a: T('Le transport depuis Goma ou Bukavu, un guide pendant toute la sortie et un photographe pour tes souvenirs.',
        'Transport from Goma or Bukavu, a guide for the whole trip and a photographer for your memories.')},
  {q: T('D’où part-on, et combien de temps dure une sortie ?', 'Where do we leave from, and how long is a trip?'),
   a: T('Toutes les sorties partent de Goma et de Bukavu. Pour le Rwanda, on passe la frontière à Rubavu depuis Goma, ou à Rusizi depuis Bukavu ; Tchibati, Tchegera et Kashusha sont en RD Congo. Selon l’expérience, la sortie dure une journée ou un week-end.',
        'Every trip leaves from both Goma and Bukavu. For Rwanda, we cross the border at Rubavu from Goma, or at Rusizi from Bukavu; Tchibati, Tchegera and Kashusha are in DR Congo. Depending on the experience, a trip lasts a day or a weekend.')},
  {q: T('Qu’est-ce que je dois prévoir ?', 'What should I bring?'),
   a: T('Une pièce d’identité valide pour les sorties au Rwanda, de bonnes chaussures et une veste : il fait frais à Bigogwe et à Nyungwe.',
        'A valid ID for trips to Rwanda, good shoes and a jacket: it’s chilly in Bigogwe and Nyungwe.')},
];
