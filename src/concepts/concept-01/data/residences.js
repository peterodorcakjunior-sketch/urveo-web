export const typologies = [
  {
    id: "alpine-one",
    number: "01",
    name: "Alpine One",
    image: null,
    rooms: "2",
    interiorRange: "58–67 m²",
    terraceRange: "12–18 m²",
    description: {
      sk: "Komorná rezidencia pre pokojný pobyt v horách.",
      en: "An intimate residence for unhurried stays in the mountains.",
    },
  },
  {
    id: "alpine-two",
    number: "02",
    name: "Alpine Two",
    image: null,
    rooms: "3",
    interiorRange: "82–96 m²",
    terraceRange: "18–26 m²",
    description: {
      sk: "Viac priestoru pre dni, ktoré sa nemusia ponáhľať.",
      en: "More space for days that have nowhere to hurry.",
    },
  },
  {
    id: "panorama",
    number: "03",
    name: "Panorama",
    image: null,
    rooms: "3–4",
    interiorRange: "105–125 m²",
    terraceRange: "26–38 m²",
    description: {
      sk: "Otvorený priestor orientovaný k horizontu.",
      en: "Open space composed around the horizon.",
    },
  },
  {
    id: "penthouse",
    number: "04",
    name: "Penthouse",
    image: null,
    rooms: "4",
    interiorRange: "145–168 m²",
    terraceRange: "45–62 m²",
    description: {
      sk: "Najvyššia úroveň súkromia, priestoru a výhľadu.",
      en: "The highest expression of privacy, space and outlook.",
    },
  },
];

const makeResidence = (id, typology, rooms, interiorArea, terraceArea, floor, orientation, parking, status, price) => ({
  id, typology, rooms, interiorArea, terraceArea, floor, orientation, parking, status, price, image: null, floorplan: null,
});

export const residences = [
  makeResidence("A.01", "alpine-one", 2, 58, 12, 1, "east", 1, "available", 329000),
  makeResidence("A.02", "alpine-one", 2, 61, 14, 1, "south-east", 1, "reserved", 342000),
  makeResidence("A.03", "alpine-one", 2, 63, 15, 2, "east", 1, "available", 349000),
  makeResidence("A.04", "alpine-one", 2, 65, 16, 2, "south-east", 1, "sold", 359000),
  makeResidence("A.05", "alpine-one", 2, 60, 13, 3, "east", 1, "available", 354000),
  makeResidence("A.06", "alpine-one", 2, 64, 16, 3, "south-east", 1, "reserved", 369000),
  makeResidence("A.07", "alpine-one", 2, 66, 17, 4, "east", 1, "available", 379000),
  makeResidence("A.08", "alpine-one", 2, 67, 18, 4, "south-east", 1, "sold", 389000),
  makeResidence("A.09", "alpine-two", 3, 82, 18, 1, "south", 1, "available", 429000),
  makeResidence("A.10", "alpine-two", 3, 85, 20, 1, "south-west", 1, "reserved", 449000),
  makeResidence("A.11", "alpine-two", 3, 88, 21, 2, "south", 1, "available", 459000),
  makeResidence("A.12", "alpine-two", 3, 90, 22, 2, "south-west", 2, "available", 479000),
  makeResidence("A.13", "alpine-two", 3, 92, 23, 3, "south", 2, "sold", 489000),
  makeResidence("A.14", "alpine-two", 3, 94, 24, 3, "south-west", 2, "reserved", 499000),
  makeResidence("A.15", "alpine-two", 3, 95, 25, 4, "south", 2, "available", 515000),
  makeResidence("A.16", "alpine-two", 3, 96, 26, 4, "south-west", 2, "available", 529000),
  makeResidence("B.05", "panorama", 3, 105, 26, 1, "south-west", 2, "available", 569000),
  makeResidence("B.06", "panorama", 3, 112, 29, 1, "west", 2, "reserved", 609000),
  makeResidence("B.07", "panorama", 3, 118, 31, 2, "south-west", 2, "available", 649000),
  makeResidence("B.08", "panorama", 4, 120, 34, 2, "west", 2, "available", 669000),
  makeResidence("B.09", "panorama", 4, 123, 36, 3, "south-west", 2, "reserved", 689000),
  makeResidence("B.10", "panorama", 4, 125, 38, 3, "west", 2, "sold", 699000),
  makeResidence("P.01", "penthouse", 4, 145, 45, 4, "south-west", 2, "available", 849000),
  makeResidence("P.02", "penthouse", 4, 168, 62, 4, "south-west", 3, "available", 990000),
];

export const residencesFor = (typologyId) => residences.filter((residence) => residence.typology === typologyId);

export const statusCounts = residences.reduce((counts, residence) => {
  counts[residence.status] += 1;
  return counts;
}, { available: 0, reserved: 0, sold: 0 });
