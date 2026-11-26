"use strict";

const grammarModules = [
  { first: 1, last: 8, title: "Основы немецкого", test: "Белый тест", color: "white" },
  { first: 9, last: 18, title: "Падежи, время и даты", test: "Жёлтый тест", color: "yellow" },
  { first: 19, last: 25, title: "Глаголы и простое предложение", test: "Оранжевый тест", color: "orange" },
  { first: 26, last: 35, title: "Прошедшее время и придаточные", test: "Зелёный тест", color: "green" },
  { first: 36, last: 50, title: "Склонение и сложные конструкции", test: "Чёрный тест", color: "black" }
];

const grammarExampleTranslations = [
  ["один","четыре","десять","шестнадцать","семнадцать"],
  ["двадцать один","тридцать два","Вы учите немецкий."],
  ["Велосипед новый.","Он синий.","У меня есть велосипед."],
  ["я учусь","ты учишься","он учится","ты работаешь"],
  ["Ты едешь домой.","Мы едем вместе."],
  ["Я умею плавать.","Ты можешь здесь остаться."],
  ["Это ваш дом?","Это ваша квартира."],
  ["Ты придёшь сегодня?","Когда ты придёшь?","Откуда ты?"],
  ["Собака спит.","Я вижу собаку."],
  ["Я помогаю мужчине.","Она помогает детям."],
  ["У меня нет машины.","Машина не новая.","Я не еду в Берн."],
  ["Прочитай текст!","Прочитайте текст! (к знакомым)","Прочитайте текст! (вежливо)"],
  ["Половина восьмого.","Без четверти девять."],
  ["в понедельник","в мае","зимой","с 2023 года"],
  ["Книга лежит на столе.","Я кладу её на стол."],
  ["первое мая","третьего июня","двадцатого июля"],
  ["Я вижу его.","Я помогаю ему.","Она пишет мне."],
  ["для моего брата","с моим братом","к моей сестре"],
  ["Этот ребёнок живёт здесь.","Много детей играет на улице."],
  ["Я рано встаю.","Мне нужно рано вставать."],
  ["Я моюсь.","Я мою руки."],
  ["Он бегает так же быстро, как я.","Ты бегаешь быстрее, чем он."],
  ["Становится холодно.","Завтра я буду работать.","Завтра я работаю."],
  ["Я знаю это место.","Я знаю, что он там живёт."],
  ["Идёт снег.","Здесь говорят по-немецки.","Здесь есть парк."],
  ["Мне нужно было вчера работать.","Мы были дома."],
  ["Я работал.","Она ездила в Базель."],
  ["вставать","посещать","учиться в вузе"],
  ["я учился","я писал","я был","у меня было"],
  ["в Германию","в Швейцарию","в Швейцарии","из Швейцарии"],
  ["Я пытаюсь уснуть.","Она пытается позвонить.","Он может позвонить."],
  ["Я учу немецкий, чтобы работать в Берне.","Я говорю медленно, чтобы ты меня понял."],
  ["Она говорит, что придёт.","Я спрашиваю, придёт ли она.","Я знаю, что она делает."],
  ["Я остаюсь здесь, потому что идёт дождь.","Я остаюсь здесь, ведь идёт дождь."],
  ["Когда я был маленьким, я жил в Берне.","Когда у меня есть время, я готовлю.","Я не знаю, когда он придёт."],
  ["машина учителя","книга студентки","имя студента"],
  ["красное пальто с определённым артиклем","красное пальто с неопределённым артиклем","в красном пальто","холодная вода"],
  ["Кого ты ждёшь?","Чего ты ждёшь?","Я жду этого."],
  ["Это мужчина, который здесь живёт.","Это мужчина, которого я знаю."],
  ["Хотя идёт дождь, я иду гулять.","Он уходит, не попрощавшись."],
  ["Если бы у меня было больше времени, я бы чаще читал.","Не могли бы вы мне помочь?"],
  ["Дом строят.","Дом построили. (Präteritum)","Дом построили. (Perfekt)"],
  ["Чем больше я практикуюсь, тем увереннее говорю.","Она не пьёт ни кофе, ни чай."],
  ["Я подожду, пока ты не придёшь.","Как только ты придёшь, мы отправимся."],
  ["Если бы у меня было время, я бы пришёл.","Он ведёт себя так, будто ничего не знает."],
  ["спящий ребёнок","написанное письмо","открытая дверь"],
  ["После того как она поела, она пошла гулять.","Когда я пришёл, он уже ушёл."],
  ["Ты учишь слова, повторяя их.","Шёл сильный снег, из-за чего поезд отменили."],
  ["Он, должно быть, болен.","Говорят, она была в Берне.","Он утверждает, что видел это."],
  ["Она говорит, что больна.","Он сказал, что прочитал книгу."],
];

// Each row contains the lesson title, explanation, model, two gap exercises and a sentence to assemble.
const grammarLessons = [
  [
    "Числа от 1 до 20 и чтение",
    "В немецком ei звучит примерно как «ай», ie передаёт долгий звук «и», а z звучит как «ц». В группе 13–19 слышно zehn. Обрати внимание на сокращения sechzehn и siebzehn.",
    "eins · vier · zehn · sechzehn · siebzehn",
    ["Запиши число 16 словом.", "sechzehn", "В sechzehn у sechs исчезает конечная s."],
    ["Запиши число 17 словом.", "siebzehn", "В siebzehn у sieben исчезает окончание -en."],
    ["У меня три книги.", "Ich habe drei Bücher."]
  ],
  [
    "Местоимения, произношение и большие числа",
    "ich, du, er/sie/es, wir, ihr, sie обозначают участников разговора. Вежливое Sie пишется с прописной буквы. В числах от 21 единицы идут перед десятками через und. После i в ich слышен мягкий звук ch, после a в ach звук более задний.",
    "einundzwanzig · zweiunddreissig · Sie lernen Deutsch.",
    ["Запиши число 21 словом.", "einundzwanzig", "Перед und употребляется ein, затем идёт zwanzig."],
    ["___ lernt Deutsch. (вы, обращение к нескольким друзьям)", "ihr", "Для нескольких друзей подходит ihr. В начале предложения будет Ihr."],
    ["Мы живём в Берне.", "Wir wohnen in Bern."]
  ],
  [
    "Глаголы haben и sein",
    "Для состояния и признака употребляй sein: ich bin, du bist, er ist, wir sind, ihr seid, sie sind. Для обладания употребляй haben: ich habe, du hast, er hat, wir haben, ihr habt, sie haben. Местоимение для предмета выбирается по немецкому роду существительного.",
    "Das Fahrrad ist neu. Es ist blau. Ich habe ein Fahrrad.",
    ["Du ___ müde. (sein)", "bist", "С du нужна форма bist."],
    ["Ihr ___ einen Hund. (haben)", "habt", "С ihr нужен глагол habt."],
    ["У неё есть брат.", "Sie hat einen Bruder."]
  ],
  [
    "Спряжение глаголов в Präsens",
    "От инфинитива обычно отбрасывают -en и добавляют окончания -e, -st, -t, -en, -t, -en. После основ на d и t часто появляется дополнительная e. В повествовательном предложении спрягаемый глагол занимает вторую позицию.",
    "ich lerne · du lernst · er lernt · du arbeitest",
    ["Du ___ in Zürich. (arbeiten)", "arbeitest", "Основа arbeit- получает окончание -est."],
    ["Wir ___ in Bern. (wohnen)", "wohnen", "Для wir употребляется форма на -en."],
    ["Сегодня я учу немецкий.", "Heute lerne ich Deutsch."]
  ],
  [
    "Глаголы с изменением корневой гласной",
    "У ряда сильных глаголов гласная корня меняется в du и er/sie/es: fahren → fährst, lesen → liest, geben → gibt. В ich и множественном числе сохраняется гласная инфинитива.",
    "Du fährst nach Hause. Wir fahren zusammen.",
    ["Er ___ ein Buch. (lesen)", "liest", "У lesen буква e меняется на ie с du и er, sie, es. С ich говорим ich lese."],
    ["Du ___ ihr das Buch. (geben)", "gibst", "У geben в форме du корневая e меняется на i."],
    ["Она быстро бегает.", "Sie läuft schnell."]
  ],
  [
    "Модальные глаголы",
    "Модальный глагол передаёт возможность, разрешение, обязанность или намерение. Können означает «мочь, уметь», dürfen — «иметь разрешение», müssen — «быть вынужденным», sollen — «следовать указанию». Wollen передаёт желание, mögen — симпатию, möchte — вежливое желание. Инфинитив обычно замыкает предложение.",
    "Ich kann schwimmen. Du darfst hier bleiben.",
    ["Ich ___ hier parken. (dürfen)", "darf", "У dürfen форма первого лица единственного числа — darf."],
    ["Du ___ heute arbeiten. (müssen)", "musst", "С du употребляется musst, а arbeiten остаётся в инфинитиве."],
    ["Сегодня мы должны остаться дома.", "Heute müssen wir zu Hause bleiben."]
  ],
  [
    "Притяжательные слова",
    "Mein, dein, sein, ihr, unser, euer и Ihr указывают на владельца. Основа зависит от владельца, окончание — от существительного. В Nominativ употребляются mein Bruder, meine Schwester, mein Kind, meine Bücher. У euer перед окончанием обычно выпадает второе e.",
    "Ist das euer Haus? Das ist eure Wohnung.",
    ["Ich habe eine Schwester. ___ Schwester heisst Eva.", "meine", "Владелец — ich, а Schwester — существительное женского рода."],
    ["Ihr habt eine Tante. ___ Tante wohnt in Bern.", "eure", "Владелец — ihr, а перед Tante нужна форма eure."],
    ["Мои друзья живут в Цюрихе.", "Meine Freunde wohnen in Zürich."]
  ],
  [
    "Общие и специальные вопросы",
    "В вопросе с ответом «да» или «нет» спрягаемый глагол стоит первым. В специальном вопросе первым идёт вопросительное слово, затем глагол. Wo обозначает место, wohin — направление, woher — источник.",
    "Kommst du heute? Wann kommst du? Woher kommst du?",
    ["___ wohnst du? (спроси о месте)", "wo", "Wo отвечает на вопрос «где?»."],
    ["___ fährst du morgen? (спроси о направлении)", "wohin", "Wohin отвечает на вопрос «куда?»."],
    ["Когда ты начинаешь?", "Wann fängst du an?"]
  ],
  [
    "Винительный падеж Akkusativ",
    "Akkusativ часто обозначает прямое дополнение. В мужском роде der меняется на den, ein на einen, mein на meinen. В женском, среднем роде и множественном числе определённый артикль выглядит как в Nominativ.",
    "Der Hund schläft. Ich sehe den Hund.",
    ["Sie kauft ___ Mantel. (ein)", "einen", "Mantel мужского рода. После kauft нужен Akkusativ."],
    ["Wir verkaufen ___ Tisch. (unser)", "unseren", "У мужского рода в Akkusativ притяжательное слово получает -en."],
    ["Я ищу эту книгу.", "Ich suche dieses Buch."]
  ],
  [
    "Дательный падеж Dativ",
    "Dativ употребляется с получателем и после ряда глаголов, например helfen и danken. Определённые артикли в Dativ — dem, der, dem, den. Во множественном числе часто добавляется -n и к существительному, если форма ещё не оканчивается на -n или -s.",
    "Ich helfe dem Mann. Sie hilft den Kindern.",
    ["Wir helfen ___ Frau. (bestimmter Artikel)", "der", "У женского рода определённый артикль в Dativ — der."],
    ["Das Buch gehört ___ Kind. (ein)", "einem", "Gehören требует Dativ, у среднего рода форма einem."],
    ["Мы помогаем соседям.", "Wir helfen den Nachbarn."]
  ],
  [
    "Отрицание с nicht и kein",
    "Kein заменяет неопределённый артикль или отрицает существительное без артикля. Nicht отрицает действие или выделенную часть фразы. Перед предикативным прилагательным и отрицаемой предложной группой nicht ставится непосредственно перед ними.",
    "Ich habe kein Auto. Das Auto ist nicht neu. Ich fahre nicht nach Bern.",
    ["Ich habe ___ Bruder. (отрицание)", "keinen", "Bruder мужского рода в Akkusativ, поэтому kein получает -en."],
    ["Die Wohnung ist ___ teuer. (отрицание)", "nicht", "Для отрицания прилагательного teuer употребляется nicht."],
    ["У нас нет времени.", "Wir haben keine Zeit."]
  ],
  [
    "Повелительное наклонение",
    "Обращаясь к одному знакомому, обычно употребляй основу: Komm! Для группы берётся форма ihr без местоимения: Kommt! В вежливом обращении Sie остаётся после глагола: Kommen Sie! У некоторых сильных глаголов в форме du сохраняется смена e на i или ie.",
    "Lies den Text! Lest den Text! Lesen Sie den Text!",
    ["___ bitte hier! (kommen, du)", ["komm", "komme"], "Для du подходит короткая форма komm и возможна форма komme."],
    ["___ bitte leise! (sein, ihr)", "seid", "У sein форма повелительного наклонения для ihr — seid."],
    ["Прочитайте письмо, пожалуйста. (вежливо)", "Lesen Sie bitte den Brief."]
  ],
  [
    "Часы и минуты",
    "Официальное время называют часами и минутами. В разговоре Viertel nach означает четверть после часа, Viertel vor — четверть до часа, а halb относится к следующему часу. На вопрос Wann? время обычно вводится предлогом um.",
    "7:30 — halb acht. 8:45 — Viertel vor neun.",
    ["Es ist halb ___. (09:30)", "zehn", "С halb называют ближайший следующий час."],
    ["Der Zug fährt ___ acht Uhr. (предлог)", "um", "Точное время наступления события вводится через um."],
    ["Поезд отправляется в четверть девятого.", "Der Zug fährt um Viertel nach acht."]
  ],
  [
    "Дни, месяцы и годы",
    "С днями недели употребляется am, с месяцами и временами года — im. Год можно назвать без предлога или через im Jahr. Предлог seit употребляется для действия или состояния, которое началось раньше и всё ещё продолжается.",
    "am Montag · im Mai · im Winter · seit 2023",
    ["Wir kommen ___ Dienstag. (предлог с артиклем)", "am", "День недели требует am."],
    ["Der Kurs beginnt ___ September. (предлог с артиклем)", "im", "С месяцем употребляется im."],
    ["Мы едем в июне.", "Wir fahren im Juni."]
  ],
  [
    "Место и направление с Akkusativ и Dativ",
    "У in, an, auf, hinter, neben, über, unter, vor и zwischen падеж зависит от смысла. Wo? спрашивает о месте и требует Dativ, даже если в этом месте кто-то движется. Wohin? спрашивает о направлении к новой позиции и требует Akkusativ.",
    "Das Buch liegt auf dem Tisch. Ich lege es auf den Tisch.",
    ["Das Bild hängt an ___ Wand. (определённый артикль)", "der", "Картина уже находится на стене, поэтому нужен Dativ."],
    ["Sie stellt die Lampe neben ___ Sofa. (определённый артикль)", "das", "Лампу ставят на новое место, поэтому нужен Akkusativ."],
    ["Я вешаю картину на стену.", "Ich hänge das Bild an die Wand."]
  ],
  [
    "Порядковые числительные и даты",
    "Порядковые числительные обычно образуются с -t- до 19 и -st- с 20, затем получают окончание прилагательного. Первый, третий, седьмой и восьмой имеют особые формы. В записи даты точка после цифры заменяет порядковый показатель.",
    "der erste Mai · am dritten Juni · am zwanzigsten Juli",
    ["Die Feier ist am ___ Mai. (3.)", "dritten", "После am употребляется Dativ, поэтому форма — dritten."],
    ["Heute ist der ___ Juni. (20.)", "zwanzigste", "Zwanzig получает -st- и окончание -e после der."],
    ["Мой день рождения третьего апреля.", "Ich habe am dritten April Geburtstag."]
  ],
  [
    "Склонение личных местоимений",
    "Формы ich, du, er в Akkusativ — mich, dich, ihn, а в Dativ — mir, dir, ihm. Sie в единственном числе даёт sie и ihr. Во множественном числе полезно различать sie в Akkusativ и ihnen в Dativ, а вежливая форма выглядит как Sie и Ihnen.",
    "Ich sehe ihn. Ich helfe ihm. Sie schreibt mir.",
    ["Kannst du ___ helfen? (ich)", "mir", "Helfen управляет Dativ, поэтому ich меняется на mir."],
    ["Ich sehe ___ jeden Tag. (er)", "ihn", "Прямое дополнение после sehen требует Akkusativ."],
    ["Я напишу ей завтра.", "Ich schreibe ihr morgen."]
  ],
  [
    "Предлоги с Akkusativ и Dativ",
    "Für, ohne, durch, gegen и um требуют Akkusativ. Mit, nach, aus, zu, von, bei, seit и ausser требуют Dativ. Эти предлоги сохраняют управление и при значении направления, например zu meinem Bruder.",
    "für meinen Bruder · mit meinem Bruder · zu meiner Schwester",
    ["Das Geschenk ist für ___ Vater. (mein)", "meinen", "Für требует Akkusativ, у мужского рода окончание -en."],
    ["Wir fahren mit ___ Zug. (определённый артикль)", "dem", "Mit требует Dativ, а Zug — мужского рода."],
    ["Я иду к своей сестре.", "Ich gehe zu meiner Schwester."]
  ],
  [
    "Слова перед существительным",
    "Dieser, jener, jeder и welcher получают падежные окончания, похожие на окончания определённого артикля. Manche, einige и alle часто употребляются во множественном числе. Много неисчисляемого выражают через viel, а много предметов — через viele.",
    "Dieses Kind wohnt hier. Viele Kinder spielen draussen.",
    ["Ich kenne ___ Mann. (dieser)", "diesen", "У мужского рода в Akkusativ после dieser получается diesen."],
    ["___ Kleid gefällt dir? (welcher)", "welches", "Kleid среднего рода и служит подлежащим."],
    ["Здесь играют многие дети.", "Hier spielen viele Kinder."]
  ],
  [
    "Отделяемые приставки",
    "В главном предложении приставка отделяемого глагола уходит в конец. После модального глагола инфинитив остаётся целым. В придаточном предложении спрягаемый глагол с приставкой стоит в конце и пишется слитно.",
    "Ich stehe früh auf. Ich muss früh aufstehen.",
    ["Der Zug fährt um neun Uhr ___. (abfahren)", "ab", "Ab отделяется и замыкает главное предложение."],
    ["Sie möchte heute ___. (einkaufen)", "einkaufen", "После möchte нужен целый инфинитив."],
    ["Завтра он мне позвонит.", "Morgen ruft er mich an."]
  ],
  [
    "Возвратные глаголы",
    "У ich и du возвратные формы в Akkusativ — mich и dich, а в Dativ — mir и dir. В третьем лице употребляется sich. В сочетании sich die Hände waschen руки уже занимают Akkusativ, поэтому возвратное местоимение стоит в Dativ.",
    "Ich wasche mich. Ich wasche mir die Hände.",
    ["Ich interessiere ___ für Musik. (возвратное местоимение)", "mich", "В сочетании sich interessieren für возвратное местоимение стоит в Akkusativ."],
    ["Du wäschst ___ das Gesicht. (возвратное местоимение)", "dir", "Das Gesicht стоит в Akkusativ, поэтому нужна форма dir."],
    ["Она интересуется немецким языком.", "Sie interessiert sich für Deutsch."]
  ],
  [
    "Сравнительная и превосходная степени",
    "Сравнительная степень обычно образуется с -er. С равенством употребляется so … wie, с различием — als. Превосходная степень после глагола часто имеет форму am …-sten. Запомни gut — besser — am besten и gern — lieber — am liebsten.",
    "Er läuft so schnell wie ich. Du läufst schneller als er.",
    ["Dieser Kaffee schmeckt ___ als der andere. (gut)", "besser", "У gut сравнительная степень образуется нерегулярно."],
    ["Sie ist so gross ___ ihre Schwester.", "wie", "При равенстве употребляется so … wie."],
    ["Этот поезд едет быстрее.", "Dieser Zug fährt schneller."]
  ],
  [
    "Werden и будущее время",
    "Werden может означать «становиться» или служить вспомогательным глаголом в Futur I. Спрягаемая форма werden занимает вторую позицию, инфинитив стоит в конце. О будущем часто говорят и в Präsens, если время ясно из контекста.",
    "Es wird kalt. Morgen werde ich arbeiten. Morgen arbeite ich.",
    ["Ihr ___ morgen ankommen. (werden)", "werdet", "С ihr вспомогательный глагол получает форму werdet."],
    ["Die Tage ___ kürzer. (werden)", "werden", "Die Tage — подлежащее во множественном числе."],
    ["Завтра я буду работать. (Futur I)", "Morgen werde ich arbeiten."]
  ],
  [
    "Wissen, kennen и первое знакомство с dass",
    "Kennen употребляется со знакомым человеком, местом или предметом. Wissen передаёт знание факта или информации, в том числе перед dass. Спрягаемый глагол в придаточном с dass стоит в конце.",
    "Ich kenne den Ort. Ich weiss, dass er dort wohnt.",
    ["___ du diese Stadt? (kennen)", "kennst", "Город как знакомое место требует kennen. С du — kennst."],
    ["Er ___, dass der Zug spät kommt. (wissen)", "weiss", "У wissen в третьем лице единственного числа форма weiss."],
    ["Ты знаешь ответ.", "Du weisst die Antwort."]
  ],
  [
    "Безличные конструкции es, man и es gibt",
    "Es употребляется в сообщениях о погоде вроде Es regnet. Man обозначает неопределённых людей и требует глагола в третьем лице единственного числа. В конструкции es gibt дополнение стоит в Akkusativ.",
    "Es schneit. Hier spricht man Deutsch. Es gibt einen Park.",
    ["Hier ___ man Deutsch. (sprechen)", "spricht", "Man грамматически относится к третьему лицу единственного числа."],
    ["In der Stadt gibt es ___ Bahnhof. (ein)", "einen", "Es gibt требует Akkusativ. Bahnhof — мужского рода."],
    ["Здесь есть аптека.", "Hier gibt es eine Apotheke."]
  ],
  [
    "Модальные глаголы в Präteritum и war",
    "Частотные формы в прошедшем — konnte, durfte, musste, sollte, wollte и mochte. Модальный глагол спрягается, а смысловой глагол остаётся в инфинитиве. У sein формы Präteritum начинаются с war-.",
    "Ich musste gestern arbeiten. Wir waren zu Hause.",
    ["Er ___ nicht kommen. (können, Präteritum)", "konnte", "В Präteritum у können форма konnte, без умлаута."],
    ["Wir ___ gestern in Basel. (sein, Präteritum)", "waren", "У sein с wir употребляется waren."],
    ["Вчера она хотела остаться дома.", "Gestern wollte sie zu Hause bleiben."]
  ],
  [
    "Perfekt и вспомогательные haben и sein",
    "Обычно Perfekt образуется из haben или sein и Partizip II. Haben используется с большинством глаголов. Sein характерен для ряда непереходных глаголов перемещения или изменения состояния, а также для bleiben, sein и werden. Если модальный глагол стоит вместе с другим действием, в конце остаются две словарные формы: Ich habe arbeiten müssen.",
    "Ich habe gearbeitet. Sie ist nach Basel gefahren.",
    ["Wir ___ zu Hause geblieben. (вспомогательный глагол)", "sind", "Bleiben образует Perfekt с sein."],
    ["Er ___ den Film gesehen. (вспомогательный глагол)", "hat", "Sehen образует Perfekt с haben."],
    ["Вчера мы купили хлеб.", "Gestern haben wir Brot gekauft."]
  ],
  [
    "Perfekt с приставками и глаголами на -ieren",
    "У глаголов с отделяемой приставкой ge- ставится между приставкой и основой. У глаголов с неотделяемой приставкой и с окончанием -ieren Partizip II образуется без ge-. У сильных глаголов проверь форму по справочнику.",
    "aufstehen → aufgestanden · besuchen → besucht · studieren → studiert",
    ["Sie hat ihre Freundin ___. (anrufen)", "angerufen", "An отделяется, поэтому ge стоит между an и rufen."],
    ["Wir haben lange ___. (telefonieren)", "telefoniert", "У глаголов на -ieren Partizip II образуется без ge-."],
    ["Я вчера рано встал.", "Ich bin gestern früh aufgestanden."]
  ],
  [
    "Прошедшее время Präteritum",
    "Präteritum часто встречается в письменном повествовании. В разговоре оно особенно обычно с sein, haben и модальными глаголами. Слабые глаголы используют суффикс -te-, а у сильных часто меняется корень.",
    "ich lernte · ich schrieb · ich war · ich hatte",
    ["Sie ___ einen Brief. (Sie — она, schreiben в Präteritum)", "schrieb", "С sie в значении «она» нужна форма schrieb."],
    ["Wir ___ keine Zeit. (haben, Präteritum)", "hatten", "Основа Präteritum у haben — hatt-."],
    ["Вчера он был в Берне.", "Gestern war er in Bern."]
  ],
  [
    "Страны и путешествия",
    "С городами и странами без артикля употребляются nach для направления, in для места и aus для движения оттуда. Со странами с артиклем для направления употребляется in с Akkusativ, для места — in с Dativ, а после aus нужен Dativ.",
    "nach Deutschland · in die Schweiz · in der Schweiz · aus der Schweiz",
    ["Sie fährt ___ Deutschland. (предлог направления)", "nach", "Deutschland обычно употребляется без артикля."],
    ["Er kommt aus ___ Schweiz. (определённый артикль)", "der", "Aus требует Dativ, Schweiz — женского рода."],
    ["Мы едем в Швейцарию.", "Wir fahren in die Schweiz."]
  ],
  [
    "Инфинитив с zu",
    "После глаголов вроде versuchen, hoffen и vergessen часто используется инфинитив с zu. У отделяемых глаголов zu встаёт между приставкой и основой. После модальных глаголов инфинитив обычно употребляется без zu.",
    "Ich versuche zu schlafen. Sie versucht anzurufen. Er kann anrufen.",
    ["Ich versuche, dich morgen ___. (anrufen)", "anzurufen", "В отделяемом anrufen zu вставляется между an и rufen."],
    ["Er hat vergessen, Brot ___. (kaufen)", "zu kaufen", "После vergessen здесь используется инфинитив с zu."],
    ["Я пытаюсь говорить медленно.", "Ich versuche langsam zu sprechen."]
  ],
  [
    "Цель с damit и um … zu",
    "Damit вводит придаточное цели со своим подлежащим и спрягаемым глаголом в конце. При совпадении исполнителя главного действия и цели часто используется um … zu. В такой конструкции отдельное подлежащее пропускается.",
    "Ich lerne Deutsch, um in Bern zu arbeiten. Ich spreche langsam, damit du mich verstehst.",
    ["Ich rufe an, ___ du Bescheid weisst. (союз)", "damit", "Действия относятся к разным лицам, поэтому подходит damit."],
    ["Sie spart Geld, ___ ein Fahrrad zu kaufen. (союз)", "um", "Покупает и копит один человек. Здесь нужно um … zu."],
    ["Я позвоню, чтобы она об этом знала. (damit)", "Ich rufe an, damit sie Bescheid weiss."]
  ],
  [
    "Придаточные с dass, ob и was",
    "Dass вводит содержание высказывания или мысли. Ob вводит косвенный вопрос с ответом «да» или «нет». Was вводит косвенный вопрос о предмете или действии. Спрягаемый глагол каждого придаточного стоит в конце.",
    "Sie sagt, dass sie kommt. Ich frage, ob sie kommt. Ich weiss, was sie macht.",
    ["Ich weiss nicht, ___ der Laden heute offen ist. («открыт ли»)", "ob", "Ob передаёт косвенный общий вопрос."],
    ["Er fragt, ___ du kaufen möchtest. («что»)", "was", "Was вводит косвенный вопрос «что?»."],
    ["Он говорит, что поезд опаздывает.", "Er sagt, dass der Zug Verspätung hat."]
  ],
  [
    "Причина с weil и denn. Предлоги времени",
    "Weil вводит придаточное с глаголом в конце. После denn сохраняется порядок слов главного предложения. Seit обозначает начало продолжающегося периода, vor — сколько времени прошло, а in перед периодом может указывать, через сколько что-то произойдёт.",
    "Ich bleibe hier, weil es regnet. Ich bleibe hier, denn es regnet.",
    ["Ich bleibe hier, ___ es regnet. (союз с глаголом в конце)", "weil", "В придаточном с weil глагол regnet стоит в конце."],
    ["Sie wohnt ___ zwei Jahren hier. («уже два года»)", "seit", "Seit отмечает начальный момент или прошедшую часть продолжающегося периода."],
    ["Мы остаёмся дома, потому что идёт дождь. (denn)", "Wir bleiben zu Hause, denn es regnet."]
  ],
  [
    "Время и условие с wenn, wann и als",
    "Als обозначает однократное событие или период в прошлом. Wenn подходит для повторяющихся ситуаций, будущего и условий. Wann спрашивает о времени и вводит прямой или косвенный вопрос.",
    "Als ich klein war, wohnte ich in Bern. Wenn ich Zeit habe, koche ich. Ich weiss nicht, wann er kommt.",
    ["___ ich gestern ankam, war es schon dunkel.", "als", "Речь об одном событии в прошлом."],
    ["Weisst du, ___ der Zug ankommt?", "wann", "В косвенном вопросе о времени употребляется wann."],
    ["Когда у меня есть время, я читаю.", "Wenn ich Zeit habe, lese ich."]
  ],
  [
    "Genitiv и слабое склонение существительных",
    "Genitiv часто передаёт принадлежность. Артикли — des, der, des, der. Большинство существительных мужского и среднего рода получают -s или -es. У слабых существительных мужского рода во всех падежах единственного числа, кроме Nominativ, обычно появляется -n или -en.",
    "das Auto des Lehrers · das Buch der Studentin · der Name des Studenten",
    ["Das ist das Fahrrad ___ Kindes. (определённый артикль)", "des", "У среднего рода артикль Genitiv — des."],
    ["Ich spreche mit dem ___. (Student)", "Studenten", "Student относится к слабому склонению, поэтому в Dativ нужен Studenten."],
    ["Это машина моего отца.", "Das ist das Auto meines Vaters."]
  ],
  [
    "Склонение прилагательных",
    "Перед существительным окончание прилагательного зависит от падежа, рода, числа и артикля. После der в сочетании der rote Mantel признаки уже видны на артикле. После ein в ein roter Mantel их передаёт прилагательное. Без артикля прилагательное чаще получает сильное окончание.",
    "der rote Mantel · ein roter Mantel · mit einem roten Mantel · kaltes Wasser",
    ["Ich trinke ___ Wasser. (kalt, без артикля)", "kaltes", "Средний род Akkusativ без артикля требует -es."],
    ["Er trägt einen ___ Mantel. (warm)", "warmen", "После einen прилагательное в Akkusativ получает -en."],
    ["Она носит красную куртку.", "Sie trägt eine rote Jacke."]
  ],
  [
    "Вопросы и управление глаголов",
    "Учить глагол удобно вместе с предлогом и падежом: warten auf + Akkusativ, sich beschäftigen mit + Dativ. В вопросе о человеке предлог стоит перед wen или wem. О предмете спрашивают через wo(r)-, а в ответе используют da(r)-.",
    "Auf wen wartest du? Worauf wartest du? Ich warte darauf.",
    ["___ interessierst du dich? («чем», о предмете)", "wofür", "Sich interessieren für сохраняет für. При вопросе о предмете получается wofür."],
    ["Mit ___ beschäftigst du dich? («с кем»)", "wem", "Mit требует Dativ. Вопрос о человеке — mit wem."],
    ["Кого ты ждёшь?", "Auf wen wartest du?"]
  ],
  [
    "Относительные предложения",
    "Род и число относительного местоимения определяются существительным, которое оно уточняет. Падеж зависит от роли местоимения внутри придаточного. Предлог при необходимости стоит прямо перед местоимением. Глагол замыкает придаточное.",
    "Das ist der Mann, der hier wohnt. Das ist der Mann, den ich kenne.",
    ["Das ist der Mann, ___ ich gestern gesehen habe.", "den", "Mann мужского рода, внутри придаточного местоимение стоит в Akkusativ."],
    ["Das ist die Frau, mit ___ ich arbeite.", "der", "Mit требует Dativ. Для женского рода подходит der."],
    ["Вот книга, которую я читаю.", "Hier ist das Buch, das ich lese."]
  ],
  [
    "Obwohl, statt … zu и ohne … zu",
    "Obwohl вводит уступку со спрягаемым глаголом в конце. Statt … zu указывает на заменённое действие, ohne … zu — на действие, которого не было. Эти инфинитивные обороты обычно относятся к тому же исполнителю, что и главное действие.",
    "Obwohl es regnet, gehe ich spazieren. Er geht, ohne sich zu verabschieden.",
    ["___ sie müde ist, arbeitet sie weiter. («хотя»)", "obwohl", "Obwohl вводит уступительное придаточное."],
    ["Er ging, ___ sich zu verabschieden. («не попрощавшись»)", "ohne", "Ohne … zu обозначает отсутствующее сопутствующее действие."],
    ["Хотя идёт дождь, мы идём гулять.", "Obwohl es regnet, gehen wir spazieren."]
  ],
  [
    "Konjunktiv II для условий и вежливых просьб",
    "Konjunktiv II передаёт нереальное условие, желание или вежливую просьбу. Частые формы — wäre, hätte, könnte, müsste, dürfte. С другими глаголами часто употребляется würde и инфинитив.",
    "Wenn ich mehr Zeit hätte, würde ich öfter lesen. Könnten Sie mir helfen?",
    ["Wenn ich mehr Zeit ___, würde ich reisen. (haben)", "hätte", "У haben в Konjunktiv II используется hätte."],
    ["___ Sie mir bitte helfen? (können, вежливая просьба)", "könnten", "Для Sie подходит könnten, в начале вопроса с прописной."],
    ["На твоём месте я бы остался дома.", "An deiner Stelle würde ich zu Hause bleiben."]
  ],
  [
    "Пассив действия Passiv",
    "Пассив действия строится из werden и Partizip II. В Präsens: wird gebaut, в Präteritum: wurde gebaut, в Perfekt: ist gebaut worden. Исполнитель может быть указан через von. С модальным глаголом werden остаётся инфинитивом в конце.",
    "Das Haus wird gebaut. Das Haus wurde gebaut. Das Haus ist gebaut worden.",
    ["Die Brücke ___ gestern eröffnet. (Präteritum, пассив действия)", "wurde", "В Präteritum употребляется wurde + Partizip II."],
    ["Der Brief muss heute geschrieben ___. (пассив действия)", "werden", "После модального глагола нужен инфинитив пассива."],
    ["Письмо отправляют сегодня. (Passiv)", "Der Brief wird heute verschickt."]
  ],
  [
    "Парные союзы",
    "Sowohl … als auch соединяет два элемента, weder … noch отрицает оба, entweder … oder даёт выбор. Nicht … sondern вводит поправку, zwar … aber — уступку с противопоставлением. В конструкции je … desto обе части содержат сравнительную степень.",
    "Je mehr ich übe, desto sicherer spreche ich. Sie trinkt weder Kaffee noch Tee.",
    ["Sie trinkt weder Kaffee ___ Tee.", "noch", "Weder образует пару с noch."],
    ["Je mehr du liest, ___ grösser wird dein Wortschatz.", ["desto", "umso"], "Вторая часть конструкции начинается с desto или umso."],
    ["Мы едем либо поездом, либо автобусом.", "Wir fahren entweder mit dem Zug oder mit dem Bus."]
  ],
  [
    "Временные союзы während, bis, seit, bevor и sobald",
    "Während связывает одновременные действия, bis обозначает конечную границу, seit или seitdem — начало продолжающегося периода. Bevor задаёт порядок «прежде чем», а sobald — момент начала следующего действия.",
    "Ich warte, bis du kommst. Sobald du da bist, gehen wir los.",
    ["Warte hier, ___ ich zurückkomme. («пока не»)", "bis", "Bis обозначает конец ожидания."],
    ["Ich rufe dich an, ___ ich zu Hause bin. («как только»)", "sobald", "Sobald указывает на непосредственное начало следующего действия."],
    ["Я позвоню, прежде чем уйду.", "Ich rufe an, bevor ich gehe."]
  ],
  [
    "Konjunktiv II в прошлом и als ob",
    "Для нереального действия в прошлом обычно употребляют hätte или wäre с Partizip II. Если модальный глагол стоит вместе с другим действием, в конце остаются две словарные формы: Ich hätte dir helfen können. Als ob значит «как будто»: Er tut so, als ob er Zeit hätte.",
    "Wenn ich Zeit gehabt hätte, wäre ich gekommen. Er tut so, als ob er nichts wüsste.",
    ["Wenn ich die Adresse gewusst ___, wäre ich gekommen.", "hätte", "Wissen образует Perfekt с haben, значит здесь нужно hätte."],
    ["Mit mehr Zeit ___ ich geblieben. (неосуществлённое прошлое)", "wäre", "Bleiben использует sein, поэтому форма — wäre."],
    ["Он ведёт себя так, будто у него есть время.", "Er tut so, als ob er Zeit hätte."]
  ],
  [
    "Partizip I и Partizip II как определения",
    "Partizip I образуется из инфинитива с -d и часто описывает продолжающееся действие. Partizip II у переходных глаголов часто описывает результат действия, направленного на предмет. Перед существительным оба причастия склоняются как прилагательные.",
    "das schlafende Kind · der geschriebene Brief · die geöffnete Tür",
    ["Das ___ Kind liegt im Bett. (schlafen, Partizip I)", "schlafende", "Schlafen + d даёт schlafend, затем добавляется -e."],
    ["Die ___ Tür ist links. (öffnen, Partizip II)", "geöffnete", "Partizip II geöffnet получает окончание -e после die."],
    ["Спящий ребёнок лежит в кровати.", "Das schlafende Kind liegt im Bett."]
  ],
  [
    "Предпрошедшее время Plusquamperfekt",
    "Plusquamperfekt обозначает действие, завершённое раньше другого события в прошлом. Оно строится из hatte или war и Partizip II. В придаточном с nachdem вспомогательный глагол стоит в конце.",
    "Nachdem sie gegessen hatte, ging sie spazieren. Als ich ankam, war er schon gegangen.",
    ["Nachdem wir gegessen ___, gingen wir los.", "hatten", "Essen образует Perfekt с haben, а с wir в Plusquamperfekt нужна форма hatten."],
    ["Als ich ankam, ___ sie schon gegangen. (sie — она)", "war", "Gehen образует прошедшее с sein. С sie в значении «она» здесь нужна форма war."],
    ["К тому моменту он уже ушёл.", "Er war zu diesem Zeitpunkt schon gegangen."]
  ],
  [
    "Способ действия с indem и результат с sodass",
    "Indem вводит способ достижения результата. Sodass вводит следствие и может писаться также so dass. Это подчинительные союзы, после которых спрягаемый глагол ставится в конец придаточного.",
    "Du lernst Wörter, indem du sie wiederholst. Es schneite stark, sodass der Zug ausfiel.",
    ["Sie spart Geld, ___ sie selbst kocht. (способ)", "indem", "Придаточное объясняет способ экономии."],
    ["Es regnete stark, ___ wir zu Hause blieben. (следствие)", ["sodass", "so dass"], "Придаточное передаёт результат сильного дождя."],
    ["Я тренируюсь, повторяя слова.", "Ich übe, indem ich die Wörter wiederhole."]
  ],
  [
    "Модальные глаголы для предположений",
    "Müssen может выражать уверенный вывод, dürfte — вероятность, sollen — сведения со слов других, wollen — заявление самого человека. О прошлом говорят с Infinitiv II, например gewesen sein или vergessen haben.",
    "Er muss krank sein. Sie soll in Bern gewesen sein. Er will es gesehen haben.",
    ["Er ___ schon zu Hause sein. (вероятно, dürfen в Konjunktiv II)", "dürfte", "Dürfte выражает предположение, а не разрешение."],
    ["Sie soll dort gewesen ___. (Infinitiv II)", "sein", "Для gewesen вспомогательный инфинитив — sein."],
    ["Говорят, он видел это.", "Er soll es gesehen haben."]
  ],
  [
    "Косвенная речь и Konjunktiv I",
    "Konjunktiv I часто оформляет пересказ чужих слов. Для третьего лица единственного числа характерны sei, habe, komme и werde. Если форма Konjunktiv I совпадает с Indikativ, часто выбирают Konjunktiv II, чтобы пересказ был заметен.",
    "Sie sagt, sie sei krank. Er sagte, er habe das Buch gelesen.",
    ["Sie sagt, sie ___ krank. (sein, Konjunktiv I)", "sei", "В третьем лице единственного числа у sein употребляется sei."],
    ["Er behauptet, er ___ den Brief geschrieben. (haben, Konjunktiv I)", "habe", "Habe с Partizip II передаёт действие в прошлом в косвенной речи."],
    ["Он сказал, что придёт. (Konjunktiv I)", "Er sagte, er werde kommen."]
  ]
].map(([title, rule, example, first, second, order], index) => {
  const gaps = [first, second].map(([prompt, answers, note]) => {
    const beginsSentence = /(?:^|[.!?]\s+)___/u.test(prompt);
    const forms = [answers].flat().map(answer =>
      beginsSentence ? answer[0].toLocaleUpperCase("de") + answer.slice(1) : answer);
    return { type: "gap", prompt, answers: forms, note };
  });
  return {
    id: index + 1, title, rule, example,
    questions: [...gaps, { type: "order", prompt: order[0], answers: [order[1]] }]
  };
});

const grammarListening = [
  ["sieben", ["6", "7", "8"], "7", "Sieben — семь."],
  ["vierundzwanzig", ["20", "24", "42"], "24", "Vier — четыре, zwanzig — двадцать."],
  ["Wir sind müde.", ["Мы устали.", "Вы устали.", "Они устали."], "Мы устали.", "Wir sind — «мы есть», müde — «уставшие»."],
  ["Sie arbeitet in Bern.", ["Она работает в Берне.", "Они работают в Берне.", "Она живёт в Берне."], "Она работает в Берне.", "Arbeitet — форма третьего лица единственного числа."],
  ["Er fährt morgen.", ["Он едет завтра.", "Он едет сегодня.", "Он читает завтра."], "Он едет завтра.", "Fährt — форма fahren, morgen — «завтра»."]
];

grammarListening.forEach(([audio, options, answer, note], index) => {
  grammarLessons[index].questions.push({
    type: "listen", prompt: "Послушай и выбери значение.", audio, options, answers: [answer], note
  });
});

const grammarGovernment = [
  [
    ["Angst haben vor + Dativ", "Ich habe Angst ___ Hunden.", "vor"],
    ["erzählen über + Akkusativ", "Sie erzählt ___ den Ausflug.", "über"],
    ["denken an + Akkusativ", "Ich denke an ___ Urlaub. (der)", "den"],
    ["fahren mit + Dativ", "Wir fahren mit ___ Zug. (der)", "dem"],
    ["jemanden anrufen + Akkusativ", "Ich rufe ___ morgen an. (du)", "dich"],
    ["jemanden abholen + Akkusativ", "Er holt ___ am Bahnhof ab. (ich)", "mich"],
    ["teilnehmen an + Dativ", "Wir nehmen an ___ Kurs teil. (der)", "dem"],
    ["jemandem gratulieren zu + Dativ", "Ich gratuliere dir ___ Geburtstag. (предлог с артиклем)", "zum"],
    ["sich interessieren für + Akkusativ", "Er interessiert sich ___ moderne Kunst.", "für"],
    ["sich vorbereiten auf + Akkusativ", "Ich bereite mich ___ die Prüfung vor.", "auf"],
    ["warten auf + Akkusativ", "Sie wartet auf ___ Bus. (der)", "den"]
  ],
  [
    ["abhängen von + Dativ", "Unsere Reise hängt ___ Wetter ab. (предлог с артиклем)", "vom"],
    ["sich ärgern über + Akkusativ", "Sie ärgert sich über ___ Fehler. (der)", "den"],
    ["jemanden kennenlernen + Akkusativ", "Ich möchte ___ kennenlernen. (ihr)", "euch"],
    ["arbeiten an + Dativ", "Wir arbeiten an ___ Projekt. (ein)", "einem"],
    ["etwas über jemanden erfahren + Akkusativ", "Was hast du über ___ Kollegen erfahren? (der)", "den"],
    ["sich erinnern an + Akkusativ", "Er erinnert sich ___ seinen ersten Schultag.", "an"],
    ["sich verabschieden von + Dativ", "Wir verabschieden uns von ___. (sie, ед. ч.)", "ihr"],
    ["aufhören mit + Dativ", "Sie hört ___ dem Rauchen auf.", "mit"],
    ["hoffen auf + Akkusativ", "Er hofft auf ___ positiven Bescheid. (ein)", "einen"],
    ["sich freuen auf + Akkusativ", "Ich freue mich ___ den Urlaub nächste Woche. (предвкушение)", "auf"],
    ["sich freuen über + Akkusativ", "Ich freue mich ___ das Geschenk, das du mir gerade gegeben hast.", "über"]
  ],
  [
    ["ankommen in + Dativ", "Wir kommen morgen in ___ Schweiz an. (die)", "der"],
    ["es kommt an auf + Akkusativ", "Es kommt ___ deine Entscheidung an.", "auf"],
    ["achten auf + Akkusativ", "Achte auf ___ Verkehr! (der)", "den"],
    ["sich bedanken bei + Dativ", "Ich bedanke mich bei ___. (du)", "dir"],
    ["sich bedanken für + Akkusativ", "Ich bedanke mich ___ die Hilfe.", "für"],
    ["sich beschäftigen mit + Dativ", "Sie beschäftigt sich mit ___ Thema. (das)", "dem"],
    ["sich bemühen um + Akkusativ", "Wir bemühen uns ___ eine Lösung.", "um"],
    ["sich beschweren bei + Dativ", "Er beschwert sich bei ___ Chefin. (die)", "der"],
    ["sich beschweren über + Akkusativ", "Die Nachbarn beschweren sich ___ den Lärm.", "über"],
    ["zweifeln an + Dativ", "Er zweifelt an ___ Geschichte. (die)", "der"],
    ["sich bewerben um + Akkusativ", "Sie bewirbt sich ___ eine Stelle.", "um"],
    ["sich bewerben bei + Dativ", "Sie bewirbt sich bei ___ Bank. (eine)", "einer"],
    ["es geht um + Akkusativ", "In dem Buch geht es ___ eine lange Reise.", "um"],
    ["glauben an + Akkusativ", "Ich glaube an ___ Erfolg des Teams. (der)", "den"]
  ],
  [
    ["zufrieden sein mit + Dativ", "Sie ist zufrieden mit ___ Wohnung. (ihre)", "ihrer"],
    ["berühmt sein für + Akkusativ", "Die Stadt ist ___ ihre Brücken berühmt.", "für"],
    ["stolz sein auf + Akkusativ", "Er ist stolz auf ___ Sohn. (sein)", "seinen"],
    ["überzeugt sein von + Dativ", "Wir sind ___ der Idee überzeugt.", "von"],
    ["begeistert sein von + Dativ", "Die Kinder sind von ___ Film begeistert. (der)", "dem"],
    ["fertig sein mit + Dativ", "Bist du schon mit ___ Arbeit fertig? (die)", "der"],
    ["gespannt sein auf + Akkusativ", "Ich bin gespannt ___ deine Antwort.", "auf"],
    ["neidisch sein auf + Akkusativ", "Er ist neidisch auf ___. (du)", "dich"],
    ["fähig sein zu + Dativ", "Sie ist zu ___ Schritt fähig. (dieser)", "diesem"],
    ["schuld sein an + Dativ", "Wer ist schuld an ___ Fehler? (der)", "dem"]
  ]
].map(rows => rows.map(([note, prompt, answer]) => ({
  type: "gap", prompt, answers: [answer], note
})));
