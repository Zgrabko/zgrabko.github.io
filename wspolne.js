// Wspólne elementy: nagłówek, stopka, CTA produktu i formatowanie kwot.
// Sklep Zgrabko na Payhip (ceny w PLN). Każdy kalkulator poleca najbliższy tematycznie produkt.
// Adres strony – jedno miejsce w JS. W HTML (canonical, og:url, JSON-LD, sitemap, robots) zmiana jednym poleceniem:
// python pliki/zmien-adres-strony.py  (planfoxshop.github.io -> zgrabko.github.io; najpierw --sprawdz)
const ADRES = "https://planfoxshop.github.io/";
const SKLEP = "https://payhip.com/PlanFoxShop";
const P = {
  sklep: { url: SKLEP, tytul: "Gotowe planery i poradniki Zgrabko",
    opis: "Arkusze Excel i PDF-y do druku: budżet, spłata długów, oszczędzanie, IKE/IKZE, JDG, najem, ślub, podróże i święta. Od 12 zł, pobierasz od razu po zakupie.", btn: "Przejdź do sklepu" },
  budzet: { url: "https://payhip.com/b/LKbR5", tytul: "Chcesz panować nad domowym budżetem?",
    opis: "Gotowy planer budżetu w Excelu: wydatki, oszczędności, cele i wykresy. Wpisujesz kwoty, resztę liczy sam.", btn: "Zobacz planer budżetu" },
  dlugi: { url: "https://payhip.com/b/W7R4U", tytul: "Spłacasz kredyt lub kilka długów?",
    opis: "Planer spłaty długów w Excelu: metoda lawiny i kuli śnieżnej, data wolności od długów i ile odsetek oszczędzasz.", btn: "Zobacz planer spłaty długów",
    extra: { url: "https://payhip.com/b/OZT63", txt: "Wolisz na papierze? Poradnik PDF: lawina vs kula śnieżna + karty pracy" } },
  wesele: { url: "https://payhip.com/b/cf8Gr", tytul: "Planujesz ślub i wesele?",
    opis: "Planer ślubu i wesela w Excelu: budżet z podziałem na usługodawców, lista gości, zaliczki i terminy. Wszystko w jednym pliku.", btn: "Zobacz planer wesela",
    extra: { url: "https://payhip.com/b/LthYy", txt: "Pakiet PDF do druku: checklista ślubna + planer podróży poślubnej" } },
  swieta: { url: "https://payhip.com/b/pY3ba", tytul: "Święta bez stresu i bez debetu w styczniu",
    opis: "Planer świąt PDF do druku i wypełniania: budżet, lista prezentów, menu wigilijne, zakupy i plan przygotowań.", btn: "Zobacz planer świąt",
    extra: { url: "https://payhip.com/b/hsFmk", txt: "Pakiet „Święta bez stresu” – taniej w zestawie" } },
  jdg: { url: "https://payhip.com/b/Mt7pb", tytul: "Prowadzisz JDG albo pracujesz jako freelancer?",
    opis: "Tracker przychodów i kosztów w Excelu: faktury, zaległe płatności, wynik co miesiąc i ile odłożyć na podatki.", btn: "Zobacz tracker" },
  oszczedzanie: { url: "https://payhip.com/b/BV1tF", tytul: "Chcesz wreszcie regularnie odkładać?",
    opis: "Wyzwania oszczędnościowe do druku: 100 kopert (5050 zł), 52 tygodnie, cele 1000–10 000 zł i fundusze celowe. Kolorujesz kratki, oszczędności rosną.", btn: "Zobacz wyzwania" },
  ike: { url: "https://payhip.com/b/zGobP", tytul: "IKE czy IKZE? Wybierz bez zgadywania",
    opis: "Poradnik PDF „IKE i IKZE bez tajemnic” (19 zł): limity 2026 i 2027, ulga w PIT, warunki wypłaty, przykład na liczbach i karty pracy.", btn: "Zobacz poradnik" },
};
// Strona główna poleca cały sklep, każdy kalkulator — swój produkt (właściciel 2026-11-11).
const CTA_STRONY = { "": "sklep", "index": "sklep", "kalkulator-raty-kredytu": "dlugi", "kalkulator-nadplaty-kredytu": "dlugi",
  "kalkulator-vat": "jdg", "kalkulator-procentow": "jdg",
  "kalkulator-oszczednosci": "oszczedzanie", "kalkulator-lokaty": "oszczedzanie",
  "kalkulator-ike-ikze": "ike", "kalkulator-kosztow-wesela": "wesele", "poradnik-ile-kosztuje-wesele": "wesele",
  "kalkulator-budzetu-swiat": "swieta", "kalkulator-splaty-dlugow": "dlugi", "poradnik-kula-sniezna": "dlugi",
  "poradnik-budzet-domowy": "budzet" };

// Ikony (inline SVG, bez bibliotek). Rysowane kreską w kolorze tekstu (currentColor).
const IKONY = {
  kredyt: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  nadplata: '<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',
  dlugi: '<circle cx="12" cy="12" r="8"/><path d="M8 12a4 4 0 0 1 4-4"/><path d="M12 16a4 4 0 0 0 4-4"/>',
  oszczednosci: '<path d="M4 13a7 6 0 0 1 13-3h2l1 3-2 1v3h-3v2h-3v-2H9v2H6v-3a6 6 0 0 1-2-3z"/><circle cx="15" cy="11" r=".5"/>',
  lokata: '<path d="M3 10l9-5 9 5"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 20h18"/>',
  ike: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  vat: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  procent: '<path d="M5 19L19 5"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  dni: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  swieta: '<path d="M12 3l5 7h-3l4 6h-4l3 4H7l3-4H6l4-6H7z"/><path d="M12 20v2"/>',
  wesele: '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M10 6l2-3 2 3"/>',
  budzet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><circle cx="16" cy="15" r="1.5"/>',
  poradnik: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
  szukaj: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  kopiuj: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
  ok: '<path d="M5 12l5 5 9-10"/>',
};
const ikona = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKONY[n] || ""}</svg>`;
const LOGO = '<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="zg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f6feb"/><stop offset="1" stop-color="#0f9d58"/></linearGradient></defs><rect width="64" height="64" rx="15" fill="url(#zg)"/><path d="M17 33.5l10 10 20-22" fill="none" stroke="#fff" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="49" cy="15" r="4" fill="#f2a900"/></svg>';

// Katalog kalkulatorów: menu w nagłówku i stopka.
const KATALOG = [
  ["Pieniądze i kredyty", [["kalkulator-raty-kredytu", "Rata kredytu", "kredyt"], ["kalkulator-nadplaty-kredytu", "Nadpłata kredytu", "nadplata"], ["kalkulator-splaty-dlugow", "Spłata długów", "dlugi"]]],
  ["Oszczędzanie i emerytura", [["kalkulator-oszczednosci", "Oszczędności", "oszczednosci"], ["kalkulator-lokaty", "Lokata", "lokata"], ["kalkulator-ike-ikze", "IKE i IKZE", "ike"]]],
  ["Firma", [["kalkulator-vat", "VAT netto-brutto", "vat"], ["kalkulator-procentow", "Procenty", "procent"]]],
  ["Ślub, święta, dom", [["kalkulator-kosztow-wesela", "Koszt wesela", "wesele"], ["kalkulator-budzetu-swiat", "Budżet na święta", "swieta"], ["kalkulator-dni", "Dni między datami", "dni"], ["poradnik-budzet-domowy", "Budżet 50/30/20", "budzet"]]],
];
const PORADNIKI = [["poradnik-budzet-domowy", "Jak prowadzić budżet domowy"], ["poradnik-kula-sniezna", "Metoda kuli śnieżnej"], ["poradnik-ile-kosztuje-wesele", "Ile kosztuje wesele"]];

// Sezon świąteczny: 1 listopada – 26 grudnia (potem baner znika sam).
const SEZON_SWIETA = (d => d.getMonth() === 10 || (d.getMonth() === 11 && d.getDate() <= 26))(new Date());

const zl = v => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(isFinite(v) ? v : 0);
const num = id => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;
const zlKrotko = v => Math.abs(v) >= 1e6 ? (v / 1e6).toLocaleString("pl-PL", { maximumFractionDigits: 1 }) + " mln" : Math.abs(v) >= 1e3 ? Math.round(v / 1e3) + " tys." : Math.round(v) + " zł";
const KOLORY = ["#1f6feb", "#0f9d58", "#f2a900", "#e5534b", "#8957e5", "#0ea5b7", "#db61a2", "#7d8590", "#2da44e", "#bf8700", "#57606a"];

// Wykres liniowy w SVG. serie: [{nazwa, kolor, dane:[liczby], pole, kreski}], etykieta(i) -> podpis osi X.
function wykresLinii(el, serie, etykieta) {
  if (!el) return;
  serie = serie.filter(s => s.dane.length > 1);
  if (!serie.length) { el.innerHTML = ""; return; }
  const W = Math.max(300, Math.round(el.clientWidth || 600)), H = W < 500 ? 200 : 230, L = 56, R = 12, T = 12, B = 28, n = Math.max(...serie.map(s => s.dane.length)) - 1;
  const max = Math.max(...serie.flatMap(s => s.dane), 1), x = i => L + (W - L - R) * i / n, y = v => T + (H - T - B) * (1 - v / max);
  let s = "";
  for (let k = 0; k <= 4; k++) { const v = max * k / 4; s += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--border)"/><text class="os" x="${L - 6}" y="${y(v) + 4}" text-anchor="end">${zlKrotko(v)}</text>`; }
  const krok = Math.max(1, Math.ceil(n / (W < 500 ? 3 : 6)));
  for (let i = 0; i <= n; i += krok) s += `<text class="os" x="${x(i)}" y="${H - 8}" text-anchor="middle">${etykieta(i)}</text>`;
  serie.forEach(se => {
    const pkt = se.dane.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    if (se.pole) s += `<polygon points="${x(0)},${y(0)} ${pkt} ${x(se.dane.length - 1)},${y(0)}" style="fill:${se.kolor};opacity:.12"/>`;
    s += `<polyline points="${pkt}" fill="none" style="stroke:${se.kolor};stroke-width:2.5;${se.kreski ? "stroke-dasharray:6 5" : ""}" stroke-linejoin="round"/>`;
  });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Wykres: ${serie.map(s => s.nazwa).join(", ")}">${s}</svg>
    <ul class="legenda">${serie.map(se => `<li><i style="background:${se.kolor}"></i>${se.nazwa}</li>`).join("")}</ul>`;
}
// Pasek proporcji: czesci [[nazwa, wartość], ...]
function pasek(el, czesci) {
  if (!el) return;
  czesci = czesci.filter(c => c[1] > 0);
  const suma = czesci.reduce((a, c) => a + c[1], 0);
  if (!suma) { el.innerHTML = ""; return; }
  el.innerHTML = `<div class="pasek" role="img" aria-label="Podział kwoty">${czesci.map((c, i) => `<span style="width:${c[1] / suma * 100}%;background:${KOLORY[i % KOLORY.length]}" title="${c[0]}"></span>`).join("")}</div>
    <ul class="legenda">${czesci.map((c, i) => `<li><i style="background:${KOLORY[i % KOLORY.length]}"></i>${c[0]} ${Math.round(c[1] / suma * 100)}%</li>`).join("")}</ul>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const strona = location.pathname.split("/").pop().replace(".html", "");
  const h = document.querySelector("header");
  if (h) {
    h.innerHTML = `<div class="wrap"><a class="logo" href="index.html">${LOGO}Zgrabko</a>
    <nav aria-label="Menu"><details class="menu"><summary>Kalkulatory</summary><div class="panel"><div class="wrap">${KATALOG.map(([g, l]) =>
      `<div><strong>${g}</strong>${l.map(([u, n, i]) => `<a href="${u}.html">${ikona(i)}${n}</a>`).join("")}</div>`).join("")}</div></div></details>
    <a href="index.html#poradniki">Poradniki</a><a href="index.html#planery">Planery</a><a class="sklep" href="${SKLEP}" rel="noopener">Sklep</a></nav></div>`;
    const menu = h.querySelector("details");
    document.addEventListener("click", e => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
    document.addEventListener("keydown", e => { if (e.key === "Escape") menu.open = false; });
    if (SEZON_SWIETA && strona !== "index" && strona !== "" && strona !== "kalkulator-budzetu-swiat") h.insertAdjacentHTML("afterend",
      `<div class="sezon-pasek"><div class="wrap">🎄 <strong>Święta bez stresu:</strong><a href="kalkulator-budzetu-swiat.html">policz budżet świąt</a><a href="https://payhip.com/b/pY3ba" rel="noopener">planer świąt</a><a href="https://payhip.com/b/LlbpU" rel="noopener">gry świąteczne</a></div></div>`);
  }
  const sz = document.getElementById("sezon");
  if (sz && SEZON_SWIETA) sz.innerHTML = `<section class="sezon"><div><h2>🎄 Święta bez stresu</h2>
    <p>Policz budżet na prezenty i Wigilię, zaplanuj grudzień i przygotuj zabawy dla całej rodziny.</p>
    <div class="linki"><a href="kalkulator-budzetu-swiat.html">Kalkulator budżetu świąt</a><a href="https://payhip.com/b/pY3ba" rel="noopener">Planer świąt · 12 zł</a>
    <a class="jasny" href="https://payhip.com/b/LlbpU" rel="noopener">Gry świąteczne · 15 zł</a><a class="jasny" href="https://payhip.com/b/hsFmk" rel="noopener">Pakiet świąteczny · 17 zł</a></div></div>
    <img src="img/okladki/swieta.jpg" width="640" height="400" alt="Planer świąt Zgrabko do druku" loading="lazy"></section>`;
  document.querySelectorAll("[data-ico]").forEach(e => e.innerHTML = ikona(e.dataset.ico));
  const c = document.getElementById("cta");
  const p = P[CTA_STRONY[strona] || "budzet"];
  if (c) c.innerHTML = `<div class="card cta"><strong>${p.tytul}</strong>
    <p style="margin:6px 0 0">${p.opis}</p>
    <a class="btn" href="${p.url}" rel="noopener">${p.btn} →</a>
    ${p.extra ? `<p style="margin:10px 0 0;font-size:.9rem"><a href="${p.extra.url}" rel="noopener" style="color:inherit">${p.extra.txt} →</a></p>` : ""}
    ${p.url === SKLEP ? "" : `<p style="margin:10px 0 0;font-size:.9rem"><a href="${SKLEP}" rel="noopener" style="color:inherit">Wszystkie planery Zgrabko →</a></p>`}</div>`;
  // „Kopiuj wynik” pod każdym wynikiem kalkulatora
  document.querySelectorAll("main .result").forEach(r => {
    const a = document.createElement("div"); a.className = "akcje";
    a.innerHTML = `<button type="button" class="kopiuj">${ikona("kopiuj")}<span>Kopiuj wynik</span></button>`;
    r.after(a);
    const b = a.querySelector("button");
    b.addEventListener("click", async () => {
      const t = `${document.querySelector("h1").textContent.trim()}\n\n${r.innerText.trim()}\n\nPoliczone na ${ADRES}${location.pathname.split("/").pop()}`;
      try { await navigator.clipboard.writeText(t); }
      catch (e) { const x = document.createElement("textarea"); x.value = t; document.body.appendChild(x); x.select(); document.execCommand("copy"); x.remove(); }
      b.innerHTML = `${ikona("ok")}<span>Skopiowano</span>`; setTimeout(() => b.innerHTML = `${ikona("kopiuj")}<span>Kopiuj wynik</span>`, 1800);
    });
  });
  const f = document.querySelector("footer");
  const kalk = KATALOG.flatMap(g => g[1]).filter(k => k[0].startsWith("kalkulator"));
  if (f) f.innerHTML = `<div class="wrap"><div class="kolumny">
    <div><a class="logo" href="index.html">${LOGO}Zgrabko</a><p style="margin:10px 0 0">Darmowe kalkulatory finansowe i gotowe planery do domowego budżetu, ślubu i świąt.</p></div>
    <div><strong>Kalkulatory</strong>${kalk.slice(0, 6).map(([u, n]) => `<a href="${u}.html">${n}</a>`).join("")}</div>
    <div><strong>Więcej kalkulatorów</strong>${kalk.slice(6).map(([u, n]) => `<a href="${u}.html">${n}</a>`).join("")}</div>
    <div><strong>Poradniki i sklep</strong>${PORADNIKI.map(([u, n]) => `<a href="${u}.html">${n}</a>`).join("")}<a href="index.html#planery">Gotowe planery</a><a href="${SKLEP}" rel="noopener">Sklep Zgrabko (Payhip)</a></div>
    </div><div class="dol">© ${new Date().getFullYear()} Zgrabko · Wyniki mają charakter poglądowy i nie są poradą finansową.</div></div>`;
});
