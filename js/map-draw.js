/* =====================================================================
   Dessin de la carte, partagé par la page d'accueil et par
   prochaine-sortie.html : tracés (courbes) et repères (villes de
   départ + épingles des expériences).
   ===================================================================== */
(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));

  window.MAPDRAW = {
    /* courbe douce d'un point a vers un point b */
    curve(a, b) {
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
      const bend = 0.18;
      return `M${a}Q${mx - dy * bend},${my + dx * bend} ${b}`;
    },
    /* ville de départ : cercle qui pulse ; libellé à droite, à gauche ou sous le point */
    originPin(title, side) {
      const below = side === 'below', left = side === 'left';
      const tx = below ? 0 : left ? -12 : 12, ty = below ? 22 : 4, anchor = below ? 'middle' : left ? 'end' : 'start';
      return `<g class="marker"><circle class="pulse" r="6"/><circle class="ring" r="6"/><circle class="dot" r="2.4"/></g>
        <text x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(title.toUpperCase())}</text>`;
    },
    /* expérience : épingle ; libellé à droite (par défaut) ou à gauche */
    destPin(title, side) {
      const right = side !== 'left';
      return `<g class="marker">
          <path class="body" d="M0 0C-1.2-4.2-10-11.6-10-19.5a10 10 0 0 1 20 0C10-11.6 1.2-4.2 0 0z"/>
          <circle class="hole" cx="0" cy="-19.5" r="3.6"/></g>
        <text x="${right ? 15 : -15}" y="-15" text-anchor="${right ? 'start' : 'end'}">${esc(title.toUpperCase())}</text>`;
    },
  };
})();
