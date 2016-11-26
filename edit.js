Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

$(document).ready(function () {
  $("#form").submit(function (event) {
    item = {
      q : $( "#q" ).val(),
      a1 : $( "#a1" ).val(),
      a2 : $( "#a2" ).val(),
      a3 : $( "#a3" ).val(),
      a  : $('input[name=a]:checked').val()
    };
    var quiz = localStorage.getObject('quiz');
    if (quiz === undefined || quiz === null) {
      quiz = [];
    }
    quiz.push(item);
    localStorage.setObject('quiz', quiz);
    event.preventDefault();
  });

  var quizArray = localStorage.getObject('quiz');

  for ( var i = 0; i < quizArray.length; i++ ) {
    $( "#deleteform" ).append( '<label class="checkbox-inline"><input type="checkbox" id="check'+i+'" value="delete">'+quizArray[i].q+'</label>' );
  }


  $("#deleteform").submit(function (event) {
    var quizArray = localStorage.getObject('quiz');
    if (quizArray === undefined || quizArray === null) {
      return;
    }
    var quizClone = quizArray.slice(0);
    for ( var i = 0; i < quizArray.length; i++ ) {
      if ($('#check'+i).is(":checked")) {
        quizClone.splice(i, 1);
      }
    }
    localStorage.setObject('quiz', quizClone);
    location.reload();
    event.preventDefault();
  });



  $(function () {
    $('#emailLink').on('click', function (event) {
      event.preventDefault();
      var email = '';
      var subject = 'Quiz';
      console.log(localStorage.quiz);
      var emailBody = localStorage.quiz;

      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody;
    });
  });

});