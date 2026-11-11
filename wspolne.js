// Wspólne elementy: nagłówek, stopka, CTA produktu i formatowanie kwot.
// Sklep Planfox na Payhip (ceny w PLN). Każdy kalkulator poleca najbliższy tematycznie produkt.
const SKLEP = "https://payhip.com/PlanFoxShop";
const P = {
  budzet: { url: "https://payhip.com/b/LKbR5", tytul: "Chcesz panować nad domowym budżetem?",
    opis: "Gotowy planer budżetu w Excelu: wydatki, oszczędności, cele i wykresy. Wpisujesz kwoty, resztę liczy sam.", btn: "Zobacz planer budżetu" },
  dlugi: { url: "https://payhip.com/b/W7R4U", tytul: "Spłacasz kredyt lub kilka długów?",
    opis: "Planer spłaty długów w Excelu: metoda lawiny i kuli śnieżnej, data wolności od długów i ile odsetek oszczędzasz.", btn: "Zobacz planer spłaty długów" },
  jdg: { url: "https://payhip.com/b/Mt7pb", tytul: "Prowadzisz JDG albo pracujesz jako freelancer?",
    opis: "Tracker przychodów i kosztów w Excelu: faktury, zaległe płatności, wynik co miesiąc i ile odłożyć na podatki.", btn: "Zobacz tracker" },
  oszczedzanie: { url: "https://payhip.com/b/BV1tF", tytul: "Chcesz wreszcie regularnie odkładać?",
    opis: "Wyzwania oszczędnościowe do druku: 100 kopert (5050 zł), 52 tygodnie, cele 1000–10 000 zł i fundusze celowe. Kolorujesz kratki, oszczędności rosną.", btn: "Zobacz wyzwania" },
};
const CTA_STRONY = { "kalkulator-raty-kredytu": "dlugi", "kalkulator-nadplaty-kredytu": "dlugi",
  "kalkulator-vat": "jdg", "kalkulator-procentow": "jdg",
  "kalkulator-oszczednosci": "oszczedzanie", "kalkulator-lokaty": "oszczedzanie" };

const zl = v => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(isFinite(v) ? v : 0);
const num = id => parseFloat(String(document.getElementById(id).value).replace(",", ".")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  const h = document.querySelector("header");
  if (h) h.innerHTML = `<a class="logo" href="index.html">Planfox</a>
    <nav><a href="kalkulator-vat.html">VAT</a><a href="kalkulator-raty-kredytu.html">Kredyt</a><a href="kalkulator-nadplaty-kredytu.html">Nadpłata</a><a href="kalkulator-lokaty.html">Lokata</a><a href="kalkulator-oszczednosci.html">Oszczędności</a><a href="kalkulator-procentow.html">Procenty</a><a href="kalkulator-dni.html">Dni</a><a href="${SKLEP}">Sklep</a></nav>`;
  const c = document.getElementById("cta");
  const strona = location.pathname.split("/").pop().replace(".html", "");
  const p = P[CTA_STRONY[strona] || "budzet"];
  if (c) c.innerHTML = `<div class="card cta"><strong>${p.tytul}</strong>
    <p style="margin:6px 0 0">${p.opis}</p>
    <a class="btn" href="${p.url}" rel="noopener">${p.btn} →</a>
    <p style="margin:10px 0 0;font-size:.9rem"><a href="${SKLEP}" rel="noopener" style="color:inherit">Wszystkie planery Planfox →</a></p></div>`;
  const f = document.querySelector("footer");
  if (f) f.innerHTML = `© ${new Date().getFullYear()} Planfox · Wyniki mają charakter poglądowy i nie są poradą finansową.`;
});
