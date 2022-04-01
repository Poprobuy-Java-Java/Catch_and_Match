var cats = {
	realLevel: 1,  // уровень на которым мы сейчас находимся
	pairs: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "tweny"],//id карточек
	numberCardsOnBoard: [4, 6, 8, 12, 16, 20, 24, 30, 40], //количество карточек на поле
  levels: ["done", "", "", "", "", "", "", "", ""], //открытие уровней
	guesses: ["1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000", "1000"],// рекорды открываний
  openCards: 0, // количество открытых карточек на поле на поле
  realGuesses: 0,  //количество попыток на активном уровн
  ready: 1, //
  /*//функция ЗАИ
  carrot: function(){
    alert('Функция ЗАИ');
  },*/
  congrate: 0
};

//Функция отвственная за создание таблицы с картинками
function levelCreate(realLevel){
  var body = document.body;
  if (realLevel == 9){
    var futureLevels = document.createElement("p")
    futureLevels.style.position = 'absolute';
    futureLevels.style.fontSize = '60px';
    futureLevels.style.color = '#fff';
    futureLevels.style.fontWeight = '900';
    futureLevels.innerHTML = "COMING SOON...";
    body.appendChild(futureLevels);
    subMenuCreate(cats.realLevel);
  }else{
  cats.congrate = 0;
	var levels = document.createElement("table");
	levels.setAttribute("id", "tableCards");
  levels.style.position = 'absolute';
  levels.style.borderSpacing = '8px';
  cats.arrIdent = new Array(cats.numberCardsOnBoard[realLevel-1]/2);
  for (var j = 0; j < cats.arrIdent.length; j ++){
      cats.arrIdent[j] = cats.pairs[j];
  }
  cats.arrIdent.push(...cats.arrIdent);
  shuffle(cats.arrIdent);
  cats.arrProverka = new Array(cats.arrIdent.length);
    for (var k = 0; k < cats.arrProverka.length; k++){
      cats.arrProverka[k] = 'close';
    } 
  var rowing; 

  if (realLevel < 4){
    rowing = 2;
  }else if (realLevel == 4){
    rowing = 3;
  }else if (realLevel > 4 && realLevel < 8){
    rowing = 4;
  }else if (realLevel > 7){
    rowing = 5;
  }
  var counterStrike = 0; // счетчик для класса и id 
  for(var i = 0; i < rowing; i++){
      var tr = levels.insertRow(); 
    for(var j = 0; j < cats.numberCardsOnBoard[realLevel-1]/rowing; j++){
      var td = tr.insertCell();
      td.setAttribute("id", cats.arrIdent[counterStrike]);
      td.style.backgroundSize = '100% 100%';
      td.style.border = '2px solid #0ff';
      if (realLevel > 7){
        td.style.height = '143px';
        td.style.width = '150px';
      }else{
        td.style.height = '190px';
        td.style.width = '200px';
      }

      //!!!
      td.style.backgroundImage = 'url(img/cardBack.jpg)';
      //!!!

      td.setAttribute("class", counterStrike);
      counterStrike++;
    }
  }
  body.appendChild(levels);
  var eventCards = document.getElementsByTagName('td');
  for (var i = 0; i < eventCards.length; i++){
    eventCards[i].addEventListener('click', guessCards);
  }
  }
}

// перемешивание массива случайным образом алгоритмом Фишера-Йетса
function shuffle(arr){
  var j, temp;
  for(var i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

//функция для отгадаывания карт
function guessCards(elm)
{
  var eventObj = elm.target;
  var name = eventObj.id;
  var position = eventObj.className;
  var mass = cats.arrProverka[position];
  if (mass != 'ON1' && mass != 'ON2' && mass != 'YES' && cats.openCards != 2 && cats.ready != 0){
    eventObj.style.transitionDuration = '600ms'
    eventObj.style.transform = 'scaleX(-1)'; 
    //!!
    eventObj.style.backgroundImage = 'url(img/' + eventObj.id + 'open.jpg)';
    //!!
    eventObj.id = name + "open";
    cats.openCards++;
    cats.arrProverka[position] = 'ON' + cats.openCards;
  } 
  if(cats.openCards == 2)
  {
    cats.ready = 0;
    var cardOne = cats.arrProverka.indexOf("ON1");
    var cardTwo = cats.arrProverka.indexOf("ON2");
    if (cats.arrIdent[cardOne] == cats.arrIdent[cardTwo])
    {
      cats.openCards = 0;
      cats.arrProverka[cardOne] = 'YES';
      cats.arrProverka[cardTwo] = 'YES';
      cats.ready = 1;
    }else
    {
      cats.openCards = 0;
      cats.arrProverka[cardOne] = 'close';
      cats.arrProverka[cardTwo] = 'close';
      setTimeout(neravn, 1000, cardOne, cardTwo);
    }
    cats.realGuesses++;
  }
  if(cats.congrate != 1000){
    cats.congrate = cats.arrProverka.indexOf('close');
  }
  if (cats.congrate === (-1))
  {
    cats.levels[cats.realLevel] = 'done';
    if (cats.realGuesses < Number(cats.guesses[Number(cats.realLevel) - 1])){
      cats.guesses[Number(cats.realLevel) - 1] = cats.realGuesses;
    }
    subMenuCreate(cats.realLevel);
    cats.realGuesses = 0;
    cats.congrate = 1000;
  }
}

function subMenuCreate(realLevel) {
  var body = document.body;

  var guessesOpens = document.createElement("p");
  guessesOpens.style.color = '#000';
  guessesOpens.style.position = 'absolute';
  guessesOpens.style.top = '40px';
  guessesOpens.style.fontSize = '40px';
  guessesOpens.style.backgroundColor = '#35d9e3';
  guessesOpens.style.padding = '10px';
  guessesOpens.style.borderRadius = '10px';
  guessesOpens.style.border = '10px solid #103349';
  guessesOpens.style.color = '#fff';
  guessesOpens.style.fontWeight = '900';
  guessesOpens.style.margin = '0px 0px 0px 20px';
  guessesOpens.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
  guessesOpens.innerHTML = 'Number of moves: ' + cats.realGuesses + ' / Record: ' + cats.guesses[Number(cats.realLevel) - 1];

  var subMenuBorder = document.createElement("div");
  subMenuBorder.style.position = 'absolute';
  subMenuBorder.style.height = '120px'; 
  subMenuBorder.style.bottom = '20px';

  var nextLevel = document.createElement("button");
  var restartLevel = document.createElement("button");
  var openTable = document.createElement("button");
  nextLevel.setAttribute("id", "next");
  restartLevel.setAttribute("id", "restart");
  openTable.setAttribute("id", "menuTable");

  restartLevel.style.backgroundImage = 'url(img/submenu/restart.png)';
  nextLevel.style.backgroundImage = 'url(img/submenu/nexty.png)';
  openTable.style.backgroundImage = 'url(img/submenu/menutable.png)';
  if (realLevel < 9){
  body.appendChild( guessesOpens);
  subMenuBorder.appendChild(openTable);
  subMenuBorder.appendChild(restartLevel);
  subMenuBorder.appendChild(nextLevel);
  body.appendChild(subMenuBorder);
   var nextLevelBut = document.getElementById("next");
  nextLevelBut.onclick = removs;
  var restartLevelBut = document.getElementById("restart");
  restartLevelBut.onclick = removs;
  var openMenuBut = document.getElementById("menuTable");
  openMenuBut.onclick = removs;
  }else{
    subMenuBorder.appendChild(openTable);
     body.appendChild(subMenuBorder);
     var openMenuBut = document.getElementById("menuTable");
  openMenuBut.onclick = removs;
  }

  var cicleAppend = subMenuBorder.getElementsByTagName('button');
  for (var i = 0; i < cicleAppend.length; i++){
    cicleAppend[i].style.borderRadius = '50%';
    cicleAppend[i].style.backgroundPosition =  '0 0';
    cicleAppend[i].style.backgroundSize = '100% 100%';
    cicleAppend[i].style.height = '120px';
    cicleAppend[i].style.width = '120px';
    cicleAppend[i].style.margin = '0px 10px';
    cicleAppend[i].style.position = 'relative';
    cicleAppend[i].setAttribute("class", "submenu");
  }

}

function neravn(cardOne, cardTwo){
    var cardOneClose = document.getElementById(cats.arrIdent[cardOne] + "open");
    var cardTwoClose = document.getElementById(cats.arrIdent[cardTwo] + "open");
    var cardOneCloseName = cardOneClose.id;
    var cardTwoCloseName = cardTwoClose.id;
    cardOneClose.id = cardOneCloseName.replace("open", "");
    cardTwoClose.id = cardTwoCloseName.replace("open", "");
    cardOneClose.style.backgroundImage = 'url(img/cardBack.jpg)';
    cardTwoClose.style.backgroundImage = 'url(img/cardBack.jpg)';
    cardTwoClose.style.transform = '';
    cardOneClose.style.transform = ''; 
    cats.ready = 1;
}

function tableCreate(){
	var body = document.body;
	var levels = document.createElement("table");
	levels.setAttribute("id", "myTable");
	levels.style.width  = '400px';
  levels.style.borderSpacing = '10px';
  levels.style.margin = '10px 0px'
  var numberLevel = 1;
  for(var i = 0; i < 3; i++){
    var tr = levels.insertRow(); 
    for(var j = 0; j < 3; j++){
      var td = tr.insertCell();
      td.innerHTML = numberLevel;
      td.style.border = '1px solid black';
      td.style.height = '110px';
      td.style.backgroundColor = '#000';
      td.style.color = "#fff";
      td.style.boxShadow = '2px 2px 0px #0ff';
      td.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive';
      if (cats.levels[numberLevel-1] == "done"){
        td.style.backgroundColor = "#fff";
        td.style.color = "#000";
      }
      td.setAttribute("id", numberLevel);
      td.setAttribute("class", "points");
      numberLevel++;
    }
  }
  body.appendChild(levels);
  var eventTable = document.getElementsByTagName('td');
  for (var i = 0; i < eventTable.length; i++){
    if (cats.levels[i] === 'done'){
      eventTable[i].addEventListener('click', removs);
    }
  }
}

function removs(element){
  var eventObj = element.target;
  document.body.innerHTML = "";
  if (eventObj.id === "start" || eventObj.id === "menuTable"){
    tableCreate();
  }
  else if (eventObj.id === "next"){
    cats.realLevel++;
    levelCreate(cats.realLevel);
  }
  else if (eventObj.id === "restart"){
    levelCreate(cats.realLevel);
  }
  else if (eventObj.class = 'point'){
    cats.realLevel = eventObj.id;
    levelCreate(cats.realLevel);
  }
}
  
function init() {
  var start = document.getElementById("start");
  start.onclick = removs; 
}

window.onload = init;

