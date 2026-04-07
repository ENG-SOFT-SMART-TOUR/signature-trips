import type { Destination } from './types';

export const destinations: Destination[] = [
  // ── South America ──
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

  // ── New York State ──
  {
    id: 'd9', name: 'New York City', country: 'United States',
    description: 'The city that never sleeps — iconic skyline, world-class museums, Broadway, and an unmatched culinary scene across five diverse boroughs.',
    tags: ['city', 'culture', 'gastronomy', 'luxury'],
    image: 'https://picsum.photos/seed/nyc/800/600',
    latitude: 40.7128, longitude: -74.0060,
  },
  {
    id: 'd10', name: 'Hudson Valley', country: 'United States',
    description: 'Rolling hills, historic estates, farm-to-table dining, and autumn foliage that rivals anywhere on earth — just an hour north of Manhattan.',
    tags: ['nature', 'culture', 'gastronomy', 'comfortable'],
    image: 'https://picsum.photos/seed/hudsonvalley/800/600',
    latitude: 41.4370, longitude: -74.0132,
  },

  // ── California ──
  {
    id: 'd11', name: 'San Francisco', country: 'United States',
    description: 'A fog-kissed gem on the bay with the Golden Gate, Victorian charm, cutting-edge cuisine, and neighborhoods bursting with creative energy.',
    tags: ['city', 'culture', 'gastronomy', 'moderate'],
    image: 'https://picsum.photos/seed/sanfrancisco/800/600',
    latitude: 37.7749, longitude: -122.4194,
  },
  {
    id: 'd12', name: 'Big Sur', country: 'United States',
    description: 'Jaw-dropping Pacific coastline, towering redwoods, and one of the most scenic highway stretches on the planet — raw California beauty.',
    tags: ['nature', 'adventure', 'luxury', 'romantic'],
    image: 'https://picsum.photos/seed/bigsur/800/600',
    latitude: 36.2704, longitude: -121.8081,
  },
  {
    id: 'd13', name: 'Los Angeles', country: 'United States',
    description: 'Sun-soaked sprawl where Hollywood glamour meets beach culture, world-class art, and one of the most diverse food scenes on the planet.',
    tags: ['city', 'culture', 'beach', 'luxury'],
    image: 'https://picsum.photos/seed/losangeles/800/600',
    latitude: 34.0522, longitude: -118.2437,
  },

  // ── Texas ──
  {
    id: 'd14', name: 'Austin', country: 'United States',
    description: 'The live-music capital of the world, with thriving food-truck culture, tech innovation, and a "Keep It Weird" spirit all its own.',
    tags: ['city', 'culture', 'gastronomy', 'moderate'],
    image: 'https://picsum.photos/seed/austin/800/600',
    latitude: 30.2672, longitude: -97.7431,
  },
  {
    id: 'd15', name: 'Big Bend National Park', country: 'United States',
    description: 'Remote desert wilderness along the Rio Grande with dramatic canyons, star-filled skies, and some of the most isolated trails in North America.',
    tags: ['nature', 'adventure', 'mountains', 'budget'],
    image: 'https://picsum.photos/seed/bigbend/800/600',
    latitude: 29.2498, longitude: -103.2502,
  },

  // ── Europe ──
  {
    id: 'd16', name: 'Paris', country: 'France',
    description: 'The City of Light — timeless architecture, legendary museums, Michelin-starred dining, and romance woven into every cobblestone.',
    tags: ['city', 'culture', 'gastronomy', 'luxury'],
    image: 'https://picsum.photos/seed/paris/800/600',
    latitude: 48.8566, longitude: 2.3522,
  },
  {
    id: 'd17', name: 'Amalfi Coast', country: 'Italy',
    description: 'Pastel villages clinging to dramatic cliffs above the turquoise Tyrrhenian Sea — Italy\'s most photogenic stretch of coastline.',
    tags: ['beach', 'culture', 'gastronomy', 'luxury'],
    image: 'https://picsum.photos/seed/amalfi/800/600',
    latitude: 40.6333, longitude: 14.6029,
  },
  {
    id: 'd18', name: 'Barcelona', country: 'Spain',
    description: 'Gaudí\'s surreal architecture, golden Mediterranean beaches, vibrant tapas bars, and a nightlife that runs until dawn.',
    tags: ['city', 'beach', 'culture', 'gastronomy', 'moderate'],
    image: 'https://picsum.photos/seed/barcelona/800/600',
    latitude: 41.3874, longitude: 2.1686,
  },
  {
    id: 'd19', name: 'Santorini', country: 'Greece',
    description: 'Whitewashed villages perched on volcanic cliffs overlooking the caldera — sunsets, wine, and Aegean blue at every turn.',
    tags: ['beach', 'culture', 'romantic', 'luxury'],
    image: 'https://picsum.photos/seed/santorini/800/600',
    latitude: 36.3932, longitude: 25.4615,
  },
  {
    id: 'd20', name: 'Swiss Alps', country: 'Switzerland',
    description: 'Snow-capped peaks, emerald valleys, scenic rail journeys, and chocolate-box villages — the ultimate alpine escape.',
    tags: ['mountains', 'nature', 'adventure', 'luxury'],
    image: 'https://picsum.photos/seed/swissalps/800/600',
    latitude: 46.8182, longitude: 8.2275,
  },
];
