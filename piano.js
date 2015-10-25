PIANO_DIR = './piano-sounds/';
SUFFIX = '.mp3';

//piano key map
keyMap = {};
keyMap['a'] = 'A0';
keyMap['s'] = 'A1';
keyMap['d'] = 'A2';
keyMap['f'] = 'A3';
keyMap['g'] = 'A4';
keyMap['h'] = 'A5';
keyMap['j'] = 'A6';
keyMap['k'] = 'A7';
keyMap['l'] = 'B6';
keyMap[';'] = 'B5';

function drawKeyboard(){
  //draw keyboard using keys in the mapping
  keys = Object.keys(keyMap);
  for(var i=0;i<keys.length;i++){
    key = keys[i];
    div = document.createElement('div');
    $(div).addClass('key');
    $(div).attr('id',keyMap[key]);
    $(div).text(keyMap[key]);
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








