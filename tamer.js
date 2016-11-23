
/*
 * DEFINE SOUNDS
 */
$.mbAudio.sounds = {

  textSprite: {
    id: "textSprite",
    mp3: "sound/texts.mp3",
    //example of sprite
    sprite:{
      yes: {id: "yes", start: 0, end: 2, loop: false},
      no : {id: "no", start: 2, end: 4, loop: false},
      nearly: {id: "nearly", start: 4, end: 6, loop: false},
      won : {id: "won", start: 6, end: 8, loop: false},
      looser : {id: "looser", start: 8, end: 9.4, loop: false}
    }
  },

  abcSprite: {
    id: "abcSprite",
    mp3: "sound/abc.mp3",
    //example of sprite
    sprite:{
      a: {id: "a", start: 0, end: 2, loop: false},
      b: {id: "b", start: 2, end: 4, loop: false},
      c: {id: "c", start: 4, end: 6, loop: false},
      d: {id: "d", start: 6, end: 8, loop: false},
      e: {id: "e", start: 8, end: 10, loop: false},
      f: {id: "f", start: 10, end: 12, loop: false},
      g: {id: "g", start: 12, end: 14, loop: false},
      h: {id: "h", start: 14, end: 16, loop: false},
      i: {id: "i", start: 16, end: 18, loop: false},
      j: {id: "j", start: 18, end: 20, loop: false},
      k: {id: "k", start: 20, end: 22, loop: false},
      l: {id: "l", start: 22, end: 24, loop: false},
      m: {id: "m", start: 24, end: 26, loop: false},
      n: {id: "n", start: 26, end: 28, loop: false},
      o: {id: "o", start: 28, end: 30, loop: false},
      p: {id: "p", start: 30, end: 32, loop: false},
      q: {id: "q", start: 32, end: 34, loop: false},
      r: {id: "r", start: 34, end: 36, loop: false},
      s: {id: "s", start: 36, end: 38, loop: false},
      t: {id: "t", start: 38, end: 40, loop: false},
      u: {id: "u", start: 40, end: 42, loop: false},
      v: {id: "v", start: 42, end: 44, loop: false},
      w: {id: "w", start: 44, end: 46, loop: false},
      x: {id: "x", start: 46, end: 48, loop: false},
      y: {id: "y", start: 48, end: 50, loop: false},
      z: {id: "z", start: 50, end: 52, loop: false},
    }
  }
};

$(document).on("initAudio", function () {

  //otherwise sound is initialized on the first tap loosing time and UX
  $.mbAudio.pause('textSprite', audioIsReady);

});
