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
    shloka: "यस्य पुत्रो वशीभूतो भार्या छन्दानुगामिनी ।\nविभवे यश्च सन्तुष्टः तस्य स्वर्ग इहेव हि ॥",
    shlokaTransliteration: "Yasya putro vaśībhūto bhāryā chandānugāminī |\nVibhave yaśca santuṣṭaḥ tasya svarga iheva hi ||",
    title: "गृहस्थाश्रम: धरती पर स्वर्ग",
    intro: "गृहस्थाश्रम को सभी आश्रमों में श्रेष्ठ माना गया है। यह वह आधार है जिस पर शेष समाज टिका हुआ है। इन श्लोकों के माध्यम से जीवन के इस महत्वपूर्ण चरण के गुणों और दोषों पर प्रकाश डाला गया है, जो हमें एक सुखी और आदर्श गृहस्थ जीवन जीने की प्रेरणा देते हैं।",
    sections: [
      {
        title: "सुख के छह साधन",
        content: "अर्थागमो नित्यमरोगिता च, प्रिया च भार्या प्रियवादिनी च। वशश्च पुत्रोऽर्थकरी च विद्या, षड्जीवलोकस्य सुखानि राजन्॥ अर्थात्: निरंतर आय, शरीर का निरोग होना, प्रिय और मीठा बोलने वाली पत्नी, आज्ञाकारी पुत्र और धनोपार्जन कराने वाली विद्या - ये इस संसार के छह प्रमुख सुख हैं।"
      },
      {
        title: "घर ही तपोवन है",
        content: "वनेऽपि दोषा प्रभवन्ति रागिणां, गृहेऽपि पञ्चेन्द्रिय निग्रह स्तपः। अकुत्सिते कर्मणि यः प्रवर्तते, निवृत्तरागस्य गृहं तपोवनम्॥ अर्थात्: आसक्त व्यक्ति के लिए वन भी दोषपूर्ण है। घर में रहकर इंद्रियों पर नियंत्रण करना ही असली तप है। जो सात्विक कर्म करता है, और आसक्ति रहित है, उसके लिए घर ही तपोवन है।"
      },
      {
        title: "तपस्वी का आधार",
        content: "तप्त्वा तपस्वी विपिने क्षुधार्तो, गृहं समायाति सदान्न दातुः। भुक्त्वा स चान्नं प्रददाति तस्मै, तपो विभागं भजते हि तस्य॥ अर्थात्: तपस्वी वन में तप करके जब भूख से पीड़ित होता है, तो वह अन्नदाता के घर आता है। अन्न ग्रहण कर वह (एक तरीके से) अपने तप का हिस्सा उसे बाँटता है।"
      },
      {
        title: "गृहस्थ: सबका आश्रय",
        content: "यथा वायुं समाश्रित्य वर्तन्ते सर्वजन्तवः। तथा गृहस्थमाश्रित्य वर्तन्ते सर्व आश्रमाः॥ अर्थात्: जिस प्रकार सभी प्राणी वायु के आश्रय पर जीवित रहते हैं, उसी प्रकार अन्य सभी आश्रम (ब्रह्मचर्य, वानप्रस्थ, संन्यास) गृहस्थाश्रम के ही आश्रय पर रहते हैं।"
      },
      {
        title: "धिक्कार है ऐसे गृहस्थाश्रम को",
        content: "जिस घर में अशांति, क्लेश, निष्ठुर वाणी, कलह, अस्वच्छता और अभाव हो, जहाँ बच्चों का रोना और बड़ों का क्रोध व्याप्त हो, और जहाँ अतिथि सत्कार न हो - शास्त्र ऐसे गृहस्थाश्रम को धिक्कारते हैं।"
      },
      {
        title: "धन्य है ऐसा गृहस्थाश्रम",
        content: "जहाँ आनंद, बुद्धिमान संतान, प्रियवक्ता पत्नी, अच्छे मित्र, प्रेम, आज्ञापालक सेवक, ईश-भक्ति, अतिथि सत्कार और सत्संग हो, वह गृहस्थाश्रम वास्तव में धन्य और स्वर्ग समान है।"
      }
    ],
    conclusion: "गृहस्थाश्रम केवल उत्तरदायित्वों का बोझ नहीं, बल्कि आध्यात्मिक और सामाजिक उन्नति का मार्ग है। यदि इसे मर्यादा और प्रेम के साथ जिया जाए, तो यह वास्तव में धन्य है।",
    subhSandesh: "सच्चा स्वर्ग ईंट-पत्थर के मकान में नहीं, बल्कि परिवार के प्रेम, संतोष और शुभ कर्मों में निवास करता है।"
  },
  ne: {
    shloka: "यस्य पुत्रो वशीभूतो भार्या छन्दानुगामिनी ।\nविभवे यश्च सन्तुष्टः तस्य स्वर्ग इहेव हि ॥",
    shlokaTransliteration: "Yasya putro vaśībhūto bhāryā chandānugāminī |\nVibhave yaśca santuṣṭaḥ tasya svarga iheva hi ||",
    title: "गृहस्थाश्रम: धर्तीकै स्वर्ग",
    intro: "गृहस्थाश्रमलाई सबै आश्रमहरूमध्ये श्रेष्ठ मानिन्छ। यो समाजको त्यो आधार हो जसमा बाँकी सबै आश्रित छन्। यी श्लोकहरू मार्फत पारिवारिक जीवनका गुण र दोषहरूलाई उजागर गरिएको छ, जसले हामीलाई एक सुखी र आदर्श गृहस्थ जीवन बिताउन प्रेरणा दिन्छन्।",
    sections: [
      {
        title: "सुखका छ साधन",
        content: "निरन्तर आम्दानी, निरोगी शरीर, प्रिय बोल्ने र मिठो बोली भएकी पत्नी, आज्ञाकारी छोराछोरी र धनोपार्जन गराउने विद्या - यी यस संसारका छ प्रमुख सुख हुन्।"
      },
      {
        title: "घर नै तपोवन",
        content: "आसक्त व्यक्तिको लागि वनमा बस्नु पनि दोषपूर्ण हुन सक्छ। घरमै बसेर इन्द्रियहरूमाथि नियन्त्रण गर्नु नै असली तपस्या हो। जो पवित्र कर्ममा लाग्छ, उसको लागि घर नै तपोवन हो।"
      },
      {
        title: "योगीहरूको आधार",
        content: "वनमा तपस्या गरेर जब योगी भोकाउँछन्, उनी अन्नदाता गृहस्थको घरमा आउँछन्। अन्न ग्रहण गरेपछि उनले आफ्नो तपस्याको पुण्य भाग त्यस अन्नदातालाई बाँड्छन्।"
      },
      {
        title: "गृहस्थ: सबैको सहारा",
        content: "जसरी सबै प्राणीहरू हावाको सहारामा जीवित रहन्छन्, त्यसैगरी अन्य सबै आश्रमहरू (ब्रह्मचर्य, वानप्रस्थ, सन्यास) गृहस्थाश्रमकै सहारामा टिकेका हुन्छन्।"
      },
      {
        title: "धिक्कार छ यस्तो गृहस्थाश्रमलाई",
        content: "जुन घरमा अशान्ति, निष्ठुर बोली, क्रोध, फोहोर र अभाव छ, जहाँ बालबालिका रोइरहन्छन् र दम्पतीबीच कलह हुन्छ, त्यस्तो गृहस्थाश्रमलाई शास्त्रले निन्दा गरेका छन्।"
      },
      {
        title: "धन्य छ यस्तो गृहस्थाश्रम",
        content: "जहाँ आनन्द, बुद्धिमान सन्तान, प्रिय बोल्ने जीवनसाथी, असल मित्र, ईश्वर भक्ति र सत्संग हुन्छ, त्यो गृहस्थाश्रम वास्तवमै धन्य र स्वर्ग समान हुन्छ।"
      }
    ],
    conclusion: "गृहस्थाश्रम केवल जिम्मेवारीको बोझ मात्र होइन, बरु आध्यात्मिक र सामाजिक उन्नतिको मार्ग हो। यसलाई प्रेम र मर्यादाका साथ जिउनु नै यसको विशेषता हो।",
    subhSandesh: "साँचो स्वर्ग तपाईंको आफ्नै घरको प्रेम, सन्तोष र शुभ कर्ममा रहन्छ।"
  },
  en: {
    shloka: "यस्य पुत्रो वशीभूतो भार्या छन्दानुगामिनी ।\nविभवे यश्च सन्तुष्टः तस्य स्वर्ग इहेव हि ॥",
    shlokaTransliteration: "Yasya putro vaśībhūto bhāryā chandānugāminī |\nVibhave yaśca santuṣṭaḥ tasya svarga iheva hi ||",
    title: "Grihastha Ashram: Heaven on Earth",
    intro: "The householder stage (Grihastha Ashram) is considered the foundation of human society. Through these sacred verses, we explore the virtues and challenges of family life, guiding us towards creating a harmonious and blessed home environment.",
    sections: [
      {
        title: "Six Pillars of Happiness",
        content: "Steady income, good health, a loving spouse with gentle speech, an obedient child, and practical knowledge - these are the six pillars that bring true joy in this mortal world."
      },
      {
        title: "Home as a Sanctuary",
        content: "For one with attachments, even a forest holds faults. Controlling the senses while being part of a family is true penance. For the detached and righteous, home itself becomes a sacred grove."
      },
      {
        title: "The Support of Ascetics",
        content: "When an ascetic returns from the forest hungry, he seeks the door of a householder. By providing sustenance, the householder receives a portion of the ascetic's spiritual merit."
      },
      {
        title: "The Universal Foundation",
        content: "Just as all living beings survive by depending on air, all other stages of life (students, forest-dwellers, and monks) find their sustenance and support in the householder."
      },
      {
        title: "A Household to Avoid",
        content: "A house filled with harsh words, anger, filth, constant distress, and lack of devotion is criticized as a dwelling that lacks the divine essence of a home."
      },
      {
        title: "A Blessed Household",
        content: "A home brimming with joy, wise children, kind words, true friends, daily worship, and the company of the wise is truly blessed and equivalent to heaven."
      }
    ],
    conclusion: "Grihastha life is not merely a cycle of duties; it is a path to spiritual and social evolution. When lived with love and discipline, it truly becomes 'Dhanya' or Blessed.",
    subhSandesh: "True heaven is not a place afar; it is the peace, contentment, and love cultivated within your own home today."
  }
};
