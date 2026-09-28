/*
  NO.1 Litoměřice — základní údaje restaurace.
  Tady se mění kontakty, otevírací doba a odkazy. Design se nemusí upravovat.
  Otevírací doba: dny 1 = pondělí … 7 = neděle, časy ve formátu "HH:MM".
*/
window.NO1 = window.NO1 || {};

window.NO1.restaurant = {
  name: "NO.1 Litoměřice",
  fullName: "NO.1 – Litoměřice – Pravá Vietnamská Restaurace",
  tagline: "Pravá vietnamská kuchyně",

  address: {
    street: "Kostelní náměstí 234/2",
    zip: "412 01",
    city: "Litoměřice",
  },

  phone: "+420 723 384 990",
  phoneHref: "tel:+420723384990",
  email: "no.1litomerice@gmail.com",

  links: {
    foodora: "https://www.foodora.cz/restaurant/gmcl/no-1-litomerice-prava-vietnamska-restaurace",
    instagram: "https://www.instagram.com/no.1_litomerice/",
    facebook: "https://www.facebook.com/p/No1-Litom%C4%9B%C5%99ice-Prav%C3%A1-Vietnamsk%C3%A1-Kuchyn%C4%9B-61565409225782/",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Kosteln%C3%AD+n%C3%A1m%C4%9Bst%C3%AD+234%2F2%2C+412+01+Litom%C4%9B%C5%99ice",
    mapyCz: "https://mapy.cz/zakladni?q=Kosteln%C3%AD%20n%C3%A1m%C4%9Bst%C3%AD%20234%2F2%20Litom%C4%9B%C5%99ice",
  },

  // Běžná otevírací doba (restaurace + kuchyně)
  hours: [
    { day: 1, label: "Pondělí", open: "11:00", close: "22:00" },
    { day: 2, label: "Úterý",   open: "11:00", close: "22:00" },
    { day: 3, label: "Středa",  open: "11:00", close: "22:00" },
    { day: 4, label: "Čtvrtek", open: "11:00", close: "22:00" },
    { day: 5, label: "Pátek",   open: "11:00", close: "22:00" },
    { day: 6, label: "Sobota",  open: "11:00", close: "22:00" },
    { day: 7, label: "Neděle",  open: "11:00", close: "22:00" },
  ],

  // Zobrazí se pod otevírací dobou. Změny (svátky, zavřeno) hlásí restaurace na Facebooku.
  hoursNote: "O svátcích se otevírací doba může lišit — aktuální změny najdete na našem Facebooku.",

  // Mimořádné dny: { date: "2026-12-24", label: "Štědrý den", closed: true } nebo { date, open, close }
  specialDays: [],

  // Služby uvedené restaurací na jejím webu
  services: ["Bezbariérový přístup", "Jídlo s sebou", "Domácí mazlíčci vítáni", "Dárkové poukázky 300 / 500 / 1000 Kč"],
  payments: "Hotovost, platební karty, bezkontaktně i Apple Pay",
};
