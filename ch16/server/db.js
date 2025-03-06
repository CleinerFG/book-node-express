// Dados estáticos para simular as informações de férias
const vacations = [
  {
    name: "Hood River Day Trip",
    slug: "hood-river-day-trip",
    category: "Day Trip",
    sku: "HR199",
    description:
      "Spend a day sailing on the Columbia and enjoying craft beers in Hood River!",
    price: 99.95,
    tags: ["day trip", "hood river", "sailing", "windsurfing", "breweries"],
    inSeason: true,
    maximumGuests: 16,
    available: true,
    packagesSold: 0,
  },
  {
    name: "Oregon Coast Getaway",
    slug: "oregon-coast-getaway",
    category: "Weekend Getaway",
    sku: "OC39",
    description: "Enjoy the ocean air and quaint coastal towns!",
    price: 269.95,
    tags: ["weekend getaway", "oregon coast", "beachcombing"],
    inSeason: false,
    maximumGuests: 8,
    available: true,
    packagesSold: 0,
  },
  {
    name: "Rock Climbing in Bend",
    slug: "rock-climbing-in-bend",
    category: "Adventure",
    sku: "B99",
    description: "Experience the thrill of climbing in the high desert.",
    price: 289.95,
    tags: ["weekend getaway", "bend", "high desert", "rock climbing"],
    inSeason: true,
    requiresWaiver: true,
    maximumGuests: 4,
    available: false,
    packagesSold: 0,
    notes: "The tour guide is currently recovering from a skiing accident.",
  },
];

// Dados estáticos para simular os ouvintes de férias em temporada
const vacationInSeasonListeners = [];

// Dados estáticos para simular as atrações
const attractions = [];

module.exports = {
  getVacations: async (options = {}) => {
    return vacations.filter((vacation) => {
      return Object.keys(options).every(
        (key) => vacation[key] === options[key]
      );
    });
  },
  getVacationBySku: async (sku) =>
    vacations.find((vacation) => vacation.sku === sku),
  addVacationInSeasonListener: async (email, sku) => {
    const listener = vacationInSeasonListeners.find(
      (listener) => listener.email === email
    );
    if (listener) {
      listener.skus.push(sku);
    } else {
      vacationInSeasonListeners.push({ email, skus: [sku] });
    }
  },
  getAttractions: async (options = {}) => {
    return attractions.filter((attraction) => {
      return Object.keys(options).every(
        (key) => attraction[key] === options[key]
      );
    });
  },
  addAttraction: async (attraction) => attractions.push(attraction),
};
