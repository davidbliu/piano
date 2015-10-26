PIANO_DIR = './piano-sounds/';
SUFFIX = '.mp3';
DRUM_DIR = './drum-sounds/';
pianoKeys = ['a','s','d','f','g','h','j','k','l',';'];
//piano key map
keyMap = {};
keyMap['a'] = 'C4';
keyMap['s'] = 'D4';
keyMap['d'] = 'E4';
keyMap['f'] = 'F4';
keyMap['g'] = 'G4';
keyMap['h'] = 'A4';
keyMap['j'] = 'B4';
keyMap['k'] = 'C5';
keyMap['l'] = 'D5';
keyMap[';'] = 'E5';
keyMap['\''] = 'F5';
// drum keys
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
keyMap['z'] = '11';
keyMap['x'] = '12';
keyMap['c'] = '13';
keyMap['v'] = '14';
keyMap['b'] = '15';
keyMap['n'] = '16';
function playSong(){
  notes = ["G4", "E4", "E4", "F4", "D4", "D4", "C4", "D4", "E4", "F4", "G4", "G4", "G4", "G4", "E4", "E4", "F4", "D4", "D4", "C4", "E4", "G4", "G4", "C4"];
  delays = [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 27, 28, 29].map(function(x){ return x+5});
  timeFactor = 350; 
  for(var i=0;i<notes.length;i++){
    playSound(notes[i], delays[i]*timeFactor);
  }
  //drum each beat
  for(var i=1;i<40;i++){
    if(i%2!=0){
      playSound('10', i*timeFactor);
      playSound('13', i*timeFactor);
    }
    playSound('9', i*timeFactor+timeFactor/2);
    playSound('2', i*timeFactor);
    //clap every 4 beats
    if(i%2==0){
      playSound('6', i*timeFactor);
    }
    if(i%4==0){
      playSound('6', i*timeFactor+100);
    }
  }
}
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
  $('#'+key).fadeOut(50).fadeIn(50);
}

function playSound(key, delay){
  var sound = new Audio(PIANO_DIR+key.toString()+SUFFIX);
  setTimeout(function(){
    sound.play();
    animateKey(key);
  }, delay);
}
function activateKeyboard(){
  $(document).keypress(function(e){
    key = String.fromCharCode(e.keyCode);
    if(Object.keys(keyMap).indexOf(key)!=-1){
      key = keyMap[key];
      showRandomImage();
      playSound(key, 0);
    }
  });
}
function activateSongButton(){
  $('#song-btn').click(function(){
    playSong();
  });
}
function showRandomImage(){
 images = [];
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xtf1/t31.0-8/12030465_10153274450151491_3396779585048093138_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12182790_10153274450126491_5440527320823729810_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xtp1/t31.0-8/12182887_10153274449991491_553158657372515922_o.jpg');
  images.push('https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xpf1/t31.0-8/12185202_10153274449906491_3225495742505052429_o.jpg');
  img_url = images[Math.floor(Math.random()*images.length)];
  $('#center-img').attr('src', img_url);
  $('#image-div').fadeIn(75).fadeOut(75);
}
$(document).ready(function(){
  activateKeyboard();
  drawKeyboard();
  activateSongButton();
});








