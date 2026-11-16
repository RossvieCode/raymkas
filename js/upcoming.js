/* =====================================================================
   Prochaines sorties : outils partagés par la page d'accueil et par
   la page prochaine-sortie.html. Les sorties sont dans content.js
   (window.UPCOMING) ; celles dont la date est passée sont ignorées.
   ===================================================================== */
(() => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const fmt = (d, o) => d.toLocaleDateString('fr-FR', o);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  window.NEXT = {
    trips: (window.UPCOMING || [])
      .map(t => ({...t, day: parseDay(t.date)}))
      .filter(t => t.day >= today)
      .sort((a, b) => a.day - b.day),
    shortDate: t => fmt(t.day, {day: 'numeric', month: 'short'}),                         // 29 nov.
    longDate: t => cap(fmt(t.day, {weekday: 'long', day: 'numeric', month: 'long'})),     // Dimanche 29 novembre
    monthShort: t => fmt(t.day, {month: 'short'}).replace('.', ''),                       // nov
    countdown: t => {
      const n = Math.round((t.day - today) / 864e5);
      return n === 0 ? 'C’est aujourd’hui' : n === 1 ? 'C’est demain' : `Dans ${n} jours`;
    },
    page: 'prochaine-sortie.html',
  };
})();
