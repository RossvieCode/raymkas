/* =====================================================================
   LANGUE : français (par défaut) ou anglais.
   - choix par l'URL (?lang=en / ?lang=fr), sinon le dernier choix du visiteur
   - T('texte FR', 'English text') : utilisé dans content.js
   - t('clé', {var}) : textes de l'interface (dictionnaire UI ci-dessous)
   - éléments HTML avec data-i18n="clé" : traduits au chargement
   ===================================================================== */
(() => {
  const KEY = 'raymkas-lang';
  const fromUrl = new URLSearchParams(location.search).get('lang');
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* stockage indisponible */ }
  const LANG = fromUrl === 'en' || fromUrl === 'fr' ? fromUrl : saved === 'en' ? 'en' : 'fr';
  try { localStorage.setItem(KEY, LANG); } catch (e) { /* stockage indisponible */ }
  document.documentElement.lang = LANG;

  window.LANG = LANG;
  window.LOCALE = LANG === 'en' ? 'en-GB' : 'fr-FR';
  window.T = (fr, en) => (LANG === 'en' && en != null ? en : fr);

  /* textes de l'interface : [français, anglais] ; {x} = valeur à insérer */
  const UI = {
    'meta.title': ['RAYMKAS Escapades', 'RAYMKAS Getaways'],
    'meta.desc': ['Au départ de Goma et Bukavu : Bigogwe, Kibuye, Kashusha, Nyungwe et Akagera. Transport, guide et photographe compris.',
                  'From Goma and Bukavu: Bigogwe, Kibuye, Kashusha, Nyungwe and Akagera. Transport, guide and photographer included.'],
    'nav.experiences': ['Expériences', 'Experiences'],
    'nav.lang': ['Langue', 'Language'],
    'hero.next': ['Prochaine sortie', 'Next trip'],
    'hero.nextOn': ['Prochaine sortie · {d}', 'Next trip · {d}'],
    'hero.seeExp': ['Voir les expériences', 'See the experiences'],
    'book.whatsapp': ['Réserver sur WhatsApp', 'Book on WhatsApp'],
    'msg.default': ['Bonjour {brand}, je voudrais réserver une sortie.', 'Hello {brand}, I’d like to book a trip.'],
    'next.label': ['Prochaine sortie', 'Next trip'],
    'sec.experiences': ['Nos expériences', 'Our experiences'],
    'sec.creator': ['Qui est derrière RAYMKAS', 'Who’s behind RAYMKAS'],
    'sec.faq': ['Questions fréquentes', 'Frequently asked questions'],
    'faq.moreTitle': ['Une autre question ?', 'Another question?'],
    'faq.moreText': ['Raymond te répond directement sur WhatsApp.', 'Raymond answers you directly on WhatsApp.'],
    'faq.moreBtn': ['Poser ma question', 'Ask my question'],
    'faq.moreMsg': ['Bonjour {brand}, j’ai une question : ', 'Hello {brand}, I have a question: '],
    'cta.title': ['On part quand ?', 'When do we leave?'],
    'cta.text': ['Choisis ta formule : on te répond sur WhatsApp avec le programme, le prix et les dates.',
                 'Pick your option: we’ll reply on WhatsApp with the programme, the price and the dates.'],
    'stop.photosOf': ['Photos de {x}', 'Photos of {x}'],
    'stop.prev': ['Photo précédente', 'Previous photo'],
    'stop.next': ['Photo suivante', 'Next photo'],
    'stop.msg': ['Bonjour {brand}, je suis intéressé(e) par l’expérience {x}.', 'Hello {brand}, I’m interested in the {x} experience.'],
    'stop.book': ['Réserver {x}', 'Book {x}'],
    'stop.nextOn': ['Prochaine sortie le {d} · {p}', 'Next trip on {d} · {p}'],
    'tt.follow': ['Suivre sur TikTok', 'Follow on TikTok'],
    'foot.tiktok': ['{h} sur TikTok', '{h} on TikTok'],
    'foot.tag': ['Des sorties au départ de Goma et Bukavu : transport, guide et photographe compris.',
                 'Trips from Goma and Bukavu: transport, guide and photographer included.'],
    'hud.overview': ['{o} → {n} expériences', '{o} → {n} experiences'],
    'hud.all': ['Toutes nos expériences', 'All our experiences'],
    /* page « Prochaine sortie » */
    'sortie.title': ['Prochaine sortie · RAYMKAS', 'Next trip · RAYMKAS'],
    'sortie.desc': ['La prochaine sortie RAYMKAS au départ de Goma et Bukavu : date, prix, ce qui est compris et réservation sur WhatsApp.',
                    'The next RAYMKAS trip from Goma and Bukavu: date, price, what’s included and booking on WhatsApp.'],
    'sortie.back': ['Accueil', 'Home'],
    'sortie.allExpShort': ['expériences', 'experiences'],
    'sortie.allExpLong': ['Toutes les ', 'All '],
    'sortie.h1': ['Prochaine sortie', 'Next trip'],
    'sortie.bookNow': ['Réserve maintenant', 'Book now'],
    'sortie.moreText': ['Une question, ou envie d’une sortie privée à une autre date ?', 'A question, or want a private trip on another date?'],
    'sortie.write': ['Écrire sur WhatsApp', 'Message us on WhatsApp'],
    'sortie.seeAll': ['Voir toutes les expériences', 'See all experiences'],
    'sortie.soon': ['Bientôt', 'Coming soon'],
    'sortie.empty': ['Pas de sortie annoncée pour le moment. Écris-nous sur WhatsApp : on te prévient dès que les prochaines dates sont fixées.',
                     'No trip announced yet. Message us on WhatsApp and we’ll let you know as soon as the next dates are set.'],
    'sortie.notify': ['Être prévenu sur WhatsApp', 'Get notified on WhatsApp'],
    'sortie.msgInfo': ['Bonjour {brand}, je voudrais connaître les prochaines sorties.', 'Hello {brand}, I’d like to know about the next trips.'],
    'sortie.msgNotify': ['Bonjour {brand}, je voudrais être prévenu(e) des prochaines sorties.', 'Hello {brand}, I’d like to be notified about the next trips.'],
    'sortie.msgBook': ['Bonjour {brand}, je veux réserver ma place pour {t} le {date} ({p}), départ de {o}.',
                       'Hello {brand}, I want to book my spot for {t} on {date} ({p}), leaving from {o}.'],
    'sortie.days': ['jours', 'days'],
    'sortie.day': ['jour', 'day'],
    'sortie.today': ['C’est aujourd’hui !', 'It’s today!'],
    'sortie.cdAria': ['Départ dans {d} jours et {h} heures', 'Departure in {d} days and {h} hours'],
    'sortie.mapAria': ['Trajet depuis {o} jusqu’à {d}', 'Route from {o} to {d}'],
    'sortie.and': [' et ', ' and '],
    'sortie.from': ['Départ de {o}', 'Departing from {o}'],
    'sortie.bookFrom': ['Réserver depuis {o}', 'Book from {o}'],
    'cd.today': ['C’est aujourd’hui', 'It’s today'],
    'cd.tomorrow': ['C’est demain', 'It’s tomorrow'],
    'cd.inDays': ['Dans {n} jours', 'In {n} days'],
  };
  window.t = (key, vars = {}) => {
    const v = UI[key];
    const s = v ? (LANG === 'en' ? v[1] : v[0]) : key;
    return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  };

  /* lien vers une page du site, en gardant la langue */
  const withLang = href => {
    if (LANG !== 'en' || !href || /^(https?:|mailto:|tel:|#)/.test(href) || /[?&]lang=/.test(href)) return href;
    const [path, hash] = href.split('#');
    return `${path}${path.includes('?') ? '&' : '?'}lang=en${hash != null ? '#' + hash : ''}`;
  };
  window.I18N = {
    withLang,
    /* textes statiques (data-i18n / data-i18n-aria) + titre et description de la page */
    applyStatic(titleKey, descKey) {
      document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
      document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
      if (titleKey) document.title = t(titleKey);
      const md = document.querySelector('meta[name="description"]');
      if (md && descKey) md.content = t(descKey);
    },
    /* liens internes : ajoute ?lang=en quand la page est en anglais */
    localizeLinks(root = document) {
      root.querySelectorAll('a[href]').forEach(a => {
        const h = a.getAttribute('href');
        if (/\.html|^\.\//.test(h)) a.setAttribute('href', withLang(h));
      });
    },
    /* sélecteur FR | EN */
    switchers() {
      document.querySelectorAll('[data-lang-switch]').forEach(box => {
        box.setAttribute('role', 'group');
        box.setAttribute('aria-label', t('nav.lang'));
        box.innerHTML = ['fr', 'en'].map(l =>
          `<a href="${location.pathname}?lang=${l}${location.hash}" hreflang="${l}" lang="${l}"${l === LANG ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`).join('');
      });
    },
  };
})();
