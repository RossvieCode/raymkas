/* =====================================================================
   Prochaines sorties : outils partagés par la page d'accueil et par
   la page prochaine-sortie.html. Les sorties sont dans content.js
   (window.UPCOMING) ; celles dont la date est passée sont ignorées.
   ===================================================================== */
(() => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmt = (d, o) => d.toLocaleDateString(window.LOCALE || 'fr-FR', o);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  window.NEXT = {
    trips: (window.UPCOMING || [])
      .map(t => ({...t, day: parseDay(t.date)}))
      .filter(t => t.day >= today)
      .sort((a, b) => a.day - b.day),
    shortDate: t => fmt(t.day, {day: 'numeric', month: 'short'}).replace(/\s/g, ' '), // 6 déc. (insécable : jamais coupé)
    longDate: t => cap(fmt(t.day, {weekday: 'long', day: 'numeric', month: 'long'})),     // Dimanche 29 novembre
    monthShort: t => fmt(t.day, {month: 'short'}).replace('.', ''),                       // nov
    countdown: trip => {
      const n = Math.round((trip.day - today) / 864e5);
      return n === 0 ? t('cd.today') : n === 1 ? t('cd.tomorrow') : t('cd.inDays', {n});
    },
    page: window.I18N.withLang('prochaine-sortie.html'),
  };
})();
