
import { PujaService } from './types.ts';

export const SERVICES: PujaService[] = [
  // Pooja & Rituals
  {
    id: 'ganpati-pujan',
    name: 'Ganapati & Lakshmi Pooja',
    description: 'Auspicious worship performed at the beginning of any good deed.',
    duration: '45-60 mins',
    deity: 'Ganesh & Lakshmi',
    mantra: 'Om Gam Ganapataye Namaha',
    image: 'https://images.unsplash.com/photo-1634125603415-ef6628c68ff8?auto=format&fit=crop&q=80&w=800',
    category: 'Regular',
    price: 1100,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/10/14/audio_9bcfe53422.mp3', // Spiritual/Ambient sample
    faqs: [
      { question: 'What materials are needed?', answer: 'Flowers, coconut, betel leaves, sweets, and diya are commonly required.' },
      { question: 'What are the benefits?', answer: 'Removes obstacles and brings prosperity and wisdom to the house.' }
    ]
  },
  {
    id: 'rudrabhishek',
    name: 'Shiva Pooja (Rudrabhishek)',
    description: 'Special ritual for peace and health by performing Abhishek of Lord Shiva.',
    duration: '90-120 mins',
    deity: 'Lord Shiva',
    mantra: 'Om Namah Shivaya',
    image: 'https://images.unsplash.com/photo-1628169123164-9279dc6eb918?auto=format&fit=crop&q=80&w=800',
    category: 'Special',
    price: 5100,
    audioUrl: 'https://cdn.pixabay.com/audio/2021/11/25/audio_10842a5c84.mp3',
    faqs: [
      { question: 'Is milk mandatory for Abhishek?', answer: 'While preferred, water with honey or Panchamrit can also be used.' },
      { question: 'Best time for Rudrabhishek?', answer: 'Mondays, Shivaratri, or during the holy month of Shravan.' }
    ]
  },
  {
    id: 'durga-pujan',
    name: 'Durga Pooja',
    description: 'Divine worship of Goddess Durga for strength and protection.',
    duration: '60-90 mins',
    deity: 'Goddess Durga',
    mantra: 'Om Dum Durgayei Namaha',
    image: 'https://images.unsplash.com/photo-1636239103975-6e4657edbcf7?auto=format&fit=crop&q=80&w=800',
    category: 'Special',
    price: 3101,
    audioUrl: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
    faqs: [
      { question: 'What is the significance of Kanya Pujan?', answer: 'It is a ritual honoring the divine feminine through young girls representing Goddess Durga.' },
      { question: 'Duration of the puja?', answer: 'Typically 60 to 90 minutes depending on the complexity of the rituals requested.' }
    ]
  },
  {
    id: 'navgrah-shanti',
    name: 'Navagraha Pooja (Graha Shanti)',
    description: 'Worship to reduce adverse planetary influences and bring prosperity.',
    duration: '120-150 mins',
    deity: 'Nine Planets (Navagrahas)',
    mantra: 'Om Navagrahaya Namah',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a67a06d1?auto=format&fit=crop&q=80&w=800',
    category: 'Special',
    price: 7500,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    faqs: [
      { question: 'How many priests are required?', answer: 'For a full Navagraha Shanti, 1 to 3 priests are recommended for the mantras and rituals.' },
      { question: 'Can it be performed for a specific planet?', answer: 'Yes, special pujas for specific planets (like Shani or Mangal) can also be arranged.' }
    ]
  },
  // Griha Pravesh
  {
    id: 'griha-pravesh',
    name: 'Housewarming (Griha Pravesh)',
    description: 'Scriptural worship and Vastu correction before moving into a new home.',
    duration: '180-240 mins',
    deity: 'Vastu Purush & Lord Ganesha',
    mantra: 'Om Vastu Purushaya Namah',
    image: 'https://images.unsplash.com/photo-1627850550041-38202b851953?auto=format&fit=crop&q=80&w=800',
    category: 'Sanskara',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    faqs: [
      { question: 'When should we perform Griha Pravesh?', answer: 'It is ideally performed during auspicious Muhurats like Basant Panchami or Akshaya Tritiya.' },
      { question: 'Do we need a Vastu check?', answer: 'Yes, Vastu Puja is usually performed alongside Griha Pravesh to harmonize energy.' }
    ]
  },
  {
    id: 'vastu-shanti',
    name: 'Vastu Shanti',
    description: 'Special ritual for correcting the architectural defects of a home.',
    duration: '120-180 mins',
    deity: 'Vastu Purush',
    mantra: 'Om Akarshaya Mahadevi Vastu Purusha mangalam',
    image: 'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&q=80&w=800',
    category: 'Sanskara',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  // Path & Parayan
  {
    id: 'sunderkand',
    name: 'Sundarkand Path',
    description: 'Devotional recitation of Hanuman ji\'s glory and protection.',
    duration: '90-120 mins',
    deity: 'Hanuman Ji',
    mantra: 'Atulit Bal Dhamam...',
    image: 'https://images.unsplash.com/photo-1620211105435-090c29b9f345?auto=format&fit=crop&q=80&w=800',
    category: 'Recitation',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 'ramayan',
    name: 'Ramayan',
    description: 'Sacred recitation of Lord Rama\'s life story.',
    duration: 'Multi-day or 5-7 hours',
    deity: 'Lord Rama',
    mantra: 'Mangal Bhavan Amangal Hari',
    image: 'https://images.unsplash.com/photo-1510364947-0639915003c2?auto=format&fit=crop&q=80&w=800',
    category: 'Recitation',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 'geeta',
    name: 'Geeta',
    description: 'Spiritual recitation of Shrimad Bhagavad Gita.',
    duration: '3-4 hours',
    deity: 'Lord Krishna',
    mantra: 'Om Namo Bhagavate Vasudevaya',
    image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30eba?auto=format&fit=crop&q=80&w=800',
    category: 'Recitation',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  },
  {
    id: 'shrimad-bhagwat',
    name: 'Shrimad Bhagwat Mahapuran',
    description: 'Seven-day recitation for devotion and liberation.',
    duration: '7 Days (4-5 hours daily)',
    deity: 'Lord Krishna/Vishnu',
    mantra: 'Shrimad Bhagwatam Puranm Amalam',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=800',
    category: 'Recitation',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
  },
  // Astrology
  {
    id: 'kundali-creation',
    name: 'Kundali Creation',
    description: 'Detailed birth chart creation using scientific Vedic calculations and accurate mathematical planetary mapping.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology',
    price: 501,
    benefits: [
      'Discover your primary life purpose and karmic path',
      'Identify planetary strengths to leverage in career',
      'Predict accurate timing for stable life foundations'
    ],
    rituals: [
      'Panchang Analysis (Tithi, Vara, Nakshatra)',
      'Vimsottari Dasha Calculation',
      'Lagna and Navamsha Chart Mapping'
    ]
  },
  {
    id: 'graha-dosh',
    name: 'Graha Dosh Nivaran',
    description: 'Diagnosis and corrective remedies for planetary imbalances like Mangal, Shani Sade Sati, and Kaal Sarp.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology',
    price: 1501,
    benefits: [
      'Neutralize negative planetary influences',
      'Remove recurring obstacles in marriage or business',
      'Gain mental clarity and emotional resilience'
    ],
    rituals: [
      'Shani Sade Sati Peace Rituals',
      'Mangalik Dosh Shanti',
      'Navagraha Beej Mantra Initiation'
    ]
  },
  {
    id: 'horoscope-reading',
    name: 'Horoscope Analysis',
    description: 'Comprehensive analysis of current planetary transits (Gochara) and their impact on your immediate future.',
    image: 'https://images.unsplash.com/photo-1561490430-681534015652?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology',
    price: 1101,
    benefits: [
      'Strategic guidance for career changes and investments',
      'Personalized relationship and health insights',
      'Practical Vedic remedies for upcoming challenges'
    ],
    rituals: [
      'Varshphal (Yearly Forecast) Analysis',
      'Prashna Kundali for specific queries',
      'Gemstone and Yantra Recommendation'
    ],
    faqs: [
      { question: 'What details are needed for analysis?', answer: 'Exact date, time, and place of birth are required for a precise horoscope analysis.' },
      { question: 'Do you provide remedies?', answer: 'Yes, I provide Vedic remedies including mantras, gemstones, and lifestyle suggestions.' }
    ]
  }
];

export const AUSPICIOUS_DATES: Record<string, { label: string; type: string }> = {
  '2026-05-01': { label: 'Vaisakh Purnima', type: 'Highly Auspicious' },
  '2026-05-05': { label: 'Akshaya Tritiya', type: 'Highly Auspicious' },
  '2026-05-13': { label: 'Ekadashi', type: 'Tithi' },
  '2026-05-22': { label: 'Ganesh Chaturthi', type: 'Tithi' },
  '2026-05-27': { label: 'Pradosh Vrat', type: 'Tithi' },
  '2026-05-30': { label: 'Purnima', type: 'Highly Auspicious' },
  '2026-06-11': { label: 'Ekadashi', type: 'Tithi' },
  '2026-06-21': { label: 'Ganga Dashahara', type: 'Highly Auspicious' },
  '2026-06-25': { label: 'Nirjala Ekadashi', type: 'Highly Auspicious' },
  '2026-06-29': { label: 'Purnima', type: 'Highly Auspicious' },
};

export const PUJA_SCHEDULE = [
  {
    id: 1,
    day: 'Daily',
    time: '6:00 AM',
    title: 'Morning Aarti & Surya Arghya',
    description: 'Start the day with prayers to the Sun god and divine morning hymns.'
  },
  {
    id: 2,
    day: 'Monday',
    time: '9:00 AM',
    title: 'Somvar Rudrabhishek',
    description: 'Special weekly holy bath for Lord Shiva for health and well-being.'
  },
  {
    id: 3,
    day: 'Tuesday',
    time: '4:00 PM',
    title: 'Hanuman Chalisa & Path',
    description: 'Mass recitation of Sunderkand and Hanuman Chalisa for courage.'
  },
  {
    id: 4,
    day: 'Friday',
    time: '5:30 PM',
    title: 'Lakshmi-Narayan Pooja',
    description: 'Evening worship for family prosperity and wealth.'
  },
  {
    id: 5,
    day: 'Saturday',
    time: '11:00 AM',
    title: 'Shani Shanti Path',
    description: 'Prayers and oil lamp lighting to mitigate Saturn\'s influence.'
  },
  {
    id: 6,
    day: 'Daily',
    time: '7:30 PM',
    title: 'Evening Sandhya Aarti',
    description: 'Concluding the day with devotional lights and choral singing.'
  }
];

export const CONTACT_INFO = {
  phone: '+9779847016421',
  displayPhone: '+977 98470 16421',
  address: 'RUPANDEHI NEPAL 32900',
  whatsapp: '9779847016421'
};

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    location: 'Kathmandu, Nepal',
    content: 'The Rudrabhishek ceremony was performed with such devotion. I felt a deep sense of peace throughout the ritual. Highly recommended for authentic Vedic services.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Priya Patel',
    location: 'Bharatpur, Nepal',
    content: 'Excellent service for our Griha Pravesh. The Pandit ji explained everything clearly and made the process very spiritual and meaningful for our whole family.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    location: 'Butwal, Nepal',
    content: 'The horoscope analysis was very accurate and provided me with genuine guidance for my career. The remedies suggested were practical and effective.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '4',
    name: 'Suresh Bhattarai',
    location: 'Lalitpur, Nepal',
    content: 'The Sunderkand path was organized beautifully. The pronunciation of the Sanskrit shlokas was perfect, and the energy in the room was truly divine.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '5',
    name: 'Meena Sharma',
    location: 'Pokhara, Nepal',
    content: 'I booked a Navgraha Shanti puja online. Although it was remote, I felt fully involved. The Pandit ji provided a detailed list of items and guided me through every step.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '6',
    name: 'Deepak Raj',
    location: 'Biratnagar, Nepal',
    content: 'Very disciplined and punctual services. We have been using their astrology and puja services for years, and they always maintain the highest Vedic standards.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  }
];

export const SOUND_TRACKS = [
  {
    id: 'gayatri-mantra',
    title: 'Gayatri Mantra',
    url: 'https://cdn.pixabay.com/audio/2022/10/14/audio_9bcfe53422.mp3',
    description: 'The most sacred prayer for wisdom and enlightenment.'
  },
  {
    id: 'om-chant',
    title: 'Peaceful Om Chanting',
    url: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3',
    description: 'The primordial sound of the universe for deep meditation.'
  },
  {
    id: 'shiva-mantra',
    title: 'Mahamrityunjaya Mantra',
    url: 'https://cdn.pixabay.com/audio/2021/11/25/audio_10842a5c84.mp3',
    description: 'A powerful mantra for healing and liberation.'
  }
];
