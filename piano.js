var keys = {};
var playingSet = new Set();

function insertAudio(){
}
function drawKeyboard(){
  //draw keyboard using keys in the mapping
  keys = Object.keys(keyMap);
  for(var i=0;i<keys.length;i++){
    key = keys[i];
    div = document.createElement('div');
    $(div).addClass('key');
    $(div).attr('id', key);
    $(div).text(String.fromCharCode(key));
    $('#piano-div').append(div);

    //insert audio 
    a = document.createElement('audio');
    $(a).addClass('audio');
    $(a).attr('id', key+'-audio');
    $(a).attr('src', keyMap[key]);
    $('#audio-container').append(a);
  }
  activateKeyboardClick();
}


function startSound(audioId){
  audio = document.getElementById(audioId);
  audio.play();
}
function stopSound(audioId){
  audio = document.getElementById(audioId);
  audio.pause();
  audio.currentTime = 0;
}

function colorKey(key){
 $('#'+key).css('background-color', 'pink'); 
}

function uncolorKey(key){
 $('#'+key).css('background-color', 'black'); 
}

function activateKeyboardClick(){
  $('.key').click(function(e){
    key = $(this).attr('id');
    if(Object.keys(keyMap).indexOf(key)!=-1){
      if(playingSet.has(key)){
        playingSet.delete(key);
        stopSound(key+'-audio')
        uncolorKey(key);
      }
      else{
        playingSet.add(key);
        startSound(key+'-audio')
        colorKey(key);
      }
    }
  });
}
function activateKeyboard(){
  $(document).keydown(function(e){
    key = e.keyCode.toString();
    console.log(key+'down');
    if(Object.keys(keyMap).indexOf(key)!=-1){
      startSound(key+'-audio');
      colorKey(key);
    }
  });
  $(document).keyup(function(e){
    key = e.keyCode.toString();
    console.log(key+'up');
    if(Object.keys(keyMap).indexOf(key)!=-1){
      stopSound(key+'-audio');
      uncolorKey(key);
    }
  });
}

$(document).ready(function(){
  activateKeyboard();
  drawKeyboard();
});






