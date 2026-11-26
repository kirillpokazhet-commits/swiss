"use strict";

// Checkpoint prompts and sample translations adapted from the supplied tests and keys.
const grammarTests = [
  [
    [1, "У меня есть сестра. Она хорошая.", ["Ich habe eine Schwester. Sie ist gut."]],
    [1, "У тебя есть ребенок. Он милый.", ["Du hast ein Kind. Es ist nett."]],
    [1, "У него есть корабль. Он белый.", ["Er hat ein Schiff. Es ist weiss."]],
    [1, "У нее есть кукла. Она новая.", ["Sie hat eine Puppe. Sie ist neu."]],
    [1, "У нас есть велосипед. Он красивый.", ["Wir haben ein Fahrrad. Es ist schön.", "Wir haben ein Rad. Es ist schön."]],
    [1, "У вас есть машина. Она старая.", ["Ihr habt ein Auto. Es ist alt."]],
    [1, "У них есть друзья. Они веселые.", ["Sie haben Freunde. Sie sind lustig."]],
    [1, "У них есть книга. Она интересная.", ["Sie haben ein Buch. Es ist interessant."]],
    [2, "Я ем много. Она ест мало.", ["Ich esse viel. Sie isst wenig."]],
    [2, "Ты берешь машину. Я беру велосипед.", ["Du nimmst ein Auto. Ich nehme ein Rad."]],
    [2, "Он говорит громко. Я говорю тихо.", ["Er spricht laut. Ich spreche leise."]],
    [2, "Я вижу хорошо. Ты видишь плохо.", ["Ich sehe gut. Du siehst schlecht."]],
    [2, "Ты читаешь быстро. Мы читаем медленно.", ["Du liest schnell. Wir lesen langsam."]],
    [2, "Он помогает всегда. Ты помогаешь редко.", ["Er hilft immer. Du hilfst selten."]],
    [2, "Я ношу брюки. Она носит платье.", ["Ich trage eine Hose. Sie trägt ein Kleid.", "Ich trage die Hose. Sie trägt das Kleid."]],
    [2, "Я ношу джинсы. Ты носишь рубашку.", ["Ich trage Jeans. Du trägst ein Hemd.", "Ich trage Jeans. Du trägst das Hemd."]],
    [2, "Мы едем сегодня. Он едет завтра.", ["Wir fahren heute. Er fährt morgen."]],
    [2, "Ты спишь много. Она спит мало.", ["Du schläfst viel. Sie schläft wenig."]],
    [3, "Я могу хорошо танцевать.", ["Ich kann gut tanzen."]],
    [3, "Мне можно громко петь.", ["Ich darf laut singen."]],
    [3, "Мы хотим играть.", ["Wir wollen spielen."]],
    [3, "Я хотел бы заказать книжку.", ["Ich möchte ein Buch bestellen."]],
    [3, "Она должна учить немецкий.", ["Sie muss Deutsch lernen."]],
    [3, "Ты обязан хорошо учиться.", ["Du sollst gut lernen."]],
    [3, "Мне нравится кола.", ["Ich mag Cola."]],
    [3, "Ему нравится работать.", ["Er mag arbeiten."]],
    [4, "Это его друг.", ["Das ist sein Freund."]],
    [4, "Мой друг хороший.", ["Mein Freund ist gut."]],
    [4, "Твоя сестра красивая.", ["Deine Schwester ist schön."]],
    [4, "Ее квартира новая.", ["Ihre Wohnung ist neu."]],
    [4, "Наш дом большой.", ["Unser Haus ist gross."]],
    [4, "Их ребенок милый.", ["Ihr Kind ist nett."]],
    [4, "Ваш велосипед плохой.", ["Euer Fahrrad ist schlecht."]],
    [4, "Моя шапка чистая.", ["Meine Mütze ist sauber."]],
    [4, "Твое пальто грязное.", ["Dein Mantel ist schmutzig."]],
    [4, "Его куртка белая.", ["Seine Jacke ist weiss."]],
    [5, "У тебя есть кошка?", ["Hast du eine Katze?"]],
    [5, "У него есть корабль?", ["Hat er ein Schiff?"]],
    [5, "Его сестра красивая?", ["Ist seine Schwester schön?"]],
    [5, "Твоя машина хорошая?", ["Ist dein Auto gut?"]],
    [5, "Ты ешь много?", ["Isst du viel?"]],
    [5, "Почему ты говоришь громко?", ["Warum sprichst du laut?"]],
    [5, "Ты можешь быстро читать?", ["Kannst du schnell lesen?"]],
    [5, "Она читает быстро?", ["Liest sie schnell?"]],
    [5, "Он может помочь?", ["Kann er helfen?"]],
    [5, "Почему ты всегда носишь шапку?", ["Warum trägst du immer eine Mütze?"]],
    [5, "Это его друг?", ["Ist das sein Freund?"]],
    [5, "Ее квартира новая?", ["Ist ihre Wohnung neu?"]],
    [5, "Его костюм дорогой?", ["Ist sein Anzug teuer?"]],
    [5, "Где ты живешь?", ["Wo wohnst du?"]],
    [5, "Что ты любишь делать?", ["Was magst du machen?"]],
    [5, "Когда ты поможешь?", ["Wann hilfst du?"]],
    [5, "Откуда ты идешь?", ["Woher kommst du?"]],
    [5, "Куда ты едешь?", ["Wohin fährst du?"]],
    [5, "Как ты учишь немецкий?", ["Wie lernst du Deutsch?"]],
    [5, "Где мой шарф?", ["Wo ist mein Schal?"]],
    [5, "Ты продаешь свою машину?", ["Verkaufst du dein Auto?"]],
    [5, "Она продает свое платье?", ["Verkauft sie ihr Kleid?"]],
    [5, "Вы хотите продать свой дом?", ["Wollt ihr euer Haus verkaufen?"]],
    [5, "Что она делает?", ["Was macht sie?"]],
  ],
  [
    [1, "Это не моя кошка.", ["Das ist nicht meine Katze."]],
    [1, "У меня нет брата.", ["Ich habe keinen Bruder."]],
    [1, "Она тебе не поможет.", ["Sie hilft dir nicht."]],
    [1, "У него нет сестры.", ["Er hat keine Schwester."]],
    [1, "Это не его шапка.", ["Das ist nicht seine Mütze."]],
    [1, "Он ничего не понимает.", ["Er versteht nichts."]],
    [1, "Это не ее куртка.", ["Das ist nicht ihre Jacke."]],
    [1, "Мы не пойдем в кино.", ["Wir gehen nicht ins Kino."]],
    [1, "Мы сегодня не поедем.", ["Wir fahren heute nicht."]],
    [1, "Я не хочу его спрашивать.", ["Ich will ihn nicht fragen."]],
    [1, "Он не хочет с ней говорить.", ["Er will nicht mit ihr sprechen."]],
    [1, "Его фильм неплохой.", ["Sein Film ist nicht schlecht."]],
    [1, "Он не хочет нам помогать.", ["Er will uns nicht helfen."]],
    [1, "Твоя книга неинтересная.", ["Dein Buch ist nicht interessant."]],
    [1, "Я никогда не поеду с тобой.", ["Ich fahre nie mit dir.", "Ich werde nie mit dir fahren."]],
    [1, "Она нигде не хочет работать.", ["Sie will nirgendwo arbeiten.", "Sie will nirgends arbeiten."]],
    [1, "Вы ничего не делаете.", ["Ihr macht nichts."]],
    [1, "Мы никогда не купим собаку.", ["Wir kaufen nie einen Hund."]],
    [2, "Он приедет в полседьмого.", ["Er kommt um halb sieben."]],
    [2, "Фильм начнется в 3:10.", ["Der Film beginnt um zehn nach drei."]],
    [2, "Я читаю книгу уже 3 часа.", ["Ich lese das Buch schon seit drei Stunden.", "Ich lese das Buch schon drei Stunden."]],
    [2, "Перерыв длится 2 часа.", ["Die Pause dauert zwei Stunden."]],
    [2, "Мы начинаем в 5:15.", ["Wir beginnen um Viertel nach fünf."]],
    [2, "Они приедут в 5:50.", ["Sie kommen um zehn vor sechs."]],
    [2, "Во вторник я учу немецкий.", ["Am Dienstag lerne ich Deutsch."]],
    [2, "В четверг я играю в футбол.", ["Am Donnerstag spiele ich Fussball."]],
    [2, "В марте приедет мой друг.", ["Im März kommt mein Freund."]],
    [2, "В декабре мы много читаем.", ["Im Dezember lesen wir viel."]],
    [2, "Кант родился в 1724 году.", ["Kant ist 1724 geboren.", "Kant ist im Jahr 1724 geboren.", "Kant ist im Jahre 1724 geboren."]],
    [2, "Пушкин родился в 1799 году.", ["Puschkin ist 1799 geboren.", "Puschkin ist im Jahr 1799 geboren.", "Puschkin ist im Jahre 1799 geboren."]],
    [2, "Когда ты родился?", ["Wann bist du geboren?"]],
    [2, "Когда родился Чехов?", ["Wann ist Tschechow geboren?"]],
    [2, "Чехов родился в 1860 году.", ["Tschechow ist 1860 geboren."]],
    [2, "Летом мы не ходим в школу.", ["Im Sommer gehen wir nicht in die Schule."]],
    [2, "Осенью погода плохая.", ["Im Herbst ist das Wetter schlecht."]],
    [2, "Весной хорошая погода.", ["Im Frühling ist das Wetter gut."]],
    [2, "У него день рождения 27 декабря.", ["Er hat Geburtstag am 27. Dezember."]],
    [2, "У нее день рождения 1 марта.", ["Sie hat Geburtstag am 1. März."]],
    [2, "У них день рождения 3 августа.", ["Sie haben Geburtstag am 3. August."]],
    [2, "У меня день рождения 12 мая.", ["Ich habe am 12. Mai Geburtstag.", "Ich habe Geburtstag am 12. Mai."]],
    [3, "Мы не хотим с ними ехать.", ["Wir wollen nicht mit ihnen fahren."]],
    [3, "Купи этот стол и этот стул!", ["Kauf diesen Tisch und diesen Stuhl!"]],
    [3, "Алекс играет против своего друга.", ["Alex spielt gegen seinen Freund."]],
    [3, "Приходи ко мне в три.", ["Komm zu mir um drei."]],
    [3, "Работай без нее!", ["Arbeite ohne sie!"]],
    [3, "Она не хочет с нами играть.", ["Sie will nicht mit uns spielen."]],
    [3, "С кем она хочет играть?", ["Mit wem will sie spielen?"]],
    [3, "Она хочет играть со своими друзьями.", ["Sie will mit ihren Freunden spielen."]],
    [3, "Спи хорошо!", ["Schlaf gut!"]],
    [3, "Он сегодня не придет домой.", ["Er kommt heute nicht nach Hause."]],
    [3, "Ответь мне сегодня!", ["Antworte mir heute!"]],
    [3, "Подари ей ручку.", ["Schenk ihr einen Füller."]],
    [3, "Будь сильным и не бойся!", ["Sei stark und hab keine Angst!"]],
    [3, "Его машина нравится мне.", ["Sein Auto gefällt mir."]],
    [3, "Помоги своей бабушке!", ["Hilf deiner Oma!"]],
    [3, "Они никогда не помогают своим родителям.", ["Sie helfen ihren Eltern nie."]],
    [3, "Положи ручку на стол.", ["Leg den Füller auf den Tisch."]],
    [3, "Ручка лежит на столе.", ["Der Füller liegt auf dem Tisch."]],
    [3, "Повесь картину на стену.", ["Häng das Bild an die Wand."]],
    [3, "Картина висит на стене.", ["Das Bild hängt an der Wand."]],
  ],
  [
    [1, "Ты знаешь этого ребенка?", ["Kennst du dieses Kind?"]],
    [1, "Кто живет в этом доме?", ["Wer wohnt in diesem Haus?"]],
    [1, "Ты знаешь, что каждый день важен!", ["Du weisst, dass jeder Tag wichtig ist!"]],
    [1, "Он говорит с каждым ребенком.", ["Er spricht mit jedem Kind."]],
    [1, "Какое платье тебе нравится?", ["Welches Kleid gefällt dir?"]],
    [1, "Какое пальто ему нравится?", ["Welcher Mantel gefällt ihm?"]],
    [1, "Ты знаешь, что он учит немецкий?", ["Weisst du, dass er Deutsch lernt?"]],
    [1, "Ты должен купить какую-нибудь шапку.", ["Du musst irgendeine Mütze kaufen."]],
    [1, "Многие дети хотят Iphone.", ["Viele Kinder wollen ein iPhone."]],
    [1, "Некоторые дети хотят Sony.", ["Einige Kinder wollen ein Handy von Sony."]],
    [1, "Мы должны посетить все страны.", ["Wir müssen alle Länder besuchen."]],
    [1, "Я знаю здесь всех детей.", ["Ich kenne hier alle Kinder."]],
    [1, "Он знает, что многие дети учат английский.", ["Er weiss, dass viele Kinder Englisch lernen."]],
    [1, "Я знаю, что некоторые дети учат немецкий.", ["Ich weiss, dass einige Kinder Deutsch lernen."]],
    [2, "Он встает всегда раньше, чем ты. Она встает раньше всех.", ["Er steht immer früher auf als du. Sie steht am frühesten auf."]],
    [2, "Она выглядит лучше, чем я. Ты выглядишь лучше всех.", ["Sie sieht besser aus als ich. Du siehst am besten aus."]],
    [2, "Я засыпаю позже, чем ты. Завтра я могу долго спать.", ["Ich schlafe später ein als du. Morgen kann ich lange schlafen."]],
    [2, "Он засыпает раньше всех. Он должен рано вставать.", ["Er schläft am frühesten ein. Er muss früh aufstehen."]],
    [2, "Мы пригласим больше друзей, чем ты.", ["Wir laden mehr Freunde ein als du."]],
    [2, "Моя квартира выглядит больше. Поэтому я радуюсь.", ["Meine Wohnung sieht grösser aus. Deshalb freue ich mich."]],
    [2, "Этот дом выглядит выше. Мы будем там жить.", ["Dieses Haus sieht höher aus. Wir werden dort wohnen."]],
    [2, "То здание выглядит лучше. Мы его покупаем.", ["Jenes Gebäude sieht besser aus. Wir kaufen es."]],
    [2, "Когда ты побреешься? Твоя борода такая длинная!", ["Wann rasierst du dich? Dein Bart ist so lang!"]],
    [2, "Я не хочу бриться. У меня нет времени.", ["Ich will mich nicht rasieren. Ich habe keine Zeit."]],
    [2, "Почему ты сомневаешься? Ты сильнее, чем он.", ["Warum zweifelst du? Du bist stärker als er."]],
    [2, "Тебе нельзя сомневаться. Это сделает тебя слабым.", ["Du darfst nicht zweifeln. Das macht dich schwach."]],
    [2, "Иногда можно подурачиться. Это не так плохо.", ["Manchmal darf man sich amüsieren. Das ist nicht so schlimm."]],
    [2, "Вы должны радоваться. Мы побеждаем.", ["Ihr müsst euch freuen. Wir gewinnen."]],
    [2, "Ты можешь себе представить, что она его уже знает?", ["Kannst du dir vorstellen, dass sie ihn schon kennt?"]],
    [2, "Ты можешь себе представить, что он играет лучше, чем я?", ["Kannst du dir vorstellen, dass er besser spielt als ich?"]],
    [2, "Когда мы встретимся? Мы встречаемся в 7.", ["Wann treffen wir uns? Wir treffen uns um 7."]],
    [2, "Мы хотим немного отдохнуть. Мы устали.", ["Wir wollen uns ein bisschen erholen. Wir sind müde."]],
    [2, "Ты обязательно должен сегодня отдохнуть!", ["Du musst dich heute unbedingt erholen!"]],
    [2, "Я хочу помыться. Когда я могу помыться?", ["Ich will mich waschen. Wann darf ich mich waschen?"]],
    [2, "Я надеваю рубашку. Ты надеваешь платье.", ["Ich ziehe das Hemd an. Du ziehst das Kleid an."]],
    [2, "Она одевается быстро. Ее подруга одевается медленно.", ["Sie zieht sich schnell an. Ihre Freundin zieht sich langsam an."]],
    [3, "Возможно, завтра мы купим стол.", ["Möglicherweise kaufen wir morgen den Tisch."]],
    [3, "Мы поедем в Германию завтра в три.", ["Wir fahren morgen um drei nach Deutschland.", "Wir fahren morgen um 3 Uhr nach Deutschland."]],
    [3, "В следующем году я, вероятно, буду учить немецкий.", ["Nächstes Jahr werde ich wahrscheinlich Deutsch lernen."]],
    [3, "В этом городе есть церковь.", ["In dieser Stadt gibt es eine Kirche."]],
    [3, "Скоро она будет учиться в школе.", ["Bald wird sie in der Schule lernen."]],
    [3, "Когда-нибудь я буду учиться в Германии.", ["Irgendwann werde ich in Deutschland lernen."]],
    [3, "В этом городе есть 2 музея.", ["In dieser Stadt gibt es 2 Museen."]],
    [3, "Я должен встать завтра утром в 7.", ["Ich muss morgen früh um 7 aufstehen."]],
    [3, "Мы немедленно поедем в школу.", ["Wir fahren sofort in die Schule."]],
    [3, "Может быть, завтра будет тепло.", ["Vielleicht wird es morgen warm."]],
    [3, "Вероятно, завтра будет идти дождь.", ["Wahrscheinlich wird es morgen regnen."]],
    [3, "Послезавтра погода точно будет хорошей.", ["Übermorgen wird das Wetter sicher gut."]],
    [3, "В этой школе есть актовый зал.", ["In dieser Schule gibt es eine Aula."]],
    [3, "В какую игру здесь играют?", ["Welches Spiel spielt man hier?"]],
    [3, "Здесь нет актового зала.", ["Hier gibt es keine Aula."]],
    [3, "Здесь играют в баскетбол.", ["Hier spielt man Basketball."]],
    [3, "Надо много работать.", ["Man muss viel arbeiten."]],
    [3, "Можно сделать это завтра.", ["Man kann das morgen machen."]],
    [3, "В этом доме нет телефона.", ["In diesem Haus gibt es kein Telefon."]],
    [3, "Здесь можно курить.", ["Hier darf man rauchen."]],
    [3, "Сейчас тепло. Завтра будет холодно.", ["Jetzt ist es warm. Morgen wird es kalt."]],
    [3, "Здесь есть столовая?", ["Gibt es hier eine Kantine?"]],
    [3, "Сейчас идет дождь. Завтра дождя не будет.", ["Jetzt regnet es. Morgen wird es nicht regnen."]],
    [3, "В библиотеке много книг.", ["In der Bibliothek gibt es viele Bücher."]],
  ],
  [
    [1, "Они сказали, что они хотели купить квартиру еще в прошлом году.", ["Sie sagten, dass sie die Wohnung noch letztes Jahr kaufen wollten."]],
    [1, "Я с ним не разговариваю, потому что он мне не помог.", ["Ich spreche nicht mit ihm, weil er mir nicht geholfen hat."]],
    [1, "Мы знали, что нам нельзя было отдыхать.", ["Wir wussten, dass wir uns nicht erholen durften."]],
    [1, "Он был уверен, что этот концерт нельзя было пропустить.", ["Er war sicher, dass man dieses Konzert nicht verpassen durfte."]],
    [1, "Я тебе не позвонил, потому что я не знал твой номер.", ["Ich habe dich nicht angerufen, weil ich deine Nummer nicht kannte."]],
    [1, "Я думаю, что ты должен был ему помочь.", ["Ich denke, dass du ihm helfen musstest."]],
    [1, "Он не сказал нам, куда она поехала.", ["Er hat uns nicht gesagt, wohin sie gefahren ist."]],
    [1, "Он рассказал нам, что вчера произошло.", ["Er hat uns erzählt, was gestern passiert ist."]],
    [1, "Она сказала, что хочет остаться дома.", ["Sie hat gesagt, dass sie zu Hause bleiben will."]],
    [1, "Почему ты осталась дома?", ["Warum bist du zu Hause geblieben?"]],
    [1, "Когда мне было 10 лет, я в первый раз поехал в Германию.", ["Als ich 10 Jahre alt war, bin ich zum ersten Mal nach Deutschland gefahren."]],
    [1, "Когда я много работаю, я быстро устаю.", ["Wenn ich viel arbeite, werde ich schnell müde."]],
    [1, "Мы сомневаемся, сможем ли мы приехать вовремя.", ["Wir zweifeln, ob wir pünktlich kommen können."]],
    [1, "Я не знаю, сможет ли он тебе помочь.", ["Ich weiss nicht, ob er dir helfen kann."]],
    [1, "Я не знал, когда он должен был приехать.", ["Ich wusste nicht, wann er kommen musste."]],
    [1, "Он не сказал, когда вернется домой.", ["Er hat nicht gesagt, wann er nach Hause zurückkommt."]],
    [1, "Когда он вернется домой, он обязательно с тобой поговорит.", ["Wenn er nach Hause zurückkommt, spricht er mit dir unbedingt."]],
    [1, "Он ему не сказал, какую машину они купили в Германии.", ["Er hat ihm nicht gesagt, welches Auto sie in Deutschland gekauft haben."]],
    [1, "Я не знал, что ты тоже учишь немецкий.", ["Ich wusste nicht, dass du auch Deutsch lernst."]],
    [1, "Я не знал, что я еще мог сделать.", ["Ich wusste nicht, was ich noch machen konnte."]],
    [2, "Он учит немецкий, чтобы учиться в Германии в университете.", ["Er lernt Deutsch, um in Deutschland an der Uni zu studieren."]],
    [2, "Он помогает родителям, чтобы они меньше работали.", ["Er hilft den Eltern, damit sie weniger arbeiten."]],
    [2, "Мама помогает дочке, чтобы она не получила плохую оценку.", ["Mama hilft der Tochter, damit sie keine schlechte Note bekommt."]],
    [2, "Отец тренирует сына, чтобы он стал сильнее и быстрее.", ["Der Vater trainiert den Sohn, damit er stärker und schneller wird."]],
    [2, "Я пойду сейчас куплю торт.", ["Ich gehe jetzt eine Torte kaufen.", "Ich gehe gleich eine Torte kaufen."]],
    [2, "Я попытаюсь прийти вовремя.", ["Ich versuche pünktlich zu kommen."]],
    [2, "У меня нет желания сегодня работать.", ["Ich habe keine Lust, heute zu arbeiten."]],
    [2, "Ты можешь мне помочь 1 сентября?", ["Kannst du mir am 1. September helfen?"]],
    [2, "Я поеду закупиться.", ["Ich fahre einkaufen."]],
    [2, "Я останусь дома работать.", ["Ich bleibe zu Hause arbeiten."]],
    [2, "Он позволил ей победить.", ["Er liess sie gewinnen."]],
    [2, "Она позволила ему уйти.", ["Sie liess ihn gehen."]],
    [2, "Это невозможно, выучить немецкий так быстро.", ["Das ist unmöglich, Deutsch so schnell zu erlernen."]],
    [2, "Это очень тяжело, каждый день вставать в пять утра.", ["Das ist sehr schwer, jeden Tag um 5 Uhr morgens aufzustehen."]],
    [2, "Легко всегда только советовать.", ["Es ist leicht, immer nur Ratschläge zu geben."]],
    [2, "Ты поможешь мне донести сумку?", ["Hilfst du mir, die Tasche zu tragen?"]],
    [3, "Он всегда хотел жить в США.", ["Er wollte immer in den USA wohnen."]],
    [3, "Она всегда хотела съездить в Швейцарию.", ["Sie wollte immer in die Schweiz fahren."]],
    [3, "Мы всегда хотели жить в Нидерландах.", ["Wir wollten immer in den Niederlanden wohnen."]],
    [3, "Я не мог поехать с тобой в Украину.", ["Ich konnte nicht mit dir in die Ukraine fahren."]],
    [3, "Завтра мы летим во Францию.", ["Morgen fliegen wir nach Frankreich."]],
    [3, "Я еще не был в Швейцарии.", ["Ich war noch nicht in der Schweiz."]],
    [3, "Когда ты поедешь в Турцию?", ["Wann fährst du in die Türkei?"]],
    [3, "Я много раз был в Австрии!", ["Ich war vielmals in Österreich!"]],
    [3, "Когда они вернутся из Турции?", ["Wann kommen sie aus der Türkei zurück?"]],
    [3, "Зачем ты поехал в США?", ["Warum bist du in die USA gefahren?"]],
    [3, "Он живет в США уже много лет.", ["Er wohnt schon seit vielen Jahren in den USA."]],
    [3, "Я никогда не был в Турции.", ["Ich war nie in der Türkei."]],
    [3, "Он хочет жить в Швейцарии.", ["Er will in der Schweiz leben."]],
    [3, "Мы живем в Украине.", ["Wir leben in der Ukraine."]],
  ],
  [
    [1, "Машина моего отца была вчера продана.", ["Das Auto meines Vaters wurde gestern verkauft."]],
    [1, "Квартира ее мамы была убрана.", ["Die Wohnung ihrer Mutter wurde aufgeräumt."]],
    [1, "Этот стадион будет построен в следующем году.", ["Dieses Stadion wird nächstes Jahr gebaut."]],
    [1, "Многие книги этого автора были мной прочитаны.", ["Viele Bücher von diesem Autor wurden von mir gelesen."]],
    [1, "Вся работа была быстро сделана.", ["Die ganze Arbeit wurde schnell gemacht."]],
    [1, "Что уже было сделано, чтобы улучшить жизнь народа?", ["Was wurde schon gemacht, um das Leben des Volkes zu verbessern?"]],
    [1, "Дом этого парня будет построен, когда у меня будет больше времени.", ["Das Haus dieses Jungen wird gebaut, wenn ich mehr Zeit habe."]],
    [1, "Нам задали так много домашней работы.", ["Uns wurden so viele Hausaufgaben gegeben.", "Es wurden uns so viele Hausaufgaben gegeben."]],
    [1, "Этот вопрос будет задан президенту завтра.", ["Diese Frage wird dem Präsidenten morgen gestellt."]],
    [1, "Эта операция была проведена хорошим врачом.", ["Diese Operation wurde von einem guten Arzt durchgeführt."]],
    [2, "Плачущая девочка была обижена.", ["Das weinende Mädchen wurde beleidigt.", "Das weinende Mädchen war beleidigt."]],
    [2, "Кричащий мальчик победил.", ["Der schreiende Junge hat gewonnen."]],
    [2, "Купленная машина мне не понравилась.", ["Das gekaufte Auto hat mir nicht gefallen."]],
    [2, "Просмотренный фильм был скучным.", ["Der Film, den ich gesehen habe, war langweilig.", "Der angesehene Film war langweilig."]],
    [2, "Читаемая книга была взята мной в библиотеке.", ["Das Buch, das ich gerade lese, habe ich aus der Bibliothek ausgeliehen."]],
    [2, "Играющие дети улыбнулись мне.", ["Die spielenden Kinder lächelten mich an."]],
    [2, "Пишущие дети были очень внимательны.", ["Die schreibenden Kinder waren sehr aufmerksam."]],
    [2, "Читающие дети меня не слышали.", ["Die lesenden Kinder haben mich nicht gehört."]],
    [2, "Проезжающая машина понравилась мне.", ["Das vorbeifahrende Auto hat mir gefallen."]],
    [2, "Летящий самолет был очень большим.", ["Das fliegende Flugzeug war sehr gross."]],
    [3, "Чем лучше я работаю, тем больше я зарабатываю.", ["Je besser ich arbeite, desto mehr verdiene ich."]],
    [3, "Он учит как английский, так и немецкий.", ["Er lernt sowohl Englisch als auch Deutsch."]],
    [3, "Я ем не денер, а пиццу.", ["Ich esse keinen Döner, sondern eine Pizza."]],
    [3, "Это не его друзья, а его враги.", ["Das sind nicht seine Freunde, sondern seine Feinde."]],
    [3, "Я не говорю ни по-французски, ни по-испански.", ["Ich spreche weder Französisch noch Spanisch."]],
    [3, "Мы поедем или в Австрию, или в Швейцарию.", ["Wir fahren entweder nach Österreich oder in die Schweiz."]],
    [3, "Он был вообще-то молод, но уже очень знаменит.", ["Er war zwar jung, aber schon sehr berühmt."]],
    [3, "Во время кризиса надо больше экономить.", ["Während der Krise muss man mehr sparen."]],
    [3, "Пока я был дома, она закупалась.", ["Während ich zu Hause war, hat sie eingekauft."]],
    [3, "Я должен еще много работать, прежде чем смогу достигнуть моей цели.", ["Ich muss noch viel arbeiten, bevor ich mein Ziel erreichen kann."]],
    [3, "С тех пор как я учу немецкий, я чувствую себя намного лучше.", ["Seitdem ich Deutsch lerne, fühle ich mich viel besser."]],
    [3, "Прежде чем купить эту машину, он все о ней узнал.", ["Bevor er dieses Auto kaufte, hat er alles darüber erfahren."]],
    [3, "Как только ты приедешь, мы пойдем в кино.", ["Sobald du kommst, gehen wir ins Kino."]],
    [3, "Во время фильма все сидели тихо.", ["Während des Films sassen alle still da."]],
    [3, "Во время урока нужно внимательно слушать.", ["Während der Stunde muss man aufmerksam zuhören."]],
    [4, "Было бы хорошо, если бы ты пришел. (Präsens)", ["Es wäre gut, wenn du kommen würdest."]],
    [4, "Было бы намного лучше, если бы ты пришел во вторник. (Präsens/Perfekt)", ["Es wäre viel besser, wenn du am Dienstag gekommen wärst."]],
    [4, "У меня бы было больше времени на мой проект, если бы я должен был меньше работать. (Präsens/Präsens)", ["Ich hätte mehr Zeit für mein Projekt, wenn ich weniger arbeiten müsste."]],
    [4, "Мы бы победили, если бы ты играл с нами. (Perfekt/Perfekt)", ["Wir hätten gewonnen, wenn du mitgespielt hättest."]],
    [4, "Я бы мог тебе помочь, если бы я был дома. (Präsens/Präsens)", ["Ich könnte dir helfen, wenn ich zu Hause wäre."]],
    [4, "Я бы мог тебе помочь, если бы я в среду был дома. (Perfekt/Perfekt)", ["Ich hätte dir helfen können, wenn ich am Mittwoch zu Hause gewesen wäre."]],
    [4, "Если бы я только знал, как я могу тебе помочь. (Präsens/Präsens)", ["Wenn ich nur wüsste, wie ich dir helfen kann!"]],
    [4, "Если бы я тогда знал, что мне дальше делать. (Perfekt/Präsens)", ["Hätte ich damals nur gewusst, was ich als Nächstes tun soll!"]],
    [4, "Если бы ты мне мог помочь, мы бы определенно справились с этим. (Präsens/Präsens)", ["Wenn du mir helfen könntest, würden wir es bestimmt schaffen."]],
    [4, "Если бы ты мне помог, мы бы справились. (Perfekt/Perfekt)", ["Wenn du mir geholfen hättest, hätten wir es geschafft."]],
    [5, "Я жду девушку, которую люблю.", ["Ich warte auf das Mädchen, das ich liebe."]],
    [5, "Я жду того, что эта дорога наконец-то будет построена.", ["Ich warte darauf, dass diese Strasse endlich gebaut wird."]],
    [5, "Чего ты еще ждешь?", ["Worauf wartest du noch?"]],
    [5, "Я надеюсь на помощь моих родителей.", ["Ich hoffe auf die Hilfe meiner Eltern."]],
    [5, "Я надеюсь на то, что мне помогут.", ["Ich hoffe darauf, dass mir geholfen wird.", "Ich hoffe, dass man mir hilft."]],
    [5, "Рассказывается о том, как машина этого господина была сожжена.", ["Es wird erzählt, wie das Auto dieses Herrn verbrannt wurde."]],
    [5, "О чем будет рассказываться на следующей неделе?", ["Worüber wird nächste Woche berichtet?", "Worüber wird nächste Woche erzählt?"]],
    [5, "О чем ты думаешь?", ["Woran denkst du?"]],
    [5, "Я думаю о том, что я бы ему охотно помог.", ["Ich denke daran, dass ich ihm gerne helfen würde."]],
    [5, "Мы занимаемся тем, что улучшаем жизнь в мире.", ["Wir beschäftigen uns damit, das Leben in der Welt zu verbessern."]],
    [6, "Я ищу отель с большой комнатой.", ["Ich suche nach einem Hotel mit einem grossen Zimmer."]],
    [6, "Я покупаю новую машину, потому что старая сломана.", ["Ich kaufe mir ein neues Auto, weil mein altes Auto kaputt ist."]],
    [6, "Я покупаю новое пальто, потому что старое пальто мне больше не нравится.", ["Ich kaufe mir einen neuen Mantel, weil der alte Mantel mir nicht mehr gefällt."]],
    [6, "Я покупаю новую шапку, которую я нашел в магазине.", ["Ich kaufe mir eine neue Mütze, die ich im Laden gefunden habe."]],
    [6, "Я учу этот красивый язык, потому что я хочу переехать в эту красивую страну.", ["Ich lerne diese schöne Sprache, weil ich in dieses schöne Land umziehen will."]],
  ],
];

// Infinitive, Präteritum, Partizip II, translation, and membership in the basic list.
const grammarIrregular = [
  ["befehlen", "befahl", "befohlen", "приказывать", false],
  ["beginnen", "begann", "begonnen", "начинать", true],
  ["beissen", "biss", "gebissen", "кусать", false],
  ["bergen", "barg", "geborgen", "прятать", false],
  ["biegen", "bog", "gebogen", "сгибать", false],
  ["bieten", "bot", "geboten", "предлагать", false],
  ["binden", "band", "gebunden", "связывать, завязывать", false],
  ["bitten", "bat", "gebeten", "просить", true],
  ["bleiben", "blieb", "ist geblieben", "оставаться", true],
  ["braten", "briet", "gebraten", "жарить", true],
  ["brechen", "brach", "gebrochen", "ломать", true],
  ["brennen", "brannte", "gebrannt", "гореть", true],
  ["bringen", "brachte", "gebracht", "приносить", true],
  ["denken", "dachte", "gedacht", "думать", true],
  ["empfangen", "empfing", "empfangen", "принимать, встречать", false],
  ["empfehlen", "empfahl", "empfohlen", "советовать", true],
  ["erschrecken", "erschrak", "erschrocken", "испугаться", false],
  ["essen", "ass", "gegessen", "есть, кушать", true],
  ["fahren", "fuhr", "ist gefahren", "ехать, вести, подвозить", true],
  ["fallen", "fiel", "ist gefallen", "падать", true],
  ["fangen", "fing", "gefangen", "ловить", true],
  ["finden", "fand", "gefunden", "находить", true],
  ["fliegen", "flog", "ist geflogen", "летать", true],
  ["fliehen", "floh", "geflohen", "убегать", false],
  ["fliessen", "floss", "geflossen", "течь", false],
  ["frieren", "fror", "gefroren", "мёрзнуть", false],
  ["gebären", "gebar", "geboren", "рождать", false],
  ["geben", "gab", "gegeben", "давать", true],
  ["gehen", "ging", "ist gegangen", "идти, ходить", true],
  ["gelingen", "gelang", "ist gelungen", "удаваться", true],
  ["gelten", "galt", "gegolten", "иметь силу, стоить", false],
  ["geniessen", "genoss", "genossen", "наслаждаться", true],
  ["geschehen", "geschah", "ist geschehen", "случаться, происходить", true],
  ["gewinnen", "gewann", "gewonnen", "выигрывать", true],
  ["gleichen", "glich", "geglichen", "быть похожим", false],
  ["greifen", "griff", "gegriffen", "хватать", false],
  ["haben", "hatte", "gehabt", "иметь", true],
  ["halten", "hielt", "gehalten", "держать, останавливаться", true],
  ["hängen", "hing", "gehangen", "висеть", false],
  ["heben", "hob", "gehoben", "поднимать", false],
  ["heissen", "hiess", "geheissen", "звать, называться", true],
  ["helfen", "half", "geholfen", "помогать", true],
  ["kennen", "kannte", "gekannt", "знать", true],
  ["klingen", "klang", "geklungen", "звучать", false],
  ["kommen", "kam", "ist gekommen", "приходить, приезжать", true],
  ["laden", "lud", "geladen", "грузить, заряжать", true],
  ["lassen", "liess", "gelassen", "оставлять, давать, позволять", true],
  ["laufen", "lief", "ist gelaufen", "бегать", true],
  ["leiden", "litt", "gelitten", "страдать", true],
  ["leihen", "lieh", "geliehen", "давать/брать взаймы", false],
  ["lesen", "las", "gelesen", "читать", true],
  ["liegen", "lag", "gelegen", "лежать", true],
  ["lügen", "log", "gelogen", "врать", true],
  ["meiden", "mied", "gemieden", "избегать", false],
  ["messen", "mass", "gemessen", "мерить", false],
  ["nehmen", "nahm", "genommen", "брать", true],
  ["nennen", "nannte", "genannt", "называть", true],
  ["pfeifen", "pfiff", "gepfiffen", "свистеть", true],
  ["raten", "riet", "geraten", "советовать", false],
  ["reiben", "rieb", "gerieben", "тереть", false],
  ["reiten", "ritt", "ist geritten", "скакать, ездить верхом", true],
  ["reissen", "riss", "gerissen", "рвать", false],
  ["rennen", "rannte", "ist gerannt", "бежать, мчаться", true],
  ["riechen", "roch", "gerochen", "пахнуть, нюхать", true],
  ["ringen", "rang", "gerungen", "бороться", false],
  ["rufen", "rief", "gerufen", "звать, кричать", true],
  ["saugen", "sog", "gesogen", "сосать", false],
  ["schaffen", "schuf", "geschaffen", "творить, создавать", true],
  ["scheiden", "schied", "geschieden", "разделять", false],
  ["scheinen", "schien", "geschienen", "светить, казаться", false],
  ["schieben", "schob", "geschoben", "двигать, толкать", false],
  ["schiessen", "schoss", "geschossen", "стрелять, забивать (гол)", true],
  ["schlafen", "schlief", "geschlafen", "спать", true],
  ["schlagen", "schlug", "geschlagen", "бить", true],
  ["schliessen", "schloss", "geschlossen", "закрывать", false],
  ["schmeissen", "schmiss", "geschmissen", "швырять (не werfen)", false],
  ["schneiden", "schnitt", "geschnitten", "резать", true],
  ["schreiben", "schrieb", "geschrieben", "писать", true],
  ["schreien", "schrie", "geschrien", "кричать, орать", true],
  ["schreiten", "schritt", "geschritten", "шагать", false],
  ["schweigen", "schwieg", "geschwiegen", "молчать", true],
  ["schwimmen", "schwamm", "geschwommen", "плавать, плыть", true],
  ["sehen", "sah", "gesehen", "видеть", true],
  ["sein", "war", "ist gewesen", "быть, являться", true],
  ["senden", "sandte", "gesandt", "посылать", false],
  ["senden", "sendete", "gesendet", "передавать по радио", false],
  ["singen", "sang", "gesungen", "петь", true],
  ["sinken", "sank", "gesunken", "опускаться, погружаться", false],
  ["sitzen", "sass", "gesessen", "сидеть", true],
  ["sprechen", "sprach", "gesprochen", "говорить", true],
  ["springen", "sprang", "gesprungen", "прыгать", true],
  ["stechen", "stach", "gestochen", "колоть", false],
  ["stehen", "stand", "gestanden", "стоять", true],
  ["steigen", "stieg", "ist gestiegen", "подниматься", true],
  ["sterben", "starb", "ist gestorben", "умирать", true],
  ["stossen", "stiess", "gestossen", "толкать", false],
  ["streiten", "stritt", "gestritten", "спорить", true],
  ["tragen", "trug", "getragen", "носить", true],
  ["treffen", "traf", "getroffen", "встречать", true],
  ["treiben", "trieb", "getrieben", "гнать", false],
  ["treten", "trat", "getreten", "ступать", false],
  ["trinken", "trank", "getrunken", "пить", true],
  ["tun", "tat", "getan", "делать", false],
  ["überwinden", "überwand", "überwunden", "преодолеть", false],
  ["verderben", "verdarb", "verdorben", "портить", false],
  ["vergessen", "vergass", "vergessen", "забывать", true],
  ["verlieren", "verlor", "verloren", "проигрывать, терять", true],
  ["verschwinden", "verschwand", "ist verschwunden", "исчезать", true],
  ["verzeihen", "verzieh", "verziehen", "прощать", true],
  ["wachsen", "wuchs", "ist gewachsen", "расти", true],
  ["waschen", "wusch", "gewaschen", "мыть", true],
  ["weisen", "wies", "gewiesen", "указывать", false],
  ["wenden", "wandte", "gewandt", "обращаться", false],
  ["wenden", "wendete", "gewendet", "поворачивать", false],
  ["werben", "warb", "geworben", "вербовать, рекламировать", false],
  ["werden", "wurde", "ist geworden", "стать, быть", true],
  ["werfen", "warf", "geworfen", "бросать, кидать", true],
  ["wiegen", "wog", "gewogen", "взвешивать, весить", false],
  ["wissen", "wusste", "gewusst", "знать", true],
  ["ziehen", "zog", "gezogen", "тянуть", true],
  ["zwingen", "zwang", "gezwungen", "вынуждать", false],
];

// Paths to original material for local use.
const grammarSources = {
  "lessons": [
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 1. Числительные. Чтение, произношение.pdf",
      null
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 2. Местоимение. Произношение. Числительные.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 2.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 3. Haben, sein.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 3.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 4. Глаголы.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 4.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 5. Глаголы. Корневая гласная.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 5.docx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 6. Модальные глаголы.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 6.docx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 7. Притяжательные местоимения.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 7.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 8. Вопросы.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 8.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 9. Akkusativ.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 9.xlsx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 1-10/Урок 10. Dativ.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 1-10/Ключ к уроку 10.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 11. Отрицание.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 11. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 12. Повелительное наклонение.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 12. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 13. Wie spät ist es.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 13. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 14. День, месяц, год.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 14. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 15. Akkusativ, Dativ.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 15. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 16. Порядковые числительные.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 16. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 17. Склонение местоимений.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 17. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 18. Падежи. Уровень Бог.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 18. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 19. Слова-артикли.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 19. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 11-20/Урок 20. Глаголы с отделяемыми приставками.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 11-20/Урок 20. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 21. Возвратные глаголы.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 21. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 22. Сравнительная степень.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 22. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 23. Werden. Будущее время.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 23. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 24. Wissen. Kennen.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 24. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 25. Безличные предложения.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 25. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 26. Модальные глаголы. Прошедшее время.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 26. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 27. Perfekt.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 27. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 28. Perfekt. Продвинутый уровень.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 28. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 29. Präteritum.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 29. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 21-30/Урок 30. Страны и путешествия.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 21-30/Урок 30. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 31. Zu Infinitiv.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 31. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 32. Damit, um zu.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 32. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 33. Dass, ob.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 33. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 34. Weil. Denn. Предлоги времени.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 34. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 35. Wenn. Wann. Als.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 35. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 36. Genitiv, слабое склонение.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 36. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 37. Склонение прилагательных.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 37. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 38. Вопросы и управления.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 38. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 39. Который, которая.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 39. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 31-40/Урок 40. Obwohl, statt zu, ohne zu.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 31-40/Урок 40. Ключ.docx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 41. Konjuktiv II.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 41. Ключ.docx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 42. Passiv.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 42. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 43. Je desto, sowohl als auch, usw.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 43. Ключ.docx"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 44. Während, seit usw.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 44. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 45 Konjuktiv II. Продвинутый уровень.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 45. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 46. Причастия, деепричастия.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 46. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 47. Plusquamperfekt.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 47. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 48. Союзы indem. so dass.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 48. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 49. Модальные глаголы. Уровень Царь.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 49. Ключ.doc"
    ],
    [
      "Полный курс грамматики/Уроки 1 - 50/Уроки 41-50/Урок 50. Прямая речь. Konjunktiv I.pdf",
      "Полный курс грамматики/Ключи 1 - 50/Уроки 41-50/Урок 50. Ключ.doc"
    ]
  ],
  "tracks": [
    [
      [
        1,
        "Введение",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/01. Александр Беккер. Аудиокурс немецкого языка. Введение..mp3"
      ],
      [
        4,
        "Важная информация",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/04. Важная информация.mp3"
      ]
    ],
    [
      [
        2,
        "Числительные от 1 до 20",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/02. Урок 1. Числительные от 1 до 20..mp3"
      ],
      [
        3,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/03. Урок 1.1. Проверка навыка..mp3"
      ]
    ],
    [
      [
        5,
        "Местоимения",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/05. Урок 2 Местоимения.mp3"
      ],
      [
        6,
        "Основы произношения",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/06. Основы произношения.mp3"
      ],
      [
        7,
        "Числительные от 21 до 1000",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/07. Урок 2.1. Числительные от 21 до 1000..mp3"
      ],
      [
        8,
        "Числительные. Проверка 1",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/08. Урок 2.2. Числительные. Проверка 1.mp3"
      ],
      [
        9,
        "Числительные. Проверка 2",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/09. Урок 2.3. Числительные. Проверка 2.mp3"
      ]
    ],
    [
      [
        10,
        "Глаголы haben и sein",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/10. Урок 3. Глаголы haben и sein.mp3"
      ],
      [
        11,
        "Учим глагол sein",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/11. Урок 3.1. Учим глагол sein.mp3"
      ],
      [
        12,
        "Новые слова",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/12. Урок 3.2. Ноые слова.mp3"
      ],
      [
        13,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/13. Урок 3.3. Проверка навыка.mp3"
      ],
      [
        14,
        "Учим глагол haben",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/14. Урок 3.4. Учим глагол haben.mp3"
      ],
      [
        15,
        "Артикли",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/15. Урок 3.5. Артикли.mp3"
      ],
      [
        16,
        "Новые слова",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/16. Урок 3.6. Новые слова.mp3"
      ],
      [
        17,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/17. Урок 3.7. Проверка навыка.mp3"
      ],
      [
        18,
        "Несовпадение рода",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/18. Урок 3.8. Несовпадение рода.mp3"
      ],
      [
        19,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/19. Урок 3.9. Проверка навыка.mp3"
      ]
    ],
    [
      [
        20,
        "Напоминание",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/20. Напоминалочка.mp3"
      ],
      [
        21,
        "Простые глаголы",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/21. Урок 4. Простые глаголы.mp3"
      ],
      [
        22,
        "Простые глаголы. Закрепление",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/22. Урок 4.1. Простые глаголы закрепление.mp3"
      ],
      [
        23,
        "Новые слова",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/23. Урок 4.2. Новые слова.mp3"
      ],
      [
        24,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/24. Урок 4.3. Проверка навыка.mp3"
      ],
      [
        25,
        "Новые слова",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/25. Урок 4.4. Ноые слова.mp3"
      ],
      [
        26,
        "Проверка навыка",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/26. Урок 4.5. Проверка навыка.mp3"
      ]
    ],
    [
      [
        27,
        "Корневая гласная",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/27 Урок 5. Корневая гласная.mp3"
      ],
      [
        28,
        "A → Ä. Fahren",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/28. Урок 5.1. A - Ä. Fahren.mp3"
      ],
      [
        29,
        "E → I. Geben",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/29. Урок 5.1.1. E - I. Geben.mp3"
      ],
      [
        30,
        "Новые слова",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/30 Урок 5.2. Новые слова.mp3"
      ],
      [
        31,
        "Упражнение 5.2.1",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/31. Урок 5.2.1.mp3"
      ],
      [
        32,
        "Laufen",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/32. Урок 5.2.2. Laufen.mp3"
      ],
      [
        33,
        "Упражнение 5.2.3",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/33. Урок 5.2.3..mp3"
      ],
      [
        34,
        "Проверка навыка 1",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/34. Урок 5.3.1. Проверка навыка 1.mp3"
      ],
      [
        35,
        "Проверка навыка 2",
        "Полный курс грамматики/Аудиокурс к первым 5 урокам-/35. Урок 5.3.2. Проверка навыка 2.mp3"
      ]
    ]
  ],
  "tests": [
    ["Полный курс грамматики/Тесты/01 Белый тест (после 8 урока).pdf", "Полный курс грамматики/Тесты/01 Белый тест - ключ.pdf"],
    ["Полный курс грамматики/Тесты/02 Желтый тест (после 18 урока).pdf", "Полный курс грамматики/Тесты/02 Желтый тест - ключ.docx"],
    ["Полный курс грамматики/Тесты/03 Оранжевый тест (после 25 урока).pdf", "Полный курс грамматики/Тесты/03 Оранжевый тест - ключ.pdf"],
    ["Полный курс грамматики/Тесты/04 Grüner Test (после 35 урока).pdf", "Полный курс грамматики/Тесты/04 Grüner Test - ключ.pdf"],
    ["Полный курс грамматики/Тесты/05 Schwarzer Test (финальный).pdf", "Полный курс грамматики/Тесты/05 Schwarzer Test - ключ.pdf"]
  ],
  "government": [
    [
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов 1.docx",
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов 1. Ключ.docx"
    ],
    [
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов 2.docx",
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов 2. Ключи.docx"
    ],
    [
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов. Часть 3.docx",
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов. Часть 3. Ключи.docx"
    ],
    [
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов. Часть 4.docx",
      "Полный курс грамматики/Управления глаголов/Закрепляем управления глаголов. Часть 4. Ключи.docx"
    ]
  ],
  "verbs": [
    "Полный курс грамматики/Полный список неправлиьных глаголов (С1).pdf",
    "Полный курс грамматики/Список неправильных глаголов (Becker).pdf"
  ]
};

// A translation for each lesson, with exercises adapted from the supplied keys.
const grammarTranslations = [
  ["Напиши по-немецки слова «один» и «два» через запятую.", "eins, zwei"],
  ["Напиши число 32 словами по-немецки.", "zweiunddreissig"],
  ["Я чувствую себя хорошо. (Es geht …)", "Es geht mir gut."],
  ["Она поёт громко.", "Sie singt laut."],
  ["Ты ешь много.", "Du isst viel."],
  ["Она умеет красиво петь.", "Sie kann schön singen."],
  ["Это мой костюм.", "Das ist mein Anzug."],
  ["Твой папа умный?", "Ist dein Vater klug?"],
  ["Это стол. У меня есть стол.", "Das ist ein Tisch. Ich habe einen Tisch."],
  ["Я спрашиваю моего брата. Я отвечаю моему брату.", "Ich frage meinen Bruder. Ich antworte meinem Bruder."],
  ["Ты не веселый.", "Du bist nicht lustig."],
  ["Сделай работу сегодня!", "Mach die Arbeit heute!"],
  ["Мы поедем в 3 часа.", "Wir fahren um drei Uhr."],
  ["В понедельник я учу немецкий.", "Am Montag lerne ich Deutsch."],
  ["Я иду в школу.", "Ich gehe in die Schule."],
  ["У меня день рождения первого января.", "Ich habe am ersten Januar Geburtstag."],
  ["Я тебя люблю. Ты меня любишь. (mögen)", "Ich mag dich. Du magst mich."],
  ["Я работаю для тебя.", "Ich arbeite für dich."],
  ["Что мы сделаем с этой лампой?", "Was machen wir mit dieser Lampe?"],
  ["Я встаю всегда в пять.", "Ich stehe immer um fünf auf."],
  ["Я должен помыться.", "Ich muss mich waschen."],
  ["Тигр такой же большой, как лев.", "Der Tiger ist genauso gross wie der Löwe."],
  ["Фильм становится скучным.", "Der Film wird langweilig."],
  ["Я знаю тебя.", "Ich kenne dich."],
  ["Надо много тренироваться.", "Man muss viel trainieren."],
  ["Я хотел вчера помочь твоему брату.", "Ich wollte gestern deinem Bruder helfen."],
  ["Он приехал в понедельник.", "Er ist am Montag angekommen."],
  ["Он уже все попробовал.", "Er hat schon alles probiert."],
  ["Он танцевал хорошо.", "Er tanzte gut."],
  ["Я еду в Россию.", "Ich fahre nach Russland."],
  ["Мы пытаемся заказать пиццу.", "Wir versuchen, Pizza zu bestellen."],
  ["Я иду к моему другу, чтобы подарить ему книгу.", "Ich gehe zu meinem Freund, um ihm ein Buch zu schenken."],
  ["Я думаю, что он дома.", "Ich denke, dass er zu Hause ist."],
  ["Я занимаюсь спортом, потому что хочу быть здоровым.", "Ich mache Sport, weil ich gesund sein will."],
  ["Когда она приедет?", "Wann kommt sie?"],
  ["Это квартира моей сестры.", "Das ist die Wohnung meiner Schwester."],
  ["Она пьет холодную воду.", "Sie trinkt kaltes Wasser."],
  ["Чем ты занимаешься в последнее время?", "Womit beschäftigst du dich in letzter Zeit?"],
  ["Это картина, которую я хочу тебе подарить.", "Das ist das Bild, das ich dir schenken möchte."],
  ["Хотя она часто бывала в Германии, она всё ещё не говорила по-немецки.", "Obwohl sie oft in Deutschland gewesen war, sprach sie immer noch kein Deutsch."],
  ["Если бы я был немного выше!", "Wenn ich nur ein bisschen grösser wäre!"],
  ["В нашем городе открывается новый кинотеатр.", "In unserer Stadt wird ein neues Kino eröffnet."],
  ["Чем чаще он ее видит, тем больше она ему нравится.", "Je öfter er sie sieht, desto mehr gefällt sie ihm."],
  ["Пока я работаю, ты играешь в компьютерные игры.", "Während ich arbeite, spielst du Computerspiele."],
  ["Он бегает так быстро, как будто ему 15 лет.", "Er läuft so schnell, als ob er fünfzehn Jahre alt wäre."],
  ["Мы играли со смеющимся ребенком.", "Wir haben mit dem lachenden Kind gespielt."],
  ["После того как учитель вошёл в класс, все ученики встали.", "Nachdem der Lehrer ins Klassenzimmer gekommen war, standen alle Schüler auf."],
  ["Можно стать успешным спортсменом, много тренируясь.", "Man kann ein erfolgreicher Sportler werden, indem man viel trainiert."],
  ["Этого не могло произойти, так как мы всё проверили.", "Das kann nicht passiert sein, denn wir haben alles geprüft."],
  ["Продавец сказал, что у него нет этой книги.", "Der Verkäufer sagte, er habe dieses Buch nicht."],
];
