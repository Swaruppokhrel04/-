
export interface Book {
  id: string;
  title: Record<string, string>;
  author: Record<string, string>;
  category: string;
  description: Record<string, string>;
  image: string;
  audioUrl?: string;
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
    audioUrl: 'https://cdn.pixabay.com/audio/2022/08/03/audio_a8521a19d1.mp3',
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
          },
          {
            number: '7',
            original: 'विद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥',
            translation: {
              ne: 'तपाईँ विद्वान, गुणवान र अत्यन्त चतुर हुनुहुन्छ। तपाईँ सधैं भगवान रामको काम गर्न उत्सुक रहनुहुन्छ।',
              hi: 'आप विद्वान, गुणवान और अत्यंत चतुर हैं। आप हमेशा भगवान राम के कार्य करने के लिए तत्पर रहते हैं।',
              en: 'You are the learned, virtuous and extremely clever. You are always eager to perform the tasks of Lord Rama.'
            }
          },
          {
            number: '8',
            original: 'प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥',
            translation: {
              ne: 'तपाईँ भगवानको चरित्र सुन्नमा लीन हुनुहुन्छ। राम, लक्ष्मण र सीता तपाईँको मनमा वास गर्नुहुन्छ।',
              hi: 'आप प्रभु के चरित्र सुनने में मग्न रहते हैं। राम, लक्ष्मण और सीता आपके हृदय में निवास करते हैं।',
              en: 'You delight in listening to the glories of the Lord. Rama, Lakshmana, and Sita dwell in your heart.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'shiva-tandava-stotram',
    title: {
      ne: 'शिव ताण्डव स्तोत्रम्',
      hi: 'शिव ताण्डव स्तोत्रम्',
      en: 'Shiva Tandava Stotram'
    },
    author: {
      ne: 'रावण',
      hi: 'रावण',
      en: 'Ravana'
    },
    category: 'Stotra',
    description: {
      ne: 'भगवान शिवको शक्ति र सौन्दर्यको वर्णन गर्ने शक्तिशाली स्तोत्र।',
      hi: 'भगवान शिव की शक्ति और सौंदर्य का वर्णन करने वाला शक्तिशाली स्तोत्र।',
      en: 'A powerful hymn describing the power and beauty of Lord Shiva, composed by Ravana.'
    },
    image: 'https://images.unsplash.com/photo-1544908077-3e512403ae6a?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        verses: [
          {
            number: '1',
            original: 'जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥',
            translation: {
              ne: 'जसको जटाबाट निस्केको गङ्गाको प्रवाहले पवित्र भएको घाँटीमा सर्पको माला झुण्डिएको छ, जो डमरुको आवाजमा ताण्डव नृत्य गर्नुहुन्छ, ती शिवले हाम्रो कल्याण गरून्।',
              hi: 'जिनकी जटाओं से निकलने वाली गंगा की धारा से पवित्र हुए गले में सर्पों की माला लटकी है, जो डमरू की ध्वनि पर ताण्डव नृत्य करते हैं, वे शिव हमारा कल्याण करें।',
              en: 'With his neck consecrated by the flow of water that flows from his hair, and on his neck a snake is hanging like a garland, and the Damaru drum emits the sound Damad, Damad, Damad, Damad, Lord Shiva performed the dense Tandava dance. May he bless us.'
            }
          },
          {
            number: '2',
            original: 'जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-\nविलोचिवीचिवल्लरीविराजमानमूर्धनि।\nधगद्धगद्धगज्ज्वलल्ललाटपट्टपावके\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम॥',
            translation: {
              ne: 'जसको जटा भित्र गङ्गाको छालहरू विलासी लहर झैं चम्किरहेका छन्, र जसको निधारमा अग्नि बलिरहेको छ, ती चन्द्रधारी शिवमा मेरो सधैं अनुराग रहोस्।',
              hi: 'जिनकी जटाओं में गंगा की लहरें विलासी वल्लरी की तरह चमक रही हैं, और जिनके ललाट पर अग्नि धधक रही है, उन बालचंद्रधारी शिव में मेरा निरंतर अनुराग रहे।',
              en: 'I have a deep interest in Lord Shiva, whose head is glorified by the rows of moving waves of the celestial river Ganga, agitating in the deep well of his hair-locks, and who has the brilliant fire flaming on his forehead, and who has the crescent moon as a jewel on his head.'
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
    audioUrl: 'https://archive.org/download/VishnuSahasranamam_201608/Vishnu-Sahasranamam.mp3',
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
          },
          {
            number: '4',
            original: 'सर्वः शर्वः शिवः स्थाणुर्भूतादिर्निधिरव्ययः।\nसम्भवो भावनो भर्ता प्रभवः प्रभुरीश्वरः॥',
            translation: {
              ne: 'सबै थोक, संहारक, कल्याणकारी, स्थिर, सबै प्राणीहरूको आदि, अविनाशी निधि...',
              hi: 'सर्व, संहारक, कल्याणकारी, स्थिर, सब प्राणियों के आदिकारण, अविनाशी निधि...',
              en: 'The All, The Destroyer, The Auspicious One, The Firm, The Source of all beings, The Inexhaustible Treasure...'
            }
          },
          {
            number: '5',
            original: 'स्वयम्भूः शम्भुरादित्यः पुष्कराक्षो महास्वनः।\nअनादिनिधनो धाता विधाता वरुणी वरः॥',
            translation: {
              ne: 'स्वयम्भू, शम्भु, आदित्य, कमल जस्ता आँखा भएका, महान ध्वनि भएका, आदि र अन्त नभएका...',
              hi: 'स्वयंभू, शंभु, आदित्य, कमल-नेत्र, महान ध्वनि वाले, आदि-अंत रहित...',
              en: 'The Self-born, The Source of happiness, The Sun, The Lotus-eyed, The One with a Great Voice, One without beginning or end...'
            }
          },
          {
            number: '6',
            original: 'अप्रमेयः हृषीकेशः पद्मनाभः अमरप्रभुः।\nविश्वकर्मा मनुः त्वष्टा स्थविष्ठः स्थविरो ध्रुवः॥',
            translation: {
              ne: 'अप्रमेय (बुद्धिभन्दा पर), हृषीकेश (इन्द्रियका स्वामी), पद्मनाभ (नाभिमा कमल भएका), अमरप्रभु (देवताका स्वामी)...',
              hi: 'अप्रमेय (बुद्धि से परे), हृषीकेश (इन्द्रियों के स्वामी), पद्मनाभ (नाभि में कमल वाले), अमरप्रभु (देवताओं के स्वामी)...',
              en: 'The Immeasurable, Master of the senses, The Lotus-navelled, The Lord of the immortals...'
            }
          },
          {
            number: '7',
            original: 'अग्राह्यः शाश्वतः कृष्णो लोहिताक्षः प्रतर्दनः।\nप्रभूतः त्रिककुब्धाम पवित्रं मङ्गलं परम्॥',
            translation: {
              ne: 'अग्राह्य (पकडमा नआउने), शाश्वत, कृष्ण, राता आँखा भएका, प्रतर्दन (विनाशक)...',
              hi: 'अग्राह्य (पकड़ में न आने वाले), शाश्वत, कृष्ण, लाल आँखो वाले, प्रतर्दन (विनाशक)...',
              en: 'The Unseizable, The Eternal, Krishna, The Red-eyed, The Destroyer...'
            }
          },
          {
            number: '8',
            original: 'ईशानः प्राणदः प्राणो ज्येष्ठः श्रेष्ठः प्रजापतिः।\nहिरण्यगर्भो भूगर्भो माधवो मधुसूदनः॥',
            translation: {
              ne: 'ईशान (शासन गर्ने), प्राणद (प्राण दिने), प्राण, ज्येष्ठ, श्रेष्ठ, प्रजापति...',
              hi: 'ईशान (शासन करने वाले), प्राणद (प्राण देने वाले), प्राण, ज्येष्ठ, श्रेष्ठ, प्रजापति...',
              en: 'The Ruler, The Giver of life, The Life itself, The Eldest, The Best, The Lord of beings...'
            }
          },
          {
            number: '9',
            original: 'ईश्वरो विक्रमी धन्वी मेधावी विक्रमः क्रमः।\nअनुत्तमो दुराधर्षः कृतज्ञः कृतिरात्मवान्॥',
            translation: {
              ne: 'ईश्वर, पराक्रमी, धनुर्धारी, मेधावी, पराक्रम, गति...',
              hi: 'ईश्वर, पराक्रमी, धनुर्धारी, मेधावी, पराक्रम, गति...',
              en: 'The Almighty, The Valiant, The Archer, The Intelligent, The Valour, The Order...'
            }
          },
          {
            number: '10',
            original: 'सुरेशः शरणं शर्म विश्वरेताः प्रजाभवः।\nअहः संवत्सरो व्यालः प्रत्ययः सर्वदर्शनः॥',
            translation: {
              ne: 'देवताका राजा, शरण दिने, सुखको रूप, विश्वका बीज, प्रजाका उत्पत्ति स्थान...',
              hi: 'देवताओं के राजा, शरण देने वाले, सुख स्वरूप, विश्व के बीज, प्रजा के उत्पत्ति स्थान...',
              en: 'The Lord of gods, The Refuge, The Bliss, The Seed of the Universe, The Origin of beings...'
            }
          },
          {
            number: '11',
            original: 'सर्वगः सर्वविद्भानुर्विष्वक्सेनो जनार्दनः।\nवेदो वेदविदव्यङ्गो वेदाङ्गो वेदवित्कविः॥',
            translation: {
              ne: 'सर्वव्यापी, सर्वज्ञ, प्रकाशमान, जसको अगाडि शत्रु टिक्दैनन्, जनार्दन...',
              hi: 'सर्वव्यापी, सर्वज्ञ, प्रकाशमान, जिसके आगे शत्रु टिक नहीं पाते, जनार्दन...',
              en: 'The All-pervading, The All-knowing, The Luminous, The One before whom enemies flee, The Protector of people...'
            }
          },
          {
            number: '12',
            original: 'लोकाध्यक्षः सुराध्यक्षो धर्माध्यक्षः कृताकृतः।\nचतुरात्मा चतुर्व्यूहश्चतुर्दंष्ट्रश्चतुर्भुजः॥',
            translation: {
              ne: 'लोकका अध्यक्ष, देवताका अध्यक्ष, धर्मका अध्यक्ष, कृत र अकृतका स्वामी...',
              hi: 'लोक के अध्यक्ष, देवताओं के अध्यक्ष, धर्म के अध्यक्ष, कार्य और कारण के स्वामी...',
              en: 'The Lord of the worlds, The Lord of gods, The Lord of Dharma, The Master of cause and effect...'
            }
          },
          {
            number: '13',
            original: 'भ्राजिष्णुर्भोजनं भोक्ता सहिष्णुर्जगदादिजः।\nअनघो विजयो जेता विश्वयोनिः पुनर्वसुः॥',
            translation: {
              ne: 'प्रकाशवान, भोग्य वस्तु, भोक्ता, सहनशील, जगत्को आदिमा प्रकट हुने...',
              hi: 'प्रकाशवान, भोग्य वस्तु, भोक्ता, सहनशील, जगत के आदि में प्रकट होने वाले...',
              en: 'The Effulgent, The Object of enjoyment, The Enjoyer, The Patient, The First-born of the Universe...'
            }
          },
          {
            number: '14',
            original: 'उपेन्द्रो वामनः प्रांशु रमोघः शुचिरूर्जितः।\nअतीन्द्रः सङ्ग्रहः सर्गो धृतात्मा नियमो यमः॥',
            translation: {
              ne: 'इन्द्रका भाइ, वामन अवतार, विशाल, अमोघ (सफल), पवित्र, शक्तिशाली...',
              hi: 'इन्द्र के अनुज, वामन अवतार, विशाल, अमोघ (सफल), पवित्र, शक्तिशाली...',
              en: 'The Younger brother of Indra, The Dwarf incarnation, The Tall, The Unfailing, The Pure, The Powerful...'
            }
          },
          {
            number: '15',
            original: 'वेद्यो वैद्यः सदायोगी वीरहा माधवो मधुः।\nअतिन्द्रियो महामायो महोत्साहो महाबलः॥',
            translation: {
              ne: 'जान्न योग्य, वैद्य, सधैं योगमा रहने, वीरहरूको विनाशक, लक्ष्मीका पति...',
              hi: 'जानने योग्य, वैद्य, सदैव योग में रहने वाले, वीरों का विनाश करने वाले, लक्ष्मी के पति...',
              en: 'The One to be known, The Physician, The Eternal Yogi, The Destroyer of heroes, The Spouse of Lakshmi...'
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
    audioUrl: 'https://archive.org/download/BhagavadGitaBySwamiChinmayananda/Bhagavad%20Gita%20-%20Chapter%2001.mp3',
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
          },
          {
            number: '4',
            original: 'अत्र शूरा महेष्वासा भीमार्जुनसमा युधि |\nयुयुधानो विराटश्च द्रुपदश्च महारथः || ४ ||',
            translation: {
              ne: 'यस सेनामा भीम र अर्जुन जस्ता धेरै शूरवीर धनुर्धारीहरू छन्, जस्तै युयुधान (सात्यकि), विराट र महारथी द्रुपद।',
              hi: 'इस सेना में भीम और अर्जुन के समान युद्ध करने वाले अनेक शूरवीर धनुर्धारी हैं, जैसे युयुधान (सात्यकि), विराट और महारथी द्रुपद।',
              en: 'In this army are many mighty archers as proficient in battle as Bhima and Arjuna, such as Yuyudhana, Virata, and the great warrior Drupada.'
            }
          },
          {
            number: '5',
            original: 'धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान् |\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः || ५ ||',
            translation: {
              ne: 'धृष्टकेतु, चेकितान, बलवान काशिराज, पुरुजित, कुन्तिभोज र मानिसहरूमा श्रेष्ठ शैब्य पनि यहाँ छन्।',
              hi: 'धृष्टकेतु, चेकितान, बलवान काशिराज, पुरुजित, कुन्तिभोज और मनुष्यों में श्रेष्ठ शैब्य भी यहाँ हैं।',
              en: 'There are also Dhrishtaketu, Chekitana, the valiant King of Kashi, Purujit, Kuntibhoja and Shaibya, the best of men.'
            }
          },
          {
            number: '6',
            original: 'युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान् |\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः || ६ ||',
            translation: {
              ne: 'पराक्रमी युधामन्यु र बलवान उत्तमौजा, सुभद्रा पुत्र (अभिमन्यु) र द्रौपदीका छोराहरू; ती सबै महारथी हुन्।',
              hi: 'पराक्रमी युधामन्यु और बलवान उत्तमौजा, सुभद्रा पुत्र (अभिमन्यु) और द्रौपदी के पुत्र; वे सभी महारथी हैं।',
              en: 'There are the mighty Yudhamanyu and the valiant Uttamauja, the son of Subhadra (Abhimanyu), and the sons of Draupadi; all of them are great warriors.'
            }
          },
          {
            number: '7',
            original: 'अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम |\nनायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते || ७ ||',
            translation: {
              ne: 'तर हे द्विजश्रेष्ठ (द्रोणाचार्य)! हाम्रा पक्षका जो विशिष्ट नायकहरू छन्, उनीहरूलाई पनि जान्नुहोस्। तपाईँको जानकारीको लागि म उनीहरूको नाम भन्छु।',
              hi: 'लेकिन हे द्विजश्रेष्ठ (द्रोणाचार्य)! हमारे पक्ष के जो विशिष्ट नायक हैं, उन्हें भी जान लीजिए। आपकी जानकारी के लिए मैं उनके नाम बताता हूँ।',
              en: 'But know also, O best of the twice-born, those who are the most distinguished among us, the leaders of my army; I name them for your information.'
            }
          },
          {
            number: '8',
            original: 'भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः |\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च || ८ ||',
            translation: {
              ne: 'तपाईँ (द्रोणाचार्य), भीष्म, कर्ण र युद्ध विजयी कृपाचार्य; त्यसैगरी अश्वत्थामा, विकर्ण र सोमदत्तका पुत्र (भूरिश्रवा) पनि छन्।',
              hi: 'आप (द्रोणाचार्य), भीष्म, कर्ण और युद्ध विजयी कृपाचार्य; उसी प्रकार अश्वत्थामा, विकर्ण और सोमदत्त के पुत्र (भूरिश्रवा) भी हैं।',
              en: 'Yourself, Bhishma, Karna, and Kripa, the victorious in battle; Ashwatthama, Vikarna, and the son of Somadatta (Bhurishrava).'
            }
          },
          {
            number: '9',
            original: 'अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः |\nनानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः || ९ ||',
            translation: {
              ne: 'अरु पनि धेरै शूरवीरहरू छन् जसले मेरो लागि आफ्नो प्राण त्याग गर्न ठिक्क छन्। उनीहरू विभिन्न अस्त्र-शस्त्रले सुसज्जित र युद्धकलामा निपुण छन्।',
              hi: 'और भी बहुत से शूरवीर हैं जो मेरे लिए अपने प्राण त्यागने को तैयार हैं। वे विभिन्न शस्त्रों से सुसज्जित और युद्धकला में निपुण हैं।',
              en: 'And many other heroes who are prepared to lay down their lives for my sake, armed with various weapons, and all skilled in warfare.'
            }
          },
          {
            number: '10',
            original: 'अपर्याप्तं तदस्माकं बलं भीष्माभिरक्षितम् |\nपर्याप्तं त्विदमेतेषां बलं भीमाभिरक्षितम् || १० ||',
            translation: {
              ne: 'भीष्म पितामहद्वारा रक्षित हाम्रो यो सेना अपर्याप्त (अजेय) छ र भीमद्वारा रक्षित यिनीहरूको यो सेना पर्याप्त (जित्न सकिने) छ।',
              hi: 'भीष्म पितामह द्वारा रक्षित हमारी यह सेना अपर्याप्त (अजेय) है और भीम द्वारा रक्षित इनकी यह सेना पर्याप्त (जीतने योग्य) है।',
              en: 'This army of ours, marshalled by Bhishma, seems insufficient, whereas their army, marshalled by Bhima, seems sufficient.'
            }
          },
          {
            number: '11',
            original: 'अयनेषु च सर्वेषु यथाभागमवस्थिताः |\nभीष्ममेवाभिरक्षन्तु भवन्तः सर्व एव हि || ११ ||',
            translation: {
              ne: 'त्यसैले तपाईँहरू सबै आ-आफ्नो स्थानमा दृढताका साथ उभिएर भीष्म पितामहको रक्षा गर्नुहोस्।',
              hi: 'इसलिए आप सभी अपने-अपने स्थानों पर दृढता से खड़े होकर भीष्म पितामह की ही सब ओर से रक्षा करें।',
              en: 'Now all of you, standing firmly at your respective strategic points on every side of the army, must guard Bhishma alone.'
            }
          },
          {
            number: '12',
            original: 'तस्य सञ्जनयन् हर्षं कुरुवृद्धः पितामहः |\nसिंहनादं विनद्योच्चैः शङ्खं दध्मौ प्रतापवान् || १२ ||',
            translation: {
              ne: 'तब कुरु वंशका सबैभन्दा वृद्ध र प्रतापशाली भीष्म पितामहले दुर्योधनलाई हर्षित बनाउन सिंह गर्जे जस्तै गरी शङ्ख बजाउनुभयो।',
              hi: 'तब कुरु वंश के सबसे वृद्ध और प्रतापशाली भीष्म पितामह ने दुर्योधन को हर्षित करने के लिए सिंह के समान गरज कर शंख बजाया।',
              en: 'Then, the valiant grandsire, the oldest of the Kurus, blew his conch shell, sounding like a lion’s roar, to cheer Duryodhana.'
            }
          },
          {
            number: '13',
            original: 'ततः शङ्खाश्च भेर्यश्च पणवानकगोमुखाः |\nसहसैवाभ्यहन्यन्त स शब्दस्तुमुलोऽभवत् || १३ ||',
            translation: {
              ne: 'त्यसपछि शङ्ख, नगरा, ढोल र नरसिङ्घाहरू अचानक एकसाथ बजे। त्यो आवाज अत्यन्त भयानक थियो।',
              hi: 'उसके बाद शंख, नगाड़े, ढोल और नरसिंघे अचानक एक साथ बज उठे। वह शब्द बड़ा भयानक हुआ।',
              en: 'Immediately after that, conchs, kettledrums, bugles, trumpets, and horns were blown simultaneously, and the sound was tumultuous.'
            }
          },
          {
            number: '14',
            original: 'ततः श्वेतैर्हयैर्युक्ते महति स्यन्दने स्थितौ |\nमाधवः पाण्डवश्चैव दिव्यौ शङ्खौ प्रदध्मतुः || १४ ||',
            translation: {
              ne: 'त्यसपछि सेता घोडाहरू जोडिएको ठूलो रथमा बसेका श्रीकृष्ण र अर्जुनले पनि आ-आफ्ना दिव्य शङ्ख बजाउनुभयो।',
              hi: 'इसके बाद सफेद घोड़ों से युक्त बड़े रथ में बैठे हुए श्रीकृष्ण और अर्जुन ने भी अपने-अपने दिव्य शंख बजाए।',
              en: 'Then, seated in a magnificent chariot yoked with white horses, Krishna and Arjuna blew their divine conch shells.'
            }
          },
          {
            number: '15',
            original: 'पाञ्चजन्यं हृषीकेशो देवदत्तं धनञ्जयः |\nपौण्ड्रं दध्मौ महाशङ्खं भीमकर्मा वृकोदरः || १५ ||',
            translation: {
              ne: 'श्रीकृष्णले पाञ्चजन्य, अर्जुनले देवदत्त र भयानक कर्म गर्ने भीमसेनले पौण्ड्र नामक महाशङ्ख बजाउनुभयो।',
              hi: 'श्रीकृष्ण ने पाञ्चजन्य, अर्जुन ने देवदत्त और भयानक कर्म करने वाले भीमसेन ने पौण्ड्र नामक महाशंख बजाया।',
              en: 'Hrishikesha blew His conch shell, Panchajanya; Dhananjaya blew his, Devadatta; and Bhima, the doer of voracious deeds, blew his mighty conch shell, Paundra.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'panchatantra-stories',
    title: {
      ne: 'पंचतन्त्रका नैतिक कथाहरु',
      hi: 'पंचतंत्र की नैतिक कहानियाँ',
      en: 'Panchatantra Moral Stories'
    },
    author: {
      ne: 'पण्डित विष्णु शर्मा',
      hi: 'पंडित विष्णु शर्मा',
      en: 'Pandit Vishnu Sharma'
    },
    category: 'Bal Sahitya',
    description: {
      ne: 'बालबालिकाहरुका लागि उपयोगी नैतिक र प्रेरणादायी कथाहरु।',
      hi: 'बच्चों के लिए उपयोगी नैतिक और प्रेरणादायक कहानियाँ।',
      en: 'Moral and inspiring stories for children from the ancient Panchatantra.'
    },
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        sectionTitle: { ne: 'बंदर र मगरमच्छ', hi: 'बंदर और मगरमच्छ', en: 'The Monkey and the Crocodile' },
        verses: [
          {
            original: 'मित्रस्य हितकामानां यः शृणोति न भाषितम्।\nस कूर्म इव दुर्बुद्धिः काष्ठाद् भ्रष्टो विनश्यति॥',
            translation: {
              ne: 'जसले आफ्नो हित चाहने साथीहरूको सल्लाह मान्दैन, त्यो लौरोबाट खसेको कछुवा जस्तै नष्ट हुन्छ।',
              hi: 'जो अपने हितैषी मित्रों की बात नहीं मानता, वह उस दुष्ट बुद्धि कछुवे के समान नष्ट हो जाता है जो लकड़ी से गिर गया था।',
              en: 'He who does not listen to the advice of friends who wish him well, perishes like the foolish turtle who fell from the stick.'
            }
          },
          {
            original: 'त्यो बंदरले दिनहुँ मगरमच्छलाई मीठा जामुनहरू खुवाउने गर्थ्यो। (The monkey used to feed sweet jamuns to the crocodile daily.)',
            translation: {
              ne: 'सच्चो मित्रतामा स्वार्थ हुनुहुँदैन।',
              hi: 'सच्ची मित्रता में स्वार्थ नहीं होना चाहिए।',
              en: 'True friendship should be devoid of selfishness.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'sanskrit-learning-course',
    title: {
      ne: 'संस्कृत भाषा शिक्षण',
      hi: 'संस्कृत भाषा शिक्षण (कोर्स)',
      en: 'Sanskrit Language Learning Course'
    },
    author: {
      ne: 'पारम्परिक गुरु',
      hi: 'पारंपरिक गुरु',
      en: 'Traditional Guru'
    },
    category: 'Bal Sahitya',
    description: {
      ne: 'संस्कृत भाषा सिक्न चाहनेहरुका लागि आधारभूत परिचय र अभ्यास।',
      hi: 'संस्कृत भाषा सीखने के इच्छुक लोगों के लिए बुनियादी परिचय और अभ्यास।',
      en: 'A basic introduction and practice for those interested in learning the Sanskrit language.'
    },
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        sectionTitle: { ne: 'आधारभूत अभिवादन', hi: 'बुनियादी अभिवादन', en: 'Basic Greetings' },
        verses: [
          {
            number: '१',
            original: 'नमस्ते (Namaste) - Hello',
            translation: {
              ne: 'नमस्कार',
              hi: 'नमस्कार',
              en: 'Hello / Salutations'
            }
          },
          {
            number: '२',
            original: 'सुप्रभातम (Suprabhatam) - Good Morning',
            translation: {
              ne: 'शुभ प्रभात',
              hi: 'शुभ प्रभात',
              en: 'Good Morning'
            }
          },
          {
            number: '३',
            original: 'शुभरात्रिः (Shubharatrih) - Good Night',
            translation: {
              ne: 'शुभ रात्रि',
              hi: 'शुभ रात्रि',
              en: 'Good Night'
            }
          },
          {
            number: '४',
            original: 'कथं अस्ति? (Katham asti?) - How are you?',
            translation: {
              ne: 'तपाईँलाई कस्तो छ?',
              hi: 'आप कैसे हैं?',
              en: 'How are you?'
            }
          },
          {
            number: '५',
            original: 'अहं कुशली अस्मि। (Aham kushali asmi.) - I am fine.',
            translation: {
              ne: 'म ठिक छु।',
              hi: 'मैं ठीक हूँ।',
              en: 'I am fine.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'jyotish-basics',
    title: {
      ne: 'ज्योतिष परिचय',
      hi: 'ज्योतिष परिचय (सामान्य जानकारी)',
      en: 'Introduction to Jyotish'
    },
    author: {
      ne: 'ऋषि पराशर / परम्परागत',
      hi: 'ऋषि पराशर / पारंपरिक',
      en: 'Sage Parashara / Traditional'
    },
    category: 'Jyotish',
    description: {
      ne: 'वैदिक ज्योतिषको आधारभूत ज्ञान र परिचय।',
      hi: 'वैदिक ज्योतिष का आधारभूत ज्ञान और परिचय।',
      en: 'Basic knowledge and introduction to Vedic Astrology.'
    },
    image: 'https://images.unsplash.com/photo-1532960401447-7ee0572e7960?auto=format&fit=crop&q=80&w=800',
    content: [
      {
        sectionTitle: { ne: 'ज्योतिष के हो?', hi: 'ज्योतिष क्या है?', en: 'What is Jyotish?' },
        verses: [
          {
            original: 'ज्योतिषामयनं चक्षुः।',
            translation: {
              ne: 'ज्योतिषलाई वेदको आँखा मानिन्छ। यसले काल वा समयको बोध गराउँछ।',
              hi: 'ज्योतिष को वेद का नेत्र माना जाता है। यह काल (समय) का बोध कराने वाला शास्त्र है।',
              en: 'Jyotish is considered the eyes of the Vedas. It is the science that provides the knowledge of time.'
            }
          }
        ]
      },
      {
        sectionTitle: { ne: 'नौ ग्रह (नवग्रह)', hi: 'नौ ग्रह (नवग्रह)', en: 'Nine Planets (Navagrahas)' },
        verses: [
          {
            original: 'सूर्यः सोमो मङ्गलश्च बुधश्चापि वृहस्पतिः।\nशुक्रः शनैश्चरो राहुः केतुश्चेति ग्रहा नव॥',
            translation: {
              ne: 'सूर्य, चन्द्र, मङ्गल, बुध, बृहस्पति, शुक्र, शनि, राहु र केतु - यी नौ ग्रहहरू हुन्।',
              hi: 'सूर्य, चंद्रमा, मंगल, बुध, बृहस्पति, शुक्र, शनि, राहु और केतु - ये नौ मुख्य ग्रह हैं।',
              en: 'Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu - these are the nine primary planets.'
            }
          }
        ]
      },
      {
        sectionTitle: { ne: '१२ राशि', hi: '१२ राशियाँ', en: '12 Zodiac Signs (Rashis)' },
        verses: [
          {
            original: 'मेष, वृष, मिथुन, कर्क, सिंह, कन्या, तुला, वृश्चिक, धनु, मकर, कुम्भ, मीन।',
            translation: {
              ne: 'यी बाह्र राशिहरू हुन् जसले अन्तरिक्षलाई विभाजित गर्दछ।',
              hi: 'ये बारह राशियाँ हैं जो अंतरिक्ष के विभिन्न भागों का प्रतिनिधित्व करती हैं।',
              en: 'These are the twelve zodiac signs that represent different segments of the zodiac belt.'
            }
          }
        ]
      }
    ]
  }
];
