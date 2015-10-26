PIANO_DIR = './piano-sounds/';
SUFFIX = '.mp3';
DRUM_DIR = './drum-sounds/';

//piano key map
keyMap = {};
keyMap['a'] = 'A3';
keyMap['s'] = 'B3';
keyMap['d'] = 'C4';
keyMap['f'] = 'D4';
keyMap['g'] = 'E4';
keyMap['h'] = 'F4';
keyMap['j'] = 'G4';
keyMap['k'] = 'A4';
keyMap['l'] = 'B4';
keyMap[';'] = 'C5';
//drum key map
keyMap['q'] = '1';
keyMap['w'] = '2';
keyMap['e'] = '3';
keyMap['r'] = '4';
keyMap['t'] = '5';
keyMap['y'] = '6';
keyMap['u'] = '7';
keyMap['i'] = '8';
keyMap['o'] = '9';
keyMap['p'] = '10';
function drawKeyboard(){
  //draw keyboard using keys in the mapping
  keys = Object.keys(keyMap);
  for(var i=0;i<keys.length;i++){
    key = keys[i];
    div = document.createElement('div');
    $(div).addClass('key');
    $(div).attr('id',keyMap[key]);
    $(div).text(key);
    $('#piano-div').append(div);
  }
}
function animateKey(key){
  $('#'+key).fadeOut(100).fadeIn(100);
}

function playSound(key){
  var sound = new Audio(PIANO_DIR+key.toString()+SUFFIX);
  sound.play();
}
function activateKeyboard(){
  $(document).keypress(function(e){
    key = String.fromCharCode(e.keyCode);
    if(Object.keys(keyMap).indexOf(key)!=-1){
      key = keyMap[key];
      playSound(key);
      animateKey(key);
    }
  });
}
$(document).ready(function(){
  activateKeyboard();
  drawKeyboard();

});








