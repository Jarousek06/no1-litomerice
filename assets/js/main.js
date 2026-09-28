/* NO.1 Litoměřice — v2: interakce a vykreslení obsahu z /content */
(function () {
  "use strict";

  const doc = document.documentElement;
  const data = window.NO1 || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const kc = (n) => n.toLocaleString("cs-CZ").replace(/\s/g, " ") + " Kč";

  /* ---------- Hlavička ---------- */
  const header = $("[data-header]");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".header__nav a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id)));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["menu", "o-nas", "galerie", "kontakt"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* ---------- Mobilní menu ---------- */
  const toggle = $("[data-menu-toggle]");
  const sheet = $("[data-overlay]");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Zavřít menu" : "Otevřít menu";
    doc.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      sheet.hidden = false;
      requestAnimationFrame(() => sheet.classList.add("is-open"));
    } else {
      sheet.classList.remove("is-open");
      setTimeout(() => { if (!sheet.classList.contains("is-open")) sheet.hidden = true; }, reduceMotion ? 0 : 300);
    }
  };
  if (toggle && sheet) {
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    sheet.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
    });
  }

  /* ---------- Otevírací doba ---------- */
  const r = data.restaurant;
  if (r) {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", weekday: "short", hour: "2-digit", minute: "2-digit", year: "numeric", month: "2-digit", day: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const now = { day: { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[get("weekday")], min: +get("hour") * 60 + +get("minute"), date: `${get("year")}-${get("month")}-${get("day")}` };
    const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    const special = (r.specialDays || []).find((d) => d.date === now.date);
    const today = special ? (special.closed ? null : special) : r.hours.find((h) => h.day === now.day);
    let text, open = false;
    if (!today) text = special && special.label ? `Zavřeno · ${special.label}` : "Dnes zavřeno";
    else if (now.min < toMin(today.open)) text = `Otevíráme v ${today.open}`;
    else if (now.min < toMin(today.close)) { open = true; text = `Otevřeno do ${today.close}`; }
    else {
      const next = r.hours.find((h) => h.day === (now.day % 7) + 1);
      text = next ? `Zavřeno · zítra od ${next.open}` : "Zavřeno";
    }
    $$("[data-open-status]").forEach((el) => {
      el.textContent = text;
      const wrap = el.closest(".status");
      if (wrap) wrap.classList.toggle("is-closed", !open);
    });
    const tbody = $("[data-hours] tbody");
    if (tbody) tbody.innerHTML = r.hours.map((h) => `<tr class="${h.day === now.day ? "is-today" : ""}"><td>${esc(h.label)}</td><td>${h.open ? `${esc(h.open)}–${esc(h.close)}` : "zavřeno"}</td></tr>`).join("");
    const note = $("[data-hours-note]");
    if (note) note.textContent = r.hoursNote || "";
  }
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Prohlížeč obrázků (menu + galerie) ---------- */
  const viewer = $("[data-viewer]");
  const vImg = $("[data-viewer-img]");
  const vCap = $("[data-viewer-cap]");
  let vList = [], vIndex = 0, vReturn = null;
  const vShow = (i) => {
    vIndex = (i + vList.length) % vList.length;
    const it = vList[vIndex];
    vImg.src = it.src; vImg.alt = it.alt || it.cap || "";
    vCap.textContent = `${it.cap ? it.cap + " · " : ""}${vIndex + 1} / ${vList.length}`;
    const pre = vList[(vIndex + 1) % vList.length]; if (pre) new Image().src = pre.src;
  };
  const vOpen = (list, i, from) => {
    if (!viewer || typeof viewer.showModal !== "function") { window.open(list[i].src, "_blank"); return; }
    vList = list; vReturn = from; vShow(i); viewer.showModal();
  };
  if (viewer) {
    $("[data-viewer-close]").addEventListener("click", () => viewer.close());
    $$("[data-viewer-step]").forEach((b) => b.addEventListener("click", () => vShow(vIndex + Number(b.dataset.viewerStep))));
    viewer.addEventListener("click", (e) => { if (e.target === viewer || e.target.classList.contains("viewer__fig")) viewer.close(); });
    viewer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") vShow(vIndex + 1);
      if (e.key === "ArrowLeft") vShow(vIndex - 1);
    });
    viewer.addEventListener("close", () => { vImg.removeAttribute("src"); if (vReturn) vReturn.focus(); });
    let x0 = null;
    viewer.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) vShow(vIndex + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // Galerie
  const galleryItems = $$("[data-gallery] .grid__item");
  const galleryList = galleryItems.map((b) => ({ src: b.dataset.full, alt: b.querySelector("img").alt, cap: b.querySelector("img").alt }));
  galleryItems.forEach((b, i) => b.addEventListener("click", () => vOpen(galleryList, i, b)));

  /* ---------- Jídelní lístek: stránky ---------- */
  const pagesData = data.menuPages;
  const switchEl = $("[data-menu-switch]");
  const pagesEl = $("[data-menu-pages]");
  let showSection = () => {};
  if (pagesData && switchEl && pagesEl) {
    const keys = Object.keys(pagesData);
    switchEl.innerHTML = keys.map((k, i) =>
      `<button type="button" role="tab" id="sw-${k}" aria-controls="menu-pages" aria-selected="${i === 0}" data-section="${k}">${esc(pagesData[k].title)}</button>`).join("");
    pagesEl.id = "menu-pages";
    pagesEl.setAttribute("role", "tabpanel");
    showSection = (key) => {
      if (!pagesData[key]) return;
      $$("button", switchEl).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.section === key)));
      pagesEl.setAttribute("aria-labelledby", "sw-" + key);
      const list = pagesData[key].pages.map((p) => ({ src: p.full, cap: p.title, alt: `Stránka jídelního lístku NO.1: ${p.title}` }));
      pagesEl.innerHTML = pagesData[key].pages.map((p, i) =>
        `<button type="button" class="page" data-i="${i}" aria-label="Zvětšit stránku: ${esc(p.title)}">
          <img src="${esc(p.thumb)}" width="${p.w}" height="${p.h}" loading="lazy" alt="Stránka jídelního lístku NO.1: ${esc(p.title)}">
        </button>`).join("");
      $$(".page", pagesEl).forEach((b) => b.addEventListener("click", () => vOpen(list, Number(b.dataset.i), b)));
    };
    switchEl.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showSection(b.dataset.section); });
    showSection(keys[0]);
  }
  $$("[data-open-menu]").forEach((a) => a.addEventListener("click", () => showSection(a.dataset.openMenu)));

  /* ---------- Jídelní lístek: textová verze ---------- */
  const TAGS = { oblibene: "Oblíbené", palive: "Pálivé", vegan: "Vegan" };
  const itemHtml = (it) => {
    const hasVariants = Array.isArray(it.variants) && it.variants.length;
    const price = hasVariants ? `od ${kc(Math.min(...it.variants.map((v) => v.price)))}`
      : typeof it.price === "number" ? kc(it.price) : null;
    return `<li class="item">
      <div class="item__row">
        <span class="item__code">${esc(it.code || "")}</span>
        <span class="item__name">${esc(it.name)}${it.sub ? `<span class="item__sub">${esc(it.sub)}</span>` : ""}</span>
        <span class="item__dots" aria-hidden="true"></span>
        ${price ? `<span class="item__price">${price}</span>` : `<span class="item__price item__price--na">cena u obsluhy</span>`}
      </div>
      ${it.tags && it.tags.length ? `<div class="item__tags">${it.tags.map((t) => `<span class="tag tag--${esc(t)}">${esc(TAGS[t] || t)}</span>`).join("")}</div>` : ""}
      ${it.desc ? `<p class="item__desc">${esc(it.desc)}</p>` : ""}
      ${hasVariants ? `<ul class="item__variants">${it.variants.map((v) => `<li>${esc(v.label)} <b>${kc(v.price)}</b></li>`).join("")}</ul>` : ""}
      ${it.note ? `<p class="item__note">${esc(it.note)}</p>` : ""}
    </li>`;
  };
  const menu = data.menu;
  const tabsEl = $("[data-menu-tabs]");
  const panelsEl = $("[data-menu-panels]");
  if (menu && tabsEl && panelsEl) {
    tabsEl.innerHTML = menu.categories.map((c, i) =>
      `<button type="button" class="menu__tab" role="tab" id="tab-${esc(c.id)}" aria-controls="panel-${esc(c.id)}" aria-selected="${i === 0}">${esc(c.title)}</button>`).join("");
    panelsEl.innerHTML = menu.categories.map((c, i) => {
      const body = c.groups
        ? c.groups.map((g) => `<h4 class="menu__group-title">${esc(g.title)}</h4><ul class="menu__list${g.items.every((it) => !it.desc) ? " menu__list--compact" : ""}">${g.items.map(itemHtml).join("")}</ul>`).join("")
        : `<ul class="menu__list">${c.items.map(itemHtml).join("")}</ul>`;
      return `<div class="menu__panel" role="tabpanel" id="panel-${esc(c.id)}" aria-labelledby="tab-${esc(c.id)}" ${i ? "hidden" : ""}>
        ${c.intro ? `<p class="menu__intro">${esc(c.intro)}</p>` : ""}${body}${c.note ? `<p class="menu__catnote">${esc(c.note)}</p>` : ""}</div>`;
    }).join("");
    tabsEl.addEventListener("click", (e) => {
      const t = e.target.closest(".menu__tab");
      if (!t) return;
      $$(".menu__tab", tabsEl).forEach((b) => b.setAttribute("aria-selected", String(b === t)));
      $$(".menu__panel", panelsEl).forEach((p) => (p.hidden = p.id !== t.getAttribute("aria-controls")));
    });
    const noteEl = $("[data-menu-note]");
    if (noteEl) noteEl.textContent = `${menu.note} Aktualizováno ${menu.updated}.`;
  }

  /* ---------- Recenze ---------- */
  const rev = data.reviews;
  const scoresEl = $("[data-review-scores]");
  const listEl = $("[data-review-list]");
  if (rev && scoresEl && listEl) {
    scoresEl.innerHTML = rev.scores.filter((s) => s.source !== "Rezervace restaurace").map((s) =>
      `<a class="score" href="${esc(s.url)}" target="_blank" rel="noopener"><span class="score__value">${esc(s.value)}<small> / ${esc(s.scale)}</small></span><span class="score__meta"><b>${esc(s.source)}</b>${esc(s.count)}</span></a>`).join("");
    listEl.innerHTML = rev.items.map((it) =>
      `<figure class="review" data-reveal><blockquote><p>„${esc(it.text)}“</p></blockquote><figcaption class="review__who"><b>${esc(it.author)}</b> · ${esc(it.date)}<span class="review__src">${esc(it.source)}</span></figcaption></figure>`).join("");
  }

  /* ---------- Reveal ---------- */
  const revealEls = $$("[data-reveal], [data-reveal-group]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -5% 0px", threshold: 0.05 });
    revealEls.forEach((el) => io.observe(el));
  }
})();
