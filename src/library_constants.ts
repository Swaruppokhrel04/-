
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
          },
          {
            number: '3',
            original: 'महावीर विक्रम बजरंगी। कुमति निवार सुमति के संगी॥',
            translation: {
              ne: 'तपाईँ महान वीर र शक्तिशाली हुनुहुन्छ। तपाईँले खराब बुद्धिलाई हटाएर राम्रो बुद्धि प्रदान गर्नुहुन्छ।',
              hi: 'आप महान वीर और शक्तिशाली हैं। आप कुबुद्धि को दूर करने वाले और सुबुद्धि के सहायक हैं।',
              en: 'You are the great hero, powerful and strong. You remove evil thoughts and are the companion of good wisdom.'
            }
          },
          {
            number: '4',
            original: 'कंचन वरन विराज सुवेसा। कानन कुंडल कुंचित केसा॥',
            translation: {
              ne: 'तपाईँको वर्ण सुनौलो छ र तपाईँ सुन्दर लुगामा सजिनुभएको छ। तपाईँको कानमा कुण्डल र कपाल घुम्रिएको छ।',
              hi: 'आपका वर्ण स्वर्ण के समान है और आप सुंदर वस्त्रों में सुशोभित हैं। आपके कानों में कुंडल और केश घुंघराले हैं।',
              en: 'You are of golden complexion and beautifully attired. You wear earrings in your ears and have curly hair.'
            }
          },
          {
            number: '5',
            original: 'हाथ वज्र औ ध्वजा विराजै। काँधे मूँज जनेऊ साजै॥',
            translation: {
              ne: 'तपाईँको हातमा वज्र र ध्वजा छ। काँधमा मुञ्जको जनैले शोभा बढाएको छ।',
              hi: 'आपके हाथों में वज्र और ध्वजा सुशोभित हैं। आपके कंधे पर मूंज का जनेऊ शोभा दे रहा है।',
              en: 'In your hands, you hold a thunderbolt and a flag. A thread of Munja grass adorns your shoulder.'
            }
          },
          {
            number: '6',
            original: 'शंकर सुवन केसरी नंदन। तेज प्रताप महा जग वंदन॥',
            translation: {
              ne: 'तपाईँ भगवान शंकरको अवतार र केसरीका पुत्र हुनुहुन्छ। तपाईँको तेज र प्रतापको सारा संसारले वन्दना गर्दछ।',
              hi: 'आप शंकर जी के अवतार और केसरी के नंदन हैं। आपके तेज और प्रताप की सारा संसार वंदना करता है।',
              en: 'You are the incarnation of Lord Shiva and the son of Kesari. Your glory and power are worshiped by the entire world.'
            }
          }
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
              ne: 'विश्व: सर्वं जगत, विष्णु: सर्वव्यापी, वषट्कार: यज्ञपुरुष, भूत-भव्य-भवत्-प्रभु: भूत, वर्तमान र भविष्यका स्वामी...',
              hi: 'विश्व: सारा संसार, विष्णु: सर्वव्यापी, वषट्कार: यज्ञ के स्वामी, भूत-भव्य-भवत्-प्रभु: त्रिकाल के स्वामी...',
              en: 'The Universe, The All-pervading, The one who is invoked with Vashat, The Lord of past, present and future...'
            }
          },
          {
            number: '2',
            original: 'पूतात्मा परमात्मा च मुक्तानां परमा गतिः।\nअव्ययः पुरुषः साक्षी क्षेत्रज्ञोऽक्षर एव च॥',
            translation: {
              ne: 'पवित्र आत्मा, परमात्मा, मुक्त आत्माहरूको परम गति, अविनाशी पुरुष, साक्षी, क्षेत्रज्ञ र अक्षर...',
              hi: 'पवित्र आत्मा, परमात्मा, मुक्त आत्माओं की परम गति, अविनाशी पुरुष, साक्षी, क्षेत्रज्ञ और अक्षर...',
              en: 'The Pure Self, The Supreme Self, The ultimate goal of the liberated, The Imperishable, The Witness, The Knower of the field, and The Indestructible.'
            }
          },
          {
            number: '3',
            original: 'योगो योगविदां नेता प्रधानपुरुषेश्वरः।\nनारसिंहवपुः श्रीमान् केशवः पुरुषोत्तमः॥',
            translation: {
              ne: 'योग, योगीहरूको नेता, प्रधान र पुरुषका ईश्वर, नरसिंह रूपधारी, श्रीमान्, केशव, पुरुषोत्तम...',
              hi: 'योग, योगियों के नेता, प्रकृति और पुरुष के ईश्वर, नरसिंह रूप वाले, श्रीमान, केशव, पुरुषोत्तम...',
              en: 'The Yoga, The Leader of those who know Yoga, The Lord of Nature and Spirit, He who has a Man-lion body, Possessor of Lakshmi, Kesava, and the Best among men.'
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
          },
          {
            number: '2',
            original: 'सञ्जय उवाच |\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा |\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् || २ ||',
            translation: {
              ne: 'सञ्जयले भने - पाण्डवहरूको सेनालाई व्यूह रचना गरी बसेको देखेर राजा दुर्योधन आचार्य द्रोण कहाँ गएर यसो भने।',
              hi: 'संजय बोले- उस समय पाण्डवों की सेना को व्यूह रचना युक्त देखकर राजा दुर्योधन आचार्य द्रोण के पास जाकर यह वचन बोले।',
              en: 'Sanjaya said: On observing the Pandava army standing in military formation, King Duryodhana approached his teacher Dronacharya and spoke these words.'
            }
          },
          {
            number: '3',
            original: 'पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् |\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता || ३ ||',
            translation: {
              ne: 'हे आचार्य! तपाईँका बुद्धिमान शिष्य द्रुपद पुत्र (धृष्टद्युम्न) द्वारा व्यूहाकार खडा गरिएको पाण्डु पुत्रहरूको यो विशाल सेना हेर्नुहोस्।',
              hi: 'हे आचार्य! आपके बुद्धिमान शिष्य द्रुपदपुत्र (धृष्टद्युम्न) द्वारा व्यूहाकार खड़ी की हुई पाण्डुपुत्रों की इस बड़ी भारी सेना को देखिए।',
              en: 'Behold, O Teacher, this mighty army of the sons of Pandu, arrayed in battle formation by your talented disciple, the son of Drupada.'
            }
          }
        ]
      }
    ]
  }
];
