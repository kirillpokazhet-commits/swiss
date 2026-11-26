// Lesson topics follow the photographed contents and grammar summaries.
// A third field on a word links it to the same card in the prototype.
const course = [
  {
    id: 1, title: "Знакомство", german: "Guten Tag. Mein Name ist …", pages: "18–19",
    theory: [
      ["Глагол и его место", "Глагол обозначает действие или состояние: «что делать?» — приходить, читать, быть. В предложении он отвечает, например, на «что делает?» — приходит, читает. Немецкое kommen — «приходить», а Ich komme — «я прихожу».\n\nФорма глагола меняется в зависимости от того, кто выполняет действие. В обычном немецком предложении такая форма стоит на втором месте. В Ich komme aus Italien первым идёт ich, вторым — komme. Можно начать с Aus Italien. Тогда получится Aus Italien komme ich.\n\nAus Italien занимает одно место, потому что эти два слова вместе отвечают на вопрос «откуда?». В вопросе с Woher глагол тоже второй: Woher kommst du?", "Ich komme aus Italien. Woher kommst du?"],
      ["«Ты», «вы» и «они»", "Местоимение — слово, которое можно использовать вместо имени или названия. Например, «Анна читает» → «она читает». В немецком ich — «я», du — «ты», er / sie / es — «он / она / оно», wir — «мы», ihr — «вы», sie — «они».\n\nС одним другом говори du. Пришли двое друзей? Теперь ihr. В магазине вежливое Sie подходит и к одному человеку, и к нескольким. Сравни: Wo wohnt ihr? и Wo wohnen Sie?\n\nВ каждой строке таблицы показано, какую форму глагола использовать с этим местоимением. Например, «мы говорим» — wir sprechen. Вежливое Sie всегда пишется с большой буквы. У sprechen с du и er меняется ещё и гласная: ich spreche, du sprichst, er spricht.", "Wir sprechen Deutsch. Sprecht ihr auch Deutsch? Sprechen Sie Deutsch?", [
        ["Кто?", "heissen", "kommen", "sprechen", "sein"],
        ["ich — я", "heisse", "komme", "spreche", "bin"],
        ["du — ты", "heisst", "kommst", "sprichst", "bist"],
        ["er / sie / es — он / она / оно", "heisst", "kommt", "spricht", "ist"],
        ["wir — мы", "heissen", "kommen", "sprechen", "sind"],
        ["ihr — вы, на «ты» с каждым", "heisst", "kommt", "sprecht", "seid"],
        ["sie — они", "heissen", "kommen", "sprechen", "sind"],
        ["Sie — Вы, вежливо", "heissen", "kommen", "sprechen", "sind"]
      ], "", { translation: "Мы говорим по-немецки. Вы тоже говорите по-немецки? Вы говорите по-немецки? (вежливо)", check: ["Как спросить «Откуда вы?» у двух друзей?", "Woher kommt ihr? Для вежливого обращения: Woher kommen Sie?"] }],
      ["Страна и язык", "О себе можно сказать двумя фразами: Ich komme aus Italien. Ich spreche Italienisch. После aus называешь страну, после spreche — язык.\n\nБольшинство названий стран после aus идут без артикля: aus Polen. У Швейцарии есть артикль die, поэтому говорим aus der Schweiz.", "Können Sie das bitte buchstabieren?"],
      ["Приветствие и анкета", "Зашёл в пекарню? Grüezi — и можно заказывать. С другом подойдёт Hallo. На прощание — Auf Wiedersehen, а по телефону — Auf Wiederhören.\n\nВ анкете Vorname — имя, Nachname — фамилия, Adresse — адрес.", "Grüezi! Mein Name ist Nina Keller."]
    ],
    words: [["Grüezi", "здравствуйте (в Швейцарии)", "1:0"], ["Guten Morgen", "доброе утро", "1:1"], ["Auf Wiedersehen", "до свидания"], ["heissen", "зваться", "1:2"], ["kommen", "приходить, быть родом", "1:4"], ["sprechen", "говорить"], ["aus", "из", "1:5"], ["buchstabieren", "произносить по буквам"], ["der Vorname · die Vornamen", "имя"], ["der Nachname · die Nachnamen", "фамилия"], ["die Sprache · die Sprachen", "язык"], ["die Adresse · die Adressen", "адрес", "2:5"]],
    practice: [
      ["Как вежливо спросить имя?", "Wie heissen Sie?", "После Wie идёт heissen, затем вежливое Sie.", "choice", ["Wie heisst du?", "Wie heissen Sie?", "Wie ich heisse?"]],
      ["Ich ___ aus Spanien. (Я из Испании.)", "komme", "С ich у kommen окончание -e.", "choice", ["komme","kommst","kommt"]],
      ["Собери вопрос «Откуда ты?»", "Woher kommst du", "Woher ставим первым, kommst — вторым.", "order", ["du", "Woher", "kommst"]],
      ["Выбери правильную форму глагола: Du ___ Deutsch.", "sprichst", "В форме du: sprichst, с i.", "choice", ["sprichst","sprechst","spreche"]],
      ["Я из Швейцарии. (используй kommen)", "Ich komme aus der Schweiz", "Запомни сочетание aus der Schweiz."],
      ["Выбери то, что услышишь.", "Mein Name ist Nina", "Mein Name — «моё имя», ist — форма sein.", "listen", ["Mein Name ist Nina","Mein Name ist Mia","Mein Name ist Leo"]],
      ["Какое слово в анкете означает «фамилия»?", "Nachname", "Vorname — имя, Nachname — фамилия.", "choice", ["Vorname", "Sprache", "Nachname"]],
      ["___ bist du? (Кто ты?)", "Wer", "Wer значит «кто», а woher — «откуда».", "choice", ["Wer","Wo","Woher"]]
    ]
  },
  {
    id: 2, title: "Моя семья", german: "Meine Familie", pages: "30–31",
    theory: [
      ["Мой, твой, ваш", "Mein — «мой», dein — «твой», Ihr — вежливое «Ваш». Эти слова показывают, кому что принадлежит. Скажи «мой брат»: mein Bruder. Теперь поменяй брата на сестру: meine Schwester. Окончание зависит от рода и числа существительного, которое идёт следом. В этих примерах смотри на Bruder, Schwester или Eltern.\n\nДля der и das здесь бери mein, dein, Ihr. Для die и нескольких людей добавляй -e: meine Mutter, deine Eltern, Ihre Kinder. Вежливое Ihr пишется с большой буквы.", "Das ist mein Vater. Das sind meine Eltern.", [
        ["Чей?", "der Vater", "das Kind", "die Mutter", "die Eltern"],
        ["мой", "mein", "mein", "meine", "meine"],
        ["твой", "dein", "dein", "deine", "deine"],
        ["ваш (Sie)", "Ihr", "Ihr", "Ihre", "Ihre"]
      ]],
      ["Кто что делает?", "Спряжение — это изменение формы глагола в зависимости от того, кто выполняет действие. По-русски мы говорим «я живу», «он живёт», «мы живём». По-немецки то же различие видно в окончаниях: ich lebe, er lebt, wir leben.\n\nLeben («жить») — начальная форма, которую ищем в словаре. Lebe и lebt — формы для предложения. У многих немецких глаголов начальная форма заканчивается на -en.\n\nУ ihr обычно то же окончание -t, что и у er: ihr lebt. А если говоришь о родителях во множественном числе, получится sie leben.", "Meine Eltern leben in Bern."],
      ["Быть, иметь, говорить", "Частые глаголы: sein, haben и sprechen. Сравни формы для ich, du и er: ich bin, du bist, er ist; ich habe, du hast, er hat.\n\nПопробуй произнести ich spreche, du sprichst, er spricht. Слышишь, где e стало i? Во множественном числе снова wir sprechen.", "Wir sind Geschwister. Er spricht Französisch.", [
        ["Кто?", "sein", "haben", "sprechen"],
        ["ich", "bin", "habe", "spreche"], ["du", "bist", "hast", "sprichst"], ["er / sie / es", "ist", "hat", "spricht"],
        ["wir", "sind", "haben", "sprechen"], ["ihr", "seid", "habt", "sprecht"], ["sie / Sie", "sind", "haben", "sprechen"]
      ]],
      ["Где живёшь и сколько лет?", "Ich wohne in Uznach. Ich bin zwölf Jahre alt. Для города бери in, для возраста — bin. В немецкой фразе буквально «я двенадцатилетний», поэтому нужен глагол sein.\n\nЧтобы спросить друга, скажи Wo wohnst du? или Wie alt bist du? В ответ часто хватит In Uznach или Zwölf.", "Meine Schwester ist zwölf Jahre alt."],
      ["Как дела?", "С другом начни с Wie geht es dir? Вежливо спроси Wie geht es Ihnen? В этой паре достаточно запомнить два готовых вопроса. В ответ можно сказать Gut, danke!\n\nВ анкете Wohnort — где ты живёшь сейчас, Geburtsort — где родился. Это вполне могут быть разные города.", "Wie geht es dir? Gut, danke!"]
    ],
    words: [["die Familie · die Familien", "семья", "3:0"], ["der Bruder · die Brüder", "брат", "3:1"], ["die Schwester · die Schwestern", "сестра", "3:2"], ["das Kind · die Kinder", "ребёнок", "3:3"], ["die Eltern", "родители", "3:4"], ["der Vater · die Väter", "отец"], ["die Mutter · die Mütter", "мама"], ["der Wohnort · die Wohnorte", "место жительства"], ["die Telefonnummer · die Telefonnummern", "номер телефона", "2:4"], ["wohnen", "жить, проживать", "1:3"], ["haben", "иметь", "3:5"], ["zwölf", "двенадцать", "2:2"]],
    practice: [
      ["Как сказать «моя мама»?", "meine Mutter", "Mutter — женского рода, поэтому к mein добавляется -e: meine Mutter.", "choice", ["meine Mutter", "mein Mutter", "Ihr Mutter"]],
      ["Das ___ meine Eltern.", "sind", "Eltern — во множественном числе, поэтому sind.", "choice", ["sind","ist","seid"]],
      ["Собери фразу «Мой брат живёт в Берне».", "Mein Bruder lebt in Bern", "Bruder — мужской род, поэтому mein. С er форма lebt.", "order", ["Bern", "lebt", "Mein", "in", "Bruder"]],
      ["Выбери правильную форму глагола: Du ___ zwei Kinder.", "hast", "С du говорим hast.", "choice", ["hast","habt","hat"]],
      ["Моя сестра говорит по-немецки.", "Meine Schwester spricht Deutsch", "С sie в единственном числе — spricht."],
      ["Выбери то, что услышишь.", "Ich bin elf Jahre alt", "Elf — одиннадцать. Возраст говорим с bin.", "listen", ["Ich bin elf Jahre alt","Ich bin zwölf Jahre alt","Ich bin zehn Jahre alt"]],
      ["Выбери подходящий вопрос для анкеты о месте жительства.", "Wo wohnen Sie?", "Wo — «где». Woher спрашивает, откуда человек.", "choice", ["Wo wohnen Sie?", "Woher kommen Sie?", "Wie heissen Sie?"]],
      ["Wie geht es ___? (Как у тебя дела?)", "dir", "С другом используем dir, вежливая форма — Ihnen.", "choice", ["dir","Dich","Ihnen"]]
    ]
  },
  {
    id: 3, title: "Покупки", german: "Einkaufen", pages: "42–43",
    theory: [
      ["Вопрос на «да» или «нет»", "Возьми Wir haben Milch. Переставь haben вперёд: Haben wir Milch? Вопрос готов.\n\nЕсли нужно узнать, что именно купить, начни с Was: Was brauchen wir? Глагол снова второй. Тут ждут названия продукта.", "Haben wir Milch? Was brauchen wir?"],
      ["Ein, eine, kein", "Артикль — короткое слово перед существительным. Ein или eine ставим, когда говорим об одном предмете и собеседник ещё не знает, о каком именно. Например: Das ist ein Apfel — «Это яблоко». Присмотрелся, а это груша: Das ist kein Apfel, das ist eine Birne. Добавил k и изменил смысл.\n\nС die бери eine или keine. Если предметов несколько, ein исчезает, а отрицание остаётся: Tomaten → keine Tomaten.", "Das ist keine Zitrone. Das ist eine Birne."],
      ["Кило, литры и цены", "Хочешь молоко? Сначала назови количество: ein Liter Milch. Для картошки так же: zwei Kilo Kartoffeln.\n\nНа кассе 1.50 можно услышать как ein Franken fünfzig. Последнее число — раппены. Если сомневаешься, переспроси и посмотри на ценник.", "Zwei Kilo Kartoffeln kosten fünf Franken."],
      ["Я бы хотел…", "Ich möchte …, bitte — готовое начало заказа. Вставь нужное: zwei Brötchen, Kaffee, Wasser.\n\nОт продавца услышишь Was möchten Sie? У него другая форма, потому что он говорит вежливое «Вы». К другу можно обратиться Möchtest du auch Kaffee? Другие формы: er / sie möchte, wir möchten, ihr möchtet, sie möchten.", "Ich möchte zwei Brötchen, bitte."]
    ],
    words: [["der Apfel · die Äpfel", "яблоко"], ["das Ei · die Eier", "яйцо"], ["die Tomate · die Tomaten", "помидор"], ["die Birne · die Birnen", "груша"], ["das Brötchen · die Brötchen", "булочка"], ["die Milch", "молоко"], ["der Zucker", "сахар"], ["ein Kilo", "один килограмм"], ["die Flasche · die Flaschen", "бутылка"], ["der Franken · die Franken", "франк", "4:5"], ["kosten", "стоить", "4:4"], ["Ich möchte …", "Я хотел(а) бы…"]],
    practice: [
      ["Выбери вопрос «У вас есть яйца?» (вежливо)", "Haben Sie Eier?", "В вопросе да/нет глагол стоит первым.", "choice", ["Sie haben Eier.", "Was haben Sie?", "Haben Sie Eier?"]],
      ["Das ist ___ Tomate. (Это не помидор.)", "keine", "С Tomate употребляем женскую форму keine.", "choice", ["keine","kein","keinen"]],
      ["Собери фразу «Я хотел бы две булочки».", "Ich möchte zwei Brötchen", "Местоимение, möchte, затем покупка.", "order", ["Brötchen", "möchte", "Ich", "zwei"]],
      ["Выбери правильный артикль: Das ist ___ Ei.", "ein", "Ei среднего рода, поэтому ein.", "choice", ["ein","eine","einen"]],
      ["У нас есть молоко. (используй haben, без артикля)", "Wir haben Milch", "Когда речь о молоке вообще, артикль не нужен."],
      ["Выбери то, что услышишь.", "Die Äpfel kosten drei Franken", "Äpfel — яблоки, kosten — стоят.", "listen", ["Die Äpfel kosten drei Franken","Die Äpfel kosten zwei Franken","Die Äpfel kosten vier Franken"]],
      ["Как сказать «три яйца»?", "drei Eier", "Множественное число от Ei — Eier.", "choice", ["drei Ei", "drei Eie", "drei Eier"]],
      ["Was ___ Sie? (Что бы вы хотели?)", "möchten", "С вежливым Sie нужна форма möchten.", "choice", ["möchten","möchtest","möchtet"]]
    ]
  },
  {
    id: 4, title: "Моя квартира", german: "Meine Wohnung", pages: "54–55",
    theory: [
      ["Der, das, die", "Существительное называет человека, предмет, место или понятие. Например: Tisch — «стол», Küche — «кухня». В немецком существительные пишутся с большой буквы.\n\nАртикль — отдельное слово перед существительным: der Tisch, das Bad, die Küche. В этих формах der показывает мужской род, das — средний, die — женский. Род может отличаться от русского, поэтому запоминай артикль вместе со словом.\n\nВо множественном числе в этих примерах используется артикль die: die Stühle, die Tische. Для одного спроси Wo ist …?, для нескольких — Wo sind …?", "Hier ist die Küche. Dort sind die Stühle."],
      ["Здесь или там?", "Hier значит «здесь», dort — «там». Если вы уже говорите о диване, можно ответить коротко: Es ist dort.\n\nСмотри на немецкий артикль. У Sofa стоит das, поэтому в ответе es, даже если по-русски диван — «он».", "Wo ist das Sofa? Es ist hier."],
      ["Цвет, размер и «не»", "Прилагательное отвечает на вопрос «какой?», «какая?» или «какое?» и описывает предмет. В Das Sofa ist blau слово blau — прилагательное: «какой диван?» — синий. Теперь опиши два стула: Die Stühle sind blau. Изменился глагол, но blau осталось.\n\nЕсли цвет другой, достаточно добавить nicht: nicht blau. Для размера и цены тот же приём: nicht gross, nicht teuer.", "Das Bad ist klein. Es ist nicht dunkel."],
      ["Из двух слов одно", "Küche — кухня, Tisch — стол, Küchentisch — кухонный стол. Посмотри на конец: это по-прежнему der Tisch, поэтому der Küchentisch.\n\nТак же со спальней. Там спят, но главное слово das Zimmer, значит das Schlafzimmer.", "Die Miete kostet tausend Franken."]
    ],
    words: [["die Wohnung · die Wohnungen", "квартира"], ["das Zimmer · die Zimmer", "комната"], ["die Küche · die Küchen", "кухня"], ["das Bad · die Bäder", "ванная"], ["der Tisch · die Tische", "стол"], ["der Stuhl · die Stühle", "стул"], ["das Sofa · die Sofas", "диван"], ["der Kühlschrank · die Kühlschränke", "холодильник"], ["die Miete · die Mieten", "арендная плата"], ["hier", "здесь"], ["dort", "там"], ["teuer", "дорогой"]],
    practice: [
      ["Какой артикль у слова Bad?", "das", "Запоминай вместе: das Bad.", "choice", ["der", "die", "das"]],
      ["Wo ist das Sofa? ___ ist dort.", "Es", "Das Sofa заменяем словом es.", "choice", ["Es","Er","Sie"]],
      ["Собери фразу «Кухня не маленькая».", "Die Küche ist nicht klein", "Nicht ставим перед klein.", "order", ["klein", "Küche", "nicht", "Die", "ist"]],
      ["Выбери правильную форму глагола: Die Stühle ___ blau.", "sind", "Стульев несколько, значит sind.", "choice", ["sind","ist","seid"]],
      ["Стол здесь. (начни с Der Tisch)", "Der Tisch ist hier", "Tisch — мужского рода, hier значит «здесь»."],
      ["Выбери то, что услышишь.", "Das Zimmer ist hell", "Hell значит «светлый».", "listen", ["Das Zimmer ist hell","Das Zimmer ist klein","Das Zimmer ist dunkel"]],
      ["Что означает Miete в объявлении о квартире?", "арендная плата", "Miete — плата за аренду квартиры.", "choice", ["площадь", "арендная плата", "номер этажа"]],
      ["Der Kühlschrank ist ___ teuer. (Холодильник недорогой.)", "nicht", "Перед прилагательным teuer ставим nicht.", "choice", ["nicht","kein","keine"]]
    ]
  },
  {
    id: 5, title: "Распорядок дня", german: "Tagesabläufe", pages: "66–67",
    theory: [
      ["Приставка в конце", "Приставка — часть слова перед его основной частью. У aufstehen («вставать») это auf. Такая приставка может отделяться от глагола. В предложении Ich stehe auf форма stehe согласуется с ich, а auf ставится в конце. Со временем получится Ich stehe um sieben Uhr auf.\n\nУ einkaufen в конец ставим ein: Ich kaufe heute ein.", "Ich räume mein Zimmer am Samstag auf."],
      ["Am, um и bis", "Предлог — короткое слово, которое показывает связь между словами, например время или место. В этой теме am и um помогают ответить на «когда?». В понедельник — am Montag, утром — am Morgen. Ровно в девять — um neun Uhr. Для «ночью» используется in der Nacht.\n\nЕсли на двери написано von Montag bis Freitag, это «с понедельника по пятницу». С часами так же: von acht bis sechs Uhr.", "Der Laden ist von acht bis sechs Uhr geöffnet."],
      ["Который час?", "Acht Uhr dreissig — 8:30. Halb neun — тоже 8:30. Halb перед названием часа означает, что до этого часа осталось 30 минут.\n\nViertel nach acht — четверть часа после восьми, 8:15. Viertel vor neun — четверть часа до девяти, 8:45.", "Es ist halb neun."],
      ["Начинаем со времени", "Ich arbeite am Montag. Если хочешь начать с понедельника, передвинь Am Montag вперёд. Следом сразу поставь arbeite: Am Montag arbeite ich.\n\nAm Montag занимает одно место: оба слова вместе отвечают на вопрос «когда?». Сразу после них идёт глагол.", "Am Abend sehe ich fern."],
      ["Du isst, er schläft", "Послушай, как меняется середина слова: ich esse, du isst; ich schlafe, er schläft. Такие формы проще запоминать парами.\n\nУ arbeiten основа не меняется, но в конце добавляется e: du arbeitest, er arbeitet. Произнеси их подряд, так легче услышать разницу.", "Wann fängst du an?"]
    ],
    words: [["aufstehen", "вставать", "5:0"], ["aufräumen", "убирать, наводить порядок"], ["anfangen", "начинать"], ["fernsehen", "смотреть телевизор"], ["arbeiten", "работать", "5:5"], ["schlafen", "спать"], ["der Morgen · die Morgen", "утро"], ["der Abend · die Abende", "вечер"], ["der Montag · die Montage", "понедельник", "5:4"], ["die Uhr · die Uhren", "часы", "5:3"], ["halb neun", "половина девятого (8:30)"], ["geöffnet", "открыто"]],
    practice: [
      ["Который час, если говорят halb neun?", "8:30", "Половина девятого — это 8:30.", "choice", ["9:30", "8:30", "8:45"]],
      ["Der Kurs fängt ___ neun Uhr an.", "um", "Перед точным временем ставим um.", "choice", ["um","am","bis"]],
      ["Собери фразу «Утром я встаю в семь». Начни с Am Morgen.", "Am Morgen stehe ich um sieben Uhr auf", "Глагол stehe идёт после Am Morgen, приставка auf — в конец.", "order", ["auf", "ich", "Am Morgen", "sieben Uhr", "stehe", "um"]],
      ["Собери фразу с правильным порядком слов. Начни с Am Montag.", "Am Montag arbeite ich", "После Am Montag сразу ставим arbeite.", "order", ["ich","arbeite","Am Montag"]],
      ["Вечером я смотрю телевизор. (начни с Am Abend)", "Am Abend sehe ich fern", "Fernsehen разделяется: sehe идёт после Am Abend, fern — в конец."],
      ["Выбери то, что услышишь.", "Du stehst früh auf", "Früh — рано, auf — отделяемая приставка.", "listen", ["Du stehst früh auf","Du stehst spät auf","Du stehst um acht auf"]],
      ["Как сказать «с понедельника по пятницу»?", "von Montag bis Freitag", "Von — «с», bis — «до».", "choice", ["am Montag um Freitag", "von Montag bis Freitag", "um Montag bis Freitag"]],
      ["Du ___ heute lange. (Ты сегодня долго спишь.)", "schläfst", "У schlafen с du появляется ä: du schläfst.", "choice", ["schläfst","schlafe","schläft"]]
    ]
  },
  {
    id: 6, title: "Свободное время", german: "Freizeit", pages: "78–79",
    theory: [
      ["Der или den?", "Падеж показывает роль слова в предложении. Сравни: «друг пришёл» и «я вижу друга». Во втором случае «друга» отвечает на вопрос «кого я вижу?» и стоит в винительном падеже. По-немецки он называется Akkusativ.\n\nDer Tee ist heiss: чай — то, о чём говорится. Здесь используется Nominativ (именительный падеж). В Ich trinke den Tee чай отвечает на «что я пью?», поэтому нужен Akkusativ. Здесь у мужского рода der меняется на den.\n\nС ein и kein получается einen Tee и keinen Tee. В среднем и женском роде и во множественном числе формы в таблице не меняются.", "Ich nehme einen Tee und eine Suppe.", [
        ["Род", "Кто? / Что?", "Кого? / Что?"],
        ["мужской", "der / ein / kein", "den / einen / keinen"], ["средний", "das / ein / kein", "das / ein / kein"],
        ["женский", "die / eine / keine", "die / eine / keine"], ["множественное число", "die / keine", "die / keine"]
      ]],
      ["Когда сказать doch?", "Kommst du? — Ja, ich komme. Kommst du nicht? — Doch, ich komme! Во втором вопросе человек уже предположил, что ты не придёшь, а ты его поправляешь.\n\nЕсли он угадал и ты правда не придёшь, ответь Nein, ich komme nicht.", "Liest du nicht gern? Doch, ich lese gern."],
      ["Nimmst, liest, fährst", "Возьми пары: ich nehme — du nimmst, ich lese — du liest, ich treffe — du triffst, ich fahre — du fährst. С er тоже меняется середина слова.\n\nДля группы друзей загляни в строку ihr: ihr nehmt, ihr lest, ihr trefft, ihr fahrt. Здесь гласная такая же, как в словаре.", "Am Sonntag trifft sie eine Freundin.", [
        ["Кто?", "nehmen", "lesen", "treffen", "fahren"],
        ["ich", "nehme", "lese", "treffe", "fahre"], ["du", "nimmst", "liest", "triffst", "fährst"], ["er / sie / es", "nimmt", "liest", "trifft", "fährt"],
        ["wir", "nehmen", "lesen", "treffen", "fahren"], ["ihr", "nehmt", "lest", "trefft", "fahrt"], ["sie / Sie", "nehmen", "lesen", "treffen", "fahren"]
      ]],
      ["Хобби и погода", "Ich lese gern — я люблю читать. Подставь своё занятие: Ich schwimme gern, Ich tanze gern.\n\nО погоде начни с es: Es regnet, Es ist windig. Если впереди Heute, глагол сразу после него: Heute regnet es.", "Im Süden ist es warm. Hier regnet es."]
    ],
    words: [["die Freizeit", "свободное время"], ["das Hobby · die Hobbys", "увлечение"], ["das Wetter", "погода"], ["der Regen", "дождь"], ["die Sonne", "солнце"], ["windig", "ветрено"], ["gern", "охотно, с удовольствием", "7:0"], ["lesen", "читать"], ["treffen", "встречать"], ["fahren", "ехать"], ["nehmen", "брать"], ["doch", "как раз да (возражение на отрицание)"]],
    practice: [
      ["Как сказать «Я беру чай»? (неопределённый артикль)", "Ich nehme einen Tee.", "Tee мужского рода, в Akkusativ ein становится einen.", "choice", ["Ich nehme eine Tee.", "Ich nehme einen Tee.", "Ich nehme ein Tee."]],
      ["Hast du keinen Hunger? — ___, ich habe Hunger.", "Doch", "Ты возражаешь на keinen: на самом деле есть хочется.", "choice", ["Doch","Nein","Bitte"]],
      ["Собери фразу «Сегодня идёт дождь». Начни с Heute.", "Heute regnet es", "После Heute ставим regnet, потом es.", "order", ["es", "Heute", "regnet"]],
      ["Выбери правильную форму глагола: Du ___ einen Salat.", "nimmst", "У nehmen с du форма nimmst.", "choice", ["nimmst","nehmst","nimmt"]],
      ["Я люблю читать. (используй gern или gerne)", "Ich lese gern", "Gern после глагола передаёт «люблю делать»."],
      ["Выбери то, что услышишь.", "Sie fährt gern Velo", "Fährt — форма для er или sie. В Швейцарии Velo — велосипед.", "listen", ["Sie fährt gern Velo","Sie fährt gern Bus","Sie fährt gern Zug"]],
      ["Подставь правильный артикль: Wir haben ___ Saft. (У нас нет сока.)", "keinen", "Saft мужского рода и здесь стоит в Akkusativ.", "choice", ["kein", "keine", "keinen"]],
      ["Er ___ ein Buch. (Он читает книгу.)", "liest", "Lesen с er меняется на liest.", "choice", ["liest","lese","lest"]]
    ]
  },
  {
    id: 7, title: "Дети и школа", german: "Kinder und Schule", pages: "90–91",
    theory: [
      ["Могу или хочу?", "Ich kann schwimmen — я умею плавать. Ich will schwimmen — я хочу плавать. Действие одно, но от первого глагола меняется смысл.\n\nKann и will — формы модальных глаголов. Модальный глагол показывает, могу ли я что-то сделать или хочу ли. После него в конец ставим второй глагол в начальной форме, то есть как в словаре: schwimmen. В вопросе на «да» или «нет» сначала идёт kann или will в нужной форме: Kannst du schwimmen?", "Kannst du heute kommen? Ich will Tennis spielen.", [
        ["Кто?", "können", "wollen"],
        ["ich", "kann", "will"], ["du", "kannst", "willst"], ["er / sie / es", "kann", "will"],
        ["wir", "können", "wollen"], ["ihr", "könnt", "wollt"], ["sie / Sie", "können", "wollen"]
      ]],
      ["Что было вчера?", "Perfekt — одна из форм прошедшего времени. Её часто используют в разговоре, чтобы сказать, что уже произошло: Ich habe Deutsch gelernt — «Я учил немецкий». Habe — вспомогательный глагол, а gelernt называет само действие в форме прошедшего времени. Habe идёт после ich, gelernt — в конец.\n\nС другом скажи Du hast gelernt. О нём — Er hat gelernt. Первое слово меняется, gelernt можно оставить.", "Gestern habe ich ein Lied gesungen."],
      ["Почему bin gekommen?", "Сравни Ich habe gelernt и Ich bin gekommen. Для gehen, kommen и fahren, когда речь о перемещении, обычно берём sein. Учи целыми парами: bin gegangen, bin gekommen, bin gefahren.\n\nЕсли начнёшь с Gestern, bin будет вторым: Gestern bin ich nach Uznach gefahren.", "Bist du mit dem Bus gekommen?"],
      ["Как договориться?", "Предложи что-то вместе: Wollen wir spazieren gehen? Можно ответить Ja, gern или предложить другое: Lieber morgen.\n\nЕсли сам сегодня не можешь на урок, пригодится Ich kann heute nicht kommen. Kann стоит после ich, kommen — в конце.", "Mein Sohn ist krank. Er kann heute nicht kommen."]
    ],
    words: [["die Schule · die Schulen", "школа"], ["der Unterricht", "занятия, урок"], ["die Lehrerin · die Lehrerinnen", "учительница"], ["die Prüfung · die Prüfungen", "экзамен"], ["der Ausflug · die Ausflüge", "поездка, экскурсия"], ["können", "мочь, уметь", "7:5"], ["wollen", "хотеть"], ["lernen", "учиться, изучать"], ["krank", "больной"], ["pünktlich", "вовремя, пунктуально"], ["gestern", "вчера"], ["Gute Besserung!", "Выздоравливай!"]],
    practice: [
      ["Как сказать «Я умею плавать»?", "Ich kann schwimmen.", "После kann оставь schwimmen в начальной форме.", "choice", ["Ich kann schwimmen.", "Ich schwimme kann.", "Ich kannst schwimmen."]],
      ["___ du morgen mitkommen? (Ты хочешь пойти с нами завтра?)", "Willst", "С du форма willst; в вопросе ставим её первой.", "choice", ["Willst","Will","Wollt"]],
      ["Собери фразу «Вчера я учил немецкий». Начни с Gestern.", "Gestern habe ich Deutsch gelernt", "Habe занимает второе место, gelernt — в конце.", "order", ["gelernt", "ich", "Gestern", "Deutsch", "habe"]],
      ["Выбери вспомогательный глагол: Ich ___ nach Hause gegangen.", "bin", "В Perfekt с gehen берём sein: ich bin gegangen.", "choice", ["bin","habe","ist"]],
      ["Собери фразу «Я сегодня не могу прийти».", "Ich kann heute nicht kommen", "Главный глагол kommen ставим в конец."],
      ["Выбери то, что услышишь.", "Wir sind mit dem Bus gefahren", "Для поездки с fahren используется sein. С wir — sind.", "listen", ["Wir sind mit dem Bus gefahren","Wir sind mit dem Zug gefahren","Wir sind mit dem Auto gefahren"]],
      ["Какая форма от schreiben подходит для Perfekt?", "geschrieben", "Schreiben → geschrieben. Эту форму удобно запомнить целиком.", "choice", ["geschreibt", "geschrieben", "geschreiben"]],
      ["Bist du pünktlich ___? (Ты пришёл вовремя?)", "gekommen", "У kommen форма gekommen, её ставим в конец.", "choice", ["gekommen","gekommt","gekommenen"]]
    ]
  }
];

// Append items so the first twelve card IDs and review dates stay intact.
course[0].words.push(
  // Classroom instructions
  ["anschauen", "смотреть, рассматривать"],
  ["das Bild · die Bilder", "картинка, изображение"],
  ["hören", "слушать, слышать"],
  ["noch einmal", "ещё раз"],
  ["ankreuzen", "отмечать крестиком"],
  ["zuordnen", "сопоставлять"],
  ["ergänzen", "дополнять, заполнять пропуски"],
  ["machen", "делать"],
  ["der Kurs · die Kurse", "курс"],
  ["lesen", "читать"],
  ["das Gespräch · die Gespräche", "разговор, беседа"],
  ["spielen", "играть, разыгрывать"],
  ["suchen", "искать"],
  ["zeigen", "показывать"],
  ["fragen", "спрашивать"],
  ["markieren", "отмечать, выделять"],
  ["die Frage · die Fragen", "вопрос"],
  ["nachsprechen", "повторять вслух за кем-то"],
  ["raten", "угадывать"],
  ["das Wort · die Wörter", "слово"],
  ["die Lektion · die Lektionen", "урок, раздел учебника"],
  ["meinen", "иметь в виду, считать"],
  ["sagen", "сказать, говорить"],
  ["notieren", "записывать, делать заметку"],
  ["vergleichen", "сравнивать"],
  ["schreiben", "писать"],
  ["variieren", "менять, использовать разные варианты"],
  ["erzählen", "рассказывать"],
  ["arbeiten", "работать"],
  ["zeichnen", "рисовать"],
  ["verbinden", "соединять"],
  ["die Antwort · die Antworten", "ответ"],
  ["richtig", "правильно, верно"],
  // Introductions and greetings
  ["ich", "я"],
  ["sein", "быть"],
  ["der Name · die Namen", "имя, название"],
  ["und", "и"],
  ["ein bisschen", "немного, чуть-чуть"],
  ["Guten Tag", "добрый день"],
  ["Hallo", "привет"],
  ["Tschüss", "пока"],
  ["der Herr · die Herren", "господин"],
  ["Guten Abend", "добрый вечер"],
  ["die Dame · die Damen", "дама"],
  ["willkommen", "добро пожаловать"],
  ["bei", "у, при; также «на» в приветствии на мероприятии"],
  ["die Musik", "музыка"],
  ["international", "международный"],
  ["die Frau · die Frauen", "женщина; госпожа перед фамилией"],
  ["danke", "спасибо"],
  ["Gute Nacht", "спокойной ночи"],
  ["der Papa · die Papas", "папа"],
  ["die Entschuldigung · die Entschuldigungen", "извинение; Entschuldigung! — «Извините!»"],
  ["wie", "как"],
  ["Sie", "Вы (вежливое обращение)"],
  ["wer", "кто"],
  ["ja", "да"],
  ["stimmen", "быть верным, совпадать"],
  ["nein", "нет"],
  ["nicht", "не"],
  ["woher", "откуда"],
  ["du", "ты"],
  ["aha", "ага, понятно"],
  ["toll", "здорово, отличный"],
  ["interessant", "интересный, интересно"],
  ["nur", "только"],
  ["was", "что"],
  ["auch", "тоже, также"],
  // Spelling, phone calls and forms
  ["der Buchstabe · die Buchstaben", "буква"],
  ["das Alphabet", "алфавит"],
  ["Wie bitte?", "Простите, что вы сказали?"],
  ["bitte", "пожалуйста"],
  ["die Firma · die Firmen", "фирма, компания"],
  ["da sein", "быть на месте, присутствовать"],
  ["der Moment · die Momente", "момент; Einen Moment, bitte. — «Одну минуту, пожалуйста»"],
  ["gut", "хорошо, хороший"],
  ["Vielen Dank", "большое спасибо"],
  ["Auf Wiederhören", "до свидания (по телефону)"],
  ["die Visitenkarte · die Visitenkarten", "визитная карточка"],
  ["der Familienname · die Familiennamen", "фамилия"],
  ["die Strasse · die Strassen", "улица"],
  ["die Stadt · die Städte", "город"],
  ["das Land · die Länder", "страна"],
  ["das E-Mail · die E-Mails", "электронное письмо; в анкете — электронная почта"],
  ["das Telefon · die Telefone", "телефон; в анкете — номер телефона"],
  ["das Formular · die Formulare", "бланк, анкета"],
  ["der Ort · die Orte", "место, населённый пункт"],
  ["die Anmeldung · die Anmeldungen", "регистрация, запись"],
  ["die Postleitzahl · die Postleitzahlen", "почтовый индекс"],
  // Countries and languages
  ["die Schweiz", "Швейцария"],
  ["Deutschland", "Германия"],
  ["Österreich", "Австрия"],
  ["Polen", "Польша"],
  ["die Türkei", "Турция"],
  ["Spanien", "Испания"],
  ["Ungarn", "Венгрия"],
  ["Rumänien", "Румыния"],
  ["Syrien", "Сирия"],
  ["Frankreich", "Франция"],
  ["Italien", "Италия"],
  ["Griechenland", "Греция"],
  ["Deutsch", "немецкий язык; по-немецки"],
  ["Polnisch", "польский язык; по-польски"],
  ["Türkisch", "турецкий язык; по-турецки"],
  ["Spanisch", "испанский язык; по-испански"],
  ["Ungarisch", "венгерский язык; по-венгерски"],
  ["Rumänisch", "румынский язык; по-румынски"],
  ["Arabisch", "арабский язык; по-арабски"],
  ["Französisch", "французский язык; по-французски"],
  ["Italienisch", "итальянский язык; по-итальянски"],
  ["Griechisch", "греческий язык; по-гречески"]
);

course[1].words.push(
  // Pages 182–184: family, personal information, and places.
  ["der Lehrer · die Lehrer", "учитель"],
  ["die Lehrerin · die Lehrerinnen", "учительница"],
  ["lernen", "учиться, изучать"],
  ["die Pause · die Pausen", "перерыв, перемена"],
  ["der Park · die Parks", "парк"],
  ["die Grosseltern", "бабушка и дедушка"],
  ["das Jahr · die Jahre", "год"],
  ["alt", "старый; в выражении zehn Jahre alt — «десять лет»"],
  ["die Geschwister", "братья и сёстры"],
  ["leben", "жить"],
  ["in", "в"],
  ["super", "отлично, здорово"],
  ["sehr", "очень"],
  ["gut", "хорошо, хороший"],
  ["ach", "ах, ой"],
  ["nicht", "не"],
  ["so", "так; nicht so gut — «не очень хорошо»"],
  ["der Enkel · die Enkel", "внук"],
  ["die Enkelin · die Enkelinnen", "внучка"],
  ["die Tochter · die Töchter", "дочь"],
  ["der Sohn · die Söhne", "сын"],
  ["die Grossmutter · die Grossmütter", "бабушка"],
  ["der Mann · die Männer", "мужчина; муж"],
  ["der Grossvater · die Grossväter", "дедушка"],
  ["mein / meine", "мой, моя, мои"],
  ["dein / deine", "твой, твоя, твои"],
  ["Ihr / Ihre", "ваш, ваша, ваши (при вежливом обращении)"],
  ["der Ehemann · die Ehemänner", "муж, супруг"],
  ["die Ehefrau · die Ehefrauen", "жена, супруга"],
  ["falsch", "неверно, неправильный"],
  ["genau", "точно; именно так"],
  ["sie", "она; они (смысл подсказывает форма глагола)"],
  ["zusammen", "вместе"],
  ["geschieden", "в разводе"],
  ["er", "он"],
  ["jetzt", "сейчас"],
  ["ihr", "вы (несколько людей, с которыми ты на «ты»)"],
  ["wir", "мы"],
  ["die Zahl · die Zahlen", "число"],
  ["wo", "где"],
  ["geboren", "рождённый; ich bin in Bern geboren — «я родился в Берне»"],
  ["die Nummer · die Nummern", "номер"],
  ["verheiratet", "женат, замужем"],
  ["das Heimatland · die Heimatländer", "родная страна"],
  ["der Geburtsort · die Geburtsorte", "место рождения"],
  ["der Familienstand", "семейное положение"],
  ["ledig", "не женат, не замужем"],
  ["verwitwet", "вдовец, вдова (о семейном положении)"],
  ["das Alter", "возраст"],
  ["die Hauptstadt · die Hauptstädte", "столица"],
  ["der Fluss · die Flüsse", "река"],
  ["der Norden", "север"],
  ["der Berg · die Berge", "гора"],
  ["der Süden", "юг"],
  ["der See · die Seen", "озеро"],
  ["der Westen", "запад"],
  ["der Schweizer · die Schweizer", "швейцарец"],
  ["die Schweizerin · die Schweizerinnen", "швейцарка"],
  ["lange", "долго"],
  ["Nord-", "северо-, например Norddeutschland — север Германии"],
  ["der Deutsche / die Deutsche", "немец / немка"],
  ["Süd-", "южно-, например Süddeutschland — юг Германии"]
);

// Vocabulary from pages 184–203. Keep these lists append-only for saved cards.
course[2].words.push(
  ["die Banane · die Bananen", "банан"],
  ["die Butter", "сливочное масло"],
  ["das Mehl", "мука"],
  ["die Crêpe · die Crêpes", "тонкий блинчик"],
  ["die Schokolade", "шоколад"],
  ["brauchen", "нуждаться; ich brauche … — мне нужно…"],
  ["kaufen", "покупать"],
  ["der Hunger", "голод"],
  ["machen", "делать; о цене — «выходит, получается»"],
  ["helfen", "помогать"],
  ["das Fleisch", "мясо"],
  ["das Bier", "пиво"],
  ["der Käse", "сыр"],
  ["das Salz", "соль"],
  ["der Tee · die Tees", "чай"],
  ["das Brot · die Brote", "хлеб"],
  ["der Wein · die Weine", "вино"],
  ["das Mineralwasser", "минеральная вода"],
  ["der Reis", "рис"],
  ["der Fisch · die Fische", "рыба"],
  ["natürlich", "конечно"],
  ["hier", "здесь; «вот», когда что-то дают"],
  ["ein / eine", "один, одна; артикль для одного предмета"],
  ["kein / keine", "никакой; артикль со значением «нет»"],
  ["die Orange · die Orangen", "апельсин"],
  ["der Kuchen · die Kuchen", "пирог, торт"],
  ["der Kaffee · die Kaffees", "кофе"],
  ["der Saft · die Säfte", "сок"],
  ["das Würstchen · die Würstchen", "сосиска"],
  ["die Kartoffel · die Kartoffeln", "картофель"],
  ["das Joghurt · die Joghurts", "йогурт (швейцарский вариант артикля)"],
  ["die Zwiebel · die Zwiebeln", "лук, луковица"],
  ["das Regal · die Regale", "полка, стеллаж"],
  ["der Preis · die Preise", "цена"],
  ["der Rappen · die Rappen", "раппен, сотая часть швейцарского франка"],
  ["der Prospekt · die Prospekte", "буклет, рекламный проспект"],
  ["die Aktion · die Aktionen", "акция, спецпредложение"],
  ["das Lebensmittel · die Lebensmittel", "продукт питания"],
  ["das Hackfleisch", "мясной фарш"],
  ["wie viel", "сколько"],
  ["das Gramm", "грамм"],
  ["das Kilogramm", "килограмм"],
  ["das Pfund", "фунт; в таком магазине — 500 граммов"],
  ["der Liter · die Liter", "литр"],
  ["die Dose · die Dosen", "банка, консервная банка"],
  ["der Rahm", "сливки (в Швейцарии)"],
  ["der Verkäufer · die Verkäufer", "продавец"],
  ["die Verkäuferin · die Verkäuferinnen", "продавщица"],
  ["der Kunde · die Kunden", "покупатель, клиент"],
  ["die Kundin · die Kundinnen", "покупательница, клиентка"],
  ["noch", "ещё"],
  ["alles", "всё; Das ist alles. — «Это всё»"],
  ["finden", "находить"],
  ["gern", "с удовольствием; «охотно» в ответ на просьбу"],
  ["der Laden · die Läden", "магазин"],
  ["die Frucht · die Früchte", "фрукт, плод"],
  ["das Gemüse", "овощи"],
  ["die Bäckerei · die Bäckereien", "пекарня, булочная"],
  ["das Rezept · die Rezepte", "рецепт"],
  ["für", "для"],
  ["das Wasser", "вода"],
  ["der Pfeffer", "перец"],
  ["die Kiwi · die Kiwis", "киви"]
);

course[3].words.push(
  ["die Lampe · die Lampen", "лампа"],
  ["das Badezimmer · die Badezimmer", "ванная комната"],
  ["alt", "старый"],
  ["neu", "новый"],
  ["gross", "большой"],
  ["klein", "маленький"],
  ["hell", "светлый"],
  ["dunkel", "тёмный"],
  ["billig", "дешёвый"],
  ["schön", "красивый"],
  ["hässlich", "некрасивый"],
  ["kennen", "знать, быть знакомым с кем-то"],
  ["das Schlafzimmer · die Schlafzimmer", "спальня"],
  ["der Gang · die Gänge", "коридор"],
  ["die Toilette · die Toiletten", "туалет"],
  ["der Balkon · die Balkone", "балкон"],
  ["das Wohnzimmer · die Wohnzimmer", "гостиная"],
  ["der / das / die", "определённые артикли; запоминай их вместе со словом"],
  ["das Haus · die Häuser", "дом"],
  ["aber", "но"],
  ["der Monat · die Monate", "месяц"],
  ["schmal", "узкий"],
  ["breit", "широкий"],
  ["der Schrank · die Schränke", "шкаф"],
  ["das Bett · die Betten", "кровать"],
  ["der Fernseher · die Fernseher", "телевизор"],
  ["die Dusche · die Duschen", "душ"],
  ["der Herd · die Herde", "кухонная плита"],
  ["die Badewanne · die Badewannen", "ванна"],
  ["der Teppich · die Teppiche", "ковёр"],
  ["der Sessel · die Sessel", "кресло"],
  ["die Möbel", "мебель"],
  ["das Gerät · die Geräte", "прибор, устройство"],
  ["gefallen", "нравиться"],
  ["die Farbe · die Farben", "цвет"],
  ["finden", "находить; Ich finde es schön. — «По-моему, это красиво»"],
  ["schlecht", "плохой; плохо"],
  ["modern", "современный"],
  ["schwarz", "чёрный"],
  ["grau", "серый"],
  ["weiss", "белый"],
  ["grün", "зелёный"],
  ["braun", "коричневый"],
  ["blau", "синий, голубой"],
  ["rot", "красный"],
  ["gelb", "жёлтый"],
  ["hellrot", "светло-красный"],
  ["dunkelbraun", "тёмно-коричневый"],
  ["der Zentimeter · die Zentimeter", "сантиметр"],
  ["mal", "на, умножить на (в размерах)"],
  ["das Handy · die Handys", "мобильный телефон"],
  ["das Büro · die Büros", "офис"],
  ["das Inserat · die Inserate", "объявление"],
  ["nett", "милый, приятный"],
  ["das Ehepaar · die Ehepaare", "супружеская пара"],
  ["suchen", "искать"],
  ["der Garten · die Gärten", "сад"],
  ["vermieten", "сдавать в аренду"],
  ["das Appartement · die Appartements", "квартира, апартаменты"],
  ["der Raum · die Räume", "помещение, комната"],
  ["der Stock", "этаж"],
  ["circa", "около, примерно (сокращение ca.)"],
  ["privat", "частный; von privat — от частного лица"],
  ["ab", "с, начиная с"],
  ["sofort", "сразу, немедленно"],
  ["maximal", "максимум, не больше"],
  ["der Anruf · die Anrufe", "телефонный звонок"],
  ["möbliert", "с мебелью"],
  ["der TV · die TVs", "телевизор"],
  ["die Garage · die Garagen", "гараж"],
  ["der Quadratmeter · die Quadratmeter", "квадратный метр"],
  ["bezahlen", "платить, оплачивать"],
  ["verkaufen", "продавать"],
  ["etwas", "что-то, что-нибудь"],
  ["der Computer · die Computer", "компьютер"],
  ["der Schreibtisch · die Schreibtische", "письменный стол"],
  ["heute", "сегодня"],
  ["welche", "какая; какие"],
  ["also", "итак; ну, значит"],
  ["ungefähr", "приблизительно"],
  ["der Meter · die Meter", "метр"],
  ["lang", "длинный; длиной"],
  ["genau", "точно"],
  ["hoch", "высокий; высотой"],
  ["morgen", "завтра"],
  ["das Regal · die Regale", "полка, стеллаж"],
  ["hell-", "светло- (в названии цвета)"],
  ["dunkel-", "тёмно- (в названии цвета)"]
);

course[4].words.push(
  ["machen", "делать"],
  ["die Präsentation · die Präsentationen", "презентация"],
  ["frühstücken", "завтракать"],
  ["einkaufen", "ходить за покупками"],
  ["hören", "слушать, слышать"],
  ["kochen", "готовить, варить"],
  ["spazieren gehen", "ходить гулять"],
  ["gehen", "идти"],
  ["oder", "или"],
  ["müde", "уставший"],
  ["anrufen", "звонить по телефону"],
  ["früh", "рано"],
  ["der Supermarkt · die Supermärkte", "супермаркет"],
  ["mit", "с, вместе с"],
  ["die Arbeit · die Arbeiten", "работа"],
  ["lange", "долго"],
  ["spielen", "играть"],
  ["essen", "есть, кушать"],
  ["spät", "поздно"],
  ["schon", "уже"],
  ["erst", "только, лишь (о времени)"],
  ["das Viertel · die Viertel", "четверть; о времени — 15 минут"],
  ["vor", "до, перед; Viertel vor zwölf — 11:45"],
  ["nach", "после; Viertel nach eins — 1:15"],
  ["halb", "половина"],
  ["kurz", "короткий; kurz vor zwölf — незадолго до двенадцати"],
  ["gleich", "сейчас, вот-вот"],
  ["der Intensivkurs · die Intensivkurse", "интенсивный курс"],
  ["der Dienstag · die Dienstage", "вторник"],
  ["der Mittwoch · die Mittwoche", "среда"],
  ["der Donnerstag · die Donnerstage", "четверг"],
  ["der Freitag · die Freitage", "пятница"],
  ["wann", "когда"],
  ["um", "в (перед точным временем)"],
  ["enden", "заканчиваться"],
  ["von … bis …", "с … до …"],
  ["am", "в, по (с днём недели или частью дня)"],
  ["die Party · die Partys", "вечеринка"],
  ["die Zeit", "время"],
  ["der Fussball", "футбол; футбольный мяч"],
  ["der Samstag · die Samstage", "суббота"],
  ["der Sonntag · die Sonntage", "воскресенье"],
  ["das Wochenende · die Wochenenden", "выходные"],
  ["die Woche · die Wochen", "неделя"],
  ["die Hausaufgabe · die Hausaufgaben", "домашнее задание"],
  ["die Mama · die Mamas", "мама"],
  ["der Mittag", "полдень; am Mittag — в полдень"],
  ["der Nachmittag · die Nachmittage", "вторая половина дня"],
  ["der Vormittag · die Vormittage", "первая половина дня"],
  ["die Nacht · die Nächte", "ночь"],
  ["das Kino · die Kinos", "кинотеатр"],
  ["der Sport", "спорт"],
  ["trinken", "пить"],
  ["die Pizza · die Pizzen", "пицца"],
  ["chatten", "переписываться в чате"],
  ["glauben", "верить; ich glaube — я думаю"],
  ["der Termin · die Termine", "назначенная встреча, запись на приём"],
  ["das Geschäft · die Geschäfte", "магазин; дело"],
  ["die Bibliothek · die Bibliotheken", "библиотека"],
  ["geschlossen", "закрыто"],
  ["öffnen", "открывать"],
  ["schliessen", "закрывать"],
  ["die Praxis · die Praxen", "кабинет врача, врачебная практика"],
  ["der Tag · die Tage", "день"],
  ["jeder / jede / jedes", "каждый, каждая, каждое"],
  ["die Kita · die Kitas", "детский сад, учреждение дневного ухода за детьми"],
  ["bringen", "приносить, приводить, отвозить"],
  ["abholen", "забирать, забирать кого-то откуда-то"],
  ["mehr", "больше"],
  ["das Beispiel · die Beispiele", "пример"],
  ["zum Beispiel", "например (сокращение z. B.)"],
  ["wieder", "снова"],
  ["der Freund · die Freunde", "друг"],
  ["die Freundin · die Freundinnen", "подруга"],
  ["fragen", "спрашивать"],
  ["antworten", "отвечать"],
  ["total", "совсем, совершенно"]
);

course[5].words.push(
  ["der Ausflug · die Ausflüge", "поездка, вылазка, экскурсия"],
  ["das Auto · die Autos", "машина"],
  ["wandern", "ходить в пешие походы"],
  ["das Picknick · die Picknicks", "пикник"],
  ["die Gitarre · die Gitarren", "гитара"],
  ["telefonieren", "говорить по телефону"],
  ["scheinen", "светить (о солнце)"],
  ["regnen", "идти (о дожде)"],
  ["viel / viele", "много"],
  ["die Wolke · die Wolken", "облако"],
  ["losgehen", "отправляться, трогаться с места"],
  ["vergessen", "забывать"],
  ["der Durst", "жажда"],
  ["das Wienerli · die Wienerli", "венская сосиска (в Швейцарии)"],
  ["die Nachricht · die Nachrichten", "сообщение, новость"],
  ["das Grad", "градус; 25 Grad — 25 градусов"],
  ["warm", "тепло, тёплый"],
  ["kalt", "холодно, холодный"],
  ["schneien", "идти (о снеге)"],
  ["bewölkt", "облачно, пасмурно"],
  ["der Wetterbericht · die Wetterberichte", "прогноз погоды"],
  ["vor allem", "прежде всего, особенно"],
  ["Ost-", "восточно-, например Ostschweiz — Восточная Швейцария"],
  ["fallen", "падать; в прогнозе — выпадать"],
  ["bleiben", "оставаться"],
  ["der Osten", "восток"],
  ["stark", "сильный, сильно"],
  ["sonnig", "солнечно, солнечный"],
  ["die Temperatur · die Temperaturen", "температура"],
  ["steigen", "подниматься, расти"],
  ["sinken", "снижаться, падать"],
  ["plus", "плюс, выше нуля"],
  ["minus", "минус, ниже нуля"],
  ["der Schnee", "снег"],
  ["das Radio · die Radios", "радио"],
  ["das Internet", "интернет"],
  ["der Sommer · die Sommer", "лето"],
  ["heiss", "жаркий, горячий"],
  ["der Frühling · die Frühlinge", "весна"],
  ["der Herbst · die Herbste", "осень"],
  ["schlecht", "плохой, плохо"],
  ["der Winter · die Winter", "зима"],
  ["der Wind · die Winde", "ветер"],
  ["angenehm", "приятный, приятно"],
  ["sehen", "видеть"],
  ["die Speisekarte · die Speisekarten", "меню в кафе или ресторане"],
  ["der Hamburger · die Hamburger", "гамбургер"],
  ["die Speise · die Speisen", "блюдо"],
  ["die Bratwurst · die Bratwürste", "колбаска для жарки"],
  ["die Pommes frites", "картофель фри"],
  ["die Portion · die Portionen", "порция"],
  ["der Ketchup", "кетчуп"],
  ["das Sandwich · die Sandwiches", "сэндвич"],
  ["der Schinken · die Schinken", "ветчина"],
  ["der Salat · die Salate", "салат"],
  ["das Getränk · die Getränke", "напиток"],
  ["das Cola · die Colas", "кола (швейцарский вариант артикля)"],
  ["die Glace · die Glacen", "мороженое (в Швейцарии)"],
  ["lieber", "охотнее, предпочитаю"],
  ["warum", "почему"],
  ["der Hund · die Hunde", "собака"],
  ["tanzen", "танцевать"],
  ["schwimmen", "плавать"],
  ["das Fahrrad · die Fahrräder", "велосипед"],
  ["das Velo · die Velos", "велосипед (в Швейцарии)"],
  ["grillieren", "готовить на гриле (в Швейцарии)"],
  ["der Krimi · die Krimis", "детектив, детективный фильм"],
  ["Lieblings-", "любимый-, например Lieblingsfilm — любимый фильм"],
  ["der Film · die Filme", "фильм"],
  ["wichtig", "важный, важно"],
  ["sammeln", "собирать, коллекционировать"],
  ["der Beruf · die Berufe", "профессия"],
  ["das Foto · die Fotos", "фотография"],
  ["gefallen", "нравиться"],
  ["fotografieren", "фотографировать"],
  ["der Spass", "веселье, удовольствие"],
  ["das Smartphone · die Smartphones", "смартфон"],
  ["dumm", "глупый; Wie dumm! — «Вот досада!»"],
  ["oft", "часто"],
  ["meinen", "считать, иметь в виду"],
  ["der Würfel · die Würfel", "игральный кубик"],
  ["das Spiel · die Spiele", "игра"],
  ["leider", "к сожалению"],
  ["das Problem · die Probleme", "проблема"],
  ["immer", "всегда"],
  ["dabei", "при себе, с собой"],
  ["vielleicht", "может быть"],
  ["einfach", "простой; просто"],
  ["schnell", "быстрый; быстро"]
);

course[6].words.push(
  ["das Team · die Teams", "команда"],
  ["wecken", "будить; hat geweckt — разбудил"],
  ["das Frühstück · die Frühstücke", "завтрак"],
  ["fertig sein", "быть готовым"],
  ["Was ist los?", "Что случилось? Что происходит?"],
  ["die Mathematik", "математика"],
  ["auf keinen Fall", "ни в коем случае"],
  ["auf jeden Fall", "в любом случае, обязательно"],
  ["nach Hause", "домой"],
  ["der Arzt · die Ärzte", "врач"],
  ["die Ärztin · die Ärztinnen", "врач (женщина)"],
  ["der Ski · die Skis", "лыжа; Ski fahren — кататься на лыжах"],
  ["backen", "печь; hat gebacken — испёк"],
  ["singen", "петь; hat gesungen — спел"],
  ["reiten", "ездить верхом; ist geritten — ехал верхом"],
  ["das Klavier · die Klaviere", "пианино"],
  ["malen", "рисовать красками; hat gemalt — нарисовал"],
  ["Tennis spielen", "играть в теннис"],
  ["endlich", "наконец"],
  ["das Lied · die Lieder", "песня"],
  ["üben", "упражняться; hat geübt — потренировался"],
  ["der Text · die Texte", "текст"],
  ["die Übung · die Übungen", "упражнение"],
  ["der Brief · die Briefe", "письмо"],
  ["das Diktat · die Diktate", "диктант"],
  ["schreiben", "писать; hat geschrieben — написал"],
  ["das Buch · die Bücher", "книга"],
  ["schade", "жаль"],
  ["der Kilometer · die Kilometer", "километр"],
  ["die Kommunikation", "общение"],
  ["lieb", "дорогой, милый; Liebe Eltern — «Дорогие родители»"],
  ["die Klasse · die Klassen", "класс"],
  ["der Schüler · die Schüler", "ученик"],
  ["die Schülerin · die Schülerinnen", "ученица"],
  ["die Schulreise · die Schulreisen", "школьная поездка"],
  ["das Billett · die Billette", "билет (в Швейцарии)"],
  ["abfahren", "отправляться (о транспорте); ist abgefahren — отправился"],
  ["zurückkommen", "возвращаться; ist zurückgekommen — вернулся"],
  ["mitnehmen", "брать с собой; hat mitgenommen — взял с собой"],
  ["das Znüni", "утренний перекус (в Швейцарии)"],
  ["die Primarschule · die Primarschulen", "начальная школа (в Швейцарии)"],
  ["mitkommen", "пойти или поехать вместе; ist mitgekommen — пошёл вместе"],
  ["leidtun", "вызывать сожаление; Das tut mir leid. — «Мне жаль»"],
  ["Gitarre spielen", "играть на гитаре"],
  ["Velo fahren", "ездить на велосипеде"],
  ["Freunde treffen", "встречаться с друзьями"],
  ["Ski fahren", "кататься на лыжах"],
  ["los sein", "происходить, случаться"],
  ["das Tennis", "теннис"]
);

// A short reference based on the grammar overview on pages 204–207.
const grammarReview = [
  ["Где ставить глагол?", "Возьми Ich kaufe Brot. Начни со времени: Am Freitag kaufe ich Brot. Или задай вопрос с Was: Was kaufst du? В обоих случаях глагол второй. А в вопросе на «да» или «нет» он первый: Kaufst du Brot?", "Am Freitag kaufe ich Brot. Was kaufst du? Kaufst du Brot?", [
    ["Что делаем?", "Первое место", "Дальше"],
    ["Рассказываем", "Am Freitag", "kaufe ich Brot."],
    ["Спрашиваем «что?»", "Was", "kaufst du?"],
    ["Ждём «да» или «нет»", "Kaufst", "du Brot?"]
  ]],
  ["Слова с артиклем", "Учи слова парами: der Sohn — die Söhne. Тогда легче сказать mein Sohn и заменить слово на er. Если детей несколько, получится meine Kinder и sie.", "Das ist meine Lampe. Sie ist neu.", [
    ["Один", "Несколько"],
    ["der Sohn", "die Söhne"], ["das Brot", "die Brote"], ["die Banane", "die Bananen"], ["das Zimmer", "die Zimmer"]
  ]],
  ["Der → den", "Der Tee ist heiss — говорим про чай. Ich nehme den Tee — чай теперь то, что я беру. Для мужского рода в этой роли бери den, einen, keinen.", "Der Tee ist heiss. Ich nehme den Tee.", [
    ["Род", "Когда предмет главный", "Когда беру или вижу"],
    ["мужской", "der / ein / kein", "den / einen / keinen"],
    ["средний", "das / ein / kein", "das / ein / kein"],
    ["женский", "die / eine / keine", "die / eine / keine"],
    ["множественное число", "die / — / keine", "die / — / keine"]
  ]],
  ["Nicht, kein и doch", "Дивана нет — kein Sofa. Диван есть, но цвет другой — nicht blau. На Hast du keinen Hunger? скажи Doch, ich habe Hunger, если на самом деле голоден.", "Hast du keinen Hunger? Doch, ich habe Hunger."],
  ["Формы для du", "Посмотри на форму с ich, потом попробуй с du. Ich arbeite → du arbeitest. Ich lese → du liest. У sein и haben выучи готовые пары: ich bin → du bist, ich habe → du hast.", "Ich bin hier. Du bist dort. Er ist zu Hause.", [
    ["Кто?", "sein", "haben", "lesen", "nehmen"],
    ["ich", "bin", "habe", "lese", "nehme"], ["du", "bist", "hast", "liest", "nimmst"],
    ["er / sie / es", "ist", "hat", "liest", "nimmt"], ["wir", "sind", "haben", "lesen", "nehmen"],
    ["ihr", "seid", "habt", "lest", "nehmt"], ["sie / Sie", "sind", "haben", "lesen", "nehmen"]
  ]],
  ["Приставка или второй глагол?", "В Ich rufe dich an в конце приставка. В Ich kann dich anrufen целый anrufen идёт в конец, потому что kann — модальный глагол. Сравни вопросы Rufst du an? и Kannst du anrufen?", "Rufst du heute an? Kannst du später anrufen? Ich möchte heute einkaufen."],
  ["Расскажи про вчера", "Возьми hat gelesen и ist gegangen. Если история про тебя, получится ich habe gelesen или ich bin gegangen. Начни с Gestern и посмотри: habe и bin всё равно вторые.", "Gestern habe ich gelesen. Heute bin ich nach Hause gegangen.", [
    ["Глагол", "Perfekt с er"],
    ["lernen", "hat gelernt"], ["machen", "hat gemacht"], ["treffen", "hat getroffen"], ["trinken", "hat getrunken"],
    ["sprechen", "hat gesprochen"], ["schreiben", "hat geschrieben"], ["gehen", "ist gegangen"], ["fahren", "ist gefahren"], ["kommen", "ist gekommen"]
  ]],
  ["Дни и часы", "Am Dienstag — во вторник, um neun Uhr — в девять. Von neun bis elf — с девяти до одиннадцати. Для ночи запомни in der Nacht.", "Am Dienstag beginnt der Kurs um neun Uhr. Er dauert von neun bis elf Uhr."]
];

const finalTest = [
  ["Wie ___ du? (Как тебя зовут?)", "heisst", "С du — heisst.", "choice", ["heisst","heisse","heissen"]],
  ["Я из Австрии. (используй kommen)", "Ich komme aus Österreich", "Aus отвечает на вопрос «откуда».", "translate"],
  ["Выбери «мои дети».", "meine Kinder", "Множественное число требует meine.", "choice", ["mein Kinder", "meine Kinder", "deine Kinder"]],
  ["Собери фразу «Её зовут Миа».", "Sie heisst Mia", "Sie — она, heisst — форма для третьего лица.", "order", ["Mia", "Sie", "heisst"]],
  ["Выбери правильный артикль: Das ist ___ Birne. (Это не груша.)", "keine", "Birne женского рода: keine Birne.", "choice", ["keine","kein","keinen"]],
  ["Выбери то, что услышишь.", "Ich möchte drei Tomaten", "Tomaten — множественное число от Tomate.", "listen", ["Ich möchte drei Tomaten","Ich möchte zwei Tomaten","Ich möchte vier Tomaten"]],
  ["Wo ist die Küche? — ___ ist hier.", "Sie", "Die Küche заменяем словом sie.", "choice", ["Sie","Er","Es"]],
  ["Как сказать «Диван не дорогой»?", "Das Sofa ist nicht teuer.", "Nicht ставим перед teuer.", "choice", ["Das Sofa ist kein teuer.", "Das Sofa nicht ist teuer.", "Das Sofa ist nicht teuer."]],
  ["Собери фразу «В восемь часов я встаю». Начни с Um acht Uhr.", "Um acht Uhr stehe ich auf", "Глагол после времени, приставка в конце.", "order", ["ich", "auf", "Um acht Uhr", "stehe"]],
  ["Выбери часы работы для таблички «von neun bis siebzehn Uhr».", "09:00–17:00", "Von … bis обозначает промежуток: с девяти до семнадцати.", "choice", ["07:00–09:00", "09:00–17:00", "05:00–09:00"]],
  ["Ich nehme ___ Salat. (Вставь неопределённый артикль.)", "einen", "Salat мужского рода и стоит в Akkusativ.", "choice", ["einen","ein","eine"]],
  ["Hast du keine Zeit? — ___, ich habe Zeit.", "Doch", "Doch возражает на отрицание в вопросе.", "choice", ["Doch","Nein","Bitte"]],
  ["Я хочу учить немецкий. (используй wollen)", "Ich will Deutsch lernen", "Will спрягается, lernen остаётся в конце.", "translate"],
  ["Выбери вспомогательный глагол: Wir ___ zu Fuss gekommen.", "sind", "Kommen образует Perfekt с sein. С wir — sind.", "choice", ["sind","haben","seid"]]
];

course[2].theory.push([
  "Сколько штук?",
  "Wie viele Brötchen? Вопрос о количестве булочек. Две булочки? Ответь Zwei, bitte.\n\nWie viel? подходит для цены или количества, которое меряют. Сравни Wie viele Brötchen? и Wie viel kostet das? Первый вопрос про штуки, второй про деньги.",
  "Ich möchte zwei Brötchen, bitte. Wie viel kostet das?"
]);
course[4].theory.push([
  "На вокзале",
  "Не знаешь время отправления? Спроси Wann fährt der Zug ab? Нужен номер пути? Von welchem Gleis fährt der Zug?\n\nВ ответ часто говорят только главное: Um zehn Uhr. Von Gleis zwei. Обрати внимание на два числа: одно обозначает время, другое — номер пути.",
  "Wann fährt der Zug ab? Um zehn Uhr, von Gleis zwei."
]);
course[6].theory.push([
  "Звонок в школу или на курс",
  "Сначала представься: Guten Morgen, hier ist Anna Keller. Затем скажи, что случилось: Ich bin krank или Meine Tochter ist krank.\n\nЗакончи тем, зачем позвонил. О себе: Ich kann heute nicht kommen. О дочери: Sie kann heute nicht kommen.",
  "Guten Morgen. Hier ist Anna Keller. Meine Tochter ist krank. Sie kann heute nicht kommen."
]);

// Map each exercise to the explanation that helps with its likely mistake.
const practiceRules = [
  [4, 1, 4, 1, 2, 5, 3, 4],
  [0, 5, 1, 2, 2, 7, 4, 4],
  [0, 5, 3, 5, 5, 2, 6, 3],
  [0, 4, 5, 4, 1, 2, 6, 5],
  [7, 1, 6, 8, 6, 6, 1, 4],
  [4, 5, 3, 2, 6, 2, 4, 2],
  [0, 0, 6, 2, 0, 2, 6, 7]
];

// Optional lesson cards add a translation and a self-check to the usual example.
const theoryExtensions = [
  [
    ["Кто, где, откуда?", "Чтобы узнать, где человек живёт, начни с Wo. Чтобы узнать, откуда он родом, начни с Woher. Сравни ответы: Ich wohne in Uznach и Ich komme aus Spanien.\n\nС остальными вопросами порядок тот же: вопросительное слово, потом глагол. Wer ist das? Wie heisst du? Was ist das?", "Wo wohnen Sie? Woher kommen Sie?", [
      ["Слово", "Что спрашивает", "Пример"],
      ["wer", "кто", "Wer ist das?"], ["wie", "как", "Wie heisst du?"], ["wo", "где", "Wo wohnst du?"], ["woher", "откуда", "Woher kommst du?"], ["was", "что", "Was ist das?"]
    ], "", { translation: "Где вы живёте? Откуда вы родом?", check: ["Как спросить у друга, откуда он?", "Woher kommst du? Woher спрашивает о происхождении."] }],
    ["Как представиться", "На первой встрече хватит одной фразы: Ich heisse Mia («Меня зовут Миа») или Ich bin Mia («Я Миа»). Можно ещё Mein Name ist Mia.\n\nПочему ist? Подлежащее Mein Name стоит в единственном числе. Поэтому используется ist, как в Der Name ist kurz.", "Ich heisse Mia. Mein Name ist Mia.", null, "", { translation: "Меня зовут Миа. Моё имя — Миа.", check: ["Почему в Mein Name ist Mia используется ist?", "Mein Name — «моё имя», это как er. Поэтому ist, как в er ist."] }],
    ["Как переспросить", "Если не расслышал, скажи Wie bitte? Если собеседник спешит, добавь Langsam, bitte. Чтобы узнать написание, спроси Können Sie Ihren Namen buchstabieren?\n\nВ швейцарском написании используются формы heissen и Strasse. Буквы ä, ö и ü сохраняются.", "Wie bitte? Können Sie Ihren Namen buchstabieren?", null, "", { translation: "Простите? Можете произнести своё имя по буквам?", check: ["Что сказать, если собеседник говорит быстро?", "Langsam, bitte. — «Медленнее, пожалуйста»."] }]
  ],
  [
    ["Das ist или das sind?", "Показываешь на брата: Das ist mein Bruder. Показываешь на родителей: Das sind meine Eltern. В обоих случаях используем Das. С одним человеком будет ist, с несколькими — sind.\n\nЕсли сомневаешься, посчитай: одна сестра — ist, две сестры — sind.", "Das ist meine Schwester. Das sind meine Geschwister.", null, "", { translation: "Это моя сестра. Это мои братья и сёстры.", check: ["Das ___ meine Grosseltern. Ist или sind?", "Sind, потому что die Grosseltern — множественное число."] }],
    ["Она, они или Вы?", "В начале предложения Sie всегда с большой буквы. Подсказку даёт глагол: Sie wohnt — «она живёт». Sie wohnen — «они живут» или «Вы живёте».\n\nЕсли вопрос обращён прямо к собеседнику — Wo wohnen Sie? — это вежливое «Вы». В рассказе о соседях Sie wohnen скорее значит «они живут».", "Sie wohnt in Bern. Ihre Eltern wohnen in Basel.", null, "", { translation: "Она живёт в Берне. Её родители живут в Базеле.", check: ["В Sie leben in Bern речь об одной женщине?", "Форма leben здесь означает «они живут» или «вы живёте». Для одной женщины было бы Sie lebt."] }],
    ["Числа и телефон", "Номер можно назвать по цифрам: null, sieben, neun. Так проще и сказать, и записать.\n\nВ числах от 13 до 19 узнавай -zehn. У 16 и 17 начало чуть короче: sechzehn, siebzehn. Услышал zwölf — пишешь 12, услышал zwanzig — 20.", "Meine Nummer beginnt mit null, sieben, neun.", [
      ["Цифры", "По-немецки"],
      ["0–4", "null, eins, zwei, drei, vier"], ["5–9", "fünf, sechs, sieben, acht, neun"],
      ["10–14", "zehn, elf, zwölf, dreizehn, vierzehn"], ["15–20", "fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn, zwanzig"]
    ], "", { translation: "Мой номер начинается с нуля, семёрки, девятки.", check: ["Как сказать «мне семнадцать лет»?", "Ich bin siebzehn Jahre alt. Возраст говорим с bin."] }]
  ],
  [
    ["Когда нужен артикль?", "Показываешь одно яйцо — ein Ei. Покупаешь молоко вообще — Wir kaufen Milch. Артикль не обязателен, если речь просто о продукте.\n\nЕсли молока нет, скажи Wir haben keine Milch. С яйцами тоже: Wir haben Eier → Wir haben keine Eier.", "Das ist ein Ei. Wir haben keine Eier.", [
      ["Слово", "Один предмет", "Отрицание"],
      ["der Apfel", "ein Apfel", "kein Apfel"], ["das Ei", "ein Ei", "kein Ei"],
      ["die Birne", "eine Birne", "keine Birne"], ["die Eier", "Eier", "keine Eier"]
    ], "", { translation: "Это яйцо. У нас нет яиц.", check: ["Как сказать «Это не груша»?", "Das ist keine Birne. У Birne артикль die."] }],
    ["Два яйца, три булочки", "Ein Ei превращается в zwei Eier, у Apfel меняется гласная: zwei Äpfel. Форма Brötchen во множественном числе не меняется: ein Brötchen, zwei Brötchen.\n\nУчи слова парами и обращай внимание на глагол: одна булочка kostet, несколько kosten.", "Ein Brötchen kostet zwei Franken. Drei Brötchen kosten sechs Franken.", null, "", { translation: "Одна булочка стоит два франка. Три булочки стоят шесть франков.", check: ["Как сказать «два яйца»?", "Zwei Eier. Die Eier — множественное число от das Ei."] }],
    ["У прилавка", "Начни с Grüezi! Ich möchte zwei Brötchen, bitte. Продавец спросит Sonst noch etwas? — «Что-нибудь ещё?» Если всё, скажи Das ist alles, danke.\n\nНе видишь товар? Спроси Wo finde ich …? Видишь товар, но не видишь цену? Was kostet das?", "Wo finde ich den Zucker? Was kostet die Milch?", null, "", { translation: "Где найти сахар? Сколько стоит молоко?", check: ["Что значит Sonst noch etwas?", "«Что-нибудь ещё?» Можно ответить Das ist alles, danke."] }]
  ],
  [
    ["Er, es или sie?", "Вместо названия предмета можно поставить местоимение. Выбирай его по немецкому роду: der Schlüssel → er, das Sofa → es, die Lampe → sie.\n\nДля нескольких предметов тоже sie, но глагол будет sind. Die Lampe ist dort. Sie ist dort. Die Stühle sind hier. Sie sind hier.", "Wo ist der Schlüssel? Er ist hier. Wo sind die Stühle? Sie sind dort.", [
      ["Предмет", "Короткое слово", "Пример"],
      ["der Tisch", "er", "Er ist neu."], ["das Bett", "es", "Es ist gross."], ["die Lampe", "sie", "Sie ist hell."], ["die Stühle", "sie", "Sie sind bequem."]
    ], "", { translation: "Где ключ? Он здесь. Где стулья? Они там.", check: ["Wo ist das Bett? ___ ist dort.", "Es ist dort. Das Bett → es."] }],
    ["Nicht или kein?", "Диван есть, но он серый: Das Sofa ist nicht blau. Дивана вообще нет: Wir haben kein Sofa.\n\nСпроси себя, что ты отрицаешь. «Не синий» — описание, поэтому nicht. «Нет дивана» — отсутствует предмет, поэтому kein.", "Die Küche ist nicht gross. Wir haben keine Spülmaschine.", null, "", { translation: "Кухня не большая. У нас нет посудомоечной машины.", check: ["Как сказать «Стол не новый»?", "Der Tisch ist nicht neu. Отрицаем описание neu."] }],
    ["Объявление о квартире", "В объявлении обычно указаны цена, количество комнат и дата, с которой доступна квартира. 2-Zimmer-Wohnung — двухкомнатная квартира. Pro Monat — в месяц. Ab Mai — с мая. Möbliert — с мебелью.\n\nКогда позвонишь, начни с Ist die Wohnung noch frei? Если свободна, можно уточнить Wie hoch ist die Miete? Для цены пригодятся hundert — сто, tausend — тысяча и eine Million — миллион.", "Ist die Wohnung noch frei? Wie hoch ist die Miete?", null, "", { translation: "Квартира ещё свободна? Какая арендная плата?", check: ["Что значит ab sofort в объявлении?", "«Сразу», «уже сейчас». Квартира доступна прямо сейчас."] }]
  ],
  [
    ["Приставка в вопросе", "Из Du stehst früh auf сделай два вопроса: Stehst du früh auf? и Wann stehst du auf? В вопросе на «да» или «нет» stehst стоит первым, а после Wann — вторым.\n\nВ обоих вопросах приставка auf стоит в конце.", "Ich stehe früh auf. Stehst du früh auf? Wann stehst du auf?", null, "", { translation: "Я встаю рано. Ты встаёшь рано? Когда ты встаёшь?", check: ["Где поставить an в вопросе Wann fängt der Kurs …?", "В самом конце: Wann fängt der Kurs an?"] }],
    ["Часы и встреча", "Es ist acht Uhr — сейчас восемь. Der Kurs beginnt um acht Uhr — курс начинается в восемь. В ответе на «во сколько?» появляется um.\n\nНа двери ищи geöffnet («открыто») и geschlossen («закрыто»). Если видишь ab neun Uhr, значит с девяти.", "Es ist Viertel nach acht. Der Laden öffnet um halb neun.", [
      ["На часах", "Как сказать"],
      ["08:00", "acht Uhr"], ["08:15", "Viertel nach acht"], ["08:30", "halb neun"], ["08:45", "Viertel vor neun"]
    ], "", { translation: "Сейчас четверть девятого. Магазин открывается в половине девятого.", check: ["Um halb acht — это в 7:30 или в 8:30?", "В 7:30. До восьми ещё полчаса."] }],
    ["Меняем начало фразы", "Ich hole die Kinder um vier Uhr ab. Вынеси время вперёд: Um vier Uhr hole ich die Kinder ab. Hole осталось на втором месте, ab осталось в конце.\n\nПопробуй с Ich koche am Abend. Передвинь Am Abend, за ним поставь koche, затем ich.", "Ich hole die Kinder um vier Uhr ab. Um vier Uhr hole ich die Kinder ab.", null, "", { translation: "Я забираю детей в четыре часа. В четыре часа я забираю детей.", check: ["Начни с Am Abend: Ich koche am Abend.", "Am Abend koche ich."] }]
  ],
  [
    ["Салат и Akkusativ", "Собираешь заказ: Ich nehme … Спроси «Что я беру?» Если это der Salat, нужен einen Salat. Если это die Suppe, остаётся eine Suppe.\n\nПроверь и отрицание: keinen Salat, keine Suppe. Скажи вслух свой заказ: Ich nehme einen Tee und eine Suppe.", "Ich nehme einen Salat. Ich nehme aber keinen Saft.", null, "", { translation: "Я возьму салат. Но сок я не возьму.", check: ["Ich sehe ___ Hund. Ein или einen?", "Einen. Hund — мужского рода, и это тот, кого я вижу."] }],
    ["Да, нет или всё-таки да?", "Сравни Hast du Zeit? и Hast du keine Zeit? Во втором вопросе человек уже предполагает «нет». Если время есть, ответь Doch, ich habe Zeit.\n\nПредставь, что тебе сказали «Ты не придёшь?», а ты отвечаешь «Как раз приду». Вот для этого и нужно doch.", "Hast du keinen Hunger? Doch, ich habe Hunger.", null, "", { translation: "Ты не голоден? Нет, как раз голоден.", check: ["Как ответить на Hast du keine Zeit?, если время у тебя есть?", "Doch, ich habe Zeit."] }],
    ["Что нравится больше?", "Gern — «с удовольствием». Lieber — «охотнее», когда выбираешь из двух дел. Ich schwimme gern. Heute gehe ich lieber ins Kino.\n\nЕсли пошёл дождь, можно сказать Es regnet. Ich gehe lieber ins Kino. Хочешь позвать собеседника с собой? Wollen wir ins Kino gehen?", "Heute ist es kalt. Ich bleibe lieber zu Hause.", null, "", { translation: "Сегодня холодно. Я лучше останусь дома.", check: ["Как сказать «Я люблю плавать» через gern?", "Ich schwimme gern."] }]
  ],
  [
    ["Хочу, могу, хотел бы", "Ich will bezahlen — «Я хочу заплатить». Ich möchte bezahlen — мягче: «Я хотел бы заплатить». Kann ich mit Karte bezahlen? — «Могу я заплатить картой?»\n\nВо всех трёх примерах bezahlen стоит в конце. Меняй первую часть, чтобы поменять смысл или задать вопрос.", "Ich möchte bezahlen. Kann ich mit Karte bezahlen?", null, "", { translation: "Я хотел бы заплатить. Можно заплатить картой?", check: ["Как вежливо сказать «Я хотел бы заказать»?", "Ich möchte bestellen. Bestellen остаётся в конце."] }],
    ["Собираем Perfekt", "Выбери пару: hat gelernt или ist gegangen. Поменяй первую часть под того, о ком говоришь: ich habe gelernt, wir sind gegangen. Вторую часть поставь в конец.\n\nУ lernen форма gelernt начинается с ge-. У einkaufen ge ставится после приставки ein: eingekauft. У глаголов на -ieren ge не добавляется: telefoniert.", "Ich habe eingekauft. Meine Schwester hat telefoniert.", [
      ["Глагол", "Готовая пара"],
      ["lernen", "hat gelernt"], ["schreiben", "hat geschrieben"], ["einkaufen", "hat eingekauft"], ["telefonieren", "hat telefoniert"], ["aufstehen", "ist aufgestanden"]
    ], "", { translation: "Я сходил за покупками. Моя сестра поговорила по телефону.", check: ["Где поставить ge в Perfekt от einkaufen?", "Между ein и kauf: Ich habe eingekauft."] }],
    ["Вопрос о вчерашнем", "Du bist gestern gekommen. Чтобы спросить, вынеси bist вперёд: Bist du gestern gekommen? Gekommen осталось на месте.\n\nЕсли ты не пришёл, скажи Nein, ich bin nicht gekommen. А чтобы узнать «когда», начни с Wann: Wann bist du gekommen?", "Bist du gestern gekommen? Nein, ich bin nicht gekommen.", null, "", { translation: "Ты вчера пришёл? Нет, я не пришёл.", check: ["Как собрать «Вчера я пришёл вовремя», начиная с Gestern?", "Gestern bin ich pünktlich gekommen."] }]
  ]
];

for (const [index, topics] of theoryExtensions.entries()) {
  course[index].theory.push(...topics);
}

const testRules = [
  [1, 1], [1, 2], [2, 0], [1, 1], [3, 5], [3, 3], [4, 4],
  [4, 5], [5, 6], [5, 1], [6, 4], [6, 5], [7, 0], [7, 2]
];
const questionRules = new Map([
  ...course.flatMap((lesson, index) => lesson.practice.map((question, position) => [question, lesson.theory[practiceRules[index][position]]])),
  ...finalTest.map((question, index) => {
    const [lesson, topic] = testRules[index];
    return [question, course[lesson - 1].theory[topic]];
  })
]);

const acceptedTranslations = new Map([
  [course[6].practice[4], ["Heute kann ich nicht kommen"]],
  [course[0].practice[4], ["Aus der Schweiz komme ich"]],
  [course[1].practice[4], ["Deutsch spricht meine Schwester"]],
  [course[5].practice[4], ["Ich lese gerne"]],
  [finalTest[1], ["Aus Österreich komme ich"]],
  [finalTest[12], ["Deutsch will ich lernen"]]
]);

const uznachScenes = [
  {
    id: "bakery", title: "В пекарне", goal: "Закажи булочки или кофе и узнай цену.",
    speaker: "Продавец",
    steps: {
      start: {
        line: "Grüezi! Was möchten Sie?",
        task: ["Выбери, что закажешь.", "Ich möchte Brötchen, bitte.", "Ich möchte — вежливая просьба. После möchte скажи, что хочешь, а в конце можно добавить bitte.", "choice", [
          "Ich möchten Kaffee, bitte.", "Ich möchte Brötchen, bitte.", "Ich möchte Kaffee, bitte."
        ]],
        branches: { "Ich möchte Brötchen, bitte.": "rolls", "Ich möchte Kaffee, bitte.": "coffee" },
        rule: course[2].theory[3]
      },
      rolls: {
        line: "Wie viele Brötchen möchten Sie?",
        task: ["Закажи две булочки. Вставь число словами: Ich möchte ___ Brötchen.", "zwei", "Wie viele? спрашивает о количестве штук. Zwei Brötchen — две булочки.", "choice", ["zwei","drei","vier"]],
        next: "rollPrice", rule: course[2].theory[4]
      },
      coffee: {
        line: "Möchten Sie Milch zum Kaffee?",
        task: ["Собери фразу «Да, с молоком, пожалуйста».", "Ja, mit Milch, bitte.", "Mit значит «с». В живой речи здесь достаточно короткого ответа: Ja, mit Milch, bitte.", "order", ["Milch,", "bitte.", "Ja,", "mit"]],
        next: "coffeePrice", rule: course[2].theory[3]
      },
      rollPrice: {
        line: "Gern. Sonst noch etwas?",
        task: ["Спроси «Сколько это стоит?».", "Wie viel kostet das?", "Wie viel спрашивает о цене. После него идёт kostet, а затем das.", "choice", ["Wie viele kostet das?", "Wie viel kostet das?", "Wo kostet das?"]],
        next: "rollEnd", rule: course[2].theory[4]
      },
      coffeePrice: {
        line: "Der Kaffee kostet vier Franken.",
        task: ["Выбери цену словами: Der Kaffee kostet ___ Franken.", "vier", "Vier — четыре. После kostet можно назвать число и валюту.", "choice", ["vier","zwei","fünf"]],
        next: "coffeeEnd", rule: course[2].theory[2]
      },
      rollEnd: { line: "Zwei Franken, bitte. En Guete!", result: "Ты заказал две булочки и узнал цену. En Guete! — швейцарское пожелание приятного аппетита." },
      coffeeEnd: { line: "Bitte schön, Ihr Kaffee!", result: "Ты заказал кофе, ответил на вопрос о молоке и разобрал цену." }
    }
  },
  {
    id: "station", title: "На вокзале", goal: "Уточни время отправления или найди путь к поезду.",
    speaker: "Сотрудник вокзала",
    steps: {
      start: {
        line: "Guten Tag! Wie kann ich Ihnen helfen?",
        task: ["Выбери, что хочешь узнать о поезде до Рапперсвиля.", "Wann fährt der Zug nach Rapperswil ab?", "Wann спрашивает «когда?», а Von welchem Gleis? — «с какого пути?». В вопросе с abfahren приставка ab остаётся в конце.", "choice", [
          "Von welchem Gleis fährt der Zug nach Rapperswil?", "Wann der Zug nach Rapperswil abfährt?", "Wann fährt der Zug nach Rapperswil ab?"
        ]],
        branches: { "Wann fährt der Zug nach Rapperswil ab?": "time", "Von welchem Gleis fährt der Zug nach Rapperswil?": "platform" },
        rule: course[4].theory[5]
      },
      time: {
        line: "Der Zug fährt um halb zehn ab.",
        task: ["Какое время назвал сотрудник?", "09:30", "Halb zehn — половина десятого, то есть 09:30.", "choice", ["10:30", "09:30", "09:45"]],
        next: "askPlatform", rule: course[4].theory[2]
      },
      platform: {
        line: "Ihr Zug fährt von Gleis zwei.",
        task: ["Подтверди номер пути. Собери «С пути два?».", "Von Gleis zwei", "В ответах на вокзале можно сказать von Gleis … — с пути номер…", "order", ["zwei", "Von", "Gleis"]],
        next: "askTime", rule: course[4].theory[5]
      },
      askPlatform: {
        line: "Möchten Sie noch etwas wissen?",
        task: ["Вставь «путь»: Von welchem ___ fährt der Zug?", "Gleis", "Gleis — путь у платформы. Von welchem Gleis? — с какого пути?", "choice", ["Gleis","Bahnhof","Zug"]],
        next: "platformEnd", rule: course[4].theory[5]
      },
      askTime: {
        line: "Möchten Sie noch etwas wissen?",
        task: ["Собери вопрос «Когда отправляется поезд?».", "Wann fährt der Zug ab", "Wann идёт первым, fährt — вторым, а приставка ab — в конце.", "order", ["der Zug", "ab", "Wann", "fährt"]],
        next: "timeEnd", rule: course[4].theory[0]
      },
      platformEnd: { line: "Von Gleis zwei. Gute Fahrt!", result: "Ты уточнил время отправления и номер пути." },
      timeEnd: { line: "Um halb zehn. Gute Fahrt!", result: "Ты нашёл нужный путь и уточнил время отправления." }
    }
  },
  {
    id: "school", title: "Звонок в школу", goal: "Сообщи, что ребёнок заболел и сегодня не придёт.",
    speaker: "Секретарь школы",
    steps: {
      start: {
        line: "Sekretariat, guten Morgen. Wie kann ich Ihnen helfen?",
        task: ["Выбери, что скажешь про ребёнка.", "Meine Tochter ist krank.", "Tochter — женский род, поэтому meine. Sohn — мужской, поэтому mein.", "choice", [
          "Meine Tochter ist krank.", "Meine Sohn ist krank.", "Mein Sohn ist krank."
        ]],
        branches: { "Meine Tochter ist krank.": "daughter", "Mein Sohn ist krank.": "son" },
        rule: course[1].theory[0]
      },
      daughter: {
        line: "Kann Ihre Tochter heute in die Schule kommen?",
        task: ["Собери «Она сегодня не может прийти».", "Sie kann heute nicht kommen", "Kann стоит после Sie, kommen уходит в конец. Nicht отрицает, что она может прийти сегодня.", "order", ["kommen", "heute", "Sie", "nicht", "kann"]],
        next: "surname", rule: course[6].theory[0]
      },
      son: {
        line: "Kann Ihr Sohn heute in die Schule kommen?",
        task: ["Вставь форму «мочь»: Er ___ heute nicht kommen.", "kann", "С er, как и с ich, используем kann. Второй глагол остаётся в начальной форме: kommen.", "choice", ["kann","kannst","können"]],
        next: "surname", rule: course[6].theory[0]
      },
      surname: {
        line: "Wie ist der Nachname, bitte?",
        task: ["Как ответить «Фамилия — Келлер»?", "Der Nachname ist Keller.", "Nachname — фамилия, Vorname — имя. Когда просят только фамилию, достаточно её назвать.", "choice", [
          "Der Vorname ist Keller.", "Der Nachname ist Keller.", "Woher kommen Sie?"
        ]],
        next: "end", rule: course[6].theory[4]
      },
      end: { line: "Danke für den Anruf. Gute Besserung!", result: "Ты предупредил школу. Gute Besserung! значит «Выздоравливай!»." }
    }
  }
];
// Short examples for words whose use cannot be inferred from an article.
const wordExamples = new Map(`
Grüezi|Grüezi, Frau Keller!
Guten Morgen|Guten Morgen, Paul!
Auf Wiedersehen|Vielen Dank und auf Wiedersehen!
heissen|Ich heisse Nina.
kommen|Ich komme aus Italien.
sprechen|Wir sprechen Deutsch.
aus|Ich komme aus der Schweiz.
buchstabieren|Buchstabieren Sie bitte Ihren Namen.
anschauen|Schau das Bild an.
hören|Ich höre Musik.
noch einmal|Sag das bitte noch einmal.
ankreuzen|Kreuze die richtige Antwort an.
zuordnen|Ordne die Wörter den Bildern zu.
ergänzen|Ergänze den Satz.
machen|Ich mache eine Pause.
lesen|Ich lese ein Buch.
spielen|Wir spielen Fussball.
suchen|Ich suche meine Tasche.
zeigen|Zeig mir bitte das Bild.
fragen|Ich frage meine Lehrerin.
markieren|Markiere das richtige Wort.
nachsprechen|Hör zu und sprich den Satz nach.
raten|Rate mal!
meinen|Was meinst du?
sagen|Sag bitte deinen Namen.
notieren|Ich notiere die Telefonnummer.
vergleichen|Wir vergleichen die Antworten.
schreiben|Ich schreibe einen Brief.
variieren|Wir variieren den Dialog.
erzählen|Ich erzähle von meiner Familie.
arbeiten|Ich arbeite in Uznach.
zeichnen|Ich zeichne ein Haus.
verbinden|Verbinde die Wörter mit den Bildern.
richtig|Die Antwort ist richtig.
ich|Ich wohne hier.
sein|Ich bin müde.
und|Ich kaufe Brot und Milch.
ein bisschen|Ich spreche ein bisschen Deutsch.
Guten Tag|Guten Tag, Herr Meier!
Hallo|Hallo, wie geht es dir?
Tschüss|Tschüss, bis morgen!
Guten Abend|Guten Abend, Frau Keller!
willkommen|Willkommen in Uznach!
bei|Ich bin bei meiner Schwester.
international|Der Kurs ist international.
danke|Danke für deine Hilfe!
Gute Nacht|Gute Nacht, bis morgen!
wie|Wie heissen Sie?
Sie|Sprechen Sie Deutsch?
wer|Wer ist das?
ja|Ja, das stimmt.
stimmen|Das stimmt.
nein|Nein, danke.
nicht|Das Zimmer ist nicht teuer.
woher|Woher kommst du?
du|Wo wohnst du?
aha|Aha, jetzt verstehe ich!
toll|Das ist toll!
interessant|Der Film ist interessant.
nur|Ich möchte nur Wasser.
was|Was möchtest du?
auch|Ich komme auch.
Wie bitte?|Wie bitte? Können Sie das wiederholen?
bitte|Einen Tee, bitte.
da sein|Meine Schwester ist schon da.
gut|Mir geht es gut.
Vielen Dank|Vielen Dank für den Anruf!
Auf Wiederhören|Danke für den Anruf. Auf Wiederhören!
wohnen|Wir wohnen in Uznach.
haben|Wir haben zwei Kinder.
zwölf|Meine Tochter ist zwölf Jahre alt.
lernen|Ich lerne Deutsch.
alt|Wie alt bist du?
leben|Meine Eltern leben in Bern.
in|Ich wohne in Uznach.
super|Der Kurs ist super!
sehr|Die Wohnung ist sehr hell.
ach|Ach, das ist schade.
so|Das ist nicht so teuer.
mein / meine|Das ist mein Bruder, und das ist meine Schwester.
dein / deine|Wo ist dein Buch? Wo ist deine Tasche?
Ihr / Ihre|Wie ist Ihr Name? Wie ist Ihre Adresse?
falsch|Die Nummer ist falsch.
genau|Ja, genau so!
sie|Sie wohnt in Bern. Ihre Eltern wohnen auch dort.
zusammen|Wir wohnen zusammen.
geschieden|Meine Eltern sind geschieden.
er|Er kommt aus Spanien.
jetzt|Ich gehe jetzt nach Hause.
ihr|Wo wohnt ihr?
wir|Wir lernen zusammen.
wo|Wo ist die Küche?
geboren|Ich bin in Bern geboren.
verheiratet|Sie ist verheiratet.
ledig|Er ist ledig.
verwitwet|Meine Grossmutter ist verwitwet.
lange|Wir wohnen schon lange hier.
Nord-|Sie wohnt in Norddeutschland.
Süd-|Er wohnt in Süddeutschland.
ein Kilo|Ich möchte ein Kilo Äpfel.
kosten|Was kostet das Brot?
Ich möchte …|Ich möchte zwei Brötchen, bitte.
brauchen|Wir brauchen Milch.
kaufen|Ich kaufe ein Brot.
helfen|Kann ich Ihnen helfen?
natürlich|Ja, natürlich!
hier|Hier ist Ihr Kaffee.
ein / eine|Das ist ein Ei und eine Tomate.
kein / keine|Ich habe kein Brot und keine Milch.
wie viel|Wie viel kostet das?
noch|Ich brauche noch zwei Eier.
alles|Das ist alles, danke.
finden|Wo finde ich die Milch?
gern|Ich lese gern.
für|Das Getränk ist für dich.
dort|Dort ist der Bahnhof.
teuer|Die Wohnung ist teuer.
neu|Der Kühlschrank ist neu.
gross|Das Zimmer ist gross.
klein|Die Küche ist klein.
hell|Das Wohnzimmer ist hell.
dunkel|Im Gang ist es dunkel.
billig|Der Stuhl ist billig.
schön|Der Balkon ist schön.
hässlich|Ich finde das Sofa hässlich.
kennen|Ich kenne den Lehrer.
aber|Das Zimmer ist klein, aber hell.
schmal|Der Gang ist schmal.
breit|Der Tisch ist zu breit.
gefallen|Das Sofa gefällt mir.
schlecht|Das Wetter ist schlecht.
modern|Die Küche ist modern.
schwarz|Der Tisch ist schwarz.
grau|Das Sofa ist grau.
weiss|Die Wände sind weiss.
grün|Die Tür ist grün.
braun|Der Schrank ist braun.
blau|Mein Zimmer ist blau.
rot|Die Lampe ist rot.
gelb|Die Wand ist gelb.
hellrot|Die Küche hat eine hellrote Tür.
dunkelbraun|Der Schrank ist dunkelbraun.
mal|Das Zimmer ist drei mal vier Meter gross.
nett|Die Nachbarin ist nett.
vermieten|Wir vermieten eine kleine Wohnung.
circa|Die Wohnung ist circa 60 Quadratmeter gross.
privat|Das Zimmer ist von privat.
ab|Die Wohnung ist ab Mai frei.
sofort|Das Zimmer ist sofort frei.
maximal|Die Miete kostet maximal 900 Franken.
möbliert|Die Wohnung ist möbliert.
bezahlen|Ich bezahle die Miete.
verkaufen|Wir verkaufen das Sofa.
etwas|Möchten Sie noch etwas?
heute|Heute kommt der Vermieter.
welche|Welche Farbe hat die Wand?
also|Also, ich nehme das Zimmer.
ungefähr|Das Sofa ist ungefähr zwei Meter lang.
lang|Das Bett ist zwei Meter lang.
hoch|Wie hoch ist der Schrank?
morgen|Morgen besichtigen wir die Wohnung.
aufstehen|Ich stehe um sieben Uhr auf.
aufräumen|Ich räume mein Zimmer auf.
anfangen|Der Kurs fängt um neun Uhr an.
fernsehen|Abends sehe ich fern.
schlafen|Am Sonntag schlafe ich lange.
halb neun|Der Kurs beginnt um halb neun.
geöffnet|Die Bibliothek ist bis acht Uhr geöffnet.
frühstücken|Wir frühstücken um acht Uhr.
einkaufen|Am Samstag kaufe ich ein.
kochen|Heute koche ich eine Suppe.
spazieren gehen|Wir gehen am Abend spazieren.
gehen|Ich gehe zu Fuss zur Schule.
oder|Möchtest du Tee oder Kaffee?
müde|Am Abend bin ich müde.
anrufen|Ich rufe dich morgen an.
früh|Am Montag stehe ich früh auf.
mit|Ich frühstücke mit meiner Familie.
essen|Wir essen um zwölf Uhr.
spät|Heute komme ich spät nach Hause.
schon|Es ist schon neun Uhr.
erst|Es ist erst sieben Uhr.
vor|Es ist Viertel vor neun.
nach|Es ist Viertel nach acht.
halb|Es ist halb zwei.
kurz|Es ist kurz vor zehn.
gleich|Ich komme gleich.
wann|Wann fängt der Kurs an?
um|Der Kurs beginnt um acht Uhr.
enden|Der Kurs endet um zwölf Uhr.
von … bis …|Der Laden ist von acht bis sechs Uhr geöffnet.
am|Am Montag arbeite ich.
trinken|Ich trinke ein Glas Wasser.
chatten|Ich chatte mit einer Freundin.
glauben|Ich glaube, der Laden ist offen.
geschlossen|Am Sonntag ist die Praxis geschlossen.
öffnen|Die Bibliothek öffnet um neun Uhr.
schliessen|Der Laden schliesst um sechs Uhr.
jeder / jede / jedes|Ich lerne jeden Tag Deutsch.
bringen|Ich bringe meine Tochter zur Schule.
abholen|Ich hole meinen Sohn ab.
mehr|Ich möchte mehr Wasser.
zum Beispiel|Ich lese gern, zum Beispiel Krimis.
wieder|Morgen sehen wir uns wieder.
antworten|Bitte antworte auf meine Frage.
total|Ich bin heute total müde.
windig|Heute ist es windig.
treffen|Ich treffe am Samstag eine Freundin.
fahren|Wir fahren mit dem Velo.
nehmen|Ich nehme einen Tee.
doch|Du liest nicht gern? Doch, ich lese gern!
wandern|Wir wandern in den Bergen.
telefonieren|Ich telefoniere mit meiner Schwester.
scheinen|Die Sonne scheint.
regnen|Es regnet schon wieder.
viel / viele|Hier gibt es viel Regen und viele Wolken.
losgehen|Wir gehen um acht Uhr los.
vergessen|Ich vergesse oft meinen Schlüssel.
warm|Am Nachmittag ist es warm.
kalt|Im Winter ist es kalt.
schneien|Heute schneit es.
bewölkt|Morgen ist es bewölkt.
vor allem|Im Frühling regnet es vor allem im Westen.
Ost-|Uznach liegt in der Ostschweiz.
fallen|Am Abend fällt Schnee.
bleiben|Es bleibt heute warm.
stark|Der Wind ist stark.
sonnig|Am Samstag ist es sonnig.
steigen|Die Temperatur steigt auf zwanzig Grad.
sinken|In der Nacht sinkt die Temperatur.
plus|Heute sind es plus fünf Grad.
minus|Morgen sind es minus drei Grad.
heiss|Im Sommer ist es oft heiss.
angenehm|Die Temperatur ist angenehm.
sehen|Siehst du den See?
lieber|Ich möchte lieber Tee.
warum|Warum ist der Laden geschlossen?
tanzen|Meine Schwester tanzt gern.
schwimmen|Im Sommer schwimme ich im See.
grillieren|Wir grillieren am Samstag.
Lieblings-|Mein Lieblingsfilm ist sehr lustig.
wichtig|Deutsch ist für mich wichtig.
sammeln|Ich sammle Briefmarken.
fotografieren|Ich fotografiere gern die Berge.
dumm|Das war ein dummer Fehler.
oft|Wir gehen oft ins Kino.
leider|Ich habe leider keine Zeit.
immer|Ich bin immer pünktlich.
dabei|Hast du dein Handy dabei?
vielleicht|Vielleicht regnet es morgen.
einfach|Die Übung ist einfach.
schnell|Der Zug fährt schnell.
können|Ich kann heute nicht kommen.
wollen|Wir wollen morgen schwimmen gehen.
krank|Meine Tochter ist krank.
pünktlich|Der Zug ist pünktlich.
gestern|Gestern habe ich Deutsch gelernt.
Gute Besserung!|Du bist krank? Gute Besserung!
wecken|Ich wecke meinen Sohn um sieben Uhr.
fertig sein|Bist du fertig?
Was ist los?|Was ist los? Du siehst müde aus.
auf keinen Fall|Ich will auf keinen Fall zu spät kommen.
auf jeden Fall|Ich komme auf jeden Fall mit.
nach Hause|Ich gehe jetzt nach Hause.
backen|Wir backen zusammen einen Kuchen.
singen|Wir singen ein Lied.
reiten|Sie reitet am Samstag.
malen|Das Kind malt ein Bild.
Tennis spielen|Mein Sohn spielt gern Tennis.
endlich|Endlich ist der Zug da!
üben|Ich übe jeden Tag Deutsch.
schade|Du kannst nicht kommen? Schade!
lieb|Liebe Eltern, am Freitag ist die Schule geschlossen.
abfahren|Der Zug fährt um zehn Uhr ab.
zurückkommen|Wir kommen morgen zurück.
mitnehmen|Nimm bitte eine Flasche Wasser mit.
mitkommen|Willst du ins Kino mitkommen?
leidtun|Das tut mir leid.
Gitarre spielen|Mein Bruder spielt Gitarre.
Velo fahren|Ich fahre mit dem Velo zur Schule.
Freunde treffen|Am Samstag treffe ich Freunde.
Ski fahren|Im Winter fahren wir Ski.
der / das / die|Der Tisch, das Bett und die Lampe sind neu.
der Deutsche / die Deutsche|Er ist Deutscher. Sie ist Deutsche.
die Eltern|Meine Eltern wohnen in Bern.
die Geschwister|Ich habe zwei Geschwister.
die Grosseltern|Wir besuchen unsere Grosseltern.
die Möbel|Die Möbel sind neu.
die Pommes frites|Die Pommes frites sind heiss.
die Schweiz|Die Schweiz liegt in Europa.
die Türkei|Die Türkei hat viele Küsten.
der Herr|Guten Tag, Herr Keller!
die Frau|Guten Morgen, Frau Meier!
die Dame|Die Dame wartet vor der Tür.
der Name|Mein Name ist Nina.
der Vorname|Mein Vorname ist Mia.
der Nachname|Mein Nachname ist Keller.
die Sprache|Welche Sprache sprichst du?
die Adresse|Wie ist Ihre Adresse?
die Entschuldigung|Danke für die Entschuldigung.
der Buchstabe|Der erste Buchstabe ist A.
das Alphabet|Wir lernen das deutsche Alphabet.
die Firma|Die Firma ist in Zürich.
der Moment|Einen Moment, bitte!
die Strasse|Die Strasse ist breit.
die Postleitzahl|Wie lautet Ihre Postleitzahl?
der Familienstand|Mein Familienstand ist ledig.
die Zahl|Zwölf ist eine Zahl.
das Alter|Tragen Sie bitte Ihr Alter ein.
die Hauptstadt|Paris ist die Hauptstadt von Frankreich.
der Norden|Im Norden ist es kalt.
der Süden|Im Süden ist es warm.
der Westen|Im Westen regnet es.
der Osten|Im Osten scheint die Sonne.
der Hunger|Ich habe Hunger.
der Durst|Nach dem Sport habe ich Durst.
die Butter|Die Butter ist im Kühlschrank.
das Mehl|Für den Kuchen brauchen wir Mehl.
der Zucker|Ich trinke Kaffee ohne Zucker.
die Milch|Die Milch ist kalt.
der Käse|Der Käse kommt aus der Schweiz.
das Salz|Das Salz steht auf dem Tisch.
der Reis|Wir essen Reis mit Gemüse.
das Gemüse|Ich kaufe frisches Gemüse.
der Rahm|Ich nehme etwas Rahm für die Suppe.
das Wasser|Ich trinke ein Glas Wasser.
der Preis|Der Preis steht auf dem Schild.
der Franken|Das Brot kostet einen Franken.
die Miete|Die Miete ist zu hoch.
der Stock|Wir wohnen im dritten Stock.
der Quadratmeter|Ein Quadratmeter reicht dafür nicht.
der Zentimeter|Der Tisch ist 70 Zentimeter hoch.
der Meter|Das Bett ist zwei Meter lang.
die Zeit|Heute habe ich keine Zeit.
der Mittag|Am Mittag esse ich eine Suppe.
der Vormittag|Am Vormittag arbeite ich.
der Nachmittag|Am Nachmittag hole ich die Kinder ab.
der Morgen|Am Morgen frühstücke ich.
der Abend|Am Abend sehe ich fern.
die Nacht|In der Nacht ist es hier ruhig.
die Woche|Nächste Woche beginnt der Kurs.
der Tag|Ich lerne jeden Tag.
die Temperatur|Die Temperatur sinkt am Abend.
das Grad|Heute sind es acht Grad.
der Spass|Das Spiel macht Spass.
die Freizeit|In meiner Freizeit lese ich gern.
die Mathematik|Mathematik macht mir Spass.
der Unterricht|Der Unterricht beginnt um acht Uhr.
das Znüni|Ich nehme einen Apfel als Znüni mit.
die Kommunikation|Gute Kommunikation ist in der Schule wichtig.
der Kilometer|Die Schule ist einen Kilometer entfernt.
der Ski|Ich fahre im Winter gern Ski.
die Prüfung|Morgen habe ich eine Prüfung.
das Diktat|Wir schreiben heute ein Diktat.
der Bruder|Mein Bruder spielt Fussball.
die Schwester|Meine Schwester lernt Deutsch.
der Sohn|Mein Sohn geht in die Schule.
die Tochter|Meine Tochter ist zwölf Jahre alt.
die Familie|Meine Familie wohnt in Uznach.
das Kind|Das Kind spielt im Garten.
die Telefonnummer|Wie ist Ihre Telefonnummer?
der Geburtsort|Bern ist mein Geburtsort.
der Wohnort|Uznach ist mein Wohnort.
das Formular|Bitte füllen Sie das Formular aus.
das Ei|Ich brauche ein Ei für den Kuchen.
der Apfel|Ich esse einen Apfel.
die Tomate|Die Tomate ist rot.
die Dose|Ich brauche eine Dose Tomaten.
das Gramm|Ich möchte hundert Gramm Käse.
das Kilogramm|Ein Kilogramm Äpfel kostet drei Franken.
das Pfund|Ein Pfund sind 500 Gramm.
der Liter|Wir brauchen einen Liter Milch.
der Rappen|Das Brötchen kostet fünfzig Rappen.
die Aktion|Die Aktion dauert bis Samstag.
das Joghurt|Zum Frühstück esse ich ein Joghurt.
die Bäckerei|Die Bäckerei öffnet um sieben Uhr.
die Wohnung|Die Wohnung hat drei Zimmer.
das Zimmer|Mein Zimmer ist hell.
die Küche|Die Küche ist neben dem Bad.
das Bad|Das Bad ist klein.
der Tisch|Das Buch liegt auf dem Tisch.
das Sofa|Das Sofa steht am Fenster.
die Lampe|Die Lampe steht auf dem Tisch.
das Badezimmer|Das Badezimmer hat eine Dusche.
der Balkon|Die Wohnung hat einen Balkon.
das Inserat|Ich habe das Inserat heute gelesen.
der Anruf|Vielen Dank für den Anruf.
der Monat|Die Miete kostet 900 Franken im Monat.
die Bibliothek|Die Bibliothek ist am Samstag geöffnet.
die Arbeit|Nach der Arbeit kaufe ich ein.
der Termin|Ich habe um zehn Uhr einen Termin.
das Wochenende|Am Wochenende schlafe ich lange.
der Regen|Der Regen hört am Abend auf.
das Wetter|Wie ist das Wetter heute?
der Sommer|Im Sommer schwimmen wir im See.
der Frühling|Im Frühling wird es wärmer.
der Herbst|Im Herbst regnet es oft.
der Winter|Im Winter fahren wir Ski.
der Wind|Heute weht ein starker Wind.
der Schnee|Im Frühling schmilzt der Schnee.
das Hobby|Mein Hobby ist Fotografieren.
die Speisekarte|Kann ich bitte die Speisekarte haben?
das Velo|Ich fahre mit dem Velo zur Schule.
die Glace|Ich möchte eine Glace, bitte.
die Schule|Die Schule beginnt um acht Uhr.
die Schülerin|Die Schülerin schreibt einen Brief.
das Billett|Ich kaufe ein Billett für den Zug.
die Schulreise|Morgen macht die Klasse eine Schulreise.
der Ausflug|Am Sonntag machen wir einen Ausflug.
der Kunde|Der Kunde bezahlt an der Kasse.
die Pause|Wir machen jetzt eine Pause.
der Wetterbericht|Im Wetterbericht steht: Morgen regnet es.
das Problem|Wir haben ein kleines Problem.
der Schweizer|Mein Nachbar ist Schweizer.
`.trim().split("\n").map(line => line.split("|")));

const countries = new Set("Deutschland Österreich Polen Spanien Ungarn Rumänien Syrien Frankreich Italien Griechenland".split(" "));
const languages = new Set("Deutsch Polnisch Türkisch Spanisch Ungarisch Rumänisch Arabisch Französisch Italienisch Griechisch".split(" "));

const schoolRoute = [
  {
    id: "listen", title: "Сообщение из школы",
    description: "Послушай сообщение и выясни, зачем звонят.",
    tasks: [
      ["Что нужно сделать сегодня?", "Перезвонить в школу.", "Bitte rufen Sie heute zurück — «Пожалуйста, перезвоните сегодня».", "choice", ["Прийти в школу к восьми.", "Перезвонить в школу.", "Забрать тетрадь завтра."], {
        audio: "Guten Morgen, hier ist die Schule. Nina war gestern nicht im Unterricht. Bitte rufen Sie heute zurück.",
        translation: "Доброе утро, это школа. Нина вчера не была на занятиях. Пожалуйста, перезвоните сегодня."
      }],
      ["О каком дне говорят, когда спрашивают об отсутствии Нины?", "О вчерашнем дне.", "Gestern — «вчера», heute — «сегодня».", "choice", ["О сегодняшнем дне.", "О вчерашнем дне.", "О завтрашнем дне."], {
        audio: "Guten Morgen. Nina war gestern nicht in der Schule. Kann sie heute kommen?",
        translation: "Доброе утро. Нины вчера не было в школе. Она может прийти сегодня?"
      }]
    ]
  },
  {
    id: "modal", title: "Могу, хочу или должен",
    description: "Уточни, что можно сделать и когда нужно прийти.",
    theory: [
      ["Как выбрать глагол", "Können выражает способность или возможность: Ich kann schwimmen — «Я умею плавать». Dürfen передаёт разрешение: Darf ich gehen? — «Можно мне уйти?» Müssen передаёт необходимость: Ich muss gehen — «Мне нужно уйти». Sollen часто передаёт указание или просьбу другого: Die Lehrerin sagt, ich soll anrufen — «Учительница говорит, что я должен позвонить».\n\nWollen выражает намерение: Ich will mitkommen — «Я хочу пойти с вами». Mögen выражает симпатию: Ich mag Musik — «Я люблю музыку». Möchte — вежливый способ сказать, что тебе чего-то хочется: Ich möchte mit der Lehrerin sprechen — «Я хотел бы поговорить с учительницей».", "Kann ich morgen kommen? Darf ich jetzt gehen?", [
        ["Кто", "können", "dürfen", "müssen", "sollen", "wollen", "mögen", "möchte"],
        ["ich", "kann", "darf", "muss", "soll", "will", "mag", "möchte"],
        ["du", "kannst", "darfst", "musst", "sollst", "willst", "magst", "möchtest"],
        ["er / sie / es", "kann", "darf", "muss", "soll", "will", "mag", "möchte"],
        ["wir / sie / Sie", "können", "dürfen", "müssen", "sollen", "wollen", "mögen", "möchten"],
        ["ihr", "könnt", "dürft", "müsst", "sollt", "wollt", "mögt", "möchtet"]
      ], "", { translation: "Я могу прийти завтра? Мне можно сейчас уйти?" }],
      ["Куда ставить два глагола", "В утверждении модальный глагол меняется по лицам и занимает второе место. Действие ставим в начальной форме в конец: Ich muss heute anrufen — «Мне нужно сегодня позвонить». Если начать со времени: Heute muss ich anrufen. Отделяемая приставка остаётся в начальной форме: anrufen.\n\nВ вопросе «да или нет» модальный глагол идёт первым: Muss ich heute anrufen? В вопросе со словом wann он идёт после wann: Wann muss ich anrufen? Сравни nicht müssen («не нужно») и nicht dürfen («нельзя»).", "Du musst heute nicht kommen. Du darfst hier nicht fotografieren.", null, "", { translation: "Тебе не нужно сегодня приходить. Здесь нельзя фотографировать." }]
    ],
    tasks: [
      ["Собери «Мне нужно сегодня перезвонить».", "Ich muss heute zurückrufen", "Muss выражает необходимость, zurückrufen идёт в конец.", "order", ["heute", "Ich", "zurückrufen", "muss"]],
      ["Как спросить разрешение прийти завтра?", "Darf ich morgen kommen?", "Dürfen выражает разрешение. В вопросе без вопросительного слова darf стоит первым.", "choice", ["Darf ich morgen kommen?", "Ich muss morgen kommen.", "Ich will morgen kommen."]],
      ["Вставь глагол: Die Lehrerin sagt: Du ___ heute anrufen. (Учительница говорит, что тебе нужно позвонить сегодня.)", "sollst", "Sollen передаёт указание другого человека. С du: sollst.", "choice", ["sollst","soll","sollt"]],
      ["Собери фразу «Я хотел бы поговорить с учительницей». Начни с Ich möchte.", "Ich möchte mit der Lehrerin sprechen", "После möchte оставь sprechen в начальной форме и поставь его в конец."]
    ]
  },
  {
    id: "perfekt", title: "Что произошло вчера",
    description: "Расскажи о прошлом и задай уточняющий вопрос.",
    theory: [
      ["Из чего состоит Perfekt", "В обычном разговоре Perfekt часто описывает прошлое. Его строят из формы haben или sein и Partizip II, формы основного глагола. В утверждении haben или sein стоит на втором месте, Partizip II — в конце. Ich habe gestern angerufen — «Я вчера позвонил». Gestern habe ich angerufen — то же сообщение с акцентом на «вчера».\n\nВ вопросе без вопросительного слова вспомогательный глагол стоит первым: Hast du angerufen? С вопросительным словом: Wann hast du angerufen? Ich habe gestern nicht angerufen — «Я вчера не звонил».", "Gestern habe ich die Lehrerin angerufen.", null, "", { translation: "Вчера я позвонил учительнице." }],
      ["Haben или sein", "Большинство глаголов в Perfekt используют haben: gelernt, gemacht, angerufen. Запоминай sein с частыми глаголами перемещения gehen, kommen, fahren, с изменением состояния вроде aufstehen и с глаголом bleiben. Выучи пары bin gegangen, bin gekommen, bin gefahren, bin aufgestanden, bin geblieben.", "Wir sind gestern zu Hause geblieben.", [
        ["Кто", "haben", "sein"], ["ich", "habe", "bin"], ["du", "hast", "bist"],
        ["er / sie / es", "hat", "ist"], ["wir / sie / Sie", "haben", "sind"], ["ihr", "habt", "seid"]
      ], "", { translation: "Вчера мы остались дома." }],
      ["Как образовать Partizip II", "У регулярных глаголов обычно ge- и -t: lernen → gelernt. После основы на -t или -d в знакомых глаголах появляется -et: arbeiten → gearbeitet. У многих сильных глаголов конец -en, а гласная может меняться: schreiben → geschrieben. Такие формы лучше учить вместе с глаголом.\n\nУ отделяемых приставок ge- ставится после приставки: einkaufen → eingekauft, aufstehen → aufgestanden. У знакомых глаголов с неотделяемой приставкой и на -ieren ge- не добавляется: verstehen → verstanden, telefonieren → telefoniert.", "Ich habe telefoniert. Er ist früh aufgestanden.", [
        ["Модель", "Пример", "Перевод"], ["Регулярный", "gelernt", "учил"], ["Сильный", "geschrieben", "писал"],
        ["Отделяемая приставка", "eingekauft", "сделал покупки"], ["Неотделяемая приставка", "verstanden", "понял"], ["На -ieren", "telefoniert", "говорил по телефону"]
      ], "", { translation: "Я говорил по телефону. Он рано встал." }]
    ],
    tasks: [
      ["Вставь вспомогательный глагол: Wir ___ gestern zu Hause geblieben.", "sind", "С bleiben в Perfekt используем sein. С wir: sind.", "choice", ["sind","haben","seid"]],
      ["Выбери Partizip II глагола anrufen.", "angerufen", "У отделяемой приставки an- элемент ge- стоит после приставки.", "choice", ["geanrufen", "angerufen", "angeruft"]],
      ["Сделай вопрос из Du hast gestern angerufen.", "Hast du gestern angerufen", "В вопросе «да или нет» hast стоит первым, angerufen — в конце.", "order", ["angerufen", "Hast", "gestern", "du"]],
      ["Собери фразу «Вчера я не звонил». Начни с Gestern.", "Gestern habe ich nicht angerufen", "После Gestern ставим habe. Nicht стоит перед angerufen."]
    ]
  },
  {
    id: "call", title: "Позвони в школу",
    description: "Объясни, что было вчера, и договорись на сегодня.",
    tasks: [
      ["Поздоровайся и вежливо попроси поговорить с учительницей.", "Guten Tag. Ich möchte mit der Lehrerin sprechen.", "Ich möchte … — вежливая просьба. Sprechen идёт в конец.", "choice", ["Guten Tag. Ich möchte mit der Lehrerin sprechen.", "Guten Tag. Ich spreche schon mit der Lehrerin.", "Guten Tag. Die Lehrerin muss gehen."], {
        audio: "Sekretariat der Schule Uznach. Wie kann ich Ihnen helfen?",
        translation: "Секретариат школы, Уцнах. Чем могу вам помочь?"
      }],
      ["Скажи «Нина вчера осталась дома».", "Nina ist gestern zu Hause geblieben", "Bleiben образует Perfekt с sein: Nina ist geblieben.", "translate", null, {
        audio: "Was ist gestern passiert?",
        translation: "Что вчера произошло?"
      }],
      ["Ответь «Я могу сегодня прийти в десять».", "Ich kann heute um zehn kommen", "Kann показывает возможность, kommen стоит в конце. Um zehn — «в десять».", "translate", null, {
        audio: "Können Sie heute um zehn in die Schule kommen?",
        translation: "Можете сегодня прийти в школу в десять?"
      }]
    ]
  },
  {
    id: "repeat", title: "Повтори в новой ситуации",
    description: "Ты пропустил встречу. Объясни, что произошло, и предложи новое время.",
    tasks: [
      ["Собери фразу «Вчера я опоздал». Начни с Gestern.", "Gestern bin ich zu spät gekommen", "После Gestern идёт bin. Kommen образует Perfekt с sein."],
      ["Как вежливо спросить, можно ли прийти завтра в девять?", "Darf ich morgen um neun kommen?", "Darf спрашивает о разрешении. Um neun означает «в девять».", "choice", ["Darf ich morgen um neun kommen?", "Muss ich morgen um neun gehen?", "Ich bin gestern um neun gekommen."]],
      ["Собери фразу «Я могу завтра позвонить».", "Ich kann morgen anrufen", "После kann ставим anrufen в конец целиком."]
    ]
  }
];

acceptedTranslations.set(schoolRoute[3].tasks[1], ["Gestern ist Nina zu Hause geblieben"]);
acceptedTranslations.set(schoolRoute[3].tasks[2], ["Heute kann ich um zehn kommen", "Ich kann heute um zehn Uhr kommen", "Heute kann ich um zehn Uhr kommen"]);
acceptedTranslations.set(schoolRoute[4].tasks[2], ["Morgen kann ich anrufen"]);

const guidedScenarios = [
  {
    topics: [[0, 1, 4], [2, 3, 5, 6]], practice: [[0, 2, 3, 7], [1, 4, 5, 6]],
    title: "Запишись на курс", goal: "Познакомься с сотрудником и ответь на вопросы для анкеты.",
    listen: ["Guten Tag. Ich heisse Nora Keller. Ich komme aus Bern.", "Здравствуйте. Меня зовут Нора Келлер. Я из Берна.", "Откуда Нора?", "Из Берна.", ["Из Цюриха.", "Из Лугано."]],
    call: [
      ["Guten Tag. Wie heissen Sie?", "Здравствуйте. Как вас зовут?", "Представься: «Меня зовут Анна Келлер».", "Ich heisse Anna Keller", "После ich употребляем heisse.", "Mein Name ist Anna Keller"],
      ["Woher kommen Sie?", "Откуда вы?", "Ответь: «Я из Италии».", "Ich komme aus Italien", "С ich форма komme. Перед Italien здесь артикля нет.", "Aus Italien komme ich"]
    ],
    repeat: [["В библиотеке спроси вежливо «Где вы живёте?».", "Wo wohnen Sie", "После Wo ставим wohnen, затем Sie."],
      ["Скажи «Я говорю по-немецки».", "Ich spreche Deutsch", "После ich ставим spreche. Название языка пишется с большой буквы."]]
  },
  {
    topics: [[1, 2, 5, 6], [0, 3, 4, 7]], practice: [[1, 2, 3, 4, 5], [0, 6, 7]],
    title: "Расскажи о семье", goal: "Познакомь собеседника с семьёй и назови возраст.",
    listen: ["Das sind meine Kinder. Mia ist acht und Leo ist zwölf Jahre alt.", "Это мои дети. Миа восемь, а Лео двенадцать лет.", "Сколько лет Лео?", "Двенадцать.", ["Восемь.", "Двадцать."]],
    call: [
      ["Wer ist das?", "Кто это?", "Представь одного человека: «Это мой брат».", "Das ist mein Bruder", "Для одного человека используем ist. У Bruder артикль der, поэтому mein."],
      ["Wie alt ist deine Schwester?", "Сколько лет твоей сестре?", "Скажи «Моей сестре десять лет».", "Meine Schwester ist zehn Jahre alt", "Schwester женского рода, поэтому meine. Возраст выражаем через sein."]
    ],
    repeat: [["На семейном празднике скажи «Это мои родители».", "Das sind meine Eltern", "Eltern — множественное число, поэтому sind и meine."],
      ["Скажи «У меня двое детей».", "Ich habe zwei Kinder", "Для ich используется habe. Два — zwei."]]
  },
  {
    topics: [[1, 4, 5, 6], [0, 2, 3, 7]], practice: [[1, 4, 7], [0, 2, 3, 5, 6]],
    title: "Сделай заказ", goal: "Купи продукты и уточни цену у продавца.",
    listen: ["Guten Morgen. Ein Kilo Äpfel kostet drei Franken.", "Доброе утро. Килограмм яблок стоит три франка.", "Сколько стоит килограмм яблок?", "Три франка.", ["Два франка.", "Четыре франка."]],
    call: [
      ["Guten Morgen. Was möchten Sie?", "Доброе утро. Что вы хотели бы?", "Закажи две булочки. Начни с Ich möchte.", "Ich möchte zwei Brötchen", "После zwei употребляем множественное число: Brötchen."],
      ["Möchten Sie auch Milch?", "Вы также хотите молока?", "Скажи «Нет, спасибо» и спроси «Сколько это стоит?».", "Nein, danke. Wie viel kostet das", "Для цены используй Wie viel. В вопросе после Wie viel ставим kostet."]
    ],
    repeat: [["На рынке спроси «У вас есть яйца?», обращаясь на Sie.", "Haben Sie Eier", "Общий вопрос начинается с Haben. Перед Eier здесь артикля нет."],
      ["Закажи яблоки: «Я хотел бы килограмм яблок».", "Ich möchte ein Kilo Äpfel", "Kilo среднего рода, поэтому ein Kilo."]]
  },
  {
    topics: [[0, 1, 3, 4], [2, 5, 6]], practice: [[0, 1, 3, 4], [2, 5, 6, 7]],
    title: "Посмотри квартиру", goal: "Уточни, где находятся комнаты, и опиши квартиру.",
    listen: ["Die Küche ist klein, aber hell. Das Bad ist dort.", "Кухня маленькая, но светлая. Ванная там.", "Какая кухня?", "Маленькая и светлая.", ["Большая и светлая.", "Маленькая и тёмная."]],
    call: [
      ["Wo ist das Bad?", "Где ванная?", "Ответь «Она там», заменив das Bad местоимением.", "Es ist dort", "Das Bad заменяем на es, даже если по-русски «ванная» женского рода.", "Dort ist es"],
      ["Ist die Küche dunkel?", "Кухня тёмная?", "Ответь «Кухня не тёмная».", "Die Küche ist nicht dunkel", "Nicht отрицает прилагательное dunkel и стоит перед ним.", "Nein, die Küche ist nicht dunkel"]
    ],
    repeat: [["Опиши новую комнату: «Комната светлая».", "Das Zimmer ist hell", "У Zimmer артикль das. Перед hell достаточно ist."],
      ["В мебельном магазине скажи «Стулья не дорогие».", "Die Stühle sind nicht teuer", "Для нескольких предметов используем sind. Nicht ставим перед teuer."]]
  },
  {
    topics: [[1, 2, 5, 7], [0, 3, 4, 6, 8]], practice: [[0, 1, 6], [2, 3, 4, 5, 7]],
    title: "Договорись о времени", goal: "Выясни, когда отправляется поезд, и назначь встречу.",
    listen: ["Der Zug fährt um halb neun ab. Bitte kommen Sie um acht Uhr.", "Поезд отправляется в половине девятого. Пожалуйста, приходите к восьми.", "Во сколько отправляется поезд?", "В 8:30.", ["В 8:00.", "В 9:30."]],
    call: [
      ["Wann fährt der Zug ab?", "Когда отправляется поезд?", "Скажи «Поезд отправляется в девять».", "Der Zug fährt um neun ab", "С точным временем используем um. У abfahren приставка ab отделяется.", "Der Zug fährt um neun Uhr ab"],
      ["Wann fängt dein Kurs an?", "Когда начинается твой курс?", "Ответь «В понедельник курс начинается в десять». Начни с Am Montag.", "Am Montag fängt der Kurs um zehn an", "Am Montag занимает первое место, fängt стоит вторым, an — в конце.", "Am Montag fängt der Kurs um zehn Uhr an"]
    ],
    repeat: [["Уточни расписание кружка: «Когда начинается курс?».", "Wann fängt der Kurs an", "После Wann ставим fängt. Приставка an в конце."],
      ["Скажи «Утром я встаю в восемь». Начни с Am Morgen.", "Am Morgen stehe ich um acht auf", "После Am Morgen ставим stehe. Точное время вводим через um.", "Am Morgen stehe ich um acht Uhr auf"]]
  },
  {
    topics: [[0, 2, 4], [1, 3, 5, 6]], practice: [[0, 3, 6, 7], [1, 2, 4, 5]],
    title: "Обсуди планы на выходные", goal: "Скажи, что любишь делать, и договорись с другом.",
    listen: ["Heute regnet es. Ich lese gern, aber morgen fahre ich lieber Velo.", "Сегодня идёт дождь. Я люблю читать, но завтра предпочту покататься на велосипеде.", "Что собеседник предпочитает сделать завтра?", "Покататься на велосипеде.", ["Почитать дома.", "Искупаться."]],
    call: [
      ["Liest du nicht gern?", "Ты не любишь читать?", "Возрази: «Нет, я люблю читать». Начни с Doch.", "Doch, ich lese gern", "Doch возражает на отрицательный вопрос, gern передаёт «люблю делать»."],
      ["Was möchtest du trinken?", "Что ты хочешь выпить?", "Ответь «Я возьму чай». Используй nehme и неопределённый артикль.", "Ich nehme einen Tee", "Tee мужского рода. После nehme нужен Akkusativ: einen Tee."]
    ],
    repeat: [["В кафе скажи «Я возьму салат». Используй nehme и неопределённый артикль.", "Ich nehme einen Salat", "Salat мужского рода, в Akkusativ ein становится einen."],
      ["Скажи «Я предпочитаю плавать». Используй lieber.", "Ich schwimme lieber", "Lieber после глагола показывает предпочтение."]]
  }
];

const guidedGrammar = [
  ["Как меняется обычный глагол", "От начальной формы wohnen убираем -en и получаем основу wohn-. К ней прибавляем окончание из таблицы. В вопросе меняется порядок, а окончание остаётся тем же: Du wohnst hier. → Wo wohnst du? У форм heissen после du не добавляем ещё одно s: du heisst.", "Ich wohne in Bern. Wo wohnst du?", [
    ["Кто", "Окончание", "Форма"], ["ich", "-e", "wohne"], ["du", "-st", "wohnst"], ["er / sie / es", "-t", "wohnt"],
    ["wir / sie / Sie", "-en", "wohnen"], ["ihr", "-t", "wohnt"]
  ], "", { translation: "Я живу в Берне. Где ты живёшь?" }],
  ["Как выбрать mein или meine", "Начало слова показывает, кому принадлежит предмет. Mein — мой, dein — твой, Ihr — ваш при вежливом обращении. Окончание зависит от немецкого рода или числа того, о чём говорим: mein Bruder, meine Schwester, meine Eltern. В этих примерах речь о том, кто перед нами, поэтому используем формы именительного падежа.", "Das ist meine Schwester. Das sind Ihre Kinder.", [
    ["Кому принадлежит", "der Bruder", "das Kind", "die Schwester", "die Eltern"],
    ["мне", "mein Bruder", "mein Kind", "meine Schwester", "meine Eltern"], ["тебе", "dein Bruder", "dein Kind", "deine Schwester", "deine Eltern"],
    ["Вам", "Ihr Bruder", "Ihr Kind", "Ihre Schwester", "Ihre Eltern"]
  ], "", { translation: "Это моя сестра. Это Ваши дети." }],
  ["Артикль, количество и отрицание", "Ein и eine обозначают один предмет, который мы вводим в разговор: Das ist ein Apfel. У неопределённого множественного числа отдельной формы ein нет: Das sind Äpfel. Если предметов несколько и важно количество, ставим число: zwei Äpfel. Отрицательный артикль остаётся и во множественном числе: Das sind keine Äpfel.", "Das ist kein Apfel. Das sind keine Birnen.", [
    ["Слово", "Один предмет или несколько", "Отрицание"], ["der Apfel", "ein Apfel", "kein Apfel"], ["das Ei", "ein Ei", "kein Ei"],
    ["die Birne", "eine Birne", "keine Birne"], ["die Äpfel", "Äpfel / zwei Äpfel", "keine Äpfel"]
  ], "", { translation: "Это не яблоко. Это не груши." }],
  ["Что именно мы отрицаем", "Kein ставим перед существительным, которое было бы с ein или без артикля: ein Sofa → kein Sofa, Stühle → keine Stühle. Nicht подходит, когда отрицаем описание или уточняем, что предмет находится в другом месте. В этих примерах оно стоит прямо перед словом, которому мы возражаем: nicht teuer, nicht hier. После ist или sind прилагательное сохраняет форму: Der Stuhl ist blau. Die Stühle sind blau.", "Das Sofa ist nicht teuer. Wir haben kein Sofa.", [
    ["Что хотим сказать", "Пример", "Перевод"], ["Предмета нет", "Das ist kein Sofa.", "Это не диван."],
    ["Признак другой", "Das Sofa ist nicht blau.", "Диван не синий."], ["Место другое", "Das Sofa ist nicht hier.", "Диван не здесь."]
  ], "", { translation: "Диван недорогой. У нас нет дивана." }],
  ["Глагол и приставка в утверждении и вопросе", "Сначала найди часть, которая меняется по лицам: stehe, stehst, steht. В утверждении она занимает вторую позицию, даже если перед ней стоит целое выражение Am Montag. В вопросе без вопросительного слова она занимает первую позицию. В вопросе с wann идёт после wann. Отделяемая приставка в этих примерах стоит в конце.", "Am Montag stehe ich früh auf. Wann stehst du auf?", [
    ["Тип фразы", "Начало", "Остальная фраза"], ["Утверждение", "Ich stehe", "früh auf."], ["Время впереди", "Am Montag stehe", "ich früh auf."],
    ["Вопрос с wann", "Wann stehst", "du auf?"], ["Да или нет", "Stehst du", "früh auf?"]
  ], "", { translation: "В понедельник я рано встаю. Когда ты встаёшь?" }],
  ["Как увидеть Akkusativ", "Сначала спроси, кто выполняет действие. В Der Mann nimmt den Tee действие выполняет der Mann. Затем спроси, кого или что он берёт: den Tee. Здесь роль предмета меняет артикль мужского рода: der → den, ein → einen, kein → keinen. После lesen, nehmen и treffen ищи предмет таким же способом: ein Buch lesen, einen Tee nehmen, eine Freundin treffen.", "Ich nehme keinen Tee. Ich nehme eine Suppe.", [
    ["Род и число", "Nominativ", "Akkusativ"], ["Мужской", "der / ein / kein Tee", "den / einen / keinen Tee"],
    ["Средний", "das / ein / kein Buch", "das / ein / kein Buch"], ["Женский", "die / eine / keine Suppe", "die / eine / keine Suppe"],
    ["Множественное", "die / keine Bücher", "die / keine Bücher"]
  ], "", { translation: "Я не возьму чай. Я возьму суп." }]
];

const lessonRoutes = Object.fromEntries(guidedScenarios.map((scenario, index) => {
  const lesson = course[index];
  const [audio, translation, prompt, answer, distractors] = scenario.listen;
  const route = [
    { id: "listen", title: "Послушай и пойми", description: scenario.goal,
      tasks: [[prompt, answer, translation, "choice", [answer, ...distractors], { audio, translation }]] },
    ...scenario.topics.map((positions, group) => ({
      id: group ? "forms" : "basics", title: group ? "Примени правило" : "Разбери грамматику",
      description: "", theory: [
        ...(!group ? [guidedGrammar[index]] : []),
        ...positions.map(position => lesson.theory[position])
      ],
      tasks: scenario.practice[group].map(position => lesson.practice[position])
    })),
    { id: "call", title: scenario.title, description: scenario.goal,
      tasks: scenario.call.map(([audio, translation, prompt, answer, hint, alternate]) => {
        const task = [prompt, answer, hint, "translate", null, { audio, translation }];
        if (alternate) acceptedTranslations.set(task, [alternate]);
        return task;
      }) },
    { id: "repeat", title: "Повтори в новой ситуации", description: "Примени знакомую грамматику на новых примерах.",
      tasks: scenario.repeat.map(([prompt, answer, hint, alternate]) => {
        const task = [prompt, answer, hint];
        if (alternate) acceptedTranslations.set(task, [alternate]);
        return task;
      }) }
  ];
  return [lesson.id, route];
}));
lessonRoutes[7] = schoolRoute;

const wordGlosses = [
  ["ich", "я", "я"], ["du", "ты", "ти"], ["er", "он", "він"], ["sie", "она, они, Вы", "вона, вони, Ви"],
  ["es", "оно, это", "воно, це"], ["wir", "мы", "ми"], ["ihr", "вы, её, их", "ви, її, їх"],
  ["mir", "мне", "мені"], ["dir", "тебе", "тобі"], ["dich", "тебя, тебе", "тебе"], ["ihnen", "им, Вам", "їм, Вам"],
  ["der die das den dem", "определённый артикль", "означений артикль"],
  ["ein eine einen einem", "неопределённый артикль, один", "неозначений артикль, один"],
  ["kein keine keinen keinem", "не, нет ни одного", "не, немає жодного"],
  ["mein meine meinen", "мой, моя, мои", "мій, моя, мої"], ["dein deine deinen", "твой, твоя, твои", "твій, твоя, твої"],
  ["was", "что, какой", "що, який"], ["wer", "кто", "хто"], ["wo", "где", "де"],
  ["woher", "откуда", "звідки"], ["wohin", "куда", "куди"], ["warum", "почему", "чому"],
  ["wie", "как, какой", "як, який"], ["wann", "когда", "коли"], ["welche welcher welches welchem", "какой, который", "який, котрий"],
  ["und", "и", "і"], ["oder", "или", "або"], ["aber", "но", "але"],
  ["nicht", "не", "не"], ["noch", "ещё", "ще"], ["schon", "уже", "вже"], ["auch", "тоже, также", "теж, також"],
  ["ja", "да", "так"], ["nein", "нет", "ні"], ["doch", "наоборот, да (возражение)", "навпаки, так (заперечення)"],
  ["bitte", "пожалуйста", "будь ласка"], ["gern gerne", "с удовольствием", "із задоволенням"], ["lieber", "охотнее, лучше", "охочіше, краще"],
  ["heute", "сегодня", "сьогодні"], ["gestern", "вчера", "учора"], ["morgen", "завтра, утро", "завтра, ранок"],
  ["früh", "рано", "рано"], ["spät", "поздно", "пізно"], ["jetzt", "сейчас", "зараз"],
  ["hier", "здесь", "тут"], ["dort", "там", "там"], ["zu", "к, у (zu Hause — дома)", "до, у (zu Hause — вдома)"],
  ["haus hause", "дом (zu Hause — дома)", "дім (zu Hause — вдома)"],
  ["aus", "из, наружу", "з, назовні"], ["in im", "в, внутри", "у, всередині"], ["mit", "с, вместе с", "з, разом із"],
  ["von", "от, из, с", "від, із, з"], ["bis", "до", "до"], ["um", "в (о времени), вокруг", "о (про час), навколо"],
  ["am", "в, на (am Montag — в понедельник)", "у, на (am Montag — у понеділок)"], ["nach", "после, в направлении", "після, у напрямку"],
  ["bin bist ist sind seid war waren sein", "быть, находиться", "бути, перебувати"],
  ["habe hast hat haben habt", "иметь, также вспомогательный глагол", "мати, також допоміжне дієслово"],
  ["kann kannst können könnt", "мочь, уметь", "могти, уміти"], ["muss musst müssen müsst", "должен, нужно", "мусити, потрібно"],
  ["will willst wollen wollt", "хотеть", "хотіти"], ["möchte möchtest möchten möchtet", "хотелось бы", "хотілося б"],
  ["darf darfst dürfen dürft", "можно, иметь разрешение", "можна, мати дозвіл"], ["soll sollst sollen sollt", "следует, нужно по чьей-то просьбе", "слід, потрібно на чиєсь прохання"],
  ["heisse heisst heissen", "зваться", "зватися"], ["wohne wohnst wohnt wohnen", "жить, проживать", "жити, проживати"],
  ["spreche sprichst spricht sprechen", "говорить", "розмовляти"], ["komme kommst kommt kommen gekommen", "приходить, приехать", "приходити, приїжджати"],
  ["fahre fährst fährt fahren gefahren", "ехать", "їхати"], ["gehe gehst geht gehen gegangen", "идти", "іти"],
  ["nehme nimmst nimmt nehmen", "брать", "брати"], ["lese liest lesen", "читать", "читати"],
  ["stehe stehst steht aufstehen aufgestanden", "стоять, с auf — вставать", "стояти, з auf — вставати"],
  ["lerne lernst lernt gelernt lernen", "учиться, изучать", "учитися, вивчати"],
  ["bleibe bleibt bleiben geblieben", "оставаться", "залишатися"], ["anrufen angerufen", "звонить, позвонить", "телефонувати, зателефонувати"],
  ["rufen ruft", "звать, с zurück — перезвонить", "кликати, із zurück — передзвонити"],
  ["kostet kosten", "стоить, стоит", "коштувати, коштує"], ["helfen hilft", "помогать", "допомагати"],
  ["passiert passieren", "произошло, происходить", "сталося, відбуватися"],
  ["unterricht", "занятие, урок", "заняття, урок"], ["sekretariat", "секретариат", "секретаріат"], ["gleis", "путь на вокзале", "колія на вокзалі"],
  ["zug", "поезд", "потяг"], ["ab", "с, от, приставка отправления", "від, з, префікс зі значенням відправлення"],
  ["zurück", "назад, обратно", "назад, у зворотному напрямку"], ["krank", "больной", "хворий"], ["frei", "свободный", "вільний"],
  ["guten gute", "добрый, хороший", "добрий, гарний"], ["grüezi", "здравствуйте (в Швейцарии)", "добрий день (у Швейцарії)"],
  ["eins", "один", "один"], ["zwei", "два", "два"], ["drei", "три", "три"], ["vier", "четыре", "чотири"],
  ["fünf", "пять", "п’ять"], ["sechs", "шесть", "шість"], ["sieben", "семь", "сім"], ["acht", "восемь", "вісім"],
  ["neun", "девять", "дев’ять"], ["zehn", "десять", "десять"], ["elf", "одиннадцать", "одинадцять"],
  ["zwölf", "двенадцать", "дванадцять"], ["halb", "половина", "половина"]
];

for (const line of `
das Bild|Was siehst du auf dem Bild?
der Kurs|Der Kurs beginnt um acht Uhr.
das Gespräch|Das Gespräch beginnt jetzt.
die Frage|Ich habe eine Frage.
das Wort|Ich kenne das Wort nicht.
die Lektion|Die Lektion ist kurz.
die Antwort|Ich weiss die Antwort.
die Musik|Ich höre gern Musik.
der Papa|Mein Papa kocht heute.
die Visitenkarte|Hier ist meine Visitenkarte.
der Familienname|Wie ist Ihr Familienname?
die Stadt|Die Stadt ist schön.
das Land|Polen ist ein Land in Europa.
das E-Mail|Ich schreibe ein E-Mail.
das Telefon|Wo ist das Telefon?
der Ort|Der Ort liegt am See.
die Anmeldung|Die Anmeldung ist am Montag.
der Vater|Mein Vater wohnt in Bern.
die Mutter|Meine Mutter arbeitet heute.
der Lehrer|Der Lehrer erklärt das Wort.
die Lehrerin|Die Lehrerin kommt gleich.
der Park|Wir gehen in den Park.
das Jahr|Das Jahr hat zwölf Monate.
der Enkel|Mein Enkel ist drei Jahre alt.
die Enkelin|Meine Enkelin geht in die Schule.
die Grossmutter|Meine Grossmutter wohnt in Basel.
der Mann|Der Mann heisst Paul.
der Grossvater|Mein Grossvater liest gern.
der Ehemann|Ihr Ehemann kommt aus Italien.
die Ehefrau|Seine Ehefrau spricht Deutsch.
die Nummer|Wie ist deine Nummer?
das Heimatland|Mein Heimatland ist die Schweiz.
der Fluss|Der Fluss ist breit.
der Berg|Der Berg ist hoch.
der See|Wir wohnen am See.
die Schweizerin|Meine Nachbarin ist Schweizerin.
die Birne|Die Birne ist reif.
das Brötchen|Ich möchte ein Brötchen.
die Flasche|Ich brauche eine Flasche Wasser.
die Banane|Die Banane kostet einen Franken.
die Crêpe|Ich esse eine Crêpe mit Zucker.
die Schokolade|Ich mag Schokolade.
das Fleisch|Wir kaufen heute kein Fleisch.
das Bier|Ein Bier, bitte.
der Tee|Der Tee ist heiss.
das Brot|Das Brot kostet drei Franken.
der Wein|Möchten Sie Wein oder Wasser?
das Mineralwasser|Ein Mineralwasser, bitte.
der Fisch|Der Fisch ist frisch.
die Orange|Ich nehme zwei Orangen.
der Kuchen|Der Kuchen schmeckt gut.
der Kaffee|Der Kaffee kostet vier Franken.
der Saft|Ich trinke gern Saft.
das Würstchen|Das Kind isst ein Würstchen.
die Kartoffel|Die Kartoffeln sind im Angebot.
die Zwiebel|Ich brauche eine Zwiebel für die Suppe.
das Regal|Die Äpfel liegen im Regal.
der Prospekt|Die Angebote stehen im Prospekt.
das Lebensmittel|Brot ist ein Lebensmittel.
das Hackfleisch|Ich brauche ein halbes Kilo Hackfleisch.
der Verkäufer|Der Verkäufer hilft mir.
die Verkäuferin|Die Verkäuferin zeigt mir das Brot.
die Kundin|Die Kundin kauft Milch.
der Laden|Der Laden ist bis sechs Uhr geöffnet.
die Frucht|Die Mango ist eine Frucht.
das Rezept|Das Rezept ist einfach.
der Pfeffer|Die Suppe braucht noch Pfeffer.
die Kiwi|Die Kiwi ist grün.
der Stuhl|Der Stuhl steht am Tisch.
der Kühlschrank|Die Milch ist im Kühlschrank.
das Schlafzimmer|Das Schlafzimmer ist klein.
der Gang|Die Tür ist am Ende des Gangs.
die Toilette|Wo ist die Toilette?
das Wohnzimmer|Das Wohnzimmer ist hell.
das Haus|Das Haus hat einen Garten.
der Schrank|Der Schrank ist alt.
das Bett|Das Bett ist breit.
der Fernseher|Der Fernseher steht im Wohnzimmer.
die Dusche|Das Bad hat eine Dusche.
der Herd|Der Herd steht in der Küche.
die Badewanne|Die Wohnung hat keine Badewanne.
der Teppich|Der Teppich liegt unter dem Tisch.
der Sessel|Der Sessel ist bequem.
das Gerät|Das Gerät funktioniert gut.
die Farbe|Welche Farbe hat das Sofa?
das Handy|Mein Handy liegt auf dem Tisch.
das Büro|Das Büro ist im ersten Stock.
das Ehepaar|Das Ehepaar wohnt in Basel.
der Garten|Die Kinder spielen im Garten.
das Appartement|Das Appartement hat zwei Zimmer.
der Raum|Der Raum ist gross.
der TV|Der TV steht im Wohnzimmer.
die Garage|Das Auto steht in der Garage.
der Computer|Der Computer steht auf dem Schreibtisch.
der Schreibtisch|Der Schreibtisch steht am Fenster.
die Uhr|Die Uhr hängt an der Wand.
die Präsentation|Die Präsentation beginnt um zehn Uhr.
der Supermarkt|Der Supermarkt öffnet um acht Uhr.
das Viertel|Eine Stunde hat vier Viertel.
der Intensivkurs|Der Intensivkurs beginnt am Montag.
die Party|Die Party beginnt um acht Uhr.
der Fussball|Wir spielen jeden Samstag Fussball.
die Hausaufgabe|Ich mache die Hausaufgabe am Abend.
die Mama|Meine Mama steht früh auf.
das Kino|Wir gehen heute ins Kino.
der Sport|Ich mache gern Sport.
die Pizza|Wir essen am Abend Pizza.
das Geschäft|Das Geschäft ist sonntags geschlossen.
die Praxis|Die Praxis ist von acht bis zwölf Uhr geöffnet.
die Kita|Mein Sohn geht in die Kita.
das Beispiel|Kannst du ein Beispiel nennen?
der Freund|Mein Freund kommt um neun Uhr.
die Freundin|Ich treffe meine Freundin am Samstag.
die Sonne|Heute scheint die Sonne.
das Auto|Wir fahren mit dem Auto.
das Picknick|Wir machen am Sonntag ein Picknick.
die Gitarre|Meine Schwester spielt Gitarre.
die Wolke|Am Himmel ist nur eine Wolke.
das Wienerli|Ich nehme ein Wienerli.
die Nachricht|Ich habe eine Nachricht für dich.
das Radio|Am Morgen höre ich Radio.
das Internet|Ich suche das Rezept im Internet.
der Hamburger|Ich bestelle einen Hamburger.
die Speise|Welche Speise empfehlen Sie?
die Bratwurst|Ich möchte eine Bratwurst.
die Portion|Eine Portion Pommes, bitte.
der Ketchup|Möchtest du Ketchup zu den Pommes?
das Sandwich|Ich nehme ein Sandwich.
der Schinken|Das Sandwich ist mit Schinken.
der Salat|Ich nehme einen Salat.
das Getränk|Welches Getränk möchten Sie?
das Cola|Ich möchte ein Cola.
der Hund|Wir gehen mit dem Hund spazieren.
das Fahrrad|Ich komme mit dem Fahrrad.
der Krimi|Wir sehen heute Abend einen Krimi.
der Film|Der Film beginnt um acht Uhr.
der Beruf|Was sind Sie von Beruf?
das Foto|Auf dem Foto ist meine Familie.
das Smartphone|Ich mache ein Foto mit dem Smartphone.
der Würfel|Du brauchst einen Würfel für das Spiel.
das Spiel|Das Spiel ist lustig.
das Team|Unser Team spielt am Samstag.
das Frühstück|Das Frühstück ist um sieben Uhr.
der Arzt|Der Arzt kommt um zehn Uhr.
die Ärztin|Ich habe einen Termin bei der Ärztin.
das Klavier|Mein Bruder spielt Klavier.
das Lied|Wir singen ein Lied.
der Text|Lies bitte den Text.
die Übung|Wir machen die Übung zusammen.
der Brief|Ich habe einen Brief geschrieben.
das Buch|Ich lese ein Buch.
die Klasse|In meiner Klasse sind zwanzig Kinder.
der Schüler|Der Schüler hat die Aufgabe gemacht.
die Primarschule|Meine Tochter geht in die Primarschule.
`.trim().split("\n")) {
  const [word, example] = line.split("|");
  wordExamples.set(word, example);
}

function cardExample(word, lessonId) {
  if (word === "machen" && lessonId === 3) return "Das macht zusammen fünf Franken.";
  if (word === "alt" && lessonId === 4) return "Der Schrank ist alt.";
  if (word === "finden" && lessonId === 4) return "Ich finde das Zimmer schön.";
  if (wordExamples.has(word)) return wordExamples.get(word);
  if (countries.has(word)) return `Meine Freundin kommt aus ${word}.`;
  if (languages.has(word)) return `Wir sprechen ${word}.`;
  if (/^der (Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)$/.test(word)) {
    return `Am ${word.slice(4)} habe ich Zeit.`;
  }
  return "";
}
