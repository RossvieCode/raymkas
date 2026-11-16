/* ===================================================================
   Page « Prochaine sortie » : carte du trajet (Goma et Bukavu vers la
   destination) + fiche avec date, prix, ce qui est compris et
   réservation WhatsApp. Les sorties sont dans content.js (UPCOMING).
   =================================================================== */
(() => {
  const {SITE, STOPS, ORIGINS, NEXT, MAP_DATA: MAP} = window;
  const PTS = Object.assign({}, MAP.pts, window.MAP_PTS);
  const $ = s => document.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const wa = msg => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = SITE.brand);
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.href = wa(`Bonjour ${SITE.brand}, je voudrais connaître les prochaines sorties.`); el.target = '_blank'; el.rel = 'noopener';
  });

  const trips = NEXT.trips;
  const t0 = trips[0];
  const stop = t0 && STOPS.find(s => s.key === t0.key);
  const color = (stop && stop.color) || SITE.overviewColor;
  document.documentElement.style.setProperty('--bg', color);
  document.documentElement.style.backgroundColor = color;
  document.querySelector('meta[name="theme-color"]').content = color;

  /* ---------- aucune sortie annoncée ---------- */
  if (!t0) {
    $('#sCount').textContent = 'Bientôt';
    $('#sMapWrap').remove();
    $('#sTrips').innerHTML = `<div class="trip trip-empty"><div class="trip-body">
      <p class="trip-text">Pas de sortie annoncée pour le moment. Écris-nous sur WhatsApp : on te prévient dès que les prochaines dates sont fixées.</p>
      <div class="trip-cta"><a class="btn btn-sun" data-whatsapp>Être prévenu sur WhatsApp</a></div></div></div>`;
    const b = $('#sTrips [data-whatsapp]');
    b.href = wa(`Bonjour ${SITE.brand}, je voudrais être prévenu(e) des prochaines sorties.`); b.target = '_blank'; b.rel = 'noopener';
    return;
  }
  document.title = `${t0.title}, ${NEXT.longDate(t0).toLowerCase()} · ${SITE.brand}`;
  $('#sCount').textContent = NEXT.countdown(t0);
  // la date en grand, en jaune, sous le titre
  $('#sDateBig').textContent = t0.day.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long'});
  $('#sDateSub').textContent = `${t0.day.toLocaleDateString('fr-FR', {weekday: 'long'})} · ${t0.title} · ${t0.price}`;
  $('#sMap').setAttribute('aria-label', `Trajet depuis ${ORIGINS.map(o => o.title).join(' et ')} jusqu’à ${t0.title}`);

  /* ---------- carte : Goma et Bukavu vers la destination ---------- */
  const svg = $('#sMap');
  const dest = PTS[t0.key];
  const pts = [dest, ...ORIGINS.map(o => PTS[o.key])];
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs) - 120, x1 = Math.max(...xs) + 150, y0 = Math.min(...ys) - 60, y1 = Math.max(...ys) + 60;
  svg.setAttribute('viewBox', `${x0} ${y0} ${x1 - x0} ${y1 - y0}`);
  const curve = (a, b) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    return `M${a}Q${mx - dy * 0.18},${my + dx * 0.18} ${b}`;
  };
  const labels = [
    {t: 'RD Congo', x: x0 + 95, y: (y0 + y1) / 2},
    {t: 'Lac Kivu', x: 262, y: 545, cls: 'water'},
    {t: 'Rwanda', x: x1 - 70, y: y0 + 40},
  ];
  svg.innerHTML = `
    <path class="m-neigh" d="${MAP.neighbours}"/>
    <g class="m-prov">${Object.values(MAP.provinces).map(d => `<path d="${d}"/>`).join('')}</g>
    <path class="m-lakes" d="${MAP.lakes}"/>
    <path class="m-border" d="${MAP.rwanda}"/>
    ${labels.map(l => `<text class="m-label${l.cls ? ' ' + l.cls : ''}" x="${l.x}" y="${l.y}" text-anchor="middle">${esc(l.t.toUpperCase())}</text>`).join('')}
    ${ORIGINS.map(o => `<path class="m-route-base" stroke-width="1.4" d="${curve(PTS[o.key], dest)}"/>`).join('')}
    <g class="m-route">${ORIGINS.map(o => `<path class="s-leg" stroke-width="3" d="${curve(PTS[o.key], dest)}"/>`).join('')}</g>
    <g id="sPins"></g>`;
  // tracés qui avancent vers la destination au fil du défilement,
  // puis le bouton « Réserve maintenant » apparaît quand ils sont arrivés
  const legs = [...svg.querySelectorAll('.s-leg')].map(p => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len} ${len}`;
    return {p, len};
  });
  const mapWrap = $('#sMapWrap'), book = $('#sBook');
  let lastProg = -1;
  function drawRoute() {
    const r = mapWrap.getBoundingClientRect(), vh = innerHeight;
    // 0 quand le haut de la carte entre en bas de l'écran, 1 quand son bas atteint 75 % de l'écran
    const prog = reduced ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.25)));
    if (Math.abs(prog - lastProg) < 0.002) return;
    lastProg = prog;
    legs.forEach(l => { l.p.style.strokeDashoffset = l.len * (1 - prog); });
    mapWrap.classList.toggle('arrived', prog >= 0.98);
  }
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; drawRoute(); }); } };
  addEventListener('scroll', onScroll, {passive: true});
  addEventListener('resize', onScroll);
  drawRoute();
  book.addEventListener('click', e => {
    e.preventDefault();
    $('#sTrips').scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block: 'start'});
  });

  const pinsEl = svg.querySelector('#sPins');
  ORIGINS.forEach(o => {
    const [x, y] = PTS[o.key], below = o.label === 'below', left = o.label === 'left';
    const tx = below ? 0 : left ? -12 : 12, ty = below ? 22 : 4, anchor = below ? 'middle' : left ? 'end' : 'start';
    pinsEl.insertAdjacentHTML('beforeend', `<g class="pin origin active" transform="translate(${x},${y})">
      <g class="marker"><circle class="pulse" r="6"/><circle class="ring" r="6"/><circle class="dot" r="2.4"/></g>
      <text x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(o.title.toUpperCase())}</text></g>`);
  });
  pinsEl.insertAdjacentHTML('beforeend', `<g class="pin active" transform="translate(${dest[0]},${dest[1]})">
    <g class="marker"><path class="body" d="M0 0C-1.2-4.2-10-11.6-10-19.5a10 10 0 0 1 20 0C10-11.6 1.2-4.2 0 0z"/>
    <circle class="hole" cx="0" cy="-19.5" r="3.6"/></g>
    <text x="15" y="-15" text-anchor="start">${esc(t0.title.toUpperCase())}</text></g>`);

  /* ---------- fiche(s) ---------- */
  $('#sTrips').innerHTML = trips.map(t => {
    const longDate = NEXT.longDate(t);
    const msg = o => `Bonjour ${SITE.brand}, je veux réserver ma place pour ${t.title} le ${longDate.toLowerCase()} (${t.price}), départ de ${o}.`;
    return `<article class="trip">
      <figure class="trip-photo">
        <img src="${t.photo}" srcset="${t.photo.replace('.jpg', '-sm.jpg')} 720w, ${t.photo} 1200w" sizes="(min-width: 900px) 480px, 92vw" alt="${esc(t.photoAlt || t.title)}" decoding="async">
        <span class="trip-date"><b>${t.day.getDate()}</b><span>${esc(NEXT.monthShort(t))}</span></span>
      </figure>
      <div class="trip-body">
        <h2 class="display trip-name">${esc(t.title)}</h2>
        <p class="trip-when">${esc(longDate)} · Départ de ${t.origins.map(esc).join(' et ')}</p>
        <p class="trip-text">${esc(t.text)}</p>
        <div class="trip-price"><b class="display">${esc(t.price)}</b><span>${esc(t.priceNote)}</span></div>
        <ul class="trip-inc">${t.includes.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <div class="trip-cta">${t.origins.map(o => `<a class="btn btn-sun" href="${wa(msg(o))}" target="_blank" rel="noopener">Réserver depuis ${esc(o)}</a>`).join('')}</div>
      </div>
    </article>`;
  }).join('');
})();
