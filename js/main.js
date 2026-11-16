/* ===================================================================
   Moteur de la page
   - hero : diaporama du lac + nom de destination qui change
   - chiffres : compteur à rouleaux (odomètre) + listes qui défilent
   - carte sticky : la caméra suit l'expérience en cours de lecture,
     le tracé part de Goma ou Bukavu vers chaque destination
   Une seule boucle requestAnimationFrame pour la carte et la parallaxe.
   =================================================================== */
(() => {
  const {SITE, STOPS, STATS, CREATOR, FORMULAS, GOOD_TO_KNOW, ORIGINS, MAP_LABELS, MAP_DATA: MAP} = window;
  const PTS = Object.assign({}, MAP.pts, window.MAP_PTS);
  const $ = (s, el = document) => el.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const pad = n => String(n).padStart(2, '0');
  const wa = msg => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  const DEFAULT_MSG = `Bonjour ${SITE.brand}, je voudrais réserver une sortie.`;
  const fmt = (v, d) => v.toFixed(d).replace('.', ',');

  /* ---------------- contenu statique ---------------- */
  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = SITE.brand);
  document.querySelectorAll('[data-whatsapp]').forEach(el => { el.href = wa(DEFAULT_MSG); el.target = '_blank'; el.rel = 'noopener'; });
  document.querySelectorAll('[data-tiktok]').forEach(el => { el.href = CREATOR.url; el.target = '_blank'; el.rel = 'noopener'; });
  $('.foot-link').textContent = `${CREATOR.handle} sur TikTok`;
  $('#heroLead').textContent = SITE.heroLead;
  $('#heroSr').textContent = STOPS.map(s => s.title).join(', ');
  $('#heroIntro').textContent = SITE.intro;
  // Coordonnées affichées en clair (à recopier ou à appeler si le lien ne s'ouvre pas)
  const contact = [SITE.whatsappDisplay && `WhatsApp ${SITE.whatsappDisplay}`, SITE.email].filter(Boolean);
  $('#ctaMail').textContent = contact.join(' · ');
  $('#hudTotal').textContent = pad(STOPS.length);
  document.documentElement.style.setProperty('--bg', SITE.overviewColor);

  /* ---------------- hero : diaporama ---------------- */
  const heroBg = $('#heroBg'), bars = $('#slideBars');
  const wideScreen = matchMedia('(min-width: 900px)').matches;
  const slides = SITE.heroSlides.map((s, i) => {
    const img = new Image();
    img.alt = ''; img.decoding = 'async';
    // grand écran : variante paysage si elle existe ; téléphone : version légère (-sm)
    const src = wideScreen ? (s.srcWide || s.src) : s.src.replace('.jpg', '-sm.jpg');
    const pos = (wideScreen && s.posWide) || s.pos || 'center';
    img.dataset.src = src;
    img.style.objectPosition = pos;
    img.className = 'slide' + (i === 0 ? ' on' : '');
    img.onerror = () => { img.remove(); };
    heroBg.appendChild(img);
    return img;
  });
  // 1re photo tout de suite (préchargée dans le <head>), les suivantes dès qu'elle est affichée
  slides[0].fetchPriority = 'high';
  slides[0].src = slides[0].dataset.src;
  const loadRest = () => slides.slice(1).forEach(img => { img.src = img.dataset.src; });
  if (slides[0].complete) loadRest(); else { slides[0].addEventListener('load', loadRest, {once: true}); slides[0].addEventListener('error', loadRest, {once: true}); }
  const ready = img => img.isConnected && img.complete && img.naturalWidth > 0;
  bars.innerHTML = slides.map((_, i) => `<span class="bar${i === 0 ? ' on' : ''}"><i></i></span>`).join('');
  const barEls = [...bars.children];
  let slideIdx = 0;
  const SLIDE_MS = 3800;
  bars.style.setProperty('--slide-ms', SLIDE_MS + 'ms');
  function nextSlide() {
    let nxt = (slideIdx + 1) % slides.length;
    while (nxt !== slideIdx && !slides[nxt].isConnected) nxt = (nxt + 1) % slides.length;   // photo en erreur : on saute
    if (nxt === slideIdx || !ready(slides[nxt])) return;   // photo pas encore arrivée : on garde l'actuelle
    slides[slideIdx].classList.remove('on'); barEls[slideIdx].classList.remove('on');
    barEls.forEach((b, i) => b.classList.toggle('done', i < nxt));
    slideIdx = nxt;
    slides[slideIdx].classList.add('on');
    void barEls[slideIdx].offsetWidth;            // relance l'animation de la barre
    barEls[slideIdx].classList.add('on');
  }
  const heroVisible = () => !document.hidden && scrollY < innerHeight;   // pas d'animation hors écran
  if (!reduced && slides.length > 1) setInterval(() => { if (heroVisible()) nextSlide(); }, SLIDE_MS);

  /* ---------------- hero : destination qui change ---------------- */
  const wordEl = $('#heroWord');
  const words = STOPS.map(s => s.title);
  function showWord(w) {
    wordEl.innerHTML = [...w].map((c, i) => `<span class="ch" style="animation-delay:${i * 45}ms">${esc(c)}</span>`).join('');
  }
  let wordIdx = 0;
  showWord(words[0]);
  if (!reduced) setInterval(() => {
    if (!heroVisible()) return;
    wordEl.classList.add('out');
    setTimeout(() => { wordIdx = (wordIdx + 1) % words.length; wordEl.classList.remove('out'); showWord(words[wordIdx]); }, 380);
  }, 2600);

  /* ---------------- chiffres ---------------- */
  // Odomètre : chaque chiffre est une colonne qui roule jusqu'à sa valeur
  const odo = $('#odo');
  const T = STATS.travelers;
  odo.setAttribute('aria-label', `${T.n}${T.suffix}`);
  const digits = String(T.n).split('');
  odo.innerHTML = digits.map((d, i) => {
    const turns = 2 + i;                                        // les colonnes de droite roulent plus longtemps
    const seq = Array.from({length: turns * 10 + +d + 1}, (_, k) => k % 10);
    return `<span class="odo-col" data-steps="${seq.length - 1}" style="--i:${i}"><span class="odo-strip">${seq.map(n => `<span>${n}</span>`).join('')}</span></span>`;
  }).join('') + `<span class="odo-suf">${esc(T.suffix)}</span>`;
  $('#statTravelersL').textContent = T.label;
  function rollOdo() {
    odo.querySelectorAll('.odo-col').forEach(col => {
      const strip = col.firstElementChild, steps = +col.dataset.steps;
      strip.style.transform = `translateY(${-steps}em)`;
    });
  }
  // État de repos lisible (vignette, sans animation) : chiffres finaux visibles
  odo.querySelectorAll('.odo-col').forEach(col => {
    col.firstElementChild.style.transition = 'none';
    col.firstElementChild.style.transform = `translateY(${-col.dataset.steps}em)`;
  });

  $('#statDestN').textContent = STOPS.length;
  $('#statDestL').textContent = STATS.destinations.label;
  $('#destTicker').innerHTML = STOPS.map((s, i) => `<li class="${i === 0 ? 'on' : ''}">${esc(s.title)}</li>`).join('');
  $('#statOriginN').textContent = STATS.origins.names.length;
  $('#statOriginL').textContent = STATS.origins.label;
  $('#originTicker').innerHTML = STATS.origins.names.map((n, i) => `<li class="${i === 0 ? 'on' : ''}">${esc(n)}</li>`).join('');
  function cycleTicker(ul, ms) {
    const items = [...ul.children]; let i = 0;
    if (reduced || items.length < 2) { items.forEach(li => li.classList.add('on')); return; }
    setInterval(() => {
      if (document.hidden) return;
      items[i].classList.remove('on'); i = (i + 1) % items.length; items[i].classList.add('on');
    }, ms);
  }
  cycleTicker($('#destTicker'), 1500);
  cycleTicker($('#originTicker'), 2100);

  function countUp(el, n, suf, decimals = 0, dur = 1400) {
    const t0 = performance.now(); dur = reduced ? 0 : dur;
    const step = now => {
      const p = dur ? Math.min((now - t0) / dur, 1) : 1;
      el.textContent = fmt(n * (1 - Math.pow(1 - p, 3)), decimals) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- expériences ---------------- */
  $('#stops').innerHTML = STOPS.map(s => `
    <article class="stop reveal" data-key="${s.key}" style="--stop-c:${s.color}">
      <div class="stop-title">
        <span class="display num">${s.num}</span>
        <h3 class="display name">${esc(s.title)}</h3>
        <span class="caps meta">${esc(s.meta)}</span>
      </div>
      <div class="strip" tabindex="0" aria-label="Photos de ${esc(s.title)}">
        ${s.photos.map((p, i) => `<figure class="shot"><img src="${p.src}" srcset="${p.src.replace('.jpg', '-sm.jpg')} 720w, ${p.src} 1200w" sizes="(min-width: 700px) 370px, 82vw" alt="${esc(p.alt)}" loading="lazy" decoding="async"></figure>`).join('')}
      </div>
      <div class="strip-bar">
        <span class="caps strip-count"><b>01</b> / ${pad(s.photos.length)}</span>
        <span class="strip-nav">
          <button class="nav-btn" data-dir="-1" aria-label="Photo précédente"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5"/></svg></button>
          <button class="nav-btn" data-dir="1" aria-label="Photo suivante"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5"/></svg></button>
        </span>
      </div>
      <p>${esc(s.text)}</p>
      <div class="tags">${s.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="actions">
        <a class="btn btn-solid" href="${wa(`Bonjour ${SITE.brand}, je suis intéressé(e) par l’expérience ${s.title}.`)}" target="_blank" rel="noopener">Réserver ${esc(s.title)}</a>
      </div>
    </article>`).join('');
  document.querySelectorAll('.shot img').forEach(img => {
    img.addEventListener('error', () => { img.parentNode.classList.add('missing'); img.remove(); });
  });

  // galerie : on charge toutes ses photos (même celles hors écran à droite) un peu avant qu'elle arrive à l'écran
  const warm = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
    warm.unobserve(e.target);
  }), {rootMargin: '150% 0px'});
  document.querySelectorAll('.stop').forEach(s => warm.observe(s));

  /* carrousels photo */
  document.querySelectorAll('.stop').forEach(stop => {
    const strip = $('.strip', stop), count = $('.strip-count b', stop), shots = [...strip.children];
    const current = () => {
      const x = strip.scrollLeft; let best = 0, d = Infinity;
      shots.forEach((s, i) => { const dd = Math.abs(s.offsetLeft - shots[0].offsetLeft - x); if (dd < d) { d = dd; best = i; } });
      return best;
    };
    const [prev, next] = stop.querySelectorAll('.nav-btn');
    const sync = () => {
      const i = current();
      count.textContent = pad(i + 1);
      prev.disabled = i === 0;
      next.disabled = i === shots.length - 1 || strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
    };
    sync();
    let t; strip.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(sync, 60); }, {passive: true});
    stop.querySelectorAll('.nav-btn').forEach(b => b.addEventListener('click', () => {
      const i = Math.min(Math.max(current() + +b.dataset.dir, 0), shots.length - 1);
      strip.scrollTo({left: shots[i].offsetLeft - shots[0].offsetLeft, behavior: reduced ? 'auto' : 'smooth'});
    }));
  });

  /* choix final : groupe ou privé, chacun ouvre WhatsApp avec son message */
  $('#ctaChoices').innerHTML = FORMULAS.map((f, i) => `
    <a class="choice ${i === 0 ? 'choice-main' : ''}" href="${wa(f.message)}" target="_blank" rel="noopener">
      <span class="display choice-title">${esc(f.title)}</span>
      <span class="choice-text">${esc(f.text)}</span>
      <svg class="choice-arrow" viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
    </a>`).join('');

  /* bouton flottant : après le hero, jamais en même temps que la section finale */
  const floatCta = $('#floatCta'), ctaSection = $('#cta');
  let ctaInView = false;
  new IntersectionObserver(([e]) => { ctaInView = e.isIntersecting; updateFloat(); }).observe(ctaSection);
  function updateFloat() { floatCta.classList.toggle('show', scrollY > innerHeight * 0.8 && !ctaInView); }

  $('#creatorQuote').textContent = `« ${CREATOR.quote} »`;
  $('#creatorText').textContent = CREATOR.text;
  $('#creatorBtn').textContent = `Suivre ${CREATOR.handle}`;
  $('#creatorStats').innerHTML = CREATOR.stats.map(s => `
    <div class="cstat"><span class="display cstat-n" data-n="${s.n}" data-d="${s.decimals}" data-suffix="${esc(s.suffix)}">${fmt(s.n, s.decimals)}${esc(s.suffix)}</span>
    <span class="caps stat-l">${esc(s.label)}</span></div>`).join('');

  $('#knowGrid').innerHTML = GOOD_TO_KNOW.map(k => `
    <div class="card reveal"><h3>${esc(k.title)}</h3><p>${esc(k.text)}</p></div>`).join('');

  /* ---------------- carte ---------------- */
  const cam = $('#cam');
  cam.innerHTML = `
    <path class="m-neigh" d="${MAP.neighbours}"/>
    <g class="m-prov">${Object.values(MAP.provinces).map(d => `<path d="${d}"/>`).join('')}</g>
    <path class="m-lakes" d="${MAP.lakes}"/>
    <path class="m-border" d="${MAP.rwanda}"/>
    <g id="routeBase"></g><g class="m-route" id="route"></g>
    <g id="labels"></g><g id="pins"></g>`;

  // Un tracé par expérience : de la ville de départ vers la destination (courbe douce)
  const curve = (a, b) => {
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, dx = b[0] - a[0], dy = b[1] - a[1];
    const bend = 0.18;
    return `M${a}Q${mx - dy * bend},${my + dx * bend} ${b}`;
  };
  // Chaque expérience part de Goma ET de Bukavu : deux tracés par destination
  const legs = [];
  const routeBase = $('#routeBase'), route = $('#route');
  STOPS.forEach((s, stopIdx) => ORIGINS.forEach(o => {
    const d = curve(PTS[o.key], PTS[s.key]);
    const b = document.createElementNS(NS, 'path'); b.setAttribute('d', d); b.setAttribute('class', 'm-route-base');
    routeBase.appendChild(b);
    const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); route.appendChild(p);
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len} ${len}`;
    legs.push({el: p, len, stopIdx});
  }));

  // Noms discrets (taille constante à l'écran)
  const labelsEl = $('#labels'), labels = [];
  MAP_LABELS.forEach(l => {
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('class', 'm-label' + (l.cls ? ' ' + l.cls : '')); t.setAttribute('text-anchor', 'middle');
    t.textContent = l.t.toUpperCase();
    labelsEl.appendChild(t); labels.push({el: t, x: l.x, y: l.y});
  });

  // Repères : expériences (épingle) + villes de départ (cercle qui pulse)
  const pinsEl = $('#pins'), pins = {};
  const addPin = (key, title, side, origin) => {
    const [x, y] = PTS[key], right = side !== 'left', below = side === 'below';
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', origin ? 'pin origin' : 'pin');
    // libellé : à droite, à gauche, ou sous le point (évite le bord de l'écran)
    const tx = below ? 0 : right ? 12 : -12, ty = below ? 22 : 4, anchor = below ? 'middle' : right ? 'start' : 'end';
    g.innerHTML = origin
      ? `<g class="marker"><circle class="pulse" r="6"/><circle class="ring" r="6"/><circle class="dot" r="2.4"/></g>
         <text x="${tx}" y="${ty}" text-anchor="${anchor}">${esc(title.toUpperCase())}</text>`
      : `<g class="marker">
          <path class="body" d="M0 0C-1.2-4.2-10-11.6-10-19.5a10 10 0 0 1 20 0C10-11.6 1.2-4.2 0 0z"/>
          <circle class="hole" cx="0" cy="-19.5" r="3.6"/></g>
         <text x="${right ? 15 : -15}" y="-15" text-anchor="${right ? 'start' : 'end'}">${esc(title.toUpperCase())}</text>`;
    pinsEl.appendChild(g);
    pins[key] = {g, x, y};
  };
  ORIGINS.forEach(o => addPin(o.key, o.title, o.label, true));
  STOPS.forEach(s => addPin(s.key, s.title, s.label, false));

  /* ---------------- caméra ---------------- */
  const svg = $('#mapSvg'), stage = $('#stage');
  const CAMS = {all: {x: 470, y: 500, z: 1.0}};
  STOPS.forEach(s => {
    // cadre la destination et les deux villes de départ, centre légèrement tiré vers la destination
    const pts = [PTS[s.key], ...ORIGINS.map(o => PTS[o.key])];
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const [dx, dy] = PTS[s.key];
    const z = Math.min(s.zoom, (MAP.W - 260) / (x1 - x0 + 180), (MAP.H - 240) / (y1 - y0 + 200));
    CAMS[s.key] = {x: ((x0 + x1) + dx) / 3, y: ((y0 + y1) + dy) / 3 - 10, z};
  });
  let vw = 0, vh = 0, base = 1;
  function resize() {
    vw = stage.clientWidth; vh = stage.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
    base = Math.min(vw / (MAP.W - 260), (vh - 40) / (MAP.H - 240));
  }
  const cur = {x: CAMS.all.x, y: CAMS.all.y, lz: 0, prog: 0};
  let target = CAMS.all, targetProg = 0, stateKey = '';

  function applyCam() {
    const s = base * Math.exp(cur.lz);
    cam.setAttribute('transform', `translate(${vw / 2} ${vh / 2 + 14}) scale(${s}) translate(${-cur.x} ${-cur.y})`);
    for (const k in pins) { const p = pins[k]; p.g.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${1 / s})`); }
    labels.forEach(l => l.el.setAttribute('transform', `translate(${l.x} ${l.y}) scale(${1 / s})`));
    routeBase.style.strokeWidth = 1.4 / s; routeBase.style.strokeDasharray = `${1 / s} ${6 / s}`;
    route.style.strokeWidth = 2.6 / s;
    legs.forEach(l => {
      const f = Math.min(Math.max(cur.prog - l.stopIdx, 0), 1);
      l.el.style.strokeDashoffset = l.len * (1 - f);
    });
  }

  /* ---------------- état selon le défilement ---------------- */
  const journey = $('#journey');
  const stopEls = [...document.querySelectorAll('.stop')];
  const endEl = $('#creator');
  const hudNum = $('#hudNum'), hudName = $('#hudName');
  const OVERVIEW_NAME = `${STATS.origins.names.join(' . ')} → ${STOPS.length} expériences`;
  hudName.textContent = OVERVIEW_NAME;

  function pickState() {
    const h = innerHeight, ref = h * 0.66;
    if (endEl.getBoundingClientRect().top < h * 0.7) return 'end';
    let pick = 'all';
    for (const el of stopEls) if (el.getBoundingClientRect().top < ref) pick = el.dataset.key;
    return pick;
  }
  function setState(key) {
    if (key === stateKey) return;
    stateKey = key;
    const idx = STOPS.findIndex(s => s.key === key);
    const overview = idx < 0;
    target = overview ? CAMS.all : CAMS[key];
    targetProg = key === 'end' ? STOPS.length : overview ? 0 : idx + 1;
    journey.classList.toggle('overview', overview);
    stopEls.forEach(el => el.classList.toggle('active', el.dataset.key === key));
    const active = STOPS[idx];
    for (const k in pins) pins[k].g.classList.toggle('active', k === key || (!!active && ORIGINS.some(o => o.key === k)));
    document.documentElement.style.setProperty('--bg', active ? active.color : SITE.overviewColor);
    hudNum.textContent = overview ? (key === 'end' ? pad(STOPS.length) : '00') : active.num;
    hudName.classList.add('swap');
    setTimeout(() => {
      hudName.textContent = active ? active.title :(key === 'end' ? 'Toutes nos expériences' : OVERVIEW_NAME);
      hudName.classList.remove('swap');
    }, 200);
  }

  /* ---------------- parallaxe du hero ---------------- */
  const heroC = $('#heroContent'), heroDim = $('#heroDim');
  function parallax(y) {
    const h = innerHeight;
    if (y > h * 1.2) return;
    const p = Math.min(Math.max(y / h, 0), 1);
    heroBg.style.transform = `translate3d(0,${y * 0.35}px,0)`;
    heroC.style.transform = `translate3d(0,${y * -0.12}px,0)`;
    heroC.style.opacity = 1 - Math.max(0, p - 0.3) * 1.5;
    heroDim.style.opacity = p * 0.75;
  }

  /* ---------------- boucle principale ---------------- */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const k = reduced ? 1 : 1 - Math.exp(-dt * 4.2);
    cur.x += (target.x - cur.x) * k;
    cur.y += (target.y - cur.y) * k;
    cur.lz += (Math.log(target.z) - cur.lz) * k;
    cur.prog += (targetProg - cur.prog) * (reduced ? 1 : 1 - Math.exp(-dt * 2.6));
    // ne recalcule que si la page a défilé ou si la carte bouge encore (économise la batterie)
    const y = scrollY;
    if (y !== lastY) { setState(pickState()); updateFloat(); if (!reduced) parallax(y); lastY = y; }
    const moving = Math.abs(target.x - cur.x) > .05 || Math.abs(target.y - cur.y) > .05
      || Math.abs(Math.log(target.z) - cur.lz) > .001 || Math.abs(targetProg - cur.prog) > .001;
    if (moving || dirty) { applyCam(); dirty = false; }
    requestAnimationFrame(frame);
  }
  let lastY = -1, dirty = true;

  /* ---------------- apparition au défilement ---------------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.contains(odo) && !reduced) {
      // remet les rouleaux à zéro puis les fait tourner
      odo.querySelectorAll('.odo-strip').forEach(s => { s.style.transition = 'none'; s.style.transform = 'translateY(0)'; });
      void odo.offsetWidth;
      odo.querySelectorAll('.odo-strip').forEach(s => s.style.transition = '');
      requestAnimationFrame(rollOdo);
    }
    if (e.target.classList.contains('creator-card')) e.target.querySelectorAll('.cstat-n').forEach(n => countUp(n, +n.dataset.n, n.dataset.suffix, +n.dataset.d));
  }), {rootMargin: '0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------------- typographie française : espaces insécables ---------------- */
  const fr = s => s.replace(/ ([:;?!»])/g, ' $1').replace(/« /g, '« ').replace(/(\d) (\d{3})\b/g, '$1 $2');
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) {
    if (/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) continue;
    const v = fr(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v;
  }

  addEventListener('resize', () => { resize(); dirty = true; lastY = -1; });
  resize(); applyCam(); requestAnimationFrame(frame);
})();
