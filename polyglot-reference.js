"use strict";

// Each table and note is assigned to a zero-based topic in polyglot-theory.js.
// Table indices follow the book order within the lesson. "open" lists the tables shown inline.
const polyglotReferenceLayout = [
  /*  1. Первые фразы */             { tables: [2, 1, 0], notes: [5, 5, 2], open: [2], verbs: 2 },
  /*  2. Работа */                   { tables: [2, 3, 0], notes: [2, 3], open: [2], verbs: 2 },
  /*  3. Кто, где и когда? */         { tables: [2, 0, 0, 1, 3], notes: [0, 3], open: [1, 3, 4], verbs: 2 },
  /*  4. Числа и встречи */         { tables: [4, 1, 1, 2, 2, 2, 2, 0, 0, 3, 3, 3], notes: [2, 3], open: [0, 3, 9], verbs: 3 },
  /*  5. В магазине */              { tables: [1, 2, 3, 3, 4, 0], notes: [1, 4], open: [4, 5], verbs: 4 },
  /*  6. Семья и привычки */         { tables: [4, 2, 2, 3, 1, 0], notes: [4, 2], open: [4, 5], verbs: 4 },
  /*  7. Поездка и приставки */     { tables: [1, 2, 2, 4, 4, 4, 0], notes: [1, 3], open: [0, 1, 6], verbs: 2 },
  /*  8. Одежда и покупки */        { tables: [1, 2, 2, 3, 0], notes: [1, 3], open: [0, 3, 4], verbs: 1 },
  /*  9. Кому помогаешь */           { tables: [2, 3, 4, 0], notes: [1, 1], open: [2, 3], verbs: 1 },
  /* 10. Увлечения */                { tables: [0], notes: [1, 0, 0], open: [0], verbs: 1 },
  /* 11. Погода и сравнения */       { tables: [2, 4, 3, 0, 1], notes: [4], open: [0, 2, 3, 4], verbs: 0 },
  /* 12. Заказываем еду */           { tables: [1, 1, 1, 2, 2, 2, 0], notes: [1, 2], open: [6], verbs: 0 },
  /* 13. Город и дорога */           { tables: [1, 4, 4, 2, 3, 0], notes: [1, 4], open: [0, 3, 4, 5], verbs: 0 },
  /* 14. Квартира */                 { tables: [1, 2, 2, 3, 3, 0], notes: [2, 1], open: [5], verbs: 0 },
  /* 15. Просьбы и прогулка */       { tables: [2, 3, 1, 0], notes: [3, 1], open: [3], verbs: 1 },
  /* 16. Самочувствие и внешность */ { tables: [0, 1, 1, 2], notes: [0, 2], open: [3], verbs: 2 }
];

// Explanations and reference tables adapted from the source PDF.
const polyglotReferenceNotes = [
  [
    [
      "Схема на шесть фраз",
      "В каждом времени можно сказать, спросить или отрицать. Сейчас: Ich mache das. Machst du das? Ich mache das nicht. Для ближайшего будущего часто хватает той же формы со словом morgen или bald."
    ],
    [
      "Как сказать о прошлом",
      "В Ich habe das gemacht слово habe показывает, кто сделал. Слово gemacht показывает действие и стоит в конце. В вопросе первым идёт habe, а в отрицании nicht стоит перед gemacht: Hast du das gemacht? Ich habe das nicht gemacht."
    ],
    [
      "Как меняется слабый глагол",
      "У machen убери -en и добавь -e, -st, -t, -en, -t, -en. После основы на -d или -t часто нужна ещё одна e: du arbeitest, er antwortet. В Perfekt у обычных слабых глаголов получится ge-…-t, а у arbeiten — gearbeitet с -et. Haben может стоять и само по себе: Ich habe Zeit, Gestern hatte ich Zeit."
    ]
  ],
  [
    [
      "Сильный глагол",
      "С du и er/sie/es в корне иногда меняется гласная: lesen → du liest, schlafen → sie schläft. В Perfekt у многих сильных глаголов конец -en, а корень может снова измениться: nehmen → er nimmt → er hat genommen. Es gibt значит «есть»: Es gibt hier einen Parkplatz."
    ],
    [
      "Haben или sein",
      "Часто берём sein, если кто-то переместился или изменилось его состояние: Ich bin gekommen, der Schnee ist geschmolzen. Sein само может обозначать место или состояние: Ich bin hier, gestern war ich dort."
    ]
  ],
  [
    [
      "Как устроен вопрос",
      "Если есть вопросительное слово, оно идёт первым. Затем ставь изменяемое слово про действие, а потом того, кто действует: Wo arbeitest du? Если Wer? уже спрашивает о том, кто действует, другого слова вроде du не нужно: Wer arbeitet?"
    ],
    [
      "Кого или кому",
      "Für, ohne и über в значении «о» здесь идут с формой «кого?». Например, ohne mich, über ihn. Mit и zu берут форму «кому?»: mit mir, zu ihm. Разницу лучше запоминать целыми парами."
    ]
  ],
  [
    [
      "Число и дата",
      "13–19 обычно заканчиваются на -zehn, большинство десятков — на -zig. В 43 единицы идут первыми: dreiundvierzig. У дат запомни erste, dritte и siebte. Обычно до 19 добавляем -te, с 20 — -ste. Встречаемся am dritten Mai: после am появляется -n."
    ],
    [
      "Когда и куда",
      "Час — um drei Uhr, день или дата — am Montag, am dritten Mai, месяц и сезон — im Mai, im Winter. Через неделю — in einer Woche. Название города обычно без артикля: nach Basel, in Basel, aus Basel. Со Швейцарией: in die Schweiz, in der Schweiz, aus der Schweiz."
    ]
  ],
  [
    [
      "Когда можно обойтись без артикля",
      "Новый предмет: ein Geschenk. Уже знакомый: das Geschenk. Без артикля можно назвать вещи вообще во множественном числе: Ich kaufe Äpfel. Абстрактные слова тоже часто идут сами: Zeit ist Geld. В словаре m, f, n показывают род, pl — множественное число. Например, -ung, -schaft, -ei, -heit, -keit обычно подсказывают die."
    ],
    [
      "Прошедшее без ge- и второе действие",
      "У слов с неотделяемыми be-, ge-, er-, ver- и у глаголов на -ieren нет отдельного ge-: bekommen → hat bekommen, verstehen → hat verstanden, reservieren → hat reserviert. После versuchen и vergessen часто нужен оборот с zu: Ich versuche, Deutsch zu lesen. После kann, muss или will zu здесь не ставим."
    ]
  ],
  [
    [
      "Слово sich меняется",
      "В словаре пишут sich erinnern, а про себя скажи Ich erinnere mich. Про собеседника: Du erinnerst dich. Иногда в русском перевода с «-ся» нет: sich erinnern — вспоминать. В Perfekt: Ich habe mich erinnert."
    ],
    [
      "Второе действие и принадлежность",
      "В Ich kann kommen второе действие стоит в конце. Вчера: Ich konnte kommen. Для вежливой просьбы подходит Ich möchte Wasser. Когда говоришь «мой брат», форма mein меняется по роли брата в предложении: mein Bruder, meinen Bruder, meinem Bruder."
    ]
  ],
  [
    [
      "Что меняет приставка",
      "К частым отделяемым приставкам относятся ab, an, auf, aus, ein, mit, vor, weg, zu, zurück и zusammen. Сейчас она часто уходит в конец: Er fährt ab. В Perfekt она стоит перед ge-: Er ist abgefahren. Окончание обычно берётся у основного глагола: laden → geladen, einladen → eingeladen."
    ],
    [
      "Глагол, предлог и падеж",
      "Учи глагол вместе с предлогом. Akkusativ: erzählen über, hoffen auf, warten auf, bitten um, sich beunruhigen um, sich interessieren für. Dativ: träumen von, sich beschäftigen mit. Сравни um acht — в восемь и um Hilfe bitten — просить о помощи. Von и dem часто дают vom, in и das — ins."
    ]
  ],
  [
    [
      "Кого или что в прошедшем",
      "Когда глагол берёт прямое дополнение в Akkusativ, Perfekt обычно строится с haben: Ich habe sie gesehen. Сравни «само стоит, лежит, висит» и «кто-то ставит, кладёт, вешает»: stehen/stellen, liegen/legen, hängen/hängen. В последней паре разные формы: gehangen и gehängt."
    ],
    [
      "Артикли и предлоги",
      "В мужском роде der становится den, ein — einen, mein — meinen. После für, ohne, durch и gegen нужен Akkusativ. Ohne иногда идёт без артикля: ohne Jacke."
    ]
  ],
  [
    [
      "Кому и что",
      "Gratulieren, danken, helfen и folgen берут Dativ. В Er schenkt dem Kind ein Buch получатель dem Kind отвечает на «кому?», а ein Buch — на «что?». При выборе формы помогают пары ihm — dem, ihr — der, ihnen — den. Von может показать принадлежность: ein Foto von meiner Grossmutter."
    ],
    [
      "Форма прошедшего",
      "У zeigen и schicken берём haben: Er hat es mir gezeigt. Если folgen значит «пойти следом», естественно sein: Wir sind der Gruppe gefolgt. В значении «послушаться» встречается haben: Er hat mir gefolgt."
    ]
  ],
  [
    [
      "Что стоит в начале и в конце",
      "При прямом порядке сначала тот, кто действует, затем изменяемая форма: Ich arbeite hier. Когда фраза начинается со времени, места или целого условия, изменяемая форма всё равно во второй позиции: Gestern habe ich gearbeitet. Когда это общий вопрос, начинаем с неё: Hast du gearbeitet? Partizip II, отдельная приставка или второе действие часто стоят в конце."
    ],
    [
      "Действие как название",
      "Ich koche gern — люблю готовить. Если само занятие становится названием, добавь das и большую букву: Das Kochen macht mir Spass."
    ],
    [
      "Два варианта для движения",
      "Для reisen используй sein: Ich bin nach Bern gereist. У schwimmen без направления возможны habe и bin: Ich habe viel geschwommen. При указании направления скажи Ich bin ans Ufer geschwommen."
    ]
  ],
  [
    [
      "Как сравнивать",
      "Обычно прибавляем -er, иногда гласная меняется: alt → älter, gross → grösser. Длинные слова обычно сохраняют гласную: kompliziert → komplizierter. Высшая степень перед предметом склоняется: der heisseste Tag. Когда предмет уже называли, можно сказать Es ist am heissesten. Особую тройку gut → besser → am besten выучи целиком."
    ]
  ],
  [
    [
      "Как меняется описание",
      "В Akkusativ после ein и der мужской род меняется: ein alter Mann → einen alten Mann, der alte Mann → den alten Mann. В женском и среднем роде сравни формы в таблице. После определённого артикля во множественном числе здесь -en: die frischen Äpfel."
    ],
    [
      "Кому или с чем",
      "Когда перед прилагательным в Dativ стоит артикль, само прилагательное получает -en во всех родах и числах: mit einem alten Mann, mit einer heissen Suppe, mit den frischen Äpfeln. Без артикля окончание может быть другим: mit frischem Brot."
    ]
  ],
  [
    [
      "Наречие описывает действие",
      "Оно отвечает на «как?», «где?» или «когда?» и здесь не получает окончания прилагательного. В готовых наречиях можно заметить части -lich, -ig, -mal, -seits: monatlich, niedrig, einmal, andererseits."
    ],
    [
      "Больше, меньше, лучше всего",
      "Обычно добавляем -er и am …-sten: stark → stärker → am stärksten. У некоторых слов формы особые: viel → mehr → am meisten, gern → lieber → am liebsten. Для wenig обычная тройка wenig → weniger → am wenigsten. Minder и am mindesten встречаются реже."
    ]
  ],
  [
    [
      "Как сделать вопрос и ответ",
      "Для предмета соединяй wo- с предлогом в вопросе и da- в ответе: womit → damit. Перед гласной добавляй r: worauf → darauf. Про человека пиши предлог и отдельное слово: Mit wem? → Mit ihr."
    ],
    [
      "Три вопроса о месте",
      "Wo? — где находится предмет. Wohin? — куда он движется. Woher? — откуда. Сравни dort, dorthin и dorther, а также hier, hierher и von hier."
    ]
  ],
  [
    [
      "Как устроено отрицание",
      "Nichts, niemand, nie и nirgends сами передают отрицание. Для обычного «никто не пришёл» достаточно Niemand ist gekommen. Kein стоит перед названием вещи и меняется похоже на mein: kein Fahrrad, keinen Hund, keine Zeit, keine Kinder. С действием или признаком часто идёт nicht."
    ],
    [
      "Три вида просьбы",
      "Для Sie начни с действия и оставь Sie: Kommen Sie! Для группы возьми форму ihr и убери ihr: Kommt! С другом часто можно убрать du и -st: du machst → Mach! Запомни Arbeite!, Nimm!, Gib!, Iss! Отделяемая часть остаётся в конце: Ruf mich an!"
    ]
  ],
  [
    [
      "Устойчивые сочетания",
      "В Hunger haben или beschäftigt sein главный смысл сообщает слово рядом с haben или sein. Учи сочетание целиком: Ich habe Hunger — я голоден, Ich bin beschäftigt — я занят. Состояние и его изменение различаются: Ich bin müde, Ich werde müde."
    ],
    [
      "Как описать человека",
      "Ist говорит, какой человек сейчас, hat — что у него есть, trägt — что он носит. Например: Er ist gross, hat dunkle Haare und trägt eine Brille. Entschuldigen можно употребить с другим человеком: Ich entschuldige dich. Sich entschuldigen — самому извиниться: Ich entschuldige mich."
    ]
  ]
];

const polyglotReferenceTables = {
  18: [
    ["Личные местоимения", true, [
      ["ich","du","er","sie","es","wir","ihr","sie","Sie"],
      ["я","ты","он","она","оно,\nэто","мы","вы\n(при обращении\nна «ты»)","они","Вы\n(при обращении\nна «Вы»)"]
    ]]
  ],
  21: [
    ["Список слабых глаголов", true, [
      [["Неопределённая форма глагола",2,1],["Неопределённая форма глагола",2,1]],
      ["antworten","отвечать","legen","класть, положить"],
      ["arbeiten","работать","lehren","учить, преподавать"],
      ["brauchen","нуждаться","lernen","учиться"],
      ["danken","благодарить","öffnen","открывать"],
      ["fragen","спрашивать","reisen","путешествовать"],
      ["fühlen","чувствовать","sagen","говорить"],
      ["glauben","верить, полагать","schenken","дарить"],
      ["hoffen","надеяться","spielen","играть"],
      ["hören","слышать","stellen","ставить"],
      ["kaufen","покупать","suchen","искать"],
      ["kochen","готовить еду","tanzen","танцевать"],
      ["kosten","стоить","träumen","мечтать"],
      ["küssen","целовать","warten","ждать"],
      ["lachen","смеяться","wohnen","жить, проживать"],
      ["lächeln","улыбаться","wünschen","желать"],
      ["leben","жить","zeigen","показывать"]
    ]]
  ],
  22: [
    ["Фразы для общения", false, [
      ["Hallo!\nПривет!","Guten Morgen!\nДоброе утро!"],
      ["Guten Tag!\nДобрый день!","Guten Abend!\nДобрый вечер!"],
      ["Wie geht’s?\nКак дела?","gut\nхорошо"],
      ["Wie heisst du?\nКак тебя зовут?","Ich heisse...\nМеня зовут."],
      ["Wie heissen Sie?\nКак Вас зовут?","Sehr angenehm!\nОчень приятно!"],
      ["Danke!\nСпасибо!","Entschuldigung!\nИзвините!"],
      ["Tschüss!\nПока!","Auf Wiedersehen!\nДо свидания!"]
    ]]
  ],
  35: [
    ["Сильные глаголы с haben", true, [
      [["Неопределённая форма\nглагола",2,1],"3-е л., ед. ч. настоящего времени","Форма прошедшего времени"],
      ["bringen","приносить","er bringt","gebracht"],
      ["denken","думать","er denkt","gedacht"],
      ["essen","есть","er isst","gegessen"],
      ["finden","находить","er findet","gefunden"],
      ["geben","давать","er gibt","gegeben"],
      ["hängen","висеть","er hängt","gehangen"],
      ["helfen","помогать","er hilft","geholfen"],
      ["lesen","читать","er liest","gelesen"],
      ["liegen","лежать","er liegt","gelegen"],
      ["nehmen","брать, взять","er nimmt","genommen"],
      ["schlafen","спать","er schläft","geschlafen"],
      ["schreiben","писать","er schreibt","geschrieben"],
      ["sehen","видеть,\nсмотреть","er sieht","gesehen"],
      ["singen","петь","er singt","gesungen"],
      ["sitzen","сидеть","er sitzt","gesessen"],
      ["sprechen","разговаривать","er spricht","gesprochen"],
      ["stehen","стоять","er steht","gestanden"],
      ["tragen","носить","er trägt","getragen"],
      ["trinken","пить","er trinkt","getrunken"]
    ]]
  ],
  37: [
    ["Глаголы с sein", true, [
      [["Неопределённая форма\nглагола",2,1],"3-е л., ед. ч. настоящего времени","Форма прошедшего времени"],
      ["bleiben","оставаться","er bleibt","geblieben"],
      ["fahren","ехать","er fährt","gefahren"],
      ["fallen","падать","er fällt","gefallen"],
      ["fliegen","летать","er fliegt","geflogen"],
      ["fliessen","течь","er fliesst","geflossen"],
      ["gehen","идти","er geht","gegangen"],
      ["kommen","приходить","er kommt","gekommen"],
      ["laufen","бегать","er läuft","gelaufen"],
      ["steigen","подниматься","er steigt","gestiegen"],
      ["sterben","умирать","er stirbt","gestorben"],
      ["wachsen","расти","er wächst","gewachsen"],
      ["werden","становиться","er wird","geworden"]
    ]]
  ],
  40: [
    ["Профессии", false, [
      ["Lehrer\nучитель","Schriftsteller\nписатель"],
      ["Arzt\nврач","Designer\nдизайнер"],
      ["Manager\nуправляющий","Musiker\nмузыкант"],
      ["Unternehmer\nпредприниматель","Fahrer\nводитель"],
      ["Jurist\nюрист","Redakteur\nредактор"],
      ["Ökonom\nэкономист","Journalist\nжурналист"],
      ["Ingenieur\nинженер","Arbeiter\nрабочий"]
    ]]
  ],
  52: [
    ["Кто? Кого? Кому?", true, [
      ["Wer?\nКто?","Wen?\nКого?","Wem?\nКому?"],
      ["ich — я","mich — меня","mir — мне"],
      ["du — ты","dich — тебя","dir — тебе"],
      ["er — он","ihn — его",["ihm — ему, этому",1,2]],
      ["es — оно, это","es — его, это"],
      ["sie — она","sie — её","ihr — ей"],
      ["wir — мы","uns — нас","uns — нам"],
      ["ihr — вы","euch — вас","euch — вам"],
      ["sie — они","sie — их","ihnen — им"],
      ["Sie — Вы","Sie — Вас","Ihnen — Вам"]
    ]]
  ],
  54: [
    ["Вопросительные слова", true, [
      ["Вопросы к действующему\nлицу или объекту","Вопросы\nо месте","Другие вопросы"],
      ["Wer?\nКто?","","Wie?\nКак?"],
      ["Was?\nЧто?","Wo?\nГде?","Wann?\nКогда?"],
      ["Wem?\nКому?","Wohin?\nКуда?","Wie viel?\nСколько?"],
      ["Wen?\nКого?","Woher?\nОткуда?","Warum?\nПочему?"],
      ["Wessen?\nЧей?","","Welcher?\nКакой?"]
    ]],
    ["Как построить вопрос", false, [
      ["вопросительное\nслово (если есть)","+","изменяемая\nформа глагола","+","подлежащее","+","другие члены\nпредложения"]
    ]]
  ],
  56: [
    ["Слова о времени", false, [
      ["vorgestern","позавчера"],
      ["gestern","вчера"],
      ["heute","сегодня"],
      ["morgen","завтра"],
      ["übermorgen","послезавтра"],
      ["früher","раньше"],
      ["jetzt","сейчас"],
      ["dann","потом"],
      ["immer","всегда"],
      ["nie, niemals","никогда"],
      ["manchmal","иногда"],
      ["bald","скоро"]
    ]]
  ],
  58: [
    ["Местоимения после предлогов", true, [
      ["Wer?\nКто?",["Wen?\nКого?",2,1],["Wem?\nКому?",2,1]],
      ["ich — я",["ohne\nбез",1,3],"mich — меня",["mit\nс\nzu\nк",1,9],"mir — мной, мне"],
      ["du — ты","dich — тебя","dir — тобой, тебе"],
      ["er — он","ihn — него","ihm — ним"],
      ["es — оно, это",["für\nдля",1,3],"es — него, этого","ihm — ним, этим"],
      ["sie — она","sie — неё","ihr — ней"],
      ["wir — мы","uns — нас","uns — нами, нам"],
      ["ihr — вы",["über\nо, про",1,3],"euch — вас","euch — вами, вам"],
      ["sie — они","sie — них","ihnen — ними, ним"],
      ["Sie — Вы","Sie — Вас","Ihnen — Вами, Вам"]
    ]]
  ],
  70: [
    ["Три частых союза", false, [
      ["und\nи","aber\nно","oder\nили"]
    ]]
  ],
  72: [
    ["Числа от 0 до 19", false, [
      ["0 null\n1 eins\n2 zwei\n3 drei\n4 vier\n5 fünf\n6 sechs\n7 sieben\n8 acht\n9 neun","10 zehn\n11 elf\n12 zwölf\n13 dreizehn\n14 vierzehn\n15 fünfzehn\n16 sechzehn\n17 siebzehn\n18 achtzehn\n19 neunzehn"]
    ]],
    ["Десятки, сотни и тысячи", false, [
      ["20 zwanzig\n30 dreissig\n40 vierzig\n50 fünfzig\n60 sechzig\n70 siebzig\n80 achtzig\n90 neunzig\n100 hundert","1000 tausend\n1001 eintausendeins\n10 000 zehntausend\n100 000 einhunderttausend\n1 000 000 eine Million"]
    ]]
  ],
  74: [
    ["Порядковые числа", false, [
      ["1 erste\n2 zweite\n3 dritte\n4 vierte\n5 fünfte\n6 sechste\n7 siebte\n8 achte\n9 neunte\n10 zehnte","11 elfte\n12 zwölfte\n13 dreizehnte\n14 vierzehnte\n15 fünfzehnte\n16 sechzehnte\n17 siebzehnte\n18 achtzehnte\n19 neunzehnte\n20 zwanzigste"]
    ]],
    ["Дни недели", false, [
      ["Montag — понедельник","am Montag — в понедельник"],
      ["Dienstag — вторник","am Dienstag — во вторник"],
      ["Mittwoch — среда","am Mittwoch — в среду"],
      ["Donnerstag — четверг","am Donnerstag — в четверг"],
      ["Freitag — пятница","am Freitag — в пятницу"],
      ["Sonnabend — суббота","am Sonnabend — в субботу"],
      ["Sonntag — воскресенье","am Sonntag — в воскресенье"],
      ["Wochenende — выходные","am Wochenende — на выходных"]
    ]]
  ],
  76: [
    ["Месяцы", false, [
      ["Januar — январь","im Januar — в январе"],
      ["Februar — февраль","im Februar — в феврале"],
      ["März — март","im März — в марте"],
      ["April — апрель","im April — в апреле"],
      ["Mai — май","im Mai — в мае"],
      ["Juni — июнь","im Juni — в июне"],
      ["Juli — июль","im Juli — в июле"],
      ["August — август","im August — в августе"],
      ["September — сентябрь","im September — в сентябре"],
      ["Oktober — октябрь","im Oktober — в октябре"],
      ["November — ноябрь","im November — в ноябре"],
      ["Dezember — декабрь","im Dezember — в декабре"]
    ]],
    ["Времена года", false, [
      ["Frühling — весна","im Frühling — весной"],
      ["Sommer — лето","im Sommer — летом"],
      ["Herbst — осень","im Herbst — осенью"],
      ["Winter — зима","im Winter — зимой"]
    ]],
    ["Через неделю, месяц, год", false, [
      ["in einer Woche\nчерез неделю","in einem Monat\nчерез месяц","in einem Jahr\nчерез год"]
    ]]
  ],
  78: [
    ["Части суток", false, [
      ["morgens\nутром","nachmittags\nднём","abends\nвечером","nachts\nночью"]
    ]]
  ],
  80: [
    ["Куда? Где? Откуда?", true, [
      [["Куда?",2,1],["Где?",2,1],["Откуда?",2,1]],
      ["nach\nв","nach Europa\nnach Berlin\nnach Russland","in\nв","in Europa\nin Berlin\nin Russland","aus\nиз","aus Europa\naus Berlin\naus Russland"]
    ]],
    ["Страны и части света", false, [
      ["Europa — Европа","Belgien — Бельгия","Dänemark — Дания"],
      ["Afrika — Африка","Spanien — Испания","Polen — Польша"],
      ["Asien — Азия","Griechenland — Греция","Frankreich — Франция"],
      ["Amerika — Америка","Finnland — Финляндия","Österreich — Австрия"]
    ]],
    ["Здесь, туда, оттуда", true, [
      ["Куда?","Где?","Откуда?"],
      ["hierher — сюда","hier — здесь","von hier — отсюда"],
      ["dorthin — туда","dort — там","von dort — оттуда"]
    ]]
  ],
  92: [
    ["Артикли по родам", true, [
      ["","Определённые артикли\nв именительном падеже","Неопределённые артикли в именительном\nпадеже"],
      ["Мужской род","der от dieser (этот)","ein"],
      ["Женский род","die от diese (эта)","eine"],
      ["Средний род","das от dieses (это)","ein"],
      ["Множественное число\nдля всех родов","die от diese (эти)",""]
    ]]
  ],
  94: [
    ["Множественное число по группам", false, [
      [["Мужской род",2,1]],
      ["der Mann — мужчина\nder Freund — друг\nder Bruder — брат\nder Sohn — сын\nder Gast — гость","die Männer — мужчины\ndie Freunde — друзья\ndie Brüder — братья\ndie Söhne — сыновья\ndie Gäste — гости"],
      ["Женский род",""],
      ["die Freundin — подруга","die Freundinnen —\nподруги"],
      ["die Schwester — сестра","die Schwestern — сёстры"],
      ["die Frau — женщина","die Frauen — женщины"],
      ["die Tochter — дочь","die Töchter — дочери"],
      ["die Sprache — язык","die Sprachen — языки"],
      ["die Stadt — город","die Städte — города"],
      ["Средний род",""],
      ["das Mädchen — девочка","die Mädchen — девочки"],
      ["das Kind — ребёнок","die Kinder — дети"],
      ["das Land — страна","die Länder — страны"],
      ["das Auto — машина","die Autos — машины"],
      ["das Buch — книга","die Bücher — книги"],
      ["das Haus — дом","die Häuser — дома"]
    ]]
  ],
  96: [
    ["Изменение по падежам", true, [
      ["Именительный","Винительный","Дательный"],
      ["Wer? Кто?","Wen? Кого?","Wem? Кому?"],
      ["der Mann — мужчина","den Mann — мужчину","dem Mann — мужчине"],
      ["das Kind — ребёнок","das Kind — ребёнка","dem Kind — ребёнку"],
      ["die Frau — женщина","die Frau — женщину","der Frau — женщине"],
      ["die Männer — мужчины","die Männer — мужчин","den Männern — мужчинам"],
      ["die Kinder — дети","die Kinder — детей","den Kindern — детям"],
      ["die Frauen — женщины","die Frauen — женщин","den Frauen — женщинам"]
    ]],
    ["Нерегулярное склонение", true, [
      ["Именительный","Винительный","Дательный"],
      ["Wer? Кто?","Wen? Кого?","Wem? Кому?"],
      ["ein Mann — мужчина","einen Mann — мужчину","einem Mann — мужчине"],
      ["ein Kind — ребёнок","ein Kind — ребёнка","einem Kind — ребёнку"],
      ["eine Frau — женщина","eine Frau — женщину","einer Frau — женщине"]
    ]]
  ],
  99: [
    ["Прошедшее время без ge-", true, [
      [["Неопределённая\nформа глагола",2,1],"3-е л., ед. ч. настоящего времени","Форма прошедшего времени"],
      ["beginnen","начинать(ся)","er beginnt","begonnen"],
      ["bekommen","получать","er bekommt","bekommen"],
      ["besuchen","посещать","er besucht","besucht"],
      ["erklären","объяснять","er erklärt","erklärt"],
      ["erzählen","рассказывать","er erzählt","erzählt"],
      ["gratulieren","поздравлять","er gratuliert","gratuliert"],
      ["gefallen","нравиться","er gefällt","gefallen"],
      ["rasieren","брить","er rasiert","rasiert"],
      ["reservieren","резервировать","er reserviert","reserviert"],
      ["studieren","учиться (в вузе)","er studiert","studiert"],
      ["verdienen","зарабатывать","er verdient","verdient"],
      ["vergessen","забывать","er vergisst","vergessen"],
      ["verkaufen","продавать","er verkauft","verkauft"],
      ["verlieren","терять","er verliert","verloren"],
      ["versprechen","обещать","er verspricht","versprochen"],
      ["verstehen","понимать","er versteht","verstanden"],
      ["versuchen","пытаться","er versucht","versucht"]
    ]]
  ],
  100: [
    ["Покупки", false, [
      ["das Bargeld\nналичные","die Kreditkarte\nкредитная карта"],
      ["der Preis\nцена","der Rabatt\nскидка"],
      ["der Verkäufer\nпродавец","der Käufer\nпокупатель"],
      ["der Kunde\nклиент","der Ausvekauf\nраспродажа"],
      ["der Supermarkt\nсупермаркет","der Markt\nрынок"],
      ["die Lebensmittel (pl)\nпродукты","das Geschäft\nмагазин"],
      ["das Geschenk\nподарок","das Souvenir\nсувенир"]
    ]]
  ],
  112: [
    ["Формы sich setzen", false, [
      ["ich","setze","mich"],
      ["du","setzt","dich"],
      ["er, sie, es","setzt","sich"],
      ["wir","setzen","uns"],
      ["ihr","setzt","euch"],
      ["sie, Sie","setzen","sich"]
    ]]
  ],
  114: [
    ["Значения модальных глаголов", false, [
      ["können","","мочь","ich kann — я могу"],
      ["dürfen","","иметь разрешение","ich darf — мне можно"],
      ["müssen","","быть вынужденным","ich muss — я должен"],
      ["sollen","","быть обязанным","ich soll — мне следует / надо"],
      ["wollen","","хотеть","ich will — я хочу"],
      ["mögen","","любить, нравиться","Ich mag — я люблю"]
    ]],
    ["Модальные глаголы в настоящем", true, [
      ["Глагол / местоимение","können","dürfen","müssen","sollen","wollen","mögen"],
      ["ich, er, sie, es","kann","darf","muss","soll","will","mag"],
      ["du","kannst","darfst","musst","sollst","willst","magst"],
      ["wir, sie, Sie","können","dürfen","müssen","sollen","wollen","mögen"],
      ["ihr","könnt","dürft","müsst","sollt","wollt","mögt"]
    ]],
    ["Модальные глаголы в простом прошлом", true, [
      ["Глагол / местоимение","können","dürfen","müssen","sollen","wollen","mögen"],
      ["ich, er, sie, es","konnte","durfte","musste","sollte","wollte","mochte"],
      ["du","konntest","durftest","musstest","solltest","wolltest","mochtest"],
      ["wir, sie, Sie","konnten","durften","mussten","sollten","wollten","mochten"],
      ["ihr","konntet","durftet","musstet","solltet","wolltet","mochtet"]
    ]]
  ],
  116: [
    ["Чей? Притяжательные слова", true, [
      ["Мужской и средний род","Женский род и множественное число"],
      ["mein — мой, моё","meine — моя, мои"],
      ["dein — твой, твоё","deine — твоя, твои"],
      ["sein — его","seine — его"],
      ["ihr — её","ihre — её"],
      ["unser — наш, наше","unsere — наша, наши"],
      ["euer — ваш, ваше","eure — ваша, ваши"],
      ["ihr — их","ihre — их"],
      ["Ihr — Ваш, Ваше","Ihre — Ваша, Ваши"]
    ]]
  ],
  118: [
    ["Семья", false, [
      ["die Familie\nсемья","die Eltern\nродители"],
      ["der Vater\nотец","die Mutter\nмать"],
      ["der Sohn\nсын","die Tochter\nдочь"],
      ["das Kind\nребёнок","der Enkel\nвнук"],
      ["der Bruder\nбрат","die Schwester\nсестра"],
      ["der Grossvater,\nder Opa\nдедушка","die Grossmutter,\ndie Oma\nбабушка"],
      ["der Ehemann\nмуж","die Ehefrau\nжена"]
    ]]
  ],
  131: [
    ["Примеры с отделяемыми приставками", true, [
      [["Неопределённая форма\nглагола",2,1],"3-е л., ед. ч. настоящего времени","Форма прошедшего времени"],
      ["abfahren","уезжать","er fährt ab","abgefahren"],
      ["ankommen","прибывать","er kommt an","angekommen"],
      ["anmachen","включать","er macht an","angemacht"],
      ["anrufen","звонить\nпо телефону","er ruft an","angerufen"],
      ["anziehen","одевать","er zieht an","angezogen"],
      ["aufmachen","открывать","er macht auf","aufgemacht"],
      ["aufstehen","вставать","er steht auf","aufgestanden"],
      ["ausmachen","выключать","er macht aus","ausgemacht"],
      ["aussehen","выглядеть","er sieht aus","ausgesehen"],
      ["einladen","приглашать","er lädt ein","eingeladen"],
      ["fernsehen","смотреть\nтелевизор","er sieht fern","ferngesehen"],
      ["spazieren gehen","гулять","er geht spazieren","spazieren gegangen"],
      ["umziehen","переезжать","er zieht um","umgezogen"],
      ["vorhaben","планировать","er hat vor","vorgehabt"],
      ["zumachen","закрывать","er macht zu","zugemacht"],
      ["zurückkehren","возвращаться","er kehrt zurück","zurückgekehrt"]
    ]]
  ],
  132: [
    ["Словарная форма, настоящее и прошлое", false, [
      ["einladen\nприглашать","er lädt ein\nон приглашает","er hat eingeladen\nон пригласил"],
      ["aussehen\nвыглядеть","er sieht aus\nон выглядит","er hat ausgesehen\nон выглядел"]
    ]],
    ["Приставки и движение", false, [
      ["kommen\nприходить","er kommt\nон приходит","er ist gekommen\nон пришёл"],
      ["ankommen\nприбывать","er kommt an\nон прибывает","er ist angekommen\nон прибыл"],
      ["fahren\nехать","er fährt\nон едет","er ist gefahren\nон ехал"],
      ["abfahren\nуезжать","er fährt ab\nон уезжает","er ist abgefahren\nон уехал"]
    ]]
  ],
  136: [
    ["Слияния с dem", false, [
      ["an — на\nin — в\nvon — от\nzu — к","+","dem","→","am\nim\nvom\nzum"]
    ]],
    ["Слияние с der", false, [
      ["zu — к","+","der","→","zur"]
    ]],
    ["Слияния с das", false, [
      ["an — на\nin — в\nauf — на\nfür — для","+","das","→","ans\nins\naufs\nfürs"]
    ]]
  ],
  138: [
    ["Путешествия", false, [
      ["die Reise\nпутешествие","die Fahrt\nпоездка"],
      ["die Karte\nбилет","der Ausweis\nдокумент, удостоверяющий личность"],
      ["der Bahnhof\nвокзал","der Zug\nпоезд"],
      ["das Hotel\nгостиница","die Registration\nстойка регистратора"],
      ["der Hafen\nпорт","das Schiff\nкорабль"],
      ["der Flughafen\nаэропорт","das Flugzeug\nсамолёт"],
      ["der Koff er\nчемодан","der Rucksack\nрюкзак"]
    ]]
  ],
  150: [
    ["Порядок слов в прошедшем времени", false, [
      ["подлежащее","вспомогательный\nглагол","объект\nв винительном\nпадеже","главный глагол\nв соответствующей\nформе"]
    ]]
  ],
  152: [
    ["Неопределённый артикль в Akkusativ", true, [
      ["","Именительный\nWer? Кто?","Винительный\nWen? Кого?"],
      ["Мужской род","ein Mann — мужчина","einen Mann — мужчину"],
      ["Средний род","ein Kind — ребёнок","ein Kind — ребёнка"],
      ["Женский род","eine Frau — женщина","eine Frau — женщину"]
    ]]
  ],
  154: [
    ["Определённый артикль в Akkusativ", true, [
      ["","Именительный\nWer? Кто?","Винительный\nWen? Кого?"],
      ["Мужской род","der Mann — мужчина","den Mann — мужчину"],
      ["Средний род","das Kind — ребёнок","das Kind — ребёнка"],
      ["Женский род","die Frau — женщина","die Frau — женщину"],
      [["Множественное\nчисло для всех\nродов",1,3],"die Männer — мужчины","die Männer — мужчин"],
      ["die Kinder — дети","die Kinder — детей"],
      ["die Frauen — женщины","Frauen — женщин"]
    ]]
  ],
  156: [
    ["Предлоги и местоимения в Akkusativ", true, [
      ["ПРЕДЛОГ",["+",1,4],"ЕДИНСТВЕННОЕ\nЧИСЛО","МНОЖЕСТВЕННОЕ\nЧИСЛО"],
      ["für — для","mich","uns"],
      ["durch — через","dich","euch"],
      ["ohne — без","ihn den Mann\nes das Kind\nsie die Frau","sie die Männer\nSie die Kinder\ndie Frauen"],
      ["in — в (куда?)",["→",1,3],["ins Zimmer — в комнату\nauf den Boden — на пол\nan die Wand — на стену",2,3]],
      ["auf — на\n(куда?)"],
      ["an — на\n(куда?)"]
    ]]
  ],
  158: [
    ["Одежда", false, [
      ["die Kleidung\nодежда","die Jacke\nкуртка, пиджак"],
      ["das Hemd\nрубашка","der Mantel\nпальто"],
      ["der Rock\nюбка","die Bluse\nблузка"],
      ["das Kleid\nплатье","der Anzug\nкостюм"],
      ["die Hose\nбрюки","der Gurt\nремень"],
      ["die Schuhe (pl)\nтуфли","die Stiefel (pl)\nсапоги"],
      ["das Halstuch\nшарф","die Socken (pl)\nноски"]
    ]]
  ],
  172: [
    ["Неопределённый артикль в Dativ", true, [
      ["Wer? Кто?","Wem? Кому?"],
      ["ein Mann — мужчина","einem Mann — мужчине"],
      ["ein Kind — ребёнок","einem Kind — ребёнку"],
      ["eine Frau — женщина","einer Frau — женщине"]
    ]]
  ],
  174: [
    ["Определённый артикль в Dativ", true, [
      ["Wer? Кто?","Wem? Кому?"],
      ["der Mann — мужчина","dem Mann — мужчине"],
      ["das Kind — ребёнок","dem Kind — ребёнку"],
      ["die Frau — женщина","der Frau — женщине"],
      ["die Männer — мужчины","den Männern — мужчинам"],
      ["die Kinder — дети","den Kindern — детям"],
      ["die Frauen — женщины","den Frauen — женщинам"]
    ]]
  ],
  176: [
    ["Предлоги и местоимения в Dativ", true, [
      ["ПРЕДЛОГ",["+",1,6],"ЕДИНСТВЕННОЕ\nЧИСЛО","МНОЖЕСТВЕННОЕ\nЧИСЛО"],
      ["aus — из","mir","uns"],
      ["mit — с","dir","euch"],
      ["von — от",["ihm dem Mann\nihm dem Kind\nihr der Frau",1,3],["ihnen den Männern\nIhnen den Kindern\nden Frauen",1,3]],
      ["zu — к"],
      ["nach — на, в, за"],
      ["in — в (где?)",["→",1,3],["im Zimmer — в комнате\nauf dem Boden — на полу\nan der Wand — на стене",2,3]],
      ["auf — на (где?)"],
      ["an — на (где?)"]
    ]]
  ],
  178: [
    ["Работа и учёба", false, [
      ["die Schule\nшкола","die Universität\nуниверситет"],
      ["das Büro\nофис","die Gesellschaft\nкомпания"],
      ["der Kindergarten\nдетский сад","das Krankenhaus\nбольница"],
      ["das Cafe\nкафе","das Restaurant\nресторан"],
      ["das Geschäft\nмагазин","das Einkaufszentrum\nторговый центр"],
      ["die Polizei\nполиция","das Studio\nстудия"],
      ["der Betrieb\nпредприятие","die Organisation\nорганизация"]
    ]]
  ],
  194: [
    ["Увлечения", false, [
      ["der Sport\nспорт","die Tänze (pl)\nтанцы"],
      ["die Musik\nмузыка","die Malerei\nживопись"],
      ["das Kino\nкино","das Theater\nтеатр"],
      ["das Angeln\nрыбалка","die Jagd\nохота"],
      ["die Haustiere (pl)\nдомашние питомцы","das Kochen\nприготовление еды"],
      ["das Bergsteigen\nальпинизм","sammeln\nколлекционировать"],
      ["Gitarre spielen\nиграть на гитаре","Rad fahren\nездить на велосипеде"]
    ]]
  ],
  206: [
    ["Слова с противоположным значением", false, [
      ["einfach\nпростой","schwierig\nтрудный"],
      ["interessant\nинтересный","langweilig\nскучный"],
      ["glücklich\nсчастливый","traurig\nгрустный"],
      ["munter\nбодрый","müde\nусталый"],
      ["neu\nновый","alt\nстарый"]
    ]]
  ],
  208: [
    ["Особые формы сравнения", false, [
      ["gut\nхороший","besser\nлучший","am besten / der beste\nсамый хороший (лучший)"]
    ]]
  ],
  210: [
    ["Цвета", false, [
      ["schwarz\nчёрный","weiss\nбелый"],
      ["rot\nкрасный","grün\nзелёный"],
      ["blau\nсиний","gelb\nжёлтый"],
      ["grau\nсерый","braun\nкоричневый"],
      ["orange\nоранжевый","rosa\nрозовый"]
    ]]
  ],
  212: [
    ["Фразы о погоде", false, [
      [["",1,2],["Es wird ... sein.\n...",1,2],["+",1,7],"kalt\nхолодно"],
      ["warm\nтепло"],
      [["",1,3],["Es ist ...",1,3],"heiss\nжарко"],
      ["sonnig\nсолнечно"],
      ["windig\nветрено"],
      [["",1,2],["Es war ...",1,2],"nebelig\nтуманно"],
      ["finster\nоблачно"]
    ]]
  ],
  214: [
    ["Природные явления", false, [
      ["die Natur\nприрода","das Wetter\nпогода"],
      ["der Himmel\nнебо","die Erde\nземля"],
      ["die Kälte\nхолод","die Hitze\nжара"],
      ["die Sonne\nсолнце","die Wolke\nтуча"],
      ["der Regen\nдождь","der Schnee\nснег"],
      ["der Wind\nветер","das Gewitter\nгроза"],
      ["der Regenbogen\nрадуга","der Nebel\nтуман"]
    ]]
  ],
  226: [
    ["Прилагательное после ein в Akkusativ", true, [
      ["","Именительный","Винительный"],
      ["мужской род","ein alter Mann\nпожилой мужчина","einen alten Mann\nпожилого мужчину"],
      ["средний род","ein kleines Kind\nмаленький ребёнок","ein kleines Kind\nмаленького ребёнка"],
      ["женский род","eine schöne Frau\nкрасивая женщина","eine schöne Frau\nкрасивую женщину"]
    ]],
    ["Прилагательное после der в Akkusativ", true, [
      ["","Именительный","Винительный"],
      ["мужской род","der alte Mann\nпожилой мужчина","den alten Mann\nпожилого мужчину"],
      ["средний род","das kleine Kind\nмаленький ребёнок","das kleine Kind\nмаленького ребёнка"],
      ["женский род","die schöne Frau\nкрасивая женщина","die schöne Frau\nкрасивую женщину"],
      [["множественное\nчисло",1,3],"die alten Männer\nпожилые мужчины","die alten Männer\nпожилых мужчин"],
      ["die kleinen Kinder\nмаленькие дети","die kleinen Kinder\nмаленьких детей"],
      ["die schönen Frauen\nкрасивые женщины","die schönen Frauen\nкрасивых женщин"]
    ]],
    ["Пары прилагательных", false, [
      ["gross — большой","klein — маленький"],
      ["alt — старый","neu — новый"],
      ["jung — молодой","breit — широкий"],
      ["hoch — высокий","niedrig — низкий"],
      ["hell — светлый","dunkel (dunkler) — тёмный"]
    ]]
  ],
  228: [
    ["Прилагательное после ein в Dativ", true, [
      ["","Именительный","Дательный"],
      ["мужской род","ein alter Mann\nпожилой мужчина","einem alten Mann\nпожилому мужчине"],
      ["средний род","ein kleines Kind\nмаленький ребёнок","einem kleinen Kind\nмаленькому ребёнку"],
      ["женский род","eine schöne Frau\nкрасивая женщина","einer schönen Frau\nкрасивой женщине"]
    ]],
    ["Прилагательное после der в Dativ", true, [
      ["","Именительный","Дательный"],
      ["мужской род","der alte Mann\nпожилой мужчина","dem alten Mann\nпожилому мужчине"],
      ["средний род","das kleine Kind\nмаленький ребёнок","dem kleinen Kind\nмаленькому ребёнку"],
      ["женский род","die schöne Frau\nкрасивая женщина","der schönen Frau\nкрасивой женщине"],
      [["множественное\nчисло",1,3],"die alten Männer\nпожилые мужчины","den alten Männern\nпожилым мужчинам"],
      ["die kleinen Kinder\nмаленькие дети","den kleinen Kindern\nмаленьким детям"],
      ["die schönen Frauen\nкрасивые женщины","den schönen Frauen\nкрасивым женщинам"]
    ]],
    ["Ещё пары прилагательных", false, [
      ["gut — хороший","schlecht — плохой"],
      ["warm — тёплый","kalt — холодный"],
      ["heiss — горячий","schön — красивый"],
      ["süss — сладкий","bitter — горький"],
      ["schnell — быстрый","langsam — медленный"]
    ]]
  ],
  230: [
    ["Еда", false, [
      ["das Menü\nменю","das Gericht\nблюдо"],
      ["das Fleisch\nмясо","der Fisch\nрыба"],
      ["das Gemüse\nовощи","das Obst\nфрукты"],
      ["der Tee\nчай","der Kaff ee\nкофе"],
      ["das Wasser\nвода","die Milch\nмолоко"],
      ["der Zucker\nсахар","das Salz\nсоль"],
      ["der Nachtisch\nдесерт","die Rechnung\nсчёт"]
    ]]
  ],
  242: [
    ["Частые наречия", false, [
      ["gut\nхорошо","schlecht\nплохо"],
      ["viel\nмного","wenig\nмало"],
      ["schnell\nбыстро","langsam\nмедленно"],
      ["leicht\nлегко","schwer\nтрудно"],
      ["nahe\nблизко","fern\nдалеко"],
      ["niedrig\nнизко","hoch\nвысоко"]
    ]]
  ],
  244: [
    ["Особые формы сравнения наречий", false, [
      ["gut\nхорошо","besser\nлучше","am besten\nлучше всего"],
      ["viel\nмного","mehr\nбольше","am meisten\nбольше всего"],
      ["gern\nохотно","lieber\nохотнее","am liebsten\nохотнее всего"],
      ["bald\nскоро","eher\nскорее","am ehesten\nскорее всего"]
    ]],
    ["Меньше и меньше всего", false, [
      [["wenig\nмало",1,2],"minder\nменьше","am mindesten\nменьше всего"],
      ["weniger\nменьше","am wenigsten\nменьше всего"]
    ]]
  ],
  246: [
    ["Время и частота", false, [
      ["selten\nредко","oft\nчасто"],
      ["einmal\nоднажды","manchmal\nиногда"],
      ["gewöhnlich\nобычно","regelmässig\nрегулярно"],
      ["anfangs\nсначала","endlich\nв конце концов"],
      ["lange\nдолго","vor kurzem\nнедавно"],
      ["wieder\nснова","gerade\nкак раз"],
      ["bisher\nдо сих пор","jederzeit\nкаждый раз"]
    ]]
  ],
  248: [
    ["Мера и степень", false, [
      ["sehr\nочень","zu\nслишком"],
      ["noch\nещё","schon\nуже"],
      ["nur\nтолько","fast\nпочти"],
      ["genug\nдостаточно","ziemlich\nдовольно"],
      ["einigermassen\nболее или менее","teilweise\nчастично"],
      ["doch\nвсё-таки","eher\nскорее"],
      ["so\nтак, так же","auch\nтоже, также"]
    ]]
  ],
  250: [
    ["Город", false, [
      ["die Stadt\nгород","die Bahn\nдорога"],
      ["die Strasse\nулица","der Prospekt\nпроспект"],
      ["der Wolkenkratzer\nнебоскрёб","das Privathaus\nчастный дом"],
      ["die Brücke\nмост","der Park\nпарк"],
      ["die Treppe\nлестница","der Stock\nэтаж"],
      ["die U-Bahn\nметро","die Strassenbahn\nтрамвай"],
      ["der Autobus\nавтобус","das Auto\nавтомобиль"]
    ]]
  ],
  262: [
    ["Место и направление", true, [
      ["Wo? Где?","Wohin? Куда?","Woher? Откуда?"],
      ["dort\nтам","dorthin\nтуда","dorther\nоттуда"],
      ["hier\nздесь","hierher\nсюда","von hier\nотсюда"],
      ["vorne\nвпереди","vorwärts\nвперёд","von vorne\nспереди"],
      ["hinten\nпозади","zurück\nназад","von hinten\nсзади"],
      ["innen\nвнутри","nach innen\nвнутрь","von innen\nизнутри"],
      ["draussen\nснаружи","nach aussen\nнаружу","von aussen\nизвне"],
      ["oben\nвверху","nach oben\nвверх","von oben\nсверху"],
      ["unten\nвнизу","nach unten\nвниз","von unten\nснизу"]
    ]]
  ],
  264: [
    ["Вопрос со словом wo-", false, [
      [["was?\nчто?",1,8],["+",1,8],"mit",["=",1,8],"womit?"],
      ["с","с чем? чем? на чём?"],
      ["zu","wozu?"],
      ["к","к чему? зачем?"],
      ["für","wofür?"],
      ["для","для чего?"],
      ["durch","wodurch?"],
      ["через","через что?"]
    ]],
    ["Вопрос со словом wor-", false, [
      [["was?\nчто?",1,6],["+",1,6],"an",["=",1,6],"woran?"],
      ["на","на чём?"],
      ["auf","worauf?"],
      ["на","на чём?"],
      ["über","worüber?"],
      ["о","о чём?"]
    ]]
  ],
  266: [
    ["Ответ со словом da-", false, [
      [["das\nэто",1,8],["+",1,8],"mit",["=",1,8],"damit"],
      ["с","с этим, этим"],
      ["zu","dazu"],
      ["к","к этому"],
      ["für","dafür"],
      ["для","для этого"],
      ["durch","dadurch"],
      ["через","через это"]
    ]],
    ["Ответ со словом dar-", false, [
      [["das\nэто",1,6],["+",1,6],"an",["=",1,6],"daran"],
      ["на","на чём?"],
      ["auf","darauf"],
      ["на","на чём?"],
      ["über","darüber"],
      ["о","о чём?"]
    ]]
  ],
  268: [
    ["Квартира", false, [
      ["das Haus\nдом","die Wohnung\nквартира"],
      ["das Zimmer\nкомната","der Korridor\nкоридор"],
      ["das Schlafzimmer\nспальня","die Küche\nкухня"],
      ["die Tür\nдверь","das Fenster\nокно"],
      ["das Badezimmer\nванная комната","der Balkon\nбалкон"],
      ["das Möbel\nмебель","das Bett\nкровать"],
      ["der Tisch\nстол","der Stuhl\nстул"]
    ]]
  ],
  280: [
    ["Кто-то, ничто, везде", false, [
      ["alles\nвсё","etwas\nчто-то","nichts\nничего"],
      ["alle\nвсе","jemand\nкто-то","niemand\nникто"],
      [["überall\nвезде",1,2],"irgendwo\nгде-то","nirgends\nнигде"],
      ["irgendwohin\nкуда-нибудь","nirgendwo\nникуда"],
      ["immer\nвсегда","irgendwann\nкогда-нибудь","nie, niemals\nникогда"]
    ]]
  ],
  282: [
    ["Формы kein", true, [
      ["","Именительный","Винительный","Дательный"],
      ["мужской род","kein Mann","keinen Mann","keinem Mann"],
      ["средний род","kein Kind","kein Kind","keinem Kind"],
      ["женский род","keine Frau","keine Frau","keiner Frau"],
      [["множественное\nчисло",1,3],"keine Männer","keine Männer","keinen Männern"],
      ["keine Kinder","keine Kinder","keinen Kindern"],
      ["keine Frauen","keine Frauen","keinen Frauen"]
    ]]
  ],
  284: [
    ["Как обратиться к одному человеку", false, [
      ["du machst","Mach!"],
      ["ты делаешь","Делай!"],
      ["du nimmst","Nimm!"],
      ["ты берёшь","Бери!"],
      ["du arbeitest","Arbeite!"],
      ["ты работаешь","Работай!"]
    ]]
  ],
  286: [
    ["Природа", false, [
      ["der Ozean\nокеан","das Meer\nморе"],
      ["der Fluss\nрека","der See\nозеро"],
      ["das Ufer\nберег (реки)","der Strand\nпляж"],
      ["der Berg\nгора","der Hügel\nхолм"],
      ["der Baum\nдерево","der Wald\nлес"],
      ["das Gras\nтрава","die Blume\nцветок"],
      ["das Tier\nзверь","der Vogel\nптица"]
    ]]
  ],
  298: [
    ["Сочетания с haben", false, [
      ["Durst haben","хотеть пить"],
      ["Hunger haben","хотеть есть"],
      ["Recht haben","быть правым"],
      ["Angst haben","бояться"],
      ["keine Ahnung haben","не иметь никакого\nпредставления"],
      ["Probleme haben","иметь проблемы"],
      ["keine Probleme haben","не иметь проблем"],
      ["Zeit haben","иметь время"],
      ["keine Zeit haben","не иметь времени"]
    ]]
  ],
  300: [
    ["Сочетания с sein", false, [
      ["dabei sein","присутствовать"],
      ["pünktlich sein","быть вовремя"],
      ["arbeitslos sein","быть безработным"],
      ["beschäftigt sein","быть занятым"],
      ["einverstanden sein","согласиться"],
      ["erstaunt sein","удивиться"]
    ]]
  ],
  302: [
    ["Другие сочетания с sein", false, [
      ["zufrieden sein","быть довольным"],
      ["böse sein","сердиться"],
      ["krank sein","заболеть"],
      ["gesund sein","выздороветь, быть здоровым"],
      ["müde sein","устать"],
      ["vorsichtig sein","быть осторожным"],
      ["(in + вин. п.) verliebt sein","влюбиться (в кого-л./что-л.)"],
      ["glücklich sein","быть счастливым"]
    ]]
  ],
  304: [
    ["Внешность", false, [
      ["das Gesicht\nлицо","der Kopf\nголова"],
      ["die Augen\nглаза","die Ohren\nуши"],
      ["der Mund\nрот","die Nase\nнос"],
      ["der Arm\nрука от плеча до кисти","das Bein\nвся нога"],
      ["die Hand\nкисть","der Fuss\nступня"],
      ["die Haut\nкожа","die Haare\nволосы"],
      ["der Wuchs\nрост","das Gewicht\nвес"]
    ]]
  ]
};

const polyglotReferenceUkrainian = {
  "абстрактный": "абстрактний",
  "с": "з",
  "к": "до",
  "о": "про",
  "Вы": "Ви",
  "Вас": "Вас",
  "ей": "їй",
  "неё": "неї",
  "ней": "нею",
  "это": "це",
  "их": "їх",
  "май": "травень",
  "мало": "мало",
  "жара": "спека",
  "Куда?": "Куди?",
  "(эта)": "(ця)",
  "(эти)": "(ці)",
  "родов": "родів",
  "ЧИСЛО": "ЧИСЛО",
  "Еда": "Їжа",
  "Фразы для общения": "Фрази для спілкування",
  "Личные местоимения": "Особові займенники",
  "(при обращении": "(у звертанні",
  "на «ты»)": "на «ти»)",
  "на «Вы»)": "на «Ви»)",
  "Список слабых глаголов": "Список слабких дієслів",
  "Неопределённая форма глагола": "Неозначена форма дієслова",
  "Неопределённая форма": "Неозначена форма",
  "глагола": "дієслова",
  "3-е л., ед. ч. настоящего времени": "3-тя особа однини теперішнього часу",
  "Форма прошедшего времени": "Форма минулого часу",
  "Сильные глаголы с haben": "Сильні дієслова з haben",
  "Глаголы с sein": "Дієслова із sein",
  "Профессии": "Професії",
  "Кто? Кого? Кому?": "Хто? Кого? Кому?",
  "Вопросы к действующему": "Запитання до того, хто діє,",
  "лицу или объекту": "або до об’єкта",
  "Вопросы": "Запитання",
  "о месте": "про місце",
  "Другие вопросы": "Інші запитання",
  "Вопросительные слова": "Питальні слова",
  "вопросительное": "питальне",
  "слово (если есть)": "слово (якщо є)",
  "изменяемая": "змінювана",
  "форма глагола": "форма дієслова",
  "подлежащее": "підмет",
  "другие члены": "інші члени",
  "предложения": "речення",
  "Как построить вопрос": "Як побудувати запитання",
  "Слова о времени": "Слова про час",
  "Местоимения после предлогов": "Займенники після прийменників",
  "Три частых союза": "Три поширені сполучники",
  "Числа от 0 до 19": "Числа від 0 до 19",
  "Десятки, сотни и тысячи": "Десятки, сотні й тисячі",
  "Порядковые числа": "Порядкові числівники",
  "Дни недели": "Дні тижня",
  "Месяцы": "Місяці",
  "Времена года": "Пори року",
  "Части суток": "Частини доби",
  "Страны и части света": "Країни й частини світу",
  "Через неделю, месяц, год": "Через тиждень, місяць, рік",
  "Куда? Где? Откуда?": "Куди? Де? Звідки?",
  "Здесь, туда, оттуда": "Тут, туди, звідти",
  "Артикли по родам": "Артиклі за родами",
  "Множественное число по группам": "Множина за групами",
  "Изменение по падежам": "Зміна за відмінками",
  "Нерегулярное склонение": "Відмінювання за особливим зразком",
  "Прошедшее время без ge-": "Минулий час без ge-",
  "Формы sich setzen": "Форми sich setzen",
  "Значения модальных глаголов": "Значення модальних дієслів",
  "Модальные глаголы в настоящем": "Модальні дієслова в теперішньому часі",
  "Модальные глаголы в простом прошлом": "Модальні дієслова в простому минулому",
  "Чей? Притяжательные слова": "Чий? Присвійні слова",
  "Семья": "Родина",
  "Примеры с отделяемыми приставками": "Приклади з відокремлюваними префіксами",
  "Словарная форма, настоящее и прошлое": "Словникова форма, теперішній і минулий час",
  "Приставки и движение": "Префікси й рух",
  "Слияния с dem": "Злиття з dem",
  "Слияние с der": "Злиття з der",
  "Слияния с das": "Злиття з das",
  "Путешествия": "Подорожі",
  "Порядок слов в прошедшем времени": "Порядок слів у минулому часі",
  "Неопределённый артикль в Akkusativ": "Неозначений артикль в Akkusativ",
  "Определённый артикль в Akkusativ": "Означений артикль в Akkusativ",
  "Предлоги и местоимения в Akkusativ": "Прийменники й займенники в Akkusativ",
  "Неопределённый артикль в Dativ": "Неозначений артикль у Dativ",
  "Определённый артикль в Dativ": "Означений артикль у Dativ",
  "Предлоги и местоимения в Dativ": "Прийменники й займенники в Dativ",
  "Работа и учёба": "Робота й навчання",
  "Увлечения": "Захоплення",
  "Слова с противоположным значением": "Слова з протилежними значеннями",
  "Особые формы сравнения": "Особливі форми порівняння",
  "Фразы о погоде": "Фрази про погоду",
  "Природные явления": "Природні явища",
  "Прилагательное после ein в Akkusativ": "Прикметник після ein в Akkusativ",
  "Прилагательное после der в Akkusativ": "Прикметник після der в Akkusativ",
  "Прилагательное после ein в Dativ": "Прикметник після ein у Dativ",
  "Прилагательное после der в Dativ": "Прикметник після der у Dativ",
  "Пары прилагательных": "Пари прикметників",
  "Ещё пары прилагательных": "Ще пари прикметників",
  "Частые наречия": "Поширені прислівники",
  "Особые формы сравнения наречий": "Особливі форми порівняння прислівників",
  "Меньше и меньше всего": "Менше й найменше",
  "Время и частота": "Час і частота",
  "Мера и степень": "Міра й ступінь",
  "Место и направление": "Місце й напрямок",
  "Вопрос со словом wo-": "Запитання з wo-",
  "Вопрос со словом wor-": "Запитання з wor-",
  "Ответ со словом da-": "Відповідь із da-",
  "Ответ со словом dar-": "Відповідь із dar-",
  "Кто-то, ничто, везде": "Хтось, ніщо, всюди",
  "Формы kein": "Форми kein",
  "Как обратиться к одному человеку": "Як звернутися до однієї людини",
  "Сочетания с haben": "Сполучення з haben",
  "Сочетания с sein": "Сполучення із sein",
  "Другие сочетания с sein": "Інші сполучення із sein",
  "Внешность": "Зовнішність",
  "Именительный": "Називний",
  "Винительный": "Знахідний",
  "Дательный": "Давальний",
  "Мужской род": "Чоловічий рід",
  "Женский род": "Жіночий рід",
  "Средний род": "Середній рід",
  "мужской род": "чоловічий рід",
  "женский род": "жіночий рід",
  "средний род": "середній рід",
  "Множественное число": "Множина",
  "множественное число": "множина",
  "Мужской и средний род": "Чоловічий і середній рід",
  "Женский род и множественное число": "Жіночий рід і множина",
  "ПРЕДЛОГ": "ПРИЙМЕННИК",
  "ЕДИНСТВЕННОЕ": "ОДНИНА",
  "МНОЖЕСТВЕННОЕ": "МНОЖИНА",
  "происхождение": "походження",
  "хороший": "добрий",
  "пожилой мужчина": "літній чоловік",
  "пожилого мужчину": "літнього чоловіка",
  "пожилому мужчине": "літньому чоловікові",
  "маленький ребёнок": "маленька дитина",
  "маленького ребёнка": "маленьку дитину",
  "маленькому ребёнку": "маленькій дитині",
  "красивая женщина": "гарна жінка",
  "красивую женщину": "гарну жінку",
  "красивой женщине": "гарній жінці",
  "Таблицы к уроку": "Таблиці до уроку",
  "Таблицы глаголов": "Таблиці дієслів",
  "Вопрос": "Запитання",
  "Утверждение": "Твердження",
  "Отрицание": "Заперечення",
  "Настоящее и ближайшее будущее": "Теперішнє й найближче майбутнє",
  "Прошедшее · Perfekt": "Минуле · Perfekt",
  "Прошедшее · вариант с haben": "Минуле · варіант із haben",
  "Простое прошлое": "Простий минулий час",
  "Общая схема на примере machen": "Загальна схема на прикладі machen",
  "отвечать": "відповідати",
  "класть, положить": "класти, покласти",
  "учить, преподавать": "навчати, викладати",
  "открывать": "відкривати",
  "спрашивать": "запитувати",
  "чувствовать": "відчувати",
  "есть": "їсти",
  "находить": "знаходити",
  "разговаривать": "розмовляти",
  "приходить": "приходити",
  "управляющий": "керівник",
  "рабочий": "робітник",
  "позавчера": "позавчора",
  "Определённые артикли": "Означені артиклі",
  "в именительном падеже": "в називному відмінку",
  "Неопределённые артикли в именительном": "Неозначені артиклі в називному",
  "падеже": "відмінку",
  "для всех родов": "для всіх родів",
  "подруги": "подруги",
  "Неопределённая": "Неозначена",
  "начинать(ся)": "починати(ся)",
  "нравиться": "подобатися",
  "учиться (в вузе)": "навчатися у виші",
  "забывать": "забувати",
  "пытаться": "намагатися",
  "продукты": "продукти",
  "быть вынужденным": "бути змушеним",
  "любить, нравиться": "любити, подобатися",
  "Глагол / местоимение": "Дієслово / займенник",
  "семья": "родина",
  "родители": "батьки",
  "выключать": "вимикати",
  "выглядеть": "мати вигляд",
  "приглашать": "запрошувати",
  "закрывать": "зачиняти",
  "документ, удостоверяющий личность": "документ, що посвідчує особу",
  "стойка регистратора": "стійка реєстрації",
  "в винительном": "у знахідному",
  "главный глагол": "основне дієслово",
  "форме": "формі",
  "(куда?)": "(куди?)",
  "живопись": "живопис",
  "домашние питомцы": "домашні улюбленці",
  "коллекционировать": "колекціонувати",
  "скучный": "нудний",
  "бодрый": "бадьорий",
  "лучший": "кращий",
  "самый хороший (лучший)": "найкращий",
  "красный": "червоний",
  "зелёный": "зелений",
  "розовый": "рожевий",
  "жарко": "спекотно",
  "туманно": "туманно",
  "радуга": "веселка",
  "пожилые мужчины": "літні чоловіки",
  "пожилых мужчин": "літніх чоловіків",
  "маленьких детей": "малих дітей",
  "красивых женщин": "гарних жінок",
  "пожилым мужчинам": "літнім чоловікам",
  "маленьким детям": "малим дітям",
  "красивым женщинам": "гарним жінкам",
  "низко": "низько",
  "лучше всего": "найкраще",
  "больше всего": "найбільше",
  "охотнее всего": "найохочіше",
  "скорее всего": "найімовірніше",
  "в конце концов": "зрештою",
  "как раз": "саме",
  "более или менее": "більш-менш",
  "проспект": "проспект",
  "небоскрёб": "хмарочос",
  "извне": "ззовні",
  "снизу": "знизу",
  "с чем? чем? на чём?": "з чим? чим? на чому?",
  "к чему? зачем?": "до чого? навіщо?",
  "через что?": "через що?",
  "куда-нибудь": "кудись",
  "берег (реки)": "берег (річки)",
  "хотеть есть": "хотіти їсти",
  "представления": "уявлення",
  "присутствовать": "бути присутнім",
  "быть вовремя": "бути вчасно",
  "согласиться": "погодитися",
  "удивиться": "здивуватися",
  "сердиться": "сердитися",
  "заболеть": "захворіти",
  "выздороветь, быть здоровым": "одужати, бути здоровим",
  "устать": "втомитися",
  "быть осторожным": "бути обережним",
  "влюбиться (в кого-л./что-л.)": "закохатися (в когось або в щось)",
  "рука от плеча до кисти": "рука від плеча до кисті",
  "вся нога": "уся нога",
  "кисть": "кисть",
  "ступня": "стопа",
  "рост": "зріст",
  "я": "я",
  "ты": "ти",
  "он": "він",
  "она": "вона",
  "оно,": "воно,",
  "мы": "ми",
  "вы": "ви",
  "они": "вони",
  "работать": "працювати",
  "нуждаться": "потребувати",
  "учиться": "вчитися",
  "благодарить": "дякувати",
  "путешествовать": "подорожувати",
  "говорить": "говорити",
  "верить, полагать": "вірити, думати",
  "дарить": "дарувати",
  "надеяться": "сподіватися",
  "играть": "грати",
  "слышать": "чути",
  "ставить": "ставити",
  "покупать": "купувати",
  "искать": "шукати",
  "готовить еду": "готувати їжу",
  "танцевать": "танцювати",
  "стоить": "коштувати",
  "мечтать": "мріяти",
  "целовать": "цілувати",
  "ждать": "чекати",
  "смеяться": "сміятись",
  "жить, проживать": "жити, проживати",
  "улыбаться": "усміхатися",
  "желать": "бажати",
  "жить": "жити",
  "показывать": "показувати",
  "Привет!": "Привіт!",
  "Доброе утро!": "Доброго ранку!",
  "Добрый день!": "Добрий день!",
  "Добрый вечер!": "Добрий вечір!",
  "Как дела?": "Як справи?",
  "хорошо": "добре",
  "Как тебя зовут?": "Як тебе звати?",
  "Меня зовут.": "Мене звуть.",
  "Как Вас зовут?": "Як Вас звати?",
  "Очень приятно!": "Дуже приємно!",
  "Спасибо!": "Дякую!",
  "Извините!": "Вибачте!",
  "Пока!": "Бувай!",
  "До свидания!": "До побачення!",
  "приносить": "приносити",
  "думать": "думати",
  "давать": "давати",
  "висеть": "висіти",
  "помогать": "допомагати",
  "читать": "читати",
  "лежать": "лежати",
  "брать, взять": "брати, взяти",
  "спать": "спати",
  "писать": "писати",
  "видеть,": "бачити,",
  "смотреть": "дивитися",
  "петь": "співати",
  "сидеть": "сидіти",
  "стоять": "стояти",
  "носить": "носити",
  "пить": "пити",
  "оставаться": "Залишатися",
  "ехать": "їхати",
  "падать": "падати",
  "летать": "літати",
  "течь": "текти",
  "идти": "іти",
  "бегать": "бігати",
  "подниматься": "підніматися",
  "умирать": "помирати",
  "расти": "рости",
  "становиться": "ставати",
  "учитель": "Вчитель",
  "писатель": "письменник",
  "врач": "Лікар",
  "дизайнер": "дизайнер",
  "музыкант": "музикант",
  "предприниматель": "підприємець",
  "водитель": "водій",
  "юрист": "юрист",
  "редактор": "редактор",
  "экономист": "економіст",
  "журналист": "журналіст",
  "инженер": "інженер",
  "Кто?": "Хто?",
  "Кого?": "Кого?",
  "Кому?": "Кому?",
  "ich — я": "ich — я",
  "mich — меня": "mich — мене",
  "mir — мне": "mir — мені",
  "du — ты": "du — ти",
  "dich — тебя": "dich — тебе",
  "dir — тебе": "dir — тобі",
  "er — он": "er — він",
  "ihn — его": "ihn — його",
  "ihm — ему, этому": "ihm — йому, цьому",
  "es — оно, это": "es — воно, це",
  "es — его, это": "es — його, це",
  "sie — она": "sie — вона",
  "sie — её": "sie — її",
  "ihr — ей": "ihr — їй",
  "wir — мы": "wir — ми",
  "uns — нас": "uns — нас",
  "uns — нам": "uns — нам",
  "ihr — вы": "ihr — ви",
  "euch — вас": "euch — вас",
  "euch — вам": "euch — вам",
  "sie — они": "sie — вони",
  "sie — их": "sie — їх",
  "ihnen — им": "ihnen — їм",
  "Sie — Вы": "Sie — Ви",
  "Sie — Вас": "Sie — Вас",
  "Ihnen — Вам": "Ihnen — Вам",
  "Как?": "Як?",
  "Что?": "Що?",
  "Где?": "Де?",
  "Когда?": "Коли?",
  "Сколько?": "Скільки?",
  "Откуда?": "Звідки?",
  "Почему?": "Чому?",
  "Чей?": "Чий?",
  "Какой?": "Який?",
  "вчера": "вчора",
  "сегодня": "сьогодні",
  "завтра": "завтра",
  "послезавтра": "післязавтра",
  "раньше": "раніше",
  "сейчас": "зараз",
  "потом": "потім",
  "всегда": "завжди",
  "никогда": "ніколи",
  "иногда": "іноді",
  "скоро": "скоро",
  "без": "без",
  "mir — мной, мне": "mir — мені",
  "dir — тобой, тебе": "dir — тебе, тебе",
  "ihn — него": "ihn — його",
  "ihm — ним": "ihm — ним",
  "для": "для",
  "es — него, этого": "es — нього, цього",
  "ihm — ним, этим": "ihm — ним, цим",
  "sie — неё": "sie — неї",
  "ihr — ней": "ihr — нею",
  "uns — нами, нам": "uns — нам, нам",
  "о, про": "о, про",
  "euch — вами, вам": "euch — вас, вам",
  "sie — них": "sie — їх",
  "ihnen — ними, ним": "ihnen — ним, ним",
  "Ihnen — Вами, Вам": "Ihnen — Вами, Вам",
  "и": "і",
  "но": "але",
  "или": "або",
  "Montag — понедельник": "Montag — Понеділок",
  "am Montag — в понедельник": "am Montag — в понеділок",
  "Dienstag — вторник": "Dienstag — вівторок",
  "am Dienstag — во вторник": "am Dienstag — у вівторок",
  "Mittwoch — среда": "Mittwoch — середа",
  "am Mittwoch — в среду": "am Mittwoch — в середу",
  "Donnerstag — четверг": "Donnerstag — четвер",
  "am Donnerstag — в четверг": "am Donnerstag — у четвер",
  "Freitag — пятница": "Freitag — п’ятниця",
  "am Freitag — в пятницу": "am Freitag — у п’ятницю",
  "Sonnabend — суббота": "Sonnabend — субота",
  "am Sonnabend — в субботу": "am Sonnabend — в суботу",
  "Sonntag — воскресенье": "Sonntag — неділя",
  "am Sonntag — в воскресенье": "am Sonntag — у неділю",
  "Wochenende — выходные": "Wochenende — вихідні",
  "am Wochenende — на выходных": "am Wochenende — на вихідних",
  "Januar — январь": "Januar — січень",
  "im Januar — в январе": "im Januar — у січні",
  "Februar — февраль": "Februar — лютий",
  "im Februar — в феврале": "im Februar — в лютому",
  "März — март": "März — березень",
  "im März — в марте": "im März — в березні",
  "April — апрель": "April — квітень",
  "im April — в апреле": "im April — у квітні",
  "Mai — май": "Mai — травень",
  "im Mai — в мае": "im Mai — у травні",
  "Juni — июнь": "Juni — червень",
  "im Juni — в июне": "im Juni — у червні",
  "Juli — июль": "Juli — липень",
  "im Juli — в июле": "im Juli — в липні",
  "August — август": "August — серпень",
  "im August — в августе": "im August — у серпні",
  "September — сентябрь": "September — вересень",
  "im September — в сентябре": "im September — у вересні",
  "Oktober — октябрь": "Oktober — жовтень",
  "im Oktober — в октябре": "im Oktober — в жовтні",
  "November — ноябрь": "November — листопад",
  "im November — в ноябре": "im November — у листопаді",
  "Dezember — декабрь": "Dezember — грудень",
  "im Dezember — в декабре": "im Dezember — у грудні",
  "Frühling — весна": "Frühling — весна",
  "im Frühling — весной": "im Frühling — навесні",
  "Sommer — лето": "Sommer — літо",
  "im Sommer — летом": "im Sommer — влітку",
  "Herbst — осень": "Herbst — осінь",
  "im Herbst — осенью": "im Herbst — восени восени",
  "Winter — зима": "Winter — зима",
  "im Winter — зимой": "im Winter — узимку",
  "через неделю": "через тиждень",
  "через месяц": "через місяць",
  "через год": "через рік",
  "утром": "вранці",
  "днём": "вдень",
  "вечером": "ввечері",
  "ночью": "вночі",
  "в": "в",
  "из": "з",
  "Europa — Европа": "Europa — Європа",
  "Belgien — Бельгия": "Belgien — Бельгія",
  "Dänemark — Дания": "Dänemark — Данія",
  "Afrika — Африка": "Afrika — Африка",
  "Spanien — Испания": "Spanien — Іспанія",
  "Polen — Польша": "Polen — Польща",
  "Asien — Азия": "Asien — Азія",
  "Griechenland — Греция": "Griechenland — Греція",
  "Frankreich — Франция": "Frankreich — Франція",
  "Amerika — Америка": "Amerika — Америка",
  "Finnland — Финляндия": "Finnland — Фінляндія",
  "Österreich — Австрия": "Österreich — Австрія",
  "hierher — сюда": "hierher — сюди",
  "hier — здесь": "hier — тут",
  "von hier — отсюда": "von hier — звідси",
  "dorthin — туда": "dorthin — туди",
  "dort — там": "dort — там",
  "von dort — оттуда": "von dort — звідти",
  "der от dieser (этот)": "der від dieser (цет)",
  "die от diese (эта)": "die від diese (ця)",
  "das от dieses (это)": "das від dieses (це)",
  "die от diese (эти)": "die від diese (ці)",
  "der Mann — мужчина": "der Mann — чоловік",
  "der Freund — друг": "der Freund — друг",
  "der Bruder — брат": "der Bruder — брат",
  "der Sohn — сын": "der Sohn — син",
  "der Gast — гость": "der Gast — гість",
  "die Männer — мужчины": "die Männer — чоловіки",
  "die Freunde — друзья": "die Freunde — друзі",
  "die Brüder — братья": "die Brüder — брати",
  "die Söhne — сыновья": "die Söhne — сини",
  "die Gäste — гости": "die Gäste — гості",
  "die Freundin — подруга": "die Freundin — подруга",
  "die Schwester — сестра": "die Schwester — сестра",
  "die Schwestern — сёстры": "die Schwestern — сестри",
  "die Frau — женщина": "die Frau — жінка",
  "die Frauen — женщины": "die Frauen — жінки",
  "die Tochter — дочь": "die Tochter — Дочка",
  "die Töchter — дочери": "die Töchter — доньки",
  "die Sprache — язык": "die Sprache — мова",
  "die Sprachen — языки": "die Sprachen — мови",
  "die Stadt — город": "die Stadt — місто",
  "die Städte — города": "die Städte — міста",
  "das Mädchen — девочка": "das Mädchen — дівчинка",
  "die Mädchen — девочки": "die Mädchen — девочки",
  "das Kind — ребёнок": "das Kind — дитина",
  "die Kinder — дети": "die Kinder — діти",
  "das Land — страна": "das Land — країна",
  "die Länder — страны": "die Länder — країни",
  "das Auto — машина": "das Auto — машина",
  "die Autos — машины": "die Autos — машини",
  "das Buch — книга": "das Buch — книга",
  "die Bücher — книги": "die Bücher — книги",
  "das Haus — дом": "das Haus — дім",
  "die Häuser — дома": "die Häuser — вдома",
  "Wer? Кто?": "Wer? Хто?",
  "Wen? Кого?": "Wen? Кого?",
  "Wem? Кому?": "Wem? Кому?",
  "den Mann — мужчину": "den Mann — чоловіка.",
  "dem Mann — мужчине": "dem Mann — чоловік",
  "das Kind — ребёнка": "das Kind — дитина / ісп./",
  "dem Kind — ребёнку": "dem Kind — дитина",
  "die Frau — женщину": "die Frau — жінка",
  "der Frau — женщине": "der Frau — жінка",
  "die Männer — мужчин": "die Männer — чоловіків",
  "den Männern — мужчинам": "den Männern — чоловіки",
  "die Kinder — детей": "die Kinder — діти",
  "den Kindern — детям": "den Kindern — діти",
  "die Frauen — женщин": "die Frauen — жінок",
  "den Frauen — женщинам": "den Frauen — жінки",
  "ein Mann — мужчина": "ein Mann — чоловік",
  "einen Mann — мужчину": "einen Mann — чоловіка.",
  "einem Mann — мужчине": "einem Mann — чоловік",
  "ein Kind — ребёнок": "ein Kind — дитина",
  "ein Kind — ребёнка": "ein Kind — дитина / ісп./",
  "einem Kind — ребёнку": "einem Kind — дитина",
  "eine Frau — женщина": "eine Frau — жінка",
  "eine Frau — женщину": "eine Frau — жінка",
  "einer Frau — женщине": "einer Frau — жінка",
  "получать": "одержувати",
  "посещать": "відвідувати",
  "объяснять": "пояснювати",
  "рассказывать": "розповідати",
  "поздравлять": "вітати",
  "брить": "голити",
  "резервировать": "резервувати",
  "зарабатывать": "заробляти",
  "продавать": "продавати",
  "терять": "втрачати",
  "обещать": "обіцяти",
  "понимать": "розуміти",
  "Покупки": "Покупки",
  "наличные": "готівка",
  "кредитная карта": "кредитна картка",
  "цена": "ціна",
  "скидка": "знижка",
  "продавец": "продавець",
  "покупатель": "покупець",
  "клиент": "клієнт",
  "распродажа": "розпродаж",
  "супермаркет": "супермаркет",
  "рынок": "ринок",
  "магазин": "магазин",
  "подарок": "подарунок",
  "сувенир": "сувенір",
  "мочь": "могти",
  "ich kann — я могу": "ich kann — я можу.",
  "иметь разрешение": "мати дозвіл",
  "ich darf — мне можно": "ich darf — мені можна",
  "ich muss — я должен": "ich muss — я повинен",
  "быть обязанным": "бути зобов’язаним",
  "ich soll — мне следует / надо": "ich soll — я мушу йти / треба",
  "хотеть": "хотіти",
  "ich will — я хочу": "ich will — я хочу.",
  "Ich mag — я люблю": "Ich mag — я люблю",
  "mein — мой, моё": "mein — мій, моє",
  "meine — моя, мои": "meine — моя, мої",
  "dein — твой, твоё": "dein — твій, твоє",
  "deine — твоя, твои": "deine — твоя, твої",
  "sein — его": "sein — його",
  "seine — его": "seine — його",
  "ihr — её": "ihr — її",
  "ihre — её": "ihre — її",
  "unser — наш, наше": "unser — наш, наше",
  "unsere — наша, наши": "unsere — наша, наші",
  "euer — ваш, ваше": "euer — ваш, ваше",
  "eure — ваша, ваши": "eure — ваша, ваші",
  "ihr — их": "ihr — їх",
  "ihre — их": "ihre — їх",
  "Ihr — Ваш, Ваше": "Ihr — Ваш, Ваше",
  "Ihre — Ваша, Ваши": "Ihre — Ваша, Ваші",
  "отец": "батько",
  "мать": "мати",
  "сын": "син",
  "дочь": "Дочка",
  "ребёнок": "дитина",
  "внук": "внук",
  "брат": "брат",
  "сестра": "сестра",
  "дедушка": "дідусь",
  "бабушка": "бабуся",
  "муж": "чоловік",
  "жена": "дружина",
  "уезжать": "виїжджати",
  "прибывать": "прибувати",
  "включать": "включати",
  "звонить": "дзвонити",
  "по телефону": "по телефону",
  "одевать": "одягати",
  "вставать": "вставати",
  "телевизор": "телевізор",
  "гулять": "гуляти",
  "переезжать": "переїжджати",
  "планировать": "планувати",
  "возвращаться": "повертатися",
  "он приглашает": "він запрошує",
  "он пригласил": "він запросив.",
  "он выглядит": "він виглядає",
  "он выглядел": "він виглядав",
  "он приходит": "він приходить",
  "он пришёл": "він прийшов.",
  "он прибывает": "він прибуває",
  "он прибыл": "він прибув",
  "он едет": "він їде.",
  "он ехал": "він їхав",
  "он уезжает": "він їде.",
  "он уехал": "він поїхав.",
  "an — на": "an — на",
  "in — в": "in — в",
  "von — от": "von — від",
  "zu — к": "zu — до",
  "auf — на": "auf — на",
  "für — для": "für — для",
  "путешествие": "подорож",
  "поездка": "подорож",
  "билет": "квиток",
  "вокзал": "вокзал",
  "поезд": "поїзд",
  "гостиница": "готель",
  "порт": "порт",
  "корабль": "корабель",
  "аэропорт": "аеропорт",
  "самолёт": "літак",
  "чемодан": "чемодан",
  "рюкзак": "рюкзак",
  "вспомогательный": "допоміжний",
  "глагол": "дієслово",
  "объект": "об’єкт",
  "в соответствующей": "у відповідному",
  "Множественное": "Множина",
  "число для всех": "число для всіх",
  "Frauen — женщин": "Frauen — жінок",
  "durch — через": "durch — через",
  "ohne — без": "ohne — без",
  "in — в (куда?)": "in — в (куда?)",
  "ins Zimmer — в комнату": "ins Zimmer — до кімнати",
  "auf den Boden — на пол": "auf den Boden — на підлогу",
  "an die Wand — на стену": "an die Wand — на стіну",
  "Одежда": "Одяг",
  "одежда": "одяг",
  "куртка, пиджак": "куртка, піджак",
  "рубашка": "сорочка",
  "пальто": "пальто",
  "юбка": "спідниця",
  "блузка": "блузка",
  "платье": "плаття",
  "костюм": "костюм",
  "брюки": "штани",
  "ремень": "ремінь",
  "туфли": "взуття",
  "сапоги": "чоботи",
  "шарф": "шарф",
  "носки": "шкарпетки",
  "aus — из": "aus — з",
  "mit — с": "mit — з",
  "nach — на, в, за": "nach — на, в, за",
  "in — в (где?)": "in — в (де?)",
  "im Zimmer — в комнате": "im Zimmer — у кімнаті",
  "auf dem Boden — на полу": "auf dem Boden — на підлозі",
  "an der Wand — на стене": "an der Wand — на стіні",
  "auf — на (где?)": "auf — на (де?)",
  "an — на (где?)": "an — на (де?)",
  "школа": "школа",
  "университет": "університет",
  "офис": "офіс",
  "компания": "компанія",
  "детский сад": "дитсадок",
  "больница": "лікарня",
  "кафе": "кафе",
  "ресторан": "ресторан",
  "торговый центр": "торговий центр",
  "полиция": "поліція",
  "студия": "студія",
  "предприятие": "підприємство",
  "организация": "організація",
  "спорт": "спорт",
  "танцы": "танці",
  "музыка": "музика",
  "кино": "кіно",
  "театр": "театр",
  "рыбалка": "рибалка",
  "охота": "полювання",
  "приготовление еды": "готування їжі",
  "альпинизм": "альпінізм",
  "играть на гитаре": "грати на гітарі",
  "ездить на велосипеде": "їздити на велосипеді",
  "простой": "простий",
  "трудный": "складний",
  "интересный": "цікавий",
  "счастливый": "щасливий",
  "грустный": "сумний",
  "усталый": "змучений",
  "новый": "новий",
  "старый": "старий",
  "Цвета": "Кольори",
  "чёрный": "чорний",
  "белый": "білий",
  "синий": "синій",
  "жёлтый": "жовтий",
  "серый": "сірий",
  "коричневый": "коричневий",
  "оранжевый": "оранжевий",
  "холодно": "холодно",
  "тепло": "тепло",
  "солнечно": "сонячно",
  "ветрено": "вітряно",
  "облачно": "хмарно",
  "природа": "природа",
  "погода": "погода",
  "небо": "небо",
  "земля": "земля",
  "холод": "холод",
  "солнце": "Сонце",
  "туча": "хмара",
  "дождь": "дощ",
  "снег": "сніг",
  "ветер": "вітер",
  "гроза": "гроза",
  "туман": "туман",
  "множественное": "множина",
  "число": "число",
  "маленькие дети": "малі діти",
  "красивые женщины": "гарні жінки",
  "gross — большой": "gross — великий",
  "klein — маленький": "klein — малий",
  "alt — старый": "alt — старий",
  "neu — новый": "neu — новий",
  "jung — молодой": "jung — молодий",
  "breit — широкий": "breit — широкий",
  "hoch — высокий": "hoch — високий",
  "niedrig — низкий": "niedrig — низький",
  "hell — светлый": "hell — світлий",
  "dunkel (dunkler) — тёмный": "dunkel (dunkler) — темний",
  "gut — хороший": "gut — добрий",
  "schlecht — плохой": "schlecht — поганий",
  "warm — тёплый": "warm — теплий",
  "kalt — холодный": "kalt — холодний",
  "heiss — горячий": "heiss — гарячий",
  "schön — красивый": "schön — красивий",
  "süss — сладкий": "süss — солодкий",
  "bitter — горький": "bitter — гіркий",
  "schnell — быстрый": "schnell — швидкий",
  "langsam — медленный": "langsam — повільна",
  "меню": "меню",
  "блюдо": "страва",
  "мясо": "м’ясо",
  "рыба": "риба",
  "овощи": "овочі",
  "фрукты": "фрукти",
  "чай": "чай",
  "кофе": "кава",
  "вода": "вода",
  "молоко": "молоко",
  "сахар": "Цукор",
  "соль": "сіль",
  "десерт": "десерт",
  "счёт": "рахунок",
  "плохо": "погано",
  "много": "багато",
  "быстро": "швидко",
  "медленно": "повільно",
  "легко": "легко",
  "трудно": "важко",
  "близко": "близько",
  "далеко": "далеко",
  "высоко": "високо",
  "лучше": "краще",
  "больше": "більше",
  "охотно": "охоче",
  "охотнее": "охочіше",
  "скорее": "швидше",
  "меньше": "менше",
  "меньше всего": "найменше",
  "редко": "рідко",
  "часто": "часто",
  "однажды": "одного разу",
  "обычно": "зазвичай",
  "регулярно": "регулярно",
  "сначала": "спочатку",
  "долго": "довго",
  "недавно": "недавно",
  "снова": "знову",
  "до сих пор": "досі",
  "каждый раз": "кожного разу",
  "очень": "дуже",
  "слишком": "занадто",
  "ещё": "ще",
  "уже": "вже",
  "только": "тільки",
  "почти": "майже",
  "достаточно": "достатньо",
  "довольно": "досить",
  "частично": "частково",
  "всё-таки": "все-таки",
  "так, так же": "так, так само",
  "тоже, также": "теж, також",
  "Город": "Місто",
  "город": "місто",
  "дорога": "дорога",
  "улица": "Вулиця",
  "частный дом": "приватний дім.",
  "мост": "міст",
  "парк": "парк",
  "лестница": "сходи",
  "этаж": "поверх",
  "метро": "метро",
  "трамвай": "трамвай",
  "автобус": "автобус",
  "автомобиль": "автомобіль",
  "Wo? Где?": "Wo? Де?",
  "Wohin? Куда?": "Wohin? Куди?",
  "Woher? Откуда?": "Woher? Звідки?",
  "там": "там",
  "туда": "туди",
  "оттуда": "звідти",
  "здесь": "тут",
  "сюда": "сюди",
  "отсюда": "звідси",
  "впереди": "попереду",
  "вперёд": "вперед",
  "спереди": "спереду",
  "позади": "позаду",
  "назад": "назад",
  "сзади": "ззаду",
  "внутри": "усередині",
  "внутрь": "всередину",
  "изнутри": "зсередини",
  "снаружи": "зовні",
  "наружу": "назовні",
  "вверху": "вгорі",
  "вверх": "вгору",
  "сверху": "зверху",
  "внизу": "внизу",
  "вниз": "вниз",
  "что?": "що?",
  "для чего?": "для чого?",
  "через": "через",
  "на": "на",
  "на чём?": "на чому?",
  "о чём?": "про що?",
  "с этим, этим": "з цим, цим",
  "к этому": "до цього",
  "для этого": "для цього",
  "через это": "через це",
  "Квартира": "Квартира",
  "дом": "дім",
  "квартира": "квартира",
  "комната": "кімната",
  "коридор": "коридор",
  "спальня": "спальня",
  "кухня": "кухня",
  "дверь": "двері",
  "окно": "вікно",
  "ванная комната": "ванна кімната",
  "балкон": "балкон",
  "мебель": "меблі",
  "кровать": "ліжко",
  "стол": "стіл",
  "стул": "стілець",
  "всё": "все",
  "что-то": "щось",
  "ничего": "нічого",
  "все": "всі",
  "кто-то": "хтось",
  "никто": "ніхто",
  "везде": "всюди",
  "где-то": "десь",
  "нигде": "ніде",
  "никуда": "нікуди",
  "когда-нибудь": "коли-небудь",
  "ты делаешь": "ти робиш",
  "Делай!": "Роби!",
  "ты берёшь": "ти береш",
  "Бери!": "Бери!",
  "ты работаешь": "ти працюєш",
  "Работай!": "Працюй!",
  "Природа": "Природа",
  "океан": "океан",
  "море": "море",
  "река": "річка",
  "озеро": "озеро",
  "пляж": "пляж",
  "гора": "гора",
  "холм": "пагорб",
  "дерево": "дерево",
  "лес": "ліс",
  "трава": "трава",
  "цветок": "квітка",
  "зверь": "звір",
  "птица": "птах",
  "хотеть пить": "хотіти пити",
  "быть правым": "бути правим",
  "бояться": "боятися",
  "не иметь никакого": "не мати ніякого",
  "иметь проблемы": "мати проблеми",
  "не иметь проблем": "не мати проблем",
  "иметь время": "мати час",
  "не иметь времени": "не мати часу",
  "быть безработным": "бути безробітним",
  "быть занятым": "бути зайнятим",
  "быть довольным": "бути задоволеним",
  "(in + вин. п.) verliebt sein": "(in + пл). verliebt sein",
  "быть счастливым": "бути щасливим",
  "лицо": "обличчя",
  "голова": "голова",
  "глаза": "очі",
  "уши": "вуха",
  "рот": "рот",
  "нос": "ніс",
  "кожа": "шкіра",
  "волосы": "волосся",
  "вес": "вага",
  "Схема на шесть фраз": "Схема на шість фраз",
  "В каждом времени можно сказать, спросить или отрицать. Сейчас: Ich mache das. Machst du das? Ich mache das nicht. Для ближайшего будущего часто хватает той же формы со словом morgen или bald.": "У кожному часі можна стверджувати, запитувати або заперечувати. Зараз: Ich mache das. Machst du das? Ich mache das nicht. Для найближчого майбутнього часто досить тієї самої форми зі словом morgen або bald.",
  "Как сказать о прошлом": "Як сказати про минуле",
  "В Ich habe das gemacht слово habe показывает, кто сделал. Слово gemacht показывает действие и стоит в конце. В вопросе первым идёт habe, а в отрицании nicht стоит перед gemacht: Hast du das gemacht? Ich habe das nicht gemacht.": "В Ich habe das gemacht слово habe показує, хто зробив. Слово gemacht називає дію й стоїть у кінці. У запитанні першим іде habe, а в запереченні nicht стоїть перед gemacht: Hast du das gemacht? Ich habe das nicht gemacht.",
  "Как меняется слабый глагол": "Як змінюється слабке дієслово",
  "У machen убери -en и добавь -e, -st, -t, -en, -t, -en. После основы на -d или -t часто нужна ещё одна e: du arbeitest, er antwortet. В Perfekt у обычных слабых глаголов получится ge-…-t, а у arbeiten — gearbeitet с -et. Haben может стоять и само по себе: Ich habe Zeit, Gestern hatte ich Zeit.": "У machen прибери -en і додай -e, -st, -t, -en, -t, -en. Після основи на -d або -t часто потрібне ще одне e: du arbeitest, er antwortet. У Perfekt для звичайних слабких дієслів виходить ge-…-t, а в arbeiten — gearbeitet з -et. Haben може стояти й саме: Ich habe Zeit, Gestern hatte ich Zeit.",
  "Сильный глагол": "Сильне дієслово",
  "С du и er/sie/es в корне иногда меняется гласная: lesen → du liest, schlafen → sie schläft. В Perfekt у многих сильных глаголов конец -en, а корень может снова измениться: nehmen → er nimmt → er hat genommen. Es gibt значит «есть»: Es gibt hier einen Parkplatz.": "З du та er/sie/es у корені іноді змінюється голосна: lesen → du liest, schlafen → sie schläft. У Perfekt багато сильних дієслів мають закінчення -en, а корінь може знову змінитися: nehmen → er nimmt → er hat genommen. Es gibt означає «є»: Es gibt hier einen Parkplatz.",
  "Haben или sein": "Haben чи sein",
  "Часто берём sein, если кто-то переместился или изменилось его состояние: Ich bin gekommen, der Schnee ist geschmolzen. Sein само может обозначать место или состояние: Ich bin hier, gestern war ich dort.": "Часто вживаємо sein, якщо хтось перемістився або змінився його стан: Ich bin gekommen, der Schnee ist geschmolzen. Саме слово sein може позначати місце або стан: Ich bin hier, gestern war ich dort.",
  "Как устроен вопрос": "Як побудувати запитання",
  "Если есть вопросительное слово, оно идёт первым. Затем ставь изменяемое слово про действие, а потом того, кто действует: Wo arbeitest du? Если Wer? уже спрашивает о том, кто действует, другого слова вроде du не нужно: Wer arbeitet?": "Якщо є питальне слово, воно йде першим. Потім постав змінюване слово про дію, а за ним — того, хто діє: Wo arbeitest du? Якщо Wer? вже запитує про того, хто діє, іншого слова на зразок du не потрібно: Wer arbeitet?",
  "Кого или кому": "Кого чи кому",
  "Für, ohne и über в значении «о» здесь идут с формой «кого?». Например, ohne mich, über ihn. Mit и zu берут форму «кому?»: mit mir, zu ihm. Разницу лучше запоминать целыми парами.": "Für, ohne й über у значенні «про» тут ідуть із формою «кого?». Наприклад, ohne mich, über ihn. Mit і zu потребують форми «кому?»: mit mir, zu ihm. Запам’ятовуй різницю цілими парами.",
  "Число и дата": "Число й дата",
  "13–19 обычно заканчиваются на -zehn, большинство десятков — на -zig. В 43 единицы идут первыми: dreiundvierzig. У дат запомни erste, dritte и siebte. Обычно до 19 добавляем -te, с 20 — -ste. Встречаемся am dritten Mai: после am появляется -n.": "13–19 зазвичай закінчуються на -zehn, більшість десятків — на -zig. У 43 одиниці йдуть першими: dreiundvierzig. Для дат запам’ятай erste, dritte і siebte. Зазвичай до 19 додаємо -te, від 20 — -ste. Зустрічаємося am dritten Mai: після am з’являється -n.",
  "Когда и куда": "Коли й куди",
  "Час — um drei Uhr, день или дата — am Montag, am dritten Mai, месяц и сезон — im Mai, im Winter. Через неделю — in einer Woche. Название города обычно без артикля: nach Basel, in Basel, aus Basel. Со Швейцарией: in die Schweiz, in der Schweiz, aus der Schweiz.": "Година — um drei Uhr, день або дата — am Montag, am dritten Mai, місяць і пора року — im Mai, im Winter. Через тиждень — in einer Woche. Назви міст зазвичай без артикля: nach Basel, in Basel, aus Basel. Зі Швейцарією: in die Schweiz, in der Schweiz, aus der Schweiz.",
  "Когда можно обойтись без артикля": "Коли можна обійтися без артикля",
  "Новый предмет: ein Geschenk. Уже знакомый: das Geschenk. Без артикля можно назвать вещи вообще во множественном числе: Ich kaufe Äpfel. Абстрактные слова тоже часто идут сами: Zeit ist Geld. В словаре m, f, n показывают род, pl — множественное число. Например, -ung, -schaft, -ei, -heit, -keit обычно подсказывают die.": "Новий предмет: ein Geschenk. Уже знайомий: das Geschenk. Без артикля можна назвати речі загалом у множині: Ich kaufe Äpfel. Абстрактні слова теж часто стоять самі: Zeit ist Geld. У словнику m, f, n показують рід, pl — множину. Наприклад, -ung, -schaft, -ei, -heit, -keit зазвичай підказують die.",
  "Прошедшее без ge- и второе действие": "Минулий час без ge- й друга дія",
  "У слов с неотделяемыми be-, ge-, er-, ver- и у глаголов на -ieren нет отдельного ge-: bekommen → hat bekommen, verstehen → hat verstanden, reservieren → hat reserviert. После versuchen и vergessen часто нужен оборот с zu: Ich versuche, Deutsch zu lesen. После kann, muss или will zu здесь не ставим.": "У слів з невідокремлюваними be-, ge-, er-, ver- і дієслів на -ieren немає окремого ge-: bekommen → hat bekommen, verstehen → hat verstanden, reservieren → hat reserviert. Після versuchen і vergessen часто потрібен зворот із zu: Ich versuche, Deutsch zu lesen. Після kann, muss або will тут zu не ставимо.",
  "Слово sich меняется": "Слово sich змінюється",
  "В словаре пишут sich erinnern, а про себя скажи Ich erinnere mich. Про собеседника: Du erinnerst dich. Иногда в русском перевода с «-ся» нет: sich erinnern — вспоминать. В Perfekt: Ich habe mich erinnert.": "У словнику пишуть sich erinnern, а про себе скажи Ich erinnere mich. Про співрозмовника: Du erinnerst dich. Іноді український переклад обходиться без «-ся»: sich erinnern — згадувати. У Perfekt: Ich habe mich erinnert.",
  "Второе действие и принадлежность": "Друга дія й належність",
  "В Ich kann kommen второе действие стоит в конце. Вчера: Ich konnte kommen. Для вежливой просьбы подходит Ich möchte Wasser. Когда говоришь «мой брат», форма mein меняется по роли брата в предложении: mein Bruder, meinen Bruder, meinem Bruder.": "В Ich kann kommen друга дія стоїть у кінці. Учора: Ich konnte kommen. Для ввічливого прохання підходить Ich möchte Wasser. Коли кажеш «мій брат», форма mein залежить від ролі брата в реченні: mein Bruder, meinen Bruder, meinem Bruder.",
  "Что меняет приставка": "Що змінює префікс",
  "К частым отделяемым приставкам относятся ab, an, auf, aus, ein, mit, vor, weg, zu, zurück и zusammen. Сейчас она часто уходит в конец: Er fährt ab. В Perfekt она стоит перед ge-: Er ist abgefahren. Окончание обычно берётся у основного глагола: laden → geladen, einladen → eingeladen.": "До частих відокремлюваних префіксів належать ab, an, auf, aus, ein, mit, vor, weg, zu, zurück і zusammen. У теперішньому часі він часто йде в кінець: Er fährt ab. У Perfekt він стоїть перед ge-: Er ist abgefahren. Закінчення зазвичай беремо від основного дієслова: laden → geladen, einladen → eingeladen.",
  "Глагол, предлог и падеж": "Дієслово, прийменник і відмінок",
  "Учи глагол вместе с предлогом. Akkusativ: erzählen über, hoffen auf, warten auf, bitten um, sich beunruhigen um, sich interessieren für. Dativ: träumen von, sich beschäftigen mit. Сравни um acht — в восемь и um Hilfe bitten — просить о помощи. Von и dem часто дают vom, in и das — ins.": "Вчи дієслово разом із прийменником. Akkusativ: erzählen über, hoffen auf, warten auf, bitten um, sich beunruhigen um, sich interessieren für. Dativ: träumen von, sich beschäftigen mit. Порівняй um acht — о восьмій та um Hilfe bitten — просити про допомогу. Von і dem часто дають vom, in і das — ins.",
  "Кого или что в прошедшем": "Кого або що в минулому",
  "Когда глагол берёт прямое дополнение в Akkusativ, Perfekt обычно строится с haben: Ich habe sie gesehen. Сравни «само стоит, лежит, висит» и «кто-то ставит, кладёт, вешает»: stehen/stellen, liegen/legen, hängen/hängen. В последней паре разные формы: gehangen и gehängt.": "Коли дієслово має прямий додаток в Akkusativ, Perfekt зазвичай утворюється з haben: Ich habe sie gesehen. Порівняй «саме стоїть, лежить, висить» і «хтось ставить, кладе, вішає»: stehen/stellen, liegen/legen, hängen/hängen. В останній парі форми різні: gehangen і gehängt.",
  "Артикли и предлоги": "Артиклі й прийменники",
  "В мужском роде der становится den, ein — einen, mein — meinen. После für, ohne, durch и gegen нужен Akkusativ. Ohne иногда идёт без артикля: ohne Jacke.": "У чоловічому роді der стає den, ein — einen, mein — meinen. Після für, ohne, durch і gegen потрібен Akkusativ. Ohne іноді стоїть без артикля: ohne Jacke.",
  "Кому и что": "Кому й що",
  "Gratulieren, danken, helfen и folgen берут Dativ. В Er schenkt dem Kind ein Buch получатель dem Kind отвечает на «кому?», а ein Buch — на «что?». При выборе формы помогают пары ihm — dem, ihr — der, ihnen — den. Von может показать принадлежность: ein Foto von meiner Grossmutter.": "Gratulieren, danken, helfen і folgen потребують Dativ. В Er schenkt dem Kind ein Buch отримувач dem Kind відповідає на «кому?», а ein Buch — на «що?». Обирати форму допомагають пари ihm — dem, ihr — der, ihnen — den. Von може показувати належність: ein Foto von meiner Grossmutter.",
  "Форма прошедшего": "Форма минулого",
  "У zeigen и schicken берём haben: Er hat es mir gezeigt. Если folgen значит «пойти следом», естественно sein: Wir sind der Gruppe gefolgt. В значении «послушаться» встречается haben: Er hat mir gefolgt.": "З zeigen і schicken беремо haben: Er hat es mir gezeigt. Якщо folgen означає «піти слідом», природно вживати sein: Wir sind der Gruppe gefolgt. У значенні «послухатися» трапляється haben: Er hat mir gefolgt.",
  "Что стоит в начале и в конце": "Що стоїть на початку й у кінці",
  "При прямом порядке сначала тот, кто действует, затем изменяемая форма: Ich arbeite hier. Когда фраза начинается со времени, места или целого условия, изменяемая форма всё равно во второй позиции: Gestern habe ich gearbeitet. Когда это общий вопрос, начинаем с неё: Hast du gearbeitet? Partizip II, отдельная приставка или второе действие часто стоят в конце.": "За прямого порядку спочатку називаємо того, хто діє, потім змінювану форму: Ich arbeite hier. Коли фраза починається з часу, місця або цілої умови, змінювана форма все одно на другій позиції: Gestern habe ich gearbeitet. Загальне запитання починаємо з неї: Hast du gearbeitet? Partizip II, відокремлений префікс або друга дія часто стоять у кінці.",
  "Действие как название": "Дія як назва",
  "Ich koche gern — люблю готовить. Если само занятие становится названием, добавь das и большую букву: Das Kochen macht mir Spass.": "Ich koche gern — люблю готувати. Якщо саме заняття стає назвою, додай das і велику літеру: Das Kochen macht mir Spass.",
  "Два варианта для движения": "Два варіанти для руху",
  "Для reisen используй sein: Ich bin nach Bern gereist. У schwimmen без направления возможны habe и bin: Ich habe viel geschwommen. При указании направления скажи Ich bin ans Ufer geschwommen.": "Для reisen вживай sein: Ich bin nach Bern gereist. Зі schwimmen без напрямку можливі habe і bin: Ich habe viel geschwommen. Якщо називаєш напрямок, скажи Ich bin ans Ufer geschwommen.",
  "Как сравнивать": "Як порівнювати",
  "Обычно прибавляем -er, иногда гласная меняется: alt → älter, gross → grösser. Длинные слова обычно сохраняют гласную: kompliziert → komplizierter. Высшая степень перед предметом склоняется: der heisseste Tag. Когда предмет уже называли, можно сказать Es ist am heissesten. Особую тройку gut → besser → am besten выучи целиком.": "Зазвичай додаємо -er, іноді голосна змінюється: alt → älter, gross → grösser. Довгі слова зазвичай зберігають голосну: kompliziert → komplizierter. Найвищий ступінь перед предметом відмінюється: der heisseste Tag. Якщо предмет уже називали, можна сказати Es ist am heissesten. Трійку gut → besser → am besten вивчи цілком.",
  "Как меняется описание": "Як змінюється опис",
  "В Akkusativ после ein и der мужской род меняется: ein alter Mann → einen alten Mann, der alte Mann → den alten Mann. В женском и среднем роде сравни формы в таблице. После определённого артикля во множественном числе здесь -en: die frischen Äpfel.": "В Akkusativ після ein і der чоловічий рід змінюється: ein alter Mann → einen alten Mann, der alte Mann → den alten Mann. У жіночому й середньому родах порівняй форми в таблиці. Після означеного артикля в множині тут -en: die frischen Äpfel.",
  "Кому или с чем": "Кому або з чим",
  "Когда перед прилагательным в Dativ стоит артикль, само прилагательное получает -en во всех родах и числах: mit einem alten Mann, mit einer heissen Suppe, mit den frischen Äpfeln. Без артикля окончание может быть другим: mit frischem Brot.": "Коли перед прикметником у Dativ стоїть артикль, сам прикметник отримує -en в усіх родах і числах: mit einem alten Mann, mit einer heissen Suppe, mit den frischen Äpfeln. Без артикля закінчення може бути іншим: mit frischem Brot.",
  "Наречие описывает действие": "Прислівник описує дію",
  "Оно отвечает на «как?», «где?» или «когда?» и здесь не получает окончания прилагательного. В готовых наречиях можно заметить части -lich, -ig, -mal, -seits: monatlich, niedrig, einmal, andererseits.": "Він відповідає на «як?», «де?» або «коли?» і тут не має закінчення прикметника. У готових прислівниках можна помітити частини -lich, -ig, -mal, -seits: monatlich, niedrig, einmal, andererseits.",
  "Больше, меньше, лучше всего": "Більше, менше, найкраще",
  "Обычно добавляем -er и am …-sten: stark → stärker → am stärksten. У некоторых слов формы особые: viel → mehr → am meisten, gern → lieber → am liebsten. Для wenig обычная тройка wenig → weniger → am wenigsten. Minder и am mindesten встречаются реже.": "Зазвичай додаємо -er і am …-sten: stark → stärker → am stärksten. У деяких слів форми особливі: viel → mehr → am meisten, gern → lieber → am liebsten. Для wenig звична трійка wenig → weniger → am wenigsten. Minder і am mindesten трапляються рідше.",
  "Как сделать вопрос и ответ": "Як побудувати запитання й відповідь",
  "Для предмета соединяй wo- с предлогом в вопросе и da- в ответе: womit → damit. Перед гласной добавляй r: worauf → darauf. Про человека пиши предлог и отдельное слово: Mit wem? → Mit ihr.": "Для предмета поєднуй wo- з прийменником у запитанні й da- у відповіді: womit → damit. Перед голосною додай r: worauf → darauf. Про людину пиши прийменник і окреме слово: Mit wem? → Mit ihr.",
  "Три вопроса о месте": "Три запитання про місце",
  "Wo? — где находится предмет. Wohin? — куда он движется. Woher? — откуда. Сравни dort, dorthin и dorther, а также hier, hierher и von hier.": "Wo? — де розташований предмет. Wohin? — куди він рухається. Woher? — звідки. Порівняй dort, dorthin і dorther, а також hier, hierher і von hier.",
  "Как устроено отрицание": "Як утворюється заперечення",
  "Nichts, niemand, nie и nirgends сами передают отрицание. Для обычного «никто не пришёл» достаточно Niemand ist gekommen. Kein стоит перед названием вещи и меняется похоже на mein: kein Fahrrad, keinen Hund, keine Zeit, keine Kinder. С действием или признаком часто идёт nicht.": "Nichts, niemand, nie і nirgends самі передають заперечення. Для звичайного «ніхто не прийшов» досить Niemand ist gekommen. Kein стоїть перед назвою речі й змінюється подібно до mein: kein Fahrrad, keinen Hund, keine Zeit, keine Kinder. З дією або ознакою часто стоїть nicht.",
  "Три вида просьбы": "Три види прохання",
  "Для Sie начни с действия и оставь Sie: Kommen Sie! Для группы возьми форму ihr и убери ihr: Kommt! С другом часто можно убрать du и -st: du machst → Mach! Запомни Arbeite!, Nimm!, Gib!, Iss! Отделяемая часть остаётся в конце: Ruf mich an!": "Для Sie починай із дії й залишай Sie: Kommen Sie! Для групи візьми форму ihr і прибери ihr: Kommt! З другом часто можна прибрати du та -st: du machst → Mach! Запам’ятай Arbeite!, Nimm!, Gib!, Iss! Відокремлювана частина лишається в кінці: Ruf mich an!",
  "Устойчивые сочетания": "Сталі сполучення",
  "В Hunger haben или beschäftigt sein главный смысл сообщает слово рядом с haben или sein. Учи сочетание целиком: Ich habe Hunger — я голоден, Ich bin beschäftigt — я занят. Состояние и его изменение различаются: Ich bin müde, Ich werde müde.": "У Hunger haben або beschäftigt sein головний зміст передає слово поруч із haben або sein. Вчи сполучення цілком: Ich habe Hunger — я голодний, Ich bin beschäftigt — я зайнятий. Стан і його зміна різняться: Ich bin müde, Ich werde müde.",
  "Как описать человека": "Як описати людину",
  "Ist говорит, какой человек сейчас, hat — что у него есть, trägt — что он носит. Например: Er ist gross, hat dunkle Haare und trägt eine Brille. Entschuldigen можно употребить с другим человеком: Ich entschuldige dich. Sich entschuldigen — самому извиниться: Ich entschuldige mich.": "Ist каже, якою є людина зараз, hat — що вона має, trägt — що носить. Наприклад: Er ist gross, hat dunkle Haare und trägt eine Brille. Entschuldigen можна вжити з іншою людиною: Ich entschuldige dich. Sich entschuldigen — вибачитися самому: Ich entschuldige mich."
};
