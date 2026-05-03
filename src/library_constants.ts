
export interface Book {
  id: string;
  title: Record<string, string>;
  author: Record<string, string>;
  category: string;
  description: Record<string, string>;
  image: string;
  content: {
    sectionTitle?: Record<string, string>;
    verses: {
      number?: string;
      original: string; // Sanskrit/Hindi
      transliteration?: string;
      translation: Record<string, string>;
    }[];
  }[];
}

export const RELIGIOUS_BOOKS: Book[] = [
  {
    id: 'hanuman-chalisa',
    title: {
      ne: 'हनुमान चालिसा',
      hi: 'हनुमान चालीसा',
      en: 'Hanuman Chalisa'
    },
    author: {
      ne: 'तुलसीदास',
      hi: 'तुलसीदास',
      en: 'Tulsidas'
    },
    category: 'Stotra',
    description: {
      ne: 'हनुमान जीको महिमा गाएको ४० श्लोकको पवित्र स्तोत्र।',
      hi: 'हनुमान जी की महिमा का ४० चौपाइयों वाला पवित्र स्तोत्र।',
      en: 'A 40-verse devotional hymn dedicated to Lord Hanuman.'
    },
    image: 'https://images.unsplash.com/photo-1620211105435-090c29b9f345?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        sectionTitle: { ne: 'दोहा', hi: 'दोहा', en: 'Doha' },
        verses: [
          {
            original: 'श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।\nवरनऊँ रघुवर विमल जसु जो दायकु फल चारि॥',
            translation: {
              ne: 'श्री गुरुको चरणको धुलोले आफ्नो मनको ऐना सफा गरेर, म श्री रघुवीरको निर्मल यश वर्णन गर्छु, जसले चारै फल (धर्म, अर्थ, काम, मोक्ष) प्रदान गर्दछ।',
              hi: 'श्री गुरु के चरण कमलों की धूलि से अपने मन रूपी दर्पण को स्वच्छ कर, मैं श्री रघुवीर के निर्मल यश का वर्णन करता हूँ, जो चारों फल देने वाला है।',
              en: 'Cleansing the mirror of my mind with the dust from the Lotus-feet of Divine Guru, I describe the unblemished glory of Lord Rama, which bestows the four fruits of life.'
            }
          },
          {
            original: 'बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार।\nबल बुधि विद्या देहु मोहि हरहु कलेस विकार॥',
            translation: {
              ne: 'म आफूलाई बुद्धिहीन ठानी पवनपुत्र हनुमानको स्मरण गर्दछु। मलाई बल, बुद्धि र विद्या प्रदान गरी मेरा सबै दुख र विकारहरू हटाउनुहोस्।',
              hi: 'स्वयं को बुद्धिहीन जानकर मैं पवनसुत्र हनुमान का स्मरण करता हूँ। मुझे बल, बुद्धि और विद्या प्रदान कर मेरे समस्त कष्टों और दोषों को दूर करें।',
              en: 'Knowing myself to be devoid of intelligence, I remember the Son of Wind (Hanuman). Grant me strength, wisdom, and knowledge, and remove all my afflictions and blemishes.'
            }
          }
        ]
      },
      {
        sectionTitle: { ne: 'चौपाई', hi: 'चौपाई', en: 'Chaupai' },
        verses: [
          {
            number: '1',
            original: 'जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥',
            translation: {
              ne: 'ज्ञान र गुणका सागर हनुमानको जय होस्। तीनै लोकमा ज्ञानको ज्योति फैलाउने वानरराजको जय होस्।',
              hi: 'ज्ञान और गुणों के सागर हनुमान जी की जय हो। तीनों लोकों में ज्ञान का प्रकाश फैलाने वाले वानरराज की जय हो।',
              en: 'Victory to Hanuman, the ocean of wisdom and virtue. Victory to the Lord of Monkeys, who enlightens the three worlds.'
            }
          },
          {
            number: '2',
            original: 'राम दूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥',
            translation: {
              ne: 'तपाईँ अतुलनीय बलको धाम र भगवान रामको दूत हुनुहुन्छ। तपाईँलाई अञ्जनी पुत्र र पवनपुत्र भनेर चिनिन्छ।',
              hi: 'आप अतुलनीय बल के धाम और भगवान राम के दूत हैं। आपको अंजनी पुत्र और पवनपुत्र के नाम से जाना जाता है।',
              en: 'You are the messenger of Lord Rama, the abode of immeasurable strength. You are known as the son of Anjani and the Son of the Wind.'
            }
          }
          // truncated for brevity in demo, will add more if needed
        ]
      }
    ]
  },
  {
    id: 'vishnu-sahasranamam',
    title: {
      ne: 'विष्णु सहस्रनाम',
      hi: 'विष्णु सहस्रनाम',
      en: 'Vishnu Sahasranamam'
    },
    author: {
      ne: 'वेद व्यास',
      hi: 'वेद व्यास',
      en: 'Veda Vyasa'
    },
    category: 'Stotra',
    description: {
      ne: 'भगवान विष्णुका एक हजार नामहरूको पवित्र स्तोत्र।',
      hi: 'भगवान विष्णु के एक हजार नामों का पवित्र स्तोत्र।',
      en: 'The thousand names of Lord Vishnu, a sacred hymn from the Mahabharata.'
    },
    image: 'https://images.unsplash.com/photo-1590766948510-108259e9c4f3?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        sectionTitle: { ne: 'ध्यानम्', hi: 'ध्यानम्', en: 'Dhyanam' },
        verses: [
          {
            original: 'शुक्लाम्बरधरं विष्णुं शशिवर्णं चतुर्भुजम्।\nप्रसन्नवदनं ध्यायेत् सर्वविघ्नोपशान्तये॥',
            translation: {
              ne: 'सेतो वस्त्र लगाएका, चन्द्रमा झैं चम्किलो र चार हात भएका भगवान विष्णुको ध्यान गर्नुहोस्, जसको प्रसन्न अनुहारले सबै विघ्नहरू शान्त पार्छ।',
              hi: 'श्वेत वस्त्र धारण करने वाले, चंद्रमा के समान कांति वाले, चार भुजाओं वाले और प्रसन्न मुख वाले भगवान विष्णु का ध्यान सभी विघ्न बाधाओं की शांति के लिए करें।',
              en: 'One should meditate on Lord Vishnu, who is clothed in white, who is the color of the moon, who has four arms and a serene face, for the removal of all obstacles.'
            }
          }
        ]
      },
      {
        sectionTitle: { ne: 'सहस्रनाम', hi: 'सहस्रनाम', en: 'Sahasranamam' },
        verses: [
          {
            number: '1',
            original: 'विश्वं विष्णुर्वषट्कारो भूतभव्यभवत्प्रभुः।\nभूतकृद्भूतभृद्भावो भूतात्मा भूतभावनः॥',
            translation: {
              ne: 'विश्व, विष्णु, वषट्कार, भूत, भविष्य र वर्तमानका प्रभु...',
              hi: 'विश्व, विष्णु, वषट्कार, भूत-भविष्य-वर्तमान के प्रभु...',
              en: 'The Universe, The All-pervading, He who controls, The Lord of past, present, and future...'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'bhagavad-gita-ch1',
    title: {
      ne: 'श्रीमद्भगवद्गीता - अध्याय १',
      hi: 'श्रीमद्भगवद्गीता - अध्याय १',
      en: 'Bhagavad Gita - Chapter 1'
    },
    author: {
      ne: 'वेद व्यास',
      hi: 'वेद व्यास',
      en: 'Veda Vyasa'
    },
    category: 'Upanishad',
    description: {
      ne: 'कुरुक्षेत्रको युद्धभूमिमा अर्जुनको विषाद योग।',
      hi: 'कुरुक्षेत्र की रणभूमि में अर्जुन का विषाद योग।',
      en: 'The Yoga of Arjuna\'s Dejection on the battlefield of Kurukshetra.'
    },
    image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30eba?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        verses: [
          {
            number: '1',
            original: 'धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १ ||',
            translation: {
              ne: 'धृतराष्ट्रले भने - हे सञ्जय! धर्मभूमि कुरुक्षेत्रमा युद्धको इच्छाले भेला भएका मेरा र पाण्डुका छोराहरूले के गरे?',
              hi: 'धृतराष्ट्र बोले- हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?',
              en: 'Dhritarashtra said: O Sanjaya, assembled on the holy field of Kurukshetra and eager to fight, what did my sons and the sons of Pandu do?'
            }
          }
        ]
      }
    ]
  }
];
