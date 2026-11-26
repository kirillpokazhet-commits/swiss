const polyglotCourse = [
  {
    title: "Первые фразы", pages: "17–32",
    verbPractice: true,
    goal: "Поздоровайся, расскажи о себе и задай первый вопрос по-немецки.",
    rules: [
      ["Кто что делает","Сначала посмотри, о ком речь. Скажи вместе: ich lerne, du lernst, er lernt."],
      ["Вопросы и простые фразы","Как спросить: Du lernst. → Lernst du? Как начать с «завтра»: Morgen lerne ich."],
      ["Как сказать «не»","Добавь nicht: Ich arbeite nicht. Если есть das, поставь nicht после него: Ich mache das nicht."],
      ["Знакомство","С другом: Wie heisst du? Вежливо: Wie heissen Sie?"]
    ],
    words: [
      ["Guten Tag!", "Добрый день!", "Guten Tag, Frau Keller!"], ["Tschüss!", "Пока!", "Tschüss, bis morgen!"],
      ["Wie geht’s?", "Как дела?", "Hallo, wie geht’s?"], ["Sehr angenehm.", "Очень приятно.", "Sehr angenehm, ich heisse Nina."],
      ["Entschuldigung!", "Извините!", "Entschuldigung, wie heissen Sie?"], ["Danke!", "Спасибо!", "Danke, mir geht es gut."],
      ["Auf Wiedersehen!", "До свидания!", "Danke und auf Wiedersehen!"]
    ],
    verbs: [
      "fragen|спрашивать|frage,fragst,fragt,fragt|haben|gefragt|heute|intro",
      "antworten|отвечать|antworte,antwortest,antwortet,antwortet|haben|geantwortet|jetzt|intro",
      "sagen|говорить, сказать|sage,sagst,sagt,sagt|haben|gesagt|das",
      "machen|делать|mache,machst,macht,macht|haben|gemacht|das|intro",
      "wohnen|жить, проживать|wohne,wohnst,wohnt,wohnt|haben|gewohnt|in Bern",
      "arbeiten|работать|arbeite,arbeitest,arbeitet,arbeitet|haben|gearbeitet|heute zu Hause",
      "lernen|учиться, учить|lerne,lernst,lernt,lernt|haben|gelernt|Deutsch",
      "hören|слышать, слушать|höre,hörst,hört,hört|haben|gehört|Musik"
    ],
    drills: [
      [0,"Я живу в Берне.","Ich {wohne/wohnst/wohnen} in Bern."], [0,"Вы работаете дома. (К нескольким друзьям.)","Ihr {arbeitet/arbeiten/arbeitest} zu Hause."],
      [0,"Она учит немецкий.","Sie {lernt/lerne/lernen} Deutsch."], [0,"Мы слышим музыку.","Wir {hören/hört/hörst} Musik."],
      [1,"Ты это делаешь?","{Machst/Mache/Macht} du das?"], [1,"Вы спрашиваете? (Вежливо, на «вы».)","{Fragen/Fragst/Fragt} Sie?"],
      [2,"Он сегодня не работает.","Er {arbeitet/arbeite/arbeiten} heute nicht.","intro"], [1,"Завтра я учу немецкий. Начни с Morgen.","Morgen {lerne/lernt/lernen} ich Deutsch."],
      [2,"Мы сейчас не отвечаем.","Wir {antworten jetzt nicht/antworten jetzt/jetzt nicht antworten}.","intro"], [2,"Ты этого не говоришь.","Du {sagst das nicht/sagst das/das nicht sagst}.","intro"],
      [2,"Я этого не делаю.","Ich {mache/machst/macht} das nicht.","present"], [2,"Она сегодня не работает.","Sie {arbeitet/arbeitest/arbeiten} heute nicht.","present"],
      [3,"Как тебя зовут?","Wie {heisst/heissen/heisse} du?"], [3,"Как вас зовут? (Вежливо.)","Wie {heissen/heisst/heisse} Sie?"],
      [3,"Меня зовут Лена.","Ich {heisse/heisst/heissen} Lena."], [3,"Добрый день, госпожа Келлер!","Guten {Tag/Morgen/Abend}, Frau Keller!","intro"],
      [0,"Она сейчас отвечает.","Sie {antwortet/antwortest/antworten} jetzt.","intro"],
      [0,"Ты работаешь завтра.","Du {arbeitest/arbeitet/arbeitst} morgen."],
      [2,"Мы этого не делаем.","Wir {machen das nicht/machen das/das machen nicht}.","intro"],
      [1,"Ты учишь немецкий?","{Lernst/Lernt/Lernen} du Deutsch?"],
      [2,"Сегодня мы не учимся.","Wir {lernen heute nicht/lernen heute/heute nicht lernen}.","intro"],
      [2,"Вы сегодня не спрашиваете. (Вежливо.)","Sie {fragen/fragst/fragt} heute nicht.","present"],
      [3,"Пока, до завтра!","{Tschüss/Danke/Hallo}, bis morgen!"],
      [3,"Очень приятно, господин Вебер.","Sehr {angenehm/bitte/guten}, Herr Weber."]
    ]
  },
  {
    title: "Работа и то, что уже случилось", pages: "20, 33–50",
    verbPractice: ["nehmen", "helfen", "sehen", "kommen", "fahren"],
    goal: "Расскажи, кем ты работаешь, что делал вчера и куда ездил.",
    pastPractice: true,
    rules: [
      ["Откуда nimmst","Скажи парой: ich nehme, du nimmst. С wir снова будет nehmen."],
      ["Как сказать о прошлом","С действием вроде sehen обычно habe: ich habe gesehen. С приходом или поездкой часто bin: ich bin gekommen."],
      ["Кем и где работаешь","Кем? Als Lehrer. Где? Im Büro. У кого? Bei einer Firma."]
    ],
    words: [
      ["der Beruf", "профессия", "Was sind Sie von Beruf?"], ["die Firma", "фирма", "Ich arbeite bei einer Firma."],
      ["das Büro", "офис", "Ich bin im Büro."], ["die Bank", "банк", "Sie arbeitet bei einer Bank."],
      ["der Kollege", "коллега", "Er ist mein Kollege."], ["die Lehrerin", "учительница", "Sie arbeitet als Lehrerin."]
    ],
    verbs: [
      "nehmen|брать|nehme,nimmst,nimmt,nehmt|haben|genommen|den Bus",
      "bieten|предлагать|biete,bietest,bietet,bietet|haben|geboten|einen guten Preis",
      "helfen|помогать|helfe,hilfst,hilft,helft|haben|geholfen|dem Kollegen",
      "sehen|видеть, смотреть|sehe,siehst,sieht,seht|haben|gesehen|den Film",
      "kommen|приходить, приезжать|komme,kommst,kommt,kommt|sein|gekommen|spät",
      "fahren|ехать|fahre,fährst,fährt,fahrt|sein|gefahren|nach Bern",
      "kennen|знать, быть знакомым|kenne,kennst,kennt,kennt|haben|gekannt|diese Stadt",
      "wissen|знать факт|weiss,weisst,weiss,wisst|haben|gewusst|das"
    ],
    drills: [
      [0,"Ты едешь на автобусе.","Du {nimmst/nehmt/nehmen} den Bus."], [0,"Он помогает коллеге.","Er {hilft/helfe/helfen} dem Kollegen."],
      [0,"Мы смотрим фильм.","Wir {sehen/sieht/seht} den Film."], [0,"Ты видишь вокзал?","{Siehst/Seht/Sehen} du den Bahnhof?"],
      [1,"Я ездил в Цюрих.","Ich {bin/habe/ist} nach Zürich gefahren."], [1,"Она пришла рано.","Sie {ist/hat/sind} früh gekommen."],
      [1,"Мы видели фильм.","Wir {haben/sind/hat} den Film gesehen."], [1,"Ты приехал поездом?","{Bist/Hast/Seid} du mit dem Zug gekommen?"],
      [1,"Вы нам помогли. (К нескольким друзьям.)","Ihr {habt/seid/hast} uns geholfen."],
      [2,"Я работаю учителем.","Ich arbeite {als/bei/nach} Lehrer."], [2,"Он работает в этой фирме.","Er arbeitet {bei/als/aus} dieser Firma."],
      [2,"Я работаю инженером.","Ich arbeite {als/bei/aus} Ingenieur.","topic"],
      [2,"Я работаю в офисе.","Ich arbeite {im/ins/aus dem} Büro.","topic"],
      [2,"Где вы работаете?","{Wo/Wer/Wann} arbeiten Sie?"],
      [0,"Ты берёшь ключ?","{Nimmst/Nehmen/Nehmt} du den Schlüssel?"],
      [0,"Она видит детей издалека.","Sie {sieht/seht/sehen} die Kinder von Weitem."],
      [1,"Он ушёл домой пешком.","Er {ist/hat/bin} nach Hause gegangen."],
      [1,"Вы видели вокзал? (Вежливо.)","{Haben/Sind/Hat} Sie den Bahnhof gesehen?"],
      [2,"Она по профессии врач.","Sie ist {Ärztin/ärztlich/Ärzte}."],
      [2,"Я работаю продавцом.","Ich arbeite {als/bei/mit} Verkäufer."],
      [1,"Мы уже ответили.","Wir {haben/hat/hast} schon geantwortet."],
      [1,"Ты это сказал?","{Hast/Hat/Haben} du das gesagt?"],
      [1,"Я этого не делал.","Ich habe das nicht {gemacht/mache/machen}."],
      [1,"Она работала вчера.","Sie hat gestern {gearbeitet/gearbeiten/arbeitet}."],
      [1,"Мы слушали музыку.","Wir haben Musik {gehört/hören/gehören}.","topic"],
      [1,"Вы задали вопрос? (Вежливо.)","{Haben/Habt/Hat} Sie eine Frage gestellt?"]
    ]
  },
  {
    title: "Кто, где и когда?", pages: "51–68",
    goal: "Задай простой вопрос и скажи «меня», «мне», «с тобой» или «для тебя».",
    rules: [
      ["Кто, кого и кому","Der Tisch → er. Die Tasche → sie. Das Buch → es. Меня — mich, мне — mir."],
      ["Где, куда или когда","Сначала скажи, что хочешь узнать: Wann kommst du? Wohin gehst du?"],
      ["Где лежит, куда кладёшь","Auf dem Tisch — уже на столе. Auf den Tisch — кладёшь на стол."]
    ],
    words: [
      ["wo?", "где?", "Wo liegt der Schlüssel?"], ["wann?", "когда?", "Wann isst du?"], ["jetzt", "сейчас", "Wir essen jetzt."],
      ["später", "позже", "Ich komme später."], ["der Tisch", "стол", "Das Buch liegt auf dem Tisch."], ["die Tasche", "сумка", "Die Tasche steht dort."]
    ],
    verbs: [
      "liegen|лежать|liege,liegst,liegt,liegt|haben|gelegen|auf dem Sofa",
      "schlafen|спать|schlafe,schläfst,schläft,schlaft|haben|geschlafen|lange",
      "stehen|стоять|stehe,stehst,steht,steht|haben|gestanden|am Fenster",
      "stellen|ставить|stelle,stellst,stellt,stellt|haben|gestellt|den Stuhl ans Fenster",
      "bringen|приносить|bringe,bringst,bringt,bringt|haben|gebracht|die Tasche",
      "legen|класть|lege,legst,legt,legt|haben|gelegt|das Buch auf den Tisch",
      "essen|есть|esse,isst,isst,esst|haben|gegessen|zu Hause",
      "trinken|пить|trinke,trinkst,trinkt,trinkt|haben|getrunken|Wasser"
    ],
    drills: [
      [0,"Книга? Она лежит здесь.","Das Buch? {Es/Er/Sie} liegt hier."], [0,"Стол? Он стоит у окна.","Der Tisch? {Er/Es/Sie} steht am Fenster."],
      [0,"Сумка? Она лежит на диване.","Die Tasche? {Sie/Er/Es} liegt auf dem Sofa."],
      [1,"Когда ты ешь?","{Wann/Wo/Was} isst du?"], [1,"Куда ты ставишь стул?","{Wohin/Wann/Wer} stellst du den Stuhl?"],
      [1,"Кто приносит воду?","{Wer/Wann/Wo} bringt das Wasser?"], [1,"Сегодня мы едим дома. Начни с Heute.","Heute {essen/isst/esst} wir zu Hause."],
      [1,"Что ты пьёшь?","{Was/Wo/Wann} trinkst du?"], [2,"Книга лежит на столе.","Das Buch liegt {auf dem/auf den/auf das} Tisch."],
      [2,"Я кладу ключ на стол.","Ich lege den Schlüssel {auf den/auf dem/auf der} Tisch."],
      [2,"Сумка стоит на полу.","Die Tasche {steht/stellt/legt} auf dem Boden."],
      [2,"Она ставит сумку у окна. (Куда?)","Sie stellt die Tasche {ans/am/aus dem} Fenster."],
      [2,"Я ставлю стул перед дверью. (Куда?)","Ich stelle den Stuhl vor {die/der/dem} Tür."],
      [0,"Ключ? Он лежит у двери.","Der Schlüssel? {Er/Sie/Es} liegt bei der Tür."],
      [0,"Книги? Они лежат здесь.","Die Bücher? Sie {liegen/liegt/liegst} hier."],
      [1,"Где ты спишь?","{Wo/Wer/Wann} schläfst du?"],
      [1,"Мы пьём воду сейчас.","Wir trinken {jetzt/gestern/morgen früh} Wasser."],
      [2,"Я ставлю стакан на стол.","Ich stelle das Glas auf {den/dem/der} Tisch."],
      [2,"Стул стоит у окна.","Der Stuhl steht {am/ans/ins} Fenster."],
      [0,"Ты меня видишь?","Siehst du {mich/mir/ich}?"],
      [0,"Он помогает мне.","Er hilft {mir/mich/ich}."],
      [0,"Это для тебя.","Das ist für {dich/dir/du}."],
      [0,"Я еду с ней.","Ich fahre mit {ihr/sie/ihm}."]
    ]
  },
  {
    title: "Числа, встречи и дорога", pages: "69–90",
    goal: "Договорись о дне и часе встречи и скажи, куда ты едешь.",
    rules: [
      ["Число, день и время","Час — um sieben, день недели — am Samstag, месяц — im Mai. Возраст: 24 — vierundzwanzig. Дата: der dritte Mai, встреча — am dritten Mai."],
      ["Связываем две фразы","Und добавляет, aber значит «но», oder значит «или», denn отвечает «почему»."],
      ["Куда, откуда, до какого дня","В Берлин — nach Berlin. Из Берлина — aus Berlin. До пятницы — bis Freitag."]
    ],
    words: [
      ["einundzwanzig", "двадцать один", "Ich bin einundzwanzig."], ["halb neun", "половина девятого", "Es ist halb neun."],
      ["der Freitag", "пятница", "Wir treffen uns am Freitag."], ["aber", "но", "Ich gehe, aber Paul bleibt."],
      ["seit", "с (момента в прошлом)", "Ich lerne seit Mai Deutsch."], ["bis", "до", "Ich arbeite bis fünf."]
    ],
    verbs: [
      "weinen|плакать|weine,weinst,weint,weint|haben|geweint|vor Freude",
      "lachen|смеяться|lache,lachst,lacht,lacht|haben|gelacht|über den Witz",
      "lieben|любить|liebe,liebst,liebt,liebt|haben|geliebt|diesen Film",
      "küssen|целовать|küsse,küsst,küsst,küsst|haben|geküsst|das Kind",
      "lassen|оставлять|lasse,lässt,lässt,lasst|haben|gelassen|die Tür offen",
      "bleiben|оставаться|bleibe,bleibst,bleibt,bleibt|sein|geblieben|bis Montag",
      "gehen|идти|gehe,gehst,geht,geht|sein|gegangen|zum Bahnhof",
      "führen|вести|führe,führst,führt,führt|haben|geführt|die Gruppe"
    ],
    drills: [
      [0,"Ему 24 года.","Er ist {vierundzwanzig/vierzehn/zweiundvierzig} Jahre alt."], [0,"Я приду в семь.","Ich komme {um/am/im} sieben."],
      [0,"Мы встречаемся в субботу.","Wir treffen uns {am/um/im} Samstag."], [0,"Сейчас 8:30.","Es ist {halb neun/halb acht/um neun}."],
      [0,"Я еду в мае.","Ich fahre {im/am/um} Mai."], [1,"Я устал, но остаюсь.","Ich bin müde, {aber/oder/denn} ich bleibe."],
      [1,"Чай или кофе?","Tee {oder/denn/aber} Kaffee?"], [1,"Он смеётся, потому что шутка смешная.","Er lacht, {denn/aber/oder} der Witz ist lustig."],
      [1,"Она читает, а он спит.","Sie liest, {aber/oder/denn} er schläft.","topic"], [2,"Я еду в Берлин.","Ich fahre {nach/seit/aus} Berlin."],
      [2,"Я иду к врачу.","Ich gehe {zum/vom/beim} Arzt."], [2,"Она здесь с понедельника.","Sie ist {seit/um/nach} Montag hier."],
      [2,"Мы работаем с девяти до пяти.","Wir arbeiten von neun {bis/seit/aus} fünf."], [2,"Он из Вены.","Er kommt {aus/nach/zu} Wien."],
      [0,"Ей 32 года.","Sie ist {zweiunddreissig/dreiundzwanzig/zwölf} Jahre alt."],
      [0,"Сейчас 9:30.","Es ist {halb zehn/halb neun/um zehn}."],
      [1,"Я иду к врачу, потому что я болен.","Ich gehe zum Arzt, {denn/oder/aber} ich bin krank."],
      [1,"Он поёт и она танцует.","Er singt, {und/oder/denn} sie tanzt."],
      [2,"Он приехал из Граца.","Er ist {aus/nach/seit} Graz gekommen."],
      [2,"Занятия идут до пятницы.","Der Kurs geht {bis/seit/aus} Freitag."],
      [0,"Сегодня третье мая.","Heute ist der {dritte/dritten/drei} Mai."],
      [0,"Мы встречаемся третьего мая.","Wir treffen uns am {dritten/dritte/drei} Mai."]
    ]
  },
  {
    title: "В магазине", pages: "91–110",
    goal: "Попроси нужный товар, спроси цену и расскажи о покупке.",
    pastPractice: true,
    rules: [
      ["Один предмет и несколько","Новый предмет: ein Geschenk. Знакомый: das Geschenk. Для нескольких выучи пару der Apfel — die Äpfel. С числом: zwei Äpfel."],
      ["Что купил и кому помог","Сравни der Kunde, den Kunden и dem Kunden. Иногда меняются сразу два слова."],
      ["Покупка, прошлое и второе действие","Для заказа скажи Ich hätte gern … Для -ieren: studieren → hat studiert. Чтобы сказать «пытаюсь читать», используй Ich versuche, … zu lesen."]
    ],
    words: [
      ["der Apfel, die Äpfel","яблоко, яблоки","Ich kaufe zwei Äpfel."], ["das Buch, die Bücher","книга, книги","Die Bücher sind günstig."],
      ["der Kunde","покупатель","Der Kunde bezahlt."], ["der Preis","цена","Der Preis ist gut."],
      ["Wie viel kostet das?","Сколько это стоит?","Entschuldigung, wie viel kostet das?"], ["bar","наличными","Ich zahle bar."]
    ],
    verbs: [
      "kaufen|покупать|kaufe,kaufst,kauft,kauft|haben|gekauft|zwei Äpfel", "verkaufen|продавать|verkaufe,verkaufst,verkauft,verkauft|haben|verkauft|das Fahrrad",
      "studieren|учиться в вузе|studiere,studierst,studiert,studiert|haben|studiert|in Zürich", "verdienen|зарабатывать|verdiene,verdienst,verdient,verdient|haben|verdient|gut",
      "suchen|искать|suche,suchst,sucht,sucht|haben|gesucht|den Schlüssel", "finden|находить|finde,findest,findet,findet|haben|gefunden|den Schlüssel",
      "zählen|считать|zähle,zählst,zählt,zählt|haben|gezählt|die Münzen", "zahlen|платить|zahle,zahlst,zahlt,zahlt|haben|gezahlt|mit Karte"
    ],
    drills: [
      [0,"Я покупаю три яблока.","Ich kaufe drei {Äpfel/Apfel/Äpfeln}."], [0,"Мы покупаем две книги.","Wir kaufen zwei {Bücher/Buch/Büchern}."],
      [0,"Где сумки?","Wo sind {die/der/das} Taschen?"], [0,"У неё две сумки.","Sie hat zwei {Taschen/Tasche/Tasches}."],
      [1,"Я вижу покупателя.","Ich sehe den {Kunden/Kunde/Kundes}."], [1,"Покупатель ждёт.","Der {Kunde/Kunden/Kundes} wartet."],
      [1,"Она играет с детьми.","Sie spielt mit den {Kindern/Kinder/Kindes}."], [1,"Он покупает пальто.","Er kauft {den/der/dem} Mantel.",null,["Er kauft einen Mantel."]],
      [2,"Она училась в Цюрихе.","Sie hat in Zürich {studiert/gestudiert/studieren}."], [2,"Он продал свой велосипед.","Er hat sein Fahrrad {verkauft/geverkauft/verkaufen}."],
      [2,"Сколько стоит эта книга?","Wie viel {kostet/kosten/kostest} dieses Buch?"], [2,"Я хотел бы два яблока.","Ich {hätte/hast/hat} gern zwei Äpfel."],
      [2,"Мы нашли сумку.","Wir haben die Tasche {gefunden/gefindet/finden}."],
      [0,"Мы покупаем три окна.","Wir kaufen drei {Fenster/Fenstern/Fensters}."],
      [0,"Продавцы здесь.","{Die/Der/Das} Verkäufer sind hier."],
      [1,"Она ждёт покупателя.","Sie wartet auf den {Kunden/Kunde/Kundes}."],
      [1,"Я говорю с покупателем.","Ich spreche mit {dem/den/der} Kunden."],
      [2,"Я хорошо зарабатывал.","Ich habe gut {verdient/geverdient/verdienen}."],
      [2,"Мы заплатили наличными.","Wir haben bar {gezahlt/zahlen/zahlt}."],
      [0,"Я ищу какой-нибудь подарок.","Ich suche {ein/das/einen} Geschenk."],
      [0,"Этот подарок для Мии.","{Das/Die/Der} Geschenk ist für Mia."],
      [2,"Я пытаюсь читать по-немецки.","Ich versuche, Deutsch {zu lesen/lesen/lese}.",null,["Ich versuche Deutsch zu lesen."]]
    ]
  },
  {
    title: "Семья, желания и привычки", pages: "111–128",
    goal: "Расскажи о близких и скажи, что хочешь, можешь или должен сделать.",
    pastPractice: true,
    rules: [
      ["Я — mich, ты — dich","Подбери пару: ich–mich, du–dich, wir–uns, ihr–euch."],
      ["Могу, хочу, должен","Действие оставь на конец: Ich kann heute kommen. Для прошлого меняй первое слово: kann → konnte, muss → musste, will → wollte."],
      ["Чей это брат","Сравни mein Bruder, meine Schwester и meinen Bruder в Ich sehe meinen Bruder."]
    ],
    words: [
      ["die Eltern","родители","Meine Eltern wohnen in Bern."], ["der Bruder","брат","Mein Bruder lernt Deutsch."],
      ["die Schwester","сестра","Das ist meine Schwester."], ["die Kinder","дети","Die Kinder spielen."],
      ["können","мочь","Ich kann heute kommen."], ["müssen","быть должным","Ich muss heute arbeiten."]
    ],
    verbs: [
      "sich setzen|садиться|setze,setzt,setzt,setzt|haben|gesetzt|ans Fenster", "sich erinnern|вспоминать|erinnere,erinnerst,erinnert,erinnert|haben|erinnert|an den Urlaub",
      "sich interessieren|интересоваться|interessiere,interessierst,interessiert,interessiert|haben|interessiert|für Musik", "sich freuen|радоваться|freue,freust,freut,freut|haben|gefreut|über den Besuch",
      "sich waschen|мыться|wasche,wäschst,wäscht,wascht|haben|gewaschen|vor dem Frühstück", "sich rasieren|бриться|rasiere,rasierst,rasiert,rasiert|haben|rasiert|am Morgen",
      "sich beeilen|торопиться|beeile,beeilst,beeilt,beeilt|haben|beeilt|vor der Abfahrt", "sich erholen|отдыхать, восстанавливаться|erhole,erholst,erholt,erholt|haben|erholt|am Wochenende"
    ],
    drills: [
      [0,"Я сажусь у окна. (Куда?)","Ich setze {mich/mir/sich} ans Fenster."], [0,"Она интересуется музыкой.","Sie interessiert {sich/mich/dich} für Musik."],
      [0,"Мы торопимся.","Wir beeilen {uns/euch/sich}."], [0,"Вы радуетесь визиту? (К нескольким друзьям.)","Freut ihr {euch/uns/sich} über den Besuch?"],
      [1,"Он должен работать.","Er {muss/musst/müssen} arbeiten."], [1,"Ты можешь прийти сегодня?","{Kannst/Kann/Können} du heute kommen?"],
      [1,"Мы хотим вместе поесть.","Wir {wollen/will/wollt} zusammen essen."], [1,"Мне можно здесь сесть?","{Darf/Dürfen/Darfst} ich mich hier setzen?"],
      [1,"Она хочет выучить немецкий.","Sie will Deutsch {lernen/lernt/gelernt}."], [2,"Это моя сестра.","Das ist {meine/mein/meinen} Schwester."],
      [2,"Где твои родители?","Wo sind {deine/dein/deinen} Eltern?"], [2,"Я вижу своего брата.","Ich sehe {meinen/mein/meine} Bruder."],
      [2,"Это её сын.","Das ist {ihr/ihre/ihren} Sohn."],
      [0,"Я вспоминаю отпуск.","Ich erinnere {mich/dich/sich} an den Urlaub."],
      [0,"Ты отдыхаешь?","Erholst du {dich/mich/sich}?"],
      [1,"Она может сесть здесь.","Sie {kann/kannst/können} sich hier setzen."],
      [1,"Вы должны торопиться. (К нескольким друзьям.)","Ihr {müsst/muss/müssen} euch beeilen."],
      [2,"Это его мама.","Das ist {seine/sein/seinen} Mutter."],
      [2,"Где мой брат?","Wo ist {mein/meinen/meine} Bruder?"],
      [1,"Он вчера не мог прийти.","Er {konnte/kann/konntest} gestern nicht kommen."],
      [1,"Мы хотели уйти раньше.","Wir {wollten/wollen/wolltet} früher gehen."],
      [1,"Вам можно было остаться подольше? (К нескольким друзьям.)","{Durftet/Dürft/Durfte} ihr länger bleiben?"]
    ]
  },
  {
    title: "Поездка и слова, которые расходятся", pages: "129–148",
    goal: "Купи билет, узнай время поезда и расскажи, как прошла поездка.",
    pastPractice: true,
    rules: [
      ["Поезд отправляется","Куда делось ab? В обычной фразе оно в конце: Der Zug fährt ab. Уже уехал: ist abgefahren."],
      ["Жду поезд, мечтаю о поездке","Учи вместе: warten auf den Zug, träumen von einer Reise."],
      ["На вокзале и в гостинице","Куда билет? Eine Fahrkarte nach Basel. Уже в гостинице? Im Hotel. Идёшь туда? Ins Hotel."]
    ],
    words: [
      ["der Bahnhof","вокзал","Ich bin am Bahnhof."], ["die Abfahrt","отправление","Die Abfahrt ist um acht."],
      ["die Ankunft","прибытие","Wann ist die Ankunft?"], ["das Gleis","путь, платформа","Der Zug fährt von Gleis drei."],
      ["die Fahrkarte","билет на транспорт","Wo kaufe ich eine Fahrkarte?"], ["die Reise","поездка","Die Reise dauert drei Tage."]
    ],
    verbs: [
      "besuchen|посещать|besuche,besuchst,besucht,besucht|haben|besucht|ein Museum", "fliegen|лететь|fliege,fliegst,fliegt,fliegt|sein|geflogen|nach Wien",
      "ab/fahren|отправляться, уезжать|fahre,fährst,fährt,fahrt|sein|abgefahren|um acht", "an/kommen|прибывать|komme,kommst,kommt,kommt|sein|angekommen|am Abend",
      "bekommen|получать|bekomme,bekommst,bekommt,bekommt|haben|bekommen|eine Nachricht", "gefallen|нравиться кому-либо|gefalle,gefällst,gefällt,gefallt|haben|gefallen|dem Publikum",
      "träumen|мечтать|träume,träumst,träumt,träumt|haben|geträumt|von einer Reise", "warten|ждать|warte,wartest,wartet,wartet|haben|gewartet|auf den Zug"
    ],
    drills: [
      [0,"Поезд отправляется в восемь.","Der Zug fährt um acht {ab/an/auf}."], [0,"Когда прибывает автобус?","Wann kommt der Bus {an/ab/aus}?"],
      [0,"Поезд уже отправился.","Der Zug ist schon {abgefahren/geabfahren/abfahren}."],
      [0,"Я должен уехать в шесть.","Ich muss um sechs {abfahren/fahre ab/abgefahren}."],
      [0,"Мы прибыли вечером.","Wir sind am Abend {angekommen/geankommen/ankommen}."], [1,"Я жду поезд.","Ich warte {auf/zu/von} den Zug."],
      [1,"Он мечтает о поездке.","Er träumt {von/auf/zu} einer Reise."], [1,"Мы ждём автобус.","Wir warten auf {den/dem/der} Bus."],
      [1,"Она мечтает об отпуске.","Sie träumt von {dem/den/die} Urlaub."], [2,"Я в отеле.","Ich bin {im/ins/zur} Hotel."],
      [2,"Я иду в отель.","Ich gehe {ins/im/am} Hotel.",null,["Ich gehe in das Hotel."]], [2,"Мы идём к вокзалу.","Wir gehen {zum/zur/vom} Bahnhof."],
      [2,"Она едет к остановке.","Sie fährt {zur/zum/vom} Haltestelle."],
      [0,"Когда отправляется автобус?","Wann {fährt/fahrst/fahrt} der Bus ab?"],
      [0,"Мы должны приехать вовремя.","Wir müssen pünktlich {ankommen/kommen an/angekommen}."],
      [1,"Ты ждёшь поезд?","Wartest du {auf/von/mit} den Zug?"],
      [1,"Он мечтает о море.","Er träumt {vom/zum/ins} Meer."],
      [2,"Мы у вокзала.","Wir sind {am/zum/ans} Bahnhof."],
      [2,"Я еду в школу. (К зданию.)","Ich fahre {zur/zum/vom} Schule."],
      [2,"Билет до Базеля, пожалуйста.","Eine Fahrkarte {nach/in/aus} Basel, bitte."],
      [2,"С какого пути отправляется поезд?","{Von welchem/Welcher/Zu welchem} Gleis fährt der Zug ab?"]
    ]
  },
  {
    title: "Одежда и покупки", pages: "149–168",
    goal: "Выбери вещь, попроси свой размер и скажи, что наденешь.",
    pastPractice: true,
    rules: [
      ["Одежда и примерка","Сравни Der Mantel ist warm и Ich kaufe den Mantel. Для примерки спроси: Kann ich das anprobieren?"],
      ["Нужен один или не нужен ни один","С Mantel: einen или keinen. С Jacke: eine или keine."],
      ["Для кого и без чего","Запомни фразами: für den Bruder, ohne den Mantel, durch den Park."]
    ],
    words: [
      ["der Mantel","пальто","Der Mantel ist warm."], ["die Jacke","куртка","Ich trage eine blaue Jacke."],
      ["das Hemd","рубашка","Das Hemd ist weiss."], ["die Schuhe","туфли, обувь","Die Schuhe sind bequem."],
      ["die Grösse","размер","Welche Grösse brauchen Sie?"], ["ohne","без","Ich gehe ohne Jacke."]
    ],
    verbs: [
      "an/ziehen|надевать|ziehe,ziehst,zieht,zieht|haben|angezogen|den Mantel", "tragen|носить|trage,trägst,trägt,tragt|haben|getragen|eine blaue Jacke",
      "auf/stehen|вставать|stehe,stehst,steht,steht|sein|aufgestanden|um sieben", "fallen|падать|falle,fällst,fällt,fallt|sein|gefallen|auf den Boden",
      "halten|держать|halte,hältst,hält,haltet|haben|gehalten|die Tasche", "wählen|выбирать|wähle,wählst,wählt,wählt|haben|gewählt|das schwarze Hemd",
      "verstecken|прятать|verstecke,versteckst,versteckt,versteckt|haben|versteckt|den Schlüssel", "brauchen|нуждаться|brauche,brauchst,braucht,braucht|haben|gebraucht|einen Mantel"
    ],
    drills: [
      [0,"Он носит это пальто.","Er trägt {den/der/dem} Mantel."], [0,"Я ищу эту куртку.","Ich suche {die/der/das} Jacke."],
      [0,"Она выбирает эту рубашку.","Sie wählt {das/dem/den} Hemd."], [0,"Мы покупаем эти туфли.","Wir kaufen {die/der/den} Schuhe."],
      [1,"Мне нужно пальто.","Ich brauche {einen/ein/einem} Mantel."], [1,"Я не ношу пальто.","Ich trage {keinen/kein/keinem} Mantel."],
      [1,"Она покупает куртку.","Sie kauft {eine/einen/einem} Jacke."], [1,"Я не ищу обувь.","Ich suche {keine/keinen/kein} Schuhe."],
      [2,"Это для брата.","Das ist für {den/der/dem} Bruder."], [2,"Я гуляю без пальто.","Ich gehe ohne {den/der/dem} Mantel spazieren."],
      [2,"Мы идём через парк.","Wir gehen durch {den/der/dem} Park."], [2,"Он бежит против ветра.","Er läuft gegen {den/der/dem} Wind."],
      [0,"Она ищет этот ключ.","Sie sucht {den/der/dem} Schlüssel."],
      [0,"Он надевает это пальто.","Er zieht {den/der/dem} Mantel an."],
      [1,"Мне нужна рубашка.","Ich brauche {ein/einen/einem} Hemd."],
      [1,"Она не покупает куртку.","Sie kauft {keine/kein/keinen} Jacke."],
      [2,"Это для ребёнка.","Das ist für {das/dem/den} Kind."],
      [2,"Мы гуляем без обуви.","Wir gehen {ohne/mit/bei} Schuhe spazieren."],
      [0,"Можно это примерить?","Kann ich das {anprobieren/probiere an/anprobiert}?"],
      [0,"У вас есть это на размер больше?","Haben Sie das eine Nummer {grösser/gross/grösste}?"]
    ]
  },
  {
    title: "Кому помогаешь и где учишься", pages: "169–188",
    goal: "Скажи, кому даёшь или отправляешь что-то, и расскажи, где работаешь или учишься.",
    pastPractice: true,
    rules: [
      ["Кому помогаешь или даришь","В Ich schenke dem Kind ein Buch слова dem Kind отвечают на «кому?», ein Buch — на «что?»."],
      ["Как сказать «этому» или «одному»","Dem Kind — этому ребёнку. Einem Kind — одному ребёнку. Den Kindern — детям."],
      ["Дорога, работа и учёба","Запоминай целиком: mit dem Bus, bei einer Firma, aus dem Büro, an der Universität."]
    ],
    words: [
      ["die Kollegin","коллега","Ich zeige der Kollegin den Plan."], ["der Unterricht","занятия, урок","Der Unterricht beginnt um neun."],
      ["die Universität","университет","Ich fahre zur Universität."], ["der Arbeitsplatz","рабочее место","Mein Arbeitsplatz ist im Büro."],
      ["die Nachricht","сообщение","Ich schicke dir eine Nachricht."], ["mit","с, на (транспорте)","Ich fahre mit dem Bus."]
    ],
    verbs: [
      "gratulieren|поздравлять|gratuliere,gratulierst,gratuliert,gratuliert|haben|gratuliert|dem Kollegen", "wünschen|желать|wünsche,wünschst,wünscht,wünscht|haben|gewünscht|dir viel Glück",
      "schenken|дарить|schenke,schenkst,schenkt,schenkt|haben|geschenkt|dem Kind ein Buch", "danken|благодарить|danke,dankst,dankt,dankt|haben|gedankt|der Kollegin",
      "zeigen|показывать|zeige,zeigst,zeigt,zeigt|haben|gezeigt|den Gästen das Zimmer", "schicken|отправлять|schicke,schickst,schickt,schickt|haben|geschickt|dem Lehrer eine Nachricht",
      "glauben|верить|glaube,glaubst,glaubt,glaubt|haben|geglaubt|dem Zeugen", "folgen|следовать за кем-то|folge,folgst,folgt,folgt|sein|gefolgt|der Gruppe"
    ],
    drills: [
      [0,"Он дарит ребёнку книгу.","Er schenkt {dem/das/den} Kind ein Buch."], [0,"Я благодарю коллегу (женщину).","Ich danke {der/die/den} Kollegin."],
      [0,"Мы следуем за группой.","Wir folgen {der/die/das} Gruppe."], [0,"Она помогает соседу.","Sie hilft {dem/den/der} Nachbarn."],
      [1,"Я отвечаю одной коллеге.","Ich antworte {einer/eine/einen} Kollegin."],
      [1,"Учитель помогает детям.","Der Lehrer hilft den {Kindern/Kinder/Kindes}."], [1,"Мы отправляем письмо одному клиенту.","Wir schicken {einem/einen/ein} Kunden einen Brief."],
      [1,"Я показываю гостям комнату.","Ich zeige {den/die/der} Gästen das Zimmer."],
      [2,"Я еду на автобусе.","Ich fahre mit {dem/den/die} Bus."], [2,"Он выходит из офиса.","Er kommt {aus dem/aus den/aus der} Büro."],
      [2,"Она работает в фирме.","Sie arbeitet bei {einer/eine/einen} Firma."], [2,"Мы идём в университет.","Wir gehen {zur/zum/von der} Universität."],
      [0,"Я верю свидетелю.","Ich glaube {dem/den/die} Zeugen."],
      [0,"Она поздравляет брата.","Sie gratuliert {dem/den/das} Bruder."],
      [1,"Мы помогаем одному ребёнку.","Wir helfen {einem/ein/einen} Kind."],
      [1,"Он показывает одной подруге фото.","Er zeigt {einer/eine/einen} Freundin ein Foto."],
      [2,"Он живёт у родителей.","Er wohnt bei {den/die/dem} Eltern."],
      [2,"Она едет в школу на трамвае.","Sie fährt mit {der/die/den} Tram zur Schule."],
      [2,"Я учусь в Цюрихском университете.","Ich studiere {an der/an die/aus der} Universität Zürich."]
    ]
  },
  {
    title: "Увлечения и как начать фразу", pages: "189–204",
    goal: "Расскажи, что любишь делать, и начни фразу с «я», «сегодня» или «в парке».",
    pastPractice: true,
    rules: [
      ["Как начать с дня, места или условия","После Am Samstag или целого Wenn es regnet поставь слово про действие: Am Samstag spiele ich Fussball. Wenn es regnet, bleiben wir zu Hause."],
      ["Что остаётся в конце","Сравни Heute sehe ich fern и Gestern habe ich ferngesehen. Последнее слово отделено от изменяемого."],
      ["Расскажи, что любишь","Ich male gern — я люблю рисовать. Если само занятие становится названием, добавь das и пиши с большой буквы: das Kochen."]
    ],
    words: [
      ["gern","с удовольствием, охотно","Ich male gern."], ["lieber","охотнее","Ich tanze lieber."],
      ["das Hobby","увлечение","Was ist dein Hobby?"], ["am Wochenende","в выходные","Am Wochenende spiele ich Fussball."],
      ["das Konzert","концерт","Ich gehe gern ins Konzert."], ["zusammen","вместе","Wir singen zusammen."]
    ],
    verbs: [
      "malen|рисовать|male,malst,malt,malt|haben|gemalt|ein Bild", "spielen|играть|spiele,spielst,spielt,spielt|haben|gespielt|Fussball",
      "tanzen|танцевать|tanze,tanzt,tanzt,tanzt|haben|getanzt|im Kurs", "singen|петь|singe,singst,singt,singt|haben|gesungen|im Chor",
      "reisen|путешествовать|reise,reist,reist,reist|sein|gereist|nach Italien", "schwimmen|плыть|schwimme,schwimmst,schwimmt,schwimmt|sein|geschwommen|ans Ufer",
      "laufen|бежать|laufe,läufst,läuft,lauft|sein|gelaufen|zum Bahnhof", "fern/sehen|смотреть телевизор|sehe,siehst,sieht,seht|haben|ferngesehen|am Abend"
    ],
    drills: [
      [0,"В субботу я играю в футбол. Начни с Am Samstag.","Am Samstag {spiele ich/ich spiele/spielen ich} Fussball."],
      [0,"Сегодня мы поём в хоре. Начни с Heute.","Heute {singen wir/wir singen/singt wir} im Chor."],
      [0,"В парке она бегает. Начни с Im Park.","Im Park {läuft sie/sie läuft/laufen sie}."],
      [0,"Вечером он рисует. Начни с Am Abend.","Am Abend {malt er/er malt/malen er}."],
      [1,"Сегодня я смотрю телевизор. Начни с Heute.","Heute sehe ich {fern/an/auf}."],
      [1,"Вчера мы пели. Начни с Gestern.","Gestern {haben wir/wir haben/habt wir} gesungen."],
      [1,"Завтра я хочу плавать. Начни с Morgen.","Morgen will ich {schwimmen/schwimme/geschwommen}."],
      [1,"В июле она съездила в Рим. Начни с Im Juli.","Im Juli ist sie nach Rom {gereist/reist/reisen}."],
      [2,"Чем ты любишь заниматься?","Was {machst du/du machst/machen du} gern?"],
      [2,"Я люблю рисовать, но танцую охотнее.","Ich male gern, aber ich tanze {lieber/gernsten/mehr gern}."],
      [2,"Мы любим петь вместе.","Wir singen {gern/lieber nicht/ungern} zusammen."],
      [2,"В выходные я люблю танцевать. Начни с Am Wochenende.","Am Wochenende {tanze ich/ich tanze/tanzen ich} gern."],
      [0,"В воскресенье он играет в теннис. Начни с Am Sonntag.","Am Sonntag {spielt er/er spielt/spielen er} Tennis."],
      [0,"Утром я читаю. Начни с Am Morgen.","Am Morgen {lese ich/ich lese/lesen ich}."],
      [1,"Вчера она посмотрела телевизор. Начни с Gestern.","Gestern hat sie {ferngesehen/gesehen fern/fernsehen}."],
      [1,"Сегодня он хочет петь. Начни с Heute.","Heute will er {singen/singt/gesungen}."],
      [2,"Мне нравится рисовать.","Ich male {gern/nicht gern/ungern}."],
      [2,"Я лучше поплаваю, чем побегаю.","Ich schwimme {lieber/mehr gern/am lieber}, als ich laufe."],
      [0,"Если пойдёт дождь, мы останемся дома. Начни с Wenn es regnet.","Wenn es regnet, {bleiben wir/wir bleiben/bleibt wir} zu Hause."],
      [2,"Мне нравится готовить. Начни с названия занятия.","Das {Kochen/kocht/koche} macht mir Spass."]
    ]
  },
  {
    title: "Погода, цвета и сравнения", pages: "205–224",
    goal: "Опиши погоду и цвет, а затем скажи, что теплее, выше или лучше.",
    rules: [
      ["Цвет и погода","После ist скажи Die Jacke ist blau. Перед названием вещи у цвета есть окончание: das weisse Hemd."],
      ["Теплее, чем, или так же тепло","Теплее — wärmer als gestern. Так же тепло — so warm wie gestern. Теплее всего — am wärmsten."],
      ["Уже холодно или становится холодно","Es ist kalt — уже холодно. Es wird kalt — становится холодно."]
    ],
    words: [
      ["bewölkt","облачно","Heute ist es bewölkt."], ["windig","ветрено","Am See ist es windig."],
      ["der Regen","дождь","Der Regen beginnt."], ["der Schnee","снег","Der Schnee schmilzt."],
      ["blau","синий","Die Jacke ist blau."], ["weiss","белый","Das Hemd ist weiss."]
    ],
    verbs: [
      "beginnen|начинать|beginne,beginnst,beginnt,beginnt|haben|begonnen|mit der Übung", "beenden|заканчивать|beende,beendest,beendet,beendet|haben|beendet|die Arbeit",
      "erscheinen|появляться|erscheine,erscheinst,erscheint,erscheint|sein|erschienen|auf dem Bildschirm", "verschwinden|исчезать|verschwinde,verschwindest,verschwindet,verschwindet|sein|verschwunden|hinter der Tür",
      "werden|становиться|werde,wirst,wird,werdet|sein|geworden|müde", "wechseln|сменять|wechsle,wechselst,wechselt,wechselt|haben|gewechselt|die Jacke",
      "schliessen|закрывать|schliesse,schliesst,schliesst,schliesst|haben|geschlossen|das Fenster", "öffnen|открывать|öffne,öffnest,öffnet,öffnet|haben|geöffnet|die Tür"
    ],
    drills: [
      [0,"Пальто чёрное.","Der Mantel ist {schwarz/schwarzer/schwarzen}."], [0,"Куртка синяя.","Die Jacke ist {blau/blaue/blauen}."],
      [0,"Я покупаю белую рубашку.","Ich kaufe das {weisse/weiss/weissen} Hemd."], [0,"Сегодня ветрено.","Heute ist es {windig/windige/Wind}."],
      [1,"Сегодня теплее, чем вчера.","Heute ist es wärmer {als/wie/so} gestern."],
      [1,"Гора такая же высокая, как та.","Der Berg ist so hoch {wie/als/mehr} der andere."],
      [1,"В пятницу было холоднее всего.","Am Freitag war es am {kältesten/kälter/kalt}."],
      [1,"Сегодня погода лучше.","Heute ist das Wetter {besser/guter/am gut}."],
      [2,"Завтра станет холоднее. Начни с Morgen.","Morgen {wird/ist/hat} es kälter."], [2,"Идёт снег.","Es {schneit/schnee/schneien}."],
      [2,"Идёт дождь.","{Es/Er/Sie} regnet."], [2,"Ветер усиливается.","Der Wind wird {stärker/stärkste/starken}."],
      [0,"Небо серое.","Der Himmel ist {grau/graue/grauer}."],
      [0,"Платье красное.","Das Kleid ist {rot/rotes/roten}."],
      [1,"Сегодня холоднее, чем в понедельник.","Heute ist es kälter {als/so/wie} am Montag."],
      [1,"Сегодня самый ветреный день.","Heute ist es am {windigsten/windiger/windig}."],
      [2,"Становится тепло.","Es {wird/werden/hat} warm."],
      [2,"Вчера шёл дождь. Начни с Gestern.","Gestern hat es {geregnet/regnet/regnen}.","topic"]
    ]
  },
  {
    title: "Заказываем еду", pages: "225–240",
    goal: "Закажи еду и скажи, какой суп, хлеб или напиток хочешь.",
    rules: [
      ["Какой салат или какая суповая порция","Сравни den frischen Salat, die frische Suppe и das frische Brot."],
      ["Короткие слова меняют описание","Сравни ein kaltes Getränk и einen kleinen Salat. После mit с dem или einer здесь будет -en: mit dem frischen Brot."],
      ["Как заказать","Начни Ich hätte gern. Добавь, что хочешь заказать."]
    ],
    words: [
      ["die Suppe","суп","Die Suppe ist heiss."], ["der Salat","салат","Ich bestelle einen Salat."],
      ["das Brot","хлеб","Wir essen frisches Brot."], ["das Getränk","напиток","Ich nehme ein kaltes Getränk."],
      ["die Rechnung","счёт","Die Rechnung, bitte."], ["frisch","свежий","Das Gemüse ist frisch."]
    ],
    verbs: [
      "ein/laden|приглашать|lade,lädst,lädt,ladet|haben|eingeladen|die Freunde zum Essen", "treffen|встречать|treffe,triffst,trifft,trefft|haben|getroffen|die Freunde",
      "besprechen|обсуждать|bespreche,besprichst,bespricht,besprecht|haben|besprochen|das Menü", "sitzen|сидеть|sitze,sitzt,sitzt,sitzt|haben|gesessen|am Tisch",
      "bestellen|заказывать|bestelle,bestellst,bestellt,bestellt|haben|bestellt|eine heisse Suppe", "kochen|готовить|koche,kochst,kocht,kocht|haben|gekocht|eine Suppe",
      "an/sehen|смотреть, рассматривать|sehe,siehst,sieht,seht|haben|angesehen|die Speisekarte", "zu/hören|внимательно слушать|höre,hörst,hört,hört|haben|zugehört|der Köchin"
    ],
    drills: [
      [0,"Я беру этот свежий салат.","Ich nehme den {frischen/frische/frischer} Salat."],
      [0,"Он заказывает этот горячий суп.","Er bestellt die {heisse/heissen/heisser} Suppe."],
      [0,"Мы едим этот свежий хлеб.","Wir essen das {frische/frischen/frisches} Brot."],
      [0,"Она покупает эти зелёные яблоки.","Sie kauft die {grünen/grüne/grüner} Äpfel."],
      [1,"Я заказываю холодный напиток.","Ich bestelle ein {kaltes/kalte/kalten} Getränk."],
      [1,"Она хочет маленький салат.","Sie möchte einen {kleinen/kleine/kleines} Salat."],
      [1,"Я ем хлеб с горячим супом.","Ich esse Brot mit einer {heissen/heisse/heisses} Suppe."],
      [1,"Мы едим суп со свежим хлебом.","Wir essen Suppe mit dem {frischen/frische/frisches} Brot."],
      [2,"Я хотел бы маленький салат.","Ich {hätte/habe/hat} gern einen kleinen Salat."],
      [2,"Счёт, пожалуйста.","Die {Rechnung/Frage/Karte}, bitte."],
      [2,"Что в супе?","Was ist in {der/die/den} Suppe?"],
      [2,"Я возьму чай, пожалуйста.","Ich {nehme/nehmt/nimmst} einen Tee, bitte."],
      [0,"Я беру эту холодную воду.","Ich nehme das {kalte/kalten/kaltes} Wasser."],
      [0,"Она заказывает это маленькое блюдо.","Sie bestellt das {kleine/kleinen/kleiner} Gericht."],
      [1,"Он берёт горячий чай.","Er nimmt einen {heissen/heisse/heisses} Tee."],
      [1,"Она ест хлеб с этим мягким сыром.","Sie isst Brot mit dem {weichen/weiche/weicher} Käse."],
      [2,"Я хотел бы свежий салат.","Ich hätte {gern/gestern/lang} einen frischen Salat."],
      [2,"В супе есть чеснок?","Ist {da/dorther/wohin} Knoblauch drin?"]
    ]
  },
  {
    title: "Город и как найти дорогу", pages: "241–260",
    goal: "Спроси дорогу и объясни, когда, как часто или насколько что-то происходит.",
    rules: [
      ["Когда и как часто","Oft — часто, selten — редко. Noch — всё ещё, schon — уже. Если начал с Heute, дальше поставь слово про действие: Heute gehe ich ins Museum."],
      ["Слишком, достаточно или быстрее","Zu стоит перед словом: zu langsam. Genug — после: schnell genug. Для сравнения: schneller als ich."],
      ["Как пройти","Назови шаги по очереди: zuerst geradeaus, dann nach links."]
    ],
    words: [
      ["die Kreuzung","перекрёсток","An der Kreuzung gehe ich nach links."], ["die Stadt","город","Heute fahre ich in die Stadt."],
      ["geradeaus","прямо","Gehen Sie geradeaus."], ["links","налево, слева","Das Museum liegt links."],
      ["oft","часто","Wir gehen oft ins Museum."], ["fast","почти","Der Park ist fast leer."]
    ],
    verbs: [
      "vor/haben|планировать|habe,hast,hat,habt|haben|vorgehabt|einen Ausflug", "nutzen|использовать|nutze,nutzt,nutzt,nutzt|haben|genutzt|die App",
      "verbrauchen|тратить, расходовать|verbrauche,verbrauchst,verbraucht,verbraucht|haben|verbraucht|viel Strom", "bauen|строить|baue,baust,baut,baut|haben|gebaut|ein Haus",
      "entwickeln|разрабатывать|entwickle,entwickelst,entwickelt,entwickelt|haben|entwickelt|eine App", "leben|жить|lebe,lebst,lebt,lebt|haben|gelebt|in der Stadt",
      "spazieren/gehen|гулять|gehe,gehst,geht,geht|sein|spazieren gegangen|im Park", "zurück/kehren|возвращаться|kehre,kehrst,kehrt,kehrt|sein|zurückgekehrt|am Abend"
    ],
    drills: [
      [0,"Я часто хожу в музей.","Ich gehe {oft/nie/selten} ins Museum."], [0,"Мы уже дома.","Wir sind {schon/noch/nie} zu Hause."],
      [0,"Сегодня она в городе. Начни с Heute.","Heute {ist sie/sie ist/sind sie} in der Stadt."], [0,"Трамвай всё ещё здесь.","Die Tram ist {noch/schon/nie} hier."],
      [1,"Автобус едет слишком медленно.","Der Bus fährt {zu/sehr/fast} langsam."], [1,"Это достаточно близко.","Das ist nah {genug/zu/sehr}."],
      [1,"Она бегает быстрее меня.","Sie läuft {schneller/schnell/am schnellsten} als ich."], [1,"Я лучше пойду пешком.","Ich gehe {lieber/mehr/öfter} zu Fuss."],
      [2,"Как мне пройти к музею?","Wie komme ich {zum/vom/beim} Museum?"], [2,"Сначала идите прямо.","Gehen Sie zuerst {geradeaus/links/zurück}."],
      [2,"Затем идите налево.","Gehen Sie dann nach {links/rechts/Hause}."], [2,"Где перекрёсток?","{Wo/Wann/Wohin} ist die Kreuzung?"],
      [0,"Мы редко ходим в кино.","Wir gehen {selten/oft/immer} ins Kino."],
      [0,"Сейчас я еду в город. Начни с Jetzt.","Jetzt {fahre ich/ich fahre/fahren ich} in die Stadt."],
      [1,"Это почти готово.","Das ist {fast/sehr/zu} fertig."],
      [1,"Парк слишком далеко.","Der Park ist {zu/genug/kaum} weit."],
      [2,"Затем направо.","Dann nach {rechts/links/hinten}."],
      [2,"Музей очень близко.","Das Museum ist {sehr/zu/fast} nah."]
    ]
  },
  {
    title: "Квартира. Где, куда и о чём", pages: "261–278",
    goal: "Опиши своё жильё и научись спрашивать «чем?» и «о чём?».",
    rules: [
      ["Где или куда","Wo? — hier, dort, drinnen. Wohin? — hierhin, dorthin, hinein."],
      ["Чем и о чём","В womit спряталось mit, в worüber — über. О человеке: Mit wem?"],
      ["Этим или об этом","Скажи вопрос и ответ парой: Womit? — Damit. Worüber? — Darüber."]
    ],
    words: [
      ["die Wohnung","квартира","Die Wohnung hat drei Zimmer."], ["das Wohnzimmer","гостиная","Das Sofa steht im Wohnzimmer."],
      ["der Balkon","балкон","Die Wohnung hat einen Balkon."], ["drinnen","внутри","Wir bleiben drinnen."],
      ["daneben","рядом с этим","Daneben ist die Küche."], ["darüber","об этом","Wir sprechen darüber."]
    ],
    verbs: [
      "an/rufen|звонить по телефону|rufe,rufst,ruft,ruft|haben|angerufen|den Vermieter", "sprechen|говорить|spreche,sprichst,spricht,sprecht|haben|gesprochen|über die Wohnung",
      "erklären|объяснять|erkläre,erklärst,erklärt,erklärt|haben|erklärt|den Plan", "wiederholen|повторять|wiederhole,wiederholst,wiederholt,wiederholt|haben|wiederholt|den Satz",
      "schreiben|писать|schreibe,schreibst,schreibt,schreibt|haben|geschrieben|eine Nachricht", "übersetzen|переводить текст|übersetze,übersetzt,übersetzt,übersetzt|haben|übersetzt|den Text",
      "versuchen|пытаться, пробовать|versuche,versuchst,versucht,versucht|haben|versucht|es noch einmal", "raten|советовать|rate,rätst,rät,ratet|haben|geraten|zu einer Pause"
    ],
    drills: [
      [0,"Мы остаёмся внутри.","Wir bleiben {drinnen/hinein/hinaus}."], [0,"Подойди, пожалуйста, сюда!","Komm bitte {her/hin/dort}!"],
      [0,"Я выхожу наружу.","Ich gehe {hinaus/hinein/drinnen}."], [0,"Стул стоит здесь рядом со мной.","Der Stuhl steht {hier/hin/her} neben mir."],
      [1,"О чём вы говорите?","{Worüber/Womit/Wofür} sprecht ihr?"], [1,"С кем ты говоришь?","Mit {wem/wen/wer} sprichst du?"],
      [1,"Чего ты ждёшь? (О вещи.)","{Worauf/Wovon/Womit} wartest du?"], [1,"Чем ты пишешь?","{Womit/Worüber/Wofür} schreibst du?"],
      [2,"Мы говорим об этом.","Wir sprechen {darüber/damit/dafür}."], [2,"Я пишу этим. (Например, этой ручкой.)","Ich schreibe {damit/darüber/davor}."],
      [2,"Мы говорим с ней.","Wir sprechen mit {ihr/sie/ihm}."], [2,"Рядом с этим находится кухня.","{Daneben/Worüber/Darauf} ist die Küche."],
      [0,"Снаружи холодно.","{Draussen/Hinaus/Hinein} ist es kalt."],
      [0,"Иди туда!","Geh {dorthin/dorther/drinnen}!"],
      [1,"О чём ты мечтаешь?","{Wovon/Womit/Worauf} träumst du?"],
      [1,"Кого вы ждёте?","Auf {wen/wem/was} wartet ihr?"],
      [2,"Я жду этого. (Речь о событии.)","Ich warte {darauf/damit/daran}."],
      [2,"Ваза стоит на нём. (О столе.)","Die Vase steht {darauf/damit/darüber}.","topic"]
    ]
  },
  {
    title: "Просьбы и прогулка", pages: "279–296",
    goal: "Дай короткую подсказку по дороге и скажи «кто-то», «ничего» или «нигде».",
    rules: [
      ["Что-то, кто-то, где-то","Для людей: jemand и niemand. Для вещей: etwas и nichts. Для места: irgendwo и nirgends."],
      ["Нет вещи или не делаю","Сравни Ich habe kein Fahrrad и Ich komme nicht."],
      ["Скажи, что нужно сделать","Одному: Komm! Нескольким: Kommt! Вежливо: Kommen Sie bitte! Если есть короткая часть вроде an, оставь её в конце: Ruf mich an!"]
    ],
    words: [
      ["etwas","что-то","Ich höre etwas."], ["niemand","никто","Hier ist niemand."],
      ["nirgends","нигде","Ich finde den Schlüssel nirgends."], ["der Wald","лес","Wir gehen in den Wald."],
      ["der See","озеро","Wir baden im See."], ["der Weg","дорога, тропа","Bleiben Sie auf dem Weg."]
    ],
    verbs: [
      "hoffen|надеяться|hoffe,hoffst,hofft,hofft|haben|gehofft|auf gutes Wetter", "sich beunruhigen|волноваться|beunruhige,beunruhigst,beunruhigt,beunruhigt|haben|beunruhigt|wegen der Nachricht",
      "versprechen|обещать|verspreche,versprichst,verspricht,versprecht|haben|versprochen|schnelle Hilfe", "bitten|просить|bitte,bittest,bittet,bittet|haben|gebeten|um Hilfe",
      "baden|купаться|bade,badest,badet,badet|haben|gebadet|im See", "wachsen|расти|wachse,wächst,wächst,wachst|sein|gewachsen|schnell",
      "verlieren|терять, проигрывать|verliere,verlierst,verliert,verliert|haben|verloren|den Schlüssel", "gewinnen|выигрывать|gewinne,gewinnst,gewinnt,gewinnt|haben|gewonnen|das Spiel"
    ],
    drills: [
      [0,"Кто-то ждёт снаружи.","{Jemand/Niemand/Nichts} wartet draussen."], [0,"Я ничего не нашёл.","Ich habe {nichts/etwas/alles} gefunden."],
      [0,"Мы нигде её не видим.","Wir sehen sie {nirgends/überall/irgendwo}."], [0,"Я никогда не купаюсь в озере.","Ich bade {nie/immer/oft} im See."],
      [1,"У нас нет времени.","Wir haben {keine/kein/keinen} Zeit."], [1,"Этот путь не длинный.","Der Weg ist {nicht/kein/nichts} lang."],
      [1,"У меня нет велосипеда.","Ich habe {kein/keine/keinen} Fahrrad."], [1,"Он не покупает яблок.","Er kauft {keine/keinen/kein} Äpfel."],
      [2,"Подожди здесь! (На «ты».)","{Warte/Wartet/Warten Sie} hier!"], [2,"Идите с нами! (К нескольким друзьям.)","{Kommt/Komm/Kommen Sie} mit!"],
      [2,"Оставайтесь на тропе, пожалуйста. (Вежливо.)","{Bleiben Sie/Bleibt/Bleib} bitte auf dem Weg."],
      [2,"Позвони мне! (На «ты».)","Ruf mich {an/ab/auf}!"],
      [0,"Я что-то слышу.","Ich höre {etwas/nichts/niemanden}."],
      [0,"Ключ лежит где-то здесь.","Der Schlüssel liegt {irgendwo/nirgends/überall} hier."],
      [1,"Она не придёт сегодня.","Sie kommt heute {nicht/kein/nichts}."],
      [1,"У них нет собаки.","Sie haben {keinen/kein/keine} Hund."],
      [2,"Приходи завтра! (На «ты».)","{Komm/Kommt/Kommen Sie} morgen!"],
      [2,"Подождите у озера! (К нескольким друзьям.)","{Wartet/Warte/Warten Sie} am See!"]
    ]
  },
  {
    title: "Самочувствие и внешность", pages: "297–314",
    goal: "Скажи, как себя чувствуешь, и опиши человека в нескольких фразах.",
    rules: [
      ["Хочу пить и хочу есть","Учи вместе: Hunger haben, Durst haben и Zeit haben."],
      ["Как ты себя чувствуешь","Здесь «устал» — Ich bin müde. «Хочу есть» — Ich habe Hunger."],
      ["Как выглядит человек","Ist — какой, hat — что у него есть, trägt — что носит."]
    ],
    words: [
      ["Hunger haben","быть голодным","Ich habe Hunger."], ["Durst haben","хотеть пить","Hast du Durst?"],
      ["zufrieden sein","быть довольным","Wir sind zufrieden."], ["die Haare","волосы","Sie hat kurze Haare."],
      ["die Augen","глаза","Er hat braune Augen."], ["die Brille","очки","Er trägt eine Brille."]
    ],
    verbs: [
      "erfahren|узнавать|erfahre,erfährst,erfährt,erfahrt|haben|erfahren|die Wahrheit", "vergessen|забывать|vergesse,vergisst,vergisst,vergesst|haben|vergessen|den Namen",
      "lehren|преподавать|lehre,lehrst,lehrt,lehrt|haben|gelehrt|an der Universität", "sich entschuldigen|извиняться|entschuldige,entschuldigst,entschuldigt,entschuldigt|haben|entschuldigt|für den Fehler",
      "lesen|читать|lese,liest,liest,lest|haben|gelesen|das Buch", "erzählen|рассказывать|erzähle,erzählst,erzählt,erzählt|haben|erzählt|eine Geschichte",
      "denken|думать|denke,denkst,denkt,denkt|haben|gedacht|an den Urlaub", "verstehen|понимать|verstehe,verstehst,versteht,versteht|haben|verstanden|die Frage"
    ],
    drills: [
      [0,"Я голоден.","Ich {habe/bin/ist} Hunger."], [0,"Ты хочешь пить?","{Hast/Bist/Habt} du Durst?"],
      [0,"У неё нет времени.","Sie hat {keine/kein/keinen} Zeit."], [0,"Ты прав.","Du {hast/bist/hat} Recht."],
      [1,"Мы готовы.","Wir {sind/haben/ist} bereit."], [1,"Она довольна.","Sie {ist/hat/bist} zufrieden."],
      [1,"Я начинаю уставать.","Ich {werde/bin/habe} müde.","topic"], [1,"Ты завтра участвуешь?","{Bist/Hast/Seid} du morgen dabei?","topic"],
      [2,"У неё короткие волосы.","Sie hat {kurze/kurz/kurzen} Haare."], [2,"Он носит очки.","Er trägt {eine/ein/einen} Brille."],
      [2,"Её глаза голубые.","Ihre Augen sind {blau/blaue/blauen}."], [2,"Он высокого роста.","Er ist {gross/grosser/grossen}."],
      [0,"Я хочу пить.","Ich {habe/bin/hat} Durst."],
      [0,"У тебя есть время? (На «ты».)","{Hast/Bist/Habt} du Zeit?"],
      [1,"Он устал.","Er {ist/hat/sind} müde."],
      [1,"Мы довольны.","Wir sind {zufrieden/zufriedene/zufriedenen}."],
      [2,"У него карие глаза.","Er hat {braune/braun/braunes} Augen."],
      [2,"Она носит красную куртку.","Sie trägt {eine/einen/ein} rote Jacke."]
    ]
  },
];

const polyglotFinal = [
  ["Was machst du morgens zuerst?", "Zuerst trinke ich ein Glas Wasser."],
  ["Wie kommst du zur Arbeit oder zum Unterricht?", "Ich fahre mit dem Bus."],
  ["Wann hast du diese Woche Zeit?", "Am Donnerstag habe ich ab sechs Zeit."],
  ["Was kaufst du auf dem Markt?", "Ich kaufe frisches Brot und Äpfel."],
  ["Was hast du gestern gekocht?", "Ich habe eine Tomatensuppe gekocht."],
  ["Was machst du gern am Wochenende?", "Ich gehe gern im Wald spazieren."],
  ["Wie ist das Wetter heute bei dir?", "Heute ist es kühl und windig."],
  ["Welches Kleidungsstück trägst du im Winter besonders gern?", "Ich trage gern meinen warmen Mantel."],
  ["Wohin bist du zuletzt mit dem Zug gefahren?", "Ich bin nach Bern gefahren."],
  ["Wie sieht dein Lieblingszimmer aus?", "Es ist hell. Neben dem Fenster steht ein kleiner Tisch."],
  ["Wofür interessierst du dich gerade?", "Ich interessiere mich für Fotografie."],
  ["Was willst du morgen lernen?", "Ich will morgen neue Verben lernen."],
  ["Was machst du, wenn du Durst hast?", "Ich trinke ein Glas Wasser."],
  ["Wem hast du zuletzt eine Nachricht geschickt?", "Ich habe meiner Schwester eine Nachricht geschickt."],
  ["Wie bestellst du in einem Café einen Tee?", "Ich hätte gern einen Tee, bitte."],
  ["Was ist in deiner Stadt schöner als früher?", "Der Park ist schöner als früher."],
  ["Wie bittest du eine Freundin, dich anzurufen?", "Ruf mich bitte am Abend an."],
  ["Welche Sprachen sprichst du?", "Ich spreche Russisch und ein bisschen Deutsch."],
  ["Was hast du heute verstanden, das früher schwierig war?", "Ich habe den Unterschied zwischen den und dem verstanden."],
  ["Wie beschreibst du jemanden, den du gut kennst?", "Er ist gross, hat kurze Haare und trägt eine Brille."]
];
