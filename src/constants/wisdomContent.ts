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
        content: "विद्या मनुष्य को विनम्र बनाती है। विनम्रता से मनुष्य योग्य बनता है। योग्य व्यक्ति को धन और सम्मान प्राप्त होता है। धन से वह धर्म के मार्ग पर चलता है और अंततः उसे जीवन में सच्चा सुख प्राप्त होता है। यह केवल शब्दों का संग्रह नहीं, बल्कि सम्पूर्ण जीवन दर्शन है।"
      },
      {
        title: "विद्या का महत्व",
        content: "भारतीय सनातन परंपरा में ज्ञान को ईश्वर का स्वरूप माना गया है। विद्या केवल पुस्तक पढ़ने तक सीमित नहीं होती, बल्कि यह मनुष्य के विचार, व्यवहार और चरित्र को भी श्रेष्ठ बनाती है। जिस व्यक्ति के पास ज्ञान होता है, वह सही और गलत का निर्णय करने में सक्षम होता है। विद्या मनुष्य के भीतर आत्मविश्वास उत्पन्न करती है और जीवन की कठिन परिस्थितियों का सामना करने की शक्ति देती है। आधुनिक युग में तकनीकी शिक्षा के साथ संस्कार और विनम्रता भी उतनी ही आवश्यक है।"
      },
      {
        title: "विनम्रता ही सच्ची महानता",
        content: "कहा गया है कि विद्या से विनय उत्पन्न होता है। वास्तव में जो व्यक्ति जितना अधिक ज्ञानी होता है, वह उतना ही शांत और विनम्र होता है। फल से लदा हुआ वृक्ष सदैव झुक जाता है। उसी प्रकार महान व्यक्ति कभी अहंकार नहीं करता। विनम्रता मनुष्य के व्यक्तित्व को आकर्षक बनाती है और समाज में सम्मान दिलाती है। सच्चा ज्ञान वही है जो मनुष्य को नम्र बनाए।"
      },
      {
        title: "पात्रता और सफलता का संबंध",
        content: "विनम्र व्यक्ति सभी का प्रिय बनता है। ऐसे व्यक्ति को समाज में अवसर, सम्मान और सहयोग प्राप्त होता है। यही पात्रता है। जब व्यक्ति योग्य बनता है, तब उसे धन, सम्मान और सफलता प्राप्त होने लगती है। यदि धन धर्म के मार्ग में उपयोग हो, तो वही जीवन को सुखी बनाता है। धर्म का अर्थ केवल पूजा-पाठ नहीं, बल्कि सत्य, दया, सेवा और सदाचार का पालन करना है।"
      },
      {
        title: "आधुनिक जीवन में आवश्यकता",
        content: "आज के समय में लोग मानसिक तनाव, प्रतिस्पर्धा और अहंकार से घिरे हुए हैं। ऐसे समय में यह विचार हमें संतुलित जीवन जीने की प्रेरणा देता है। शिक्षा के साथ संस्कार, सफलता के साथ विनम्रता, और धन के साथ धर्म आवश्यक है। यदि प्रत्येक व्यक्ति इस संदेश को अपनाए, तो समाज अधिक सुखी और समृद्ध बन सकता है।"
      }
    ],
    conclusion: "“विद्या ददाति विनयम्” भारतीय जीवन दर्शन का सार है। यह हमें सिखाता है कि सच्ची सफलता बाहरी दिखावे में नहीं, बल्कि ज्ञान, विनम्रता, धर्म और सदाचार में निहित है। इसलिए हमें सदैव ज्ञान प्राप्त करने का प्रयास करना चाहिए।",
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
        content: "विद्याले मानिसलाई विनम्र बनाउँछ। विनम्रताले मानिस योग्य बन्छ। योग्य व्यक्तिले धन र सम्मान प्राप्त गर्दछ। धनबाट ऊ धर्मको मार्गमा चल्छ र अन्तमा उसले जीवनमा साँचो सुख प्राप्त गर्दछ। यो केवल शब्दहरूको संग्रह मात्र होइन, बरु सम्पूर्ण जीवन दर्शन हो।"
      },
      {
        title: "विद्याको महत्व",
        content: "सनातन परम्परामा ज्ञानलाई ईश्वरको स्वरूप मानिएको छ। विद्या पुस्तक पढ्ने कुरामा मात्र सीमित हुँदैन, बरु यसले मानिसको विचार, व्यवहार र चरित्रलाई पनि श्रेष्ठ बनाउँछ। जससँग ज्ञान हुन्छ, उसले सही र गलतको निर्णय गर्न सक्छ। विद्याले मानिसको भित्र आत्मविश्वास उत्पन्न गराउँछ र जीवनका कठिन परिस्थितिहरूको सामना गर्ने शक्ति दिन्छ। आधुनिक युगमा प्राविधिक शिक्षाका साथै संस्कार र विनम्रता पनि उत्तिकै आवश्यक छ।"
      },
      {
        title: "विनम्रता नै साँचो महानता",
        content: "विद्याबाट विनय उत्पन्न हुन्छ। वास्तवमा जो व्यक्ति जति धेरै ज्ञानी हुन्छ, उति नै शान्त र विनम्र हुन्छ। फलले भरिएको रुख सधैं झुक्छ। त्यसैगरी महान व्यक्तिले कहिल्यै अहंकार गर्दैन। विनम्रताले मानिसको व्यक्तित्वलाई आकर्षक बनाउँछ र समाजमा सम्मान दिलाउँछ। साँचो ज्ञान त्यही हो जसले मानिसलाई नम्र बनाउँछ।"
      },
      {
        title: "पात्रता र सफलताको सम्बन्ध",
        content: "विनम्र व्यक्ति सबैको प्रिय बन्छ। यस्तो व्यक्तिलाई समाजमा अवसर, सम्मान र सहयोग प्राप्त हुन्छ। यही पात्रता हो। जब व्यक्ति योग्य बन्छ, तब उसले धन, सम्मान र सफलता प्राप्त गर्न थाल्छ। यदि धन धर्मको मार्गमा प्रयोग हुन्छ भने मात्र त्यसले जीवनलाई सुखी बनाउँछ। धर्मको अर्थ सत्य, दया, सेवा र सदाचारको पालना गर्नु हो।"
      },
      {
        title: "आधुनिक जीवनमा आवश्यकता",
        content: "आजको समयमा मानिसहरू मानसिक तनाव, प्रतिस्पर्धा र अहंकारबाट घेरिएका छन्। यस्तो समयमा यो विचारले हामीलाई सन्तुलित जीवन जिउने प्रेरणा दिन्छ। शिक्षासँगै संस्कार, सफलतासँगै विनम्रता, र धनसँगै धर्म आवश्यक छ। यदि प्रत्येक व्यक्तिले यो सन्देश अपनाउने हो भने समाज थप सुखी र समृद्ध बन्न सक्छ।"
      }
    ],
    conclusion: "“विद्या ददाति विनयम्” जीवन दर्शनको सार हो। यसले हामीलाई सिकाउँछ कि साँचो सफलता बाहिरी देखावटमा होइन, बरु ज्ञान, विनम्रता, धर्म र सदाचारमा निहित छ। त्यसैले हामीले सधैं ज्ञान प्राप्त गर्ने प्रयास गर्नुपर्छ।",
    subhSandesh: "ज्ञान त्यो दीपक हो जसले जीवनको अन्धकारलाई हटाउँछ, र विनम्रता त्यो सुगन्ध हो जसले मानिसलाई महान बनाउँछ।"
  },
  en: {
    shloka: "विद्या ददाति विनयं, विनयाद् याति पात्रताम् ।\nपात्रत्वात् धनमाप्नोति, धनात् धर्मं ततः सुखम् ॥",
    shlokaTransliteration: "Vidya dadati vinayam, vinayād yāti pātratām | pātratvāt dhanamāpnoti, dhanāt dharmaṃ tataḥ sukham ||",
    title: "Vedic Wisdom: Education and Humility",
    intro: "This is one of the most famous and inspiring verses in Sanskrit. Its meaning is not just about attaining education, but about giving direction to life. In Vedic culture, Knowledge (Vidya) is considered the greatest wealth. This shloka tells us how true education transforms human life and leads it towards success, respect, and bliss.",
    sections: [
      {
        title: "Simple Meaning",
        content: "Knowledge (Vidya) gives humility (Vinayam). Humility leads to worthiness or competence (Patratam). From worthiness, one attains wealth (Dhanam). From wealth comes the ability to follow Dharma (Righteousness), and from Dharma comes ultimate Happiness (Sukham). This is not just a collection of words, but a complete philosophy of life."
      },
      {
        title: "Importance of Vidya",
        content: "In Sanatana tradition, knowledge is considered a manifestation of God. Vidya is not limited to academic learning; it refines human thoughts, behavior, and character. A person with knowledge is capable of discerning right from wrong. It builds self-confidence and provides the strength to face life's challenges. In the modern era, values and humility are as essential as technical education."
      },
      {
        title: "Humility as True Greatness",
        content: "It is said that knowledge produces humility. Indeed, the more knowledgeable a person is, the more calm and humble they become. A tree laden with fruit always bows down. Similarly, a truly great person never harbors ego. Humility makes a personality attractive and earns social respect. True knowledge makes one humble."
      },
      {
        title: "Worthiness and Success",
        content: "A humble person becomes dear to everyone. Such a person finds opportunities, respect, and cooperation in society. This is what it means to be 'worthy'. When a person is competent, wealth and success follow naturally. But wealth is only a means, not the end. When used for Dharma (truth, kindness, and service), it leads to real happiness."
      },
      {
        title: "Necessity in Modern Life",
        content: "Today, people are surrounded by stress, competition, and ego. This wisdom inspires us to live a balanced life. Values with education, humility with success, and righteousness with wealth are necessary. If individuals adopt this message, society can become more peaceful and prosperous."
      }
    ],
    conclusion: "“Vidya Dadati Vinayam” is the essence of Vedic philosophy. It teaches us that true success lies not in external display, but in wisdom, humility, and character. Therefore, we must always strive for true knowledge.",
    subhSandesh: "Knowledge is the lamp that dispels the darkness of life, and humility is the fragrance that makes a person great."
  }
};
