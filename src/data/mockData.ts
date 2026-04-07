export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  tags: string[];
  image: string;
  latitude: number;
  longitude: number;
}

export interface Activity {
  id: string;
  destinationId: string;
  name: string;
  category: string;
  duration: string;
  shift: 'morning' | 'afternoon' | 'evening';
  description: string;
  address: string;
  tips: string;
  images: string[];
  latitude: number;
  longitude: number;
}

export const destinations: Destination[] = [
  {
    id: 'd1', name: 'Florianópolis', country: 'Brasil',
    description: 'A tropical island paradise with pristine beaches, lush Atlantic Forest trails, and a vibrant surf culture that blends adventure with laid-back coastal charm.',
    tags: ['beach', 'nature', 'adventure', 'moderate'],
    image: 'https://picsum.photos/seed/floripa/800/600',
    latitude: -27.5954, longitude: -48.548,
  },
  {
    id: 'd2', name: 'Gramado', country: 'Brasil',
    description: 'A charming European-inspired mountain town known for its artisanal chocolate, fine dining, and cozy winter festivals nestled in the Serra Gaúcha.',
    tags: ['mountains', 'culture', 'gastronomy', 'comfortable'],
    image: 'https://picsum.photos/seed/gramado/800/600',
    latitude: -29.3739, longitude: -50.8765,
  },
  {
    id: 'd3', name: 'Fernando de Noronha', country: 'Brasil',
    description: 'An exclusive volcanic archipelago with crystalline waters, world-class diving, and protected marine life — a true bucket-list destination.',
    tags: ['beach', 'nature', 'adventure', 'luxury'],
    image: 'https://picsum.photos/seed/noronha/800/600',
    latitude: -3.8547, longitude: -32.4247,
  },
  {
    id: 'd4', name: 'Chapada Diamantina', country: 'Brasil',
    description: 'Dramatic table-top mountains, hidden caves, thundering waterfalls, and endless trekking routes through Brazil\'s rugged interior.',
    tags: ['mountains', 'nature', 'adventure', 'budget'],
    image: 'https://picsum.photos/seed/chapada/800/600',
    latitude: -12.4292, longitude: -41.348,
  },
  {
    id: 'd5', name: 'Bonito', country: 'Brasil',
    description: 'Crystal-clear rivers, underground caves, and immersive ecotourism in the heart of Mato Grosso do Sul.',
    tags: ['nature', 'adventure', 'ecotourism', 'moderate'],
    image: 'https://picsum.photos/seed/bonito/800/600',
    latitude: -21.1261, longitude: -56.4836,
  },
  {
    id: 'd6', name: 'Buenos Aires', country: 'Argentina',
    description: 'A cosmopolitan capital pulsing with tango, world-class steakhouses, and a thriving arts scene.',
    tags: ['city', 'culture', 'gastronomy', 'comfortable'],
    image: 'https://picsum.photos/seed/buenosaires/800/600',
    latitude: -34.6037, longitude: -58.3816,
  },
  {
    id: 'd7', name: 'Cartagena', country: 'Colômbia',
    description: 'A walled colonial gem on the Caribbean coast with colorful streets, rich history, and vibrant nightlife.',
    tags: ['beach', 'city', 'culture', 'moderate'],
    image: 'https://picsum.photos/seed/cartagena/800/600',
    latitude: 10.391, longitude: -75.5144,
  },
  {
    id: 'd8', name: 'Cusco', country: 'Peru',
    description: 'The ancient Inca capital surrounded by sacred valleys, archaeological wonders, and the gateway to Machu Picchu.',
    tags: ['mountains', 'culture', 'history', 'adventure', 'moderate'],
    image: 'https://picsum.photos/seed/cusco/800/600',
    latitude: -13.532, longitude: -71.9675,
  },
];

const categories = ['Sightseeing', 'Food & Drink', 'Nature', 'Adventure', 'Culture', 'Shopping'];
const shifts: ('morning' | 'afternoon' | 'evening')[] = ['morning', 'afternoon', 'evening'];

const activityTemplates: Record<string, { names: string[]; descriptions: string[]; coords: [number, number][] }> = {
  'd1': {
    names: ['Praia da Joaquina', 'Lagoa da Conceição', 'Mercado Público', 'Trilha da Lagoinha do Leste', 'Ribeirão da Ilha', 'Santo Antônio de Lisboa', 'Barra da Lagoa', 'Jurerê Internacional'],
    descriptions: [
      'Famous surf beach with massive dunes and golden sand.',
      'A stunning lagoon perfect for windsurfing and waterside dining.',
      'Historic market with fresh seafood and local crafts.',
      'Challenging trail leading to one of the most beautiful hidden beaches.',
      'Historic fishing village famous for oyster farms.',
      'Charming Azorean village with art galleries and sunset views.',
      'Fishing village with a natural canal and boat rides.',
      'Upscale beach district with beach clubs and nightlife.',
    ],
    coords: [[-27.6308,-48.4753],[-27.5934,-48.4832],[-27.5969,-48.5495],[-27.7756,-48.4897],[-27.7142,-48.5669],[-27.5092,-48.5189],[-27.5734,-48.4226],[-27.4362,-48.4933]],
  },
  'd2': {
    names: ['Lago Negro', 'Rua Coberta', 'Mundo de Chocolate', 'Vinícola Ravanello', 'Mini Mundo', 'Snowland', 'Le Jardin Parque de Lavanda', 'Café Colonial'],
    descriptions: [
      'A romantic dark-water lake surrounded by European-style gardens.',
      'Covered street with restaurants, shops and live music performances.',
      'Interactive chocolate museum with tastings and factory tours.',
      'Award-winning winery with tastings and vineyard walks.',
      'Miniature park recreating famous world landmarks.',
      'South America\'s first indoor snow park with skiing and snowboarding.',
      'Lavender fields with panoramic views of the Serra Gaúcha.',
      'Traditional colonial-style afternoon tea with dozens of pastries.',
    ],
    coords: [[-29.3833,-50.8773],[-29.3749,-50.8760],[-29.3721,-50.8742],[-29.1647,-51.1538],[-29.3745,-50.8714],[-29.3701,-50.8619],[-29.3567,-50.8487],[-29.3682,-50.8798]],
  },
  'd3': {
    names: ['Baía do Sancho', 'Mirante dos Golfinhos', 'Mergulho no Sueste', 'Forte de Nossa Senhora', 'Praia do Leão', 'Trilha do Atalaia', 'Praia da Conceição', 'Passeio de Barco'],
    descriptions: [
      'Consistently voted one of the world\'s most beautiful beaches.',
      'Viewpoint where you can watch spinner dolphins at sunrise.',
      'Snorkeling spot teeming with sea turtles and tropical fish.',
      'Historic fortress with panoramic views of the archipelago.',
      'Turtle nesting beach with dramatic rock formations.',
      'Guided trail to natural tide pools with marine life.',
      'Long golden beach perfect for sunset contemplation.',
      'Boat tour around the islands with dolphin sightings.',
    ],
    coords: [[-3.8552,-32.4440],[-3.8636,-32.4456],[-3.8571,-32.4109],[-3.8393,-32.4116],[-3.8649,-32.4098],[-3.8669,-32.4224],[-3.8412,-32.4274],[-3.8489,-32.4330]],
  },
  'd4': {
    names: ['Cachoeira da Fumaça', 'Gruta da Lapa Doce', 'Poço Azul', 'Vale do Paty', 'Morro do Pai Inácio', 'Poço Encantado', 'Cachoeira do Buracão', 'Igatu'],
    descriptions: [
      'Brazil\'s tallest waterfall plunging 380 meters into the valley.',
      'Massive limestone cave with stunning stalactite formations.',
      'Underground cave pool with ethereal blue water lit by sunlight.',
      'Multi-day trek through one of Brazil\'s most scenic valleys.',
      'Iconic tabletop mountain with 360-degree panoramic views.',
      'Crystal-clear cave pool that glows blue in the morning light.',
      'Spectacular canyon waterfall reached via a river hike.',
      'Ghost town turned open-air art gallery in the mountains.',
    ],
    coords: [[-12.5833,-41.6167],[-12.3667,-41.5667],[-12.7506,-41.3367],[-12.4833,-41.4333],[-12.4519,-41.6056],[-12.7497,-41.3364],[-13.1531,-41.1142],[-12.5853,-41.3264]],
  },
  'd5': {
    names: ['Rio da Prata', 'Gruta do Lago Azul', 'Boia Cross', 'Aquário Natural', 'Abismo Anhumas', 'Buraco das Araras', 'Estância Mimosa', 'Rio Sucuri'],
    descriptions: [
      'Crystal-clear river snorkeling with schools of colorful fish.',
      'Blue-hued underground lake inside a massive cave.',
      'Thrilling river tubing through rapids and calm stretches.',
      'Natural spring aquarium with incredible underwater visibility.',
      'Rappel into a cave with an underground lake — for the bold.',
      'A giant natural sinkhole home to red macaw colonies.',
      'Waterfall trail through private ecological reserve.',
      'Peaceful float down one of the clearest rivers on Earth.',
    ],
    coords: [[-21.2489,-56.5272],[-21.1208,-56.5873],[-21.1569,-56.4731],[-21.2547,-56.4506],[-21.1317,-56.5731],[-21.4939,-56.5772],[-21.2011,-56.5036],[-21.2572,-56.4142]],
  },
  'd6': {
    names: ['La Boca & Caminito', 'Recoleta Cemetery', 'San Telmo Market', 'Teatro Colón', 'Puerto Madero', 'Parrilla Experience', 'MALBA Museum', 'Tango Show'],
    descriptions: [
      'Colorful neighborhood with street art, tango, and Italian heritage.',
      'Ornate mausoleum-filled cemetery where Evita rests.',
      'Sunday antique market with tango dancers and street performers.',
      'World-renowned opera house with stunning architecture.',
      'Modern waterfront district with excellent restaurants.',
      'Traditional Argentine steakhouse experience with Malbec wine.',
      'Latin American art museum with rotating contemporary exhibits.',
      'Authentic dinner tango show in a historic milonga venue.',
    ],
    coords: [[-34.6345,-58.3631],[-34.5882,-58.3939],[-34.6215,-58.3718],[-34.6011,-58.3833],[-34.6117,-58.3617],[-34.5996,-58.3750],[-34.5769,-58.4028],[-34.6150,-58.3800]],
  },
  'd7': {
    names: ['Ciudad Amurallada', 'Castillo San Felipe', 'Islas del Rosario', 'Getsemaní', 'Bazurto Market', 'Café del Mar', 'Playa Blanca', 'Chiva Party Bus'],
    descriptions: [
      'Walk the colorful colonial streets inside the walled old city.',
      'Massive hilltop fortress with tunnels and panoramic views.',
      'Island day trip with snorkeling and fresh seafood.',
      'Bohemian neighborhood with street art and lively nightlife.',
      'Authentic local market with tropical fruits and street food.',
      'Sunset cocktails on the ancient city walls.',
      'White-sand beach escape on the Barú peninsula.',
      'Iconic open-air party bus tour through the city at night.',
    ],
    coords: [[10.4236,-75.5503],[10.4225,-75.5373],[10.1764,-75.7536],[10.4199,-75.5492],[10.4000,-75.5133],[10.4267,-75.5483],[10.1742,-75.6122],[10.4150,-75.5400]],
  },
  'd8': {
    names: ['Machu Picchu Day Trip', 'Sacred Valley Tour', 'San Pedro Market', 'Sacsayhuamán', 'Rainbow Mountain', 'Chocolate Museum', 'Plaza de Armas', 'Pisco Sour Workshop'],
    descriptions: [
      'Train journey to the legendary Inca citadel in the clouds.',
      'Full-day tour of Ollantaytambo, Pisac, and Moray terraces.',
      'Bustling market with exotic fruits, fresh juices, and local dishes.',
      'Massive Inca stone fortress overlooking Cusco.',
      'High-altitude hike to the famous Vinicunca rainbow slopes.',
      'Learn about cacao and craft your own Peruvian chocolate.',
      'The grand central plaza flanked by colonial architecture.',
      'Hands-on cocktail class making Peru\'s national drink.',
    ],
    coords: [[-13.1631,-72.5450],[-13.3319,-72.1553],[-13.5186,-71.9786],[-13.5089,-71.9822],[-13.8700,-71.3028],[-13.5150,-71.9781],[-13.5170,-71.9785],[-13.5200,-71.9750]],
  },
};

export const activities: Activity[] = destinations.flatMap((dest) => {
  const template = activityTemplates[dest.id];
  return template.names.map((name, i) => ({
    id: `${dest.id}-a${i + 1}`,
    destinationId: dest.id,
    name,
    category: categories[i % categories.length],
    duration: `${1 + (i % 3) + 1}h`,
    shift: shifts[i % 3],
    description: template.descriptions[i],
    address: `${name}, ${dest.name}, ${dest.country}`,
    tips: `Best to visit during ${shifts[i % 3]}. Bring comfortable shoes and water.`,
    images: [
      `https://picsum.photos/seed/${dest.id}-${i}-1/800/600`,
      `https://picsum.photos/seed/${dest.id}-${i}-2/800/600`,
      `https://picsum.photos/seed/${dest.id}-${i}-3/800/600`,
    ],
    latitude: template.coords[i][0],
    longitude: template.coords[i][1],
  }));
});

export function getDestinationActivities(destId: string): Activity[] {
  return activities.filter(a => a.destinationId === destId);
}

export function getActivity(id: string): Activity | undefined {
  return activities.find(a => a.id === id);
}

export function getDestination(id: string): Destination | undefined {
  return destinations.find(d => d.id === id);
}

export function calculateMatch(userTags: string[], destTags: string[]): number {
  if (userTags.length === 0) return Math.floor(Math.random() * 30 + 60);
  const matches = destTags.filter(t => userTags.includes(t)).length;
  return Math.min(100, Math.floor((matches / Math.max(destTags.length, userTags.length)) * 100 + 30));
}