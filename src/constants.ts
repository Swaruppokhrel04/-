
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
    image: 'https://images.unsplash.com/photo-1590766948510-108259e9c4f3?auto=format&fit=crop&q=80&w=800',
    category: 'Regular',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/10/14/audio_9bcfe53422.mp3' // Spiritual/Ambient sample
  },
  {
    id: 'rudrabhishek',
    name: 'Shiva Pooja (Rudrabhishek)',
    description: 'Special ritual for peace and health by performing Abhishek of Lord Shiva.',
    duration: '90-120 mins',
    deity: 'Lord Shiva',
    mantra: 'Om Namah Shivaya',
    image: 'https://images.unsplash.com/photo-1563722216449-3660d5bfa78f?auto=format&fit=crop&q=80&w=800',
    category: 'Special',
    audioUrl: 'https://cdn.pixabay.com/audio/2021/11/25/audio_10842a5c84.mp3'
  },
  {
    id: 'durga-pujan',
    name: 'Durga Pooja',
    description: 'Divine worship of Goddess Durga for strength and protection.',
    duration: '60-90 mins',
    deity: 'Goddess Durga',
    mantra: 'Om Dum Durgayei Namaha',
    image: 'https://images.unsplash.com/photo-1593351415075-3bac9f45c877?auto=format&fit=crop&q=80&w=800',
    category: 'Special',
    audioUrl: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3'
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
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
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
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
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
    description: 'Scientific creation of birth chart by expert scholars.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology'
  },
  {
    id: 'graha-dosh',
    name: 'Graha Dosh Nivaran',
    description: 'Astrological remedies for planetary obstacles.',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology'
  },
  {
    id: 'horoscope-reading',
    name: 'Horoscope Analysis',
    description: 'Detailed analysis of birth chart for life guidance and future insights.',
    image: 'https://images.unsplash.com/photo-1561490430-681534015652?auto=format&fit=crop&q=80&w=800',
    category: 'Astrology'
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
