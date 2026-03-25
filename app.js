/* ══════════════════════════════════════
   BORHAN AUTO PARTS CENTRE — app.js
   ══════════════════════════════════════ */

/* ── ADMIN PASSWORD — CHANGE THIS ── */
const ADMIN_PASS = 'borhan2024';

/* ── APP STATE ── */
let S = { page: 'home', brand: null, model: null, cat: null, part: null, adminUnlocked: false };
let _histPushed = false;

/* ── BROWSER BACK / FORWARD ── */
window.addEventListener('popstate', function (e) {
  if (e.state && e.state.page) {
    const st = e.state;
    S = { ...S, page: st.page, brand: st.brand || null, model: st.model || null, cat: st.cat || null, part: st.part || null, adminUnlocked: false };
    _histPushed = true;
    renderCurrentPage();
    updateBreadcrumb();
    _histPushed = false;
  } else {
    S = { page: 'home', brand: null, model: null, cat: null, part: null, adminUnlocked: false };
    renderCurrentPage();
    updateBreadcrumb();
  }
});

/* ── HISTORY ── */
function pushState(page, extra) {
  if (_histPushed) return;
  const st = { page, brand: S.brand, model: S.model, cat: S.cat, part: S.part, ...extra };
  history.pushState(st, '', '#' + page + (S.brand ? '/' + encodeURIComponent(S.brand) : ''));
}

/* ── HELPERS ── */
function h(s) { let v = 0; for (let c of s) v = (v * 31 + c.charCodeAt(0)) & 0xffff; return v; }
function calcPrice(b, m, p) { return 150 + (h(b + m + p) % 4351); }
function calcStock(b, m, p) { return [3, 5, 8, 12, 15, 20, 25][h(b + m + p + b) % 7]; }
function calcSku(b, m, p) {
  const B = b.slice(0, 2).toUpperCase();
  const M = m.replace(/\s/g, '').slice(0, 3).toUpperCase();
  const P = p.replace(/\s/g, '').slice(0, 3).toUpperCase();
  return `${B}-${M}-${P}${(h(b + m + p) & 0xfff).toString(16).toUpperCase().padStart(3, '0')}`;
}
function skey(b, m, p) { return 'bap_' + calcSku(b, m, p); }
function loadPart(b, m, p) { try { return JSON.parse(localStorage.getItem(skey(b, m, p))) || {}; } catch { return {}; } }
function savePart(b, m, p, d) { localStorage.setItem(skey(b, m, p), JSON.stringify(d)); }

/* ── PAGE SWITCHING ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById('pg-' + id);
  pg.classList.add('active');
  pg.classList.remove('fade-in');
  void pg.offsetWidth;
  pg.classList.add('fade-in');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  switch (S.page) {
    case 'home':       renderHome();       showPage('home');       break;
    case 'brands':     renderBrands();     showPage('brands');     break;
    case 'models':     renderModels();     showPage('models');     break;
    case 'categories': renderCategories(); showPage('categories'); break;
    case 'parts':      renderParts();      showPage('parts');      break;
    case 'product':    renderProduct();    showPage('product');    break;
  }
}

/* ── BREADCRUMB ── */
function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  const items = [];
  if (S.page !== 'home') items.push({ l: 'Brands', fn: 'navBrands' });
  if (S.brand)  items.push({ l: S.brand, fn: 'navModels' });
  if (S.model)  items.push({ l: S.model, fn: 'navCats' });
  if (S.cat)    items.push({ l: S.cat, fn: 'navParts' });
  if (S.part)   items.push({ l: S.part.length > 18 ? S.part.slice(0, 16) + '…' : S.part, fn: null });
  bc.innerHTML = items.map((c, i) => `
    ${i > 0 ? '<span class="sep">›</span>' : ''}
    <button class="crumb${i === items.length - 1 ? ' cur' : ''}" ${c.fn ? `onclick="${c.fn}()"` : ''}>${c.l}</button>
  `).join('');
}

/* ── NAVIGATION FUNCTIONS ── */
function goHome()    { S = { page: 'home', brand: null, model: null, cat: null, part: null, adminUnlocked: false }; pushState('home'); renderHome(); updateBreadcrumb(); showPage('home'); }
function navBrands() { S = { ...S, page: 'brands', brand: null, model: null, cat: null, part: null, adminUnlocked: false }; pushState('brands'); renderBrands(); updateBreadcrumb(); showPage('brands'); }
function navModels() { S = { ...S, page: 'models', model: null, cat: null, part: null, adminUnlocked: false }; pushState('models'); renderModels(); updateBreadcrumb(); showPage('models'); }
function navCats()   { S = { ...S, page: 'categories', cat: null, part: null, adminUnlocked: false }; pushState('categories'); renderCategories(); updateBreadcrumb(); showPage('categories'); }
function navParts()  { S = { ...S, page: 'parts', part: null, adminUnlocked: false }; pushState('parts'); renderParts(); updateBreadcrumb(); showPage('parts'); }

function selectBrand(b) { S = { ...S, page: 'models', brand: b, model: null, cat: null, part: null }; pushState('models'); renderModels(); updateBreadcrumb(); showPage('models'); }
function selectModel(m) { S = { ...S, page: 'categories', model: m, cat: null, part: null }; pushState('categories'); renderCategories(); updateBreadcrumb(); showPage('categories'); }
function selectCat(c)   { S = { ...S, page: 'parts', cat: c, part: null }; pushState('parts'); renderParts(); updateBreadcrumb(); showPage('parts'); }
function selectPart(p)  { S = { ...S, page: 'product', part: p }; pushState('product'); renderProduct(); updateBreadcrumb(); showPage('product'); }

function waOrder(p) {
  const sk = calcSku(S.brand, S.model, p);
  const pr = calcPrice(S.brand, S.model, p);
  window.open('https://wa.me/8801707659954?text=' + encodeURIComponent(`I want to order:\nPart: ${p}\nBike: ${S.brand} ${S.model}\nSKU: ${sk}\nPrice: ৳${pr.toLocaleString()}`), '_blank');
}

/* ══════════════════════════════════════
   PAGE: HOME
   ══════════════════════════════════════ */
function renderHome() {
  document.getElementById('pg-home').innerHTML = `
  <div class="hero" style="background:linear-gradient(160deg,#111318 0%,#0d0f13 100%)">
    <div class="hero-grid"></div>
    <div class="hero-glow"></div>
    <div class="hero-inner">
      <div class="tag"><span class="dot"></span> Jessore's #1 Motorcycle Parts Shop</div>
      <h1>Borhan<em>Auto Parts</em>Centre</h1>
      <p class="hero-sub"><strong>100% Original Spare Parts</strong> for all major motorcycle brands. Located at <strong>RN Road, Jessore, Bangladesh</strong>. Fast delivery across the country.</p>
      <div class="hero-btns">
        <button class="btn-primary" onclick="navBrands()">🏍️ Browse Parts</button>
        <a class="btn-outline" href="https://wa.me/8801707659954" target="_blank" rel="noopener">💬 Order on WhatsApp</a>
      </div>
    </div>
  </div>

  <div class="stats-strip">
    <div class="stat-item"><div class="stat-num">6+</div><div class="stat-label">Top Brands</div></div>
    <div class="stat-item"><div class="stat-num">500+</div><div class="stat-label">Parts In Stock</div></div>
    <div class="stat-item"><div class="stat-num">7-Day</div><div class="stat-label">Easy Returns</div></div>
    <div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">Original Parts</div></div>
    <div class="stat-item"><div class="stat-num">BD-Wide</div><div class="stat-label">Fast Delivery</div></div>
  </div>

  <section id="products">
    <div class="sec-label">Available Brands</div>
    <h2>Parts for Every <span>Major Brand</span></h2>
    <p class="sec-desc">We stock genuine spare parts for all leading motorcycle manufacturers in Bangladesh.</p>
    <div class="brands-grid">
      ${Object.entries(BRANDS).map(([name, info]) => `
        <div class="brand-card" onclick="selectBrand('${name}')"
          style="border-color:${info.color}28"
          onmouseover="this.style.borderColor='${info.color}80';this.style.boxShadow='0 13px 38px ${info.color}20';this.querySelector('.bar').style.transform='scaleX(1)'"
          onmouseout="this.style.borderColor='${info.color}28';this.style.boxShadow='none';this.querySelector('.bar').style.transform='scaleX(0)'">
          <span class="card-emoji">${info.emoji}</span>
          <div class="card-title">${name}</div>
          <div class="card-sub">${info.models.length} Models · ${Object.keys(info.cats).length} Categories</div>
          <div class="bar" style="background:linear-gradient(90deg,${info.color},${info.color}77)"></div>
        </div>`).join('')}
    </div>
  </section>

  <section id="why" style="background:var(--sur);border-top:1px solid var(--bor);border-bottom:1px solid var(--bor)">
    <div class="sec-label">Why Choose Us</div>
    <h2>Your Trusted <span>Parts Partner</span></h2>
    <p class="sec-desc">We've been serving motorcycle owners in Jessore with honesty and quality for years.</p>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">✅</div><div class="why-title">100% Original Parts</div><div class="why-desc">Every part we sell is genuine, sourced directly from authorized distributors. No fakes, no compromises on quality.</div></div>
      <div class="why-card"><div class="why-icon">📦</div><div class="why-title">Fast Bangladesh Delivery</div><div class="why-desc">We deliver quickly across Jessore and all of Bangladesh. Order via WhatsApp and get your parts at your doorstep.</div></div>
      <div class="why-card"><div class="why-icon">🔄</div><div class="why-title">7-Day Easy Return</div><div class="why-desc">Not satisfied? We offer a hassle-free 7-day return policy on all parts purchased from our store.</div></div>
      <div class="why-card"><div class="why-icon">💬</div><div class="why-title">WhatsApp Support</div><div class="why-desc">Get instant help finding the right part. Message us on WhatsApp and our team responds quickly.</div></div>
      <div class="why-card"><div class="why-icon">🏍️</div><div class="why-title">All Major Brands</div><div class="why-desc">Whether you ride Bajaj, Honda, Yamaha, Suzuki, TVS or Hero — we have the right spare parts for your bike.</div></div>
      <div class="why-card"><div class="why-icon">📍</div><div class="why-title">Convenient Location</div><div class="why-desc">Centrally located on RN Road, Jessore. Easy for local customers to visit and pick up parts in person.</div></div>
    </div>
  </section>

  <section id="contact" class="contact-sec">
    <div class="sec-label">Get In Touch</div>
    <h2>Visit Us or <span>Order Online</span></h2>
    <p class="sec-desc">Come to our store in Jessore or message us on WhatsApp — we're always ready to help.</p>
    <div class="contact-grid">
      <div class="contact-items">
        <div class="contact-item"><div class="ci-icon">📍</div><div><div class="ci-lbl">Our Location</div><div class="ci-val">RN Road, Jessore, Bangladesh</div></div></div>
        <div class="contact-item"><div class="ci-icon">📞</div><div><div class="ci-lbl">Phone / WhatsApp</div><div class="ci-val"><a href="tel:+8801707659954">01707659954</a></div></div></div>
        <div class="contact-item"><div class="ci-icon">🕐</div><div><div class="ci-lbl">Business Hours</div><div class="ci-val">Saturday – Thursday: 9:00 AM – 8:00 PM</div></div></div>
        <div class="contact-item"><div class="ci-icon">🚀</div><div><div class="ci-lbl">Delivery</div><div class="ci-val">Available across Jessore &amp; all Bangladesh</div></div></div>
      </div>
      <div class="wa-box">
        <div class="wa-box-icon">💬</div>
        <div class="wa-box-title">Chat on WhatsApp</div>
        <div class="wa-box-sub">Tell us what part you need. We'll find it and deliver it fast!</div>
        <a class="wa-box-btn" href="https://wa.me/8801707659954" target="_blank" rel="noopener">Start Chat →</a>
      </div>
    </div>
    <div class="map-wrap">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116974.26!2d89.1!3d23.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff3370e3060a01%3A0xe2c8d6c34d2acf41!2sJessore%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000"
        allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        title="Borhan Auto Parts Centre – RN Road, Jessore, Bangladesh">
      </iframe>
    </div>
  </section>

  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo">BORHAN <span>AUTO</span> PARTS</div>
        <p class="footer-desc">Your trusted source for 100% original motorcycle spare parts in Jessore, Bangladesh. Serving riders across the country with quality and honesty.</p>
      </div>
      <div>
        <div class="footer-col-title">Quick Links</div>
        <ul class="footer-links">
          <li><button onclick="goHome()">Home</button></li>
          <li><button onclick="navBrands()">All Brands</button></li>
          <li><a href="#why">Why Choose Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Brands</div>
        <ul class="footer-links">
          ${Object.keys(BRANDS).map(b => `<li><button onclick="selectBrand('${b}')">${b} Parts</button></li>`).join('')}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© ${new Date().getFullYear()} <strong>Borhan Auto Parts Centre</strong>. All rights reserved. | RN Road, Jessore</div>
      <div class="footer-copy">WhatsApp: <strong>01707659954</strong></div>
    </div>
  </footer>`;
}

/* ══════════════════════════════════════
   PAGE: BRANDS LIST
   ══════════════════════════════════════ */
function renderBrands() {
  document.getElementById('pg-brands').innerHTML = `
  <div class="inner-page">
    <div class="inner-hero" style="background:linear-gradient(135deg,#111318 0%,#0a0c0f 100%)">
      <div class="inner-hero-grid"></div>
      <div class="inner-hero-inner">
        <div class="tag"><span class="dot"></span> Choose Your Brand</div>
        <h1>Select Your<br><em>Bike Brand</em></h1>
        <p class="hero-sub">Choose your motorcycle brand to browse 100% genuine spare parts.</p>
      </div>
    </div>
    <div class="pgrid pgrid-3">
      ${Object.entries(BRANDS).map(([name, info]) => `
        <div class="brand-card" onclick="selectBrand('${name}')"
          style="border-color:${info.color}28"
          onmouseover="this.style.borderColor='${info.color}80';this.style.boxShadow='0 13px 38px ${info.color}20';this.querySelector('.bar').style.transform='scaleX(1)'"
          onmouseout="this.style.borderColor='${info.color}28';this.style.boxShadow='none';this.querySelector('.bar').style.transform='scaleX(0)'">
          <span class="card-emoji">${info.emoji}</span>
          <div class="card-title">${name}</div>
          <div class="card-sub">${info.models.length} Models · ${Object.keys(info.cats).length} Categories</div>
          <div class="bar" style="background:linear-gradient(90deg,${info.color},${info.color}77)"></div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   PAGE: MODELS
   ══════════════════════════════════════ */
function renderModels() {
  const { brand } = S, info = BRANDS[brand];
  document.getElementById('pg-models').innerHTML = `
  <div class="inner-page">
    <div class="inner-hero" style="background:linear-gradient(135deg,#111318 0%,${info.color}18 100%)">
      <div class="inner-hero-grid"></div>
      <div class="inner-hero-inner">
        <div class="tag" style="color:${info.color};background:${info.color}20;border-color:${info.color}50">
          ${info.emoji} ${brand} Motorcycles
        </div>
        <h1>Select Your<br><em style="color:${info.color}">${brand} Model</em></h1>
        <p class="hero-sub">Choose your exact bike model to find perfectly matched parts.</p>
      </div>
    </div>
    <div class="pgrid pgrid-4">
      ${info.models.map(m => `
        <div class="model-card" onclick="selectModel('${m.replace(/'/g, "\\'")}')">
          <span class="card-emoji">🏍️</span>
          <div class="card-title">${m}</div>
          <div class="card-sub">${brand} · ${Object.keys(info.cats).length} Categories</div>
          <div class="bar" style="background:linear-gradient(90deg,${info.color},${info.color}66)"></div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   PAGE: CATEGORIES
   ══════════════════════════════════════ */
function renderCategories() {
  const { brand, model } = S, info = BRANDS[brand];
  document.getElementById('pg-categories').innerHTML = `
  <div class="inner-page">
    <div class="inner-hero" style="background:linear-gradient(135deg,#111318 0%,${info.color}18 100%)">
      <div class="inner-hero-grid"></div>
      <div class="inner-hero-inner">
        <div class="tag" style="color:${info.color};background:${info.color}20;border-color:${info.color}50">
          ${info.emoji} ${brand} — ${model}
        </div>
        <h1>Select<br><em style="color:${info.color}">Part Category</em></h1>
        <p class="hero-sub">Choose which system you need parts for on your ${model}.</p>
      </div>
    </div>
    <div class="pgrid pgrid-4" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
      ${Object.entries(info.cats).map(([cat, parts]) => `
        <div class="cat-card" onclick="selectCat('${cat}')"
          onmouseover="this.style.borderColor='${info.color}80';this.style.boxShadow='0 0 0 1px ${info.color}28';this.style.transform='translateY(-3px)'"
          onmouseout="this.style.borderColor='var(--bor)';this.style.boxShadow='none';this.style.transform='translateY(0)'">
          <div class="cat-icon-box" style="background:${info.color}20">${CAT_ICONS[cat] || '🔩'}</div>
          <div>
            <div class="cat-name">${cat}</div>
            <div class="cat-count">${parts.length} parts available</div>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   PAGE: PARTS LIST
   ══════════════════════════════════════ */
function renderParts(filter = '') {
  const { brand, model, cat } = S, info = BRANDS[brand];
  const parts = info.cats[cat];
  const filtered = filter ? parts.filter(p => p.toLowerCase().includes(filter.toLowerCase())) : parts;

  const cards = filtered.length ? `
    <div class="pgrid pgrid-5">
      ${filtered.map(p => {
        const pr = calcPrice(brand, model, p);
        const st = calcStock(brand, model, p);
        const sk = calcSku(brand, model, p);
        const safe = p.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `
        <div class="part-card" onclick="selectPart('${safe}')"
          onmouseover="this.style.borderColor='${info.color}80';this.style.boxShadow='0 7px 26px ${info.color}18'"
          onmouseout="this.style.borderColor='var(--bor)';this.style.boxShadow='none'">
          <div class="pt-top">
            <div class="pt-name">${p}</div>
            <div class="pt-price">৳${pr.toLocaleString()}</div>
          </div>
          <div class="pt-sku">SKU: ${sk}</div>
          <div class="pt-bot">
            <span class="stock-badge"><span class="sdot"></span>${st} in stock</span>
            <span class="ct-lbl">${cat}</span>
          </div>
          <button class="wa-order-btn" onclick="event.stopPropagation();waOrder('${safe}')">💬 Order on WhatsApp</button>
        </div>`;
      }).join('')}
    </div>` : `<div class="pgrid"><div class="no-res"><div class="big">🔍</div><p>No parts found for "${filter}"</p></div></div>`;

  document.getElementById('pg-parts').innerHTML = `
  <div class="inner-page">
    <div class="inner-hero" style="background:linear-gradient(135deg,#111318 0%,${info.color}18 100%)">
      <div class="inner-hero-grid"></div>
      <div class="inner-hero-inner">
        <div class="tag" style="color:${info.color};background:${info.color}20;border-color:${info.color}50">
          ${CAT_ICONS[cat] || '🔩'} ${brand} ${model} — ${cat}
        </div>
        <h1>Available<br><em style="color:${info.color}">Spare Parts</em></h1>
        <p class="hero-sub">${parts.length} original parts for ${model}. Click any part to view details &amp; order.</p>
      </div>
    </div>
    <div class="search-wrap">
      <input type="text" id="psearch" placeholder="🔍  Search ${cat} parts…" value="${filter}" oninput="renderParts(this.value)"/>
    </div>
    ${cards}
  </div>`;
}

/* ══════════════════════════════════════
   PAGE: PRODUCT DETAIL
   ══════════════════════════════════════ */
function renderProduct() {
  const { brand, model, cat, part } = S, info = BRANDS[brand];
  const pr = calcPrice(brand, model, part);
  const st = calcStock(brand, model, part);
  const sk = calcSku(brand, model, part);
  const saved = loadPart(brand, model, part);
  const desc     = saved.desc     || `Genuine original ${part} for ${brand} ${model}. Sourced directly from authorized distributors. Ensures optimal performance and maximum service life for your motorcycle.`;
  const partNo   = saved.partNo   || sk;
  const weight   = saved.weight   || '';
  const warranty = saved.warranty || '6 Months';
  const origin   = saved.origin   || 'India';
  const notes    = saved.notes    || '';
  const waMsg    = `I want to order:\nPart: ${part}\nBike: ${brand} ${model}\nSKU: ${sk}\nPrice: ৳${pr.toLocaleString()}`;

  const adminHtml = S.adminUnlocked ? `
    <div class="edit-section">
      <div class="edit-head">
        <div class="edit-title">✏️ Edit Product Details</div>
        <button class="logout-btn" onclick="adminLogout()">🔒 Lock</button>
      </div>
      <label class="fl">Product Description</label>
      <textarea class="fta" id="ed-desc">${desc}</textarea>
      <div class="field-row">
        <div><label class="fl">Part Number / SKU</label><input class="fi" id="ed-partno" value="${partNo}"/></div>
        <div><label class="fl">Weight (e.g. 250g)</label><input class="fi" id="ed-weight" placeholder="e.g. 250g" value="${weight}"/></div>
        <div><label class="fl">Warranty</label><input class="fi" id="ed-warranty" value="${warranty}"/></div>
        <div><label class="fl">Country of Origin</label><input class="fi" id="ed-origin" value="${origin}"/></div>
      </div>
      <label class="fl">Fitment Notes / Additional Info</label>
      <textarea class="fta" style="min-height:68px" id="ed-notes" placeholder="e.g. Fits 2018–2023 models only.">${notes}</textarea>
      <div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px">
        <button class="save-btn" onclick="saveProduct()">💾 Save Details</button>
        <span class="saved-ok" id="saved-ok">✅ Saved!</span>
      </div>
    </div>` : `
    <div class="admin-lock">
      <div class="lock-icon">🔒</div>
      <div class="lock-title">Admin Access Required to Edit</div>
      <br/>
      <input class="lock-input" type="password" id="admin-pass" placeholder="••••••••" onkeydown="if(event.key==='Enter')checkPass()"/>
      <br/>
      <button class="lock-btn" onclick="checkPass()">Unlock</button>
      <div class="lock-err" id="lock-err">❌ Incorrect password. Try again.</div>
    </div>`;

  document.getElementById('pg-product').innerHTML = `
  <div class="inner-page">
    <div class="inner-hero" style="background:linear-gradient(135deg,#111318 0%,${info.color}18 100%);padding:42px 5% 32px">
      <div class="inner-hero-grid"></div>
      <div class="inner-hero-inner">
        <div class="tag" style="color:${info.color};background:${info.color}20;border-color:${info.color}50">
          ${info.emoji} ${brand} · ${model} · ${cat}
        </div>
        <h1 style="font-size:clamp(1.5rem,3.5vw,2.6rem)">${part}</h1>
      </div>
    </div>
    <div class="det-wrap">
      <div class="det-grid">
        <div>
          <div class="img-box" style="background:linear-gradient(135deg,var(--card),${info.color}12)">
            <div class="img-bg-grid"></div>
            <span class="img-emoji">${CAT_ICONS[cat] || '🔩'}</span>
            <span class="img-lbl">${brand} · ${model}</span>
            <span class="img-lbl" style="font-size:.7rem;opacity:.55">${part}</span>
          </div>
          <div class="meta-grid">
            <div class="meta-item"><div class="meta-lbl">SKU / Part No.</div><div class="meta-val" style="font-family:monospace;font-size:.8rem">${partNo}</div></div>
            <div class="meta-item"><div class="meta-lbl">Brand</div><div class="meta-val">${brand}</div></div>
            <div class="meta-item"><div class="meta-lbl">Model</div><div class="meta-val">${model}</div></div>
            <div class="meta-item"><div class="meta-lbl">Category</div><div class="meta-val">${cat}</div></div>
            <div class="meta-item"><div class="meta-lbl">Warranty</div><div class="meta-val">${warranty}</div></div>
            <div class="meta-item"><div class="meta-lbl">Origin</div><div class="meta-val">${origin}</div></div>
            ${weight ? `<div class="meta-item" style="grid-column:1/-1"><div class="meta-lbl">Weight</div><div class="meta-val">${weight}</div></div>` : ''}
          </div>
        </div>
        <div>
          <div class="det-brand-tag">${info.emoji} ${brand}</div>
          <div class="det-name">${part}</div>
          <div class="det-model">For ${brand} ${model} · ${cat}</div>
          <div class="price-row">
            <div class="det-price">৳${pr.toLocaleString()}</div>
            <span class="stock-badge"><span class="sdot"></span>${st} in stock</span>
          </div>
          <p class="det-desc">${desc}</p>
          ${notes ? `<div class="notes-box">📌 ${notes}</div>` : ''}
          <a class="wa-big-btn" href="https://wa.me/8801707659954?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener">
            💬 Order on WhatsApp
          </a>
          ${adminHtml}
        </div>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   ADMIN
   ══════════════════════════════════════ */
function checkPass() {
  const inp = document.getElementById('admin-pass');
  if (!inp) return;
  if (inp.value === ADMIN_PASS) {
    S.adminUnlocked = true;
    renderProduct();
  } else {
    const e = document.getElementById('lock-err');
    if (e) e.style.display = 'block';
    inp.value = '';
    inp.style.borderColor = '#e74c3c';
    setTimeout(() => { if (inp) inp.style.borderColor = 'var(--bor)'; }, 1200);
  }
}

function adminLogout() {
  S.adminUnlocked = false;
  renderProduct();
}

function saveProduct() {
  const { brand, model, part } = S;
  savePart(brand, model, part, {
    desc:     document.getElementById('ed-desc')?.value    || '',
    partNo:   document.getElementById('ed-partno')?.value  || '',
    weight:   document.getElementById('ed-weight')?.value  || '',
    warranty: document.getElementById('ed-warranty')?.value || '',
    origin:   document.getElementById('ed-origin')?.value  || '',
    notes:    document.getElementById('ed-notes')?.value   || '',
  });
  const ok = document.getElementById('saved-ok');
  if (ok) { ok.style.display = 'inline-flex'; setTimeout(() => { ok.style.display = 'none'; }, 2600); }
  renderProduct();
}

/* ── INIT ── */
history.replaceState({ page: 'home', brand: null, model: null, cat: null, part: null }, '', '');
renderHome();
updateBreadcrumb();
showPage('home');
