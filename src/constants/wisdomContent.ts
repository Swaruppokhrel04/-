export interface WisdomContent {
  shloka: string;
  shlokaTransliteration: string;
  title: string;
  intro: string;
  sections: {
    title: string;
    content: string;
  }[];
  conclusion: string;
  subhSandesh: string;
}

export const FEATURED_WISDOM: Record<string, WisdomContent> = {
  hi: {
    shloka: "विद्या ददाति विनयं, विनयाद् याति पात्रताम् ।\nपात्रत्वात् धनमाप्नोति, धनात् धर्मं ततः सुखम् ॥",
    shlokaTransliteration: "Vidya dadati vinayam, vinayād yāti pātratām | pātratvāt dhanamāpnoti, dhanāt dharmaṃ tataḥ sukham ||",
    title: "संस्कृत शुभ विचार: विद्या और विनम्रता",
    intro: "यह संस्कृत का अत्यंत प्रसिद्ध एवं प्रेरणादायक शुभ विचार है। इसका अर्थ केवल शिक्षा प्राप्त करना नहीं, बल्कि जीवन को सही दिशा देना भी है। भारतीय संस्कृति में विद्या को सबसे बड़ा धन माना गया है। यह श्लोक हमें बताता है कि सच्ची शिक्षा मनुष्य के जीवन को कैसे बदलती है और उसे सफलता, सम्मान तथा सुख की ओर ले जाती है।",
    sections: [
      {
        title: "श्लोक का सरल अर्थ",
        content: "इस श्लोक का अर्थ है — विद्या मनुष्य को विनम्र बनाती है। विनम्रता से मनुष्य योग्य बनता है। योग्य व्यक्ति को धन और सम्मान प्राप्त होता है। धन से वह धर्म के मार्ग पर चलता है और अंततः उसे जीवन में सच्चा सुख प्राप्त होता है।"
      },
      {
        title: "विद्या का महत्व",
        content: "भारतीय सनातन परंपरा में ज्ञान को ईश्वर का स्वरूप माना गया है। विद्या केवल पुस्तक पढ़ने तक सीमित नहीं होती, बल्कि यह मनुष्य के विचार, व्यवहार और चरित्र को भी श्रेष्ठ बनाती है। ज्ञान मनुष्य के भीतर आत्मविश्वास उत्पन्न करती है और जीवन की कठिन परिस्थितियों का सामना करने की शक्ति देती है।"
      },
      {
        title: "विनम्रता ही सच्ची महानता",
        content: "फल से लदा हुआ वृक्ष सदैव झुक जाता है। उसी प्रकार महान व्यक्ति कभी अहंकार नहीं करता। विनम्रता मनुष्य के व्यक्तित्व को आकर्षक बनाती है और समाज में सम्मान दिलाती है। सच्चा ज्ञान वही है जो मनुष्य को नम्र बनाए।"
      },
      {
        title: "पात्रता और सफलता का संबंध",
        content: "जब व्यक्ति योग्य बनता है, तब उसे धन, सम्मान और सफलता प्राप्त होने लगती है। यदि धन धर्म के मार्ग में उपयोग हो, तो वही जीवन को सुखी बनाता है। धर्म का अर्थ केवल पूजा-पाठ नहीं, बल्कि सत्य, दया, सेवा और सदाचार का पालन करना है।"
      }
    ],
    conclusion: "“विद्या ददाति विनयम्” केवल एक श्लोक नहीं, बल्कि भारतीय जीवन दर्शन का सार है। यह हमें सिखाता है कि सच्ची सफलता बाहरी दिखावे में नहीं, बल्कि ज्ञान, विनम्रता, धर्म और सदाचार में निहित है।",
    subhSandesh: "ज्ञान वह दीपक है जो जीवन के अंधकार को दूर कर देता है, और विनम्रता वह सुगंध है जो मनुष्य को महान बनाती है।"
  },
  ne: {
    shloka: "विद्या ददाति विनयं, विनयाद् याति पात्रताम् ।\nपात्रत्वात् धनमाप्नोति, धनात् धर्मं ततः सुखम् ॥",
    shlokaTransliteration: "Vidya dadati vinayam, vinayād yāti pātratām | pātratvāt dhanamāpnoti, dhanāt dharmaṃ tataḥ sukham ||",
    title: "संस्कृत शुभ विचार: विद्या र विनम्रता",
    intro: "यो संस्कृतको अत्यन्त प्रसिद्ध एवं प्रेरणादायक शुभ विचार हो। यसको अर्थ केवल शिक्षा प्राप्त गर्नु मात्र होइन, बरु जीवनलाई सही दिशा दिनु पनि हो। भारतीय संस्कृतिमा विद्यालाई सबैभन्दा ठूलो धन मानिएको छ। यो श्लोकले हामीलाई बताउँछ कि साँचो शिक्षाले मानिसको जीवनलाई कसरी बदल्छ र उसलाई सफलता, सम्मान र सुखतर्फ लैजान्छ।",
    sections: [
      {
        title: "श्लोकको सरल अर्थ",
        content: "यस श्लोकको अर्थ हो — विद्याले मानिसलाई विनम्र बनाउँछ। विनम्रताले मानिस योग्य बन्छ। योग्य व्यक्तिले धन र सम्मान प्राप्त गर्दछ। धनबाट ऊ धर्मको मार्गमा चल्छ र अन्तमा उसले जीवनमा साँचो सुख प्राप्त गर्दछ।"
      },
      {
        title: "विद्याको महत्व",
        content: "सनातन परम्परामा ज्ञानलाई ईश्वरको स्वरूप मानिएको छ। विद्या पुस्तक पढ्ने कुरामा मात्र सीमित हुँदैन, बरु यसले मानिसको विचार, व्यवहार र चरित्रलाई पनि श्रेष्ठ बनाउँछ। ज्ञानले मानिसको भित्र आत्मविश्वास उत्पन्न गराउँछ।"
      },
      {
        title: "विनम्रता नै साँचो महानता",
        content: "फलले भरिएको रुख सधैं झुक्छ। त्यसैगरी महान व्यक्तिले कहिल्यै अहंकार गर्दैन। विनम्रताले मानिसको व्यक्तित्वलाई आकर्षक बनाउँछ र समाजमा सम्मान दिलाउँछ।"
      },
      {
        title: "पात्रता र सफलताको सम्बन्ध",
        content: "जब व्यक्ति योग्य बन्छ, तब उसले धन, सम्मान र सफलता प्राप्त गर्न थाल्छ। यदि धन धर्मको मार्गमा प्रयोग हुन्छ भने मात्र त्यसले जीवनलाई सुखी बनाउँछ। धर्मको अर्थ सत्य, दया, सेवा र सदाचारको पालना गर्नु हो।"
      }
    ],
    conclusion: "“विद्या ददाति विनयम्” केवल एउटा श्लोक मात्र होइन, बरु यो जीवन दर्शनको सार हो। यसले हामीलाई सिकाउँछ कि साँचो सफलता बाहिरी देखावटमा होइन, बरु ज्ञान, विनम्रता, धर्म र सदाचारमा निहित छ।",
    subhSandesh: "ज्ञान त्यो दीपक हो जसले जीवनको अन्धकारलाई हटाउँछ, र विनम्रता त्यो सुगन्ध हो जसले मानिसलाई महान बनाउँछ।"
  },
  en: {
    shloka: "विद्या ददाति विनयं, विनयाद् याति पात्रताम् ।\nपात्रत्वात् धनमाप्नोति, धनात् धर्मं ततः सुखम् ॥",
    shlokaTransliteration: "Vidya dadati vinayam, vinayād yāti pātratām | pātratvāt dhanamāpnoti, dhanāt dharmaṃ tataḥ sukham ||",
    title: "Vedic Wisdom: Education and Humility",
    intro: "This is one of the most famous and inspiring verses in Sanskrit. Its meaning is not just about attaining education, but about giving direction to life. In Vedic culture, Knowledge (Vidya) is considered the greatest wealth. This shloka tells us how true education transforms a human life and leads it towards success, respect, and bliss.",
    sections: [
      {
        title: "Simple Meaning of the Shloka",
        content: "Knowledge (Vidya) gives humility (Vinayam). Humility leads to worthiness (Patratam). From worthiness, one attains wealth (Dhanam). From wealth comes the ability to follow Dharma (Righteousness), and from Dharma comes ultimate Happiness (Sukham)."
      },
      {
        title: "The Importance of Vidya",
        content: "In Sanatana tradition, knowledge is considered a manifestation of God. Vidya is not limited to reading books; it refines human thoughts, behavior, and character. It creates self-confidence and the strength to face life's challenges."
      },
      {
        title: "Humility is True Greatness",
        content: "A tree laden with fruit always bows down. Similarly, a truly great person never harbors ego. Humility makes a person's personality attractive and brings respect in society. True knowledge is that which makes a person humble."
      },
      {
        title: "Worthiness and Success",
        content: "When a person becomes worthy, they naturally attract wealth, respect, and success. If wealth is used in the path of Dharma—performing duty, speaking truth, and serving others—it brings lasting happiness."
      }
    ],
    conclusion: "“Vidya Dadati Vinayam” is not just a verse, but the essence of Vedic philosophy. It teaches us that true success lies not in external appearances, but in wisdom, humility, and righteousness.",
    subhSandesh: "Knowledge is the lamp that dispels the darkness of life, and humility is the fragrance that makes a person great."
  }
};
