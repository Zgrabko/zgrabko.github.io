// Wspólne elementy: nagłówek, stopka, CTA produktu i formatowanie kwot.
// Po założeniu sklepu wpisz tu link do produktu na Gumroad:
const LINK_PRODUKTU = "https://GUMROAD-LINK-DO-UZUPELNIENIA";

const zl = v => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(isFinite(v) ? v : 0);
const num = id => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  const h = document.querySelector("header");
  if (h) h.innerHTML = `<a class="logo" href="index.html">Planfox</a>
    <nav><a href="kalkulator-vat.html">VAT</a><a href="kalkulator-raty-kredytu.html">Kredyt</a><a href="kalkulator-nadplaty-kredytu.html">Nadpłata</a><a href="kalkulator-lokaty.html">Lokata</a><a href="kalkulator-oszczednosci.html">Oszczędności</a><a href="kalkulator-procentow.html">Procenty</a><a href="kalkulator-dni.html">Dni</a></nav>`;
  const c = LINK_PRODUKTU.includes("DO-UZUPELNIENIA") ? null : document.getElementById("cta");
  if (c) c.innerHTML = `<div class="card cta"><strong>Chcesz panować nad domowym budżetem?</strong>
    <p style="margin:6px 0 0">Gotowy planer budżetu w Excelu: wydatki, oszczędności, cele i wykresy. Wpisujesz kwoty, resztę liczy sam.</p>
    <a class="btn" href="${LINK_PRODUKTU}" rel="noopener">Zobacz planer →</a></div>`;
  const f = document.querySelector("footer");
  if (f) f.innerHTML = `© ${new Date().getFullYear()} Planfox · Wyniki mają charakter poglądowy i nie są poradą finansową.`;
});
