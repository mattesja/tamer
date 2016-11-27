Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

var listenerEnabled = true;

var correctAnswer = undefined;

var quiz;

function initQuiz() {
  quiz = localStorage.getObject('quiz');

  if (quiz === undefined || quiz === null) {
    quiz = [
      {"q": "Ich bringe das Paket zur ?", "a1": "Post", "a2": "Bost", "a3": "-", "a": "a1"},
      {"q": "Die ? blüht.", "a1": "Plume", "a2": "Blume", "a3": "-", "a": "a2"},
      {"q": "Der Mann hat einen dicken ?.", "a1": "Pauch", "a2": "Bauch", "a3": "-", "a": "a2"},
      {"q": "Der ? gräbt eine Grube.", "a1": "Pagger", "a2": "Bagger", "a3": "-", "a": "a2"},
      {"q": "Wir ? Kuchen.", "a1": "packen", "a2": "backen", "a3": "-", "a": "a2"},
      {"q": "Wir ? den Koffer.", "a1": "packen", "a2": "backen", "a3": "-", "a": "a1"},
      {"q": "Weihnachten gibt es leckere ?.", "a1": "Plätzchen", "a2": "Blätzchen", "a3": "-", "a": "a1"},
      {"q": "Der ? arbeitet.", "a1": "Pauarbeiter", "a2": "Bauarbeiter", "a3": "-", "a": "a2"},
      {"q": "Das Kind schreibt auf dem ?", "a1": "Papier", "a2": "Bapier", "a3": "-", "a": "a1"},
      {"q": "Das Kind ? gerne", "a1": "pastelt", "a2": "bastelt", "a3": "-", "a": "a2"},
      {"q": "Das ? hat gefährliche Zähne.", "a1": "Tiger", "a2": "Diger", "a3": "-", "a": "a2"},
      {"q": "Das Haus hat ein rotes ?", "a1": "Tach", "a2": "Dach", "a3": "-", "a": "a1"},
      {"q": "Das Kind ist ?", "a1": "traurig", "a2": "draurig", "a3": "-", "a": "a1"},
      {"q": "Das Schwein ist ?", "a1": "tick", "a2": "dick", "a3": "-", "a": "a1"},
      {"q": "Ich ? aus dem Glas.", "a1": "trinke", "a2": "drinke", "a3": "-", "a": "a1"},
      {"q": "Das Kind ist ?", "a1": "traurig", "a2": "draurig", "a3": "-", "a": "a1"}
    ];

    localStorage.setObject('quiz', quiz);
  }
}

$(document).ready(function () {

  $('#a1, #a2, #a3').click(function (event) {
    if (listenerEnabled) {
      listenerEnabled = false;
      evaluateAnswer($(this));
      setTimeout(function () {
        listenerEnabled = true;
      }, 2000);
    }
  });

  initQuiz();
  changeQuiz();

  $('body').addClass('noscroll').css('top', -(document.documentElement.scrollTop) + 'px');

});

function evaluateAnswer(context) {
  var charQuestion = $('#question').text().toLowerCase();
  var answer = context.attr('id');

  if (answer === correctAnswer) {
    incrementProgress();
    if (quizIndex > -1) { // nur entfernen, wenn frage nicht zuvor falsch beantwortet wurde
      quiz.splice(quizIndex,1);
    }
    changeQuiz();
  }
  else {
    quizIndex = -1; // nicht entfernen (s.o.)
    decrementProgress();
  }
}

function incrementProgress() {
  changeProgress(5);
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

function changeQuiz() {
  setTimeout(setQuizInner, 1000);
}

function setQuizInner() {
  var quiz = getQuiz();
  setQuestion($('#question'), quiz.q);
  setAnswer($('#a1'), quiz.a1);
  setAnswer($('#a2'), quiz.a2);
  setAnswer($('#a3'), quiz.a3);
}

function setAnswer(node, text) {
  node.fadeOut(1000, function() {
    node.text(text);
  });

  node.fadeIn();
}

function setQuestion(node, text) {
  node.fadeOut(1000, function() {
    node.text(text);
  });

  node.fadeIn();
}

function getQuiz() {
  var max = quiz.length;
  var number = getRandom(max);
  var question = quiz[number];
  correctAnswer = question.a;
  quizIndex = number;
  return question;
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}
