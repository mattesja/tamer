var listenerEnabled = true;

$(document).ready(function () {
  $('#question').click(function (event) {
    if (listenerEnabled) {
      listenerEnabled = false;
      speakCharacter($('#question').text().toLowerCase());
      setTimeout(function () {
        listenerEnabled = true;
      }, 2000);
    }
  });

  $('#answer1, #answer2, #answer3').click(function (event) {
    if (listenerEnabled) {
      listenerEnabled = false;
      evaluateAnswer($(this));
      setTimeout(function () {
        listenerEnabled = true;
      }, 2000);
    }
  });

  loadImages();

  changePictures();

  $('body').addClass('noscroll').css('top', -(document.documentElement.scrollTop) + 'px');

});

function loadImages() {
  for (var i = 0; i < images.length; i++) {
    $('<img src="pic/'+images[i]+'.jpg">').hide().appendTo('body');
  }
}

function speakCharacter(c) {
  $.mbAudio.play('abcSprite', c);
}

function evaluateAnswer(context) {
  var charQuestion = $('#question').text().toLowerCase();
  var charAnswer = context.attr('src').substring(4,5);

  if (charQuestion === charAnswer) {
    incrementProgress();
    changePictures();
  }
  else {
    decrementProgress();
  }
}

function incrementProgress() {
  changeProgress(10);
}

function decrementProgress() {
  changeProgress(-10);
}

function changeProgress(amount) {
  var me = $('#progressbar .progress-bar-success');
  var perc = parseInt(me.attr("data-percentage"));
  if (amount > 0 || perc + amount >= 0) {
    perc += amount;
  }
  me.css('width', perc + '%');
  me.attr('data-percentage', perc);
  if (perc == 0 ) {
    $.mbAudio.play('textSprite', 'looser');
  }
  else if (perc == 90 ) {
    $.mbAudio.play('textSprite', 'nearly');
  }
  else if (perc == 100 ) {
    $.mbAudio.play('textSprite', 'won');
    setTimeout(function () {
      me.css('width', '0%');
      me.attr('data-percentage', 0);
    }, 4000);

  }
  else if (amount > 0) {
    $.mbAudio.play('textSprite', 'yes');
  }
  else {
    $.mbAudio.play('textSprite', 'no');
  }
}

function changePictures() {
  setTimeout(changePictures2, 1000);
}

function changePictures2() {
  var questionName = getQuestionName(images.length);
  setChar($('#question'), questionName);
  var names = { };
  names[questionName] = true;

  var rightAnswer = getRandom(3) + 1;

  setPicture($('#answer1'), getAnswer(questionName, 1 === rightAnswer, names));
  setPicture($('#answer2'), getAnswer(questionName, 2 === rightAnswer, names));
  setPicture($('#answer3'), getAnswer(questionName, 3 === rightAnswer, names));
}

function setPicture(node, imageName) {
  node.fadeOut(1000, function() {
    node.attr('src', 'pic/' + imageName + '.jpg');
  });

  node.fadeIn();
}

function setChar(node, imageName) {
  node.fadeOut(1000, function() {
    node.text(imageName.substring(0,1));
  });

  node.fadeIn();
}

function getAnswer(questionName, isRight, names) {
  console.log(questionName + Object.keys(names));
  var random = getRandom(images.length);
  var answerName = images[random];
  var charQuestion = questionName.substring(0,1);

  if (names[answerName] !== undefined) {
    return getAnswer(questionName, isRight, names);
  }

  if (isRight) {
    return questionName;
  }
  else {
    if (answerName.substring(0,1) !== charQuestion) {
      names[answerName] = true
      return answerName;
    }
  }
  return getAnswer(charQuestion, isRight, names);
}

function getQuestionName(max) {
  for (var i = 0; i < 200; i++) {
    var number = getRandom(max);
    var questionName = images[number];
    if (chars !== undefined && $.inArray(questionName.substring(0,1), chars) > -1 ) { // ist gewuenschter buchstabe
      if (!old[number]) { // noch nicht vorgekommen
        old[number] = true
        return questionName
      }
    }
  }
  return questionName
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

//  var images = ['laterne', 'lego', 'leiter', 'maehdrescher', 'mais', 'maus', 'messer', 'milch', 'mond', 'motorrad','radieschen', 'radio', 'rasenmaeher', 'roller','anhaenger', 'affe', 'apfel'];
//  var images = [ 'katze', 'kerze', 'kirche', 'kirsche', 'klavier',  'kran', 'laterne', 'lego', 'leiter', 'maehdrescher', 'mais', 'maus',  'messer', 'milch', 'mond', 'motorrad', 'radieschen', 'radio',  'rasenmaeher', 'roller', 'telefon', 'tisch', 'topf', 'traktor',  'tuer', 'haus', 'honig' ];
var images = ['affe', 'anhaenger', 'apfel', 'banane', 'bett', 'brokoli', 'brot', 'butter', 'esel', 'elefant', 'erbse', 'delfin', 'fahrrad', 'frosch', 'fuchs', 'fisch', 'gabel', 'gabelstapler', 'giraffe', 'hand', 'haus', 'honig', 'hund', 'igel', 'indianer', 'insel', 'katze', 'kerze', 'kirche', 'kirsche', 'klavier', 'kran', 'laterne', 'lego', 'leiter', 'maehdrescher', 'mais', 'maus', 'messer', 'milch', 'mond', 'motorrad', 'nagel', 'nashorn', 'nudel', 'ohr', 'ofen', 'pinguin', 'papagei', 'radieschen', 'radio', 'rasenmaeher', 'roller', 'sonne', 'salat', 'telefon', 'tisch', 'topf', 'traktor', 'tuer', 'uhr', 'uboot', 'wal', 'wald'];

var old = {}

//var chars = ['a', 'b', 'e', 'f', 'h', 'i', 'k', 'n', 'o', 'p', 's']
var chars = ['a', 'b', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'w']
//var chars = ['b', 'd', 'g', 'k','n', 'p', 's', 'u', 'w']
// var chars = [ 'd', 'g', 'n', 'p', 's', 'u', 'w']
//var chars = [ 'd',  'n', 's', 'u', 'w', 'g', 'k', 'f']

//  var chars = ['a', 'b', 'e', 'i', 'n', 's', 'r', 'k']
//  var chars = ['w', 'u']
