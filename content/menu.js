/*
  NO.1 Litoměřice — jídelní lístek.

  Zdroj: online nabídka restaurace (order.app.hd.digital), stav 09/2026.
  Položky označené `source: "foodora"` jsou v nabídce restaurace na Foodoře,
  ale jejich cena v restauraci není veřejně uvedená → `price: null` ukáže „cena u obsluhy“.

  Jak upravovat:
  - price: číslo v Kč (bez „Kč“), nebo null
  - variants: [{ label: "hovězí", price: 179 }, …] místo price, když jídlo má více variant
  - tags: "oblibene" (nejoblíbenější na Foodoře), "palive" (označeno restaurací 🌶), "vegan" (vegan v názvu u restaurace)
  - note: krátká poznámka pod popisem
*/
window.NO1 = window.NO1 || {};

window.NO1.menu = {
  updated: "09/2026",
  note: "Ceny platí pro restauraci a objednávky s vyzvednutím. Při rozvozu přes Foodoru se ceny liší.",
  categories: [
    {
      id: "polevky",
      title: "Polévky",
      vi: "Súp & Phở",
      items: [
        { code: "M9", name: "Phở Bò", sub: "hovězí maso", price: 189, tags: ["oblibene"], desc: "Vývar, rýžové ploché nudle, červená cibule, koriandr, citron, chilli papričky, lahůdková cibule, sójové klíčky" },
        { code: "M10", name: "Phở Gà", sub: "kuřecí maso", price: 179, desc: "Vývar, rýžové ploché nudle, červená cibule, koriandr, citron, chilli papričky, lahůdková cibule, sójové klíčky" },
        { code: "M11", name: "Phở Mix", sub: "hovězí & kuřecí", price: 189, desc: "Vývar, rýžové ploché nudle, červená cibule, koriandr, citron, chilli papričky, lahůdková cibule, sójové klíčky" },
        { code: "M12", name: "Phở Bò Tái", sub: "spařené maso", price: 189, desc: "Vývar, rýžové ploché nudle, červená cibule, koriandr, citron, chilli papričky, lahůdková cibule, sójové klíčky" },
        { code: "M12T", name: "Phở Tofu", price: 169, desc: "Vývar, rýžové ploché nudle, červená cibule, koriandr, citron, chilli papričky, lahůdková cibule, sójové klíčky", note: "Vývar je z masového základu. Alergeny: sója, celer." },
        { code: "M13", name: "Bún Bò Huế", price: 189, desc: "Vývar, rýžové nudle, hovězí maso, vepřová ramena, šlehané vepřové maso, ledový salát, sójové klíčky", note: "Alergeny: sója, celer." },
        { code: "M1", name: "Sup Me Vegan", price: 49, tags: ["vegan"], desc: "Indický tamarind, tofu, rajčata, mungo klíčky, jarní cibulka, hrášek" },
        { code: "M2", name: "Sup Tom Yum", price: 69, desc: "Krevety, žampiony, rajčata, cibule, koriandr, lahůdková cibule" },
        { code: "M3", name: "Sup s lososem", price: 79, desc: "Losos, žampiony, rajčata, cibule, koriandr, lahůdková cibule" },
      ],
    },
    {
      id: "predkrmy",
      title: "Předkrmy",
      vi: "Khai vị & Dim Sum",
      items: [
        { code: "M7", name: "Nem Rán", sub: "1 ks", price: 39, desc: "Mleté vepřové maso, jidášovo ucho, skleněné nudle, vejce, cibule, mrkev, rybí omáčka, rýžový papír" },
        { code: "M6", name: "Nem Song", sub: "1 ks", price: 39, desc: "Vepřové maso, pražená rýžová mouka, krevety, marinovaná mrkev, okurka, vejce, salát, koriandr, arašídová omáčka, rýžový papír, sezam, rýžové nudle" },
        { code: "M60", name: "Tom Bot", sub: "4 ks", price: 129, desc: "Smažené závitky s krevetami" },
        { code: "M61", name: "Tôm Chiên", sub: "4 ks", price: 119, desc: "Krevety obalované v těstíčku" },
        { code: "M64", name: "Napařované knedlíčky s krevetami", price: 129, desc: "" },
        { code: "M62", name: "Smažené knedlíčky", price: null, source: "foodora", desc: "S vepřovým masem a zeleninou" },
        { code: "M63", name: "Napařované knedlíčky", price: null, source: "foodora", desc: "S vepřovým masem a krevetami" },
      ],
    },
    {
      id: "bun-bo-nam-bo",
      title: "Bún Bò Nam Bộ",
      vi: "Rýžové nudle bez vývaru",
      items: [
        { code: "M16", name: "Bún Bò Nam Bộ", tags: ["oblibene"], variants: [ { label: "hovězí", price: 179 }, { label: "kuřecí", price: 179 }, { label: "krevety", price: 189 }, { label: "tofu", price: 179 } ], desc: "Rýžové nudle, marinovaná mrkev, okurka, sójové klíčky, perila, smažená cibulka, tamarindová omáčka, arašídy" },
      ],
    },
    {
      id: "nudle",
      title: "Nudle",
      vi: "Bún, Phở Xào, Miến",
      items: [
        { code: "M15", name: "Bún Chả", price: 179, tags: ["oblibene"], desc: "Rýžové nudle, koriandr, marinované vepřové maso, mrkev, perila, sezam, rybí omáčka, ledový salát, sójové klíčky" },
        { code: "M14", name: "Bún Ngan Nướng", price: 179, desc: "Kachní maso na roštu, rýžové nudle, rybí omáčka, sójová omáčka, voňavá zelenina, koriandr" },
        { code: "M41", name: "Phở Xào", sub: "smažené rýžové nudle", variants: [ { label: "hovězí", price: 179 }, { label: "kuřecí", price: 179 }, { label: "krevety", price: 189 } ], desc: "Smažené ploché rýžové nudle, vejce, mrkev, koriandr, sušené chilli, citron, arašídy" },
        { code: "M69", name: "Miến Xào", sub: "skleněné nudle", variants: [ { label: "hovězí", price: 179 }, { label: "kuřecí", price: 179 }, { label: "krevety", price: 189 } ], desc: "Tlusté skleněné nudle, maso, cibule, mrkev, houby, smažená cibulka" },
        { code: "M51", name: "Udon nudle", tags: ["oblibene"], variants: [ { label: "hovězí", price: 179 }, { label: "kuřecí", price: 179 }, { label: "krevety", price: 189 } ], desc: "Udon nudle, maso, červená paprika, baby špenát, fazolové lusky, sezam, žampiony, smažená cibulka" },
        { code: "M42", name: "Čínské nudle", price: null, source: "foodora", desc: "Nudle, vejce, maso, mrkev, zelí, cibule, česnek, pórek" },
      ],
    },
    {
      id: "hlavni-jidla",
      title: "Hlavní jídla",
      vi: "Cơm & wok",
      items: [
        { code: "M39", name: "Cơm Vịt", sub: "kachna s rýží", price: 209, desc: "Kachna, rýže, mungo klíčky, mrkev, čínské zelí, brokolice" },
        { code: "M40", name: "Thịt Bò Lúc Lắc", price: 179, desc: "Hovězí maso, rýže, paprika, cibule, čínské zelí, omáčka, koriandr" },
        { code: "M21", name: "Cơm Rang Lạp Xưởng", price: 179, desc: "Vietnamská klobása, smažená rýže, maso, vejce, hrášek, mrkev, koriandr, sójové klíčky" },
        { code: "M17", name: "Cơm Rang", sub: "smažená rýže", variants: [ { label: "hovězí", price: 149 }, { label: "kuřecí", price: 149 }, { label: "krevety", price: 159 }, { label: "zelenina & tofu", price: 149 } ], desc: "Smažená rýže, maso, vejce, hrášek, mrkev, koriandr, sójové klíčky" },
        { code: "M8", name: "Nem Rán menu", price: 139, desc: "Mleté vepřové maso, jidášovo ucho, skleněné nudle, vejce, cibule, mrkev, rybí omáčka, rýžový papír" },
        { code: "M70", name: "Thịt Xào Đỗ", sub: "s fazolovými lusky", variants: [ { label: "hovězí", price: 169 }, { label: "kuřecí", price: 169 }, { label: "krevety", price: 179 } ], desc: "Fazolové lusky, maso, rajčata, česnek, cibule, rýže" },
        { code: "M22", name: "Đậu Phụ Xào Giá", price: 159, tags: ["vegan"], desc: "Tofu, sójové klíčky, mrkev, brokolice, jarní cibulka, koriandr" },
        { code: "M68", name: "Bibimbap", tags: ["palive"], variants: [ { label: "hovězí", price: 189 }, { label: "kuřecí", price: 189 }, { label: "krevety", price: 199 } ], desc: "Maso, vejce, cuketa, mrkev, cibule, mungo klíčky, houby, česnek, pikantní sójová omáčka, sezam" },
        { code: "M72", name: "Thịt Kho Tàu", price: null, source: "foodora", desc: "Rýže, vepřové maso, vejce, salát, pepř, cibule" },
        { code: "M85", name: "Chả Lá Lốt", sub: "grilované závitky v listu piper lolot", price: null, source: "foodora", desc: "Rýžové nudle, listy piper lolot, vepřové maso, ledový salát, mrkev, okurka, koriandr" },
        { code: "", name: "Cơm Tấm Sài Gòn", price: null, source: "foodora", desc: "Rozlámaná rýže s grilovaným masem, vejcem a čerstvou zeleninou" },
      ],
    },
    {
      id: "kari",
      title: "Kari",
      vi: "Cà ri",
      items: [
        { code: "M71", name: "Kari", tags: ["palive"], variants: [ { label: "hovězí", price: 169 }, { label: "kuřecí", price: 169 }, { label: "krevety", price: 179 } ], desc: "Maso, kari, paprika, mrkev, cibule, brokolice, rýže, houby" },
      ],
    },
    {
      id: "salaty",
      title: "Saláty",
      vi: "Gỏi",
      items: [
        { code: "M65", name: "Salát s mangem", variants: [ { label: "krevety", price: 139 }, { label: "kuřecí", price: 139 }, { label: "hovězí", price: 139 } ], desc: "Mango, ledový salát, mrkev, okurka, cherry rajčata, ředkvička, mátová omáčka, edamame, sezam, majonéza" },
      ],
    },
    {
      id: "sushi",
      title: "Sushi",
      vi: "Japonská kuchyně",
      intro: "Vedle vietnamské kuchyně připravujeme i sushi.",
      groups: [
        { title: "Maki Roll", items: [
          { code: "S1", name: "Losos", price: 109 }, { code: "S2", name: "Tuňák", price: 109 },
          { code: "S3", name: "Avokádo", price: 99 }, { code: "S4", name: "Ředkev", price: 79 },
          { code: "S5", name: "Krevety", price: 109 }, { code: "S6", name: "Úhoř", price: 109 },
          { code: "S7", name: "Krabí", price: 99 }, { code: "S8", name: "Okurka", price: 79 },
        ]},
        { title: "Gunkan Maki", items: [
          { code: "S49", name: "Gunkan losos", sub: "2 ks", price: 149, desc: "Losos, kaviár" },
          { code: "S50", name: "Gunkan okurka", sub: "2 ks", price: 119, desc: "Losos, okurka" },
          { code: "S51", name: "Gunkan kaviár", sub: "2 ks", price: 119, desc: "Červený nebo černý kaviár" },
        ]},
        { title: "California Roll · 8 ks", items: [
          { code: "S9", name: "Vegan Cali", price: 199, tags: ["vegan"], desc: "Avokádo, okurka, ředkev, sezam, sněhová omáčka" },
          { code: "S10", name: "Vegan Cali avokádo", price: 259, tags: ["vegan"], desc: "Avokádo, okurka, ředkev, sněhová omáčka" },
          { code: "S11", name: "Tygří Cali", price: 309, desc: "Tygří krevety, sýr, avokádo, okurka, krabí krém, úhoř, teriyaki" },
          { code: "S12", name: "Tygří Cali avokádo", price: 309, desc: "Tygří krevety, sýr, avokádo, okurka, krabí krém, sněhová omáčka" },
          { code: "S13", name: "Losos Cali", price: 309, desc: "Losos, avokádo, okurka, sýr, krabí krém, pálivá omáčka, kaviár" },
          { code: "S14", name: "Avokádo Cali", price: 309, desc: "Losos, avokádo, okurka, sýr, krabí krém, sněhová omáčka" },
          { code: "S15", name: "Cali červený kaviár", price: 309, desc: "Losos, avokádo, okurka, sýr, krabí krém, červený kaviár" },
          { code: "S16", name: "Tuňák Cali roll", price: 309, desc: "Tuňák, avokádo, okurka, ředkev, sýr, pálivá omáčka, kaviár" },
          { code: "S17", name: "Tuňák Cali avokádo", price: 309, desc: "Tuňák, avokádo, okurka, ředkev, sýr, sněhová omáčka" },
          { code: "S18", name: "Tuňák Cali kaviár", price: 299, desc: "Tuňák, avokádo, okurka, ředkev, sýr, červený kaviár" },
        ]},
        { title: "California Fire · 8 ks", items: [
          { code: "S19", name: "Tygří krevety Fire", price: 329, desc: "Krevety, losos, sýr, avokádo, okurka, tempura sypání, teriyaki, sněhová omáčka, kaviár" },
          { code: "S20", name: "Losos Fire", price: 329, desc: "Pálivý losos, avokádo, okurka, sýr, tempura sypání, sněhová omáčka, teriyaki, kaviár" },
        ]},
        { title: "Tempura Roll · smažené · 8 ks", items: [
          { code: "S21", name: "Moc Roll", price: 329, desc: "Tuňák, sýr, okurka, avokádo, krabí krém, wasabi, sněhová omáčka, sypání tempura, kaviár" },
          { code: "S22", name: "Tripple S Roll", price: 329, desc: "Pálivý losos, sýr, avokádo, okurka, krabí krém, sněhová omáčka, sypání tempura, kaviár" },
          { code: "S23", name: "Tom Roll", price: 329, desc: "Smažené krevety, úhoř, sýr, avokádo, okurka, krabí krém, sněhová omáčka, sypání tempura, kaviár" },
          { code: "S23a", name: "Vegan Tempura Roll", price: 309, tags: ["vegan"], desc: "Avokádo, okurka, ředkev, mango" },
        ]},
        { title: "Special Roll · 8 ks", items: [
          { code: "S24", name: "Grejsha Roll", price: 329, desc: "Pálivý losos, krevety, sýr, avokádo, okurka, krabí krém, sněhová omáčka, kaviár" },
          { code: "S25", name: "Moc To Moc Roll", price: 329, desc: "Smažené krevety, sýr, avokádo, okurka, krabí krém, sněhová omáčka, sypání tempura, kaviár" },
          { code: "S26", name: "Kamikaze Roll", price: 329, desc: "Tuňák, avokádo, okurka, krabí krém, pálivá omáčka, wasabi omáčka, kaviár" },
        ]},
        { title: "Sushi Bowl", items: [
          { code: "S36", name: "Losos bowl", price: 199, desc: "Losos, salát, edamame, avokádo, okurka, mrkev, ředkvička, teriyaki, pálivá omáčka" },
          { code: "S37", name: "Krabí bowl", price: 199, desc: "Krab, salát, edamame, avokádo, okurka, mrkev, ředkvička, teriyaki, sněhová omáčka" },
          { code: "S38", name: "Mango bowl", price: 169, desc: "Mango, cherry rajčata, salát, edamame, avokádo, okurka, mrkev, ředkvička, teriyaki, sněhová omáčka" },
        ]},
        { title: "Nigiri · Sashimi · Temaki", items: [
          { code: "S28", name: "Nigiri losos", sub: "2 ks", price: 109 }, { code: "S29", name: "Nigiri tuňák", sub: "2 ks", price: 109 },
          { code: "S30", name: "Nigiri úhoř", sub: "2 ks", price: 109 }, { code: "S31", name: "Nigiri avokádo", sub: "2 ks", price: 109 },
          { code: "S34", name: "Sashimi losos", sub: "4 ks", price: 169 }, { code: "S35", name: "Sashimi tuňák", sub: "4 ks", price: 169 },
          { code: "S45", name: "Temaki losos", price: 129 }, { code: "S46", name: "Temaki tuňák", price: 129 },
          { code: "S47", name: "Temaki krabí", price: 129 }, { code: "S48", name: "Temaki vegan", price: 129, tags: ["vegan"] },
        ]},
        { title: "Sushi sety", items: [
          { code: "S39", name: "Vegan Maki", sub: "24 ks", price: 199, tags: ["vegan"], desc: "8 ks avokádo, 8 ks okurka, 8 ks ředkev" },
          { code: "S40", name: "Nigiri Maki", sub: "18 ks", price: 259, desc: "8 ks tuňák, 8 ks losos, 2 ks nigiri losos" },
          { code: "S41", name: "Sushi Maki", sub: "24 ks", price: 279, desc: "8 ks tuňák, 8 ks krab, 8 ks losos" },
          { code: "S42", name: "California Maki", sub: "16 ks", price: 279, tags: ["oblibene"], desc: "8 ks losos, 8 ks cali losos sezam" },
          { code: "S43", name: "Nigiri", sub: "8 ks", price: 309, desc: "2 ks losos, 2 ks tuňák, 2 ks krevety, 2 ks úhoř" },
          { code: "S44", name: "Nigiri losos", price: 319, desc: "8 ks nigiri losos fire" },
          { code: "S52", name: "Sushi set California", price: 499, desc: "8 ks tygří krevety fire, 8 ks maki ředkev, 2 ks nigiri krevety, 2 ks nigiri krab" },
          { code: "S53", name: "Sushi set vegan", price: 459, tags: ["vegan"], desc: "8 ks futo vegan, 8 ks maki okurka, 2 ks nigiri avokádo" },
          { code: "S54", name: "Sushi set Fire", price: 609, desc: "8 ks avokádo losos cali, 8 ks maki tuňák, 2 ks nigiri losos, 2 ks gunkan kaviár" },
          { code: "S55", name: "Sushi set XL", price: 1199, desc: "8 ks losos, 8 ks cali úhoř, 8 ks maki avokádo, 2 ks nigiri avokádo, 2 ks gunkan losos, 2 ks gunkan kaviár, 4 ks sashimi losos" },
          { code: "S57", name: "Sushi set XXL", price: 2399, desc: "8 ks maki okurka, 8 ks maki tuňák, 8 ks losos, 8 ks tempura roll, 8 ks Moc To Moc roll, 8 ks pizza losos, 8 ks losos sezam, 8 ks sashimi mix, nigiri, gunkan, 4 ks smažené krevety" },
          { code: "S56", name: "Sushi set XXXL", price: 2699, desc: "8 ks futo maki, 8 ks California tuňák, 8 ks cali losos avokádo, 8 ks cali losos kaviár, 8 ks maki avokádo, 8 ks maki ředkev, 8 ks sashimi, temaki losos, nigiri, gunkan, 4 ks smažené krevety" },
        ]},
      ],
    },
    {
      id: "dezerty",
      title: "Dezerty",
      vi: "Tráng miệng",
      items: [
        { code: "D1", name: "Mochi buchtičky", sub: "2 ks", price: null, source: "foodora", desc: "Různé příchutě" },
        { code: "D3", name: "Vietnamský koblížek", price: null, source: "foodora", desc: "Lehký smažený koblížek s nadýchaným těstem a jemně sladkou chutí" },
        { code: "D4", name: "Černá rýže", price: null, source: "foodora", desc: "Lepkavá rýže s jogurtem a kokosovým mlékem" },
      ],
    },
    {
      id: "napoje",
      title: "Nápoje",
      vi: "Đồ uống",
      items: [
        { code: "N12", name: "Domácí čaj mango", price: null, source: "foodora", desc: "Jasmínový čaj, mango" },
        { code: "N13", name: "Domácí čaj jahoda", price: null, source: "foodora", desc: "Čaj, jahoda" },
        { code: "N14", name: "Domácí čaj maracuja", price: null, source: "foodora", desc: "Čaj, maracuja" },
        { code: "N15", name: "Domácí čaj meloun", price: null, source: "foodora", desc: "Čaj, meloun" },
        { code: "", name: "Coca-Cola", sub: "0,33 l", price: 49 },
        { code: "", name: "Coca-Cola Zero", sub: "0,33 l", price: 49 },
        { code: "", name: "Fanta, Sprite, perlivá voda", sub: "0,33 l", price: null, source: "foodora" },
      ],
      note: "Celou nápojovou nabídku vám rádi ukážeme přímo v restauraci.",
    },
    {
      id: "detske-menu",
      title: "Dětské menu",
      vi: "Pro nejmenší",
      items: [
        { code: "M84", name: "Smažené kuřecí řízečky", price: null, source: "foodora", desc: "S hranolkami" },
      ],
    },
  ],
};
