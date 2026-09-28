# NO.1 Litoměřice — web

Statický web (HTML + CSS + JS, bez buildu). Stačí nahrát celou složku na hosting (např. Netlify Drop).

## Úpravy obsahu (bez zásahu do designu)

| Co | Soubor |
|---|---|
| Stránky jídelního lístku (obrázky) | `assets/menu/` + `content/menu-pages.js` (generuje `no1-litomerice-podklady/menu-stranky.py`, včetně PDF) |
| Textová verze lístku, ceny, štítky | `content/menu.js` |
| Otevírací doba, svátky, kontakty, odkazy | `content/restaurant.js` |
| Recenze a hodnocení | `content/reviews.js` |
| Fotky | `assets/img/` (WebP) — při výměně zachovat název souboru |

Mimořádně zavřeno: do `specialDays` v `content/restaurant.js` přidat např.
`{ date: "2026-12-24", label: "Štědrý den", closed: true }`.

## Před spuštěním
- Doplnit finální doménu v `index.html` (canonical, og:url, og:image, JSON-LD) — zatím `www.no1litomerice.cz`.
- Položky s `price: null` (dezerty, dětské menu, část nápojů) zobrazují „cena u obsluhy“ — doplnit ceny od restaurace.

## Verze
- v2 (aktuální): minimalistická, menu jako stránky lístku + PDF ke stažení (inspirace hasaka.cz).
- v1 „Mech & klenba“: záloha v `no1-litomerice-podklady/web-v1-mech-klenba/`.
- Grafiky sushi mají starší ceny než objednávkový systém → web upozorňuje, že platné ceny jsou v textové verzi.

## Stock fotky
- `assets/img/stock/` — kruhové výřezy jídel z Pexels (volná licence), použité v úvodu, v černém pásu „Co u nás najdete“ a v CTA. Jsou ilustrační (uvedeno v patičce).
- Výřezy generuje `no1-litomerice-podklady/stock/vyrez.py` (střed a poloměr misky pro každou fotku).
- Galerie a „O nás“ zůstávají se skutečnými fotkami restaurace.
