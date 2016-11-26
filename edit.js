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