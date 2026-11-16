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

  I18N.applyStatic('sortie.title', 'sortie.desc');
  I18N.switchers();
  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = SITE.brand);
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.href = wa(t('sortie.msgInfo', {brand: SITE.brand})); el.target = '_blank'; el.rel = 'noopener';
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
    $('#sCount').textContent = t('sortie.soon');
    $('#sMapWrap').remove();
    $('#sTrips').innerHTML = `<div class="trip trip-empty"><div class="trip-body">
      <p class="trip-text">${t('sortie.empty')}</p>
      <div class="trip-cta"><a class="btn btn-sun" data-whatsapp>${t('sortie.notify')}</a></div></div></div>`;
    const b = $('#sTrips [data-whatsapp]');
    b.href = wa(t('sortie.msgNotify', {brand: SITE.brand})); b.target = '_blank'; b.rel = 'noopener';
    return;
  }
  document.title = `${t0.title}, ${NEXT.longDate(t0)} · ${SITE.brand}`;
  // au-dessus du titre : jour, destination, prix ; à côté : la date « 29 NOV »
  $('#sCount').textContent = `${t0.day.toLocaleDateString(LOCALE, {weekday: 'long'})} · ${t0.title} · ${t0.price}`;
  $('#sBadgeDay').textContent = t0.day.getDate();
  $('#sBadgeMonth').textContent = NEXT.monthShort(t0);
  // compte à rebours simple jusqu'au jour de la sortie
  const cd = $('#sCountdown');
  cd.innerHTML = [t('sortie.days'), 'h', 'min', 's'].map(l => `<span class="cd-u"><b class="display">00</b><small>${l}</small></span>`).join('');
  const [cdD, cdH, cdM, cdS] = [...cd.querySelectorAll('b')], cdDLabel = cd.querySelector('small');
  const two = n => String(n).padStart(2, '0');
  let cdTimer = 0;
  function tick() {
    const ms = t0.day - Date.now();
    if (ms <= 0) { clearInterval(cdTimer); cd.innerHTML = `<span class="cd-today">${t('sortie.today')}</span>`; return; }
    const d = Math.floor(ms / 864e5), hh = Math.floor(ms / 36e5) % 24, mm = Math.floor(ms / 6e4) % 60, ss = Math.floor(ms / 1e3) % 60;
    cdD.textContent = two(d); cdH.textContent = two(hh); cdM.textContent = two(mm); cdS.textContent = two(ss);
    cdDLabel.textContent = d > 1 ? t('sortie.days') : t('sortie.day');
    cd.setAttribute('aria-label', t('sortie.cdAria', {d, h: hh}));
  }
  tick();
  cdTimer = setInterval(tick, 1000);

  /* ---------- carte : Goma et Bukavu vers la destination ---------- */
  const svg = $('#sMap');
  const dest = PTS[t0.key];
  const from = ORIGINS.filter(o => (t0.origins || []).some(n => n.toLowerCase() === o.key)), ORIG = from.length ? from : ORIGINS;
  const pts = [dest, ...ORIG.map(o => PTS[o.key])];
  $('#sMap').setAttribute('aria-label', t('sortie.mapAria', {o: ORIG.map(o => o.title).join(t('sortie.and')), d: t0.title}));
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs) - 120, x1 = Math.max(...xs) + 150, y0 = Math.min(...ys) - 60, y1 = Math.max(...ys) + 60;
  svg.setAttribute('viewBox', `${x0} ${y0} ${x1 - x0} ${y1 - y0}`);
  const {curve, originPin, destPin} = window.MAPDRAW;
  const labels = [
    {t: T('RD Congo', 'DR Congo'), x: x0 + 95, y: (y0 + y1) / 2},
    {t: T('Lac Kivu', 'Lake Kivu'), x: 262, y: 545, cls: 'water'},
    {t: 'Rwanda', x: x1 - 70, y: y0 + 40},
  ];
  svg.innerHTML = `
    <path class="m-neigh" d="${MAP.neighbours}"/>
    <g class="m-prov">${Object.values(MAP.provinces).map(d => `<path d="${d}"/>`).join('')}</g>
    <path class="m-lakes" d="${MAP.lakes}"/>
    <path class="m-border" d="${MAP.rwanda}"/>
    ${labels.map(l => `<text class="m-label${l.cls ? ' ' + l.cls : ''}" x="${l.x}" y="${l.y}" text-anchor="middle">${esc(l.t.toUpperCase())}</text>`).join('')}
    ${ORIG.map(o => `<path class="m-route-base" stroke-width="1.4" d="${curve(PTS[o.key], dest)}"/>`).join('')}
    <g class="m-route">${ORIG.map(o => `<path class="s-leg" stroke-width="3" d="${curve(PTS[o.key], dest)}"/>`).join('')}</g>
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
    const atBottom = scrollY + vh >= document.documentElement.scrollHeight - 4;
    const prog = reduced || atBottom ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.1)));
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
  ORIG.forEach(o => {
    const [x, y] = PTS[o.key];
    pinsEl.insertAdjacentHTML('beforeend', `<g class="pin origin active" transform="translate(${x},${y})">${originPin(o.title, o.label)}</g>`);
  });
  const stopDef = STOPS.find(st => st.key === t0.key);
  pinsEl.insertAdjacentHTML('beforeend', `<g class="pin active" transform="translate(${dest[0]},${dest[1]})">${destPin(t0.title, stopDef && stopDef.label)}</g>`);

  /* ---------- fiche(s) ---------- */
  $('#sTrips').innerHTML = trips.map(trip => {
    const longDate = NEXT.longDate(trip);
    const msg = o => t('sortie.msgBook', {brand: SITE.brand, t: trip.title, date: LANG === 'en' ? longDate : longDate.toLowerCase(), p: trip.price, o});
    return `<article class="trip">
      <figure class="trip-photo">
        <img src="${trip.photo}" srcset="${trip.photo.replace('.jpg', '-sm.jpg')} 720w, ${trip.photo} 1200w" sizes="(min-width: 900px) 480px, 92vw" alt="${esc(trip.photoAlt || trip.title)}" decoding="async">
        <span class="trip-date"><b>${trip.day.getDate()}</b><span>${esc(NEXT.monthShort(trip))}</span></span>
      </figure>
      <div class="trip-body">
        <h2 class="display trip-name">${esc(trip.title)}</h2>
        <p class="trip-when">${esc(longDate)} · ${t('sortie.from', {o: trip.origins.map(esc).join(t('sortie.and'))})}</p>
        <p class="trip-text">${esc(trip.text)}</p>
        <div class="trip-price"><b class="display">${esc(trip.price)}</b><span>${esc(trip.priceNote)}</span></div>
        <ul class="trip-inc">${trip.includes.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <div class="trip-cta">${trip.origins.map(o => `<a class="btn btn-sun" href="${wa(msg(o))}" target="_blank" rel="noopener">${t('sortie.bookFrom', {o: esc(o)})}</a>`).join('')}</div>
      </div>
    </article>`;
  }).join('');
})();
